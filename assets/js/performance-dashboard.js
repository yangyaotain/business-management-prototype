(function setupPerformanceDashboard() {
  const ICONS = {
    department:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V7l8-4 8 4v14M8 10h2M14 10h2M8 14h2M14 14h2M10 21v-3h4v3"/></svg>',
    leader:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M14 15a5 5 0 0 1 7 4.5"/></svg>',
    member:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></svg>',
    metric:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></svg>',
    target:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="m18 6 3-3M17 7l4-4"/></svg>',
    challenge:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 7v5c0 4.5 2.8 7.5 7 9 4.2-1.5 7-4.5 7-9V7l-7-4z"/><path d="m9 12 2 2 4-5"/></svg>',
    alert:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.8 19h18.4L12 3z"/><path d="M12 9v4M12 17h.01"/></svg>',
    rate:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/><path d="m4 8 6-5 6 7 5-4"/></svg>',
    view:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></svg>'
  };

  const GROUPS = [
    { id: "group-1", name: "第一业务组", leader: "赵倩" },
    { id: "group-2", name: "第二业务组", leader: "张明" },
    { id: "group-3", name: "非电力业务组", leader: "孙岚" },
    { id: "group-4", name: "造价业务组", leader: "王军" }
  ];

  const ROLE_VIEWS = [
    {
      id: "departmentHead",
      label: "部门负责人",
      userName: "陈建",
      avatar: "陈",
      defaultLevel: "department",
      canConfigure: true
    },
    {
      id: "groupLeader",
      label: "业务组长",
      userName: "张明",
      avatar: "张",
      defaultLevel: "group",
      groupId: "group-2",
      canConfigure: true
    },
    {
      id: "member",
      label: "组员",
      userName: "李文",
      avatar: "李",
      defaultLevel: "group",
      groupId: "group-2",
      canConfigure: false
    }
  ];

  const PERIOD_OPTIONS = {
    月度: [
      { value: "2026-07", label: "2026年7月" },
      { value: "2026-06", label: "2026年6月" },
      { value: "2026-05", label: "2026年5月" },
      { value: "2026-04", label: "2026年4月" },
      { value: "2026-03", label: "2026年3月" },
      { value: "2026-02", label: "2026年2月" },
      { value: "2026-01", label: "2026年1月" },
      { value: "2025-12", label: "2025年12月" },
      { value: "2025-11", label: "2025年11月" },
      { value: "2025-10", label: "2025年10月" },
      { value: "2025-09", label: "2025年9月" },
      { value: "2025-08", label: "2025年8月" }
    ],
    季度: [
      { value: "2026-Q2", label: "2026年第二季度" },
      { value: "2026-Q1", label: "2026年第一季度" },
      { value: "2025-Q4", label: "2025年第四季度" },
      { value: "2025-Q3", label: "2025年第三季度" }
    ]
  };

  const METRIC_LIBRARY = [
    metric(
      "purchaseSuccess",
      "采购成功率",
      "客户赋能",
      "月度 / 季度",
      "%",
      "high",
      "成交项目中采购成功项目的占比。",
      94.1
    ),
    metric(
      "customerSatisfaction",
      "客户满意度",
      "客户赋能",
      "月度 / 季度",
      "分",
      "high",
      "一项目一评价及客户反馈的综合评分。",
      92.6
    ),
    metric(
      "perCapitaOutput",
      "人均产值",
      "运营效能",
      "月度 / 季度",
      "万元",
      "high",
      "统计周期内业务产值除以业务组平均人数。",
      42.6
    ),
    metric(
      "feeRecovery",
      "平台服务费回收率",
      "运营效能",
      "月度 / 季度",
      "%",
      "high",
      "实际收到的平台服务费金额除以应收平台服务费金额。",
      91.4
    ),
    metric(
      "groupQualityRate",
      "业务组质量问题率",
      "运营效能",
      "月度 / 季度",
      "%",
      "low",
      "业务组内质量问题标段数量除以组内成交标段数量。",
      2.8
    ),
    metric(
      "firstPassRate",
      "一次通过率",
      "运营效能",
      "月度 / 季度",
      "%",
      "high",
      "流程一次审批通过次数除以总提交流程次数。",
      93.8
    ),
    metric(
      "trainingContribution",
      "培训贡献度",
      "能力建设",
      "月度 / 季度",
      "次",
      "high",
      "统计周期内完成并通过确认的培训分享次数。",
      10
    ),
    metric(
      "caseContribution",
      "案例贡献度",
      "能力建设",
      "月度 / 季度",
      "个",
      "high",
      "统计周期内提交并通过确认的业务案例数量。",
      7
    ),
    metric(
      "riskAdoption",
      "中高风险采纳率",
      "客户赋能",
      "月度 / 季度",
      "%",
      "high",
      "客户采纳的中高风险建议数量除以提出的中高风险建议总量。",
      78
    ),
    metric(
      "settlementRate",
      "结算完成率",
      "运营效能",
      "月度 / 季度",
      "%",
      "high",
      "实际完成结算项目个数除以计划应完成结算项目个数。",
      88.9
    )
  ];

  const performanceItems = [
    performance("dept-purchase", "department", null, "purchaseSuccess", 93.8, 92, 96),
    performance("dept-satisfaction", "department", null, "customerSatisfaction", 91.8, 90, 95),
    performance("dept-output", "department", null, "perCapitaOutput", 39.2, 40, 45),
    performance("dept-fee", "department", null, "feeRecovery", 91.4, 95, 98),
    performance("dept-quality", "department", null, "groupQualityRate", 2.7, 3, 2),
    performance("dept-pass", "department", null, "firstPassRate", 93.1, 92, 96),
    performance("dept-training", "department", null, "trainingContribution", 10, 9, 12),
    performance("dept-case", "department", null, "caseContribution", 7, 8, 10),

    performance("g1-purchase", "group", "group-1", "purchaseSuccess", 95.8, 92, 96),
    performance("g1-satisfaction", "group", "group-1", "customerSatisfaction", 93.6, 90, 95),
    performance("g1-output", "group", "group-1", "perCapitaOutput", 43.2, 40, 45),
    performance("g1-fee", "group", "group-1", "feeRecovery", 96.1, 95, 98),
    performance("g1-quality", "group", "group-1", "groupQualityRate", 1.9, 3, 2),
    performance("g1-pass", "group", "group-1", "firstPassRate", 96.4, 92, 96),
    performance("g1-training", "group", "group-1", "trainingContribution", 12, 9, 12),

    performance("g2-purchase", "group", "group-2", "purchaseSuccess", 91.6, 92, 96),
    performance("g2-satisfaction", "group", "group-2", "customerSatisfaction", 90.8, 90, 95),
    performance("g2-output", "group", "group-2", "perCapitaOutput", 38.5, 40, 45),
    performance("g2-fee", "group", "group-2", "feeRecovery", 89.6, 95, 98),
    performance("g2-quality", "group", "group-2", "groupQualityRate", 3.4, 3, 2),
    performance("g2-pass", "group", "group-2", "firstPassRate", 93.7, 92, 96),
    performance("g2-training", "group", "group-2", "trainingContribution", 8, 9, 12),

    performance("g3-purchase", "group", "group-3", "purchaseSuccess", 97.2, 92, 96),
    performance("g3-satisfaction", "group", "group-3", "customerSatisfaction", 95.4, 90, 95),
    performance("g3-output", "group", "group-3", "perCapitaOutput", 46.3, 40, 45),
    performance("g3-fee", "group", "group-3", "feeRecovery", 98.4, 95, 98),
    performance("g3-quality", "group", "group-3", "groupQualityRate", 1.7, 3, 2),
    performance("g3-pass", "group", "group-3", "firstPassRate", 96.2, 92, 96),
    performance("g3-case", "group", "group-3", "caseContribution", 11, 8, 10),

    performance("g4-satisfaction", "group", "group-4", "customerSatisfaction", 91.5, 90, 95),
    performance("g4-output", "group", "group-4", "perCapitaOutput", 40.8, 40, 45),
    performance("g4-fee", "group", "group-4", "feeRecovery", 94.2, 95, 98),
    performance("g4-quality", "group", "group-4", "groupQualityRate", 2.6, 3, 2),
    performance("g4-pass", "group", "group-4", "firstPassRate", 91.3, 92, 96),
    performance("g4-training", "group", "group-4", "trainingContribution", 10, 9, 12),
    performance("g4-case", "group", "group-4", "caseContribution", 8, 8, 10)
  ];

  let activeRoleId = "departmentHead";
  let activeLevel = "department";
  let activeGroupId = "group-2";
  let activePeriodType = "月度";
  const selectedPeriods = {
    月度: "2026-07",
    季度: "2026-Q2"
  };
  let activeCategory = "all";
  let activeStatus = "all";
  let activeDetailId = null;
  let editingItemId = null;
  let customItemCounter = 1;

  const $ = (id) => document.getElementById(id);

  function metric(id, name, category, cycle, unit, direction, definition, sampleActual) {
    return { id, name, category, cycle, unit, direction, definition, sampleActual };
  }

  function performance(id, scope, groupId, metricId, actual, target, challenge) {
    return { id, scope, groupId, metricId, actual, target, challenge };
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"]/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    }[char]));
  }

  function escapeAttr(value) {
    return escapeHTML(value).replace(/'/g, "&#39;");
  }

  function getMetric(metricId) {
    return METRIC_LIBRARY.find((item) => item.id === metricId) || METRIC_LIBRARY[0];
  }

  function getGroup(groupId) {
    return GROUPS.find((item) => item.id === groupId) || null;
  }

  function getItem(itemId) {
    return performanceItems.find((item) => item.id === itemId) || null;
  }

  function getActiveRole() {
    return ROLE_VIEWS.find((item) => item.id === activeRoleId) || ROLE_VIEWS[0];
  }

  function getCurrentPeriodOption() {
    const options = PERIOD_OPTIONS[activePeriodType];
    return options.find((item) => item.value === selectedPeriods[activePeriodType]) || options[0];
  }

  function getActiveYear() {
    return selectedPeriods[activePeriodType].slice(0, 4);
  }

  function getPeriodFactor() {
    const value = selectedPeriods[activePeriodType];
    const yearFactor = getActiveYear() === "2025" ? 0.91 : 1;
    const periodFactor = activePeriodType === "季度"
      ? (value.endsWith("Q1") ? 0.94 : value.endsWith("Q2") ? 1 : value.endsWith("Q3") ? 0.97 : 1.03)
      : 0.92 + Number(value.slice(5, 7)) * 0.012;
    return yearFactor * periodFactor;
  }

  function getPeriodValueScale(metricItem) {
    if (activePeriodType === "季度") return 1;
    return ["万元", "次", "个"].includes(metricItem.unit) ? 1 / 3 : 1;
  }

  function roundValue(value, unit) {
    if (unit === "次" || unit === "个") return Math.max(0, Math.round(value));
    return Math.round(value * 10) / 10;
  }

  function getActual(item) {
    const metricItem = getMetric(item.metricId);
    return roundValue(item.actual * getPeriodFactor() * getPeriodValueScale(metricItem), metricItem.unit);
  }

  function getTarget(item) {
    const metricItem = getMetric(item.metricId);
    return roundValue(item.target * getPeriodValueScale(metricItem), metricItem.unit);
  }

  function getChallenge(item) {
    const metricItem = getMetric(item.metricId);
    return roundValue(item.challenge * getPeriodValueScale(metricItem), metricItem.unit);
  }

  function getState(item, actualValue) {
    const metricItem = getMetric(item.metricId);
    const actual = actualValue == null ? getActual(item) : actualValue;
    const target = getTarget(item);
    const challenge = getChallenge(item);
    if (metricItem.direction === "low") {
      if (actual <= challenge) return "challenge";
      if (actual <= target) return "target";
      return "abnormal";
    }
    if (actual >= challenge) return "challenge";
    if (actual >= target) return "target";
    return "abnormal";
  }

  function getStatusMeta(state) {
    const meta = {
      abnormal: { label: "异常", description: "实际完成值未达到目标值，需要业务组重点跟进。" },
      target: { label: "达成目标", description: "实际完成值已达到目标值，尚未达到挑战值。" },
      challenge: { label: "达成挑战", description: "实际完成值已达到挑战值，表现优于基础目标。" }
    };
    return meta[state] || meta.abnormal;
  }

  function getAchievement(item, actualValue) {
    const metricItem = getMetric(item.metricId);
    const actual = actualValue == null ? getActual(item) : actualValue;
    const target = getTarget(item);
    if (metricItem.direction === "low") {
      if (actual === 0) return 100;
      return Math.round((target / actual) * 100);
    }
    if (target === 0) return actual >= 0 ? 100 : 0;
    return Math.round((actual / target) * 100);
  }

  function formatNumber(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return "-";
    return Number.isInteger(numeric)
      ? numeric.toLocaleString("zh-CN")
      : numeric.toLocaleString("zh-CN", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }

  function formatValue(value, unit) {
    return formatNumber(value) + unit;
  }

  function getGapInfo(item, actualValue) {
    const metricItem = getMetric(item.metricId);
    const actual = actualValue == null ? getActual(item) : actualValue;
    const target = getTarget(item);
    if (metricItem.direction === "low") {
      const difference = target - actual;
      if (difference >= 0) {
        return {
          bad: false,
          short: "优于目标 " + formatValue(Math.abs(difference), metricItem.unit),
          detail: "实际值低于控制目标 " + formatValue(Math.abs(difference), metricItem.unit)
        };
      }
      return {
        bad: true,
        short: "超出目标 " + formatValue(Math.abs(difference), metricItem.unit),
        detail: "实际值超出控制目标 " + formatValue(Math.abs(difference), metricItem.unit)
      };
    }

    const difference = actual - target;
    if (difference >= 0) {
      return {
        bad: false,
        short: "高于目标 " + formatValue(Math.abs(difference), metricItem.unit),
        detail: "实际值高于目标 " + formatValue(Math.abs(difference), metricItem.unit)
      };
    }
    return {
      bad: true,
      short: "距目标还差 " + formatValue(Math.abs(difference), metricItem.unit),
      detail: "实际值距目标还差 " + formatValue(Math.abs(difference), metricItem.unit)
    };
  }

  function getScopeLabel(item) {
    if (item.scope === "department") return "代理业务部";
    const group = getGroup(item.groupId);
    return group ? group.name : "业务组";
  }

  function getPeriodLabel() {
    return getCurrentPeriodOption().label;
  }

  function getContextItems() {
    const scoped = performanceItems.filter((item) => (
      activeLevel === "department"
        ? item.scope === "department"
        : item.scope === "group" && item.groupId === activeGroupId
    ));
    if (activeCategory === "all") return scoped;
    return scoped.filter((item) => getMetric(item.metricId).category === activeCategory);
  }

  function getFilteredItems() {
    const items = getContextItems();
    if (activeStatus === "all") return items;
    return items.filter((item) => getState(item) === activeStatus);
  }

  function notify(message, tone) {
    if (typeof window.showToast === "function") {
      window.showToast(message, tone);
    }
  }

  function renderGroupOptions() {
    const groupSelect = $("performanceGroupSelect");
    const configGroup = $("configGroup");
    const role = getActiveRole();
    const options = GROUPS.map((group) => (
      '<option value="' + escapeAttr(group.id) + '">' + escapeHTML(group.name) + "</option>"
    )).join("");

    if (role.id === "departmentHead") {
      groupSelect.innerHTML = '<option value="all">全部业务组</option>' + options;
      groupSelect.disabled = false;
      groupSelect.value = activeLevel === "department" ? "all" : activeGroupId;
    } else {
      const currentGroup = getGroup(role.groupId);
      groupSelect.innerHTML = currentGroup
        ? '<option value="' + escapeAttr(currentGroup.id) + '">' + escapeHTML(currentGroup.name) + "</option>"
        : options;
      groupSelect.disabled = true;
      groupSelect.value = role.groupId;
    }

    configGroup.innerHTML = options;
    if (!configGroup.value) configGroup.value = activeGroupId;
  }

  function renderRoleTabs() {
    $("performanceRoleTabs").innerHTML = ROLE_VIEWS.map((role) => [
      '<button type="button" class="dashboard-role-tab',
      role.id === activeRoleId ? " active" : "",
      '" data-role-id="',
      role.id,
      '" aria-pressed="',
      String(role.id === activeRoleId),
      '">',
      role.id === "departmentHead" ? ICONS.department : role.id === "groupLeader" ? ICONS.leader : ICONS.member,
      "<span>",
      escapeHTML(role.label),
      "</span></button>"
    ].join("")).join("");
  }

  function renderPeriodControls() {
    $("performancePeriodTypeTabs").querySelectorAll("[data-period-type]").forEach((button) => {
      const isActive = button.dataset.periodType === activePeriodType;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    $("performancePeriodSelect").innerHTML = PERIOD_OPTIONS[activePeriodType].map((item) => [
      '<option value="',
      item.value,
      '"',
      item.value === selectedPeriods[activePeriodType] ? " selected" : "",
      ">",
      escapeHTML(item.label),
      "</option>"
    ].join("")).join("");
  }

  function renderHeader() {
    const role = getActiveRole();
    const group = getGroup(activeGroupId);
    const groupName = group ? group.name : "业务组";
    const isDepartment = activeLevel === "department";
    $("performanceUserAvatar").textContent = role.avatar;
    $("performanceUserName").textContent = role.userName;
    $("performanceUserRole").textContent = role.label;
    $("performanceTopbarSubtitle").textContent = isDepartment
      ? role.label + " · 部门绩效视图"
      : role.label + " · " + groupName + "绩效视图";
    $("performancePageTitle").textContent = isDepartment
      ? "代理业务部绩效看板"
      : groupName + "绩效看板";
    $("performancePageDescription").textContent = isDepartment
      ? "汇总部门及各业务组的实际完成值、目标值与挑战值，及时识别未达目标指标。"
      : "查看" + groupName + "各项指标的实际完成值、目标值、挑战值和目标差距。";

    $("openPerformanceConfig").classList.toggle("hidden", !role.canConfigure);

    $("performanceTableTitle").textContent = isDepartment
      ? "部门绩效指标"
      : groupName + "绩效指标";
    $("performanceExceptionDescription").textContent = isDepartment
      ? "展示部门当前未达到目标值的指标。"
      : "展示" + groupName + "当前未达到目标值的指标。";
    $("performanceGroupTitle").textContent = role.id === "departmentHead"
      ? "各业务组绩效达成情况"
      : groupName + "绩效达成情况";
    $("performanceGroupDescription").textContent = role.id === "departmentHead"
      ? "按指标达标率比较各业务组，不混合不同单位的实际值。"
      : "展示所属业务组的指标达标、挑战和异常情况。";
  }

  function summaryCard(label, value, unit, foot, tone, icon) {
    return [
      '<article class="performance-summary-card ',
      tone || "",
      '">',
      '<div class="performance-summary-top">',
      '<span class="performance-summary-label">',
      escapeHTML(label),
      "</span>",
      '<span class="performance-summary-icon">',
      icon,
      "</span>",
      "</div>",
      '<div class="performance-summary-value"><strong>',
      escapeHTML(value),
      "</strong><span>",
      escapeHTML(unit),
      "</span></div>",
      '<div class="performance-summary-foot">',
      escapeHTML(foot),
      "</div>",
      "</article>"
    ].join("");
  }

  function renderSummary() {
    const items = getContextItems();
    const states = items.map((item) => getState(item));
    const challengeCount = states.filter((state) => state === "challenge").length;
    const targetOnlyCount = states.filter((state) => state === "target").length;
    const achievedCount = challengeCount + targetOnlyCount;
    const abnormalCount = states.filter((state) => state === "abnormal").length;
    const rate = items.length ? Math.round((achievedCount / items.length) * 100) : 0;

    $("performanceSummary").innerHTML = [
      summaryCard("绩效指标总数", items.length, "项", getPeriodLabel() + "当前口径", "", ICONS.metric),
      summaryCard("达成目标", achievedCount, "项", "含已达到挑战值的指标", "target", ICONS.target),
      summaryCard("达成挑战", challengeCount, "项", "达到更高挑战要求", "challenge", ICONS.challenge),
      summaryCard("异常指标", abnormalCount, "项", "未达到目标值", "abnormal", ICONS.alert),
      summaryCard("指标达标率", rate, "%", "达标指标数 ÷ 指标总数", "target", ICONS.rate)
    ].join("");
  }

  function renderGroupComparison() {
    const role = getActiveRole();
    const visibleGroups = role.id === "departmentHead"
      ? GROUPS
      : GROUPS.filter((group) => group.id === role.groupId);
    const rows = visibleGroups.map((group) => {
      let items = performanceItems.filter((item) => item.scope === "group" && item.groupId === group.id);
      if (activeCategory !== "all") {
        items = items.filter((item) => getMetric(item.metricId).category === activeCategory);
      }
      const states = items.map((item) => getState(item));
      const challengeCount = states.filter((state) => state === "challenge").length;
      const abnormalCount = states.filter((state) => state === "abnormal").length;
      const achievedCount = states.length - abnormalCount;
      const rate = items.length ? Math.round((achievedCount / items.length) * 100) : 0;
      const active = activeLevel === "group" && activeGroupId === group.id;
      return [
        '<div class="performance-group-row',
        abnormalCount ? " has-risk" : "",
        active ? " active" : "",
        '">',
        '<button type="button" class="performance-group-entry" data-group-entry="',
        escapeAttr(group.id),
        '"',
        role.id === "departmentHead" ? "" : " disabled",
        ">",
        escapeHTML(group.name),
        "<span>组长：",
        escapeHTML(group.leader),
        "</span></button>",
        '<div class="performance-group-progress">',
        '<div class="performance-group-progress-head"><span>指标达标率</span><strong>',
        rate,
        "%</strong></div>",
        '<div class="performance-group-track"><span style="width:',
        Math.min(rate, 100),
        '%"></span></div>',
        "</div>",
        '<div class="performance-group-stats">',
        '<div class="performance-group-stat"><strong>',
        achievedCount,
        "</strong><span>达标</span></div>",
        '<div class="performance-group-stat challenge"><strong>',
        challengeCount,
        "</strong><span>挑战</span></div>",
        '<div class="performance-group-stat risk"><strong>',
        abnormalCount,
        "</strong><span>异常</span></div>",
        "</div>",
        "</div>"
      ].join("");
    }).join("");

    $("performanceGroupComparison").innerHTML = rows;
    $("performanceGroupMeta").textContent = visibleGroups.length + "个业务组";
  }

  function renderExceptions() {
    const items = getContextItems()
      .filter((item) => getState(item) === "abnormal")
      .sort((a, b) => getAchievement(a) - getAchievement(b));

    $("performanceExceptionCount").textContent = items.length + "项";
    if (!items.length) {
      $("performanceExceptionList").innerHTML = [
        '<div class="performance-empty">',
        '<span class="performance-empty-icon">',
        ICONS.check,
        "</span>",
        "<strong>当前没有异常指标</strong>",
        "<span>所选范围内的指标均已达到目标值。</span>",
        "</div>"
      ].join("");
      return;
    }

    $("performanceExceptionList").innerHTML = items.map((item) => {
      const metricItem = getMetric(item.metricId);
      const gap = getGapInfo(item);
      return [
        '<button type="button" class="performance-exception-item" data-detail-id="',
        escapeAttr(item.id),
        '">',
        '<span class="performance-exception-icon">',
        ICONS.alert,
        "</span>",
        '<span class="performance-exception-copy"><strong>',
        escapeHTML(metricItem.name),
        "</strong><span>",
        escapeHTML(getScopeLabel(item)),
        " · 实际 ",
        escapeHTML(formatValue(getActual(item), metricItem.unit)),
        "</span></span>",
        '<span class="performance-exception-gap">',
        escapeHTML(gap.short),
        "</span>",
        "</button>"
      ].join("");
    }).join("");
  }

  function renderTable() {
    const items = getFilteredItems();
    $("performanceResultCount").textContent = items.length + "项指标";

    if (!items.length) {
      $("performanceTableBody").innerHTML = [
        '<tr><td colspan="9"><div class="performance-empty">',
        '<span class="performance-empty-icon">',
        ICONS.metric,
        "</span><strong>没有符合条件的指标</strong>",
        "<span>请调整指标分类或达成状态筛选条件。</span>",
        "</div></td></tr>"
      ].join("");
      return;
    }

    $("performanceTableBody").innerHTML = items.map((item) => {
      const metricItem = getMetric(item.metricId);
      const actual = getActual(item);
      const state = getState(item, actual);
      const status = getStatusMeta(state);
      const achievement = getAchievement(item, actual);
      const gap = getGapInfo(item, actual);
      const target = getTarget(item);
      const challenge = getChallenge(item);
      return [
        "<tr>",
        "<td>",
        '<button type="button" class="performance-metric-link" data-detail-id="',
        escapeAttr(item.id),
        '">',
        escapeHTML(metricItem.name),
        "</button>",
        '<div class="performance-metric-meta"><span class="performance-category-tag">',
        escapeHTML(metricItem.category),
        '</span><span class="performance-scope-text">',
        escapeHTML(getScopeLabel(item)),
        "</span></div>",
        "</td>",
        "<td>",
        escapeHTML(activePeriodType),
        "</td>",
        '<td><span class="performance-value">',
        escapeHTML(formatNumber(actual)),
        "<small>",
        escapeHTML(metricItem.unit),
        "</small></span></td>",
        '<td><span class="performance-value">',
        escapeHTML(formatNumber(target)),
        "<small>",
        escapeHTML(metricItem.unit),
        "</small></span></td>",
        '<td><span class="performance-value">',
        escapeHTML(formatNumber(challenge)),
        "<small>",
        escapeHTML(metricItem.unit),
        "</small></span></td>",
        '<td><div class="performance-achievement ',
        state,
        '"><strong>',
        achievement,
        '%</strong><div class="performance-achievement-track"><span style="width:',
        Math.min(achievement, 100),
        '%"></span></div></div></td>',
        '<td><span class="performance-gap',
        gap.bad ? " bad" : "",
        '">',
        escapeHTML(gap.short),
        "</span></td>",
        '<td><span class="performance-status ',
        state,
        '">',
        escapeHTML(status.label),
        "</span></td>",
        '<td><div class="performance-table-action"><button type="button" class="performance-text-btn" data-detail-id="',
        escapeAttr(item.id),
        '">',
        ICONS.view,
        "查看详情</button></div></td>",
        "</tr>"
      ].join("");
    }).join("");
  }

  function renderAll() {
    renderRoleTabs();
    renderPeriodControls();
    renderGroupOptions();
    renderHeader();
    renderSummary();
    renderGroupComparison();
    renderExceptions();
    renderTable();
  }

  function getTrend(item) {
    const metricItem = getMetric(item.metricId);
    const isMonthly = activePeriodType === "月度";
    const count = isMonthly ? 6 : 4;
    const factors = metricItem.direction === "low"
      ? (isMonthly ? [1.28, 1.2, 1.14, 1.09, 1.04, 1] : [1.22, 1.13, 1.06, 1])
      : (isMonthly ? [0.82, 0.86, 0.9, 0.94, 0.97, 1] : [0.87, 0.92, 0.96, 1]);
    const periodValue = selectedPeriods[activePeriodType];
    const labels = Array.from({ length: count }, (_, index) => {
      const offset = index - (count - 1);
      if (isMonthly) {
        const endYear = Number(periodValue.slice(0, 4));
        const endMonth = Number(periodValue.slice(5, 7));
        const absoluteMonth = endYear * 12 + endMonth - 1 + offset;
        const year = Math.floor(absoluteMonth / 12);
        const month = (absoluteMonth % 12) + 1;
        return year + "年" + month + "月";
      }
      const parts = periodValue.split("-Q");
      const absoluteQuarter = Number(parts[0]) * 4 + Number(parts[1]) - 1 + offset;
      const year = Math.floor(absoluteQuarter / 4);
      const quarter = (absoluteQuarter % 4) + 1;
      return year + " Q" + quarter;
    });
    const currentActual = getActual(item);
    return labels.map((label, index) => ({
      label,
      value: roundValue(currentActual * factors[index], metricItem.unit)
    }));
  }

  function renderTrendChart(item) {
    const metricItem = getMetric(item.metricId);
    const trend = getTrend(item);
    const maximum = Math.max(
      getTarget(item),
      getChallenge(item),
      ...trend.map((point) => point.value)
    ) || 1;
    return [
      '<div class="performance-trend-chart">',
      trend.map((point) => {
        const state = getState(item, point.value);
        const height = Math.max(8, Math.round((point.value / maximum) * 118));
        return [
          '<div class="performance-trend-column">',
          '<div class="performance-trend-bar',
          state === "abnormal" ? " abnormal" : "",
          '" style="height:',
          height,
          'px">',
          '<span class="performance-trend-value">',
          escapeHTML(formatValue(point.value, metricItem.unit)),
          "</span></div>",
          '<span class="performance-trend-label">',
          escapeHTML(point.label),
          "</span>",
          "</div>"
        ].join("");
      }).join(""),
      "</div>"
    ].join("");
  }

  function renderGroupDetailTable(item) {
    const rows = GROUPS.map((group) => {
      const groupItem = performanceItems.find((candidate) => (
        candidate.scope === "group" &&
        candidate.groupId === group.id &&
        candidate.metricId === item.metricId
      ));
      if (!groupItem) {
        return [
          "<tr><td>",
          escapeHTML(group.name),
          "</td><td>-</td><td>-</td><td><span class=\"performance-status abnormal\">未配置</span></td></tr>"
        ].join("");
      }
      const metricItem = getMetric(groupItem.metricId);
      const actual = getActual(groupItem);
      const state = getState(groupItem, actual);
      return [
        "<tr><td>",
        escapeHTML(group.name),
        "</td><td>",
        escapeHTML(formatValue(actual, metricItem.unit)),
        "</td><td>",
        getAchievement(groupItem, actual),
        '%</td><td><span class="performance-status ',
        state,
        '">',
        escapeHTML(getStatusMeta(state).label),
        "</span></td></tr>"
      ].join("");
    }).join("");

    return [
      '<table class="performance-detail-table">',
      "<thead><tr><th>业务组</th><th>实际完成值</th><th>达成率</th><th>达成状态</th></tr></thead>",
      "<tbody>",
      rows,
      "</tbody></table>"
    ].join("");
  }

  function openDetail(itemId) {
    const item = getItem(itemId);
    if (!item) return;
    activeDetailId = item.id;
    const metricItem = getMetric(item.metricId);
    const actual = getActual(item);
    const state = getState(item, actual);
    const status = getStatusMeta(state);
    const gap = getGapInfo(item, actual);
    const achievement = getAchievement(item, actual);

    $("performanceDetailTitle").textContent = metricItem.name;
    $("performanceDetailSubtitle").textContent = getScopeLabel(item) + " · " + getPeriodLabel();
    $("performanceDetailBody").innerHTML = [
      '<div class="performance-detail-summary">',
      detailStat("实际完成值", formatValue(actual, metricItem.unit)),
      detailStat("目标值", formatValue(getTarget(item), metricItem.unit)),
      detailStat("挑战值", formatValue(getChallenge(item), metricItem.unit)),
      detailStat("达成率", achievement + "%"),
      "</div>",
      '<div class="performance-detail-status ',
      state,
      '"><span class="performance-detail-status-icon">',
      state === "abnormal" ? ICONS.alert : ICONS.check,
      '</span><div class="performance-detail-status-copy"><strong>',
      escapeHTML(status.label + " · " + gap.short),
      "</strong><span>",
      escapeHTML(status.description),
      "</span></div></div>",
      '<section class="performance-detail-section"><h3>指标口径</h3>',
      '<div class="performance-definition">',
      escapeHTML(metricItem.definition),
      "<br />判定方向：",
      metricItem.direction === "high" ? "越高越好" : "越低越好",
      "；检视周期：",
      escapeHTML(activePeriodType),
      "。</div></section>",
      '<section class="performance-detail-section"><h3>',
      activePeriodType === "月度" ? "最近6个月实际值" : "最近4个季度实际值",
      "</h3>",
      renderTrendChart(item),
      "</section>",
      '<section class="performance-detail-section"><h3>各业务组同指标对比</h3>',
      renderGroupDetailTable(item),
      "</section>"
    ].join("");

    $("editPerformanceTarget").classList.toggle("hidden", !getActiveRole().canConfigure);
    $("performanceDetailMask").classList.remove("hidden");
    $("performanceDetailDrawer").classList.remove("hidden");
    document.body.classList.add("has-performance-overlay");
  }

  function detailStat(label, value) {
    return [
      '<div class="performance-detail-stat"><span>',
      escapeHTML(label),
      "</span><strong>",
      escapeHTML(value),
      "</strong></div>"
    ].join("");
  }

  function closeDetail() {
    $("performanceDetailMask").classList.add("hidden");
    $("performanceDetailDrawer").classList.add("hidden");
    if ($("performanceConfigDrawer").classList.contains("hidden")) {
      document.body.classList.remove("has-performance-overlay");
    }
  }

  function populateConfigMetricOptions() {
    $("configMetric").innerHTML = METRIC_LIBRARY.map((metricItem) => (
      '<option value="' + escapeAttr(metricItem.id) + '">' +
      escapeHTML(metricItem.name) + " · " + escapeHTML(metricItem.category) +
      "</option>"
    )).join("");
  }

  function findUnconfiguredMetric(scope, groupId) {
    const existing = performanceItems
      .filter((item) => item.scope === scope && (scope === "department" || item.groupId === groupId))
      .map((item) => item.metricId);
    return METRIC_LIBRARY.find((metricItem) => existing.indexOf(metricItem.id) < 0) || METRIC_LIBRARY[0];
  }

  function syncConfigGroupState() {
    const isGroup = $("configScope").value === "group";
    const role = getActiveRole();
    $("configGroup").disabled = !isGroup || Boolean(editingItemId) || role.id !== "departmentHead";
    $("configGroupField").classList.toggle("is-disabled", !isGroup);
  }

  function syncMetricFields() {
    const metricItem = getMetric($("configMetric").value);
    $("configCategory").value = metricItem.category;
    $("configCycle").value = activePeriodType;
    $("configUnit").value = metricItem.unit;
    $("configDirection").value = metricItem.direction;
    $("configDefinition").value = metricItem.definition;
    $("performanceRuleTip").textContent = metricItem.direction === "high"
      ? "当前指标为“越高越好”：挑战值应大于或等于目标值，实际值低于目标值时判定为异常。"
      : "当前指标为“越低越好”：挑战值应小于或等于目标值，实际值高于目标值时判定为异常。";
  }

  function openConfig(mode, itemId) {
    const role = getActiveRole();
    if (!role.canConfigure) return;
    const item = mode === "edit" ? getItem(itemId) : null;
    editingItemId = item ? item.id : null;
    $("performanceConfigTitle").textContent = item ? "调整绩效目标" : "设置绩效指标";
    $("configYear").disabled = true;
    $("configScope").disabled = Boolean(item) || role.id !== "departmentHead";
    $("configMetric").disabled = Boolean(item);

    if (item) {
      $("configYear").value = getActiveYear();
      $("configScope").value = item.scope;
      $("configGroup").value = item.groupId || activeGroupId;
      $("configMetric").value = item.metricId;
      $("configTarget").value = getTarget(item);
      $("configChallenge").value = getChallenge(item);
    } else {
      $("configYear").value = getActiveYear();
      $("configScope").value = role.id === "departmentHead" ? activeLevel : "group";
      $("configGroup").value = activeGroupId;
      const availableMetric = findUnconfiguredMetric($("configScope").value, activeGroupId);
      $("configMetric").value = availableMetric.id;
      $("configTarget").value = "";
      $("configChallenge").value = "";
    }

    syncConfigGroupState();
    syncMetricFields();
    $("performanceConfigMask").classList.remove("hidden");
    $("performanceConfigDrawer").classList.remove("hidden");
    document.body.classList.add("has-performance-overlay");
  }

  function closeConfig() {
    $("performanceConfigMask").classList.add("hidden");
    $("performanceConfigDrawer").classList.add("hidden");
    editingItemId = null;
    $("configYear").disabled = true;
    $("configScope").disabled = false;
    $("configMetric").disabled = false;
    if ($("performanceDetailDrawer").classList.contains("hidden")) {
      document.body.classList.remove("has-performance-overlay");
    }
  }

  function handleConfigSubmit(event) {
    event.preventDefault();
    const scope = $("configScope").value;
    const groupId = scope === "group" ? $("configGroup").value : null;
    const metricId = $("configMetric").value;
    const target = Number($("configTarget").value);
    const challenge = Number($("configChallenge").value);
    const metricItem = getMetric(metricId);
    const valueScale = getPeriodValueScale(metricItem);
    const storedTarget = target / valueScale;
    const storedChallenge = challenge / valueScale;

    if (!Number.isFinite(target) || !Number.isFinite(challenge)) {
      notify("请输入有效的目标值和挑战值", "error");
      return;
    }
    if (target < 0 || challenge < 0) {
      notify("目标值和挑战值不能小于 0", "error");
      return;
    }
    if (metricItem.direction === "high" && challenge < target) {
      notify("“越高越好”指标的挑战值不能低于目标值", "error");
      return;
    }
    if (metricItem.direction === "low" && challenge > target) {
      notify("“越低越好”指标的挑战值不能高于目标值", "error");
      return;
    }

    if (editingItemId) {
      const current = getItem(editingItemId);
      if (!current) return;
      current.target = storedTarget;
      current.challenge = storedChallenge;
      closeConfig();
      renderAll();
      openDetail(current.id);
      notify("绩效目标已更新");
      return;
    }

    const duplicate = performanceItems.some((item) => (
      item.scope === scope &&
      item.metricId === metricId &&
      (scope === "department" || item.groupId === groupId)
    ));
    if (duplicate) {
      notify("当前范围已配置该绩效指标，请从指标详情中调整目标", "error");
      return;
    }

    const actualScale = scope === "department"
      ? 0.96
      : 0.9 + (GROUPS.findIndex((group) => group.id === groupId) * 0.035);
    const actual = roundValue(metricItem.sampleActual * actualScale, metricItem.unit);
    const item = performance(
      "custom-" + customItemCounter,
      scope,
      groupId,
      metricId,
      actual,
      storedTarget,
      storedChallenge
    );
    customItemCounter += 1;
    performanceItems.push(item);
    activeLevel = scope;
    if (groupId) activeGroupId = groupId;
    activeCategory = "all";
    activeStatus = "all";
    $("performanceCategorySelect").value = "all";
    $("performanceStatusSelect").value = "all";
    closeConfig();
    renderAll();
    notify("绩效指标已配置");
  }

  function switchRole(roleId) {
    const role = ROLE_VIEWS.find((item) => item.id === roleId);
    if (!role) return;
    activeRoleId = role.id;
    activeLevel = role.defaultLevel;
    activeGroupId = role.groupId || "group-2";
    activeCategory = "all";
    activeStatus = "all";
    $("performanceCategorySelect").value = "all";
    $("performanceStatusSelect").value = "all";
    closeDetail();
    closeConfig();
    renderAll();
    notify("已切换为：" + role.label + "视图");
  }

  function bindEvents() {
    $("performanceRoleTabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-role-id]");
      if (!button || button.dataset.roleId === activeRoleId) return;
      switchRole(button.dataset.roleId);
    });

    $("performancePeriodTypeTabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-period-type]");
      if (!button || button.dataset.periodType === activePeriodType) return;
      activePeriodType = button.dataset.periodType;
      closeDetail();
      renderAll();
      notify("已切换为：" + activePeriodType + "绩效数据");
    });

    $("performancePeriodSelect").addEventListener("change", (event) => {
      selectedPeriods[activePeriodType] = event.target.value;
      closeDetail();
      renderAll();
      notify("统计周期已切换为：" + getPeriodLabel());
    });

    $("performanceGroupSelect").addEventListener("change", (event) => {
      if (getActiveRole().id !== "departmentHead") return;
      if (event.target.value === "all") {
        activeLevel = "department";
      } else {
        activeLevel = "group";
        activeGroupId = event.target.value;
      }
      renderAll();
      const group = getGroup(activeGroupId);
      notify(activeLevel === "department" ? "已切换为部门绩效视图" : "已切换为：" + group.name);
    });

    $("performanceCategorySelect").addEventListener("change", (event) => {
      activeCategory = event.target.value;
      renderAll();
    });

    $("performanceStatusSelect").addEventListener("change", (event) => {
      activeStatus = event.target.value;
      renderTable();
    });

    $("performanceGroupComparison").addEventListener("click", (event) => {
      const button = event.target.closest("[data-group-entry]");
      if (!button || getActiveRole().id !== "departmentHead") return;
      activeGroupId = button.dataset.groupEntry;
      activeLevel = "group";
      activeStatus = "all";
      $("performanceStatusSelect").value = "all";
      renderAll();
      notify("已切换为：" + getGroup(activeGroupId).name);
    });

    document.addEventListener("click", (event) => {
      const detailButton = event.target.closest("[data-detail-id]");
      if (detailButton) openDetail(detailButton.dataset.detailId);
    });

    $("openPerformanceConfig").addEventListener("click", () => openConfig("create"));
    $("closePerformanceDetail").addEventListener("click", closeDetail);
    $("performanceDetailMask").addEventListener("click", closeDetail);
    document.querySelectorAll("[data-close-detail]").forEach((button) => {
      button.addEventListener("click", closeDetail);
    });

    $("editPerformanceTarget").addEventListener("click", () => {
      const itemId = activeDetailId;
      closeDetail();
      openConfig("edit", itemId);
    });

    $("closePerformanceConfig").addEventListener("click", closeConfig);
    $("performanceConfigMask").addEventListener("click", closeConfig);
    document.querySelectorAll("[data-close-config]").forEach((button) => {
      button.addEventListener("click", closeConfig);
    });

    $("configScope").addEventListener("change", () => {
      syncConfigGroupState();
      const availableMetric = findUnconfiguredMetric($("configScope").value, $("configGroup").value);
      $("configMetric").value = availableMetric.id;
      syncMetricFields();
    });

    $("configGroup").addEventListener("change", () => {
      const availableMetric = findUnconfiguredMetric("group", $("configGroup").value);
      $("configMetric").value = availableMetric.id;
      syncMetricFields();
    });

    $("configMetric").addEventListener("change", syncMetricFields);
    $("performanceConfigForm").addEventListener("submit", handleConfigSubmit);

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (!$("performanceConfigDrawer").classList.contains("hidden")) closeConfig();
      else if (!$("performanceDetailDrawer").classList.contains("hidden")) closeDetail();
    });
  }

  function init() {
    populateConfigMetricOptions();
    renderAll();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
