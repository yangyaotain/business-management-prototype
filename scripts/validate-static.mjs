import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const errors = [];
const warnings = [];
const ignoredScanDirectories = new Set([".git", ".codex-submit-test", "tmp", "work"]);
const standalonePages = new Set([
  "pages/login.html",
  "pages/report-word-preview.html",
]);

function collectFiles(dir, extension, result = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (ignoredScanDirectories.has(entry.name)) continue;
      collectFiles(absolute, extension, result);
    } else if (entry.name.endsWith(extension)) {
      result.push(absolute);
    }
  }
  return result;
}

function relative(file) {
  return path.relative(projectRoot, file).replaceAll("\\", "/");
}

function checkHTML() {
  const htmlFiles = collectFiles(projectRoot, ".html");
  for (const file of htmlFiles) {
    const source = fs.readFileSync(file, "utf8");
    const label = relative(file);
    if (!/<meta\s+charset="UTF-8"\s*\/?>/i.test(source)) {
      errors.push(`${label}: missing UTF-8 charset`);
    }
    if (!/<html\s+lang="zh-CN">/i.test(source)) {
      errors.push(`${label}: missing zh-CN language`);
    }
    checkTagBalance(source, label);

    const ids = [...source.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    if (duplicateIds.length) {
      errors.push(`${label}: duplicate ids ${duplicateIds.join(", ")}`);
    }

    const references = [...source.matchAll(/(?:href|src)="([^"]+)"/g)]
      .map((match) => match[1])
      .filter((value) => !/^(?:https?:|mailto:|tel:|#|javascript:)/i.test(value));
    for (const reference of references) {
      const cleanReference = reference.split("?")[0].split("#")[0];
      if (!cleanReference) continue;
      const target = path.resolve(path.dirname(file), cleanReference);
      if (!fs.existsSync(target)) {
        errors.push(`${label}: missing local reference ${reference}`);
      }
    }

    if (label.startsWith("pages/") && !standalonePages.has(label)) {
      if (!source.includes('id="appMenu"')) {
        errors.push(`${label}: missing shared appMenu mount`);
      }
      if (!source.includes("../assets/js/navigation.js")) {
        errors.push(`${label}: missing shared navigation.js`);
      }
      if (!source.includes("../assets/js/common.js")) {
        errors.push(`${label}: missing shared common.js`);
      }
    }

    source.split(/\r?\n/).forEach((line, index) => {
      if (/[ \t]+$/.test(line)) {
        errors.push(`${label}:${index + 1}: trailing whitespace`);
      }
    });
  }
  return htmlFiles.length;
}

function checkTagBalance(source, label) {
  const voidTags = new Set([
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr"
  ]);
  const cleaned = source
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "<script></script>")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "<style></style>");
  const stack = [];
  const tags = cleaned.matchAll(/<\/?([a-z][a-z0-9:-]*)\b[^>]*>/gi);
  for (const match of tags) {
    const token = match[0];
    const tag = match[1].toLowerCase();
    const closing = token.startsWith("</");
    const selfClosing = token.endsWith("/>") || voidTags.has(tag);
    if (selfClosing) continue;
    if (!closing) {
      stack.push(tag);
      continue;
    }
    const expected = stack.pop();
    if (expected !== tag) {
      errors.push(`${label}: tag mismatch, expected </${expected || "none"}> before </${tag}>`);
      return;
    }
  }
  if (stack.length) {
    errors.push(`${label}: unclosed tags ${stack.join(", ")}`);
  }
}

function checkCSS() {
  const cssFiles = collectFiles(path.join(projectRoot, "assets", "css"), ".css");
  for (const file of cssFiles) {
    const source = fs.readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    let balance = 0;
    for (const char of source) {
      if (char === "{") balance += 1;
      if (char === "}") balance -= 1;
      if (balance < 0) break;
    }
    if (balance !== 0) {
      errors.push(`${relative(file)}: unbalanced CSS braces (${balance})`);
    }
  }
  return cssFiles.length;
}

function checkSharedPagination() {
  const cssPath = path.join(projectRoot, "assets", "css", "pagination.css");
  const scriptPath = path.join(projectRoot, "assets", "js", "pagination.js");
  for (const file of [cssPath, scriptPath]) {
    if (!fs.existsSync(file)) {
      errors.push(`${relative(file)}: shared pagination file missing`);
    }
  }
  if (![cssPath, scriptPath].every((file) => fs.existsSync(file))) return;

  const cssSource = fs.readFileSync(cssPath, "utf8");
  const scriptSource = fs.readFileSync(scriptPath, "utf8");
  for (const marker of [
    ".app-pagination",
    ".app-pagination-total",
    ".app-pagination-size.form-select",
    ".app-pagination-button",
    ".app-pagination-number",
    ".app-pagination-ellipsis"
  ]) {
    if (!cssSource.includes(marker)) {
      errors.push(`assets/css/pagination.css: required marker missing ${marker}`);
    }
  }
  for (const marker of [
    "const PAGINATION_PRESETS",
    "initialPageSize: 9",
    "pageSizeOptions: [9, 18, 27]",
    "initialPageSize: 10",
    "pageSizeOptions: [10, 20, 50]",
    "function getPageTokens(",
    "function create(options)",
    "function update(items)",
    "function reset()",
    "data-pagination-size",
    "global.AppPagination"
  ]) {
    if (!scriptSource.includes(marker)) {
      errors.push(`assets/js/pagination.js: required marker missing ${marker}`);
    }
  }

  const consumerPages = [
    "dashboard",
    "operation-dashboard",
    "users",
    "performance-dashboard",
    "special-list",
    "special-results",
    "customer-evaluation",
    "reports",
    "report-documents"
  ];
  for (const pageName of consumerPages) {
    const pageSource = fs.readFileSync(path.join(projectRoot, "pages", `${pageName}.html`), "utf8");
    for (const marker of ["../assets/css/pagination.css", "../assets/js/pagination.js"]) {
      if (!pageSource.includes(marker)) {
        errors.push(`pages/${pageName}.html: shared pagination marker missing ${marker}`);
      }
    }
  }

  const consumers = [
    ["dashboard.js", "card", ["metricPagination"]],
    ["operation-dashboard.js", "card", ["operationMetricPagination"]],
    ["users.js", "table", ["umPager"]],
    ["performance-dashboard.js", "table", ["performancePagination"]],
    ["special-management.js", "table", ["specialListPagination", "specialResultPagination"]],
    ["customer-evaluation.js", "table", ["ceDetailPagination"]],
    ["reports.js", "table", ["metricReportPagination", "detailPagination"]],
    ["report-documents.js", "table", ["managedReportPagination"]]
  ];
  for (const [scriptName, variant, mountIds] of consumers) {
    const consumerScript = fs.readFileSync(path.join(projectRoot, "assets", "js", scriptName), "utf8");
    const compactScript = consumerScript.replace(/\s+/g, "");
    for (const marker of ["window.AppPagination.create({", `variant:"${variant}"`]) {
      if (!compactScript.includes(marker)) {
        errors.push(`assets/js/${scriptName}: shared pagination marker missing ${marker}`);
      }
    }
    for (const mountId of mountIds) {
      const pageOrScriptSources = [
        consumerScript,
        ...consumerPages.map((pageName) =>
          fs.readFileSync(path.join(projectRoot, "pages", `${pageName}.html`), "utf8")
        )
      ].join("\n");
      if (!pageOrScriptSources.includes(`id="${mountId}"`) && !consumerScript.includes(`"${mountId}"`)) {
        errors.push(`assets/js/${scriptName}: shared pagination mount missing ${mountId}`);
      }
    }
  }

  const retiredMarkers = [
    ".um-pager",
    ".um-pg-",
    ".performance-pagination",
    ".performance-page-",
    ".special-pagination",
    ".special-page-",
    ".ce-pagination",
    ".ce-page-button",
    ".detail-pagination",
    ".detail-page-button",
    "function renderPagination("
  ];
  const paginationConsumerSources = [
    ...consumers.map(([scriptName]) =>
      fs.readFileSync(path.join(projectRoot, "assets", "js", scriptName), "utf8")
    ),
    fs.readFileSync(path.join(projectRoot, "assets", "css", "users.css"), "utf8"),
    fs.readFileSync(path.join(projectRoot, "assets", "css", "performance-dashboard.css"), "utf8"),
    fs.readFileSync(path.join(projectRoot, "assets", "css", "special-management.css"), "utf8"),
    fs.readFileSync(path.join(projectRoot, "assets", "css", "customer-evaluation.css"), "utf8"),
    fs.readFileSync(path.join(projectRoot, "assets", "css", "reports-controls.css"), "utf8")
  ].join("\n");
  for (const marker of retiredMarkers) {
    if (paginationConsumerSources.includes(marker)) {
      errors.push(`shared pagination: retired page-specific marker remains ${marker}`);
    }
  }
}

function checkDashboardMetrics() {
  const dashboardScript = path.join(projectRoot, "assets", "js", "dashboard.js");
  const dashboardPage = path.join(projectRoot, "pages", "dashboard.html");
  const dashboardStyle = path.join(projectRoot, "assets", "css", "dashboard.css");
  const source = fs.readFileSync(dashboardScript, "utf8");
  const pageSource = fs.readFileSync(dashboardPage, "utf8");
  const styleSource = fs.readFileSync(dashboardStyle, "utf8");
  const metricBlock = source.match(/const METRIC_SOURCE = \[([\s\S]*?)\n  \];/);
  if (!metricBlock) {
    errors.push("assets/js/dashboard.js: METRIC_SOURCE array not found");
    return;
  }
  const metrics = metricBlock[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("["))
    .map((line) => JSON.parse(line.replace(/,$/, "")));
  const ids = metrics.map((metric) => metric[0]);
  const expected = [
    ...Array.from({ length: 45 }, (_, index) => index + 1),
    ...Array.from({ length: 13 }, (_, index) => index + 47)
  ];
  if (JSON.stringify(ids) !== JSON.stringify(expected)) {
    errors.push(`assets/js/dashboard.js: expected 58 source ids with source id 46 absent, got ${ids.join(",")}`);
  }

  const directions = {
    客户赋能: metrics.filter((metric) => metric[1] === "客户赋能").length,
    运营效能: metrics.filter((metric) => metric[1] === "运营效能").length,
    能力建设: metrics.filter((metric) => metric[1] === "能力建设").length
  };
  if (directions.客户赋能 !== 27 || directions.运营效能 !== 26 || directions.能力建设 !== 5) {
    errors.push(`assets/js/dashboard.js: unexpected direction counts ${JSON.stringify(directions)}`);
  }
  const periods = {
    月度: metrics.filter((metric) => metric[6] === "月度").length,
    季度: metrics.filter((metric) => metric[6] === "季度").length
  };
  if (periods.月度 !== 52 || periods.季度 !== 6) {
    errors.push(`assets/js/dashboard.js: unexpected period counts ${JSON.stringify(periods)}`);
  }

  const roleRules = [
    ["项目经理", ["项目经理", "全员"], 48],
    ["业务组长", ["组长", "全员"], 22],
    ["质量审核", ["质量管理岗", "质量审核岗", "全员"], 17]
  ];
  for (const [label, tokens, expectedCount] of roleRules) {
    const count = metrics.filter((metric) => tokens.some((token) => metric[7].includes(token))).length;
    if (count !== expectedCount) {
      errors.push(`assets/js/dashboard.js: ${label} expected ${expectedCount} metrics, got ${count}`);
    }
  }

  const demoBlock = source.match(/const DEMO_VALUES = \{([\s\S]*?)\n  \};/);
  const demoIds = demoBlock
    ? [...demoBlock[1].matchAll(/^\s+(\d+):\s+\[/gm)].map((match) => Number(match[1]))
    : [];
  if (JSON.stringify(demoIds) !== JSON.stringify(expected)) {
    errors.push("assets/js/dashboard.js: demo values do not cover all 58 source metrics");
  }

  for (const marker of [
    'id: "projectManager"',
    'id: "qualityAudit"',
    "function renderMetricFilterControls(",
    "metricPagination.update(metrics)",
    "function resetMetricFilters(",
    "function renderMetricDrawer(",
    "function renderMetricDefinitionItem(",
    "metric-integrated-layout",
    "metric-overview-card",
    "metric-basic-grid",
    "metric-basic-key",
    "metric-card-action",
    "base-data-export",
    "function exportActiveMetric(",
    'id="metricNameQuery"',
    'id="metricStatusFilter"',
    'id="metricFilterReset"',
    'id="metricFilterResultCount"',
    'id="metricPagination"',
    "../assets/js/excel-export.js",
    "58项业务交付指标"
  ]) {
    const targetSource = marker.startsWith('id="') || marker.startsWith("../assets/") || marker.includes("58项")
      ? pageSource
      : source;
    if (!targetSource.includes(marker)) {
      errors.push(`dashboard update: required marker missing ${marker}`);
    }
  }
  for (const retiredMarker of [
    "drawerDetailButton",
    "renderBaseDataView",
    "metricDrawerMode",
    "baseDataResultCount",
    "renderMetricDefinitionDetails",
    "renderMetricDefinitionPanel",
    "metric-definition-details",
    "detailLabel:",
    "<details",
    "<summary"
  ]) {
    if (source.includes(retiredMarker) || pageSource.includes(retiredMarker)) {
      errors.push(`dashboard update: retired nested-detail marker remains ${retiredMarker}`);
    }
  }
  for (const marker of [
    "width: min(1380px, calc(100vw - 64px))",
    "grid-template-columns: repeat(4, minmax(0, 1fr))",
    "table-layout: fixed",
    "overflow: hidden",
    "cursor: pointer"
  ]) {
    if (!styleSource.includes(marker)) {
      errors.push(`dashboard detail layout: required marker missing ${marker}`);
    }
  }
  if (styleSource.includes("min-width: 920px")) {
    errors.push("dashboard detail layout: retired desktop table minimum width remains");
  }
  const baseDataCodeRule = styleSource.match(/\.base-data-code\s*\{([^}]*)\}/);
  if (!baseDataCodeRule || !baseDataCodeRule[1].includes("color: #344054")) {
    errors.push("dashboard detail layout: base data code must use neutral text color");
  }
  for (const retiredStyle of [
    ".metric-overview-primary",
    ".metric-overview-secondary",
    ".metric-scope-section",
    ".metric-side-title",
    ".metric-definition-panel"
  ]) {
    if (styleSource.includes(retiredStyle)) {
      errors.push(`dashboard detail layout: retired grouped overview style remains ${retiredStyle}`);
    }
  }
}

function checkUnifiedDashboardControls() {
  const dashboards = [
    {
      page: "dashboard",
      script: "dashboard.js",
      roleTabs: 'id="roleViewTabs"',
      periodTabs: 'id="periodTypeTabs"',
      periodSelect: 'id="periodValueSelect"',
      roles: ['label: "项目经理"', 'label: "业务组长"', 'label: "质量审核"', 'label: "部门负责人"']
    },
    {
      page: "efficiency-dashboard",
      script: "efficiency-dashboard.js",
      roleTabs: 'id="efficiencyRoleTabs"',
      periodTabs: 'id="efficiencyPeriodTypeTabs"',
      periodSelect: 'id="efficiencyPeriodSelect"'
    },
    {
      page: "operation-dashboard",
      script: "operation-dashboard.js",
      roleTabs: 'id="operationRoleTabs"',
      periodTabs: 'id="operationPeriodTypeTabs"',
      periodSelect: 'id="operationPeriodSelect"'
    },
    {
      page: "performance-dashboard",
      script: "performance-dashboard.js",
      roleTabs: 'id="performanceRoleTabs"',
      periodTabs: 'id="performancePeriodTypeTabs"',
      periodSelect: 'id="performancePeriodSelect"'
    },
    {
      page: "reports",
      script: "reports.js",
      roleTabs: 'id="reportRoleTabs"',
      periodTabs: 'id="reportPeriodTypeTabs"',
      periodSelect: 'id="reportPeriodSelect"'
    },
    {
      page: "customer-evaluation",
      script: "customer-evaluation.js",
      roleTabs: 'id="ceRoleTabs"',
      periodTabs: 'id="cePeriodTypeTabs"',
      periodSelect: 'id="cePeriodValueSelect"'
    }
  ];

  for (const dashboard of dashboards) {
    const htmlPath = path.join(projectRoot, "pages", `${dashboard.page}.html`);
    const scriptPath = path.join(projectRoot, "assets", "js", dashboard.script);
    const htmlSource = fs.readFileSync(htmlPath, "utf8");
    const scriptSource = fs.readFileSync(scriptPath, "utf8");
    const htmlMarkers = [
      "../assets/css/dashboard-controls.css",
      'class="panel dashboard-control-panel',
      dashboard.roleTabs,
      dashboard.periodTabs,
      dashboard.periodSelect,
      'data-period-type="月度"',
      'data-period-type="季度"'
    ];
    for (const marker of htmlMarkers) {
      if (!htmlSource.includes(marker)) {
        errors.push(`pages/${dashboard.page}.html: unified dashboard control missing ${marker}`);
      }
    }
    const roleMarkers = dashboard.roles ||
      ['label: "部门负责人"', 'label: "业务组长"', 'label: "组员"'];
    for (const marker of roleMarkers) {
      if (!scriptSource.includes(marker)) {
        errors.push(`assets/js/${dashboard.script}: unified demo role missing ${marker}`);
      }
    }
  }
}

function checkReportPageSplit() {
  const dataReportPagePath = path.join(projectRoot, "pages", "reports.html");
  const reportDocumentPagePath = path.join(projectRoot, "pages", "report-documents.html");
  const dataReportScriptPath = path.join(projectRoot, "assets", "js", "reports.js");
  const reportDocumentScriptPath = path.join(projectRoot, "assets", "js", "report-documents.js");
  const requiredFiles = [
    dataReportPagePath,
    reportDocumentPagePath,
    dataReportScriptPath,
    reportDocumentScriptPath
  ];
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      errors.push(`${relative(file)}: split report artifact missing`);
    }
  }
  if (!requiredFiles.every((file) => fs.existsSync(file))) return;

  const dataReportPage = fs.readFileSync(dataReportPagePath, "utf8");
  const reportDocumentPage = fs.readFileSync(reportDocumentPagePath, "utf8");
  const dataReportScript = fs.readFileSync(dataReportScriptPath, "utf8");
  const reportDocumentScript = fs.readFileSync(reportDocumentScriptPath, "utf8");
  const navigationSource = fs.readFileSync(path.join(projectRoot, "assets", "js", "navigation.js"), "utf8");
  const roleSource = fs.readFileSync(path.join(projectRoot, "assets", "js", "roles.js"), "utf8");

  for (const marker of [
    '{ key: "reports", title: "数据报表", href: "reports.html" }',
    '{ key: "report-documents", title: "数据报告", href: "report-documents.html" }'
  ]) {
    if (!navigationSource.includes(marker)) {
      errors.push(`assets/js/navigation.js: split report menu missing ${marker}`);
    }
  }
  for (const marker of [
    'menu("business.reports", "数据报表"',
    'menu("business.reportDocuments", "数据报告"',
    '"business.reportDocuments"'
  ]) {
    if (!roleSource.includes(marker)) {
      errors.push(`assets/js/roles.js: split report permission missing ${marker}`);
    }
  }
  for (const marker of [
    'data-page="reports"',
    'class="panel dashboard-control-panel',
    'id="reportPeriodTypeTabs"',
    'id="exportDataButton"',
    "../assets/js/reports.js"
  ]) {
    if (!dataReportPage.includes(marker)) {
      errors.push(`pages/reports.html: data-report marker missing ${marker}`);
    }
  }
  for (const retiredMarker of [
    "reportViewTabs",
    "dataReportPanel",
    "dataDocumentPanel",
    "reportDocumentTypeTabs",
    "managedReportPagination"
  ]) {
    if (dataReportPage.includes(retiredMarker) || dataReportScript.includes(retiredMarker)) {
      errors.push(`data report split: retired mixed-view marker remains ${retiredMarker}`);
    }
  }
  for (const marker of [
    'data-page="report-documents"',
    'id="reportDocumentRoleTabs"',
    'id="reportDocumentTypeTabs"',
    'id="monthlyReportTab"',
    'id="quarterlyReportTab"',
    'id="managedReportPagination"',
    "../assets/js/report-documents.js"
  ]) {
    if (!reportDocumentPage.includes(marker)) {
      errors.push(`pages/report-documents.html: data-document marker missing ${marker}`);
    }
  }
  for (const forbiddenMarker of [
    "reportPeriodTypeTabs",
    "reportPeriodSelect",
    "reportBusinessTypeSelect",
    "exportDataButton"
  ]) {
    if (reportDocumentPage.includes(forbiddenMarker)) {
      errors.push(`pages/report-documents.html: data-report control leaked into data documents ${forbiddenMarker}`);
    }
  }
  for (const marker of [
    'reportType: "月度"',
    'report.type === state.reportType',
    "月度报告名称",
    "报告月份",
    "季度报告名称",
    "报告季度",
    "reportPagination = window.AppPagination.create"
  ]) {
    if (!reportDocumentScript.includes(marker)) {
      errors.push(`assets/js/report-documents.js: required marker missing ${marker}`);
    }
  }

  for (const legacyFile of [
    path.join(projectRoot, "assets", "js", "placeholder.js"),
    path.join(projectRoot, "assets", "css", "placeholder.css")
  ]) {
    if (fs.existsSync(legacyFile)) {
      errors.push(`${relative(legacyFile)}: retired placeholder artifact remains`);
    }
  }
}

