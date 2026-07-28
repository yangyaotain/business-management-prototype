(function setupCommonUI() {
  const PROFILE_STORAGE_KEY = "business-management-user-profile";
  const MESSAGE_STORAGE_KEY = "business-management-message-state";
  const DEFAULT_PROFILE = {
    avatar: "张",
    name: "张明",
    account: "zhangming",
    department: "代理业务部",
    role: "业务组长",
    email: "zhangming@company.com",
    phone: "138 0000 6288"
  };
  const DEFAULT_MESSAGES = [
    {
      id: "special-sp006-n2",
      specialId: "sp-006",
      nodeId: "sp006-n2",
      status: "overdue",
      read: false,
      handled: false,
      title: "专项节点已逾期",
      specialName: "质量复盘（审计整改项）",
      nodeName: "完成上半年质量复盘",
      content: "该节点已超过完成期限，请尽快补充当前进展、后续计划并更新节点状态。",
      dueDate: "2026-07-15",
      createdAt: "2026-07-16 09:00"
    },
    {
      id: "special-sp008-n2",
      specialId: "sp-008",
      nodeId: "sp008-n2",
      status: "overdue",
      read: false,
      handled: false,
      title: "专项节点已逾期",
      specialName: "政策分析研究",
      nodeName: "完成重点政策解读",
      content: "该节点尚未完成，已由待处理升级为逾期提醒，请及时完成政策解读并反馈进展。",
      dueDate: "2026-06-30",
      createdAt: "2026-07-01 09:00"
    },
    {
      id: "special-sp001-n3",
      specialId: "sp-001",
      nodeId: "sp001-n3",
      status: "action",
      read: false,
      handled: false,
      title: "专项节点待处理",
      specialName: "客户培训",
      nodeName: "形成重点主题课程包",
      content: "节点已到提醒时间，请按计划完善课程包，并及时填报当前完成情况。",
      dueDate: "2026-09-30",
      createdAt: "2026-07-25 09:00"
    },
    {
      id: "special-sp004-n4",
      specialId: "sp-004",
      nodeId: "sp004-n4",
      status: "handled",
      read: true,
      handled: true,
      title: "专项节点已处理",
      specialName: "业务培训（审计整改项）",
      nodeName: "完成课程计划总结",
      content: "节点进展已填报并完成归档，相关提醒已自动转为已处理。",
      dueDate: "2026-06-30",
      createdAt: "2026-06-28 17:30"
    }
  ];
  let messageCenterMessages = [];

  const ICONS = {
    profile:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>',
    password:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4.5" y="11" width="15" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    logout:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    save:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h12l2 2v16H5z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
    bell:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>',
    view:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/></svg>',
    progress:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V10M11 20V4M17 20v-7M22 20H2"/></svg>'
  };

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    }[character]));
  }

  function loadProfile() {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      return saved
        ? Object.assign({}, DEFAULT_PROFILE, JSON.parse(saved))
        : Object.assign({}, DEFAULT_PROFILE);
    } catch (error) {
      return Object.assign({}, DEFAULT_PROFILE);
    }
  }

  function saveProfile(profile) {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {}
  }

  function loadMessages() {
    let savedState = {};
    try {
      savedState = JSON.parse(localStorage.getItem(MESSAGE_STORAGE_KEY) || "{}");
    } catch (error) {}
    return DEFAULT_MESSAGES.map((message) => {
      const state = savedState[message.id] || {};
      const handled = Boolean(state.handled || message.handled);
      return {
        ...message,
        read: handled || state.read === true || message.read,
        handled,
        status: handled ? "handled" : message.status,
        title: handled ? "专项节点已处理" : message.title,
        content: handled && !message.handled
          ? "节点进展已填报，相关提醒已自动转为已处理。"
          : message.content
      };
    });
  }

  function saveMessages(messages) {
    const state = {};
    messages.forEach((message) => {
      state[message.id] = {
        read: Boolean(message.read),
        handled: Boolean(message.handled),
        status: message.status
      };
    });
    try {
      localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {}
  }

  function showToast(text, tone) {
    let toast = document.getElementById("globalToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "globalToast";
      toast.className = "toast hidden";
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.toggle("is-error", tone === "error");
    toast.classList.remove("hidden");
    clearTimeout(window.__businessManagementToastTimer);
    window.__businessManagementToastTimer = setTimeout(() => {
      toast.classList.add("hidden");
    }, 2200);
  }

  function setupSidebarToggle() {
    const shell = document.querySelector(".app-shell");
    const trigger = document.getElementById("sidebarToggle");
    if (!shell || !trigger) return;

    try {
      if (localStorage.getItem("business-management-sidebar-collapsed") === "1") {
        shell.classList.add("sidebar-collapsed");
      }
    } catch (error) {}

    trigger.addEventListener("click", () => {
      const collapsed = shell.classList.toggle("sidebar-collapsed");
      trigger.setAttribute("aria-label", collapsed ? "展开侧边菜单" : "收起侧边菜单");
      try {
        localStorage.setItem("business-management-sidebar-collapsed", collapsed ? "1" : "0");
      } catch (error) {}
    });
  }

  function buildUserMenu(profile) {
    return [
      '<div class="user-menu-head">',
      '<div class="avatar">' + escapeHTML(profile.avatar) + "</div>",
      "<div><strong>" + escapeHTML(profile.name) + "</strong>",
      "<span>" + escapeHTML(profile.department) + "</span></div>",
      "</div>",
      '<div class="user-menu-meta">',
      '<div class="user-menu-row"><span>账号</span><strong>' + escapeHTML(profile.account) + "</strong></div>",
      '<div class="user-menu-row"><span>角色</span><strong>' + escapeHTML(profile.role) + "</strong></div>",
      "</div>",
      '<div class="user-menu-divider"></div>',
      '<button type="button" class="user-menu-item" data-user-action="profile">',
      '<span class="user-menu-icon">' + ICONS.profile + "</span>用户信息修改</button>",
      '<button type="button" class="user-menu-item" data-user-action="password">',
      '<span class="user-menu-icon">' + ICONS.password + "</span>密码修改</button>",
      '<div class="user-menu-divider"></div>',
      '<button type="button" class="user-menu-action" data-user-action="logout">',
      '<span class="user-menu-icon">' + ICONS.logout + "</span>退出登录</button>"
    ].join("");
  }

  function buildUserModals() {
    return [
      '<div class="modal-mask hidden" id="userModalMask"></div>',
      '<section class="modal hidden" id="userProfileModal" role="dialog" aria-modal="true" aria-labelledby="userProfileTitle">',
      '<div class="modal-head"><div><h3 id="userProfileTitle">用户信息修改</h3>',
      "<p>维护个人联系方式，账号、部门和角色由管理员统一配置。</p></div>",
      '<button type="button" class="modal-close" data-user-action="close-modal" aria-label="关闭">' + ICONS.close + "</button></div>",
      '<div class="modal-body"><div class="form-grid">',
      '<label class="field"><span>姓名</span><input id="profileName" type="text" maxlength="20" placeholder="请输入姓名" /></label>',
      '<label class="field"><span>登录账号</span><input id="profileAccount" type="text" disabled /></label>',
      '<label class="field"><span>所属部门</span><input id="profileDepartment" type="text" disabled /></label>',
      '<label class="field"><span>当前角色</span><input id="profileRole" type="text" disabled /></label>',
      '<label class="field"><span>手机号码</span><input id="profilePhone" type="tel" placeholder="请输入手机号码" /></label>',
      '<label class="field"><span>工作邮箱</span><input id="profileEmail" type="email" placeholder="name@company.com" /></label>',
      "</div></div>",
      '<div class="modal-foot">',
      '<button type="button" class="ghost-btn" data-user-action="close-modal">' + ICONS.close + "取消</button>",
      '<button type="button" class="primary-btn" data-user-action="save-profile">' + ICONS.save + "保存修改</button>",
      "</div></section>",
      '<section class="modal small hidden" id="userPasswordModal" role="dialog" aria-modal="true" aria-labelledby="userPasswordTitle">',
      '<div class="modal-head"><div><h3 id="userPasswordTitle">密码修改</h3>',
      "<p>新密码至少 8 位，并同时包含字母和数字。</p></div>",
      '<button type="button" class="modal-close" data-user-action="close-modal" aria-label="关闭">' + ICONS.close + "</button></div>",
      '<div class="modal-body"><div class="form-grid one-column">',
      '<label class="field"><span>当前密码</span><input id="currentPassword" type="password" autocomplete="current-password" placeholder="请输入当前密码" /></label>',
      '<label class="field"><span>新密码</span><input id="newPassword" type="password" autocomplete="new-password" placeholder="至少 8 位，包含字母和数字" /></label>',
      '<label class="field"><span>确认新密码</span><input id="confirmPassword" type="password" autocomplete="new-password" placeholder="请再次输入新密码" /></label>',
      '<div class="form-tip">建议使用大小写字母、数字和符号组合，避免使用姓名、手机号等易猜信息。</div>',
      "</div></div>",
      '<div class="modal-foot">',
      '<button type="button" class="ghost-btn" data-user-action="close-modal">' + ICONS.close + "取消</button>",
      '<button type="button" class="primary-btn" data-user-action="save-password">' + ICONS.check + "确认修改</button>",
      "</div></section>"
    ].join("");
  }

  function ensureUserModals() {
    let root = document.getElementById("userModalRoot");
    if (root) return root;
    root = document.createElement("div");
    root.id = "userModalRoot";
    root.innerHTML = buildUserModals();
    document.body.appendChild(root);
    return root;
  }

  function closeUserMenu() {
    const menu = document.getElementById("userMenu");
    const trigger = document.querySelector(".user-trigger");
    if (menu) menu.classList.add("hidden");
    if (trigger) {
      trigger.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    }
  }

  function getMessageStatusMeta(status) {
    const map = {
      action: { label: "待处理", className: "action" },
      overdue: { label: "已逾期", className: "overdue" },
      handled: { label: "已处理", className: "handled" }
    };
    return map[status] || map.action;
  }

  function ensureMessageCenter() {
    let root = document.getElementById("messageCenterRoot");
    if (root) return root;
    root = document.createElement("div");
    root.id = "messageCenterRoot";
    root.innerHTML = [
      '<div class="drawer-mask hidden" id="messageCenterMask" data-message-action="close"></div>',
      '<aside class="drawer message-center-drawer hidden" id="messageCenterDrawer" role="dialog" aria-modal="true" aria-labelledby="messageCenterTitle">',
      '<div class="drawer-head message-center-head"><div class="message-center-title">',
      '<span class="message-center-title-icon">',
      ICONS.bell,
      '</span><div><h2 id="messageCenterTitle">站内消息</h2><p>专项节点提醒与待处理事项</p></div></div>',
      '<div class="message-center-head-actions">',
      '<button type="button" class="message-center-mark-all" data-message-action="mark-all">',
      ICONS.check,
      '全部已读</button>',
      '<button type="button" class="modal-close" data-message-action="close" aria-label="关闭">',
      ICONS.close,
      "</button></div></div>",
      '<div class="drawer-body message-center-list" id="messageCenterList"></div>',
      "</aside>"
    ].join("");
    document.body.appendChild(root);
    return root;
  }

  function renderMessageCenter() {
    const list = document.getElementById("messageCenterList");
    const badge = document.getElementById("messageUnreadBadge");
    const unreadCount = messageCenterMessages.filter((message) => !message.read && !message.handled).length;
    if (badge) {
      badge.textContent = unreadCount > 99 ? "99+" : String(unreadCount);
      badge.classList.toggle("hidden", unreadCount === 0);
    }
    if (!list) return;
    const priority = { overdue: 0, action: 1, handled: 2 };
    const messages = [...messageCenterMessages].sort((left, right) => (
      Number(left.read) - Number(right.read) ||
      (priority[left.status] || 0) - (priority[right.status] || 0) ||
      right.createdAt.localeCompare(left.createdAt)
    ));
    if (!messages.length) {
      list.innerHTML = [
        '<div class="message-center-empty">',
        ICONS.check,
        "<strong>暂无站内消息</strong><span>新的节点提醒会在这里集中展示。</span></div>"
      ].join("");
      return;
    }
    list.innerHTML = messages.map((message) => {
      const status = getMessageStatusMeta(message.status);
      return [
        '<article class="message-center-card ',
        status.className,
        message.read ? "" : " unread",
        '" data-message-id="',
        escapeHTML(message.id),
        '"><div class="message-center-card-head"><div><span class="message-center-status ',
        status.className,
        '">',
        escapeHTML(status.label),
        "</span><time>",
        escapeHTML(message.createdAt),
        "</time></div>",
        message.read
          ? ""
          : '<button type="button" class="message-center-read" data-message-action="read" data-message-id="' +
            escapeHTML(message.id) + '" aria-label="标为已读">' + ICONS.check + "</button>",
        "</div><h3>",
        escapeHTML(message.title),
        "</h3><p>",
        escapeHTML(message.content),
        '</p><div class="message-center-meta"><strong>',
        escapeHTML(message.specialName),
        "</strong><span>",
        escapeHTML(message.nodeName),
        "</span><span>完成期限 ",
        escapeHTML(message.dueDate),
        "</span></div>",
        '<div class="message-center-actions">',
        '<button type="button" class="message-center-action" data-message-action="view" data-message-id="',
        escapeHTML(message.id),
        '">',
        ICONS.view,
        "查看节点</button>",
        message.handled
          ? ""
          : '<button type="button" class="message-center-action primary" data-message-action="handle" data-message-id="' +
            escapeHTML(message.id) + '">' + ICONS.progress + "立即处理</button>",
        "</div></article>"
      ].join("");
    }).join("");
  }

  function closeMessageCenter() {
    const mask = document.getElementById("messageCenterMask");
    const drawer = document.getElementById("messageCenterDrawer");
    const trigger = document.getElementById("messageCenterTrigger");
    if (mask) mask.classList.add("hidden");
    if (drawer) drawer.classList.add("hidden");
    if (trigger) {
      trigger.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    }
    document.body.classList.remove("has-message-center");
  }

  function openMessageCenter() {
    ensureMessageCenter();
    closeUserMenu();
    renderMessageCenter();
    document.getElementById("messageCenterMask").classList.remove("hidden");
    document.getElementById("messageCenterDrawer").classList.remove("hidden");
    const trigger = document.getElementById("messageCenterTrigger");
    trigger.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    document.body.classList.add("has-message-center");
  }

  function updateMessageState(messageId, updates) {
    const message = messageCenterMessages.find((item) => item.id === messageId);
    if (!message) return null;
    Object.assign(message, updates);
    saveMessages(messageCenterMessages);
    renderMessageCenter();
    return message;
  }

  function openMessageTarget(message, action) {
    if (!message) return;
    updateMessageState(message.id, { read: true });
    closeMessageCenter();
    if (document.body.dataset.page === "special-list" && window.SpecialManagement) {
      if (action === "handle") {
        window.SpecialManagement.openProgress(message.specialId, message.nodeId);
      } else {
        window.SpecialManagement.openNode(message.specialId, message.nodeId);
      }
      return;
    }
    const targetAction = action === "handle" ? "progress" : "detail";
    window.location.href = "special-list.html?special=" +
      encodeURIComponent(message.specialId) + "&node=" +
      encodeURIComponent(message.nodeId) + "&action=" + targetAction;
  }

  function markNodeHandled(nodeId) {
    if (!messageCenterMessages.length) messageCenterMessages = loadMessages();
    let changed = false;
    messageCenterMessages.forEach((message) => {
      if (message.nodeId !== nodeId) return;
      message.read = true;
      message.handled = true;
      message.status = "handled";
      message.title = "专项节点已处理";
      message.content = "节点进展已填报，相关提醒已自动转为已处理。";
      changed = true;
    });
    if (!changed) return;
    saveMessages(messageCenterMessages);
    renderMessageCenter();
  }

  function setupMessageCenter() {
    const actions = document.querySelector(".topbar-actions");
    const userTrigger = document.querySelector(".user-trigger");
    if (!actions || !userTrigger) return;
    messageCenterMessages = loadMessages();
    let trigger = document.getElementById("messageCenterTrigger");
    if (!trigger) {
      trigger = document.createElement("button");
      trigger.type = "button";
      trigger.id = "messageCenterTrigger";
      trigger.className = "topbar-message-trigger";
      trigger.setAttribute("aria-label", "打开站内消息");
      trigger.setAttribute("aria-expanded", "false");
      trigger.innerHTML = ICONS.bell + '<span class="message-unread-badge hidden" id="messageUnreadBadge">0</span>';
      actions.insertBefore(trigger, userTrigger);
    }
    const root = ensureMessageCenter();
    renderMessageCenter();

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const drawer = document.getElementById("messageCenterDrawer");
      if (drawer.classList.contains("hidden")) openMessageCenter();
      else closeMessageCenter();
    });

    root.addEventListener("click", (event) => {
      const actionButton = event.target.closest("[data-message-action]");
      if (!actionButton) return;
      const action = actionButton.dataset.messageAction;
      if (action === "close") {
        closeMessageCenter();
        return;
      }
      if (action === "mark-all") {
        messageCenterMessages.forEach((message) => {
          message.read = true;
        });
        saveMessages(messageCenterMessages);
        renderMessageCenter();
        showToast("全部消息已标为已读");
        return;
      }
      const message = messageCenterMessages.find((item) => item.id === actionButton.dataset.messageId);
      if (!message) return;
      if (action === "read") {
        updateMessageState(message.id, { read: true });
      } else if (action === "view" || action === "handle") {
        openMessageTarget(message, action);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMessageCenter();
    });
  }

  function closeUserModals() {
    const mask = document.getElementById("userModalMask");
    if (mask) mask.classList.add("hidden");
    document.querySelectorAll("#userModalRoot .modal").forEach((modal) => {
      modal.classList.add("hidden");
    });
  }

  function openUserModal(modalId) {
    closeUserMenu();
    ensureUserModals();
    const mask = document.getElementById("userModalMask");
    const modal = document.getElementById(modalId);
    if (!mask || !modal) return;
    mask.classList.remove("hidden");
    modal.classList.remove("hidden");
  }

  function fillProfileForm() {
    const profile = loadProfile();
    const values = {
      profileName: profile.name,
      profileAccount: profile.account,
      profileDepartment: profile.department,
      profileRole: profile.role,
      profilePhone: profile.phone,
      profileEmail: profile.email
    };
    Object.keys(values).forEach((id) => {
      const input = document.getElementById(id);
      if (input) input.value = values[id];
    });
  }

  function clearPasswordForm() {
    ["currentPassword", "newPassword", "confirmPassword"].forEach((id) => {
      const input = document.getElementById(id);
      if (input) input.value = "";
    });
  }

  function refreshUserPresentation() {
    const profile = loadProfile();
    document.querySelectorAll(".user-trigger").forEach((trigger) => {
      const avatar = trigger.querySelector(".avatar");
      const name = trigger.querySelector(".user-copy strong");
      const role = trigger.querySelector(".user-copy span");
      if (avatar) avatar.textContent = profile.avatar;
      if (name) name.textContent = profile.name;
      if (role) role.textContent = profile.role;
    });
    const menu = document.getElementById("userMenu");
    if (menu) menu.innerHTML = buildUserMenu(profile);
  }

  function saveUserProfile() {
    const profile = loadProfile();
    const name = (document.getElementById("profileName").value || "").trim();
    const phone = (document.getElementById("profilePhone").value || "").trim();
    const email = (document.getElementById("profileEmail").value || "").trim();
    if (!name) {
      showToast("请输入姓名", "error");
      return;
    }
    if (phone && !/^1\d{10}$/.test(phone.replace(/\s+/g, ""))) {
      showToast("请输入正确的手机号码", "error");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("请输入正确的邮箱地址", "error");
      return;
    }
    profile.name = name;
    profile.avatar = name.slice(0, 1) || "我";
    profile.phone = phone;
    profile.email = email;
    saveProfile(profile);
    refreshUserPresentation();
    closeUserModals();
    showToast("用户信息已更新");
  }

  function saveUserPassword() {
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (!currentPassword) {
      showToast("请输入当前密码", "error");
      return;
    }
    if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      showToast("新密码至少 8 位，并需包含字母和数字", "error");
      return;
    }
    if (newPassword === currentPassword) {
      showToast("新密码不能与当前密码相同", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("两次输入的新密码不一致", "error");
      return;
    }
    closeUserModals();
    clearPasswordForm();
    showToast("密码修改成功，下次登录请使用新密码");
  }

  function setupUserMenu() {
    const trigger = document.querySelector(".user-trigger");
    const actions = document.querySelector(".topbar-actions");
    if (!trigger || !actions) return;

    let menu = document.getElementById("userMenu");
    if (!menu) {
      menu = document.createElement("div");
      menu.id = "userMenu";
      menu.className = "user-menu hidden";
      actions.appendChild(menu);
    }
    ensureUserModals();
    refreshUserPresentation();

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = menu.classList.contains("hidden");
      if (willOpen) closeMessageCenter();
      menu.classList.toggle("hidden", !willOpen);
      trigger.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", String(willOpen));
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest("#userMenu") && !event.target.closest(".user-trigger")) {
        closeUserMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeUserMenu();
        closeUserModals();
      }
    });
  }

  function setupGlobalActions() {
    document.addEventListener("click", (event) => {
      const toastAction = event.target.closest("[data-toast]");
      if (toastAction) {
        showToast(toastAction.dataset.toast || "操作已完成");
        return;
      }

      if (event.target.id === "userModalMask") {
        closeUserModals();
        return;
      }

      const action = event.target.closest("[data-user-action]");
      if (!action) return;
      const actionName = action.dataset.userAction;
      if (actionName === "profile") {
        fillProfileForm();
        openUserModal("userProfileModal");
      } else if (actionName === "password") {
        clearPasswordForm();
        openUserModal("userPasswordModal");
      } else if (actionName === "close-modal") {
        closeUserModals();
      } else if (actionName === "save-profile") {
        saveUserProfile();
      } else if (actionName === "save-password") {
        saveUserPassword();
      } else if (actionName === "logout") {
        window.location.href = "login.html";
      }
    });
  }

  function init() {
    setupSidebarToggle();
    setupUserMenu();
    setupMessageCenter();
    setupGlobalActions();
  }

  window.showToast = showToast;
  window.getBusinessManagementProfile = loadProfile;
  window.BusinessMessageCenter = {
    markNodeHandled
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
