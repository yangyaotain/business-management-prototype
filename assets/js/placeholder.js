(function setupPlaceholderPage() {
  const PAGE_CONFIG = {
    reports: {
      module: "经营管理",
      title: "报表报告",
      subtitle: "多层级经营与运营报表输出",
      description: "按部门、业务组和个人呈现指标及基础组成数据，支持时间区间、同比和环比分析，并提供管理报告和专项报告输出入口。",
      features: [
        ["经营分析报表", "汇总预算、收入、成本、人效等经营指标。"],
        ["运营指标报表", "展示业务交付指标及其基础组成数据。"],
        ["同比环比分析", "支持自定义时间区间并比较同比、环比变化。"],
        ["报告输出", "提供管理报告、专项报告预览和导出入口。"]
      ]
    }
  };

  const ICONS = [
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V9M10 19V4M16 19v-7M22 19H2"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18 9 12l4 3 7-9"/><path d="M16 6h4v4"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>'
  ];

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"]/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    }[char]));
  }

  function renderPage() {
    const pageKey = document.body.dataset.page;
    const config = PAGE_CONFIG[pageKey];
    const root = document.getElementById("placeholderRoot");
    if (!config || !root) return;

    const topTitle = document.getElementById("topbarPageTitle");
    const topSubtitle = document.getElementById("topbarPageSubtitle");
    if (topTitle) topTitle.textContent = config.title;
    if (topSubtitle) topSubtitle.textContent = config.subtitle;
    document.title = config.title + " - 业务管理系统";

    root.innerHTML = [
      '<div class="placeholder-page">',
      '<section class="panel placeholder-hero">',
      '<div class="placeholder-hero-copy">',
      '<span class="module-kicker"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16M4 12h16M4 19h10"/></svg>',
      escapeHTML(config.module),
      " · 功能占位</span>",
      "<h1>",
      escapeHTML(config.title),
      "</h1><p>",
      escapeHTML(config.description),
      "</p>",
      '<div class="placeholder-hero-actions">',
      '<button type="button" class="primary-btn" data-toast="该页面将在后续会话确认后开始详细设计"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5z"/></svg>后续开始设计</button>',
      '<button type="button" class="secondary-btn" data-toast="本页功能边界已记录到项目需求梳理文档"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>查看范围说明</button>',
      "</div></div>",
      '<div class="placeholder-status-card">',
      '<div class="placeholder-status-head"><strong>页面建设状态</strong><span class="status-tag pending">待设计</span></div>',
      '<div class="build-progress">',
      buildStep("公共框架与菜单", "已完成", false),
      buildStep("功能边界梳理", "已记录", false),
      buildStep("页面布局与交互", "待确认", true),
      buildStep("静态数据与细节", "待设计", true),
      "</div></div>",
      "</section>",
      '<section class="panel placeholder-section">',
      '<div class="placeholder-section-head"><div><h2>已确认的功能范围</h2><p>以下内容仅用于锁定后续设计边界，本轮不展开具体页面。</p></div><span class="status-tag pending">共 ',
      config.features.length,
      " 个功能区</span></div>",
      '<div class="feature-placeholder-grid">',
      config.features.map((feature, index) => [
        '<article class="feature-placeholder"><span class="feature-placeholder-icon">',
        ICONS[index % ICONS.length],
        "</span><h3>",
        escapeHTML(feature[0]),
        "</h3><p>",
        escapeHTML(feature[1]),
        "</p></article>"
      ].join("")).join(""),
      "</div>",
      '<div class="scope-note"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 17h.01"/></svg><span>当前页面只完成公共框架与功能占位。后续在本项目新建会话时，应先读取项目级 AGENTS.md、docs/需求与原型框架梳理.md 以及 materials/ 中的源需求，再逐页确认设计。</span></div>',
      "</section>",
      "</div>"
    ].join("");
  }

  function buildStep(label, state, pending) {
    return [
      '<div class="build-step',
      pending ? " pending" : "",
      '"><span class="step-icon"><svg viewBox="0 0 24 24" aria-hidden="true">',
      pending ? '<circle cx="12" cy="12" r="8"/><path d="M12 8v4M12 16h.01"/>' : '<circle cx="12" cy="12" r="8"/><path d="m8.5 12 2.3 2.3 4.7-4.7"/>',
      "</svg></span><span>",
      escapeHTML(label),
      "</span><em>",
      escapeHTML(state),
      "</em></div>"
    ].join("");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderPage);
  } else {
    renderPage();
  }
})();