function checkSpecialManagement() {
  const listPath = path.join(projectRoot, "pages", "special-list.html");
  const resultsPath = path.join(projectRoot, "pages", "special-results.html");
  const cssPath = path.join(projectRoot, "assets", "css", "special-management.css");
  const scriptPath = path.join(projectRoot, "assets", "js", "special-management.js");
  for (const file of [listPath, resultsPath, cssPath, scriptPath]) {
    if (!fs.existsSync(file)) {
      errors.push(`${relative(file)}: special management file missing`);
    }
  }
  if (![listPath, resultsPath, cssPath, scriptPath].every((file) => fs.existsSync(file))) return;

  const listSource = fs.readFileSync(listPath, "utf8");
  const resultsSource = fs.readFileSync(resultsPath, "utf8");
  const cssSource = fs.readFileSync(cssPath, "utf8");
  const scriptSource = fs.readFileSync(scriptPath, "utf8");
  const requiredListMarkers = [
    'data-page="special-list"',
    'id="specialYearFilter"',
    'id="specialDirectionFilter"',
    'id="specialStatusFilter"',
    'id="specialHealthFilter"',
    'id="specialWorkTabs"',
    'id="specialListBody"',
    'id="specialListPagination"',
    'id="specialDetailDrawer"',
    'id="specialEditDrawer"',
    'id="specialProgressModal"',
    'id="specialProgressNodeStatus"',
    'id="specialUploadControl"',
    'id="specialProgressAttachmentTrigger"',
    'id="specialProgressAttachmentName"',
    'id="specialStatusModal"',
    "../assets/js/special-management.js"
  ];
  for (const marker of requiredListMarkers) {
    if (!listSource.includes(marker)) {
      errors.push(`pages/special-list.html: required marker missing ${marker}`);
    }
  }

  const requiredResultsMarkers = [
    'data-page="special-results"',
    'id="specialYearFilter"',
    'id="specialDirectionFilter"',
    'id="specialStatusFilter"',
    'id="specialHealthFilter"',
    'id="specialResultSummary"',
    'id="specialCompletionChart"',
    'id="specialResultTableBody"',
    'id="specialResultPagination"',
    'id="specialDetailDrawer"',
    "../assets/js/special-management.js"
  ];
  for (const marker of requiredResultsMarkers) {
    if (!resultsSource.includes(marker)) {
      errors.push(`pages/special-results.html: required marker missing ${marker}`);
    }
  }

  for (const [label, source] of [
    ["pages/special-list.html", listSource],
    ["pages/special-results.html", resultsSource]
  ]) {
    if (source.includes("placeholderRoot") || source.includes("placeholder.js")) {
      errors.push(`${label}: retired placeholder wiring remains`);
    }
  }

  const requiredScriptMarkers = [
    'name: "客户培训"',
    'name: "专项报告"',
    'name: "售电集采"',
    'name: "业务培训（审计整改项）"',
    'name: "案例库管理（审计整改项）"',
    'name: "质量复盘（审计整改项）"',
    'name: "搭建学习平台（审计整改项）"',
    'name: "政策分析研究"',
    'name: "检查协同（审计、巡视等）"',
    "function renderList(",
    "function renderResults(",
    "COMPLETION_TREND_SAMPLE",
    "function detailStatusStat(",
    "function renderDetailBody(",
    "function openEdit(",
    "function openProgress(",
    "function handleProgressSubmit(",
    "specialPagination.update(items)",
    "function buildReminderContent(",
    "function getWorkState(",
    "function renderWorkTabs(",
    "window.SpecialManagement",
    "data-progress-node"
  ];
  for (const marker of requiredScriptMarkers) {
    if (!scriptSource.includes(marker)) {
      errors.push(`assets/js/special-management.js: required marker missing ${marker}`);
    }
  }

  const retiredApprovalMarkers = [
    "审批记录",
    "提交审批",
    "待审批",
    "审批通过",
    "handleApproval(",
    "data-approval-action",
    "statusRequests"
  ];
  const specialSources = [listSource, resultsSource, scriptSource].join("\n");
  for (const marker of retiredApprovalMarkers) {
    if (specialSources.includes(marker)) {
      errors.push(`special management: retired approval marker remains ${marker}`);
    }
  }
  const retiredReminderMarkers = [
    "specialReminderSummary",
    "specialReminderList",
    "specialReminderToggle",
    "renderReminderPanel(",
    "data-reminder-detail",
    "待提醒"
  ];
  for (const marker of retiredReminderMarkers) {
    if (specialSources.includes(marker)) {
      errors.push(`special management: retired page reminder marker remains ${marker}`);
    }
  }
  for (const marker of [".special-work-tabs", ".special-work-tab", ".special-work-state"]) {
    if (!cssSource.includes(marker)) {
      errors.push(`assets/css/special-management.css: required marker missing ${marker}`);
    }
  }
}

