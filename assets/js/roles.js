(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const functionGroups = [
    {
      id: "menu.dashboard",
      scope: "business",
      title: "工作台",
      direct: true,
      actions: [
        ["menu.dashboard.view", "查看"]
      ],
      menus: []
    },
    {
      id: "group.business",
      scope: "business",
      title: "经营管理",
      menus: [
        menu("business.efficiency", "人效看板", [
          ["business.efficiency.view", "查看"]
        ]),
        menu("business.operation", "运营看板", [
          ["business.operation.view", "查看"]
        ]),
        menu("business.reports", "报表报告", [
          ["business.reports.view", "查看"]
        ]),
        menu("business.customerEvaluation", "客户评价", [
          ["business.customerEvaluation.view", "查看"]
        ])
      ]
    },
    {
      id: "group.special",
      scope: "business",
      title: "专项管理",
      menus: [
        menu("special.list", "专项工作", [
          ["special.list.view", "查看"]
        ]),
        menu("special.results", "结果看板", [
          ["special.results.view", "查看"]
        ])
      ]
    },
    {
      id: "menu.performance",
      scope: "business",
      title: "绩效看板",
      direct: true,
      actions: [
        ["menu.performance.view", "查看"]
      ],
      menus: []
    },
    {
      id: "group.system",
      scope: "system",
      title: "系统管理",
      menus: [
        menu("system.users", "用户管理", [
          ["system.users.search", "查询"],
          ["system.users.create", "新增用户"],
          ["system.users.edit", "编辑用户"],
          ["system.users.resetPassword", "重置密码"],
          ["system.users.toggleStatus", "启用 / 禁用"],
          ["system.users.delete", "删除用户"]
        ]),
        menu("system.roles", "角色管理", [
          ["system.roles.view", "查看"],
          ["system.roles.create", "新增角色"],
          ["system.roles.rename", "重命名"],
          ["system.roles.delete", "删除角色"],
          ["system.roles.permission", "配置功能权限"]
        ])
      ]
    }
  ];

  const functionBlocks = [
    {
      id: "block.menu",
      title: "功能菜单",
      children: functionGroups
    }
  ];

  const allFunctionIds = functionBlocks.flatMap((block) => functionBlockIds(block));
  const businessFunctionIds = functionGroups
    .filter((group) => group.scope === "business")
    .flatMap((group) => functionGroupIds(group));
  const businessLeaderFunctionIds = permissionIds([
    "menu.dashboard",
    "group.business",
    "menu.performance"
  ]);
  const qualityReviewFunctionIds = permissionIds([
    "menu.dashboard",
    "business.reports",
    "business.customerEvaluation",
    "special.results",
    "menu.performance"
  ]);

  let roleSequence = 6;
  let roles = [
    makeRole("r1", "项目经理", "项目经营与专项执行权限", 8, businessFunctionIds),
    makeRole("r2", "业务组长", "经营管理与团队绩效权限", 6, businessLeaderFunctionIds),
    makeRole("r3", "质量审核", "报告、客户评价与结果审核权限", 4, qualityReviewFunctionIds),
    makeRole("r4", "部门负责人", "部门经营与绩效全局权限", 3, businessFunctionIds),
    makeRole("r5", "系统管理员", "系统配置与全域功能权限", 2, allFunctionIds)
  ];
  let activeRoleId = "r1";
  let contextRoleId = null;
  let deleteRoleId = null;

  function menu(id, name, actions) {
    return { id, name, actions };
  }

  function functionGroupIds(group) {
    return [
      group.id,
      ...(group.actions || []).map((action) => action[0]),
      ...(group.menus || []).flatMap((item) => [item.id, ...item.actions.map((action) => action[0])])
    ];
  }

  function functionBlockIds(block) {
    return [
      block.id,
      ...block.children.flatMap((group) => functionGroupIds(group))
    ];
  }

  function permissionIds(ids) {
    return Array.from(new Set(ids.flatMap((id) => findFunctionBranchIds(id))));
  }

  function makeRole(id, name, description, users, functions) {
    return {
      id,
      name,
      desc: description,
      users,
      functions: new Set(functions)
    };
  }

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function currentRole() {
    return roles.find((role) => role.id === activeRoleId) || roles[0];
  }

  function roleInitial(name) {
    return String(name || "新").trim().slice(0, 1) || "新";
  }

  function renderRoles(editRoleId) {
    const list = $("roleList");
    if (!list) return;
    list.innerHTML = roles.map((role) => {
      const active = role.id === activeRoleId ? " is-active" : "";
      const nameHTML = editRoleId === role.id
        ? '<input class="role-name-input" data-role-name-input="' + role.id + '" value="' + escapeHTML(role.name) + '" />'
        : '<span class="role-name" title="' + escapeHTML(role.name) + '">' + escapeHTML(role.name) + "</span>";
      return [
        '<button type="button" class="role-item' + active + '" data-role-id="' + role.id + '">',
        '<span class="role-avatar">' + escapeHTML(roleInitial(role.name)) + "</span>",
        '<span class="role-meta">',
        nameHTML,
        '<span class="role-desc" title="' + escapeHTML(role.desc) + '">' + escapeHTML(role.desc) + "</span>",
        "</span>",
        '<span class="role-badge">' + role.users + "人</span>",
        "</button>"
      ].join("");
    }).join("");

    if (editRoleId) {
      const input = list.querySelector('[data-role-name-input="' + editRoleId + '"]');
      if (input) {
        input.focus();
        input.select();
      }
    }
  }

  function renderAll(editRoleId) {
    const role = currentRole();
    const roleName = $("selectedRoleName");
    if (roleName) roleName.textContent = role ? role.name : "";
    renderRoles(editRoleId);
    renderPermission();
  }

  function renderPermission() {
    const body = $("rolePermBody");
    if (!body) return;
    const role = currentRole();
    body.innerHTML = role ? renderFunction(role) : "";
  }

  function renderFunction(role) {
    return '<div class="function-permission-list">' + functionBlocks.map((block) => {
      return [
        '<section class="function-block">',
        '<label class="function-block-head">',
        '<input type="checkbox" data-perm-kind="function" data-perm-id="' + block.id + '"' + (isFunctionChecked(role, block.id) ? " checked" : "") + " />",
        "<strong>" + escapeHTML(block.title) + "</strong>",
        "</label>",
        '<div class="function-block-body">',
        block.children.map((group) => renderFunctionGroup(role, group)).join(""),
        "</div>",
        "</section>"
      ].join("");
    }).join("") + "</div>";
  }

  function renderFunctionGroup(role, group) {
    if (group.direct) {
      return '<div class="function-group is-direct"><div class="function-menu-list is-flat">' + renderFunctionMenu(role, {
        id: group.id,
        name: group.title,
        actions: group.actions || []
      }) + "</div></div>";
    }
    return [
      '<div class="function-group">',
      '<label class="function-group-head">',
      '<span class="function-caret">' + chevronIconHTML() + "</span>",
      '<input type="checkbox" data-perm-kind="function" data-perm-id="' + group.id + '"' + (isFunctionChecked(role, group.id) ? " checked" : "") + " />",
      "<strong>" + escapeHTML(group.title) + "</strong>",
      "</label>",
      '<div class="function-menu-list">',
      (group.menus || []).map((item) => renderFunctionMenu(role, item)).join(""),
      "</div>",
      "</div>"
    ].join("");
  }

  function renderFunctionMenu(role, item) {
    return [
      '<div class="function-menu-row">',
      '<label class="function-menu-check">',
      '<input type="checkbox" data-perm-kind="function" data-perm-id="' + item.id + '"' + (isFunctionChecked(role, item.id) ? " checked" : "") + " />",
      '<span title="' + escapeHTML(item.name) + '">' + escapeHTML(item.name) + "</span>",
      "</label>",
      '<div class="function-action-list">',
      item.actions.map((action) => [
        '<label class="function-action-check">',
        '<input type="checkbox" data-perm-kind="function" data-perm-id="' + action[0] + '"' + (role.functions.has(action[0]) ? " checked" : "") + " />",
        '<span title="' + escapeHTML(action[1]) + '">' + escapeHTML(action[1]) + "</span>",
        "</label>"
      ].join("")).join(""),
      "</div>",
      "</div>"
    ].join("");
  }

  function isFunctionChecked(role, id) {
    const ids = findFunctionBranchIds(id);
    return ids.length ? ids.every((itemId) => role.functions.has(itemId)) : role.functions.has(id);
  }

  function chevronIconHTML() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  }

  function selectRole(roleId) {
    activeRoleId = roleId;
    renderAll();
  }

  function addRole() {
    const id = "r" + roleSequence++;
    const role = makeRole(id, "新建角色", "自定义权限角色", 0, []);
    roles.push(role);
    activeRoleId = id;
    renderAll(id);
  }

  function beginRename(roleId) {
    activeRoleId = roleId;
    hideContextMenu();
    renderAll(roleId);
  }

  function saveRename(input) {
    const roleId = input.getAttribute("data-role-name-input");
    const role = roles.find((item) => item.id === roleId);
    if (!role) return;
    role.name = input.value.trim() || role.name;
    renderAll();
  }

  function openDelete(roleId) {
    const role = roles.find((item) => item.id === roleId);
    if (!role) return;
    deleteRoleId = roleId;
    hideContextMenu();
    const text = $("roleDeleteText");
    if (text) text.textContent = "确定删除“" + role.name + "”吗？删除后，该角色的权限配置将一并移除。";
    showModal("roleDeleteModal");
  }

  function confirmDelete() {
    if (!deleteRoleId || roles.length <= 1) {
      closeDeleteModal();
      return;
    }
    const index = roles.findIndex((role) => role.id === deleteRoleId);
    roles = roles.filter((role) => role.id !== deleteRoleId);
    if (activeRoleId === deleteRoleId) {
      const nextRole = roles[Math.max(0, index - 1)] || roles[0];
      activeRoleId = nextRole.id;
    }
    closeDeleteModal();
    renderAll();
  }

  function closeDeleteModal() {
    deleteRoleId = null;
    hideModal("roleDeleteModal");
  }

  function showModal(id) {
    const modal = $(id);
    if (modal) modal.classList.remove("hidden");
  }

  function hideModal(id) {
    const modal = $(id);
    if (modal) modal.classList.add("hidden");
  }

  function showContextMenu(event, roleId) {
    const menuElement = $("roleCtxMenu");
    if (!menuElement) return;
    contextRoleId = roleId;
    activeRoleId = roleId;
    renderAll();
    const width = 132;
    const height = 118;
    const left = Math.min(event.clientX, window.innerWidth - width - 8);
    const top = Math.min(event.clientY, window.innerHeight - height - 8);
    menuElement.style.left = Math.max(8, left) + "px";
    menuElement.style.top = Math.max(8, top) + "px";
    menuElement.classList.remove("hidden");
  }

  function hideContextMenu() {
    const menuElement = $("roleCtxMenu");
    if (menuElement) menuElement.classList.add("hidden");
  }

  function togglePermission(id, checked) {
    const role = currentRole();
    if (!role) return;
    updateFunctionPermission(role, id, checked);
    renderPermission();
  }

  function updateSet(set, id, checked) {
    if (checked) set.add(id);
    else set.delete(id);
  }

  function updateFunctionPermission(role, id, checked) {
    const ids = findFunctionBranchIds(id);
    (ids.length ? ids : [id]).forEach((itemId) => updateSet(role.functions, itemId, checked));
  }

  function findFunctionBranchIds(id) {
    for (const block of functionBlocks) {
      if (block.id === id) return functionBlockIds(block);
    }
    for (const group of functionGroups) {
      if (group.id === id) return functionGroupIds(group);
      for (const action of group.actions || []) {
        if (action[0] === id) return [id];
      }
      for (const item of group.menus || []) {
        if (item.id === id) return [item.id, ...item.actions.map((action) => action[0])];
        if (item.actions.some((action) => action[0] === id)) return [id];
      }
    }
    return [id];
  }

  function toast(text) {
    if (typeof window.showToast === "function") {
      window.showToast(text);
    }
  }

  function bindEvents() {
    const addButton = $("roleAddBtn");
    if (addButton) addButton.addEventListener("click", addRole);

    const roleList = $("roleList");
    if (roleList) {
      roleList.addEventListener("click", (event) => {
        const input = event.target.closest(".role-name-input");
        if (input) return;
        const item = event.target.closest(".role-item");
        if (item) selectRole(item.getAttribute("data-role-id"));
      });
      roleList.addEventListener("contextmenu", (event) => {
        const item = event.target.closest(".role-item");
        if (!item) return;
        event.preventDefault();
        showContextMenu(event, item.getAttribute("data-role-id"));
      });
      roleList.addEventListener("blur", (event) => {
        if (event.target.matches(".role-name-input")) saveRename(event.target);
      }, true);
      roleList.addEventListener("keydown", (event) => {
        if (!event.target.matches(".role-name-input")) return;
        if (event.key === "Enter") event.target.blur();
        if (event.key === "Escape") renderAll();
      });
    }

    const contextMenu = $("roleCtxMenu");
    if (contextMenu) {
      contextMenu.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const action = button.getAttribute("data-action");
        if (action === "add") addRole();
        if (action === "rename" && contextRoleId) beginRename(contextRoleId);
        if (action === "delete" && contextRoleId) openDelete(contextRoleId);
      });
    }

    document.addEventListener("click", (event) => {
      if (!event.target.closest("#roleCtxMenu")) hideContextMenu();
    });

    const permissionBody = $("rolePermBody");
    if (permissionBody) {
      permissionBody.addEventListener("change", (event) => {
        const input = event.target.closest("input[type='checkbox'][data-perm-kind='function']");
        if (!input) return;
        togglePermission(input.getAttribute("data-perm-id"), input.checked);
      });
    }

    const closeButton = $("roleDeleteClose");
    const cancelButton = $("roleDeleteCancel");
    const confirmButton = $("roleDeleteConfirm");
    if (closeButton) closeButton.addEventListener("click", closeDeleteModal);
    if (cancelButton) cancelButton.addEventListener("click", closeDeleteModal);
    if (confirmButton) confirmButton.addEventListener("click", confirmDelete);

    const saveButton = $("savePermissionBtn");
    if (saveButton) {
      saveButton.addEventListener("click", () => {
        saveButton.textContent = "已保存";
        toast("已保存功能权限");
        window.setTimeout(() => {
          saveButton.textContent = "保存权限";
        }, 1200);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    renderAll();
  });
})();
