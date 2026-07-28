(function setupPerformanceDashboard() {
  const PAGE_SIZE = 6;
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
    {
      id: "group-1",
      name: "第一业务组",
      leader: "赵倩",
      members: [
        member("member-1-1", "赵倩", "业务组长"),
        member("member-1-2", "林晓", "高级项目经理"),
        member("member-1-3", "陈浩", "项目经理"),
        member("member-1-4", "刘璇", "项目经理")
      ]
    },
    {
      id: "group-2",
      name: "第二业务组",
      leader: "张明",
      members: [
        member("member-2-1", "李文", "项目经理"),
        member("member-2-2", "张明", "业务组长"),
        member("member-2-3", "周启航", "高级项目经理"),
        member("member-2-4", "许妍", "项目经理")
      ]
    },
    {
      id: "group-3",
      name: "非电力业务组",
      leader: "孙岚",
      members: [
        member("member-3-1", "孙岚", "业务组长"),
        member("member-3-2", "杨帆", "高级项目经理"),
        member("member-3-3", "宋妍", "项目经理"),
        member("member-3-4", "何睿", "项目经理")
      ]
    },
    {
      id: "group-4",
      name: "造价业务组",
      leader: "王军",
      members: [
        member("member-4-1", "王军", "业务组长"),
        member("member-4-2", "罗欣", "高级造价经理"),
        member("member-4-3", "高杰", "造价项目经理"),
        member("member-4-4", "唐悦", "造价项目经理")
      ]
    }
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
      defaultLevel: "person",
      groupId: "group-2",
      memberId: "member-2-1",
      canConfigure: true
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
  appendPersonPerformanceItems();

  let activeRoleId = "departmentHead";
  let activeLevel = "department";
  let activeGroupId = "group-2";
  let activeMemberId = null;
  let activePeriodType = "月度";
  const selectedPeriods = {
    月度: "2026-07",
    季度: "2026-Q2"
  };
  let activeCategory = "all";
  let activeStatus = "all";
  let currentPage = 1;
  let activeDetailId = null;
  let editingItemId = null;
  let customItemCounter = 1;

  const $ = (id) => document.getElementById(id);

  function metric(id, name, category, cycle, unit, direction, definition, sampleActual) {
    return { id, name, category, cycle, unit, direction, definition, sampleActual };
  }

  function member(id, name, position) {
    return { id, name, position };
  }

  function performance(id, scope, groupId, metricId, actual, target, challenge, memberId, targetSource) {
    return {
      id,
      scope,
      groupId,
      memberId: memberId || null,
      metricId,
      actual,
      target,
      challenge,
      targetSource: targetSource || null
    };
  }

  function appendPersonPerformanceItems() {
    performanceItems
      .filter((item) => item.scope === "group")
      .slice()
      .forEach(syncPersonItemsForGroupMetric);
  }

  function syncPersonItemsForGroupMetric(groupItem) {
    const group = getGroup(groupItem.groupId);
    if (!group) return;
    const groupIndex = GROUPS.findIndex((item) => item.id === group.id);
    const metricItem = METRIC_LIBRARY.find((candidate) => candidate.id === groupItem.metricId);
    const shareFactor = metricItem && ["次", "个"].includes(metricItem.unit)
      ? 1 / group.members.length
      : 1;
    group.members.forEach((person, memberIndex) => {
      const personItem = performanceItems.find((item) => (
        item.scope === "person" &&
        item.groupId === group.id &&
        item.memberId === person.id &&
        item.metricId === groupItem.metricId
      ));
      if (personItem) {
        if (personItem.targetSource !== "personal") {
          personItem.target = groupItem.target * shareFactor;
          personItem.challenge = groupItem.challenge * shareFactor;
        }
        return;
      }
      const actualFactor = 0.9 + (((groupIndex * group.members.length) + memberIndex) % 5) * 0.05;
      performanceItems.push(performance(
        "person-" + person.id + "-" + groupItem.metricId,
        "person",
        group.id,
        groupItem.metricId,
        groupItem.actual * shareFactor * actualFactor,
        groupItem.target * shareFactor,
        groupItem.challenge * shareFactor,
        person.id,
        "group"
      ));
    });
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

  function getMember(groupId, memberId) {
    const group = getGroup(groupId);
    return group ? group.members.find((item) => item.id === memberId) || null : null;
  }

  function getActiveMember() {
    return getMember(activeGroupId, activeMemberId);
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
    if (item.scope === "person") {
      const person = getMember(item.groupId, item.memberId);
      return person ? person.name : "个人";
    }
    return group ? group.name : "业务组";
  }

  function getPeriodLabel() {
    return getCurrentPeriodOption().label;
  }

  function getContextItems() {
    const scoped = performanceItems.filter((item) => (
      activeLevel === "department"
        ? item.scope === "department"
        : activeLevel === "group"
          ? item.scope === "group" && item.groupId === activeGroupId
          : item.scope === "person" &&
            item.groupId === activeGroupId &&
            item.memberId === activeMemberId
    ));
    if (activeCategory === "all") return scoped;
    return scoped.filter((item) => getMetric(item.metricId).category === activeCategory);
  }

  function getFilteredItems() {
    const items = getContextItems();
    if (activeStatus === "all") return items;
    return items.filter((item) => getState(item) === activeStatus);
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
    const person = getActiveMember();
    const groupName = group ? group.name : "业务组";
    const isDepartment = activeLevel === "department";
    const isPerson = activeLevel === "person" && Boolean(person);
    const scopeLabel = isDepartment ? "部门" : isPerson ? "个人" : "业务组";
    let title = "代理业务部绩效看板";
    let description = "汇总部门及各业务组的实际完成值、目标值与挑战值，及时识别未达目标指标。";
    let tableTitle = "部门绩效指标";
    let exceptionDescription = "展示部门当前未达到目标值的指标。";
    let tableDescription = "实际值与目标值、挑战值统一对比，点击指标名称查看周期趋势与业务组明细。";

    if (activeLevel === "group" && group) {
      title = groupName + "绩效看板";
      description = "查看" + groupName + "指标结果和组员绩效达成情况，可逐级进入个人视图。";
      tableTitle = groupName + "绩效指标";
      exceptionDescription = "展示" + groupName + "当前未达到目标值的指标。";
      tableDescription = "实际值与目标值、挑战值统一对比，点击指标名称查看周期趋势与组员明细。";
    } else if (isPerson) {
      title = person.name + "个人绩效看板";
      description = "查看" + person.name + "在" + groupName + "的个人指标结果、目标差距和周期趋势。";
      tableTitle = person.name + "个人绩效指标";
      exceptionDescription = "展示" + person.name + "当前未达到目标值的指标。";
      tableDescription = "仅展示当前人员的实际值、目标值、挑战值、达成率和目标差距。";
    }

    $("performanceUserAvatar").textContent = role.avatar;
    $("performanceUserName").textContent = role.userName;
    $("performanceUserRole").textContent = role.label;
    $("performanceTopbarSubtitle").textContent = role.label + " · " + scopeLabel + "绩效视图";
    $("performancePageTitle").textContent = title;
    $("performancePageDescription").textContent = description;
    $("performanceRoleHint").textContent = role.id === "departmentHead"
      ? "部门负责人查看部门和各业务组绩效，可逐级下钻并配置各层级指标。"
      : role.id === "groupLeader"
        ? "业务组长查看所属" + groupName + "及组员绩效，可配置本组和个人指标。"
        : "组员仅查看本人绩效指标结果，可设置本人指标与目标。";

    $("openPerformanceConfig").classList.toggle("hidden", !role.canConfigure);
    $("performanceTableTitle").textContent = tableTitle;
    $("performanceExceptionDescription").textContent = exceptionDescription;
    $("performanceTableDescription").textContent = tableDescription;
    renderBreadcrumb();
    renderPageActions();
    document.title = title + " - 业务管理系统";
  }

  function renderBreadcrumb() {
    const role = getActiveRole();
    const group = getGroup(activeGroupId);
    const person = getActiveMember();
    const parts = ['<span>首页</span><span>/</span>'];

    if (activeLevel === "department") {
      parts.push('<span class="current">绩效看板</span>');
    } else {
      parts.push(role.id === "departmentHead"
        ? '<button type="button" class="performance-breadcrumb-button" data-performance-nav="department">绩效看板</button>'
        : "<span>绩效看板</span>");
      if (group) {
        parts.push("<span>/</span>");
        parts.push(activeLevel === "person" && role.id !== "member"
          ? '<button type="button" class="performance-breadcrumb-button" data-performance-nav="group">' +
            escapeHTML(group.name) + "</button>"
          : '<span class="' + (activeLevel === "group" ? "current" : "") + '">' +
            escapeHTML(group.name) + "</span>");
      }
      if (activeLevel === "person" && person) {
        parts.push('<span>/</span><span class="current">' + escapeHTML(person.name) + "</span>");
      }
    }
    $("performanceBreadcrumb").innerHTML = parts.join("");
  }

  function renderPageActions() {
    const canBack =
      (activeLevel === "group" && activeRoleId === "departmentHead") ||
      (activeLevel === "person" && activeRoleId !== "member");
    $("performanceBackButton").classList.toggle("hidden", !canBack);
  }

  function summaryCard(label, value, unit, foot, tone, icon) {
    return [
      '<article class="card performance-summary-card ',
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
    $("performanceScopePanel").classList.toggle("is-person", activeLevel === "person");
    if (activeLevel === "department") {
      renderDepartmentGroups();
    } else if (activeLevel === "group") {
      renderGroupMembers();
    } else {
      renderPersonContext();
    }
  }

  function renderDepartmentGroups() {
    const rows = GROUPS.map((group) => {
      let items = performanceItems.filter((item) => item.scope === "group" && item.groupId === group.id);
      if (activeCategory !== "all") {
        items = items.filter((item) => getMetric(item.metricId).category === activeCategory);
      }
      const states = items.map((item) => getState(item));
      const challengeCount = states.filter((state) => state === "challenge").length;
      const abnormalCount = states.filter((state) => state === "abnormal").length;
      const achievedCount = states.length - abnormalCount;
      const rate = items.length ? Math.round((achievedCount / items.length) * 100) : 0;
      return [
        '<div class="performance-group-row',
        abnormalCount ? " has-risk" : "",
        '">',
        '<button type="button" class="performance-group-entry" data-group-entry="',
        escapeAttr(group.id),
        '">',
        escapeHTML(group.name),
        "<span>组长：",
        escapeHTML(group.leader),
        " · ",
        group.members.length,
        "名组员",
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
    $("performanceGroupTitle").textContent = "各业务组绩效达成情况";
    $("performanceGroupDescription").textContent = "按指标达标率比较各业务组，点击业务组名称进入组员绩效视图。";
    $("performanceGroupMeta").textContent = GROUPS.length + "个业务组";
  }

  function renderGroupMembers() {
    const group = getGroup(activeGroupId);
    if (!group) return;
    const rows = group.members.map((person) => {
      let items = performanceItems.filter((item) => (
        item.scope === "person" &&
        item.groupId === group.id &&
        item.memberId === person.id
      ));
      if (activeCategory !== "all") {
        items = items.filter((item) => getMetric(item.metricId).category === activeCategory);
      }
      const states = items.map((item) => getState(item));
      const challengeCount = states.filter((state) => state === "challenge").length;
      const abnormalCount = states.filter((state) => state === "abnormal").length;
      const achievedCount = states.length - abnormalCount;
      const rate = items.length ? Math.round((achievedCount / items.length) * 100) : 0;
      const canOpen = canOpenMember(group.id, person.id);
      return [
        '<div class="performance-group-row performance-member-row',
        abnormalCount ? " has-risk" : "",
        '">',
        '<button type="button" class="performance-member-entry" data-member-entry="',
        escapeAttr(person.id),
        '"',
        canOpen ? "" : " disabled",
        '><span class="performance-member-avatar">',
        escapeHTML(person.name.slice(0, 1)),
        '</span><span class="performance-member-copy"><strong>',
        escapeHTML(person.name),
        "</strong><small>",
        escapeHTML(person.position),
        "</small></span></button>",
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
        "</div></div>"
      ].join("");
    }).join("");

    $("performanceGroupComparison").innerHTML = rows;
    $("performanceGroupTitle").textContent = group.name + "组员绩效达成情况";
    $("performanceGroupDescription").textContent = "点击组员进入个人绩效视图，查看指标结果、目标差距和周期趋势。";
    $("performanceGroupMeta").textContent = group.members.length + "名组员";
  }

  function renderPersonContext() {
    const group = getGroup(activeGroupId);
    const person = getActiveMember();
    if (!group || !person) return;
    const items = getContextItems();
    const states = items.map((item) => getState(item));
    const challengeCount = states.filter((state) => state === "challenge").length;
    const abnormalCount = states.filter((state) => state === "abnormal").length;
    const rate = items.length ? Math.round(((states.length - abnormalCount) / items.length) * 100) : 0;
    $("performanceGroupComparison").innerHTML = [
      '<div class="performance-person-context">',
      '<div class="performance-person-main"><span class="performance-person-avatar">',
      escapeHTML(person.name.slice(0, 1)),
      '</span><div><strong>',
      escapeHTML(person.name),
      "</strong><span>",
      escapeHTML(person.position),
      " · ",
      escapeHTML(group.name),
      "</span></div></div>",
      '<div class="performance-person-stats">',
      '<div><span>指标总数</span><strong>',
      items.length,
      "项</strong></div>",
      '<div><span>指标达标率</span><strong>',
      rate,
      "%</strong></div>",
      '<div><span>达成挑战</span><strong>',
      challengeCount,
      "项</strong></div>",
      '<div class="risk"><span>异常指标</span><strong>',
      abnormalCount,
      "项</strong></div>",
      "</div></div>"
    ].join("");
    $("performanceGroupTitle").textContent = "个人绩效范围";
    $("performanceGroupDescription").textContent = "当前仅展示本人指标结果，不包含其他组员数据。";
    $("performanceGroupMeta").textContent = "个人视图";
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

  function renderPagination(total, pageCount) {
    $("performancePagination").innerHTML = [
      '<span class="performance-page-total">共 ',
      total,
      " 项</span>",
      '<button type="button" class="performance-page-button" data-page-action="prev"',
      currentPage <= 1 ? " disabled" : "",
      '><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>上一页</button>',
      '<span class="performance-page-info">第 ',
      currentPage,
      " / ",
      pageCount,
      " 页</span>",
      '<button type="button" class="performance-page-button" data-page-action="next"',
      currentPage >= pageCount ? " disabled" : "",
      '>下一页<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>'
    ].join("");
  }

  function renderTable() {
    const items = getFilteredItems();
    const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    currentPage = Math.min(Math.max(currentPage, 1), pageCount);
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = items.slice(start, start + PAGE_SIZE);
    $("performanceResultCount").textContent = items.length + "项指标";
    renderPagination(items.length, pageCount);

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

    $("performanceTableBody").innerHTML = pageItems.map((item) => {
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
    const target = getTarget(item);
    const challenge = getChallenge(item);
    const currentIsAbnormal = getState(item, currentActual) === "abnormal";
    const earlyAbnormalCount = currentIsAbnormal ? 1 : isMonthly ? 2 : 1;
    const values = [];
    for (let index = 0; index < earlyAbnormalCount; index += 1) {
      values.push(getTrendAbnormalValue(metricItem, target, earlyAbnormalCount - index));
    }
    const achievedPointCount = count - earlyAbnormalCount - 1;
    for (let index = 0; index < achievedPointCount; index += 1) {
      const progress = achievedPointCount <= 1 ? 0 : index / (achievedPointCount - 1);
      const value = metricItem.direction === "low"
        ? target - ((target - challenge) * progress)
        : target + ((challenge - target) * progress);
      values.push(roundValue(value, metricItem.unit));
    }
    values.push(currentActual);
    return labels.map((label, index) => ({
      label,
      value: values[index]
    }));
  }

  function getTrendAbnormalValue(metricItem, target, severity) {
    const step = ["次", "个"].includes(metricItem.unit)
      ? severity
      : Math.max(metricItem.unit === "万元" ? 0.8 : 0.5, Math.abs(target) * 0.035 * severity);
    const value = metricItem.direction === "low" ? target + step : Math.max(0, target - step);
    return roundValue(value, metricItem.unit);
  }

  function renderTrendChart(item) {
    const metricItem = getMetric(item.metricId);
    const trend = getTrend(item);
    const target = getTarget(item);
    const challenge = getChallenge(item);
    const maximum = Math.max(
      target,
      challenge,
      ...trend.map((point) => point.value)
    ) || 1;
    return [
      '<div class="performance-trend-explanation">',
      '<div class="performance-trend-legend"><span><i class="abnormal"></i>未达目标</span>',
      '<span><i class="achieved"></i>已达目标（含达成挑战）</span></div>',
      '<div class="performance-trend-threshold"><span>目标值 ',
      escapeHTML(formatValue(target, metricItem.unit)),
      "</span><span>挑战值 ",
      escapeHTML(formatValue(challenge, metricItem.unit)),
      "</span></div></div>",
      '<p class="performance-trend-note">红色表示该周期未达到目标值，绿色表示已达到目标值；本指标按“',
      metricItem.direction === "low" ? "越低越好" : "越高越好",
      '”判定。</p>',
      '<div class="performance-trend-chart" style="--trend-columns:',
      trend.length,
      '">',
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
    const isDepartment = item.scope === "department";
    const group = getGroup(item.groupId);
    const entities = isDepartment
      ? GROUPS.map((groupItem) => ({ id: groupItem.id, label: groupItem.name }))
      : (group ? group.members.map((person) => ({ id: person.id, label: person.name })) : []);
    const rows = entities.map((entity) => {
      const comparisonItem = performanceItems.find((candidate) => (
        candidate.scope === (isDepartment ? "group" : "person") &&
        candidate.groupId === (isDepartment ? entity.id : item.groupId) &&
        (isDepartment || candidate.memberId === entity.id) &&
        candidate.metricId === item.metricId
      ));
      if (!comparisonItem) {
        return [
          "<tr><td>",
          escapeHTML(entity.label),
          "</td><td>-</td><td>-</td><td><span class=\"performance-status abnormal\">未配置</span></td></tr>"
        ].join("");
      }
      const metricItem = getMetric(comparisonItem.metricId);
      const actual = getActual(comparisonItem);
      const state = getState(comparisonItem, actual);
      return [
        "<tr><td>",
        escapeHTML(entity.label),
        "</td><td>",
        escapeHTML(formatValue(actual, metricItem.unit)),
        "</td><td>",
        getAchievement(comparisonItem, actual),
        '%</td><td><span class="performance-status ',
        state,
        '">',
        escapeHTML(getStatusMeta(state).label),
        "</span></td></tr>"
      ].join("");
    }).join("");

    return [
      '<table class="performance-detail-table">',
      "<thead><tr><th>",
      isDepartment ? "业务组" : "组员",
      "</th><th>实际完成值</th><th>达成率</th><th>达成状态</th></tr></thead>",
      "<tbody>",
      rows,
      "</tbody></table>"
    ].join("");
  }

  function renderDetailComparison(item) {
    if (item.scope === "person") return "";
    return [
      '<section class="performance-detail-section"><h3>',
      item.scope === "department" ? "各业务组同指标对比" : "组员同指标对比",
      "</h3>",
      renderGroupDetailTable(item),
      "</section>"
    ].join("");
  }

  function canConfigureScope(scope, groupId, memberId) {
    const role = getActiveRole();
    if (!role.canConfigure) return false;
    if (role.id === "departmentHead") return true;
    if (role.id === "groupLeader") {
      return (scope === "group" || scope === "person") && groupId === role.groupId;
    }
    return scope === "person" && groupId === role.groupId && memberId === role.memberId;
  }

  function canConfigureItem(item) {
    return Boolean(item) && canConfigureScope(item.scope, item.groupId, item.memberId);
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
      renderDetailComparison(item)
    ].join("");

    $("editPerformanceTarget").classList.toggle("hidden", !canConfigureItem(item));
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

  function getAllowedConfigScopes(role) {
    if (role.id === "departmentHead") return ["department", "group", "person"];
    if (role.id === "groupLeader") return ["group", "person"];
    return ["person"];
  }

  function renderConfigScopeOptions(preferredScope) {
    const role = getActiveRole();
    const scopeMeta = {
      department: "部门",
      group: "业务组",
      person: "个人"
    };
    const allowedScopes = getAllowedConfigScopes(role);
    $("configScope").innerHTML = allowedScopes.map((scope) => (
      '<option value="' + scope + '">' + scopeMeta[scope] + "</option>"
    )).join("");
    $("configScope").value = allowedScopes.includes(preferredScope) ? preferredScope : allowedScopes[0];
    $("configScope").disabled = Boolean(editingItemId) || allowedScopes.length === 1;
  }

  function renderConfigMemberOptions(groupId, preferredMemberId) {
    const group = getGroup(groupId);
    const members = group ? group.members : [];
    $("configMember").innerHTML = members.map((person) => (
      '<option value="' + escapeAttr(person.id) + '">' +
      escapeHTML(person.name) + " · " + escapeHTML(person.position) +
      "</option>"
    )).join("");
    const role = getActiveRole();
    const lockedMemberId = role.id === "member" ? role.memberId : preferredMemberId;
    if (members.some((person) => person.id === lockedMemberId)) {
      $("configMember").value = lockedMemberId;
    }
  }

  function findUnconfiguredMetric(scope, groupId, memberId) {
    const existing = performanceItems
      .filter((item) => (
        item.scope === scope &&
        (scope === "department" || item.groupId === groupId) &&
        (scope !== "person" || item.memberId === memberId)
      ))
      .map((item) => item.metricId);
    return METRIC_LIBRARY.find((metricItem) => existing.indexOf(metricItem.id) < 0) || METRIC_LIBRARY[0];
  }

  function syncConfigScopeState() {
    const scope = $("configScope").value;
    const needsGroup = scope === "group" || scope === "person";
    const isPerson = scope === "person";
    const role = getActiveRole();
    $("configGroup").disabled = !needsGroup || Boolean(editingItemId) || role.id !== "departmentHead";
    $("configMember").disabled = !isPerson || Boolean(editingItemId) || role.id === "member";
    $("configGroupField").classList.toggle("is-disabled", !needsGroup);
    $("configMemberField").classList.toggle("is-disabled", !isPerson);
    if (isPerson) {
      renderConfigMemberOptions(
        $("configGroup").value,
        $("configMember").value || activeMemberId || role.memberId
      );
    }
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
    const item = mode === "edit" ? getItem(itemId) : null;
    if (!role.canConfigure) return;
    if (item && !canConfigureItem(item)) return;
    editingItemId = item ? item.id : null;
    $("performanceConfigTitle").textContent = item ? "调整绩效目标" : "设置绩效指标";
    $("configYear").disabled = true;
    $("configMetric").disabled = Boolean(item);
    renderConfigScopeOptions(item ? item.scope : activeLevel);

    if (item) {
      $("configYear").value = getActiveYear();
      $("configScope").value = item.scope;
      $("configGroup").value = item.groupId || activeGroupId;
      renderConfigMemberOptions(item.groupId || activeGroupId, item.memberId);
      $("configMetric").value = item.metricId;
      $("configTarget").value = getTarget(item);
      $("configChallenge").value = getChallenge(item);
    } else {
      $("configYear").value = getActiveYear();
      $("configGroup").value = role.groupId || activeGroupId;
      renderConfigMemberOptions(
        $("configGroup").value,
        role.memberId || activeMemberId
      );
      const availableMetric = findUnconfiguredMetric(
        $("configScope").value,
        $("configGroup").value,
        $("configMember").value
      );
      $("configMetric").value = availableMetric.id;
      $("configTarget").value = "";
      $("configChallenge").value = "";
    }

    syncConfigScopeState();
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
    const groupId = scope === "group" || scope === "person" ? $("configGroup").value : null;
    const memberId = scope === "person" ? $("configMember").value : null;
    const metricId = $("configMetric").value;
    const target = Number($("configTarget").value);
    const challenge = Number($("configChallenge").value);
    const metricItem = getMetric(metricId);
    const valueScale = getPeriodValueScale(metricItem);
    const storedTarget = target / valueScale;
    const storedChallenge = challenge / valueScale;

    if (!canConfigureScope(scope, groupId, memberId)) {
      notify("当前角色无权配置所选绩效范围", "error");
      return;
    }
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
      if (current.scope === "person") current.targetSource = "personal";
      if (current.scope === "group") syncPersonItemsForGroupMetric(current);
      currentPage = 1;
      closeConfig();
      renderAll();
      openDetail(current.id);
      notify("绩效目标已更新");
      return;
    }

    const duplicate = performanceItems.some((item) => (
      item.scope === scope &&
      item.metricId === metricId &&
      (scope === "department" || item.groupId === groupId) &&
      (scope !== "person" || item.memberId === memberId)
    ));
    if (duplicate) {
      notify("当前范围已配置该绩效指标，请从指标详情中调整目标", "error");
      return;
    }

    const groupIndex = GROUPS.findIndex((group) => group.id === groupId);
    const group = getGroup(groupId);
    const memberIndex = group ? group.members.findIndex((person) => person.id === memberId) : -1;
    const actualScale = scope === "department"
      ? 0.96
      : scope === "group"
        ? 0.9 + (groupIndex * 0.035)
        : 0.9 + (((Math.max(groupIndex, 0) * 4) + Math.max(memberIndex, 0)) % 5) * 0.05;
    const actual = roundValue(metricItem.sampleActual * actualScale, metricItem.unit);
    const item = performance(
      "custom-" + customItemCounter,
      scope,
      groupId,
      metricId,
      actual,
      storedTarget,
      storedChallenge,
      memberId,
      scope === "person" ? "personal" : null
    );
    customItemCounter += 1;
    performanceItems.push(item);
    if (scope === "group") syncPersonItemsForGroupMetric(item);
    activeLevel = scope;
    if (groupId) activeGroupId = groupId;
    activeMemberId = scope === "person" ? memberId : null;
    activeCategory = "all";
    activeStatus = "all";
    currentPage = 1;
    $("performanceCategorySelect").value = "all";
    $("performanceStatusSelect").value = "all";
    closeConfig();
    renderAll();
    notify("绩效指标已配置");
  }

  function openGroup(groupId) {
    const group = getGroup(groupId);
    if (!group || !canOpenGroup(groupId)) return;
    activeLevel = "group";
    activeGroupId = groupId;
    activeMemberId = null;
    activeStatus = "all";
    currentPage = 1;
    $("performanceStatusSelect").value = "all";
    closeDetail();
    renderAll();
    notify("已进入：" + group.name);
  }

  function openMember(memberId) {
    const person = getMember(activeGroupId, memberId);
    if (!person || !canOpenMember(activeGroupId, memberId)) return;
    activeLevel = "person";
    activeMemberId = memberId;
    activeStatus = "all";
    currentPage = 1;
    $("performanceStatusSelect").value = "all";
    closeDetail();
    renderAll();
    notify("已进入：" + person.name + "个人绩效视图");
  }

  function navigateToLevel(level) {
    if (level === "department" && activeRoleId === "departmentHead") {
      activeLevel = "department";
      activeMemberId = null;
    } else if (level === "group" && activeRoleId !== "member" && activeGroupId) {
      activeLevel = "group";
      activeMemberId = null;
    } else {
      return;
    }
    activeStatus = "all";
    currentPage = 1;
    $("performanceStatusSelect").value = "all";
    closeDetail();
    renderAll();
  }

  function goBack() {
    if (activeLevel === "person" && activeRoleId !== "member") {
      navigateToLevel("group");
    } else if (activeLevel === "group" && activeRoleId === "departmentHead") {
      navigateToLevel("department");
    }
  }

  function switchRole(roleId) {
    const role = ROLE_VIEWS.find((item) => item.id === roleId);
    if (!role) return;
    activeRoleId = role.id;
    activeLevel = role.defaultLevel;
    activeGroupId = role.groupId || "group-2";
    activeMemberId = role.memberId || null;
    activeCategory = "all";
    activeStatus = "all";
    currentPage = 1;
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
      currentPage = 1;
      closeDetail();
      renderAll();
      notify("已切换为：" + activePeriodType + "绩效数据");
    });

    $("performancePeriodSelect").addEventListener("change", (event) => {
      selectedPeriods[activePeriodType] = event.target.value;
      currentPage = 1;
      closeDetail();
      renderAll();
      notify("统计周期已切换为：" + getPeriodLabel());
    });

    $("performanceGroupSelect").addEventListener("change", (event) => {
      if (getActiveRole().id !== "departmentHead") return;
      if (event.target.value === "all") {
        activeLevel = "department";
        activeMemberId = null;
      } else {
        activeLevel = "group";
        activeGroupId = event.target.value;
        activeMemberId = null;
      }
      currentPage = 1;
      renderAll();
      const group = getGroup(activeGroupId);
      notify(activeLevel === "department" ? "已切换为部门绩效视图" : "已切换为：" + group.name);
    });

    $("performanceCategorySelect").addEventListener("change", (event) => {
      activeCategory = event.target.value;
      currentPage = 1;
      renderAll();
    });

    $("performanceStatusSelect").addEventListener("change", (event) => {
      activeStatus = event.target.value;
      currentPage = 1;
      renderTable();
    });

    $("performancePagination").addEventListener("click", (event) => {
      const button = event.target.closest("[data-page-action]");
      if (!button || button.disabled) return;
      currentPage += button.dataset.pageAction === "next" ? 1 : -1;
      renderTable();
    });

    $("performanceGroupComparison").addEventListener("click", (event) => {
      const groupButton = event.target.closest("[data-group-entry]");
      if (groupButton) {
        openGroup(groupButton.dataset.groupEntry);
        return;
      }
      const memberButton = event.target.closest("[data-member-entry]");
      if (memberButton) openMember(memberButton.dataset.memberEntry);
    });

    $("performanceBreadcrumb").addEventListener("click", (event) => {
      const button = event.target.closest("[data-performance-nav]");
      if (button) navigateToLevel(button.dataset.performanceNav);
    });

    $("performanceBackButton").addEventListener("click", goBack);

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
      syncConfigScopeState();
      const availableMetric = findUnconfiguredMetric(
        $("configScope").value,
        $("configGroup").value,
        $("configMember").value
      );
      $("configMetric").value = availableMetric.id;
      syncMetricFields();
    });

    $("configGroup").addEventListener("change", () => {
      renderConfigMemberOptions(
        $("configGroup").value,
        $("configMember").value
      );
      const availableMetric = findUnconfiguredMetric(
        $("configScope").value,
        $("configGroup").value,
        $("configMember").value
      );
      $("configMetric").value = availableMetric.id;
      syncMetricFields();
    });

    $("configMember").addEventListener("change", () => {
      const availableMetric = findUnconfiguredMetric(
        "person",
        $("configGroup").value,
        $("configMember").value
      );
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