function checkMessageCenter() {
  const scriptPath = path.join(projectRoot, "assets", "js", "common.js");
  const cssPath = path.join(projectRoot, "assets", "css", "layout.css");
  if (!fs.existsSync(scriptPath) || !fs.existsSync(cssPath)) {
    errors.push("message center: shared script or layout stylesheet missing");
    return;
  }
  const scriptSource = fs.readFileSync(scriptPath, "utf8");
  const cssSource = fs.readFileSync(cssPath, "utf8");
  const scriptMarkers = [
    "MESSAGE_STORAGE_KEY",
    "DEFAULT_MESSAGES",
    "messageCenterTrigger",
    "messageCenterDrawer",
    "function setupMessageCenter(",
    "function markNodeHandled(",
    "window.BusinessMessageCenter"
  ];
  for (const marker of scriptMarkers) {
    if (!scriptSource.includes(marker)) {
      errors.push(`assets/js/common.js: message center marker missing ${marker}`);
    }
  }
  for (const marker of [".topbar-message-trigger", ".message-center-drawer", ".message-center-card"]) {
    if (!cssSource.includes(marker)) {
      errors.push(`assets/css/layout.css: message center marker missing ${marker}`);
    }
  }
}

function checkOperationDashboard() {
  const htmlPath = path.join(projectRoot, "pages", "operation-dashboard.html");
  const cssPath = path.join(projectRoot, "assets", "css", "operation-dashboard.css");
  const scriptPath = path.join(projectRoot, "assets", "js", "operation-dashboard.js");
  for (const file of [htmlPath, cssPath, scriptPath]) {
    if (!fs.existsSync(file)) {
      errors.push(`${relative(file)}: operation dashboard file missing`);
    }
  }
  if (![htmlPath, cssPath, scriptPath].every((file) => fs.existsSync(file))) return;

  const htmlSource = fs.readFileSync(htmlPath, "utf8");
  const cssSource = fs.readFileSync(cssPath, "utf8");
  const scriptSource = fs.readFileSync(scriptPath, "utf8");
  const requiredHtmlMarkers = [
    'data-page="operation-dashboard"',
    'id="operationBackButton"',
    'id="operationRoleTabs"',
    'id="operationPeriodTypeTabs"',
    'id="operationPeriodSelect"',
    'id="operationBusinessTypeSelect"',
    'id="operationScopePanelBody"',
    "业务组运营概览",
    'id="operationMetricGrid"',
    'id="operationMetricPagination"',
    "../assets/js/operation-dashboard.js"
  ];
  for (const marker of requiredHtmlMarkers) {
    if (!htmlSource.includes(marker)) {
      errors.push(`pages/operation-dashboard.html: required marker missing ${marker}`);
    }
  }
  if (htmlSource.includes("placeholderRoot") || htmlSource.includes("placeholder.js")) {
    errors.push("pages/operation-dashboard.html: retired placeholder wiring remains");
  }

  const requiredScriptMarkers = [
    'id: "departmentHead"',
    'id: "groupLeader"',
    'id: "member"',
    'data-group-id="',
    'data-member-id="',
    'metric("tenderCount", "招标数量"',
    'metric("revenue", "营收"',
    'metric("feeRecovery", "平台服务费回收率"',
    "renderPageActions()",
    "function goBack()",
    "renderGroupPanel()",
    "renderMemberPanel()",
    "renderPersonPanel()",
    "function getOverviewMetrics(",
    "function renderOverviewMetricValue(",
    "operationMetricPagination.update(filteredResults)",
    '"tenderCount"',
    '"abnormalCount"'
  ];
  for (const marker of requiredScriptMarkers) {
    if (!scriptSource.includes(marker)) {
      errors.push(`assets/js/operation-dashboard.js: required marker missing ${marker}`);
    }
  }

  for (const marker of [".operation-group-name-button", ".operation-table-metric-value"]) {
    if (!cssSource.includes(marker)) {
      errors.push(`assets/css/operation-dashboard.css: required marker missing ${marker}`);
    }
  }

  const retiredOperationAnalysisMarkers = [
    'id="operationComparisonBody"',
    'id="operationAttentionList"',
    "selectedComparisonMetricId",
    "function renderComparison(",
    "function renderAttention(",
    ".operation-analysis-grid",
    ".operation-group-card"
  ];
  const operationSources = [htmlSource, cssSource, scriptSource].join("\n");
  for (const marker of retiredOperationAnalysisMarkers) {
    if (operationSources.includes(marker)) {
      errors.push(`operation dashboard: retired analysis marker remains ${marker}`);
    }
  }
}

