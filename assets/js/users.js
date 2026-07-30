(function () {
  "use strict";

  const roles = ["项目经理", "业务组长", "质量审核", "部门负责人", "系统管理员"];
  const USER_FILE_SHEET_NAME = "用户导入模板";
  const USER_FILE_HEADERS = ["账号", "姓名", "所属组织", "手机号码", "邮箱", "角色", "状态", "备注"];
  const USER_FILE_WIDTHS = [18, 14, 20, 18, 28, 28, 14, 34];

  const orgTree = [
    {
      id: "all",
      name: "全部组织",
      children: [
        {
          id: "dept.data",
          name: "数据中心",
          children: [
            { id: "dept.data.model", name: "模型管理部" },
            { id: "dept.data.ops", name: "数据运营部" }
          ]
        },
        {
          id: "dept.sales",
          name: "销售中心",
          children: [
            { id: "dept.sales.east", name: "华东销售部" },
            { id: "dept.sales.south", name: "华南销售部" },
            { id: "dept.sales.north", name: "华北销售部" }
          ]
        },
        {
          id: "dept.ops",
          name: "运营中心",
          children: [
            { id: "dept.ops.feedback", name: "反馈运营部" },
            { id: "dept.ops.metric", name: "指标运营部" }
          ]
        },
        {
          id: "dept.it",
          name: "信息中心",
          children: [
            { id: "dept.it.system", name: "系统管理部" }
          ]
        }
      ]
    }
  ];

  let users = [
    user("u001", "zhangsan", "张三", "dept.sales.east", "华东销售部", "normal", "项目经理", "13800000001", "zhangsan@example.com", "负责华东区域项目交付"),
    user("u002", "lisi", "李四", "dept.data.ops", "数据运营部", "normal", ["业务组长", "项目经理"], "13800000002", "lisi@example.com", "负责业务组经营与项目统筹"),
    user("u003", "wangwu", "王五", "dept.it.system", "系统管理部", "normal", "系统管理员", "13800000003", "wangwu@example.com", "负责系统权限和基础配置"),
    user("u004", "zhaoliu", "赵六", "dept.sales.south", "华南销售部", "disabled", "项目经理", "13800000004", "zhaoliu@example.com", "账号临时停用"),
    user("u005", "sunqi", "孙七", "dept.ops.feedback", "反馈运营部", "normal", "质量审核", "13800000005", "sunqi@example.com", "负责项目成果质量审核"),
    user("u006", "zhouba", "周八", "dept.ops.metric", "指标运营部", "disabled", "业务组长", "13800000006", "zhouba@example.com", "负责业务指标检视"),
    user("u007", "wujiumei", "吴九妹", "dept.data.model", "模型管理部", "normal", "部门负责人", "13800000007", "wujiu@example.com", "负责部门经营统筹"),
    user("u008", "chenyi", "陈一", "dept.sales.north", "华北销售部", "normal", "项目经理", "13800000008", "chenyi@example.com", "负责华北区域项目执行")
  ];

  const state = {
    activeOrgId: "all",
    collapsed: new Set(["dept.sales", "dept.ops"]),
    orgKeyword: "",
    filters: {
      status: "",
      account: "",
      name: "",
      role: ""
    },
    selected: new Set(),
    drawer: {
      mode: null,
      id: null,
      draft: null
    },
    confirm: null,
    ctxOrgId: null,
    importDuplicateMode: "skip",
    importData: {
      fileName: "",
      rows: [],
      complete: false
    }
  };
  let userPagination = null;
  let importReadSequence = 0;

  function user(id, account, name, deptId, dept, status, role, phone, email, remark) {
    return { id, account, name, deptId, dept, status, role, phone, email, remark };
  }

  function roleList(item) {
    const value = item && item.role;
    if (Array.isArray(value)) return value;
    return value ? [value] : [];
  }

  function roleText(item) {
    const list = roleList(item);
    return list.length ? list.join("、") : "-";
  }

  function $(id) {
    return document.getElementById(id);
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"]/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;"
      }[char];
    });
  }

  function escapeAttr(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function uid(prefix) {
    return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function toast(text, tone) {
    if (typeof window.showToast === "function") {
      window.showToast(text, tone);
    } else {
      console.log(text);
    }
  }

  function chevronHTML() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  }

  function orgIconHTML(isRoot, hasChildren) {
    if (isRoot) {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V7l8-4 8 4v14"/><path d="M8 10h2M14 10h2M8 14h2M14 14h2M9 21v-3h6v3"/></svg>';
    }
    if (hasChildren) {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7.5h6l2 2H21v9.5H3z"/><path d="M3 7.5V5h6l2 2h8"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h10l4 4v14H5z"/><path d="M15 3v5h4"/><path d="M8 12h8M8 16h6"/></svg>';
  }

  function flattenOrgs(nodes, result) {
    (nodes || []).forEach(function (node) {
      result.push(node);
      flattenOrgs(node.children, result);
    });
    return result;
  }

  function leafOrgs() {
    return flattenOrgs(orgTree, []).filter(function (node) {
      return node.id !== "all";
    });
  }

  function findOrg(id, nodes) {
    const source = arguments.length < 2 ? orgTree : nodes;
    let found = null;
    (source || []).some(function (node) {
      if (node.id === id) {
        found = node;
        return true;
      }
      found = findOrg(id, node.children);
      return Boolean(found);
    });
    return found;
  }

  function findOrgWithParent(id, nodes, parent) {
    const source = arguments.length < 2 ? orgTree : nodes;
    let found = null;
    (source || []).some(function (node) {
      if (node.id === id) {
        found = { org: node, parent: parent || null };
        return true;
      }
      found = findOrgWithParent(id, node.children, node);
      return Boolean(found);
    });
    return found;
  }

  function orgDescendantIds(id) {
    if (id === "all") return new Set(leafOrgs().map(function (node) { return node.id; }));
    const node = findOrg(id);
    if (!node) return new Set();
    return new Set(flattenOrgs([node], []).map(function (item) {
      return item.id;
    }));
  }

  function nodeMatchesKeyword(node, keyword) {
    if (!keyword) return true;
    if (node.name.toLowerCase().indexOf(keyword) >= 0) return true;
    return Boolean((node.children || []).some(function (child) {
      return nodeMatchesKeyword(child, keyword);
    }));
  }

  function renderTree() {
    const root = $("umOrgTree");
    if (!root) return;
    const keyword = state.orgKeyword.trim().toLowerCase();
    const html = orgTree.map(function (node) {
      return renderTreeNode(node, 0, keyword);
    }).join("");
    root.innerHTML = html || '<div class="um-empty">暂无匹配组织</div>';
  }

  function renderTreeOnly() {
    renderTree();
  }

  function renderTreeNode(node, level, keyword) {
    if (!nodeMatchesKeyword(node, keyword)) return "";
    const hasChildren = Boolean(node.children && node.children.length);
    const active = state.activeOrgId === node.id ? " is-active" : "";
    const collapsed = state.collapsed.has(node.id) && !keyword ? " is-collapsed" : "";
    const childrenHTML = hasChildren
      ? '<div class="um-tree-children">' + node.children.map(function (child) {
          return renderTreeNode(child, level + 1, keyword);
        }).join("") + "</div>"
      : "";

    return [
      '<div class="um-tree-group' + collapsed + '" data-org-group="' + escapeAttr(node.id) + '">',
      '<div class="um-tree-row' + active + '" data-org-id="' + escapeAttr(node.id) + '" style="padding-left:' + (8 + level * 18) + 'px">',
      '<span class="chev" data-org-toggle="' + escapeAttr(node.id) + '">' + (hasChildren ? chevronHTML() : "") + "</span>",
      '<span class="um-tree-icon' + (node.id === "all" ? " is-root" : "") + '">' + orgIconHTML(node.id === "all", hasChildren) + "</span>",
      '<span class="um-tree-name" title="' + escapeAttr(node.name) + '">' + escapeHTML(node.name) + "</span>",
      "</div>",
      childrenHTML,
      "</div>"
    ].join("");
  }

  function syncFiltersFromDom() {
    state.filters.status = $("umStatusFilter") ? $("umStatusFilter").value : "";
    state.filters.account = $("umAccountFilter") ? $("umAccountFilter").value.trim() : "";
    state.filters.name = $("umNameFilter") ? $("umNameFilter").value.trim() : "";
    state.filters.role = $("umRoleFilter") ? $("umRoleFilter").value : "";
  }

  function filteredUsers() {
    const orgIds = orgDescendantIds(state.activeOrgId);
    return users.filter(function (item) {
      if (!orgIds.has(item.deptId)) return false;
      if (state.filters.status && item.status !== state.filters.status) return false;
      if (state.filters.account && item.account.toLowerCase().indexOf(state.filters.account.toLowerCase()) < 0) return false;
      if (state.filters.name && item.name.indexOf(state.filters.name) < 0) return false;
      if (state.filters.role && roleList(item).indexOf(state.filters.role) < 0) return false;
      return true;
    });
  }

  function renderTable() {
    const tbody = $("umTbody");
    if (!tbody) return;

    const list = filteredUsers();
    const paginationState = userPagination.update(list);
    const pageItems = paginationState.items;
    const pageIds = new Set(pageItems.map(function (item) { return item.id; }));

    tbody.innerHTML = pageItems.length
      ? pageItems.map(renderUserRow).join("")
      : '<tr><td class="um-empty" colspan="9">暂无用户数据</td></tr>';

    const checkAll = $("umCheckAll");
    if (checkAll) {
      checkAll.checked = pageItems.length > 0 && pageItems.every(function (item) {
        return state.selected.has(item.id);
      });
      checkAll.indeterminate = pageItems.some(function (item) {
        return state.selected.has(item.id);
      }) && !checkAll.checked;
      checkAll.dataset.pageIds = Array.from(pageIds).join(",");
    }
  }

  function renderUserRow(item) {
    const disabled = item.status === "disabled";
    const statusText = disabled ? "已禁用" : "正常";
    const statusClass = disabled ? "is-disabled" : "is-normal";
    const toggleAct = disabled ? "enable" : "disable";
    const toggleText = disabled ? "启用" : "禁用";
    return [
      "<tr>",
      '<td><input type="checkbox" data-user-check="' + escapeAttr(item.id) + '"' + (state.selected.has(item.id) ? " checked" : "") + " /></td>",
      '<td><span class="um-main-text um-account-text" title="' + escapeAttr(item.account) + '">' + escapeHTML(item.account) + "</span></td>",
      '<td><span class="um-main-text um-user-name" title="' + escapeAttr(item.name) + '">' + escapeHTML(item.name) + "</span></td>",
      '<td><span class="um-main-text" title="' + escapeAttr(item.dept) + '">' + escapeHTML(item.dept) + "</span></td>",
      '<td><span class="um-main-text" title="' + escapeAttr(item.phone || "-") + '">' + escapeHTML(item.phone || "-") + "</span></td>",
      '<td><span class="um-main-text" title="' + escapeAttr(item.email || "-") + '">' + escapeHTML(item.email || "-") + "</span></td>",
      '<td><span class="um-status ' + statusClass + '">' + statusText + "</span></td>",
      '<td><span class="um-role-list">' + roleList(item).map(function (role) {
        return '<span class="um-role-tag">' + escapeHTML(role) + "</span>";
      }).join("") + "</span></td>",
      '<td><div class="um-row-actions">',
      '<button type="button" class="um-link-btn" data-act="view" data-id="' + escapeAttr(item.id) + '">查看</button>',
      '<button type="button" class="um-link-btn" data-act="edit" data-id="' + escapeAttr(item.id) + '">编辑</button>',
      '<button type="button" class="um-link-btn" data-act="reset-password" data-id="' + escapeAttr(item.id) + '">重置密码</button>',
      '<button type="button" class="um-link-btn" data-act="' + toggleAct + '" data-id="' + escapeAttr(item.id) + '">' + toggleText + "</button>",
      '<button type="button" class="um-link-btn is-danger" data-act="delete" data-id="' + escapeAttr(item.id) + '">删除</button>',
      "</div></td>",
      "</tr>"
    ].join("");
  }

  function setActiveOrg(id) {
    state.activeOrgId = id;
    userPagination.reset();
    state.selected.clear();
    renderTree();
    renderTable();
  }

  function resetFilters() {
    state.filters = { status: "", account: "", name: "", role: "" };
    if ($("umStatusFilter")) $("umStatusFilter").value = "";
    if ($("umAccountFilter")) $("umAccountFilter").value = "";
    if ($("umNameFilter")) $("umNameFilter").value = "";
    if ($("umRoleFilter")) $("umRoleFilter").value = "";
    userPagination.reset();
    state.selected.clear();
    renderTable();
  }

  function openDrawer(mode, id) {
    let draft;
    if (mode === "create") {
      const defaultDept = leafOrgs()[0];
      draft = user("u" + Date.now(), "", "", defaultDept.id, defaultDept.name, "normal", "项目经理", "", "", "");
    } else {
      const item = users.find(function (row) { return row.id === id; });
      if (!item) return;
      draft = clone(item);
    }

    state.drawer = { mode, id: id || draft.id, draft };
    renderDrawer();
    $("umDrawerMask").classList.remove("hidden");
    $("umDrawer").classList.remove("hidden");
    $("umDrawer").setAttribute("aria-hidden", "false");
  }

  function closeDrawer() {
    state.drawer = { mode: null, id: null, draft: null };
    if ($("umDrawerMask")) $("umDrawerMask").classList.add("hidden");
    if ($("umDrawer")) {
      $("umDrawer").classList.add("hidden");
      $("umDrawer").setAttribute("aria-hidden", "true");
    }
  }

  function renderDrawer() {
    const title = $("umDrawerTitle");
    const subtitle = $("umDrawerSubtitle");
    const body = $("umDrawerBody");
    const foot = $("umDrawerFoot");
    if (!title || !subtitle || !body || !foot) return;

    const mode = state.drawer.mode;
    const draft = state.drawer.draft;
    const isView = mode === "view";
    const titleMap = { create: "新增用户", edit: "编辑用户", view: "用户详情" };
    const subtitleMap = {
      create: "创建用户账号并绑定组织、角色与状态。",
      edit: "维护用户基础信息、组织归属与角色配置。",
      view: "查看用户账号、组织归属、角色和启停状态。"
    };

    title.textContent = titleMap[mode] || "用户详情";
    subtitle.textContent = subtitleMap[mode] || "查看与维护用户信息。";
    body.innerHTML = isView ? renderUserView(draft) : renderUserForm(draft);
    foot.innerHTML = isView
      ? '<button type="button" class="ghost-btn" data-act="close-drawer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg><span>关闭</span></button>'
      : [
        '<p class="um-drawer-footnote"><span>*</span>为必填项</p>',
        '<div class="um-drawer-foot-actions">',
        '<button type="button" class="ghost-btn" data-act="cancel"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg><span>取消</span></button>',
        '<button type="button" class="primary-btn" data-act="save-user"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg><span>',
        mode === "create" ? "确定新增" : "保存修改",
        "</span></button>",
        "</div>"
      ].join("");
  }

  function renderUserView(item) {
    return [
      '<div class="um-form-grid">',
      viewCard("账号", item.account),
      viewCard("姓名", item.name),
      viewCard("所属部门", item.dept),
      viewCard("账号状态", item.status === "disabled" ? "已禁用" : "正常"),
      viewCard("手机号", item.phone || "-"),
      viewCard("邮箱", item.email || "-"),
      viewCard("角色", roleText(item), true),
      viewCard("备注", item.remark || "-", true),
      "</div>"
    ].join("");
  }

  function viewCard(label, value, full) {
    return [
      '<div class="um-view-card' + (full ? " full" : "") + '">',
      "<label>" + escapeHTML(label) + "</label>",
      "<div>" + escapeHTML(value) + "</div>",
      "</div>"
    ].join("");
  }

  function renderUserForm(item) {
    return [
      '<div class="um-user-form">',
      '<div class="um-form-grid">',
      field("账号", '<input type="text" data-drawer-field="account" value="' + escapeAttr(item.account) + '" placeholder="请输入账号" />', false, true),
      field("姓名", '<input type="text" data-drawer-field="name" value="' + escapeAttr(item.name) + '" placeholder="请输入姓名" />', false, true),
      field("所属部门", renderDeptSelect(item.deptId), false, true),
      field("账号状态", renderStatusSelect(item.status)),
      field("手机号", '<input type="text" data-drawer-field="phone" value="' + escapeAttr(item.phone) + '" placeholder="请输入手机号" />'),
      field("邮箱", '<input type="email" data-drawer-field="email" value="' + escapeAttr(item.email) + '" placeholder="请输入邮箱" />'),
      field("角色", renderRoleChecks(item), true, true),
      field("备注", '<textarea data-drawer-field="remark" rows="4" placeholder="请输入备注">' + escapeHTML(item.remark) + "</textarea>", true),
      "</div>",
      "</div>"
    ].join("");
  }

  function field(label, control, full, required) {
    return [
      '<div class="field', full ? " full" : "", '">',
      "<label>", escapeHTML(label),
      required ? '<span class="required-mark" aria-hidden="true">*</span>' : "",
      "</label>",
      control,
      "</div>"
    ].join("");
  }

  function renderDeptSelect(selected) {
    return [
      '<select data-drawer-field="deptId">',
      leafOrgs().map(function (node) {
        return '<option value="' + escapeAttr(node.id) + '"' + (node.id === selected ? " selected" : "") + ">" + escapeHTML(node.name) + "</option>";
      }).join(""),
      "</select>"
    ].join("");
  }

  function renderStatusSelect(selected) {
    return [
      '<select data-drawer-field="status">',
      '<option value="normal"' + (selected === "normal" ? " selected" : "") + ">正常</option>",
      '<option value="disabled"' + (selected === "disabled" ? " selected" : "") + ">已禁用</option>",
      "</select>"
    ].join("");
  }

  function renderRoleChecks(item) {
    const selected = roleList(item);
    return [
      '<div class="um-role-checks">',
      roles.map(function (role) {
        return [
          "<label>",
          '<input type="checkbox" data-role-option value="', escapeAttr(role), '"',
          selected.indexOf(role) >= 0 ? " checked" : "",
          " />",
          '<span class="um-role-checkmark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg></span>',
          '<span class="um-role-name">', escapeHTML(role), "</span>",
          "</label>"
        ].join("");
      }).join(""),
      "</div>"
    ].join("");
  }

  function saveUser() {
    const draft = state.drawer.draft;
    if (!draft) return;
    if (!draft.account.trim() || !draft.name.trim()) {
      toast("账号和姓名不能为空");
      return;
    }
    if (!roleList(draft).length) {
      toast("请至少选择一个角色");
      return;
    }
    const duplicate = users.some(function (item) {
      return item.id !== draft.id && item.account === draft.account.trim();
    });
    if (duplicate) {
      toast("账号已存在");
      return;
    }

    draft.account = draft.account.trim();
    draft.name = draft.name.trim();
    const dept = findOrg(draft.deptId);
    draft.dept = dept ? dept.name : draft.dept;

    if (state.drawer.mode === "create") {
      users.unshift(clone(draft));
      toast("已新增用户");
    } else {
      users = users.map(function (item) {
        return item.id === draft.id ? clone(draft) : item;
      });
      toast("已保存修改");
    }
    closeDrawer();
    renderTree();
    renderTable();
  }

  function addOrg(parentId) {
    const node = { id: uid("dept."), name: "新建组织" };
    if (parentId && parentId !== "all") {
      const found = findOrg(parentId);
      if (!found) return;
      found.children = found.children || [];
      found.children.push(node);
      state.collapsed.delete(found.id);
    } else {
      const root = findOrg("all");
      if (!root) return;
      root.children = root.children || [];
      root.children.push(Object.assign(node, { children: [] }));
    }
    state.activeOrgId = node.id;
    userPagination.reset();
    state.selected.clear();
    renderTree();
    renderTable();
    startRenameOrg(node.id);
  }

  function startRenameOrg(id) {
    if (id === "all") return;
    const found = findOrg(id);
    const row = document.querySelector('.um-tree-row[data-org-id="' + id + '"]');
    if (!found || !row) return;
    const nameElement = row.querySelector(".um-tree-name");
    if (!nameElement) return;
    const oldName = found.name;
    nameElement.innerHTML = '<input class="um-tree-edit-input" value="' + escapeAttr(oldName) + '" />';
    const input = nameElement.querySelector("input");
    input.focus();
    input.select();

    let done = false;
    function finish(save) {
      if (done) return;
      done = true;
      const value = input.value.trim();
      if (save && value) {
        found.name = value;
        users = users.map(function (item) {
          return item.deptId === id ? Object.assign({}, item, { dept: value }) : item;
        });
      }
      renderTree();
      renderTable();
    }

    input.addEventListener("blur", function () { finish(true); });
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") finish(true);
      if (event.key === "Escape") finish(false);
    });
    input.addEventListener("click", function (event) { event.stopPropagation(); });
    input.addEventListener("contextmenu", function (event) { event.stopPropagation(); });
  }

  function deleteOrg(id) {
    if (!id || id === "all") return;
    const found = findOrgWithParent(id);
    if (!found) return;
    const removedIds = flattenOrgs([found.org], []).map(function (node) { return node.id; });
    const fallback = leafOrgs().find(function (node) {
      return removedIds.indexOf(node.id) < 0;
    });

    if (found.parent) {
      found.parent.children = (found.parent.children || []).filter(function (node) {
        return node.id !== id;
      });
    } else {
      const root = findOrg("all");
      root.children = (root.children || []).filter(function (node) {
        return node.id !== id;
      });
    }

    if (fallback) {
      users = users.map(function (item) {
        return removedIds.indexOf(item.deptId) >= 0
          ? Object.assign({}, item, { deptId: fallback.id, dept: fallback.name })
          : item;
      });
    }

    if (removedIds.indexOf(state.activeOrgId) >= 0) state.activeOrgId = "all";
    removedIds.forEach(function (orgId) { state.collapsed.delete(orgId); });
    state.selected.clear();
    userPagination.reset();
    renderTree();
    renderTable();
    toast("组织已删除");
  }

  function hideOrgMenu() {
    const menu = $("umOrgCtxMenu");
    if (menu) menu.classList.add("hidden");
    document.querySelectorAll(".um-tree-row.context-active").forEach(function (row) {
      row.classList.remove("context-active");
    });
    state.ctxOrgId = null;
  }

  function openConfirm(type, id) {
    const item = users.find(function (row) { return row.id === id; });
    const org = findOrg(id);
    const textMap = {
      "reset-password": item ? "确定将「" + item.name + "」的密码重置为初始密码吗？" : "",
      disable: item ? "确定禁用「" + item.name + "」吗？禁用后该用户将无法登录。" : "",
      enable: item ? "确定启用「" + item.name + "」吗？" : "",
      delete: item ? "确定删除「" + item.name + "」吗？删除后列表将不再展示该用户。" : "",
      "batch-delete": "确定删除已选择的 " + state.selected.size + " 个用户吗？",
      "org-delete": org ? "确定删除「" + org.name + "」吗？该组织及下级组织会从目录树移除，已有用户将移至其他组织。" : ""
    };
    if (type === "batch-delete" && state.selected.size === 0) {
      toast("请先选择用户");
      return;
    }
    if (!textMap[type]) return;
    state.confirm = { type, id };
    $("umConfirmTitle").textContent = "操作确认";
    $("umConfirmText").textContent = textMap[type];
    $("umConfirmModal").classList.remove("hidden");
  }

  function closeConfirm() {
    state.confirm = null;
    if ($("umConfirmModal")) $("umConfirmModal").classList.add("hidden");
  }

  function runConfirm() {
    if (!state.confirm) return;
    const type = state.confirm.type;
    const id = state.confirm.id;

    if (type === "reset-password") {
      toast("密码已重置为初始密码");
    } else if (type === "disable" || type === "enable") {
      users = users.map(function (item) {
        if (item.id !== id) return item;
        return Object.assign({}, item, { status: type === "disable" ? "disabled" : "normal" });
      });
      toast(type === "disable" ? "已禁用用户" : "已启用用户");
    } else if (type === "delete") {
      users = users.filter(function (item) { return item.id !== id; });
      state.selected.delete(id);
      toast("已删除用户");
    } else if (type === "batch-delete") {
      users = users.filter(function (item) { return !state.selected.has(item.id); });
      state.selected.clear();
      toast("已删除所选用户");
    } else if (type === "org-delete") {
      deleteOrg(id);
    }

    closeConfirm();
    if (type !== "org-delete") {
      renderTree();
      renderTable();
    }
  }

  function updateDrawerField(target) {
    const draft = state.drawer.draft;
    if (!draft) return;
    const fieldName = target.getAttribute("data-drawer-field");
    draft[fieldName] = target.value;
    if (fieldName === "deptId") {
      const dept = findOrg(target.value);
      draft.dept = dept ? dept.name : "";
    }
  }

  function updateDrawerRoles() {
    const draft = state.drawer.draft;
    const drawer = $("umDrawer");
    if (!draft || !drawer) return;
    draft.role = Array.from(drawer.querySelectorAll("[data-role-option]:checked")).map(function (input) {
      return input.value;
    });
  }

  function formatDateStamp() {
    const now = new Date();
    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join("");
  }

  function setImportError(message) {
    const errorBox = $("umImportError");
    if (!errorBox) return;
    errorBox.textContent = message || "";
    errorBox.classList.toggle("hidden", !message);
  }

  function resetImportState() {
    importReadSequence += 1;
    state.importDuplicateMode = "skip";
    state.importData = { fileName: "", rows: [], complete: false };
    setImportError("");
    if ($("umImportModal")) $("umImportModal").classList.remove("is-previewing");
    ["umImportSummary", "umImportComplete"].forEach(function (id) {
      if ($(id)) $(id).classList.add("hidden");
    });
    if ($("umImportSetup")) $("umImportSetup").classList.remove("hidden");
    if ($("umImportDropzone")) {
      $("umImportDropzone").classList.remove("hidden", "is-dragging");
      $("umImportDropzone").removeAttribute("aria-busy");
    }
    if ($("umImportFile")) $("umImportFile").value = "";
    document.querySelectorAll('[name="umImportDuplicateMode"]').forEach(function (input) {
      input.checked = input.value === "skip";
    });
    if ($("umImportCancelLabel")) $("umImportCancelLabel").textContent = "取消";
    if ($("umImportFootnoteText")) $("umImportFootnoteText").textContent = "选择文件后，将展示校验汇总";
    if ($("umImportConfirm")) {
      $("umImportConfirm").classList.remove("hidden");
      $("umImportConfirm").disabled = true;
    }
  }

  function openImportModal() {
    resetImportState();
    $("umImportMask").classList.remove("hidden");
    $("umImportModal").classList.remove("hidden");
  }

  function closeImportModal() {
    $("umImportMask").classList.add("hidden");
    $("umImportModal").classList.add("hidden");
    resetImportState();
  }

  function styleTemplateHeader(row) {
    row.height = 24;
    row.eachCell(function (cell) {
      cell.font = { name: "Microsoft YaHei", size: 10, bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF4472C4" } };
      cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
      cell.border = {
        top: { style: "thin", color: { argb: "FFD0D5DD" } },
        left: { style: "thin", color: { argb: "FFD0D5DD" } },
        bottom: { style: "thin", color: { argb: "FFD0D5DD" } },
        right: { style: "thin", color: { argb: "FFD0D5DD" } }
      };
    });
  }

  function styleTemplateBody(row, rowNumber) {
    row.height = 22;
    row.eachCell({ includeEmpty: true }, function (cell) {
      cell.font = { name: "Microsoft YaHei", size: 10, color: { argb: "FF344054" } };
      cell.alignment = { vertical: "middle", wrapText: true };
      cell.border = {
        top: { style: "thin", color: { argb: "FFE4E7EC" } },
        left: { style: "thin", color: { argb: "FFE4E7EC" } },
        bottom: { style: "thin", color: { argb: "FFE4E7EC" } },
        right: { style: "thin", color: { argb: "FFE4E7EC" } }
      };
      if (rowNumber % 2 === 0) {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF8FAFC" } };
      }
    });
  }

  function appendUserDataSheet(workbook, rows) {
    const worksheet = workbook.addWorksheet(USER_FILE_SHEET_NAME);
    styleTemplateHeader(worksheet.addRow(USER_FILE_HEADERS));
    rows.forEach(function (values, index) {
      styleTemplateBody(worksheet.addRow(values), index + 2);
    });
    USER_FILE_WIDTHS.forEach(function (width, index) {
      worksheet.getColumn(index + 1).width = width;
    });
    worksheet.views = [{ state: "frozen", ySplit: 1 }];
    worksheet.autoFilter = { from: "A1", to: "H1" };
    const validationRowCount = Math.max(201, rows.length + 1);
    for (let rowNumber = 2; rowNumber <= validationRowCount; rowNumber += 1) {
      worksheet.getCell("C" + rowNumber).dataValidation = {
        type: "list",
        allowBlank: false,
        formulae: ['"' + leafOrgs().map(function (node) { return node.name; }).join(",") + '"']
      };
      worksheet.getCell("G" + rowNumber).dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: ['"正常,已禁用"']
      };
    }
    return worksheet;
  }

  function appendUserInstructionSheet(workbook) {
    const instructionSheet = workbook.addWorksheet("填写说明");
    instructionSheet.columns = [{ width: 18 }, { width: 76 }];
    styleTemplateHeader(instructionSheet.addRow(["字段", "填写要求"]));
    [
      ["账号", "必填；在系统及当前导入文件中必须唯一。"],
      ["姓名", "必填。"],
      ["所属组织", "必填；必须使用模板下拉列表中的组织名称。"],
      ["手机号码", "选填；填写时需为11位手机号码。"],
      ["邮箱", "选填；填写时需为有效邮箱地址。"],
      ["角色", "必填；可填写项目经理、业务组长、质量审核、部门负责人、系统管理员；多个角色使用顿号分隔。"],
      ["状态", "选填；仅支持正常、已禁用，未填写时默认为正常。"],
      ["备注", "选填。"]
    ].forEach(function (values, index) {
      styleTemplateBody(instructionSheet.addRow(values), index + 2);
    });
    instructionSheet.views = [{ state: "frozen", ySplit: 1 }];
  }

  function createUserFileWorkbook(subject, title, rows) {
    const workbook = window.AppExcelExport.createWorkbook({ subject, title });
    appendUserDataSheet(workbook, rows);
    appendUserInstructionSheet(workbook);
    return workbook;
  }

  async function downloadImportTemplate() {
    const button = document.querySelector('[data-act="download-import-template"]');
    if (!window.ExcelJS || !window.AppExcelExport) {
      setImportError("Excel 组件加载失败，请刷新页面后重试。");
      return;
    }
    if (button && button.disabled) return;
    if (button) {
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      const label = button.querySelector("span");
      if (label) label.textContent = "生成模板中…";
    }
    try {
      const workbook = createUserFileWorkbook(
        "用户导入模板",
        "业务管理系统用户导入模板",
        [[
          "liming",
          "李明",
          "华东销售部",
          "13800000009",
          "liming@example.com",
          "项目经理、质量审核",
          "正常",
          "示例数据，正式导入前请删除"
        ]]
      );
      await window.AppExcelExport.downloadWorkbook(workbook, "用户导入模板.xlsx");
      setImportError("");
    } catch (error) {
      console.error("User import template generation failed", error);
      setImportError("导入模板生成失败，请稍后重试。");
    } finally {
      if (button) {
        button.disabled = false;
        button.removeAttribute("aria-busy");
        const label = button.querySelector("span");
        if (label) label.textContent = "下载导入模板";
      }
    }
  }

  function excelCellText(cell) {
    if (!cell) return "";
    if (typeof cell.text === "string") return cell.text.trim();
    if (cell.value == null) return "";
    return String(cell.value).trim();
  }

  function findImportHeader(worksheet) {
    const maxHeaderRow = Math.min(10, worksheet.rowCount);
    for (let rowNumber = 1; rowNumber <= maxHeaderRow; rowNumber += 1) {
      const row = worksheet.getRow(rowNumber);
      const map = {};
      row.eachCell({ includeEmpty: true }, function (cell, columnNumber) {
        const label = excelCellText(cell).replace(/\s+/g, "");
        if (label) map[label] = columnNumber;
      });
      if (map["账号"] && map["姓名"]) return { rowNumber, map };
    }
    return null;
  }

  function parseImportWorksheet(worksheet) {
    const header = findImportHeader(worksheet);
    if (!header) throw new Error("未找到包含“账号、姓名”的表头");
    const requiredHeaders = ["账号", "姓名", "所属组织", "角色"];
    const missingHeaders = requiredHeaders.filter(function (label) { return !header.map[label]; });
    if (missingHeaders.length) throw new Error("缺少必填列：" + missingHeaders.join("、"));

    const fileAccounts = new Set();
    const organizations = leafOrgs();
    const rows = [];
    for (let rowNumber = header.rowNumber + 1; rowNumber <= worksheet.rowCount; rowNumber += 1) {
      const row = worksheet.getRow(rowNumber);
      const valueFor = function (label) {
        return header.map[label] ? excelCellText(row.getCell(header.map[label])) : "";
      };
      const account = valueFor("账号");
      const name = valueFor("姓名");
      const deptName = valueFor("所属组织");
      const phone = valueFor("手机号码");
      const email = valueFor("邮箱");
      const roleValue = valueFor("角色");
      const rawStatusValue = valueFor("状态");
      const remark = valueFor("备注");
      if (![account, name, deptName, phone, email, roleValue, rawStatusValue, remark].some(Boolean)) continue;
      const statusValue = rawStatusValue || "正常";

      const errors = [];
      const normalizedAccount = account.toLowerCase();
      const existingUser = account
        ? users.find(function (item) { return item.account.toLowerCase() === normalizedAccount; })
        : null;
      const dept = organizations.find(function (item) {
        return item.name === deptName || item.id === deptName;
      });
      const importedRoles = roleValue.split(/[、,，;；/]/).map(function (item) {
        return item.trim();
      }).filter(Boolean);
      const invalidRoles = importedRoles.filter(function (item) {
        return roles.indexOf(item) < 0;
      });
      const statusMap = { 正常: "normal", 已禁用: "disabled", normal: "normal", disabled: "disabled" };

      if (!account) errors.push("账号不能为空");
      else if (fileAccounts.has(normalizedAccount)) errors.push("文件内账号重复");
      if (!name) errors.push("姓名不能为空");
      if (!deptName) errors.push("所属组织不能为空");
      else if (!dept) errors.push("所属组织不存在");
      if (!importedRoles.length) errors.push("角色不能为空");
      else if (invalidRoles.length) errors.push("角色不存在：" + invalidRoles.join("、"));
      if (phone && !/^1\d{10}$/.test(phone)) errors.push("手机号码格式错误");
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("邮箱格式错误");
      if (!statusMap[statusValue]) errors.push("状态仅支持正常或已禁用");
      if (account) fileAccounts.add(normalizedAccount);

      rows.push({
        account,
        name,
        deptId: dept ? dept.id : "",
        dept: dept ? dept.name : deptName,
        phone,
        email,
        roles: importedRoles,
        status: statusMap[statusValue] || "normal",
        remark,
        existingUserId: existingUser ? existingUser.id : "",
        errors
      });
    }
    return rows;
  }

  function importRowAction(row) {
    if (row.errors.length) return "invalid";
    if (!row.existingUserId) return "create";
    return state.importDuplicateMode === "overwrite" ? "overwrite" : "skip";
  }

  function importStats() {
    return state.importData.rows.reduce(function (stats, row) {
      stats[importRowAction(row)] += 1;
      return stats;
    }, { create: 0, overwrite: 0, skip: 0, invalid: 0 });
  }

  function userFromImportRow(row, id) {
    return user(
      id,
      row.account.trim(),
      row.name.trim(),
      row.deptId,
      row.dept,
      row.status,
      row.roles,
      row.phone,
      row.email,
      row.remark
    );
  }

  function renderImportResult() {
    const stats = importStats();
    const duplicateCount = state.importDuplicateMode === "overwrite" ? stats.overwrite : stats.skip;
    const actionableCount = stats.create + stats.overwrite;
    $("umImportSummary").classList.remove("hidden");
    $("umImportFileName").textContent = state.importData.fileName;
    $("umImportTotal").textContent = state.importData.rows.length;
    $("umImportNew").textContent = stats.create;
    $("umImportDuplicateLabel").textContent = state.importDuplicateMode === "overwrite" ? "重复覆盖" : "重复跳过";
    $("umImportDuplicate").textContent = duplicateCount;
    $("umImportInvalid").textContent = stats.invalid;
    $("umImportConfirm").disabled = actionableCount === 0;
    $("umImportModal").classList.add("is-previewing");
    $("umImportFootnoteText").textContent = [
      "校验完成：新增 ", stats.create,
      " 条，", state.importDuplicateMode === "overwrite" ? "覆盖 " : "跳过 ",
      duplicateCount, " 条，异常 ", stats.invalid, " 条"
    ].join("");
  }

  async function readImportFile(file) {
    setImportError("");
    if (!file) return;
    if (!window.ExcelJS) {
      setImportError("Excel 组件加载失败，请刷新页面后重试。");
      return;
    }
    if (!/\.xlsx$/i.test(file.name)) {
      setImportError("仅支持 .xlsx 格式，请使用下载的用户导入模板。");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setImportError("文件不能超过 10 MB。");
      return;
    }

    const requestId = ++importReadSequence;
    $("umImportDropzone").setAttribute("aria-busy", "true");
    $("umImportConfirm").disabled = true;
    $("umImportFootnoteText").textContent = "正在解析并校验文件，请稍候…";
    try {
      const workbook = new window.ExcelJS.Workbook();
      await workbook.xlsx.load(await file.arrayBuffer());
      const worksheet = workbook.getWorksheet("用户导入模板") || workbook.worksheets[0];
      if (!worksheet) throw new Error("工作簿中没有可读取的工作表");
      const rows = parseImportWorksheet(worksheet);
      if (!rows.length) throw new Error("模板中没有可导入的数据");
      if (requestId !== importReadSequence) return;
      state.importData = { fileName: file.name, rows, complete: false };
      renderImportResult();
    } catch (error) {
      if (requestId !== importReadSequence) return;
      console.error("User import parse failed", error);
      state.importData = { fileName: "", rows: [], complete: false };
      $("umImportSummary").classList.add("hidden");
      $("umImportModal").classList.remove("is-previewing");
      $("umImportFootnoteText").textContent = "文件解析失败，请检查后重新选择";
      setImportError("文件解析失败：" + (error.message || "请检查模板格式"));
    } finally {
      if (requestId === importReadSequence) {
        $("umImportDropzone").removeAttribute("aria-busy");
        if ($("umImportFile")) $("umImportFile").value = "";
      }
    }
  }

  function confirmImport() {
    if (state.importData.complete) return;
    const createRows = state.importData.rows.filter(function (row) { return importRowAction(row) === "create"; });
    const overwriteRows = state.importData.rows.filter(function (row) { return importRowAction(row) === "overwrite"; });
    if (!createRows.length && !overwriteRows.length) return;
    const overwriteMap = new Map(overwriteRows.map(function (row) { return [row.existingUserId, row]; }));
    users = users.map(function (item) {
      const overwriteRow = overwriteMap.get(item.id);
      return overwriteRow ? userFromImportRow(overwriteRow, item.id) : item;
    });
    const importedUsers = createRows.map(function (row) {
      return userFromImportRow(row, uid("u"));
    });
    users = importedUsers.concat(users);
    state.importData.complete = true;
    state.selected.clear();
    userPagination.reset();
    renderTree();
    renderTable();

    const stats = importStats();
    $("umImportSetup").classList.add("hidden");
    $("umImportModal").classList.remove("is-previewing");
    $("umImportComplete").classList.remove("hidden");
    $("umImportCompleteTitle").textContent = "用户导入处理完成";
    const completeParts = [];
    if (createRows.length) completeParts.push("新增 " + createRows.length + " 位用户");
    if (overwriteRows.length) completeParts.push("覆盖 " + overwriteRows.length + " 位用户");
    if (stats.skip) completeParts.push("跳过 " + stats.skip + " 条重复数据");
    if (stats.invalid) completeParts.push(stats.invalid + " 条异常数据未导入");
    $("umImportCompleteText").textContent = completeParts.join("，") + "。";
    $("umImportConfirm").classList.add("hidden");
    $("umImportCancelLabel").textContent = "完成";
    $("umImportFootnoteText").textContent = "导入结果已写入当前用户列表";
  }

  async function exportUsers() {
    if (!window.ExcelJS || !window.AppExcelExport) {
      toast("Excel 导出组件加载失败，请刷新页面后重试", "error");
      return;
    }
    const exportButton = document.querySelector('[data-act="export"]');
    if (exportButton && exportButton.disabled) return;
    const selectedUsers = state.selected.size
      ? users.filter(function (item) { return state.selected.has(item.id); })
      : filteredUsers();
    if (!selectedUsers.length) {
      toast("当前条件下没有可导出的用户", "error");
      return;
    }
    if (exportButton) {
      exportButton.disabled = true;
      exportButton.setAttribute("aria-busy", "true");
      const label = exportButton.querySelector("[data-export-label]");
      if (label) label.textContent = "导出中…";
    }
    try {
      const activeOrg = findOrg(state.activeOrgId);
      const workbook = createUserFileWorkbook(
        "用户清单",
        "业务管理系统用户清单",
        selectedUsers.map(function (item) {
          return [
            item.account,
            item.name,
            item.dept,
            item.phone || "",
            item.email || "",
            roleText(item),
            item.status === "disabled" ? "已禁用" : "正常",
            item.remark || ""
          ];
        })
      );
      const scopeLabel = state.selected.size ? "已选" + selectedUsers.length + "人" : activeOrg ? activeOrg.name : "全部组织";
      const fileName = window.AppExcelExport.safeFileName(
        "用户清单【" + scopeLabel + "_" + formatDateStamp() + "】.xlsx"
      );
      await window.AppExcelExport.downloadWorkbook(workbook, fileName);
    } catch (error) {
      console.error("User export failed", error);
      toast("用户清单导出失败，请稍后重试", "error");
    } finally {
      if (exportButton) {
        exportButton.disabled = false;
        exportButton.removeAttribute("aria-busy");
        const label = exportButton.querySelector("[data-export-label]");
        if (label) label.textContent = "导出";
      }
    }
  }

  function bindEvents() {
    document.addEventListener("click", function (event) {
      const orgMenuAction = event.target.closest("#umOrgCtxMenu [data-act]");
      if (orgMenuAction) {
        const act = orgMenuAction.getAttribute("data-act");
        const orgId = state.ctxOrgId;
        hideOrgMenu();
        if (act === "org-new") addOrg(orgId);
        else if (act === "org-rename") startRenameOrg(orgId);
        else if (act === "org-delete") openConfirm("org-delete", orgId);
        return;
      }

      if (!event.target.closest("#umOrgCtxMenu")) hideOrgMenu();
      const toggle = event.target.closest("[data-org-toggle]");
      if (toggle && toggle.getAttribute("data-org-toggle")) {
        const id = toggle.getAttribute("data-org-toggle");
        if (state.collapsed.has(id)) state.collapsed.delete(id);
        else state.collapsed.add(id);
        renderTree();
        return;
      }

      const orgRow = event.target.closest("[data-org-id]");
      if (orgRow) {
        setActiveOrg(orgRow.getAttribute("data-org-id"));
        return;
      }

      const action = event.target.closest("[data-act]");
      if (!action) return;
      const act = action.getAttribute("data-act");
      const id = action.getAttribute("data-id");
      if (act === "create") openDrawer("create");
      else if (act === "view") openDrawer("view", id);
      else if (act === "edit") openDrawer("edit", id);
      else if (act === "close-drawer" || act === "cancel") closeDrawer();
      else if (act === "save-user") saveUser();
      else if (act === "reset-password" || act === "disable" || act === "enable" || act === "delete") openConfirm(act, id);
      else if (act === "batch-delete") openConfirm("batch-delete");
      else if (act === "search") {
        syncFiltersFromDom();
        userPagination.reset();
        state.selected.clear();
        renderTable();
      } else if (act === "reset-filter") {
        resetFilters();
      } else if (act === "import") {
        openImportModal();
      } else if (act === "export") {
        exportUsers();
      } else if (act === "download-import-template") {
        downloadImportTemplate();
      } else if (act === "select-import-file") {
        $("umImportFile").click();
      } else if (act === "confirm-import") {
        confirmImport();
      } else if (act === "close-import") {
        closeImportModal();
      }
    });

    document.addEventListener("input", function (event) {
      if (event.target.id === "umOrgSearch") {
        state.orgKeyword = event.target.value;
        renderTree();
        return;
      }
      if (event.target.matches("[data-drawer-field]")) updateDrawerField(event.target);
    });

    document.addEventListener("change", function (event) {
      const target = event.target;
      if (target.name === "umImportDuplicateMode") {
        state.importDuplicateMode = target.value === "overwrite" ? "overwrite" : "skip";
        if (state.importData.rows.length && !state.importData.complete) renderImportResult();
        return;
      }
      if (target.id === "umImportFile") {
        readImportFile(target.files && target.files[0]);
        return;
      }
      if (target.matches("[data-role-option]")) {
        updateDrawerRoles();
        return;
      }
      if (target.matches("[data-drawer-field]")) {
        updateDrawerField(target);
        return;
      }
      if (target.id === "umStatusFilter" || target.id === "umRoleFilter") {
        syncFiltersFromDom();
        userPagination.reset();
        state.selected.clear();
        renderTable();
        return;
      }
      if (target.id === "umCheckAll") {
        const ids = (target.dataset.pageIds || "").split(",").filter(Boolean);
        ids.forEach(function (id) {
          if (target.checked) state.selected.add(id);
          else state.selected.delete(id);
        });
        renderTable();
        return;
      }
      if (target.matches("[data-user-check]")) {
        const id = target.getAttribute("data-user-check");
        if (target.checked) state.selected.add(id);
        else state.selected.delete(id);
        renderTable();
      }
    });

    ["umConfirmCancel", "umConfirmClose"].forEach(function (id) {
      const element = $(id);
      if (element) element.addEventListener("click", closeConfirm);
    });
    if ($("umConfirmOk")) $("umConfirmOk").addEventListener("click", runConfirm);
    if ($("umDrawerMask")) $("umDrawerMask").addEventListener("click", closeDrawer);
    if ($("umImportMask")) $("umImportMask").addEventListener("click", closeImportModal);
    const importDropzone = $("umImportDropzone");
    if (importDropzone) {
      importDropzone.addEventListener("click", function () {
        $("umImportFile").click();
      });
      importDropzone.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          $("umImportFile").click();
        }
      });
      ["dragenter", "dragover"].forEach(function (eventName) {
        importDropzone.addEventListener(eventName, function (event) {
          event.preventDefault();
          importDropzone.classList.add("is-dragging");
        });
      });
      ["dragleave", "drop"].forEach(function (eventName) {
        importDropzone.addEventListener(eventName, function (event) {
          event.preventDefault();
          importDropzone.classList.remove("is-dragging");
        });
      });
      importDropzone.addEventListener("drop", function (event) {
        readImportFile(event.dataTransfer && event.dataTransfer.files[0]);
      });
    }
    const tree = $("umOrgTree");
    if (tree) {
      tree.addEventListener("contextmenu", function (event) {
        const row = event.target.closest(".um-tree-row[data-org-id]");
        if (!row || row.getAttribute("data-org-id") === "all") return;
        event.preventDefault();
        hideOrgMenu();
        row.classList.add("context-active");
        state.ctxOrgId = row.getAttribute("data-org-id");
        const menu = $("umOrgCtxMenu");
        if (!menu) return;
        menu.style.left = Math.min(event.clientX, window.innerWidth - 170) + "px";
        menu.style.top = Math.min(event.clientY, window.innerHeight - 130) + "px";
        menu.classList.remove("hidden");
      });
    }

    window.addEventListener("resize", hideOrgMenu);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        hideOrgMenu();
        closeDrawer();
        closeConfirm();
        closeImportModal();
      }
    });
  }

  function init() {
    userPagination = window.AppPagination.create({
      container: $("umPager"),
      variant: "table",
      itemLabel: "条",
      onChange: renderTable
    });
    renderTree();
    renderTable();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
