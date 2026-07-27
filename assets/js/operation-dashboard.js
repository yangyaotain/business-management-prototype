(function setupOperationDashboard() {
  const ICONS = {
    department:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V7l8-4 8 4v14M8 10h2M14 10h2M8 14h2M14 14h2M10 21v-3h4v3"/></svg>',
    leader:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M14 15a5 5 0 0 1 7 4.5"/></svg>',
    member:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></svg>',
    all:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>',
    proxy:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 7h6M9 11h6M9 15h3M3 21h18"/></svg>',
    cost:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16M6 17l3-6 4 3 5-9"/><circle cx="18" cy="5" r="2"/></svg>',
    general:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
    arrow:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
    view:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/></svg>',
    scale:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    quality:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.6 2.9 8.2 7 10 4.1-1.8 7-5.4 7-10V6l-7-3z"/><path d="m9 12 2 2 4-5"/></svg>',
    timeliness:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    alert:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.8 19h18.4L12 3z"/><path d="M12 9v4M12 17h.01"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></svg>',
    metric:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></svg>',
    target:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/><path d="m18.5 5.5-3.7 3.7"/></svg>'
  };

  const ROLE_VIEWS = [
    {
      id: "departmentHead",
      label: "部门负责人",
      userName: "陈建",
      avatar: "陈",
      defaultLevel: "department"
    },
    {
      id: "groupLeader",
      label: "业务组长",
      userName: "张明",
      avatar: "张",
      groupId: "group-2",
      defaultLevel: "group"
    },
    {
      id: "member",
      label: "组员",
      userName: "李文",
      avatar: "李",
      groupId: "group-2",
      memberId: "member-2-1",
      defaultLevel: "person"
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

  const BUSINESS_TYPES = [
    { id: "all", label: "全部", icon: ICONS.all },
    { id: "proxy", label: "代理", icon: ICONS.proxy },
    { id: "cost", label: "造价", icon: ICONS.cost },
    { id: "general", label: "通用", icon: ICONS.general }
  ];

  const CATEGORIES = [
    { id: "all", label: "全部指标" },
    { id: "scale", label: "业务规模" },
    { id: "quality", label: "交付质量" },
    { id: "timeliness", label: "时效与风险" }
  ];

  const GROUPS = [
    {
      id: "group-1",
      name: "第一业务组",
      leader: "赵倩",
      share: 0.27,
      performanceDelta: 1.6,
      members: [
        member("member-1-1", "赵倩", "业务组长", 0.058, 2.4),
        member("member-1-2", "周航", "项目经理", 0.055, 1.1),
        member("member-1-3", "林悦", "项目经理", 0.052, 2.8),
        member("member-1-4", "王晨", "项目经理", 0.054, -0.6),
        member("member-1-5", "郑凯", "项目经理", 0.051, 1.7)
      ]
    },
    {
      id: "group-2",
      name: "第二业务组",
      leader: "张明",
      share: 0.29,
      performanceDelta: -1.1,
      members: [
        member("member-2-1", "李文", "项目经理", 0.061, -1.9),
        member("member-2-2", "张明", "业务组长", 0.059, 1.2),
        member("member-2-3", "刘颖", "项目经理", 0.057, -0.8),
        member("member-2-4", "吴昊", "项目经理", 0.056, 0.5),
        member("member-2-5", "周敏", "项目经理", 0.057, -1.1)
      ]
    },
    {
      id: "group-3",
      name: "非电力业务组",
      leader: "孙岚",
      share: 0.24,
      performanceDelta: 3.2,
      members: [
        member("member-3-1", "孙岚", "业务组长", 0.052, 3.8),
        member("member-3-2", "许哲", "项目经理", 0.049, 2.6),
        member("member-3-3", "高宇", "项目经理", 0.047, 3.4),
        member("member-3-4", "方琳", "项目经理", 0.046, 2.1),
        member("member-3-5", "唐俊", "项目经理", 0.046, 1.6)
      ]
    },
    {
      id: "group-4",
      name: "造价业务组",
      leader: "王军",
      share: 0.20,
      performanceDelta: 0.6,
      members: [
        member("member-4-1", "王军", "业务组长", 0.043, 1.8),
        member("member-4-2", "蒋宁", "项目经理", 0.041, 0.2),
        member("member-4-3", "韩雪", "项目经理", 0.039, -0.4),
        member("member-4-4", "冯涛", "项目经理", 0.039, 1.1),
        member("member-4-5", "彭佳", "项目经理", 0.038, 0.5)
      ]
    }
  ];

  const METRICS = [
    metric("tenderCount", "招标数量", "scale", ["proxy"], 326, 540, "count", "项", "high", true, "统计周期内已开展的招标项目数量。"),
    metric("dealCount", "成交数量", "scale", ["proxy"], 284, 450, "count", "项", "high", true, "统计周期内已完成成交的标段数量。"),
    metric("transactionAmount", "交易规模", "scale", ["proxy", "cost"], 42.8, 68, "currency", "亿元", "high", true, "统计周期内累计交易金额。"),
    metric("revenue", "营收", "scale", ["proxy", "cost"], 3860, 6200, "currency", "万元", "high", true, "统计周期内累计确认营业收入。"),
    metric("abnormalCount", "异常数量", "timeliness", ["general"], 14, 0, "count", "项", "low", true, "当前累计确认的异常业务事项数量。"),
    metric("successRate", "采购成功率", "quality", ["proxy"], 94.1, 92, "rate", "%", "high", false, "成交项目中采购成功项目的占比。"),
    metric("suggestionCount", "招标文件建议数量", "quality", ["proxy"], 168, 240, "count", "条", "high", true, "项目经理提出并完成记录的有效建议数量。"),
    metric("adoptionRate", "建议采纳率", "quality", ["proxy"], 86.5, 85, "rate", "%", "high", false, "采纳建议数量÷提出有效建议数量。"),
    metric("riskDetectionRate", "风险识别率", "quality", ["proxy"], 72.4, 70, "rate", "%", "high", false, "项目经理主动识别问题占全部发现问题的比例。"),
    metric("firstPassRate", "一次通过率", "quality", ["general"], 93.8, 92, "rate", "%", "high", false, "流程一次审批通过次数÷总提交流程次数。"),
    metric("reviewCount", "开评标审查项目数量", "quality", ["proxy"], 198, 310, "count", "项", "high", true, "统计周期内已完成开评标审查的项目数量。"),
    metric("reviewCoverage", "审查覆盖率", "quality", ["proxy"], 96.2, 95, "rate", "%", "high", false, "实际完成审查标段÷应审查标段。"),
    metric("complaintRate", "有效异议/投诉成立率", "quality", ["proxy"], 8.6, 8, "rate", "%", "low", false, "有效异议或投诉成立项目占相关项目的比例。"),
    metric("qualityCount", "质量问题数", "quality", ["general"], 9, 10, "count", "个", "low", true, "统计周期内发现并确认的质量问题数量。"),
    metric("qualityRate", "质量问题率", "quality", ["general"], 3.2, 3, "rate", "%", "low", false, "质量问题标段数量÷成交标段数量。"),
    metric("satisfaction", "客户满意度", "quality", ["general"], 92.6, 90, "score", "分", "high", false, "一项目一评价及客户反馈的综合评分。"),
    metric("feeRecovery", "平台服务费回收率", "timeliness", ["proxy"], 86.3, 95, "rate", "%", "high", false, "实际收到服务费金额÷应收服务费金额。"),
    metric("guaranteeLate", "保证金应退未退", "timeliness", ["proxy"], 6, 0, "count", "笔", "low", true, "超过约定时限仍未退还的投标保证金笔数。"),
    metric("expertLate", "专家费未及时发放", "timeliness", ["proxy"], 3, 0, "count", "笔", "low", true, "应发但未在规定时限内完成发放的专家费笔数。"),
    metric("nodeTimeliness", "关键节点及时率", "timeliness", ["general"], 91.7, 95, "rate", "%", "high", false, "按计划时限完成关键业务节点的比例。"),
    metric("averageCycle", "项目完成平均周期", "timeliness", ["general"], 34.6, 32, "days", "天", "low", false, "项目从受理至完成的平均办理周期。")
  ];

  let activeRoleId = "departmentHead";
  let activeLevel = "department";
  let activeGroupId = null;
  let activeMemberId = null;
  let activePeriodType = "月度";
  const selectedPeriods = {
    月度: "2026-07",
    季度: "2026-Q2"
  };
  let activeBusinessType = "all";
  let activeCategory = "all";
  let selectedComparisonMetricId = "revenue";

  const $ = (id) => document.getElementById(id);

  function member(id, name, role, share, performanceDelta) {
    return { id, name, role, share, performanceDelta };
  }

  function metric(id, name, category, businessTypes, actual, target, valueType, unit, direction, cumulative, note) {
    return {
      id,
      name,
      category,
      businessTypes,
      actual,
      target,
      valueType,
      unit,
      direction,
      cumulative,
      note
    };
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"]/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    }[char]));
  }

  function getActiveRole() {
    return ROLE_VIEWS.find((role) => role.id === activeRoleId) || ROLE_VIEWS[0];
  }

  function getActiveGroup() {
    return GROUPS.find((group) => group.id === activeGroupId) || null;
  }

  function getMember(groupId, memberId) {
    const group = GROUPS.find((item) => item.id === groupId);
    return group ? group.members.find((item) => item.id === memberId) || null : null;
  }

  function getActiveMember() {
    return getMember(activeGroupId, activeMemberId);
  }

  function getMetric(id) {
    return METRICS.find((metricItem) => metricItem.id === id) || null;
  }

  function getEntityContext(level = activeLevel, groupId = activeGroupId, memberId = activeMemberId) {
    if (level === "department") {
      return {
        level: "department",
        label: "代理业务部",
        share: 1,
        performanceDelta: 0
      };
    }

    const group = GROUPS.find((item) => item.id === groupId);
    if (level === "group" && group) {
      return {
        level: "group",
        label: group.name,
        share: group.share,
        performanceDelta: group.performanceDelta,
        group
      };
    }

    const person = group && group.members.find((item) => item.id === memberId);
    if (person) {
      return {
        level: "person",
        label: person.name,
        share: person.share,
        performanceDelta: person.performanceDelta,
        group,
        person
      };
    }

    return getEntityContext("department", null, null);
  }

  function isMetricVisibleForBusiness(metricItem) {
    return activeBusinessType === "all" || metricItem.businessTypes.includes(activeBusinessType);
  }

  function getVisibleMetrics() {
    return METRICS.filter((metricItem) => isMetricVisibleForBusiness(metricItem));
  }

  function getFilteredMetrics() {
    return getVisibleMetrics().filter((metricItem) => (
      activeCategory === "all" || metricItem.category === activeCategory
    ));
  }

  function getBusinessFactor(metricItem) {
    if (activeBusinessType === "all" || metricItem.businessTypes.length === 1) return 1;
    if (activeBusinessType === "proxy") return 0.78;
    if (activeBusinessType === "cost") return 0.22;
    return 1;
  }

  function getCurrentPeriodOption() {
    const options = PERIOD_OPTIONS[activePeriodType];
    return options.find((item) => item.value === selectedPeriods[activePeriodType]) || options[0];
  }

  function getPeriodContext() {
    const value = selectedPeriods[activePeriodType];
    if (activePeriodType === "季度") {
      const parts = value.split("-Q");
      const quarter = Number(parts[1]);
      return {
        year: Number(parts[0]),
        order: quarter * 3,
        actualShare: (3 / 7) * (0.96 + quarter * 0.012),
        targetShare: 1 / 4
      };
    }

    const parts = value.split("-");
    const month = Number(parts[1]);
    return {
      year: Number(parts[0]),
      order: month,
      actualShare: (1 / 7) * (0.92 + month * 0.012),
      targetShare: 1 / 12
    };
  }

  function renderPeriodControls() {
    $("operationPeriodTypeTabs").querySelectorAll("[data-period-type]").forEach((button) => {
      const isActive = button.dataset.periodType === activePeriodType;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    $("operationPeriodSelect").innerHTML = PERIOD_OPTIONS[activePeriodType].map((item) => [
      '<option value="',
      item.value,
      '"',
      item.value === selectedPeriods[activePeriodType] ? " selected" : "",
      ">",
      escapeHTML(item.label),
      "</option>"
    ].join("")).join("");
  }

  function getMetricResult(metricItem, context = getEntityContext()) {
    const businessFactor = getBusinessFactor(metricItem);
    const entityFactor = context.share;
    const period = getPeriodContext();
    const yearDistance = Math.max(0, 2026 - period.year);
    const yearActualFactor = Math.max(0.78, 1 - yearDistance * 0.024);
    const yearTargetFactor = Math.max(0.82, 1 - yearDistance * 0.019);
    let actual = metricItem.actual;
    let target = metricItem.target;

    if (metricItem.cumulative) {
      actual *= entityFactor * businessFactor * yearActualFactor * period.actualShare;
      target *= entityFactor * businessFactor * yearTargetFactor * period.targetShare;
      if (metricItem.direction === "high") {
        actual *= 1 + context.performanceDelta / 100;
      } else {
        actual *= Math.max(0.55, 1 - context.performanceDelta / 12);
      }
    } else {
      const sensitivity = metricItem.valueType === "score" ? 0.18 : metricItem.valueType === "days" ? 0.22 : 0.24;
      actual += metricItem.direction === "high"
        ? context.performanceDelta * sensitivity
        : -context.performanceDelta * sensitivity;
      actual += metricItem.direction === "high"
        ? -yearDistance * 0.18
        : yearDistance * 0.12;
      actual += metricItem.direction === "high"
        ? (period.order - 7) * 0.08
        : (7 - period.order) * 0.08;
      target += metricItem.direction === "high"
        ? -yearDistance * 0.12
        : yearDistance * 0.08;
    }

    actual = normalizeMetricNumber(metricItem, actual);
    target = normalizeMetricNumber(metricItem, target);

    const benchmark = target;
    const normal = metricItem.direction === "high"
      ? actual >= benchmark
      : actual <= benchmark;
    const score = calculateScore(metricItem, actual, benchmark, normal);
    const targetProgress = calculateTargetProgress(metricItem, actual, target);

    return {
      actual,
      target,
      benchmark,
      normal,
      score,
      targetProgress,
      actualDisplay: formatMetricValue(metricItem, actual),
      targetDisplay: formatMetricValue(metricItem, target),
      benchmarkDisplay: formatMetricValue(metricItem, benchmark),
      progressLabel: getProgressLabel(metricItem, actual, target, normal),
      gapLabel: getGapLabel(metricItem, actual, benchmark, normal)
    };
  }

  function normalizeMetricNumber(metricItem, value) {
    if (metricItem.valueType === "count") return Math.max(0, Math.round(value));
    if (metricItem.valueType === "currency") {
      return metricItem.unit === "亿元"
        ? Math.max(0, Math.round(value * 10) / 10)
        : Math.max(0, Math.round(value));
    }
    return Math.max(0, Math.round(value * 10) / 10);
  }

  function formatMetricValue(metricItem, value) {
    const fractionDigits = metricItem.valueType === "count" || (metricItem.valueType === "currency" && metricItem.unit === "万元")
      ? 0
      : 1;
    return Number(value).toLocaleString("zh-CN", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits
    }) + metricItem.unit;
  }

  function calculateScore(metricItem, actual, benchmark, normal) {
    if (metricItem.direction === "high") {
      if (benchmark <= 0) return normal ? 100 : 0;
      return Math.max(0, Math.min(100, (actual / benchmark) * 100));
    }
    if (benchmark <= 0) return actual <= 0 ? 100 : Math.max(8, 100 - actual * 14);
    return actual <= benchmark ? 100 : Math.max(8, Math.min(100, (benchmark / actual) * 100));
  }

  function calculateTargetProgress(metricItem, actual, target) {
    if (metricItem.direction === "high") {
      if (target <= 0) return actual > 0 ? 100 : 0;
      return Math.max(0, (actual / target) * 100);
    }
    if (target <= 0) return actual <= 0 ? 100 : Math.max(8, 100 - actual * 12);
    return actual <= target ? 100 : Math.max(8, (target / actual) * 100);
  }

  function getProgressLabel(metricItem, actual, target, normal) {
    if (metricItem.direction === "high" && metricItem.cumulative) {
      const rate = target > 0 ? Math.round((actual / target) * 100) : 0;
      return "本期目标完成 " + rate + "%";
    }
    if (metricItem.direction === "high") {
      return normal ? "已达到目标" : "低于目标";
    }
    return normal ? "控制在目标内" : "超过控制目标";
  }

  function getGapLabel(metricItem, actual, benchmark, normal) {
    if (normal) {
      if (metricItem.direction === "high") {
        return "高于周期目标 " + formatGapValue(metricItem, actual - benchmark);
      }
      return "优于控制线 " + formatGapValue(metricItem, benchmark - actual);
    }
    if (metricItem.direction === "high") {
      return "低于周期目标 " + formatGapValue(metricItem, benchmark - actual);
    }
    return "超出控制线 " + formatGapValue(metricItem, actual - benchmark);
  }

  function formatGapValue(metricItem, value) {
    const absolute = Math.abs(value);
    if (metricItem.valueType === "rate") return absolute.toFixed(1) + "个百分点";
    return formatMetricValue(metricItem, absolute);
  }

  function getOverallEvaluation(context) {
    const metricResults = getVisibleMetrics().map((metricItem) => ({
      metric: metricItem,
      result: getMetricResult(metricItem, context)
    }));
    const totalScore = metricResults.reduce((sum, item) => sum + item.result.score, 0);
    return {
      score: metricResults.length ? Math.round(totalScore / metricResults.length) : 0,
      unmet: metricResults.filter((item) => !item.result.normal).length,
      total: metricResults.length
    };
  }

  function getBusinessTypeLabel() {
    const type = BUSINESS_TYPES.find((item) => item.id === activeBusinessType);
    return type ? type.label : "全部";
  }

  function getCategoryLabel(categoryId) {
    const category = CATEGORIES.find((item) => item.id === categoryId);
    return category ? category.label : "全部指标";
  }

  function resetViewForRole() {
    const role = getActiveRole();
    activeLevel = role.defaultLevel;
    activeGroupId = role.groupId || null;
    activeMemberId = role.memberId || null;
    activeCategory = "all";
    selectedComparisonMetricId = "revenue";
  }

  function canOpenGroup(groupId) {
    if (activeRoleId === "departmentHead") return true;
    return activeRoleId === "groupLeader" && getActiveRole().groupId === groupId;
  }

  function canOpenMember(groupId, memberId) {
    if (activeRoleId === "departmentHead") return true;
    if (activeRoleId === "groupLeader") return getActiveRole().groupId === groupId;
    const role = getActiveRole();
    return role.groupId === groupId && role.memberId === memberId;
  }

  function renderRoleTabs() {
    $("operationRoleTabs").innerHTML = ROLE_VIEWS.map((role) => [
      '<button type="button" class="dashboard-role-tab',
      role.id === activeRoleId ? " active" : "",
      '" data-role-id="',
      role.id,
      '" aria-pressed="',
      String(role.id === activeRoleId),
      '">',
      role.id === "departmentHead" ? ICONS.department : role.id === "groupLeader" ? ICONS.leader : ICONS.member,
      escapeHTML(role.label),
      "</button>"
    ].join("")).join("");
  }

  function renderBusinessTypeOptions() {
    $("operationBusinessTypeSelect").innerHTML = BUSINESS_TYPES.map((type) => [
      '<option value="',
      type.id,
      '"',
      type.id === activeBusinessType ? " selected" : "",
      ">",
      escapeHTML(type.id === "all" ? "全部业务" : type.label + "业务"),
      "</option>"
    ].join("")).join("");
  }

  function renderViewContext() {
    const role = getActiveRole();
    const group = getActiveGroup();
    const person = getActiveMember();
    const businessTypeLabel = getBusinessTypeLabel();
    const periodLabel = getCurrentPeriodOption().label;
    let title = "代理业务部运营看板";
    let description = "查看部门" + periodLabel + "运营数据与周期目标，识别各业务组的目标差距和重点风险。";
    let scopeLabel = "部门";

    if (activeLevel === "group" && group) {
      title = group.name + "运营看板";
      description = "查看本组" + periodLabel + businessTypeLabel + "业务运营数据、组员表现及周期目标完成情况。";
      scopeLabel = "业务组";
    } else if (activeLevel === "person" && person && group) {
      title = person.name + "个人运营看板";
      description = "查看" + person.name + "在" + group.name + "的" + periodLabel + "个人运营数据与周期目标完成情况。";
      scopeLabel = "个人";
    }

    $("operationUserAvatar").textContent = role.avatar;
    $("operationUserName").textContent = role.userName;
    $("operationUserRole").textContent = role.label;
    $("topbarPageSubtitle").textContent = role.label + " · " + scopeLabel + "运营视图";
    $("operationPageTitle").textContent = title;
    $("operationPageDescription").textContent = description;
    $("operationScopeLabel").textContent = scopeLabel;
    $("dataCutoffText").textContent = periodLabel;
    renderScopePath();
  }

  function renderScopePath() {
    const group = getActiveGroup();
    const person = getActiveMember();
    const parts = [];

    if (activeRoleId === "departmentHead") {
      if (activeLevel === "department") {
        parts.push(scopeCurrent("代理业务部"));
      } else {
        parts.push(scopeLink("department", "代理业务部"));
      }
    }

    if (activeLevel === "group" && group) {
      parts.push(scopeCurrent(group.name));
    } else if (activeLevel === "person" && group) {
      if (activeRoleId === "member") {
        parts.push(scopeCurrent(person ? person.name : "本人"));
      } else {
        parts.push(scopeLink("group", group.name));
        parts.push(scopeCurrent(person ? person.name : "个人"));
      }
    } else if (activeRoleId === "groupLeader" && group) {
      parts.push(scopeCurrent(group.name));
    }

    $("operationScopePath").innerHTML = parts.map((part, index) => (
      index ? '<span class="operation-scope-separator">/</span>' + part : part
    )).join("");
  }

  function scopeLink(action, label) {
    return [
      '<button type="button" class="operation-scope-link" data-scope-action="',
      action,
      '">',
      ICONS.back,
      escapeHTML(label),
      "</button>"
    ].join("");
  }

  function scopeCurrent(label) {
    return '<span class="operation-scope-current">' + escapeHTML(label) + "</span>";
  }

  function renderSummary() {
    const preferredIds = ["tenderCount", "dealCount", "transactionAmount", "revenue", "abnormalCount"];
    const visibleMetrics = getVisibleMetrics();
    const selected = [];

    preferredIds.forEach((id) => {
      const metricItem = visibleMetrics.find((item) => item.id === id);
      if (metricItem) selected.push(metricItem);
    });
    visibleMetrics.forEach((metricItem) => {
      if (selected.length < 5 && !selected.includes(metricItem)) selected.push(metricItem);
    });

    const context = getEntityContext();
    $("operationSummaryGrid").innerHTML = selected.map((metricItem) => {
      const result = getMetricResult(metricItem, context);
      return [
        '<article class="card operation-summary-card ',
        result.normal ? "normal" : "risk",
        '">',
        '<div class="operation-summary-top"><span class="operation-summary-name">',
        escapeHTML(metricItem.name),
        '</span><span class="operation-summary-icon">',
        iconForCategory(metricItem.category),
        "</span></div>",
        '<div class="operation-summary-value"><strong>',
        escapeHTML(result.actualDisplay),
        '</strong><span>本期实际</span></div>',
        '<div class="operation-summary-target"><div class="operation-summary-target-main"><span class="operation-target-icon">',
        ICONS.target,
        '</span><div class="operation-summary-target-copy"><span>本期目标</span><strong>',
        escapeHTML(result.targetDisplay),
        '</strong></div></div><span class="operation-summary-target-progress">',
        escapeHTML(result.progressLabel),
        "</span></div>",
        '<div class="operation-progress-track"><span style="width:',
        Math.min(100, Math.max(4, result.targetProgress)),
        '%"></span></div>',
        "</article>"
      ].join("");
    }).join("");
  }

  function iconForCategory(category) {
    if (category === "quality") return ICONS.quality;
    if (category === "timeliness") return ICONS.timeliness;
    return ICONS.scale;
  }

  function renderScopePanel() {
    if (activeLevel === "department") {
      renderGroupPanel();
    } else if (activeLevel === "group") {
      renderMemberPanel();
    } else {
      renderPersonPanel();
    }
  }

  function renderGroupPanel() {
    $("operationScopePanelTitle").textContent = "业务组运行情况";
    $("operationScopePanelDescription").textContent = "点击业务组名称进入本组看板，查看组员和目标完成情况。";
    $("operationScopePanelMeta").textContent = GROUPS.length + "个业务组";
    $("operationScopePanelBody").innerHTML = [
      '<div class="operation-group-grid">',
      GROUPS.map((group) => {
        const context = getEntityContext("group", group.id, null);
        const evaluation = getOverallEvaluation(context);
        return [
          '<button type="button" class="operation-group-card" data-group-id="',
          group.id,
          '">',
          '<div class="operation-group-card-head"><div class="operation-group-name"><strong>',
          escapeHTML(group.name),
          '</strong><span>组长：',
          escapeHTML(group.leader),
          " · ",
          group.members.length,
          '名组员</span></div><span class="operation-group-arrow">',
          ICONS.arrow,
          "</span></div>",
          '<div class="operation-group-score"><strong>',
          evaluation.score,
          '%</strong><span>综合目标达成度</span></div>',
          '<div class="operation-progress-track"><span style="width:',
          evaluation.score,
          '%"></span></div>',
          '<div class="operation-group-card-foot"><span>',
          evaluation.total,
          '项运营指标</span><span class="',
          evaluation.unmet ? "risk-text" : "",
          '">',
          evaluation.unmet,
          "项未达标</span></div>",
          "</button>"
        ].join("");
      }).join(""),
      "</div>"
    ].join("");
  }

  function renderMemberPanel() {
    const group = getActiveGroup();
    if (!group) return;
    const headline = getHeadlineMetrics();
    $("operationScopePanelTitle").textContent = group.name + "组员情况";
    $("operationScopePanelDescription").textContent = "点击组员姓名或“查看个人”进入个人看板。";
    $("operationScopePanelMeta").textContent = group.members.length + "名组员";
    $("operationScopePanelBody").innerHTML = [
      '<div class="operation-member-table-wrap"><table class="operation-member-table">',
      "<thead><tr><th>组员</th><th>岗位</th><th>",
      escapeHTML(headline.primary.name),
      "</th><th>",
      escapeHTML(headline.secondary.name),
      "</th><th>综合目标达成度</th><th>未达标指标</th><th>操作</th></tr></thead>",
      "<tbody>",
      group.members.map((person) => {
        const context = getEntityContext("person", group.id, person.id);
        const primaryResult = getMetricResult(headline.primary, context);
        const secondaryResult = getMetricResult(headline.secondary, context);
        const evaluation = getOverallEvaluation(context);
        return [
          '<tr><td><button type="button" class="operation-member-name" data-member-id="',
          person.id,
          '"><span class="operation-member-avatar">',
          escapeHTML(person.name.slice(0, 1)),
          "</span>",
          escapeHTML(person.name),
          "</button></td><td>",
          escapeHTML(person.role),
          "</td><td>",
          escapeHTML(primaryResult.actualDisplay),
          "</td><td>",
          escapeHTML(secondaryResult.actualDisplay),
          '</td><td><strong>',
          evaluation.score,
          '%</strong></td><td><span class="status-tag ',
          evaluation.unmet ? "risk" : "normal",
          '">',
          evaluation.unmet,
          '项</span></td><td><button type="button" class="operation-table-action" data-member-id="',
          person.id,
          '">',
          ICONS.view,
          "查看个人</button></td></tr>"
        ].join("");
      }).join(""),
      "</tbody></table></div>"
    ].join("");
  }

  function renderPersonPanel() {
    const group = getActiveGroup();
    const person = getActiveMember();
    if (!group || !person) return;
    const context = getEntityContext();
    const evaluation = getOverallEvaluation(context);
    const headline = getHeadlineMetrics();
    const primaryResult = getMetricResult(headline.primary, context);
    $("operationScopePanelTitle").textContent = "个人运营概况";
    $("operationScopePanelDescription").textContent = "仅展示该人员可归属的个人运营数据，不包含其他组员数据。";
    $("operationScopePanelMeta").textContent = "个人视图";
    $("operationScopePanelBody").innerHTML = [
      '<div class="operation-person-profile">',
      '<div class="operation-profile-main"><span class="operation-profile-avatar">',
      escapeHTML(person.name.slice(0, 1)),
      '</span><div class="operation-profile-copy"><strong>',
      escapeHTML(person.name),
      "</strong><span>",
      escapeHTML(group.name),
      " · ",
      escapeHTML(person.role),
      "</span></div></div>",
      '<div class="operation-profile-stat"><span>',
      escapeHTML(headline.primary.name),
      '</span><strong>',
      escapeHTML(primaryResult.actualDisplay),
      "</strong></div>",
      '<div class="operation-profile-stat"><span>综合目标达成度</span><strong>',
      evaluation.score,
      "%</strong></div>",
      '<div class="operation-profile-stat"><span>未达标指标</span><strong>',
      evaluation.unmet,
      "项</strong></div>",
      "</div>"
    ].join("");
  }

  function getHeadlineMetrics() {
    if (activeBusinessType === "cost") {
      return {
        primary: getMetric("transactionAmount"),
        secondary: getMetric("revenue")
      };
    }
    if (activeBusinessType === "general") {
      return {
        primary: getMetric("firstPassRate"),
        secondary: getMetric("qualityRate")
      };
    }
    return {
      primary: getMetric("dealCount"),
      secondary: getMetric("successRate")
    };
  }

  function ensureComparisonMetric() {
    const visibleMetrics = getVisibleMetrics();
    if (!visibleMetrics.some((metricItem) => metricItem.id === selectedComparisonMetricId)) {
      selectedComparisonMetricId = visibleMetrics.length ? visibleMetrics[0].id : null;
    }
  }

  function renderComparison() {
    ensureComparisonMetric();
    const selectField = $("operationComparisonSelectField");
    const select = $("operationComparisonMetricSelect");

    if (activeLevel === "person") {
      selectField.classList.add("hidden");
      renderPersonCategoryComparison();
      return;
    }

    selectField.classList.remove("hidden");
    const visibleMetrics = getVisibleMetrics();
    select.innerHTML = visibleMetrics.map((metricItem) => [
      '<option value="',
      metricItem.id,
      '"',
      metricItem.id === selectedComparisonMetricId ? " selected" : "",
      ">",
      escapeHTML(metricItem.name),
      "</option>"
    ].join("")).join("");

    const selectedMetric = getMetric(selectedComparisonMetricId);
    if (!selectedMetric) {
      $("operationComparisonBody").innerHTML = "";
      return;
    }

    const comparisonItems = activeLevel === "department"
      ? GROUPS.map((group) => ({
        label: group.name,
        context: getEntityContext("group", group.id, null)
      }))
      : getActiveGroup().members.map((person) => ({
        label: person.name,
        context: getEntityContext("person", getActiveGroup().id, person.id)
      }));

    $("operationComparisonTitle").textContent = activeLevel === "department"
      ? "各业务组目标对比"
      : "组员目标对比";
    $("operationComparisonDescription").textContent =
      "当前对比：" + selectedMetric.name + "，蓝色为本期实际，灰色为本期目标。";
    $("operationComparisonBody").innerHTML = [
      comparisonItems.map((item) => renderComparisonRow(item.label, selectedMetric, getMetricResult(selectedMetric, item.context))).join(""),
      '<div class="operation-comparison-legend"><span><i></i>本期实际</span><span class="target"><i></i>本期目标</span></div>'
    ].join("");
  }

  function renderComparisonRow(label, metricItem, result) {
    const maximum = Math.max(result.actual, result.target, 1);
    const actualWidth = Math.max(result.actual > 0 ? 4 : 0, (result.actual / maximum) * 100);
    const targetWidth = Math.max(result.target > 0 ? 4 : 0, (result.target / maximum) * 100);
    return [
      '<div class="operation-comparison-item"><span class="operation-comparison-name" title="',
      escapeHTML(label),
      '">',
      escapeHTML(label),
      '</span><div class="operation-comparison-bars">',
      '<div class="operation-comparison-bar actual" title="实际 ',
      escapeHTML(result.actualDisplay),
      '"><span style="width:',
      actualWidth,
      '%"></span></div>',
      '<div class="operation-comparison-bar target" title="目标 ',
      escapeHTML(result.targetDisplay),
      '"><span style="width:',
      targetWidth,
      '%"></span></div>',
      '</div><strong class="operation-comparison-rate ',
      result.normal ? "" : "risk",
      '">',
      Math.round(result.targetProgress),
      "%</strong></div>"
    ].join("");
  }

  function renderPersonCategoryComparison() {
    const context = getEntityContext();
    const categoryItems = CATEGORIES.filter((category) => category.id !== "all").map((category) => {
      const metrics = getVisibleMetrics().filter((metricItem) => metricItem.category === category.id);
      const score = metrics.length
        ? Math.round(metrics.reduce((sum, metricItem) => sum + getMetricResult(metricItem, context).score, 0) / metrics.length)
        : 0;
      return { label: category.label, score };
    }).filter((item) => item.score || getVisibleMetrics().some((metricItem) => getCategoryLabel(metricItem.category) === item.label));

    $("operationComparisonTitle").textContent = "个人分类目标达成";
    $("operationComparisonDescription").textContent = "按业务规模、交付质量和时效风险汇总个人目标达成情况。";
    $("operationComparisonBody").innerHTML = categoryItems.map((item) => [
      '<div class="operation-comparison-item"><span class="operation-comparison-name">',
      escapeHTML(item.label),
      '</span><div class="operation-comparison-bars"><div class="operation-comparison-bar actual"><span style="width:',
      item.score,
      '%"></span></div><div class="operation-comparison-bar target"><span style="width:100%"></span></div></div><strong class="operation-comparison-rate ',
      item.score >= 100 ? "" : "risk",
      '">',
      item.score,
      "%</strong></div>"
    ].join("")).join("") +
      '<div class="operation-comparison-legend"><span><i></i>当前达成度</span><span class="target"><i></i>目标基线</span></div>';
  }

  function renderAttention() {
    const context = getEntityContext();
    const attentionItems = getVisibleMetrics().map((metricItem) => ({
      metric: metricItem,
      result: getMetricResult(metricItem, context)
    })).filter((item) => !item.result.normal).sort((a, b) => a.result.score - b.result.score);

    $("operationAttentionCount").textContent = attentionItems.length + "项";
    $("operationAttentionDescription").textContent =
      getBusinessTypeLabel() + "业务 · " + getCurrentPeriodOption().label;

    if (!attentionItems.length) {
      $("operationAttentionList").innerHTML = [
        '<div class="operation-attention-empty">',
        ICONS.check,
        "<strong>当前指标均达到序时要求</strong>",
        "<span>可继续关注本期目标完成进度</span>",
        "</div>"
      ].join("");
      return;
    }

    $("operationAttentionList").innerHTML = attentionItems.slice(0, 5).map((item) => [
      '<div class="operation-attention-item"><span class="operation-attention-icon">',
      ICONS.alert,
      '</span><div class="operation-attention-copy"><strong>',
      escapeHTML(item.metric.name),
      '</strong><span>实际 ',
      escapeHTML(item.result.actualDisplay),
      " · ",
      item.metric.cumulative && item.result.target > 0 ? "序时目标 " + escapeHTML(item.result.benchmarkDisplay) : "目标 " + escapeHTML(item.result.targetDisplay),
      '</span></div><span class="operation-attention-gap">',
      escapeHTML(item.result.gapLabel),
      "</span></div>"
    ].join("")).join("");
  }

  function renderCategoryTabs() {
    const visibleMetrics = getVisibleMetrics();
    $("operationCategoryTabs").innerHTML = CATEGORIES.map((category) => {
      const count = category.id === "all"
        ? visibleMetrics.length
        : visibleMetrics.filter((metricItem) => metricItem.category === category.id).length;
      if (!count) return "";
      return [
        '<button type="button" class="operation-category-tab',
        category.id === activeCategory ? " active" : "",
        '" data-category-id="',
        category.id,
        '">',
        escapeHTML(category.label),
        "<em>",
        count,
        "</em></button>"
      ].join("");
    }).join("");
  }

  function renderMetrics() {
    const context = getEntityContext();
    const filteredMetrics = getFilteredMetrics();
    const scopeName = activeLevel === "department" ? "部门" : activeLevel === "group" ? "业务组" : "个人";
    $("operationMetricTitle").textContent = scopeName + "运营指标";
    $("operationMetricDescription").textContent =
      getBusinessTypeLabel() + "业务 · " + getCategoryLabel(activeCategory) + " · 本期实际对比周期目标或控制阈值";

    if (!filteredMetrics.length) {
      $("operationMetricGrid").innerHTML = [
        '<div class="operation-metric-empty"><strong>当前分类暂无指标</strong>',
        "<span>请切换业务类型或指标分类查看其他运营数据</span></div>"
      ].join("");
      return;
    }

    $("operationMetricGrid").innerHTML = filteredMetrics.map((metricItem) => {
      const result = getMetricResult(metricItem, context);
      return [
        '<article class="operation-metric-card ',
        result.normal ? "normal" : "risk",
        '">',
        '<div class="operation-metric-card-head"><div class="operation-metric-name"><span>',
        escapeHTML(getCategoryLabel(metricItem.category)),
        '</span><strong title="',
        escapeHTML(metricItem.name),
        '">',
        escapeHTML(metricItem.name),
        '</strong></div><span class="status-tag ',
        result.normal ? "normal" : "risk",
        '">',
        result.normal ? "正常" : "未达标",
        "</span></div>",
        '<div class="operation-metric-values"><div class="operation-metric-value"><span>本期实际</span><strong>',
        escapeHTML(result.actualDisplay),
        '</strong></div><div class="operation-metric-value target"><span class="operation-metric-target-label">',
        ICONS.target,
        "本期目标</span><strong>",
        escapeHTML(result.targetDisplay),
        "</strong></div></div>",
        '<div class="operation-metric-progress"><div class="operation-metric-progress-head"><span>',
        metricItem.cumulative && metricItem.direction === "high" ? "本期目标完成率" : "周期目标达成情况",
        "</span><strong>",
        escapeHTML(result.progressLabel),
        '</strong></div><div class="operation-progress-track"><span style="width:',
        Math.min(100, Math.max(4, result.targetProgress)),
        '%"></span></div></div>',
        '<div class="operation-metric-foot"><span title="',
        escapeHTML(metricItem.note),
        '">',
        escapeHTML(metricItem.note),
        "</span><span>",
        escapeHTML(result.gapLabel),
        "</span></div>",
        "</article>"
      ].join("");
    }).join("");
  }

  function renderAll() {
    renderRoleTabs();
    renderPeriodControls();
    renderBusinessTypeOptions();
    renderViewContext();
    renderSummary();
    renderScopePanel();
    renderComparison();
    renderAttention();
    renderCategoryTabs();
    renderMetrics();
  }

  function bindEvents() {
    $("operationRoleTabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-role-id]");
      if (!button || button.dataset.roleId === activeRoleId) return;
      activeRoleId = button.dataset.roleId;
      resetViewForRole();
      renderAll();
    });

    $("operationBusinessTypeSelect").addEventListener("change", (event) => {
      activeBusinessType = event.target.value;
      activeCategory = "all";
      selectedComparisonMetricId = null;
      renderAll();
      if (window.showToast) window.showToast("业务类型已切换为：" + (activeBusinessType === "all" ? "全部业务" : getBusinessTypeLabel() + "业务"));
    });

    $("operationPeriodTypeTabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-period-type]");
      if (!button || button.dataset.periodType === activePeriodType) return;
      activePeriodType = button.dataset.periodType;
      renderAll();
      if (window.showToast) window.showToast("已切换为：" + activePeriodType + "运营数据");
    });

    $("operationPeriodSelect").addEventListener("change", (event) => {
      selectedPeriods[activePeriodType] = event.target.value;
      renderAll();
      if (window.showToast) window.showToast("统计周期已切换为：" + getCurrentPeriodOption().label);
    });

    $("operationScopePath").addEventListener("click", (event) => {
      const button = event.target.closest("[data-scope-action]");
      if (!button) return;
      if (button.dataset.scopeAction === "department" && activeRoleId === "departmentHead") {
        activeLevel = "department";
        activeGroupId = null;
        activeMemberId = null;
      } else if (button.dataset.scopeAction === "group" && activeGroupId && canOpenGroup(activeGroupId)) {
        activeLevel = "group";
        activeMemberId = null;
      }
      renderAll();
    });

    $("operationScopePanelBody").addEventListener("click", (event) => {
      const groupButton = event.target.closest("[data-group-id]");
      if (groupButton && canOpenGroup(groupButton.dataset.groupId)) {
        activeGroupId = groupButton.dataset.groupId;
        activeMemberId = null;
        activeLevel = "group";
        renderAll();
        return;
      }

      const memberButton = event.target.closest("[data-member-id]");
      if (!memberButton || !activeGroupId) return;
      if (!canOpenMember(activeGroupId, memberButton.dataset.memberId)) return;
      activeMemberId = memberButton.dataset.memberId;
      activeLevel = "person";
      renderAll();
    });

    $("operationComparisonMetricSelect").addEventListener("change", (event) => {
      selectedComparisonMetricId = event.target.value;
      renderComparison();
    });

    $("operationCategoryTabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-category-id]");
      if (!button || button.dataset.categoryId === activeCategory) return;
      activeCategory = button.dataset.categoryId;
      renderCategoryTabs();
      renderMetrics();
    });
  }

  function init() {
    resetViewForRole();
    bindEvents();
    renderAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
