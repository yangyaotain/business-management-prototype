(function setupCommonUI() {
  const PROFILE_STORAGE_KEY = "business-management-user-profile";
  const DEFAULT_PROFILE = {
    avatar: "张",
    name: "张明",
    account: "zhangming",
    department: "代理业务部",
    role: "业务组长",
    email: "zhangming@company.com",
    phone: "138 0000 6288"
  };

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
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>'
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
    setupGlobalActions();
  }

  window.showToast = showToast;
  window.getBusinessManagementProfile = loadProfile;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