function checkEfficiencyDashboard() {
  const htmlPath = path.join(projectRoot, "pages", "efficiency-dashboard.html");
  const cssPath = path.join(projectRoot, "assets", "css", "efficiency-dashboard.css");
  const scriptPath = path.join(projectRoot, "assets", "js", "efficiency-dashboard.js");
  for (const file of [htmlPath, cssPath, scriptPath]) {
    if (!fs.existsSync(file)) {
      errors.push(`${relative(file)}: efficiency dashboard file missing`);
    }
  }
  if (![htmlPath, cssPath, scriptPath].every((file) => fs.existsSync(file))) return;

  const htmlSource = fs.readFileSync(htmlPath, "utf8");
  const scriptSource = fs.readFileSync(scriptPath, "utf8");
  const requiredHtmlMarkers = [
    'data-page="efficiency-dashboard"',
    'id="efficiencyRoleTabs"',
    'id="efficiencyPeriodTypeTabs"',
    'id="efficiencyPeriodSelect"',
    'id="efficiencyBusinessTypeSelect"',
    'id="efficiencyContent"',
    "../assets/js/efficiency-dashboard.js"
  ];
  for (const marker of requiredHtmlMarkers) {
    if (!htmlSource.includes(marker)) {
      errors.push(`pages/efficiency-dashboard.html: required marker missing ${marker}`);
    }
  }
  if (htmlSource.includes("placeholderRoot") || htmlSource.includes("placeholder.js")) {
    errors.push("pages/efficiency-dashboard.html: retired placeholder wiring remains");
  }

  const requiredScriptMarkers = [
    'id: "departmentHead"',
    'id: "groupLeader"',
    'id: "member"',
    'data-group-id="',
    'data-person-id="',
    'label: "人均产值"',
    'label: "人均产能"',
    'label: "人均时效"',
    'label: "人均净利润"'
  ];
  for (const marker of requiredScriptMarkers) {
    if (!scriptSource.includes(marker)) {
      errors.push(`assets/js/efficiency-dashboard.js: required marker missing ${marker}`);
    }
  }
}

