(function setupDashboard() {
  const METRIC_SOURCE = [
    [1,"客户赋能","代理","招标文件审查数量","","以系统记录为准","月度","质量管理岗"],
    [2,"客户赋能","代理","开评标审核数量","","以系统记录为准","月度","质量管理岗"],
    [3,"客户赋能","代理","异议审核数量","","以系统记录为准","月度","质量管理岗"],
    [4,"客户赋能","代理","投诉审核数量","","以系统记录为准","月度","质量管理岗"],
    [5,"客户赋能","代理","异常审核数量","","以系统记录为准","月度","质量管理岗"],
    [6,"客户赋能","代理","采纳建议数量","","以系统记录为准","月度","项目经理"],
    [7,"客户赋能","代理","提出有效建议数量","","以系统记录为准","月度","项目经理"],
    [8,"客户赋能","代理","建议采纳率","采纳建议数量÷提出建议数量×100%","采纳建议数量÷提出建议数量×100%","月度","项目经理"],
    [9,"客户赋能","代理","中高风险采纳率","代理提出的中高风险被客户采纳数 ÷ 提出总数 × 100%","代理提出的中高风险被客户采纳数 ÷ 提出总数 × 100%","月度","项目经理"],
    [10,"客户赋能","代理","完成审查数量","","以线下十项检查或系统线上十项检查记录为准","月度","项目经理"],
    [11,"客户赋能","代理","审查覆盖率","","实际完成审查标段数量÷应审查标段数量×100%","月度","项目经理"],
    [12,"客户赋能","代理","风险识别率（项目经理）","","项目经理审查问题数量÷ （项目经理审查问题数量+质量管理岗审查出问题数量+部门内部抽检问题数量+外部审查出问题数量）×100%","月度","项目经理"],
    [13,"客户赋能","代理","风险识别率（质量审核）","","质量管理岗审查问题数量÷ （部门内部抽检问题数量+部门外部审查问题数量量+质量管理岗审查问题数量）×100%","月度","质量管理岗"],
    [14,"客户赋能","代理","非招代理成交数量","","以发出成交通知书时间为准","月度","项目经理"],
    [15,"客户赋能","代理","非招流标数量","","以审批通过时间为准","月度","项目经理"],
    [16,"客户赋能","代理","非招终止数量","","以审批通过时间为准","月度","项目经理"],
    [17,"客户赋能","代理","招标代理成交数量","","以发出中标通知书时间为准","月度","项目经理"],
    [18,"客户赋能","代理","招标流标数量","","以审批通过时间为准","月度","项目经理"],
    [19,"客户赋能","代理","招标终止数量","","以审批通过时间为准","月度","项目经理"],
    [20,"客户赋能","代理","招标代理异常转非招代理数量","补充，非招系统有“招标转非招”字段","以非招代理发出成交通知书时间为准","月度","项目经理"],
    [21,"客户赋能","代理","采购成功率","","1-（非招/招标流标+非招/招标终止标段数量-招标转非招代理数量）÷非招/招标成交标段数量×100%","月度","组长/项目经理"],
    [22,"客户赋能","造价","审减节资率","","[（送审金额 - 审定金额）÷ 送审金额]×100%","月度","项目经理"],
    [23,"客户赋能","代理","有效异议投诉率","","有效异议投诉的项目数量 ÷ 总异议投诉项目数量 × 100%（越低越好）","月度","项目经理"],
    [24,"客户赋能","通用","客户满意率","","客户满意评价数量÷总回收客户满意度评价数量×100%","季度","组长/项目经理"],
    [25,"客户赋能","通用","客户满意度","","客户满意度评分、一项目一评价综合结果","季度","组长/项目经理"],
    [26,"运营效能","代理","代理招标规模","","按内外部客户分，能细化到业务单元或客户集团","月度","组长/项目经理"],
    [27,"运营效能","代理","代理招标营收","","按内外部客户分，能细化到业务单元或客户集团","月度","组长/项目经理"],
    [28,"运营效能","代理","代理非招规模","","按内外部客户分，能细化到业务单元或客户集团","月度","组长/项目经理"],
    [29,"运营效能","代理","代理非招营收","","按内外部客户分，能细化到业务单元或客户集团","月度","组长/项目经理"],
    [30,"运营效能","代理","进场交易规模","","能细化到业务单元或客户集团","月度","组长/项目经理"],
    [31,"运营效能","代理","进场交易营收","","能细化到业务单元或客户集团","月度","组长/项目经理"],
    [32,"运营效能","代理","境外代理交易规模","","能细化到业务单元或客户集团","月度","组长/项目经理"],
    [33,"运营效能","代理","境外代理营收","","能细化到业务单元或客户集团","月度","组长/项目经理"],
    [34,"运营效能","代理","人均产能（劳动生产率）","","代理标段数量，包含招标、非招","月度","项目经理"],
    [35,"运营效能","代理","人均产值（人均营收）","","全年总产值 ÷ 全年平均人数，重点为非电力组代理业务","月度","组长"],
    [36,"运营效能","代理","单标段成本","","总成本=专家费(含交通/角色/餐饮补贴)+住宿费+餐饮费+交通费；\n单标段成本=总成本/标段数(含成交/评标流程/定标流程标段数）","月度","项目经理"],
    [37,"运营效能","代理","未回收平台服务费数量","","","月度","项目经理"],
    [38,"运营效能","代理","平台服务费回收率（金额）","","服务费收取完成情况，实际收到的服务费金额÷应当收取的服务费金额×100%","月度","项目经理"],
    [39,"运营效能","代理","平台服务费回收率（笔数）","","服务费收取完成情况，实际收到的服务费笔数÷应当收取的服务费笔数×100%","月度","项目经理"],
    [40,"运营效能","代理","人均时效","","所有项目总时长÷项目经理总人数","月度","项目经理"],
    [41,"运营效能","代理","时效异常率","","（异常时效数量÷总流程梳理）×100%","月度","项目经理/质量审核岗/组长"],
    [42,"运营效能","代理","应退未退投标保证金数量","补充，系统自动发起保证金退款项目经理未处理数量及超过投标有效期未办理保证金退款数量","费用中台","月度","项目经理"],
    [43,"运营效能","代理","时效性（保证金退款）","","投标保证金应退未退笔数，易引发舆情","月度","项目经理"],
    [44,"运营效能","代理","时效性（专家费发放）","","专家费应发未及时发放笔数，易引发舆情","月度","项目经理"],
    [45,"运营效能","通用","一次通过率","","流程一次审批通过次数÷总提交流程次数 × 100%","月度","项目经理"],
    [47,"运营效能","代理","质量问题率（业务组）","","组内质量问题标段数量÷组内成交标段数量×100%","月度","组长"],
    [48,"运营效能","代理","质量问题率（个人）","","（质量问题标段数量÷成交标段数量）×100%","月度","项目经理/质量管理岗"],
    [49,"运营效能","通用","质量问题数","补充，业务管理系统需求-质量管理录入","质量问题数量","月度","项目经理/质量管理岗"],
    [50,"运营效能","通用","质量综合评价","补充，业务管理系统需求-质量管理录入","质量得分","季度","全员"],
    [51,"运营效能","造价","结算完成率","","实际完成结算项目个数 ÷ 计划应完成结算项目个数× 100%","季度","项目经理"],
    [52,"运营效能","造价","新签合同数量","补充","同比去年，新增合同，体现业务拓展成果与订单储备规模","月度","项目经理"],
    [53,"能力建设","通用","案例贡献度","补充，业务管理系统需求-专项工作录入","按次数累计加分，或按排名；有效案例数","月度","全员"],
    [54,"能力建设","通用","培训贡献度","补充，业务管理系统需求-专项工作录入","按次数累计加分，或按排名；满意度达标","月度","全员"],
    [55,"能力建设","通用","测试通过率","","（通过专业测试合格数量÷公司及部门测试组织总数量）×100%，测试合格线不低于满分90%","月度","全员"],
    [56,"能力建设","通用","持证能力","补充，业务管理系统需求-专项工作录入","考试、获证、注册（关注注册与评价类国家职业目录考试、高工评审、从业注册登记）","季度","全员"],
    [57,"能力建设","通用","综合能力","补充，业务管理系统需求-专项工作录入","获奖、专著、公众号推文、专项协同交付等，分级","季度","全员"],
    [58,"客户赋能","通用","客户培训","补充，业务管理系统需求-专项工作录入","结合客户需求，提供专业培训","月度","组长/质量管理岗"],
    [59,"客户赋能","通用","专项报告","补充，业务管理系统需求-专项工作录入","定期为客户输出采购专项报告","月度","组长/质量管理岗"],
  ];

  const DEMO_VALUES = {
    1: ["126项","≥ 120项",100,"normal","较上月 +11项","good"],
    2: ["92项","≥ 90项",100,"normal","较上月 +7项","good"],
    3: ["18项","≥ 20项",90,"abnormal","较上月 +2项","good"],
    4: ["7项","≥ 8项",88,"abnormal","较上月 +1项","good"],
    5: ["11项","≥ 10项",100,"normal","较上月 +2项","good"],
    6: ["142项","≥ 135项",100,"normal","较上月 +12项","good"],
    7: ["164项","≥ 160项",100,"normal","较上月 +15项","good"],
    8: ["86.5%","≥ 85%",100,"normal","较上月 +2.1%","good"],
    9: ["78.0%","≥ 80%",97,"abnormal","较上月 +1.3%","good"],
    10: ["215项","≥ 210项",100,"normal","较上月 +18项","good"],
    11: ["96.2%","≥ 95%",100,"normal","较上月 +0.8%","good"],
    12: ["72.4%","≥ 70%",100,"normal","较上月 +3.2%","good"],
    13: ["67.8%","≥ 70%",97,"abnormal","较上月 -1.5%","bad"],
    14: ["86项","≥ 80项",100,"normal","较上月 +9项","good"],
    15: ["5项","≤ 6项",100,"normal","较上月 -1项","good"],
    16: ["3项","≤ 2项",67,"abnormal","较上月 +1项","bad"],
    17: ["54项","≥ 50项",100,"normal","较上月 +4项","good"],
    18: ["4项","≤ 5项",100,"normal","较上月 -2项","good"],
    19: ["2项","≤ 2项",100,"normal","与上月持平","good"],
    20: ["3项","计划 3项",100,"normal","较上月 +1项","good"],
    21: ["94.1%","≥ 92%",100,"normal","较上月 +0.6%","good"],
    22: ["8.7%","≥ 8%",100,"normal","较上月 +0.4%","good"],
    23: ["12.5%","≤ 8%",64,"abnormal","较上月 +3.5%","bad"],
    24: ["93.4%","≥ 92%",100,"normal","较上季 +1.2%","good"],
    25: ["92.6分","≥ 90分",100,"normal","较上季 +1.8分","good"],
    26: ["12.8亿元","≥ 12亿元",100,"normal","同比 +8.5%","good"],
    27: ["1.46亿元","≥ 1.50亿元",97,"abnormal","同比 +4.2%","good"],
    28: ["8.6亿元","≥ 8亿元",100,"normal","同比 +6.7%","good"],
    29: ["0.92亿元","≥ 0.90亿元",100,"normal","同比 +5.1%","good"],
    30: ["6.4亿元","≥ 6亿元",100,"normal","同比 +7.3%","good"],
    31: ["0.68亿元","≥ 0.70亿元",97,"abnormal","同比 +2.8%","good"],
    32: ["2.1亿元","≥ 2亿元",100,"normal","同比 +9.6%","good"],
    33: ["0.24亿元","≥ 0.25亿元",96,"abnormal","同比 +3.1%","good"],
    34: ["16.8个","≥ 15个",100,"normal","较上月 +1.1个","good"],
    35: ["42.6万元","≥ 40万元",100,"normal","同比 +6.2%","good"],
    36: ["1.08万元","≤ 1.10万元",100,"normal","较上月 -0.03万","good"],
    37: ["18笔","≤ 15笔",83,"abnormal","较上月 +3笔","bad"],
    38: ["86.3%","≥ 95%",91,"abnormal","较上月 -2.4%","bad"],
    39: ["91.4%","≥ 95%",96,"abnormal","较上月 +1.2%","good"],
    40: ["18.6天","≤ 20天",100,"normal","较上月 -1.4天","good"],
    41: ["4.8%","≤ 4%",83,"abnormal","较上月 +0.6%","bad"],
    42: ["6笔","0笔",38,"abnormal","较上月 +2笔","bad"],
    43: ["6笔","0笔",38,"abnormal","较上月 +2笔","bad"],
    44: ["3笔","0笔",66,"abnormal","较上月 -1笔","good"],
    45: ["93.8%","≥ 92%",100,"normal","较上月 +1.7%","good"],
    47: ["2.8%","≤ 3%",100,"normal","较上月 -0.5%","good"],
    48: ["3.6%","≤ 3%",83,"abnormal","较上月 +0.4%","bad"],
    49: ["9个","≤ 10个",100,"normal","较上月 -3个","good"],
    50: ["91.2分","≥ 90分",100,"normal","较上季 +1.1分","good"],
    51: ["88.9%","≥ 85%",100,"normal","较上季 +4.5%","good"],
    52: ["12份","≥ 10份",100,"normal","同比 +3份","good"],
    53: ["18次","≥ 15次",100,"normal","较上月 +4次","good"],
    54: ["14次","≥ 12次",100,"normal","较上月 +2次","good"],
    55: ["88.6%","≥ 90%",98,"abnormal","较上月 +2.4%","good"],
    56: ["36人次","≥ 32人次",100,"normal","较上季 +5人次","good"],
    57: ["27项","≥ 24项",100,"normal","较上季 +4项","good"],
    58: ["11场","≥ 10场",100,"normal","较上月 +2场","good"],
    59: ["5份","≥ 6份",83,"abnormal","较上月 +1份","good"],
  };

  const METRICS = METRIC_SOURCE.map(([id, direction, scope, name, calculation, definition, period, owner]) => {
    const [display, targetDisplay, progress, status, trend, trendTone] = DEMO_VALUES[id];
    return {
      id,
      direction,
      scope,
      name,
      calculation,
      definition,
      period,
      owner,
      display,
      targetDisplay,
      progress,
      status,
      trend,
      trendTone
    };
  });

  const STATUS_LABELS = {
    normal: "正常",
    abnormal: "异常"
  };
  const PAGE_SIZE = 9;

  const ROLE_ICONS = {
    projectManager: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></svg>',
    groupLeader: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M14 15a5 5 0 0 1 7 4.5"/></svg>',
    qualityAudit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.7 2.8 8 7 10 4.2-2 7-5.3 7-10V6l-7-3z"/><path d="m9 12 2 2 4-5"/></svg>',
    departmentHead: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V7l8-4 8 4v14M8 10h2M14 10h2M8 14h2M14 14h2M10 21v-3h4v3"/></svg>'
  };

  const ROLE_VIEWS = [
    {
      id: "projectManager",
      label: "项目经理",
      userName: "李文",
      avatar: "李",
      ownerTokens: ["项目经理", "全员"],
      detailLabel: "个人与所属业务组明细"
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
      id: "qualityAudit",
      label: "质量审核",
      userName: "王敏",
      avatar: "王",
      ownerTokens: ["质量管理岗", "质量审核岗", "全员"],
      detailLabel: "质量审核与关联业务组明细"
    },
    {
      id: "departmentHead",
      label: "部门负责人",
      userName: "陈建",
      avatar: "陈",
      ownerTokens: [],
      detailLabel: "部门与业务组明细",
      viewAll: true
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

  let activeRoleId = "projectManager";
  let activePeriodType = "月度";
  let activeDirection = "全部";
  let activeMetricName = "";
  let activeMetricStatus = "all";
  let currentPage = 1;
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
      { value: "全部", label: "全部指标", count: metrics.length },
      {
        value: "客户赋能",
        label: "客户赋能",
        count: metrics.filter((metric) => metric.direction === "客户赋能").length
      },
      {
        value: "运营效能",
        label: "运营效能",
        count: metrics.filter((metric) => metric.direction === "运营效能").length
      },
      {
        value: "能力建设",
        label: "能力建设",
        count: metrics.filter((metric) => metric.direction === "能力建设").length
      }
    ];

    $("indicatorTabs").innerHTML = tabs.map((tab) => [
      '<button type="button" class="indicator-tab',
      activeDirection === tab.value ? " active" : "",
      '" data-direction="',
      escapeHTML(tab.value),
      '">',
      "<span>",
      escapeHTML(tab.label),
      "</span><em>",
      tab.count,
      "</em></button>"
    ].join("")).join("");
  }

  function getFilteredMetrics() {
    const nameQuery = activeMetricName.trim().toLocaleLowerCase("zh-CN");
    return getRolePeriodMetrics().filter((metric) => {
      const matchesDirection = activeDirection === "全部" || metric.direction === activeDirection;
      const matchesName = !nameQuery || metric.name.toLocaleLowerCase("zh-CN").includes(nameQuery);
      const matchesStatus = activeMetricStatus === "all" || metric.status === activeMetricStatus;
      return matchesDirection && matchesName && matchesStatus;
    });
  }

  function hasActiveMetricFilters() {
    return Boolean(activeMetricName.trim() || activeMetricStatus !== "all");
  }

  function renderMetricFilterControls(resultCount) {
    if ($("metricNameQuery").value !== activeMetricName) {
      $("metricNameQuery").value = activeMetricName;
    }
    $("metricStatusFilter").value = activeMetricStatus;
    $("metricFilterResultCount").textContent = "筛选结果 " + resultCount + " 项";
    $("metricFilterReset").classList.toggle("hidden", !hasActiveMetricFilters());
  }

  function renderPagination(total, pageCount) {
    const pagination = $("metricPagination");
    if (total <= PAGE_SIZE || pageCount <= 1) {
      pagination.innerHTML = "";
      pagination.classList.add("hidden");
      return;
    }

    pagination.classList.remove("hidden");
    pagination.innerHTML = [
      '<span class="dashboard-page-total">共 ',
      total,
      ' 项</span><button type="button" class="dashboard-page-button" data-page-action="prev"',
      currentPage === 1 ? " disabled" : "",
      '><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>上一页</button>',
      '<div class="dashboard-page-numbers" aria-label="页码">',
      Array.from({ length: pageCount }, (_, index) => {
        const page = index + 1;
        return [
          '<button type="button" class="dashboard-page-number',
          page === currentPage ? " active" : "",
          '" data-page="',
          page,
          '" aria-label="第',
          page,
          '页" aria-current="',
          page === currentPage ? "page" : "false",
          '">',
          page,
          "</button>"
        ].join("");
      }).join(""),
      '</div><button type="button" class="dashboard-page-button" data-page-action="next"',
      currentPage === pageCount ? " disabled" : "",
      '>下一页<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>'
    ].join("");
  }

  function renderMetrics() {
    const role = getActiveRole();
    const metrics = getFilteredMetrics();
    const grid = $("metricGrid");

    if (!metrics.length) {
      currentPage = 1;
      const filteredEmpty = hasActiveMetricFilters();
      $("indicatorResultText").textContent = filteredEmpty
        ? "未找到符合当前名称或状态条件的指标。"
        : "当前工作方向暂无可见指标，请切换其他分类。";
      grid.innerHTML = [
        '<div class="empty-state"><strong>',
        filteredEmpty ? "未找到符合当前条件的交付指标" : "当前分类暂无指标",
        "</strong><span>",
        filteredEmpty ? "请调整指标名称或状态筛选条件。" : "请切换其他工作方向查看交付指标。",
        "</span>",
        filteredEmpty
          ? '<button type="button" class="secondary-btn empty-reset-button" data-filter-reset><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M8 11v6M12 11v6M16 11v6M6 7l1 14h10l1-14"/></svg><span>清空筛选</span></button>'
          : "",
        "</div>"
      ].join("");
      renderPagination(0, 0);
      renderMetricFilterControls(0);
      return;
    }

    const pageCount = Math.ceil(metrics.length / PAGE_SIZE);
    currentPage = Math.min(Math.max(currentPage, 1), pageCount);
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, metrics.length);
    const pageMetrics = metrics.slice(start, end);
    $("indicatorResultText").textContent =
      "匹配" + metrics.length + "项，当前显示第" + (start + 1) + "–" + end + "项；点击指标卡查看口径与" + role.detailLabel;

    grid.innerHTML = pageMetrics.map((metric) => [
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
    renderPagination(metrics.length, pageCount);
    renderMetricFilterControls(metrics.length);
  }

  function buildDetailRows(metric) {
    const statusLabel = STATUS_LABELS[metric.status];
    const resultText = metric.status === "normal" ? metric.display : "需跟进";
    const rowsByRole = {
      projectManager: [
        ["本人", metric.display, statusLabel, "李文"],
        ["所属业务组", resultText, statusLabel, "张明"]
      ],
      groupLeader: [
        ["第二业务组", metric.display, statusLabel, "张明"],
        ["组内项目经理", resultText, statusLabel, "李文等"]
      ],
      qualityAudit: [
        ["质量审核岗", metric.display, statusLabel, "王敏"],
        ["关联业务组", resultText, statusLabel, "相关业务组长"]
      ],
      departmentHead: [
        ["代理业务部", metric.display, statusLabel, "陈建"],
        ["第一业务组", resultText, statusLabel, "李文"],
        ["第二业务组", resultText, statusLabel, "张明"]
      ]
    };
    return rowsByRole[activeRoleId] || rowsByRole.departmentHead;
  }

  function renderMetricDefinitionSections(metric) {
    const calculation = metric.calculation.trim();
    const definition = metric.definition.trim();
    const sections = [];
    if (calculation) {
      sections.push(
        '<div class="drawer-section"><h3>计算逻辑</h3><p class="drawer-definition">' +
        escapeHTML(calculation).replace(/\r?\n/g, "<br>") +
        "</p></div>"
      );
    }
    if (definition && definition !== calculation) {
      sections.push(
        '<div class="drawer-section"><h3>指标说明</h3><p class="drawer-definition">' +
        escapeHTML(definition).replace(/\r?\n/g, "<br>") +
        "</p></div>"
      );
    }
    if (!sections.length) {
      sections.push(
        '<div class="drawer-section"><h3>指标说明</h3><p class="drawer-definition">源需求暂未提供计算逻辑或详细说明。</p></div>'
      );
    }
    return sections.join("");
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
      renderMetricDefinitionSections(metric),
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

  function resetMetricFilters(focusSearch) {
    activeMetricName = "";
    activeMetricStatus = "all";
    currentPage = 1;
    renderMetrics();
    if (focusSearch) $("metricNameQuery").focus();
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
      currentPage = 1;
      closeMetricDrawer();
      renderDashboard();
      window.showToast("已切换为：" + getActiveRole().label + "视图");
    });

    $("periodTypeTabs").addEventListener("click", (event) => {
      const tab = event.target.closest(".dashboard-period-tab");
      if (!tab || tab.dataset.periodType === activePeriodType) return;
      activePeriodType = tab.dataset.periodType;
      activeDirection = "全部";
      currentPage = 1;
      closeMetricDrawer();
      renderDashboard();
      window.showToast("已切换为：" + activePeriodType + "指标");
    });

    $("periodValueSelect").addEventListener("change", (event) => {
      selectedPeriods[activePeriodType] = event.target.value;
      currentPage = 1;
      renderDashboard();
      window.showToast("统计周期已切换为：" + getCurrentPeriodLabel());
    });

    $("indicatorTabs").addEventListener("click", (event) => {
      const tab = event.target.closest(".indicator-tab");
      if (!tab) return;
      activeDirection = tab.dataset.direction || "全部";
      currentPage = 1;
      renderTabs();
      renderMetrics();
    });

    $("metricNameQuery").addEventListener("input", (event) => {
      activeMetricName = event.target.value;
      currentPage = 1;
      renderMetrics();
    });

    $("metricStatusFilter").addEventListener("change", (event) => {
      activeMetricStatus = event.target.value;
      currentPage = 1;
      renderMetrics();
    });

    $("metricFilterReset").addEventListener("click", () => {
      resetMetricFilters(true);
    });

    $("metricGrid").addEventListener("click", (event) => {
      if (event.target.closest("[data-filter-reset]")) {
        resetMetricFilters(true);
        return;
      }
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

    $("metricPagination").addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button || button.disabled) return;
      const metrics = getFilteredMetrics();
      const pageCount = Math.ceil(metrics.length / PAGE_SIZE);
      if (button.dataset.page) {
        currentPage = Number(button.dataset.page);
      } else if (button.dataset.pageAction === "prev") {
        currentPage = Math.max(1, currentPage - 1);
      } else if (button.dataset.pageAction === "next") {
        currentPage = Math.min(pageCount, currentPage + 1);
      }
      renderMetrics();
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
