(function setupNavigation() {
  const ICONS = {
    dashboard:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>',
    business:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/><path d="m4 8 6-5 6 7 5-4"/></svg>',
    special:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="17" rx="2"/><path d="M8 2v4M16 2v4M8 10h8M8 14h5M8 18h3"/></svg>',
    performance:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/><path d="m18.5 5.5-3.7 3.7"/></svg>',
    system:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3.5 20c0-3.2 2.5-5.5 5.5-5.5s5.5 2.3 5.5 5.5"/><circle cx="18" cy="7" r="2"/><path d="M15.5 13.5a4.7 4.7 0 0 1 5 4.7V20"/></svg>',
    chevron:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>'
  };

  const MENU = [
    {
      key: "dashboard",
      title: "工作台",
      href: "dashboard.html",
      icon: ICONS.dashboard
    },
    {
      key: "business",
      title: "经营管理",
      icon: ICONS.business,
      children: [
        { key: "efficiency-dashboard", title: "人效看板", href: "efficiency-dashboard.html" },
        { key: "operation-dashboard", title: "运营看板", href: "operation-dashboard.html" },
        { key: "reports", title: "数据报表", href: "reports.html" },
        { key: "report-documents", title: "数据报告", href: "report-documents.html" },
        { key: "customer-evaluation", title: "客户评价", href: "customer-evaluation.html" }
      ]
    },
    {
      key: "special",
      title: "专项管理",
      icon: ICONS.special,
      children: [
        { key: "special-list", title: "专项工作", href: "special-list.html" },
        { key: "special-results", title: "结果看板", href: "special-results.html" }
      ]
    },
    {
      key: "performance-dashboard",
      title: "绩效看板",
      href: "performance-dashboard.html",
      icon: ICONS.performance
    },
    {
      key: "system",
      title: "系统管理",
      icon: ICONS.system,
      children: [
        { key: "users", title: "用户管理", href: "users.html" },
        { key: "roles", title: "角色管理", href: "roles.html" }
      ]
    }
  ];

  function getCurrentPage() {
    const bodyKey = document.body && document.body.dataset.page;
    if (bodyKey) return bodyKey;
    const file = ((window.location && window.location.pathname) || "").split("/").pop() || "";
    return file.replace(/\.html$/i, "");
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"]/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    }[char]));
  }

  function renderDirectItem(item, currentPage) {
    const active = item.key === currentPage;
    return [
      '<a class="nav-item',
      active ? " active" : "",
      '" href="',
      escapeHTML(item.href),
      '"',
      active ? ' aria-current="page"' : "",
      ' title="',
      escapeHTML(item.title),
      '">',
      '<span class="nav-icon">',
      item.icon,
      "</span>",
      '<span class="nav-label">',
      escapeHTML(item.title),
      "</span>",
      "</a>"
    ].join("");
  }

  function renderGroup(item, currentPage) {
    const activeChild = item.children.find((child) => child.key === currentPage);
    const groupClass = activeChild ? "nav-group is-open is-active" : "nav-group";
    const children = item.children.map((child) => {
      const active = child.key === currentPage;
      return [
        '<a class="nav-child',
        active ? " active" : "",
        '" href="',
        escapeHTML(child.href),
        '"',
        active ? ' aria-current="page"' : "",
        ">",
        escapeHTML(child.title),
        "</a>"
      ].join("");
    }).join("");

    return [
      '<div class="',
      groupClass,
      '" data-group="',
      escapeHTML(item.key),
      '">',
      '<button type="button" class="nav-group-head" aria-expanded="',
      activeChild ? "true" : "false",
      '" title="',
      escapeHTML(item.title),
      '">',
      '<span class="nav-icon">',
      item.icon,
      "</span>",
      '<span class="nav-label">',
      escapeHTML(item.title),
      "</span>",
      '<span class="nav-chevron">',
      ICONS.chevron,
      "</span>",
      "</button>",
      '<div class="nav-children">',
      children,
      "</div>",
      "</div>"
    ].join("");
  }

  function renderMenu() {
    const menu = document.getElementById("appMenu");
    if (!menu) return;
    const currentPage = getCurrentPage();
    menu.innerHTML = MENU.map((item) => (
      item.children
        ? renderGroup(item, currentPage)
        : renderDirectItem(item, currentPage)
    )).join("");

    menu.addEventListener("click", (event) => {
      const head = event.target.closest(".nav-group-head");
      if (!head) return;
      const group = head.closest(".nav-group");
      if (!group) return;
      const willOpen = !group.classList.contains("is-open");
      group.classList.toggle("is-open", willOpen);
      head.setAttribute("aria-expanded", String(willOpen));
    });
  }

  window.BUSINESS_MANAGEMENT_MENU = MENU;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderMenu);
  } else {
    renderMenu();
  }
})();
