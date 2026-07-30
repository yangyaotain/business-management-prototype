(function setupReportDocumentsPage() {
  "use strict";

  const ROLE_ICONS = {
    department:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V7l8-4 8 4v14M8 10h2M14 10h2M8 14h2M14 14h2M10 21v-3h4v3"/></svg>',
    leader:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M14 15a5 5 0 0 1 7 4.5"/></svg>',
    member:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></svg>'
  };
  const roles = [
    { id: "departmentHead", label: "部门负责人", userName: "陈建", avatar: "陈", scope: "代理业务部", icon: ROLE_ICONS.department },
    { id: "groupLeader", label: "业务组长", userName: "张明", avatar: "张", scope: "第二业务组", icon: ROLE_ICONS.leader },
    { id: "member", label: "组员", userName: "李文", avatar: "李", scope: "李文", icon: ROLE_ICONS.member }
  ];
  const reportRecords = [
    { id: "report-2026-07", type: "月度", periodValue: "2026-07", period: "2026年7月", updatedAt: "2026-08-05 16:28", owner: "陈建", size: "1.6 MB" },
    { id: "report-2026-06", type: "月度", periodValue: "2026-06", period: "2026年6月", updatedAt: "2026-07-05 11:16", owner: "陈建", size: "1.6 MB" },
    { id: "report-2026-05", type: "月度", periodValue: "2026-05", period: "2026年5月", updatedAt: "2026-06-05 14:42", owner: "陈建", size: "1.6 MB" },
    { id: "report-2026-04", type: "月度", periodValue: "2026-04", period: "2026年4月", updatedAt: "2026-05-06 10:18", owner: "陈建", size: "1.6 MB" },
    { id: "report-2026-03", type: "月度", periodValue: "2026-03", period: "2026年3月", updatedAt: "2026-04-03 17:05", owner: "陈建", size: "1.6 MB" },
    { id: "report-2026-02", type: "月度", periodValue: "2026-02", period: "2026年2月", updatedAt: "2026-03-05 15:36", owner: "陈建", size: "1.5 MB" },
    { id: "report-2026-01", type: "月度", periodValue: "2026-01", period: "2026年1月", updatedAt: "2026-02-05 09:48", owner: "陈建", size: "1.5 MB" },
    { id: "report-2025-12", type: "月度", periodValue: "2025-12", period: "2025年12月", updatedAt: "2026-01-06 14:20", owner: "陈建", size: "1.7 MB" },
    { id: "report-2025-11", type: "月度", periodValue: "2025-11", period: "2025年11月", updatedAt: "2025-12-05 10:42", owner: "陈建", size: "1.6 MB" },
    { id: "report-2025-10", type: "月度", periodValue: "2025-10", period: "2025年10月", updatedAt: "2025-11-05 16:12", owner: "陈建", size: "1.6 MB" },
    { id: "report-2025-09", type: "月度", periodValue: "2025-09", period: "2025年9月", updatedAt: "2025-10-09 11:08", owner: "陈建", size: "1.5 MB" },
    { id: "report-2025-08", type: "月度", periodValue: "2025-08", period: "2025年8月", updatedAt: "2025-09-05 15:24", owner: "陈建", size: "1.5 MB" },
    { id: "report-2026-q2", type: "季度", periodValue: "2026-Q2", period: "2026年第二季度", updatedAt: "2026-07-08 16:18", owner: "陈建", size: "2.4 MB" },
    { id: "report-2026-q1", type: "季度", periodValue: "2026-Q1", period: "2026年第一季度", updatedAt: "2026-04-08 10:26", owner: "陈建", size: "2.3 MB" },
    { id: "report-2025-q4", type: "季度", periodValue: "2025-Q4", period: "2025年第四季度", updatedAt: "2026-01-09 15:42", owner: "陈建", size: "2.5 MB" },
    { id: "report-2025-q3", type: "季度", periodValue: "2025-Q3", period: "2025年第三季度", updatedAt: "2025-10-10 11:32", owner: "陈建", size: "2.4 MB" }
  ];
  const REPORT_TEMPLATE_PATH = "../assets/files/代理业务部经营月报【2026年X月】 模板（系统版）.docx";
  const state = {
    role: "departmentHead",
    reportType: "月度",
    reportKeywords: { 月度: "", 季度: "" }
  };
  let reportPagination = null;

  const $ = (id) => document.getElementById(id);
  const escapeHTML = (value) => String(value == null ? "" : value).replace(/[&<>"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  }[char]));
  const activeRole = () => roles.find((role) => role.id === state.role) || roles[0];
  const activeKeyword = () => state.reportKeywords[state.reportType];

  function reportDisplayName(report) {
    return activeRole().scope + "经营" + (report.type === "月度" ? "月报" : "季报") + "【" + report.period + "】";
  }

  function renderRoleControls() {
    $("reportDocumentRoleTabs").innerHTML = roles.map((role) => [
      '<button type="button" class="dashboard-role-tab',
      state.role === role.id ? " active" : "",
      '" data-report-document-role="',
      role.id,
      '" aria-pressed="',
      String(state.role === role.id),
      '">',
      role.icon,
      "<span>",
      role.label,
      "</span></button>"
    ].join("")).join("");
    const role = activeRole();
    $("reportDocumentUserAvatar").textContent = role.avatar;
    $("reportDocumentUserName").textContent = role.userName;
    $("reportDocumentUserRole").textContent = role.label;
    $("topbarPageSubtitle").textContent = role.label + " · 报告归档视图";
  }

  function renderTypeControls() {
    const isMonthly = state.reportType === "月度";
    $("reportDocumentTypeTabs").querySelectorAll("[data-report-type]").forEach((button) => {
      const active = button.dataset.reportType === state.reportType;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
      const badge = button.querySelector("em");
      if (badge) {
        badge.textContent = reportRecords.filter((report) => report.type === button.dataset.reportType).length;
      }
    });
    $("managedReportList").setAttribute("aria-labelledby", isMonthly ? "monthlyReportTab" : "quarterlyReportTab");
    $("reportDocumentTitle").textContent = isMonthly ? "月度报告" : "季度报告";
    $("reportDocumentDescription").textContent = isMonthly
      ? "查看近12个月权限范围内的月度报告。"
      : "查看最近4个季度权限范围内的季度报告。";
    $("managedReportTableHead").innerHTML = isMonthly
      ? "<tr><th>月度报告名称</th><th>报告月份</th><th>数据范围</th><th>更新时间</th><th>更新人</th><th>操作</th></tr>"
      : "<tr><th>季度报告名称</th><th>报告季度</th><th>数据范围</th><th>更新时间</th><th>更新人</th><th>操作</th></tr>";
    const searchInput = $("reportManagementSearch");
    const searchLabel = isMonthly ? "搜索月度报告名称、月份或范围" : "搜索季度报告名称、季度或范围";
    searchInput.placeholder = searchLabel;
    searchInput.setAttribute("aria-label", searchLabel);
    searchInput.value = activeKeyword();
  }

  function visibleReportRecords() {
    const keyword = activeKeyword();
    const scope = activeRole().scope;
    return reportRecords
      .filter((report) => {
        const displayName = reportDisplayName(report);
        return report.type === state.reportType &&
          (!keyword || displayName.includes(keyword) || report.period.includes(keyword) || scope.includes(keyword));
      })
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt, "zh-CN"));
  }

  function reportRowsHTML(records) {
    if (!records.length) {
      return '<tr><td colspan="6"><div class="report-management-empty"><strong>未找到匹配报告</strong><span>请调整报告名称后重试。</span></div></td></tr>';
    }
    const scope = activeRole().scope;
    return records.map((report) => [
      '<tr><td><div class="managed-report-name"><span>',
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6z"/><path d="M14 3v5h5M9 12h6M9 16h6"/></svg>',
      "</span><div><strong>",
      escapeHTML(reportDisplayName(report)),
      "</strong><small>",
      report.type,
      "报告 · Word 文档 · ",
      escapeHTML(report.size),
      "</small></div></div></td><td>",
      escapeHTML(report.period),
      "</td><td>",
      escapeHTML(scope),
      "</td><td>",
      escapeHTML(report.updatedAt),
      "</td><td>",
      escapeHTML(report.owner),
      '</td><td><div class="managed-report-actions"><button type="button" class="table-action" data-report-preview="',
      report.id,
      '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/></svg>预览</button>',
      '<button type="button" class="table-action" data-report-export="',
      report.id,
      '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>导出</button></div></td></tr>'
    ].join("")).join("");
  }

  function renderReportRows() {
    const records = visibleReportRecords();
    const paginationState = reportPagination.update(records);
    $("managedReportTableBody").innerHTML = reportRowsHTML(paginationState.items);
    $("managedReportCount").textContent = "近一年 · " + records.length + "份" + state.reportType + "报告";
  }

  function syncKeyword() {
    state.reportKeywords[state.reportType] = $("reportManagementSearch").value.trim();
  }

  function applySearch() {
    syncKeyword();
    reportPagination.reset();
    renderReportRows();
  }

  function openReportPreview(reportId) {
    const report = reportRecords.find((item) => item.id === reportId);
    if (!report) return;
    const previewUrl = new URL("report-word-preview.html", window.location.href);
    previewUrl.searchParams.set("reportId", report.id);
    previewUrl.searchParams.set("name", reportDisplayName(report));
    const previewWindow = window.open(previewUrl, "_blank");
    if (!previewWindow) {
      window.showToast("浏览器已拦截新标签页，请允许弹出窗口后重试");
      return;
    }
    previewWindow.opener = null;
  }

  async function exportReport(reportId) {
    const report = reportRecords.find((item) => item.id === reportId);
    if (!report) return;
    const displayName = reportDisplayName(report);
    const fileName = displayName.replace(/[\\/:*?"<>|]/g, "-") + ".docx";
    const templateUrl = new URL(REPORT_TEMPLATE_PATH, window.location.href);
    window.showToast("正在准备“" + fileName + "”");
    try {
      const response = await fetch(templateUrl.href, { cache: "no-store" });
      if (!response.ok) throw new Error("Template request failed: " + response.status);
      const templateBlob = await response.blob();
      const downloadUrl = URL.createObjectURL(templateBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = fileName;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      window.showToast("已开始下载“" + fileName + "”");
    } catch (error) {
      if (window.location.protocol === "file:") {
        const downloadLink = document.createElement("a");
        downloadLink.href = templateUrl.href;
        downloadLink.download = fileName;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        window.showToast("已开始下载“" + fileName + "”");
        return;
      }
      console.error("Word report export failed", error);
      window.showToast("Word 报告下载失败，请稍后重试", "error");
    }
  }

  function render() {
    renderRoleControls();
    renderTypeControls();
    renderReportRows();
  }

  document.addEventListener("click", (event) => {
    const roleButton = event.target.closest("[data-report-document-role]");
    const typeButton = event.target.closest("[data-report-type]");
    const previewButton = event.target.closest("[data-report-preview]");
    const exportButton = event.target.closest("[data-report-export]");
    if (roleButton && roleButton.dataset.reportDocumentRole !== state.role) {
      syncKeyword();
      state.role = roleButton.dataset.reportDocumentRole;
      reportPagination.reset();
      render();
    } else if (typeButton && typeButton.dataset.reportType !== state.reportType) {
      syncKeyword();
      state.reportType = typeButton.dataset.reportType;
      reportPagination.reset();
      render();
    } else if (previewButton) {
      openReportPreview(previewButton.dataset.reportPreview);
    } else if (exportButton) {
      exportReport(exportButton.dataset.reportExport);
    } else if (event.target.closest("#reportManagementSearchButton")) {
      applySearch();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.id === "reportManagementSearch") {
      event.preventDefault();
      applySearch();
    } else if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key) && event.target.matches("[data-report-type]")) {
      event.preventDefault();
      syncKeyword();
      const tabs = Array.from($("reportDocumentTypeTabs").querySelectorAll("[data-report-type]"));
      const currentIndex = tabs.indexOf(event.target);
      const nextIndex = event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : event.key === "ArrowRight"
            ? (currentIndex + 1) % tabs.length
            : (currentIndex - 1 + tabs.length) % tabs.length;
      state.reportType = tabs[nextIndex].dataset.reportType;
      reportPagination.reset();
      render();
      tabs[nextIndex].focus();
    }
  });

  reportPagination = window.AppPagination.create({
    container: $("managedReportPagination"),
    variant: "table",
    itemLabel: "份",
    onChange: renderReportRows
  });
  render();
})();