function checkCustomerEvaluationPage() {
  const htmlPath = path.join(projectRoot, "pages", "customer-evaluation.html");
  const cssPath = path.join(projectRoot, "assets", "css", "customer-evaluation.css");
  const scriptPath = path.join(projectRoot, "assets", "js", "customer-evaluation.js");
  for (const file of [htmlPath, cssPath, scriptPath]) {
    if (!fs.existsSync(file)) {
      errors.push(`${relative(file)}: customer evaluation file missing`);
    }
  }
  if (![htmlPath, cssPath, scriptPath].every((file) => fs.existsSync(file))) return;

  const htmlSource = fs.readFileSync(htmlPath, "utf8");
  const scriptSource = fs.readFileSync(scriptPath, "utf8");
  const requiredHtmlMarkers = [
    'data-page="customer-evaluation"',
    'id="ceBreadcrumb"',
    'id="cePageTitle"',
    'id="cePageActions"',
    'id="ceRoleTabs"',
    'id="ceRoleHint"',
    'id="cePeriodTypeTabs"',
    'id="cePeriodValueSelect"',
    'id="ceBusinessFilter"',
    'id="ceRatingFilter"',
    'id="ceContent"',
    'id="ceDetailDrawer"',
    "../assets/js/customer-evaluation.js"
  ];
  for (const marker of requiredHtmlMarkers) {
    if (!htmlSource.includes(marker)) {
      errors.push(`pages/customer-evaluation.html: required marker missing ${marker}`);
    }
  }
  if (htmlSource.includes("placeholderRoot") || htmlSource.includes("placeholder.js")) {
    errors.push("pages/customer-evaluation.html: retired placeholder wiring remains");
  }

  const requiredScriptMarkers = [
    'id: "departmentHead"',
    'id: "groupLeader"',
    'id: "member"',
    'defaultView: "person"',
    'view: "department"',
    'name: "优秀"',
    'name: "良好"',
    'name: "一般"',
    'name: "低分"',
    "const PERIOD_OPTIONS",
    'data-page-action="back"',
    'data-group-id="',
    'data-person-id="',
    "renderSummary(records)",
    "renderAnalysis(records)",
    "renderDetailPanel(records)",
    "function renderGroupOverview(",
    "function renderMemberOverview(",
    "function switchRole(",
    "function openGroup(",
    "function openPerson(",
    "function goBack(",
    "function navigateToLevel("
  ];
  for (const marker of requiredScriptMarkers) {
    if (!scriptSource.includes(marker)) {
      errors.push(`assets/js/customer-evaluation.js: required marker missing ${marker}`);
    }
  }

  const retiredScopeMarkers = [
    "ceFilterForm",
    "ceGroupFilter",
    "ceManagerFilter",
    "renderGroupComparison(",
    "业务组评价对比"
  ];
  const customerSources = [htmlSource, scriptSource].join("\n");
  for (const marker of retiredScopeMarkers) {
    if (customerSources.includes(marker)) {
      errors.push(`customer evaluation: retired scope marker remains ${marker}`);
    }
  }
}

