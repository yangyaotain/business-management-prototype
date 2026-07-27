import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const errors = [];
const warnings = [];

function collectFiles(dir, extension, result = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
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

    if (label.startsWith("pages/") && label !== "pages/login.html") {
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

function checkDashboardMetrics() {
  const dashboardScript = path.join(projectRoot, "assets", "js", "dashboard.js");
  const source = fs.readFileSync(dashboardScript, "utf8");
  const metricBlock = source.match(/const METRICS = \[([\s\S]*?)\n  \];/);
  if (!metricBlock) {
    errors.push("assets/js/dashboard.js: METRICS array not found");
    return;
  }
  const ids = [...metricBlock[1].matchAll(/^\s+id:\s+(\d+),$/gm)].map((match) => Number(match[1]));
  const expected = Array.from({ length: 28 }, (_, index) => index + 1);
  if (JSON.stringify(ids) !== JSON.stringify(expected)) {
    errors.push(`assets/js/dashboard.js: expected metric ids 1-28, got ${ids.join(",")}`);
  }

  const directions = {
    客户赋能: [...metricBlock[1].matchAll(/direction: "客户赋能"/g)].length,
    运营效能: [...metricBlock[1].matchAll(/direction: "运营效能"/g)].length,
    能力建设: [...metricBlock[1].matchAll(/direction: "能力建设"/g)].length
  };
  if (directions.客户赋能 !== 9 || directions.运营效能 !== 14 || directions.能力建设 !== 5) {
    errors.push(`assets/js/dashboard.js: unexpected direction counts ${JSON.stringify(directions)}`);
  }
}

function checkUnifiedDashboardControls() {
  const dashboards = [
    {
      page: "dashboard",
      script: "dashboard.js",
      roleTabs: 'id="roleViewTabs"',
      periodTabs: 'id="periodTypeTabs"',
      periodSelect: 'id="periodValueSelect"'
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
    for (const marker of ['label: "部门负责人"', 'label: "业务组长"', 'label: "组员"']) {
      if (!scriptSource.includes(marker)) {
        errors.push(`assets/js/${dashboard.script}: unified demo role missing ${marker}`);
      }
    }
  }
}

function checkPlaceholderPages() {
  const expectedPages = ["reports"];
  const configSource = fs.readFileSync(
    path.join(projectRoot, "assets", "js", "placeholder.js"),
    "utf8"
  );

  for (const pageKey of expectedPages) {
    const pagePath = path.join(projectRoot, "pages", `${pageKey}.html`);
    if (!fs.existsSync(pagePath)) {
      errors.push(`pages/${pageKey}.html: placeholder page missing`);
      continue;
    }
    const pageSource = fs.readFileSync(pagePath, "utf8");
    if (!pageSource.includes(`data-page="${pageKey}"`)) {
      errors.push(`pages/${pageKey}.html: data-page mismatch`);
    }
    const configPattern = new RegExp(`(?:^|\\n)\\s*(?:"${pageKey}"|${pageKey}):\\s*\\{`);
    if (!configPattern.test(configSource)) {
      errors.push(`assets/js/placeholder.js: config missing for ${pageKey}`);
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
  const scriptSource = fs.readFileSync(scriptPath, "utf8");
  const requiredListMarkers = [
    'data-page="special-list"',
    'id="specialYearFilter"',
    'id="specialDirectionFilter"',
    'id="specialStatusFilter"',
    'id="specialHealthFilter"',
    'id="specialListBody"',
    'id="specialDetailDrawer"',
    'id="specialEditDrawer"',
    'id="specialProgressModal"',
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
    "function renderDetailBody(",
    "function openEdit(",
    "function openProgress(",
    "function handleApproval("
  ];
  for (const marker of requiredScriptMarkers) {
    if (!scriptSource.includes(marker)) {
      errors.push(`assets/js/special-management.js: required marker missing ${marker}`);
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
  const scriptSource = fs.readFileSync(scriptPath, "utf8");
  const requiredHtmlMarkers = [
    'data-page="operation-dashboard"',
    'id="operationRoleTabs"',
    'id="operationPeriodTypeTabs"',
    'id="operationPeriodSelect"',
    'id="operationBusinessTypeSelect"',
    'id="operationScopePath"',
    'id="operationScopePanelBody"',
    'id="operationComparisonBody"',
    'id="operationMetricGrid"',
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
    "renderGroupPanel()",
    "renderMemberPanel()",
    "renderPersonPanel()"
  ];
  for (const marker of requiredScriptMarkers) {
    if (!scriptSource.includes(marker)) {
      errors.push(`assets/js/operation-dashboard.js: required marker missing ${marker}`);
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
    'id="ceRoleTabs"',
    'id="ceFilterForm"',
    'id="cePeriodTypeTabs"',
    'id="cePeriodValueSelect"',
    'id="ceSummaryCards"',
    'id="ceRatingDistribution"',
    'id="ceProblemAnalysis"',
    'id="ceDetailRows"',
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
    'name: "优秀"',
    'name: "良好"',
    'name: "一般"',
    'name: "低分"',
    "const PERIOD_OPTIONS",
    'let activePeriodType = "月度"',
    "renderSummary(records)",
    "renderTrend(records)",
    "renderRatingDistribution(records)",
    "renderProblemAnalysis(records)",
    "renderGroupComparison(records)",
    "renderTable(records)"
  ];
  for (const marker of requiredScriptMarkers) {
    if (!scriptSource.includes(marker)) {
      errors.push(`assets/js/customer-evaluation.js: required marker missing ${marker}`);
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
    'id="performanceRoleTabs"',
    'id="performancePeriodTypeTabs"',
    'id="performancePeriodSelect"',
    'id="performanceGroupSelect"',
    'id="performanceSummary"',
    'id="performanceGroupComparison"',
    'id="performanceExceptionList"',
    'id="performanceTableBody"',
    'id="performanceDetailDrawer"',
    'id="performanceConfigDrawer"',
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
    'function renderExceptions(',
    'function renderTable(',
    'function openDetail(',
    'function openConfig('
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
    "umPageSize",
    "data-role-option"
  ];
  for (const marker of requiredUserFeatures) {
    if (!usersSource.includes(marker)) {
      errors.push(`user management: reference feature missing ${marker}`);
    }
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
    "savePermissionBtn"
  ];
  for (const marker of requiredRoleFeatures) {
    if (!rolesSource.includes(marker)) {
      errors.push(`role management: reference feature missing ${marker}`);
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
  const sourceWorkbook = path.join(projectRoot, "materials", "业务管理系统需求梳理-yy.xlsx");
  if (!fs.existsSync(sourceWorkbook)) {
    errors.push("materials/业务管理系统需求梳理-yy.xlsx: source workbook missing");
  } else if (fs.statSync(sourceWorkbook).size === 0) {
    errors.push("materials/业务管理系统需求梳理-yy.xlsx: source workbook is empty");
  }
}

const htmlCount = checkHTML();
const cssCount = checkCSS();
checkDashboardMetrics();
checkUnifiedDashboardControls();
checkPlaceholderPages();
checkSpecialManagement();
checkOperationDashboard();
checkEfficiencyDashboard();
checkCustomerEvaluationPage();
checkPerformanceDashboard();
checkSystemManagementPages();
checkMaterials();

if (!fs.existsSync(path.join(projectRoot, "docs", "需求与原型框架梳理.md"))) {
  errors.push("docs/需求与原型框架梳理.md: analysis record missing");
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

console.log(`Static validation passed: ${htmlCount} HTML files, ${cssCount} CSS files, 28 metrics, 1 efficiency dashboard, 1 operation dashboard, 1 customer evaluation analysis, 1 performance dashboard, 1 special management module, 1 placeholder page, 3 system pages.`);
