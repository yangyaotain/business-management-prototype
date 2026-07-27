(function setupCustomerEvaluation() {
  const PAGE_SIZE = 8;
  const ROLE_ICONS = {
    department: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V7l8-4 8 4v14M8 10h2M14 10h2M8 14h2M14 14h2M10 21v-3h4v3"/></svg>',
    leader: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M14 15a5 5 0 0 1 7 4.5"/></svg>',
    member: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></svg>'
  };
  const ROLE_VIEWS = [
    { id: "departmentHead", label: "部门负责人", userName: "陈建", avatar: "陈", icon: ROLE_ICONS.department },
    { id: "groupLeader", label: "业务组长", userName: "张明", avatar: "张", group: "招标二组", icon: ROLE_ICONS.leader },
    { id: "member", label: "组员", userName: "周启航", avatar: "周", group: "招标二组", manager: "周启航", icon: ROLE_ICONS.member }
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
      { value: "2026-Q2", label: "2026年二季度" },
      { value: "2026-Q1", label: "2026年一季度" },
      { value: "2025-Q4", label: "2025年四季度" },
      { value: "2025-Q3", label: "2025年三季度" }
    ]
  };
  const RATING_META = [
    { name: "优秀", className: "excellent", color: "#22a06b", range: "9—10分" },
    { name: "良好", className: "good", color: "#1677ff", range: "8—8.9分" },
    { name: "一般", className: "average", color: "#f59e0b", range: "6—7.9分" },
    { name: "低分", className: "low", color: "#ef4444", range: "6分以下" }
  ];
  const RECORDS = [
    {
      id: "CE202601001",
      date: "2026-01-08",
      project: "海丰扩建项目主设备采购",
      section: "汽轮发电机组采购标段",
      group: "招标一组",
      manager: "李妍",
      businessType: "招标代理",
      customer: "华润电力",
      score: 9.4,
      problems: [],
      feedback: "项目团队组织有序，关键节点沟通及时，招标文件质量较高。"
    },
    {
      id: "CE202601002",
      date: "2026-01-16",
      project: "新能源场站运维服务采购",
      section: "华南区域运维服务标段",
      group: "招标二组",
      manager: "周启航",
      businessType: "招标代理",
      customer: "华润新能源",
      score: 8.6,
      problems: ["沟通协调"],
      feedback: "整体服务专业，跨部门信息同步可进一步提前。"
    },
    {
      id: "CE202601003",
      date: "2026-01-25",
      project: "总部办公区改造工程",
      section: "全过程造价咨询标段",
      group: "造价咨询组",
      manager: "陈宇航",
      businessType: "造价咨询",
      customer: "华润置地",
      score: 9.1,
      problems: [],
      feedback: "造价分析清晰，成果文件完整，关键风险提示准确。"
    },
    {
      id: "CE202602001",
      date: "2026-02-07",
      project: "燃气轮机备品备件集采",
      section: "核心备件采购标段",
      group: "招标一组",
      manager: "李妍",
      businessType: "招标代理",
      customer: "华润燃气",
      score: 9.0,
      problems: [],
      feedback: "采购节奏把控合理，问题答复及时，整体满意。"
    },
    {
      id: "CE202602002",
      date: "2026-02-18",
      project: "区域物流运输服务采购",
      section: "西南区域运输服务标段",
      group: "招标二组",
      manager: "吴思远",
      businessType: "招标代理",
      customer: "华润万家",
      score: 7.8,
      problems: ["响应时效"],
      feedback: "业务处理较规范，但澄清问题的首次回复速度需要提升。"
    },
    {
      id: "CE202602003",
      date: "2026-02-26",
      project: "商业综合体机电改造",
      section: "工程量清单及控制价编制",
      group: "造价咨询组",
      manager: "林晓雯",
      businessType: "造价咨询",
      customer: "华润商业",
      score: 8.8,
      problems: [],
      feedback: "成果深度符合要求，现场配合主动，过程沟通顺畅。"
    },
    {
      id: "CE202603001",
      date: "2026-03-05",
      project: "储能系统设备采购",
      section: "储能电池及配套系统标段",
      group: "招标一组",
      manager: "赵一宁",
      businessType: "招标代理",
      customer: "华润电力",
      score: 9.6,
      problems: [],
      feedback: "专业建议针对性强，项目推进效率高，节点管理清晰。"
    },
    {
      id: "CE202603002",
      date: "2026-03-14",
      project: "食品工厂生产线改造",
      section: "自动化设备采购标段",
      group: "招标二组",
      manager: "吴思远",
      businessType: "招标代理",
      customer: "华润五丰",
      score: 5.8,
      problems: ["响应时效", "沟通协调"],
      feedback: "需求变更后的响应不够及时，关键信息在相关方之间传递存在延迟。"
    },
    {
      id: "CE202603003",
      date: "2026-03-27",
      project: "住宅项目精装修工程",
      section: "结算审核咨询标段",
      group: "造价咨询组",
      manager: "陈宇航",
      businessType: "造价咨询",
      customer: "华润置地",
      score: 8.2,
      problems: ["成果质量"],
      feedback: "审核过程严谨，部分成果附件的索引和说明可以进一步完善。"
    },
    {
      id: "CE202604001",
      date: "2026-04-03",
      project: "风电场箱变设备采购",
      section: "箱式变压器采购标段",
      group: "招标一组",
      manager: "赵一宁",
      businessType: "招标代理",
      customer: "华润新能源",
      score: 9.2,
      problems: [],
      feedback: "招标组织严谨，技术澄清安排合理，项目目标顺利达成。"
    },
    {
      id: "CE202604002",
      date: "2026-04-11",
      project: "冷链仓储服务采购",
      section: "华东冷链仓储标段",
      group: "招标二组",
      manager: "周启航",
      businessType: "招标代理",
      customer: "华润万家",
      score: 8.5,
      problems: ["现场服务"],
      feedback: "整体配合良好，现场评审期间人员支持可更加充分。"
    },
    {
      id: "CE202604003",
      date: "2026-04-19",
      project: "产业园一期建设工程",
      section: "全过程造价咨询标段",
      group: "造价咨询组",
      manager: "林晓雯",
      businessType: "造价咨询",
      customer: "华润产业发展",
      score: 7.4,
      problems: ["专业能力"],
      feedback: "常规工作完成较好，复杂变更事项的专业分析深度仍需加强。"
    },
    {
      id: "CE202604004",
      date: "2026-04-28",
      project: "光伏组件年度框架采购",
      section: "高效光伏组件采购标段",
      group: "招标一组",
      manager: "李妍",
      businessType: "招标代理",
      customer: "华润电力",
      score: 9.7,
      problems: [],
      feedback: "服务过程透明高效，关键风险控制到位，整体表现优秀。"
    },
    {
      id: "CE202605001",
      date: "2026-05-06",
      project: "数据中心网络设备采购",
      section: "核心交换设备采购标段",
      group: "招标一组",
      manager: "赵一宁",
      businessType: "招标代理",
      customer: "华润数科",
      score: 8.9,
      problems: [],
      feedback: "业务理解准确，文件编制规范，推进过程顺畅。"
    },
    {
      id: "CE202605002",
      date: "2026-05-13",
      project: "物业保洁服务集采",
      section: "北方区域保洁服务标段",
      group: "招标二组",
      manager: "周启航",
      businessType: "招标代理",
      customer: "华润物业",
      score: 6.8,
      problems: ["响应时效"],
      feedback: "项目整体完成，但两次澄清回复超过预期时间，影响内部决策节奏。"
    },
    {
      id: "CE202605003",
      date: "2026-05-21",
      project: "商业街区提升改造",
      section: "目标成本测算咨询标段",
      group: "造价咨询组",
      manager: "陈宇航",
      businessType: "造价咨询",
      customer: "华润商业",
      score: 9.3,
      problems: [],
      feedback: "成本测算逻辑清楚，关键指标解释充分，成果实用性强。"
    },
    {
      id: "CE202605004",
      date: "2026-05-29",
      project: "智慧能源平台开发",
      section: "平台建设服务采购标段",
      group: "招标一组",
      manager: "李妍",
      businessType: "招标代理",
      customer: "华润电力",
      score: 8.1,
      problems: ["沟通协调"],
      feedback: "招标执行规范，建议进一步明确多方协作中的信息确认机制。"
    },
    {
      id: "CE202606001",
      date: "2026-06-04",
      project: "燃煤机组灵活性改造",
      section: "改造工程总承包招标标段",
      group: "招标一组",
      manager: "赵一宁",
      businessType: "招标代理",
      customer: "华润电力",
      score: 9.5,
      problems: [],
      feedback: "项目经理专业负责，复杂事项组织协调有序，服务质量优秀。"
    },
    {
      id: "CE202606002",
      date: "2026-06-12",
      project: "总部园区景观改造",
      section: "全过程造价咨询标段",
      group: "造价咨询组",
      manager: "林晓雯",
      businessType: "造价咨询",
      customer: "华润集团",
      score: 8.4,
      problems: ["成果质量"],
      feedback: "整体成果符合预期，个别测算表的口径说明需要补充。"
    },
    {
      id: "CE202606003",
      date: "2026-06-20",
      project: "区域员工体检服务采购",
      section: "华南区域体检服务标段",
      group: "招标二组",
      manager: "吴思远",
      businessType: "招标代理",
      customer: "华润医药",
      score: 5.6,
      problems: ["专业能力", "沟通协调"],
      feedback: "需求边界理解出现偏差，评审前沟通不充分，建议加强方案复核。"
    },
    {
      id: "CE202606004",
      date: "2026-06-28",
      project: "医药物流设备采购",
      section: "自动分拣设备采购标段",
      group: "招标一组",
      manager: "李妍",
      businessType: "招标代理",
      customer: "华润医药",
      score: 9.0,
      problems: ["现场服务"],
      feedback: "项目执行高效，现场评审支持总体良好，设备演示环节可再提前准备。"
    },
    {
      id: "CE202607001",
      date: "2026-07-05",
      project: "海上风电运维船采购",
      section: "专业运维船舶采购标段",
      group: "招标一组",
      manager: "赵一宁",
      businessType: "招标代理",
      customer: "华润新能源",
      score: 9.6,
      problems: [],
      feedback: "方案策划充分，市场分析专业，项目各节点衔接顺畅。"
    },
    {
      id: "CE202607002",
      date: "2026-07-14",
      project: "商业综合体安保服务",
      section: "西南区域安保服务标段",
      group: "招标二组",
      manager: "周启航",
      businessType: "招标代理",
      customer: "华润商业",
      score: 8.7,
      problems: ["响应时效"],
      feedback: "整体组织规范，临时补充材料的确认速度仍有提升空间。"
    },
    {
      id: "CE202607003",
      date: "2026-07-22",
      project: "城市更新配套工程",
      section: "结算审核咨询标段",
      group: "造价咨询组",
      manager: "陈宇航",
      businessType: "造价咨询",
      customer: "华润置地",
      score: 7.6,
      problems: ["成果质量", "现场服务"],
      feedback: "核心结论基本准确，现场资料核对和成果复核细节需要加强。"
    }
  ];
  const HISTORICAL_RECORDS = [
    ["CE202507001", "2025-07-09", "区域数据专线服务采购", "华南数据专线服务标段", "招标一组", "李妍", "招标代理", "华润数科", 9.1, [], "项目推进顺畅，服务响应及时。"],
    ["CE202507002", "2025-07-21", "住宅项目景观工程", "结算审核咨询标段", "造价咨询组", "陈宇航", "造价咨询", "华润置地", 8.3, ["成果质量"], "整体成果符合要求，部分说明可进一步细化。"],
    ["CE202508001", "2025-08-06", "新能源备件框架采购", "风机备件采购标段", "招标一组", "赵一宁", "招标代理", "华润新能源", 9.4, [], "采购组织规范，节点衔接高效。"],
    ["CE202508002", "2025-08-19", "园区物业服务采购", "综合物业服务标段", "招标二组", "周启航", "招标代理", "华润物业", 7.7, ["响应时效"], "澄清回复时间仍有提升空间。"],
    ["CE202509001", "2025-09-11", "商业项目机电改造", "全过程造价咨询标段", "造价咨询组", "林晓雯", "造价咨询", "华润商业", 8.8, [], "专业服务到位，配合度较高。"],
    ["CE202509002", "2025-09-24", "区域食材供应集采", "华东食材供应标段", "招标二组", "吴思远", "招标代理", "华润万家", 6.9, ["沟通协调"], "多方信息确认需要更加及时。"],
    ["CE202510001", "2025-10-08", "光伏逆变器设备采购", "集中式逆变器采购标段", "招标一组", "李妍", "招标代理", "华润电力", 9.3, [], "文件质量高，风险提示充分。"],
    ["CE202510002", "2025-10-22", "总部办公楼修缮工程", "控制价编制咨询标段", "造价咨询组", "陈宇航", "造价咨询", "华润集团", 8.1, ["现场服务"], "成果符合要求，现场支持可进一步加强。"],
    ["CE202511001", "2025-11-07", "员工补充医疗服务采购", "年度医疗服务标段", "招标二组", "周启航", "招标代理", "华润医药", 8.7, [], "整体组织规范，沟通顺畅。"],
    ["CE202511002", "2025-11-20", "产业园弱电工程采购", "智能化工程标段", "招标一组", "赵一宁", "招标代理", "华润产业发展", 5.7, ["专业能力", "沟通协调"], "需求理解和方案复核需要加强。"],
    ["CE202512001", "2025-12-05", "商业综合体改造工程", "结算审核咨询标段", "造价咨询组", "林晓雯", "造价咨询", "华润商业", 9.0, [], "审核过程严谨，成果表达清晰。"],
    ["CE202512002", "2025-12-18", "年度信息设备集采", "终端设备采购标段", "招标一组", "李妍", "招标代理", "华润数科", 8.4, ["成果质量"], "采购组织有序，附件索引需要进一步完善。"]
  ].map((row) => ({
    id: row[0],
    date: row[1],
    project: row[2],
    section: row[3],
    group: row[4],
    manager: row[5],
    businessType: row[6],
    customer: row[7],
    score: row[8],
    problems: row[9],
    feedback: row[10]
  }));
  RECORDS.push(...HISTORICAL_RECORDS);
  const SUMMARY_ICONS = {
    average:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3z"/></svg>',
    count:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>',
    excellent:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.6 2.6L16.5 9"/></svg>',
    problem:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3 20h18L12 4z"/><path d="M12 9v5M12 17h.01"/></svg>'
  };

  let activeRoleId = "departmentHead";
  let activePeriodType = "月度";
  const selectedPeriods = {
    月度: "2026-07",
    季度: "2026-Q2"
  };
  let appliedFilters = {
    period: selectedPeriods.月度,
    group: "全部",
    businessType: "全部",
    manager: "全部",
    rating: "全部"
  };
  let chartFilter = null;
  let currentPage = 1;

  function $(id) {
    return document.getElementById(id);
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    }[character]));
  }

  function getActiveRole() {
    return ROLE_VIEWS.find((role) => role.id === activeRoleId) || ROLE_VIEWS[0];
  }

  function formatDate(value) {
    const parts = value.split("-");
    return parts[0] + "-" + parts[1] + "-" + parts[2];
  }

  function formatScore(value) {
    return Number(value || 0).toFixed(1);
  }

  function getRating(score) {
    if (score >= 9) return RATING_META[0];
    if (score >= 8) return RATING_META[1];
    if (score >= 6) return RATING_META[2];
    return RATING_META[3];
  }

  function matchesPeriod(date, period) {
    if (!period.includes("-Q")) return date.startsWith(period);
    const parts = period.split("-Q");
    const year = Number(parts[0]);
    const quarter = Number(parts[1]);
    const recordYear = Number(date.slice(0, 4));
    const recordMonth = Number(date.slice(5, 7));
    return recordYear === year && Math.ceil(recordMonth / 3) === quarter;
  }

  function getBaseRecords() {
    const role = getActiveRole();
    return RECORDS.filter((record) => {
      if (role.group && record.group !== role.group) return false;
      if (role.manager && record.manager !== role.manager) return false;
      if (!matchesPeriod(record.date, appliedFilters.period)) return false;
      if (appliedFilters.group !== "全部" && record.group !== appliedFilters.group) return false;
      if (appliedFilters.businessType !== "全部" && record.businessType !== appliedFilters.businessType) return false;
      if (appliedFilters.manager !== "全部" && record.manager !== appliedFilters.manager) return false;
      if (appliedFilters.rating !== "全部" && getRating(record.score).name !== appliedFilters.rating) return false;
      return true;
    }).sort((a, b) => b.date.localeCompare(a.date));
  }

  function getDetailRecords(records) {
    if (!chartFilter) return records.slice();
    if (chartFilter.type === "rating") {
      return records.filter((record) => getRating(record.score).name === chartFilter.value);
    }
    return records.filter((record) => record.problems.includes(chartFilter.value));
  }

  function averageScore(records) {
    if (!records.length) return 0;
    return records.reduce((sum, record) => sum + record.score, 0) / records.length;
  }

  function emptyState(title, description) {
    return [
      '<div class="ce-empty">',
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5z"/><path d="M8 9h8M8 13h5"/></svg>',
      "<strong>",
      escapeHTML(title),
      "</strong><span>",
      escapeHTML(description),
      "</span></div>"
    ].join("");
  }

  function renderManagerOptions(preferredValue) {
    const group = $("ceGroupFilter").value;
    const managers = [...new Set(RECORDS
      .filter((record) => group === "全部" || record.group === group)
      .map((record) => record.manager))]
      .sort((a, b) => a.localeCompare(b, "zh-CN"));
    $("ceManagerFilter").innerHTML = [
      '<option value="全部">全部项目经理</option>',
      managers.map((manager) => (
        '<option value="' + escapeHTML(manager) + '">' + escapeHTML(manager) + "</option>"
      )).join("")
    ].join("");
    $("ceManagerFilter").value = managers.includes(preferredValue) ? preferredValue : "全部";
  }

  function configureRoleScope() {
    const role = getActiveRole();
    $("ceGroupFilter").value = role.group || "全部";
    $("ceGroupFilter").disabled = Boolean(role.group);
    renderManagerOptions(role.manager || "全部");
    $("ceManagerFilter").disabled = Boolean(role.manager);
  }

  function renderRoleControls() {
    const role = getActiveRole();
    $("ceRoleTabs").innerHTML = ROLE_VIEWS.map((item) => [
      '<button type="button" class="dashboard-role-tab',
      item.id === activeRoleId ? " active" : "",
      '" data-role-id="',
      item.id,
      '" aria-pressed="',
      String(item.id === activeRoleId),
      '">',
      item.icon,
      "<span>",
      escapeHTML(item.label),
      "</span></button>"
    ].join("")).join("");
    $("ceUserAvatar").textContent = role.avatar;
    $("ceUserName").textContent = role.userName;
    $("ceUserRole").textContent = role.label;
    $("topbarPageSubtitle").textContent = role.label + " · " + (role.manager ? "个人" : role.group ? "业务组" : "部门") + "评价视图";
    $("ceRoleHint").textContent = role.manager
      ? "组员仅查看本人负责项目的客户评价。"
      : role.group
        ? "业务组长查看本组评价，可按本组项目经理继续筛选。"
        : "部门负责人查看全部业务组评价，可按条件筛选。";
  }

  function getCurrentPeriodLabel() {
    const options = PERIOD_OPTIONS[activePeriodType];
    const selected = options.find((option) => option.value === selectedPeriods[activePeriodType]);
    return selected ? selected.label : options[0].label;
  }

  function renderPeriodControls() {
    $("cePeriodTypeTabs").querySelectorAll("[data-period-type]").forEach((button) => {
      const isActive = button.dataset.periodType === activePeriodType;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    $("cePeriodValueSelect").innerHTML = PERIOD_OPTIONS[activePeriodType].map((option) => [
      '<option value="',
      option.value,
      '"',
      option.value === selectedPeriods[activePeriodType] ? " selected" : "",
      ">",
      escapeHTML(option.label),
      "</option>"
    ].join("")).join("");
  }

  function renderSummary(records) {
    const count = records.length;
    const average = averageScore(records);
    const excellentCount = records.filter((record) => getRating(record.score).name === "优秀").length;
    const problemCount = records.filter((record) => record.problems.length > 0).length;
    const excellentRate = count ? excellentCount / count * 100 : 0;
    const problemRate = count ? problemCount / count * 100 : 0;
    const cards = [
      {
        label: "客户平均分",
        value: count ? formatScore(average) : "—",
        unit: "分",
        foot: "有效评价综合评分均值",
        tone: "",
        icon: SUMMARY_ICONS.average
      },
      {
        label: "有效回收评价",
        value: count,
        unit: "份",
        foot: "当前分析条件下的评价样本",
        tone: "",
        icon: SUMMARY_ICONS.count
      },
      {
        label: "优秀评价占比",
        value: excellentRate.toFixed(1),
        unit: "%",
        foot: excellentCount + "份评价达到9分及以上",
        tone: "success",
        icon: SUMMARY_ICONS.excellent
      },
      {
        label: "涉及问题评价",
        value: problemCount,
        unit: "份",
        foot: "占有效评价 " + problemRate.toFixed(1) + "%",
        tone: "warning",
        icon: SUMMARY_ICONS.problem
      }
    ];
    $("ceSummaryCards").innerHTML = cards.map((card) => [
      '<article class="card ce-summary-card ',
      card.tone,
      '"><div class="ce-summary-top"><span class="ce-summary-label">',
      escapeHTML(card.label),
      '</span><span class="ce-summary-icon">',
      card.icon,
      '</span></div><div class="ce-summary-value"><strong>',
      escapeHTML(card.value),
      "</strong><span>",
      escapeHTML(card.unit),
      '</span></div><div class="ce-summary-foot">',
      escapeHTML(card.foot),
      "</div></article>"
    ].join("")).join("");
  }

  function renderTrend(records) {
    if (!records.length) {
      $("ceScoreTrend").innerHTML = emptyState("暂无趋势数据", "请调整分析条件后查看");
      $("ceTrendTag").className = "status-tag pending";
      $("ceTrendTag").textContent = "暂无数据";
      return;
    }
    const periodMap = new Map();
    records.forEach((record) => {
      const periodKey = activePeriodType === "月度" ? record.date : record.date.slice(0, 7);
      if (!periodMap.has(periodKey)) periodMap.set(periodKey, []);
      periodMap.get(periodKey).push(record.score);
    });
    const points = [...periodMap.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([periodKey, values]) => ({
      periodKey,
      label: activePeriodType === "月度"
        ? Number(periodKey.slice(5, 7)) + "/" + Number(periodKey.slice(8, 10))
        : Number(periodKey.slice(5)) + "月",
      value: values.reduce((sum, value) => sum + value, 0) / values.length
    }));
    const width = 660;
    const height = 230;
    const left = 38;
    const right = 22;
    const top = 24;
    const bottom = 31;
    const chartWidth = width - left - right;
    const chartHeight = height - top - bottom;
    const minScore = 5;
    const maxScore = 10;
    const xFor = (index) => (
      points.length === 1
        ? left + chartWidth / 2
        : left + chartWidth * index / (points.length - 1)
    );
    const yFor = (value) => top + (maxScore - value) / (maxScore - minScore) * chartHeight;
    const coordinates = points.map((point, index) => ({
      x: xFor(index),
      y: yFor(point.value),
      point
    }));
    const linePath = coordinates.map((item, index) => (
      (index ? "L" : "M") + item.x.toFixed(1) + " " + item.y.toFixed(1)
    )).join(" ");
    const areaPath = points.length > 1
      ? linePath + " L " + coordinates[coordinates.length - 1].x.toFixed(1) + " " + (top + chartHeight) +
        " L " + coordinates[0].x.toFixed(1) + " " + (top + chartHeight) + " Z"
      : "";
    const gridLines = [5, 6, 7, 8, 9, 10].map((tick) => {
      const y = yFor(tick).toFixed(1);
      return [
        '<line class="ce-trend-grid" x1="',
        left,
        '" y1="',
        y,
        '" x2="',
        width - right,
        '" y2="',
        y,
        '"></line><text class="ce-trend-label" x="',
        left - 9,
        '" y="',
        Number(y) + 4,
        '" text-anchor="end">',
        tick,
        "</text>"
      ].join("");
    }).join("");
    const pointMarkup = coordinates.map((item) => [
      '<circle class="ce-trend-dot" cx="',
      item.x.toFixed(1),
      '" cy="',
      item.y.toFixed(1),
      '" r="4"></circle><text class="ce-trend-value" x="',
      item.x.toFixed(1),
      '" y="',
      (item.y - 11).toFixed(1),
      '" text-anchor="middle">',
      formatScore(item.point.value),
      '</text><text class="ce-trend-label" x="',
      item.x.toFixed(1),
      '" y="',
      height - 8,
      '" text-anchor="middle">',
      item.point.label,
      "</text>"
    ].join("")).join("");
    $("ceScoreTrend").innerHTML = [
      '<svg class="ce-trend-svg" viewBox="0 0 ',
      width,
      " ",
      height,
      '" role="img" aria-label="客户平均分趋势">',
      '<defs><linearGradient id="ceTrendArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1677ff" stop-opacity="0.20"/><stop offset="100%" stop-color="#1677ff" stop-opacity="0.02"/></linearGradient></defs>',
      gridLines,
      areaPath ? '<path class="ce-trend-area" d="' + areaPath + '"></path>' : "",
      '<path class="ce-trend-line" d="',
      linePath,
      '"></path>',
      pointMarkup,
      "</svg>"
    ].join("");
    $("ceTrendDescription").textContent = (
      activePeriodType === "月度"
        ? "按评价日期展示当月评分 · 共"
        : "按月展示季度平均分 · 共"
    ) + records.length + "份";
    if (points.length < 2) {
      $("ceTrendTag").className = "status-tag pending";
      $("ceTrendTag").textContent = "单周期数据";
      return;
    }
    const delta = points[points.length - 1].value - points[0].value;
    if (delta >= 0.2) {
      $("ceTrendTag").className = "status-tag normal";
      $("ceTrendTag").textContent = "较期初提升";
    } else if (delta <= -0.2) {
      $("ceTrendTag").className = "status-tag warning";
      $("ceTrendTag").textContent = "较期初下降";
    } else {
      $("ceTrendTag").className = "status-tag normal";
      $("ceTrendTag").textContent = "整体稳定";
    }
  }

  function renderRatingDistribution(records) {
    const total = records.length;
    $("ceRatingTotal").textContent = total + "份";
    if (!total) {
      $("ceRatingDistribution").innerHTML = emptyState("暂无评分数据", "请调整分析条件后查看");
      return;
    }
    let cumulative = 0;
    const ratingStats = RATING_META.map((meta) => {
      const count = records.filter((record) => getRating(record.score).name === meta.name).length;
      const percent = count / total * 100;
      const start = cumulative;
      cumulative += percent;
      return Object.assign({}, meta, { count, percent, start, end: cumulative });
    });
    const gradient = ratingStats.map((item) => (
      item.color + " " + item.start.toFixed(2) + "% " + item.end.toFixed(2) + "%"
    )).join(", ");
    const average = averageScore(records);
    $("ceRatingDistribution").innerHTML = [
      '<div class="ce-rating-donut-wrap"><div class="ce-rating-donut" style="background: conic-gradient(',
      gradient,
      ')"><div class="ce-rating-donut-center"><strong>',
      formatScore(average),
      "</strong><span>平均分</span></div></div><span>有效评价 ",
      total,
      " 份</span></div>",
      '<div class="ce-rating-list">',
      ratingStats.map((item) => [
        '<button type="button" class="ce-rating-item',
        chartFilter && chartFilter.type === "rating" && chartFilter.value === item.name ? " active" : "",
        '" data-rating="',
        escapeHTML(item.name),
        '" aria-label="筛选',
        escapeHTML(item.name),
        '评价"><span class="ce-rating-dot" style="background:',
        item.color,
        '"></span><span>',
        escapeHTML(item.name),
        "</span><strong>",
        item.count,
        "份</strong><em>",
        item.percent.toFixed(1),
        "%</em></button>"
      ].join("")).join(""),
      "</div>"
    ].join("");
  }

  function renderProblemAnalysis(records) {
    const counter = new Map();
    records.forEach((record) => {
      record.problems.forEach((problem) => {
        counter.set(problem, (counter.get(problem) || 0) + 1);
      });
    });
    const rows = [...counter.entries()].map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "zh-CN"));
    const total = rows.reduce((sum, row) => sum + row.count, 0);
    $("ceProblemTotal").textContent = total + "项";
    if (!rows.length) {
      $("ceProblemAnalysis").innerHTML = emptyState("暂无问题反馈", "当前范围内的评价未标记问题类型");
      return;
    }
    const maxCount = Math.max(...rows.map((row) => row.count));
    $("ceProblemAnalysis").innerHTML = [
      '<div class="ce-problem-list">',
      rows.map((row) => {
        const share = total ? row.count / total * 100 : 0;
        const width = maxCount ? row.count / maxCount * 100 : 0;
        const active = chartFilter && chartFilter.type === "problem" && chartFilter.value === row.name;
        return [
          '<button type="button" class="ce-problem-row',
          active ? " active" : "",
          '" data-problem="',
          escapeHTML(row.name),
          '" aria-label="筛选',
          escapeHTML(row.name),
          '问题"><span>',
          escapeHTML(row.name),
          '</span><span class="ce-bar-track"><span style="width:',
          width.toFixed(1),
          '%"></span></span><strong>',
          row.count,
          "项</strong><em>",
          share.toFixed(1),
          "%</em></button>"
        ].join("");
      }).join(""),
      "</div>"
    ].join("");
  }

  function renderGroupComparison(records) {
    if (!records.length) {
      $("ceGroupComparison").innerHTML = emptyState("暂无业务组数据", "请调整分析条件后查看");
      return;
    }
    const groupMap = new Map();
    records.forEach((record) => {
      if (!groupMap.has(record.group)) groupMap.set(record.group, []);
      groupMap.get(record.group).push(record);
    });
    const groups = [...groupMap.entries()].map(([name, values]) => ({
      name,
      count: values.length,
      average: averageScore(values)
    })).sort((a, b) => b.average - a.average);
    $("ceGroupComparison").innerHTML = [
      '<div class="ce-group-list">',
      groups.map((group) => [
        '<div class="ce-group-row"><div class="ce-group-copy"><span>',
        escapeHTML(group.name),
        "</span><strong>有效评价 ",
        group.count,
        ' 份</strong></div><span class="ce-bar-track"><span style="width:',
        (group.average / 10 * 100).toFixed(1),
        '%"></span></span><span class="ce-group-score">',
        formatScore(group.average),
        "</span></div>"
      ].join("")).join(""),
      "</div>"
    ].join("");
  }

  function renderProblemTags(record) {
    if (!record.problems.length) return '<span class="ce-no-problem">无问题反馈</span>';
    const visible = record.problems.slice(0, 1);
    return [
      '<div class="ce-problem-tags">',
      visible.map((problem) => '<span class="ce-problem-tag">' + escapeHTML(problem) + "</span>").join(""),
      record.problems.length > 1
        ? '<span class="ce-problem-tag">+' + (record.problems.length - 1) + "</span>"
        : "",
      "</div>"
    ].join("");
  }

  function renderTable(records) {
    const detailRecords = getDetailRecords(records);
    const pageCount = Math.max(1, Math.ceil(detailRecords.length / PAGE_SIZE));
    currentPage = Math.min(currentPage, pageCount);
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageRecords = detailRecords.slice(start, start + PAGE_SIZE);
    $("ceDetailCount").textContent = "共" + detailRecords.length + "条";
    if (chartFilter) {
      $("ceTableContext").classList.remove("hidden");
      $("ceContextText").textContent = (
        chartFilter.type === "rating"
          ? "图表筛选：评分分类 = " + chartFilter.value
          : "图表筛选：问题类型 = " + chartFilter.value
      );
    } else {
      $("ceTableContext").classList.add("hidden");
    }
    $("ceDetailRows").innerHTML = pageRecords.length
      ? pageRecords.map((record) => {
        const rating = getRating(record.score);
        return [
          "<tr><td>",
          escapeHTML(formatDate(record.date)),
          '</td><td><div class="ce-project-cell"><strong title="',
          escapeHTML(record.project),
          '">',
          escapeHTML(record.project),
          '</strong><span title="',
          escapeHTML(record.section),
          '">',
          escapeHTML(record.section),
          "</span></div></td><td>",
          escapeHTML(record.group),
          "</td><td>",
          escapeHTML(record.manager),
          "</td><td>",
          escapeHTML(record.customer),
          '</td><td><span class="ce-score">',
          formatScore(record.score),
          '</span></td><td><span class="ce-rating-badge ',
          rating.className,
          '">',
          rating.name,
          "</span></td><td>",
          renderProblemTags(record),
          '</td><td><button type="button" class="ce-view-button" data-view-id="',
          escapeHTML(record.id),
          '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6S2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.5"/></svg>查看</button></td></tr>'
        ].join("");
      }).join("")
      : '<tr><td colspan="9" class="ce-table-empty">当前条件下暂无评价明细，请调整筛选条件后查看。</td></tr>';
    $("cePagination").innerHTML = [
      '<button type="button" class="ce-page-button" data-page-action="prev"',
      currentPage <= 1 ? " disabled" : "",
      '><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>上一页</button>',
      '<span class="ce-page-info">第 ',
      currentPage,
      " / ",
      pageCount,
      " 页</span>",
      '<button type="button" class="ce-page-button" data-page-action="next"',
      currentPage >= pageCount ? " disabled" : "",
      '>下一页<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>'
    ].join("");
  }

  function renderDashboard() {
    const records = getBaseRecords();
    renderRoleControls();
    renderPeriodControls();
    renderSummary(records);
    renderTrend(records);
    renderRatingDistribution(records);
    renderProblemAnalysis(records);
    renderGroupComparison(records);
    renderTable(records);
  }

  function readFilters() {
    return {
      period: selectedPeriods[activePeriodType],
      group: $("ceGroupFilter").value,
      businessType: $("ceBusinessFilter").value,
      manager: $("ceManagerFilter").value,
      rating: $("ceRatingFilter").value
    };
  }

  function setChartFilter(type, value) {
    if (chartFilter && chartFilter.type === type && chartFilter.value === value) {
      chartFilter = null;
    } else {
      chartFilter = { type, value };
    }
    currentPage = 1;
    const records = getBaseRecords();
    renderRatingDistribution(records);
    renderProblemAnalysis(records);
    renderTable(records);
  }

  function openDrawer(recordId) {
    const record = RECORDS.find((item) => item.id === recordId);
    if (!record) return;
    const rating = getRating(record.score);
    $("ceDrawerTitle").textContent = record.project;
    $("ceDrawerSubtitle").textContent = record.section + " · " + formatDate(record.date);
    $("ceDrawerBody").innerHTML = [
      '<section class="ce-drawer-score"><div class="ce-drawer-score-copy"><span>客户综合评分</span><strong>',
      formatScore(record.score),
      '<small> / 10</small></strong></div><span class="ce-rating-badge ',
      rating.className,
      '">',
      rating.name,
      " · ",
      rating.range,
      "</span></section>",
      '<section class="ce-drawer-section"><h3>评价关联信息</h3><div class="ce-drawer-grid">',
      drawerField("评价编号", record.id),
      drawerField("评价日期", formatDate(record.date)),
      drawerField("业务组", record.group),
      drawerField("项目经理", record.manager),
      drawerField("客户名称", record.customer),
      drawerField("业务类型", record.businessType),
      "</div></section>",
      '<section class="ce-drawer-section"><h3>问题类型</h3>',
      record.problems.length
        ? '<div class="ce-problem-tags">' + record.problems.map((problem) => (
          '<span class="ce-problem-tag">' + escapeHTML(problem) + "</span>"
        )).join("") + "</div>"
        : '<span class="ce-no-problem">本次评价未标记问题类型</span>',
      "</section>",
      '<section class="ce-drawer-section"><h3>客户评价摘要</h3><p class="ce-feedback">',
      escapeHTML(record.feedback),
      "</p></section>"
    ].join("");
    $("ceDrawerMask").classList.remove("hidden");
    $("ceDetailDrawer").classList.remove("hidden");
  }

  function drawerField(label, value) {
    return [
      '<div class="ce-drawer-field"><span>',
      escapeHTML(label),
      "</span><strong>",
      escapeHTML(value),
      "</strong></div>"
    ].join("");
  }

  function closeDrawer() {
    $("ceDrawerMask").classList.add("hidden");
    $("ceDetailDrawer").classList.add("hidden");
  }

  function setupEvents() {
    $("ceRoleTabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-role-id]");
      if (!button || button.dataset.roleId === activeRoleId) return;
      activeRoleId = button.dataset.roleId;
      configureRoleScope();
      appliedFilters = readFilters();
      chartFilter = null;
      currentPage = 1;
      renderDashboard();
      if (window.showToast) window.showToast("已切换为：" + getActiveRole().label + "视角");
    });

    $("ceFilterForm").addEventListener("submit", (event) => {
      event.preventDefault();
      appliedFilters = readFilters();
      chartFilter = null;
      currentPage = 1;
      renderDashboard();
      if (window.showToast) window.showToast("已按当前条件更新评价分析");
    });

    $("ceFilterForm").addEventListener("reset", (event) => {
      event.preventDefault();
      activePeriodType = "月度";
      selectedPeriods.月度 = "2026-07";
      selectedPeriods.季度 = "2026-Q2";
      $("ceBusinessFilter").value = "全部";
      $("ceRatingFilter").value = "全部";
      configureRoleScope();
      appliedFilters = readFilters();
      chartFilter = null;
      currentPage = 1;
      renderDashboard();
      if (window.showToast) window.showToast("分析条件已重置");
    });

    $("cePeriodTypeTabs").addEventListener("click", (event) => {
      const tab = event.target.closest(".dashboard-period-tab");
      if (!tab || tab.dataset.periodType === activePeriodType) return;
      activePeriodType = tab.dataset.periodType;
      appliedFilters = readFilters();
      chartFilter = null;
      currentPage = 1;
      renderDashboard();
      if (window.showToast) window.showToast("已切换为：" + activePeriodType + "评价");
    });

    $("cePeriodValueSelect").addEventListener("change", (event) => {
      selectedPeriods[activePeriodType] = event.target.value;
      appliedFilters = readFilters();
      chartFilter = null;
      currentPage = 1;
      renderDashboard();
      if (window.showToast) window.showToast("统计周期已切换为：" + getCurrentPeriodLabel());
    });

    $("ceGroupFilter").addEventListener("change", () => {
      renderManagerOptions("全部");
    });

    $("ceRatingDistribution").addEventListener("click", (event) => {
      const button = event.target.closest("[data-rating]");
      if (button) setChartFilter("rating", button.dataset.rating);
    });

    $("ceProblemAnalysis").addEventListener("click", (event) => {
      const button = event.target.closest("[data-problem]");
      if (button) setChartFilter("problem", button.dataset.problem);
    });

    $("ceClearContext").addEventListener("click", () => {
      chartFilter = null;
      currentPage = 1;
      const records = getBaseRecords();
      renderRatingDistribution(records);
      renderProblemAnalysis(records);
      renderTable(records);
    });

    $("ceDetailRows").addEventListener("click", (event) => {
      const button = event.target.closest("[data-view-id]");
      if (button) openDrawer(button.dataset.viewId);
    });

    $("cePagination").addEventListener("click", (event) => {
      const button = event.target.closest("[data-page-action]");
      if (!button || button.disabled) return;
      currentPage += button.dataset.pageAction === "next" ? 1 : -1;
      renderTable(getBaseRecords());
    });

    [$("ceDrawerClose"), $("ceDrawerCloseButton"), $("ceDrawerMask")].forEach((element) => {
      element.addEventListener("click", closeDrawer);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDrawer();
    });
  }

  function init() {
    configureRoleScope();
    setupEvents();
    renderDashboard();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