function checkPerformanceDashboard() {
  const htmlPath = path.join(projectRoot, "pages", "performance-dashboard.html");
  const cssPath = path.join(projectRoot, "assets", "css", "performance-dashboard.css");
  const scriptPath = path.join(projectRoot, "assets", "js", "performance-dashboard.js");
  for (const file of [htmlPath, cssPath, scriptPath]) {
    if (!fs.existsSync(file)) {
      errors.push(`${relative(file)}: performance dashboard file missing`);
    }
  }
  if (![htmlPath, cssPath, scriptPath].every((file) => fs.existsSync(file))) return;

  const htmlSource = fs.readFileSync(htmlPath, "utf8");
  const scriptSource = fs.readFileSync(scriptPath, "utf8");
  const requiredHtmlMarkers = [
    'data-page="performance-dashboard"',
    'id="performanceBreadcrumb"',
    'id="performanceBackButton"',
    'id="performanceRoleTabs"',
    'id="performanceRoleHint"',
    'id="performancePeriodTypeTabs"',
    'id="performancePeriodSelect"',
    'id="performanceGroupSelect"',
    'id="performanceSummary"',
    'id="performanceScopePanel"',
    'id="performanceGroupComparison"',
    'id="performanceExceptionList"',
    'id="performanceTableBody"',
    'id="performancePagination"',
    'id="performanceDetailDrawer"',
    'id="performanceConfigDrawer"',
    'id="configMember"',
    '<option value="person">个人</option>',
    "../assets/js/performance-dashboard.js"
  ];
  for (const marker of requiredHtmlMarkers) {
    if (!htmlSource.includes(marker)) {
      errors.push(`pages/performance-dashboard.html: required marker missing ${marker}`);
    }
  }
  if (htmlSource.includes("placeholderRoot") || htmlSource.includes("placeholder.js")) {
    errors.push("pages/performance-dashboard.html: retired placeholder wiring remains");
  }

  const requiredScriptMarkers = [
    'id: "departmentHead"',
    'id: "groupLeader"',
    'id: "member"',
    'defaultLevel: "person"',
    'memberId: "member-2-1"',
    "const PERIOD_OPTIONS",
    'let activePeriodType = "月度"',
    '"purchaseSuccess",\n      "采购成功率"',
    '"customerSatisfaction",\n      "客户满意度"',
    '"perCapitaOutput",\n      "人均产值"',
    '"groupQualityRate",\n      "业务组质量问题率"',
    '"trainingContribution",\n      "培训贡献度"',
    '"caseContribution",\n      "案例贡献度"',
    'function getAchievement(',
    'function getGapInfo(',
    'function renderGroupComparison(',
    'function renderGroupMembers(',
    'function renderPersonContext(',
    'function renderExceptions(',
    "performancePagination.update(items)",
    'function renderTable(',
    'function getTrendAbnormalValue(',
    '"performance-trend-explanation"',
    "earlyAbnormalCount",
    'function openDetail(',
    'function canConfigureItem(',
    'function canConfigureScope(',
    'function openConfig(',
    'function renderConfigMemberOptions(',
    'function openGroup(',
    'function openMember(',
    'function navigateToLevel(',
    '"组员同指标对比"'
  ];
  for (const marker of requiredScriptMarkers) {
    if (!scriptSource.includes(marker)) {
      errors.push(`assets/js/performance-dashboard.js: required marker missing ${marker}`);
    }
  }
}

