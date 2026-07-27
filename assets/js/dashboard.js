(function setupDashboard() {
  const METRICS = [
    {
      id: 1,
      direction: "客户赋能",
      scope: "代理",
      name: "建议采纳率",
      definition: "采纳建议数量 ÷ 提出有效建议数量 × 100%。",
      period: "月度",
      owner: "项目经理",
      display: "86.5%",
      targetDisplay: "≥ 85%",
      progress: 100,
      status: "normal",
      trend: "较上月 +2.1%",
      trendTone: "good"
    },
    {
      id: 2,
      direction: "客户赋能",
      scope: "代理",
      name: "中高风险采纳率",
      definition: "代理提出的中高风险被客户采纳数量 ÷ 提出总数 × 100%。",
      period: "月度",
      owner: "项目经理",
      display: "78.0%",
      targetDisplay: "≥ 80%",
      progress: 97,
      status: "abnormal",
      trend: "较上月 +1.3%",
      trendTone: "good"
    },
    {
      id: 3,
      direction: "客户赋能",
      scope: "代理",
      name: "审查覆盖率",
      definition: "实际完成审查标段 ÷ 应审查标段 × 100%。",
      period: "月度",
      owner: "项目经理",
      display: "96.2%",
      targetDisplay: "≥ 95%",
      progress: 100,
      status: "normal",
      trend: "较上月 +0.8%",
      trendTone: "good"
    },
    {
      id: 4,
      direction: "客户赋能",
      scope: "代理",
      name: "风险识别率（项目经理）",
      definition: "项目经理审查问题数量 ÷ 项目经理、质量管理岗、内部抽检及外部审查发现问题总量 × 100%。",
      period: "月度",
      owner: "项目经理",
      display: "72.4%",
      targetDisplay: "≥ 70%",
      progress: 100,
      status: "normal",
      trend: "较上月 +3.2%",
      trendTone: "good"
    },
    {
      id: 5,
      direction: "客户赋能",
      scope: "代理",
      name: "风险识别率（质量审核）",
      definition: "质量管理岗审查问题数量 ÷ 内部抽检、外部审查及质量管理岗发现问题总量 × 100%。",
      period: "月度",
      owner: "质量管理岗",
      display: "67.8%",
      targetDisplay: "≥ 70%",
      progress: 97,
      status: "abnormal",
      trend: "较上月 -1.5%",
      trendTone: "bad"
    },
    {
      id: 6,
      direction: "客户赋能",
      scope: "代理",
      name: "采购成功率",
      definition: "1－（流标标段数量＋终止标段数量）÷ 成交标段数量 × 100%。",
      period: "月度",
      owner: "组长 / 项目经理",
      display: "94.1%",
      targetDisplay: "≥ 92%",
      progress: 100,
      status: "normal",
      trend: "较上月 +0.6%",
      trendTone: "good"
    },
    {
      id: 7,
      direction: "客户赋能",
      scope: "造价",
      name: "审减节资率",
      definition: "（送审金额－审定金额）÷ 送审金额 × 100%。",
      period: "月度",
      owner: "项目经理",
      display: "8.7%",
      targetDisplay: "≥ 8%",
      progress: 100,
      status: "normal",
      trend: "较上月 +0.4%",
      trendTone: "good"
    },
    {
      id: 8,
      direction: "客户赋能",
      scope: "代理",
      name: "有效异议投诉率",
      definition: "有效异议投诉项目数量 ÷ 总异议投诉项目数量 × 100%，该指标越低越好。",
      period: "月度",
      owner: "项目经理",
      display: "12.5%",
      targetDisplay: "≤ 8%",
      progress: 64,
      status: "abnormal",
      trend: "较上月 +3.5%",
      trendTone: "bad"
    },
    {
      id: 9,
      direction: "客户赋能",
      scope: "通用",
      name: "客户满意度",
      definition: "客户满意度评分及一项目一评价的综合结果。",
      period: "季度",
      owner: "组长 / 项目经理",
      display: "92.6分",
      targetDisplay: "≥ 90分",
      progress: 100,
      status: "normal",
      trend: "较上季 +1.8分",
      trendTone: "good"
    },
    {
      id: 10,
      direction: "运营效能",
      scope: "代理",
      name: "人均产能（劳动生产率）",
      definition: "按人员统计代理标段数量，包含招标与非招标业务。",
      period: "月度",
      owner: "项目经理",
      display: "16.8个",
      targetDisplay: "≥ 15个",
      progress: 100,
      status: "normal",
      trend: "较上月 +1.1个",
      trendTone: "good"
    },
    {
      id: 11,
      direction: "运营效能",
      scope: "代理",
      name: "人均产值（人均营收）",
      definition: "全年总产值 ÷ 全年平均人数，重点关注非电力组代理业务。",
      period: "月度",
      owner: "业务组长",
      display: "42.6万元",
      targetDisplay: "≥ 40万元",
      progress: 100,
      status: "normal",
      trend: "同比 +6.2%",
      trendTone: "good"
    },
    {
      id: 12,
      direction: "运营效能",
      scope: "代理",
      name: "单标段成本",
      definition: "单标段实际成本与年度控制目标进行对比分析。",
      period: "月度",
      owner: "项目经理",
      display: "1.08万元",
      targetDisplay: "≤ 1.10万元",
      progress: 100,
      status: "normal",
      trend: "较上月 -0.03万",
      trendTone: "good"
    },
    {
      id: 13,
      direction: "运营效能",
      scope: "代理",
      name: "平台服务费回收率（金额）",
      definition: "实际收到的平台服务费金额 ÷ 应收平台服务费金额 × 100%。",
      period: "月度",
      owner: "项目经理",
      display: "86.3%",
      targetDisplay: "≥ 95%",
      progress: 91,
      status: "abnormal",
      trend: "较上月 -2.4%",
      trendTone: "bad"
    },
    {
      id: 14,
      direction: "运营效能",
      scope: "代理",
      name: "平台服务费回收率（笔数）",
      definition: "实际收到的平台服务费笔数 ÷ 应收平台服务费笔数 × 100%。",
      period: "月度",
      owner: "项目经理",
      display: "91.4%",
      targetDisplay: "≥ 95%",
      progress: 96,
      status: "abnormal",
      trend: "较上月 +1.2%",
      trendTone: "good"
    },
    {
      id: 15,
      direction: "运营效能",
      scope: "代理",
      name: "时效性（保证金退款）",
      definition: "统计投标保证金应退未退笔数，重点关注可能引发舆情的超时事项。",
      period: "月度",
      owner: "项目经理",
      display: "6笔",
      targetDisplay: "0笔",
      progress: 38,
      status: "abnormal",
      trend: "较上月 +2笔",
      trendTone: "bad"
    },
    {
      id: 16,
      direction: "运营效能",
      scope: "代理",
      name: "时效性（专家费发放）",
      definition: "统计专家费应发未及时发放笔数，重点关注可能引发舆情的超时事项。",
      period: "月度",
      owner: "项目经理",
      display: "3笔",
      targetDisplay: "0笔",
      progress: 66,
      status: "abnormal",
      trend: "较上月 -1笔",
      trendTone: "good"
    },
    {
      id: 17,
      direction: "运营效能",
      scope: "通用",
      name: "一次通过率",
      definition: "流程一次审批通过次数 ÷ 总提交流程次数 × 100%。",
      period: "月度",
      owner: "项目经理",
      display: "93.8%",
      targetDisplay: "≥ 92%",
      progress: 100,
      status: "normal",
      trend: "较上月 +1.7%",
      trendTone: "good"
    },
    {
      id: 18,
      direction: "运营效能",
      scope: "代理",
      name: "质量问题率（业务组）",
      definition: "业务组内质量问题标段数量 ÷ 组内成交标段数量 × 100%。",
      period: "月度",
      owner: "业务组长",
      display: "2.8%",
      targetDisplay: "≤ 3%",
      progress: 100,
      status: "normal",
      trend: "较上月 -0.5%",
      trendTone: "good"
    },
    {
      id: 19,
      direction: "运营效能",
      scope: "代理",
      name: "质量问题率（个人）",
      definition: "个人质量问题标段数量 ÷ 个人成交标段数量 × 100%。",
      period: "月度",
      owner: "项目经理 / 质量管理岗",
      display: "3.6%",
      targetDisplay: "≤ 3%",
      progress: 83,
      status: "abnormal",
      trend: "较上月 +0.4%",
      trendTone: "bad"
    },
    {
      id: 20,
      direction: "运营效能",
      scope: "通用",
      name: "质量问题数",
      definition: "统计周期内发现并确认的质量问题数量。",
      period: "月度",
      owner: "项目经理 / 质量管理岗",
      display: "9个",
      targetDisplay: "≤ 10个",
      progress: 100,
      status: "normal",
      trend: "较上月 -3个",
      trendTone: "good"
    },
    {
      id: 21,
      direction: "运营效能",
      scope: "通用",
      name: "质量综合评价",
      definition: "基于质量检查与业务交付情况形成的综合质量得分。",
      period: "季度",
      owner: "全员",
      display: "91.2分",
      targetDisplay: "≥ 90分",
      progress: 100,
      status: "normal",
      trend: "较上季 +1.1分",
      trendTone: "good"
    },
    {
      id: 22,
      direction: "运营效能",
      scope: "造价",
      name: "结算完成率",
      definition: "实际完成结算项目个数 ÷ 计划应完成结算项目个数 × 100%。",
      period: "季度",
      owner: "项目经理",
      display: "88.9%",
      targetDisplay: "≥ 85%",
      progress: 100,
      status: "normal",
      trend: "较上季 +4.5%",
      trendTone: "good"
    },
    {
      id: 23,
      direction: "运营效能",
      scope: "造价",
      name: "新签合同数量",
      definition: "同比上一年度统计新增合同数量，体现业务拓展成果与订单储备规模。",
      period: "月度",
      owner: "项目经理",
      display: "12份",
      targetDisplay: "≥ 10份",
      progress: 100,
      status: "normal",
      trend: "同比 +3份",
      trendTone: "good"
    },
    {
      id: 24,
      direction: "能力建设",
      scope: "通用",
      name: "案例贡献度",
      definition: "按有效案例贡献次数累计评价，可结合次数或排名进行展示。",
      period: "月度",
      owner: "全员",
      display: "18次",
      targetDisplay: "≥ 15次",
      progress: 100,
      status: "normal",
      trend: "较上月 +4次",
      trendTone: "good"
    },
    {
      id: 25,
      direction: "能力建设",
      scope: "通用",
      name: "培训贡献度",
      definition: "按培训贡献次数累计评价，并结合培训满意度是否达标进行展示。",
      period: "月度",
      owner: "全员",
      display: "14次",
      targetDisplay: "≥ 12次",
      progress: 100,
      status: "normal",
      trend: "较上月 +2次",
      trendTone: "good"
    },
    {
      id: 26,
      direction: "能力建设",
      scope: "通用",
      name: "测试通过率",
      definition: "通过专业测试合格数量 ÷ 公司及部门测试组织总数量 × 100%，合格线不低于满分的90%。",
      period: "月度",
      owner: "全员",
      display: "88.6%",
      targetDisplay: "≥ 90%",
      progress: 98,
      status: "abnormal",
      trend: "较上月 +2.4%",
      trendTone: "good"
    },
    {
      id: 27,
      direction: "能力建设",
      scope: "通用",
      name: "持证能力",
      definition: "关注考试、获证、注册等职业能力成果，包括国家职业目录考试、高工评审和从业注册登记。",
      period: "季度",
      owner: "全员",
      display: "36人次",
      targetDisplay: "≥ 32人次",
      progress: 100,
      status: "normal",
      trend: "较上季 +5人次",
      trendTone: "good"
    },
    {
      id: 28,
      direction: "能力建设",
      scope: "通用",
      name: "综合能力",
      definition: "综合统计获奖、专著、公众号推文、专项协同交付等分级成果。",
      period: "季度",
      owner: "全员",
      display: "27项",
      targetDisplay: "≥ 24项",
      progress: 100,
      status: "normal",
      trend: "较上季 +4项",
      trendTone: "good"
    }
  ];

  const STATUS_LABELS = {
    normal: "正常",
    abnormal: "异常"
  };

  const TAB_ICONS = {
    all: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>',
    customer: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z"/></svg>',
    operation: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 2-8 12h7l-1 8 8-12h-7l1-8z"/></svg>',
    ability: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3z"/></svg>'
  };

  const ROLE_ICONS = {
    departmentHead: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V7l8-4 8 4v14M8 10h2M14 10h2M8 14h2M14 14h2M10 21v-3h4v3"/></svg>',
    groupLeader: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M14 15a5 5 0 0 1 7 4.5"/></svg>',
    member: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></svg>'
  };

  const ROLE_VIEWS = [
    {
      id: "departmentHead",
      label: "部门负责人",
      userName: "陈建",
      avatar: "陈",
      ownerTokens: [],
      detailLabel: "部门与业务组明细",
      viewAll: true
    },
    {
      id: "groupLeader",
      label: "业务组长",
      userName: "张明",
      avatar: "张",
      ownerTokens: ["组长", "全员"],
      detailLabel: "业务组与组员明细"
    },
    {
      id: "member",
      label: "组员",
      userName: "李文",
      avatar: "李",
      ownerTokens: ["项目经理", "全员"],
      detailLabel: "个人与所属业务组明细"
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

  let activeRoleId = "departmentHead";
  let activePeriodType = "月度";
  let activeDirection = "全部";
  let activeMetric = null;
  const selectedPeriods = {
    月度: "2026-07",
    季度: "2026-Q2"
  };

  const $ = (id) => document.getElementById(id);

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

  function getCurrentPeriodLabel() {
    const options = PERIOD_OPTIONS[activePeriodType];
    const selected = options.find((option) => option.value === selectedPeriods[activePeriodType]);
    return selected ? selected.label : options[0].label;
  }

  function metricMatchesRole(metric, role = getActiveRole()) {
    if (role.viewAll) return true;
    return role.ownerTokens.some((token) => metric.owner.includes(token));
  }

  function getRolePeriodMetrics() {
    const role = getActiveRole();
    return METRICS.filter((metric) => (
      metricMatchesRole(metric, role) && metric.period === activePeriodType
    ));
  }

  function getStatusCounts(metrics) {
    return metrics.reduce((counts, metric) => {
      counts[metric.status] += 1;
      return counts;
    }, { normal: 0, abnormal: 0 });
  }

  function renderRoleTabs() {
    $("roleViewTabs").innerHTML = ROLE_VIEWS.map((role) => [
      '<button type="button" class="dashboard-role-tab',
      activeRoleId === role.id ? " active" : "",
      '" data-role-id="',
      role.id,
      '" aria-pressed="',
      String(activeRoleId === role.id),
      '">',
      ROLE_ICONS[role.id],
      "<span>",
      escapeHTML(role.label),
      "</span></button>"
    ].join("")).join("");
  }

  function renderPeriodControls() {
    $("periodTypeTabs").querySelectorAll("[data-period-type]").forEach((button) => {
      const isActive = button.dataset.periodType === activePeriodType;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    $("periodValueSelect").innerHTML = PERIOD_OPTIONS[activePeriodType].map((option) => [
      '<option value="',
      option.value,
      '"',
      option.value === selectedPeriods[activePeriodType] ? " selected" : "",
      ">",
      escapeHTML(option.label),
      "</option>"
    ].join("")).join("");
  }

  function renderViewContext() {
    const role = getActiveRole();
    const periodLabel = getCurrentPeriodLabel();
    $("currentUserAvatar").textContent = role.avatar;
    $("currentUserName").textContent = role.userName;
    $("currentUserRole").textContent = role.label;
    $("topbarViewDescription").textContent = role.label + " · " + activePeriodType + "交付指标视图";
    $("pageViewDescription").textContent =
      "按" + role.label + "职责查看" + activePeriodType + "交付指标状态，识别异常并穿透查看" + role.detailLabel + "。";
    $("statusOverviewDescription").textContent =
      "统计口径：" + role.label + " · " + activePeriodType + "指标";
    $("currentPeriodTag").textContent = periodLabel;
    $("abnormalDescription").textContent =
      "展示" + role.label + "在" + periodLabel + "未达到目标的指标";
    $("indicatorPanelTitle").textContent = role.label + activePeriodType + "交付指标";
  }

  function renderSummary() {
    const metrics = getRolePeriodMetrics();
    const counts = getStatusCounts(metrics);
    const passRate = metrics.length ? ((counts.normal / metrics.length) * 100).toFixed(1) : "0.0";
    const role = getActiveRole();
    const summary = [
      {
        label: "当前指标",
        value: metrics.length,
        unit: "项",
        foot: role.label + " · " + activePeriodType,
        trend: "按责任人匹配",
        type: "",
        icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V9M10 19V4M16 19v-7M22 19H2"/></svg>'
      },
      {
        label: "正常指标",
        value: counts.normal,
        unit: "项",
        foot: "达到或优于目标值",
        trend: "状态正常",
        type: "success",
        icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.7 2.7L16.5 9"/></svg>'
      },
      {
        label: "异常指标",
        value: counts.abnormal,
        unit: "项",
        foot: "已突破目标或控制值",
        trend: counts.abnormal ? "需要跟进" : "暂无异常",
        trendClass: counts.abnormal ? "down" : "",
        type: "abnormal",
        icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17h.01"/></svg>'
      },
      {
        label: "指标达标率",
        value: passRate,
        unit: "%",
        foot: "正常指标数 ÷ 当前指标数",
        trend: counts.normal + "项正常",
        type: "",
        icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V9M12 19V5M19 19v-4"/><path d="m4 5 5 4 5-5 6 4"/></svg>'
      }
    ];

    $("summaryCards").innerHTML = summary.map((item) => [
      '<article class="card summary-card ',
      item.type,
      '">',
      '<div class="summary-top"><span class="summary-label">',
      escapeHTML(item.label),
      '</span><span class="summary-icon">',
      item.icon,
      "</span></div>",
      '<div class="summary-value"><strong>',
      escapeHTML(item.value),
      "</strong><span>",
      escapeHTML(item.unit),
      "</span></div>",
      '<div class="summary-foot"><span>',
      escapeHTML(item.foot),
      '</span><span class="summary-trend ',
      item.trendClass || "",
      '">',
      escapeHTML(item.trend),
      "</span></div>",
      "</article>"
    ].join("")).join("");
  }

  function renderStatusOverview() {
    const metrics = getRolePeriodMetrics();
    const counts = getStatusCounts(metrics);
    const total = metrics.length;
    const normalDeg = total ? Math.round((counts.normal / total) * 360) : 0;
    const directionCounts = ["客户赋能", "运营效能", "能力建设"].map((direction) => ({
      direction,
      count: metrics.filter((metric) => metric.direction === direction).length
    }));

    $("statusOverview").innerHTML = [
      '<div class="status-donut-wrap">',
      '<div class="status-donut" style="--normal-deg:',
      normalDeg,
      'deg"><div class="status-donut-center"><strong>',
      total,
      "</strong><span>指标总数</span></div></div>",
      "<span>原型示例数据 · ",
      escapeHTML(getCurrentPeriodLabel()),
      "</span>",
      "</div>",
      '<div class="status-analysis">',
      statusRow("正常", counts.normal, total, "normal"),
      statusRow("异常", counts.abnormal, total, "abnormal"),
      '<div class="direction-summary">',
      directionCounts.map((item) => (
        '<div class="direction-mini"><span>' +
        escapeHTML(item.direction) +
        "</span><strong>" +
        item.count +
        " 项</strong></div>"
      )).join(""),
      "</div>",
      "</div>"
    ].join("");
  }

  function statusRow(label, count, total, type) {
    const width = total ? Math.round((count / total) * 100) : 0;
    return [
      '<div class="status-row"><span class="status-name"><i class="status-dot ',
      type === "normal" ? "" : type,
      '"></i>',
      label,
      '</span><span class="status-bar"><span class="',
      type === "normal" ? "" : type,
      '" style="width:',
      width,
      '%"></span></span><strong class="status-count">',
      count,
      "</strong></div>"
    ].join("");
  }

  function renderAlerts() {
    const alerts = getRolePeriodMetrics().filter((metric) => metric.status === "abnormal");
    if (!alerts.length) {
      $("alertList").innerHTML = [
        '<div class="alert-empty">',
        '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.7 2.7L16.5 9"/></svg>',
        "<strong>当前周期暂无异常指标</strong>",
        "<span>所有指标均达到或优于目标值</span>",
        "</div>"
      ].join("");
      return;
    }

    $("alertList").innerHTML = alerts.map((metric) => [
      '<div class="alert-item abnormal">',
      '<span class="alert-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3 20h18L12 4z"/><path d="M12 9v5M12 17h.01"/></svg></span>',
      '<div class="alert-copy"><strong>',
      escapeHTML(metric.name),
      "</strong><span>",
      escapeHTML(metric.display),
      " · 目标 ",
      escapeHTML(metric.targetDisplay),
      " · ",
      escapeHTML(metric.owner),
      "</span></div>",
      '<button type="button" class="alert-action" data-metric-id="',
      metric.id,
      '"><span aria-hidden="true">↗</span> 查看</button>',
      "</div>"
    ].join("")).join("");
  }

  function renderTabs() {
    const metrics = getRolePeriodMetrics();
    const tabs = [
      { value: "全部", label: "全部指标", icon: TAB_ICONS.all, count: metrics.length },
      {
        value: "客户赋能",
        label: "客户赋能",
        icon: TAB_ICONS.customer,
        count: metrics.filter((metric) => metric.direction === "客户赋能").length
      },
      {
        value: "运营效能",
        label: "运营效能",
        icon: TAB_ICONS.operation,
        count: metrics.filter((metric) => metric.direction === "运营效能").length
      },
      {
        value: "能力建设",
        label: "能力建设",
        icon: TAB_ICONS.ability,
        count: metrics.filter((metric) => metric.direction === "能力建设").length
      }
    ];

    $("indicatorTabs").innerHTML = tabs.map((tab) => [
      '<button type="button" class="indicator-tab',
      activeDirection === tab.value ? " active" : "",
      '" data-direction="',
      escapeHTML(tab.value),
      '">',
      tab.icon,
      "<span>",
      escapeHTML(tab.label),
      "</span><em>",
      tab.count,
      "</em></button>"
    ].join("")).join("");
  }

  function getFilteredMetrics() {
    return getRolePeriodMetrics().filter((metric) => (
      activeDirection === "全部" || metric.direction === activeDirection
    ));
  }

  function renderMetrics() {
    const role = getActiveRole();
    const rolePeriodMetrics = getRolePeriodMetrics();
    const metrics = getFilteredMetrics();
    const grid = $("metricGrid");
    $("indicatorResultText").textContent =
      "当前显示" + metrics.length + "项，共" + rolePeriodMetrics.length + "项；点击指标卡查看口径与" + role.detailLabel;

    if (!metrics.length) {
      grid.innerHTML = '<div class="empty-state"><strong>当前分类暂无指标</strong><span>可切换其他指标分类继续查看。</span></div>';
      return;
    }

    grid.innerHTML = metrics.map((metric) => [
      '<article class="metric-card ',
      metric.status,
      '" role="button" tabindex="0" data-metric-id="',
      metric.id,
      '" aria-label="查看',
      escapeHTML(metric.name),
      '详情">',
      '<div class="metric-head"><div class="metric-title-wrap"><span class="metric-direction">',
      escapeHTML(metric.direction),
      " · ",
      escapeHTML(metric.scope),
      '</span><h3 class="metric-title" title="',
      escapeHTML(metric.name),
      '">',
      escapeHTML(metric.name),
      '</h3></div><span class="status-tag ',
      metric.status,
      '">',
      STATUS_LABELS[metric.status],
      "</span></div>",
      '<div class="metric-value-row"><div class="metric-value"><strong>',
      escapeHTML(metric.display),
      "</strong><span>目标 ",
      escapeHTML(metric.targetDisplay),
      '</span></div><span class="metric-trend ',
      metric.trendTone === "bad" ? "bad" : "",
      '">',
      metric.trendTone === "bad" ? "↓" : "↑",
      " ",
      escapeHTML(metric.trend),
      "</span></div>",
      '<div class="metric-progress"><div class="metric-progress-head"><span>目标完成进度</span><strong>',
      Math.min(metric.progress, 100),
      '%</strong></div><div class="metric-progress-bar"><span style="width:',
      Math.min(metric.progress, 100),
      '%"></span></div></div>',
      '<div class="metric-meta"><span>',
      escapeHTML(metric.owner),
      "</span><span>",
      escapeHTML(metric.period),
      "</span></div>",
      "</article>"
    ].join("")).join("");
  }

  function buildDetailRows(metric) {
    const statusLabel = STATUS_LABELS[metric.status];
    const resultText = metric.status === "normal" ? metric.display : "需跟进";
    const rowsByRole = {
      member: [
        ["本人", metric.display, statusLabel, "李文"],
        ["所属业务组", resultText, statusLabel, "张明"]
      ],
      groupLeader: [
        ["第二业务组", metric.display, statusLabel, "张明"],
        ["组内项目经理", resultText, statusLabel, "李文等"]
      ],
      departmentHead: [
        ["代理业务部", metric.display, statusLabel, "陈建"],
        ["第一业务组", resultText, statusLabel, "李文"],
        ["第二业务组", resultText, statusLabel, "张明"]
      ]
    };
    return rowsByRole[activeRoleId] || rowsByRole.departmentHead;
  }

  function openMetricDrawer(metricId) {
    const metric = METRICS.find((item) => item.id === Number(metricId));
    if (!metric) return;
    const role = getActiveRole();
    activeMetric = metric;
    $("metricDrawerTitle").textContent = metric.name;
    $("metricDrawerSubtitle").textContent =
      role.label + "视图 · " + metric.direction + " · " + metric.scope + " · " + metric.period + "检视";
    const rows = buildDetailRows(metric);
    $("metricDrawerBody").innerHTML = [
      '<div class="drawer-metric-summary">',
      '<div class="drawer-stat"><span>当前值</span><strong>',
      escapeHTML(metric.display),
      "</strong></div>",
      '<div class="drawer-stat"><span>目标值</span><strong>',
      escapeHTML(metric.targetDisplay),
      "</strong></div>",
      '<div class="drawer-stat"><span>指标状态</span><strong>',
      STATUS_LABELS[metric.status],
      "</strong></div>",
      "</div>",
      '<div class="drawer-section"><h3>指标口径</h3><p class="drawer-definition">',
      escapeHTML(metric.definition),
      "</p></div>",
      '<div class="drawer-section"><h3>',
      escapeHTML(role.detailLabel),
      '</h3><table class="detail-table"><thead><tr><th>组织范围</th><th>当前结果</th><th>状态</th><th>负责人</th></tr></thead><tbody>',
      rows.map((row) => (
        "<tr><td>" +
        row.map((cell) => escapeHTML(cell)).join("</td><td>") +
        "</td></tr>"
      )).join(""),
      "</tbody></table></div>",
      '<div class="drawer-section"><h3>责任与检视</h3><p class="drawer-definition">指标责任人：',
      escapeHTML(metric.owner),
      "；当前角色视图：",
      escapeHTML(role.label),
      "；检视周期：",
      escapeHTML(metric.period),
      "。当前页面展示原型示例数据，后续连接具体业务基础数据与异常处理流程。</p></div>"
    ].join("");
    $("metricDrawerMask").classList.remove("hidden");
    $("metricDrawer").classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeMetricDrawer() {
    $("metricDrawerMask").classList.add("hidden");
    $("metricDrawer").classList.add("hidden");
    document.body.style.overflow = "";
    activeMetric = null;
  }

  function renderDashboard() {
    renderRoleTabs();
    renderPeriodControls();
    renderViewContext();
    renderSummary();
    renderStatusOverview();
    renderAlerts();
    renderTabs();
    renderMetrics();
  }

  function bindEvents() {
    $("roleViewTabs").addEventListener("click", (event) => {
      const tab = event.target.closest(".dashboard-role-tab");
      if (!tab || tab.dataset.roleId === activeRoleId) return;
      activeRoleId = tab.dataset.roleId;
      activeDirection = "全部";
      closeMetricDrawer();
      renderDashboard();
      window.showToast("已切换为：" + getActiveRole().label + "视图");
    });

    $("periodTypeTabs").addEventListener("click", (event) => {
      const tab = event.target.closest(".dashboard-period-tab");
      if (!tab || tab.dataset.periodType === activePeriodType) return;
      activePeriodType = tab.dataset.periodType;
      activeDirection = "全部";
      closeMetricDrawer();
      renderDashboard();
      window.showToast("已切换为：" + activePeriodType + "指标");
    });

    $("periodValueSelect").addEventListener("change", (event) => {
      selectedPeriods[activePeriodType] = event.target.value;
      renderDashboard();
      window.showToast("统计周期已切换为：" + getCurrentPeriodLabel());
    });

    $("indicatorTabs").addEventListener("click", (event) => {
      const tab = event.target.closest(".indicator-tab");
      if (!tab) return;
      activeDirection = tab.dataset.direction || "全部";
      renderTabs();
      renderMetrics();
    });

    $("metricGrid").addEventListener("click", (event) => {
      const card = event.target.closest(".metric-card");
      if (card) openMetricDrawer(card.dataset.metricId);
    });

    $("metricGrid").addEventListener("keydown", (event) => {
      const card = event.target.closest(".metric-card");
      if (card && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        openMetricDrawer(card.dataset.metricId);
      }
    });

    $("alertList").addEventListener("click", (event) => {
      const button = event.target.closest("[data-metric-id]");
      if (button) openMetricDrawer(button.dataset.metricId);
    });

    [$("closeMetricDrawer"), $("drawerCloseButton"), $("metricDrawerMask")].forEach((element) => {
      element.addEventListener("click", closeMetricDrawer);
    });

    $("drawerExportButton").addEventListener("click", () => {
      window.showToast(activeMetric ? "正在导出“" + activeMetric.name + "”明细（原型演示）" : "正在导出明细");
    });

    $("drawerDetailButton").addEventListener("click", () => {
      window.showToast("基础数据明细页将在该指标页面设计时继续完善");
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !$("metricDrawer").classList.contains("hidden")) {
        closeMetricDrawer();
      }
    });
  }

  function init() {
    renderDashboard();
    bindEvents();
  }

  window.BUSINESS_DELIVERY_METRICS = METRICS;
  window.BUSINESS_DASHBOARD_ROLE_VIEWS = ROLE_VIEWS;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