function checkSystemManagementPages() {
  const expectedPages = ["login", "users", "roles"];
  for (const pageKey of expectedPages) {
    const pagePath = path.join(projectRoot, "pages", `${pageKey}.html`);
    if (!fs.existsSync(pagePath)) {
      errors.push(`pages/${pageKey}.html: system page missing`);
    }
  }

  const navigationSource = fs.readFileSync(
    path.join(projectRoot, "assets", "js", "navigation.js"),
    "utf8"
  );
  for (const expectedLink of ["users.html", "roles.html"]) {
    if (!navigationSource.includes(expectedLink)) {
      errors.push(`assets/js/navigation.js: menu link missing for ${expectedLink}`);
    }
  }

  const rolesPage = fs.readFileSync(path.join(projectRoot, "pages", "roles.html"), "utf8");
  if (!rolesPage.includes("仅包含功能权限")) {
    errors.push("pages/roles.html: functional-permission scope copy missing");
  }

  const usersSource = [
    fs.readFileSync(path.join(projectRoot, "pages", "users.html"), "utf8"),
    fs.readFileSync(path.join(projectRoot, "assets", "js", "users.js"), "utf8")
  ].join("\n");
  const requiredUserFeatures = [
    "umOrgTree",
    "umOrgCtxMenu",
    "batch-delete",
    "reset-password",
    "umDrawer",
    "umPager",
    "data-role-option",
    "umImportModal",
    "umImportSummary",
    "function readImportFile(",
    "function exportUsers(",
    "umImportDuplicateMode",
    "function importRowAction(",
    "重复跳过",
    "重复覆盖",
    "const USER_FILE_HEADERS",
    "function createUserFileWorkbook(",
    "../assets/js/excel-export.js",
    "部门负责人"
  ];
  for (const marker of requiredUserFeatures) {
    if (!usersSource.includes(marker)) {
      errors.push(`user management: reference feature missing ${marker}`);
    }
  }
  const sharedUserWorkbookCalls = usersSource.match(/createUserFileWorkbook\(/g) || [];
  if (sharedUserWorkbookCalls.length < 3) {
    errors.push("user management: import template and user export must share createUserFileWorkbook");
  }

  const rolesSource = [
    rolesPage,
    fs.readFileSync(path.join(projectRoot, "assets", "js", "roles.js"), "utf8")
  ].join("\n");
  const requiredRoleFeatures = [
    "roleCtxMenu",
    "roleDeleteModal",
    "functionBlocks",
    "function-permission-list",
    "savePermissionBtn",
    "功能菜单与功能按钮",
    "function-column-head",
    "无独立按钮权限",
    "function syncFunctionCheckboxStates(",
    "function findFunctionNode(",
    'makeRole("r6", "普通组员", "个人经营查看与本人绩效维护权限", 12, memberFunctionIds)'
  ];
  for (const marker of requiredRoleFeatures) {
    if (!rolesSource.includes(marker)) {
      errors.push(`role management: reference feature missing ${marker}`);
    }
  }
  const requiredRolePermissions = [
    ["menu.dashboard.detail", "查看指标详情"],
    ["menu.dashboard.exportDetail", "导出指标明细"],
    ["business.efficiency", "人效看板"],
    ["business.operation", "运营看板"],
    ["business.reports.detail", "查看指标明细"],
    ["business.reports.exportData", "导出报表数据"],
    ["business.reports.exportDetail", "导出明细"],
    ["business.reportDocuments.preview", "预览报告"],
    ["business.reportDocuments.export", "导出报告"],
    ["business.customerEvaluation.detail", "查看评价详情"],
    ["special.list.detail", "查看专项详情"],
    ["special.list.create", "新建专项"],
    ["special.list.edit", "编辑专项"],
    ["special.list.progress", "填报进度"],
    ["special.list.changeStatus", "调整状态"],
    ["special.results.detail", "查看专项详情"],
    ["menu.performance.detail", "查看指标详情"],
    ["menu.performance.configure", "设置绩效指标"],
    ["menu.performance.adjustTarget", "调整目标"],
    ["system.users.view", "查看用户"],
    ["system.users.create", "新增用户"],
    ["system.users.edit", "编辑用户"],
    ["system.users.import", "导入用户"],
    ["system.users.export", "导出用户"],
    ["system.users.resetPassword", "重置密码"],
    ["system.users.toggleStatus", "启用 / 禁用"],
    ["system.users.delete", "删除用户"],
    ["system.users.orgCreate", "新增子组织"],
    ["system.users.orgRename", "重命名组织"],
    ["system.users.orgDelete", "删除组织"],
    ["system.roles.create", "新增角色"],
    ["system.roles.rename", "重命名角色"],
    ["system.roles.delete", "删除角色"],
    ["system.roles.permission", "配置功能权限"]
  ];
  for (const [permissionId, permissionLabel] of requiredRolePermissions) {
    if (!rolesSource.includes(permissionId) || !rolesSource.includes(permissionLabel)) {
      errors.push(`role management: latest menu/button permission missing ${permissionId} ${permissionLabel}`);
    }
  }
  for (const retiredPermission of [
    '"menu.dashboard.view"',
    '"business.efficiency.view"',
    '"business.operation.view"',
    '"business.reports.view"',
    '"business.reportDocuments.view"',
    '"business.customerEvaluation.view"',
    '"special.list.view"',
    '"special.results.view"',
    '"menu.performance.view"',
    '"system.users.search"',
    '"system.roles.view"'
  ]) {
    if (rolesSource.includes(retiredPermission)) {
      errors.push(`role management: retired generic permission remains ${retiredPermission}`);
    }
  }
  const forbiddenRoleFeatures = [
    "主题权限",
    "模型权限",
    "维度权限",
    'data-tab="theme"',
    'data-tab="model"',
    'data-tab="dimension"',
    "roleDimAddModal"
  ];
  for (const marker of forbiddenRoleFeatures) {
    if (rolesSource.includes(marker)) {
      errors.push(`role management: non-functional permission remains ${marker}`);
    }
  }
}

function checkMaterials() {
  const sourceWorkbooks = [
    "业务管理系统需求梳理-yy.xlsx",
    "业务管理系统需求梳理-20260728.xlsx"
  ];
  for (const workbookName of sourceWorkbooks) {
    const sourceWorkbook = path.join(projectRoot, "materials", workbookName);
    if (!fs.existsSync(sourceWorkbook)) {
      errors.push(`materials/${workbookName}: source workbook missing`);
    } else if (fs.statSync(sourceWorkbook).size === 0) {
      errors.push(`materials/${workbookName}: source workbook is empty`);
    }
  }
}

const htmlCount = checkHTML();
const cssCount = checkCSS();
checkSharedPagination();
checkDashboardMetrics();
checkUnifiedDashboardControls();
checkReportPageSplit();
checkSpecialManagement();
checkMessageCenter();
checkOperationDashboard();
checkEfficiencyDashboard();
checkCustomerEvaluationPage();
checkPerformanceDashboard();
checkSystemManagementPages();
checkMaterials();

if (!fs.existsSync(path.join(projectRoot, "docs", "需求与原型框架梳理.md"))) {
  errors.push("docs/需求与原型框架梳理.md: analysis record missing");
}
const dashboardUpdateDoc = path.join(projectRoot, "docs", "工作台业务交付指标更新分析与设计.md");
if (!fs.existsSync(dashboardUpdateDoc)) {
  errors.push("docs/工作台业务交付指标更新分析与设计.md: update record missing");
} else {
  const dashboardUpdateSource = fs.readFileSync(dashboardUpdateDoc, "utf8");
  for (const marker of ["## 6. 实施结果", "采用最新 58 项指标", "默认每页 9 项"]) {
    if (!dashboardUpdateSource.includes(marker)) {
      errors.push(`docs/工作台业务交付指标更新分析与设计.md: marker missing ${marker}`);
    }
  }
}

if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  warnings.forEach((warning) => console.log(`- ${warning}`));
}

if (errors.length) {
  console.error(`Static validation failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Static validation passed: ${htmlCount} HTML files, ${cssCount} CSS files, 1 shared card 9/18/27 and table 10/20/50 pagination component, 58 metrics, 4 workbench roles, metric name/status filters, 1 efficiency dashboard, 1 paginated operation dashboard, 1 customer evaluation analysis, 1 performance dashboard, 1 special management module, 1 shared message center, 2 split report pages, 3 system pages.`);
