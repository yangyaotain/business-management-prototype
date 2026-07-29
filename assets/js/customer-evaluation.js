(function setupCustomerEvaluation() {
  const ICONS = {
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
    group: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20a5.5 5.5 0 0 1 11 0M13.5 15.5a4.8 4.8 0 0 1 8 3.5"/></svg>',
    info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>'
  };
  const ROLE_ICONS = {
    department: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V7l8-4 8 4v14M8 10h2M14 10h2M8 14h2M14 14h2M10 21v-3h4v3"/></svg>',
    leader: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M14 15a5 5 0 0 1 7 4.5"/></svg>',
    member: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></svg>'
  };
  const ROLE_VIEWS = [
    {
      id: "departmentHead",
      label: "部门负责人",
      userName: "陈建",
      avatar: "陈",
      defaultView: "department",
      icon: ROLE_ICONS.department
    },
    {
      id: "groupLeader",
      label: "业务组长",
      userName: "张明",
      avatar: "张",
      defaultView: "group",
      groupId: "group-2",
      icon: ROLE_ICONS.leader
    },
    {
      id: "member",
      label: "组员",
      userName: "周启航",
      avatar: "周",
      defaultView: "person",
      groupId: "group-2",
      personId: "person-zhou",
      icon: ROLE_ICONS.member
    }
  ];
  const GROUPS = [
    {
      id: "group-1",
      name: "第一业务组",
      leader: "赵倩",
      businessType: "招标代理",
      memberIds: ["person-zhao-qian", "person-zhao"]
    },
    {
      id: "group-2",
      name: "第二业务组",
      leader: "张明",
      businessType: "招标代理",
      memberIds: ["person-zhang", "person-zhou", "person-wu"]
    },
    {
      id: "group-3",
      name: "非电力业务组",
      leader: "孙岚",
      businessType: "招标代理",
      memberIds: ["person-sun", "person-xu"]
    },
    {
      id: "group-4",
      name: "造价业务组",
      leader: "王军",
      businessType: "造价咨询",
      memberIds: ["person-wang", "person-lin"]
    }
  ];
  const PEOPLE = [
    { id: "person-zhao-qian", name: "赵倩", groupId: "group-1", position: "业务组长" },
    { id: "person-zhao", name: "赵一宁", groupId: "group-1", position: "项目经理" },
    { id: "person-zhang", name: "张明", groupId: "group-2", position: "业务组长" },
    { id: "person-zhou", name: "周启航", groupId: "group-2", position: "项目经理" },
    { id: "person-wu", name: "吴思远", groupId: "group-2", position: "项目经理" },
    { id: "person-sun", name: "孙岚", groupId: "group-3", position: "业务组长" },
    { id: "person-xu", name: "许哲", groupId: "group-3", position: "项目经理" },
    { id: "person-wang", name: "王军", groupId: "group-4", position: "业务组长" },
    { id: "person-lin", name: "林晓雯", groupId: "group-4", position: "造价咨询项目经理" }
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
  const SUMMARY_ICONS = {
    average: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3z"/></svg>',
    count: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>',
    excellent: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.6 2.6L16.5 9"/></svg>',
    problem: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3 20h18L12 4z"/><path d="M12 9v5M12 17h.01"/></svg>'
  };
  const RECORDS = [
    ["CE202601001", "2026-01-08", "海丰扩建项目主设备采购", "汽轮发电机组采购标段", "第一业务组", "赵倩", "招标代理", "华润电力", 9.4, [], "项目团队组织有序，关键节点沟通及时，招标文件质量较高。"],
    ["CE202601002", "2026-01-16", "新能源场站运维服务采购", "华南区域运维服务标段", "第二业务组", "周启航", "招标代理", "华润新能源", 8.6, ["沟通协调"], "整体服务专业，跨部门信息同步可进一步提前。"],
    ["CE202601003", "2026-01-25", "总部办公区改造工程", "全过程造价咨询标段", "造价业务组", "王军", "造价咨询", "华润置地", 9.1, [], "造价分析清晰，成果文件完整，关键风险提示准确。"],
    ["CE202602001", "2026-02-07", "燃气轮机备品备件集采", "核心备件采购标段", "第一业务组", "赵倩", "招标代理", "华润燃气", 9.0, [], "采购节奏把控合理，问题答复及时，整体满意。"],
    ["CE202602002", "2026-02-18", "区域物流运输服务采购", "西南区域运输服务标段", "第二业务组", "吴思远", "招标代理", "华润万家", 7.8, ["响应时效"], "业务处理较规范，但澄清问题的首次回复速度需要提升。"],
    ["CE202602003", "2026-02-26", "商业综合体机电改造", "工程量清单及控制价编制", "造价业务组", "林晓雯", "造价咨询", "华润商业", 8.8, [], "成果深度符合要求，现场配合主动，过程沟通顺畅。"],
    ["CE202603001", "2026-03-05", "储能系统设备采购", "储能电池及配套系统标段", "第一业务组", "赵一宁", "招标代理", "华润电力", 9.6, [], "专业建议针对性强，项目推进效率高，节点管理清晰。"],
    ["CE202603002", "2026-03-14", "食品工厂生产线改造", "自动化设备采购标段", "第二业务组", "吴思远", "招标代理", "华润五丰", 5.8, ["响应时效", "沟通协调"], "需求变更后的响应不够及时，关键信息在相关方之间传递存在延迟。"],
    ["CE202603003", "2026-03-27", "住宅项目精装修工程", "结算审核咨询标段", "造价业务组", "王军", "造价咨询", "华润置地", 8.2, ["成果质量"], "审核过程严谨，部分成果附件的索引和说明可以进一步完善。"],
    ["CE202604001", "2026-04-03", "风电场箱变设备采购", "箱式变压器采购标段", "第一业务组", "赵一宁", "招标代理", "华润新能源", 9.2, [], "招标组织严谨，技术澄清安排合理，项目目标顺利达成。"],
    ["CE202604002", "2026-04-11", "冷链仓储服务采购", "华东冷链仓储标段", "第二业务组", "周启航", "招标代理", "华润万家", 8.5, ["现场服务"], "整体配合良好，现场评审期间人员支持可更加充分。"],
    ["CE202604003", "2026-04-19", "产业园一期建设工程", "全过程造价咨询标段", "造价业务组", "林晓雯", "造价咨询", "华润产业发展", 7.4, ["专业能力"], "常规工作完成较好，复杂变更事项的专业分析深度仍需加强。"],
    ["CE202604004", "2026-04-28", "光伏组件年度框架采购", "高效光伏组件采购标段", "第一业务组", "赵倩", "招标代理", "华润电力", 9.7, [], "服务过程透明高效，关键风险控制到位，整体表现优秀。"],
    ["CE202604005", "2026-04-24", "零售门店数字化设备采购", "智能终端设备采购标段", "非电力业务组", "孙岚", "招标代理", "华润万家", 8.9, [], "项目策划清晰，跨区域协同顺畅，交付过程稳定。"],
    ["CE202605001", "2026-05-06", "数据中心网络设备采购", "核心交换设备采购标段", "第一业务组", "赵一宁", "招标代理", "华润数科", 8.9, [], "业务理解准确，文件编制规范，推进过程顺畅。"],
    ["CE202605002", "2026-05-13", "物业保洁服务集采", "北方区域保洁服务标段", "第二业务组", "周启航", "招标代理", "华润物业", 6.8, ["响应时效"], "项目整体完成，但两次澄清回复超过预期时间，影响内部决策节奏。"],
    ["CE202605003", "2026-05-21", "商业街区提升改造", "目标成本测算咨询标段", "造价业务组", "王军", "造价咨询", "华润商业", 9.3, [], "成本测算逻辑清楚，关键指标解释充分，成果实用性强。"],
    ["CE202605004", "2026-05-29", "智慧能源平台开发", "平台建设服务采购标段", "第一业务组", "赵倩", "招标代理", "华润电力", 8.1, ["沟通协调"], "招标执行规范，建议进一步明确多方协作中的信息确认机制。"],
    ["CE202605005", "2026-05-24", "食品工厂包装设备采购", "自动包装线设备标段", "非电力业务组", "许哲", "招标代理", "华润五丰", 8.3, ["沟通协调"], "执行过程规范，需求调整后的信息确认还可以更加及时。"],
    ["CE202606001", "2026-06-04", "燃煤机组灵活性改造", "改造工程总承包招标标段", "第一业务组", "赵一宁", "招标代理", "华润电力", 9.5, [], "项目经理专业负责，复杂事项组织协调有序，服务质量优秀。"],
    ["CE202606002", "2026-06-12", "总部园区景观改造", "全过程造价咨询标段", "造价业务组", "林晓雯", "造价咨询", "华润集团", 8.4, ["成果质量"], "整体成果符合预期，个别测算表的口径说明需要补充。"],
    ["CE202606003", "2026-06-20", "区域员工体检服务采购", "华南区域体检服务标段", "第二业务组", "吴思远", "招标代理", "华润医药", 5.6, ["专业能力", "沟通协调"], "需求边界理解出现偏差，评审前沟通不充分，建议加强方案复核。"],
    ["CE202606004", "2026-06-28", "医药物流设备采购", "自动分拣设备采购标段", "第一业务组", "赵倩", "招标代理", "华润医药", 9.0, ["现场服务"], "项目执行高效，现场评审支持总体良好，设备演示环节可再提前准备。"],
    ["CE202606005", "2026-06-24", "区域物流仓储服务采购", "综合仓储运营服务标段", "非电力业务组", "孙岚", "招标代理", "华润物流", 9.1, [], "业务理解准确，采购组织有序，重点风险提示充分。"],
    ["CE202607001", "2026-07-05", "海上风电运维船采购", "专业运维船舶采购标段", "第一业务组", "赵一宁", "招标代理", "华润新能源", 9.6, [], "方案策划充分，市场分析专业，项目各节点衔接顺畅。"],
    ["CE202607002", "2026-07-14", "商业综合体安保服务", "西南区域安保服务标段", "第二业务组", "周启航", "招标代理", "华润商业", 8.7, ["响应时效"], "整体组织规范，临时补充材料的确认速度仍有提升空间。"],
    ["CE202607003", "2026-07-22", "城市更新配套工程", "结算审核咨询标段", "造价业务组", "王军", "造价咨询", "华润置地", 7.6, ["成果质量", "现场服务"], "核心结论基本准确，现场资料核对和成果复核细节需要加强。"],
    ["CE202607004", "2026-07-25", "区域门店设备集采", "智慧收银设备采购标段", "非电力业务组", "许哲", "招标代理", "华润万家", 8.8, [], "采购过程透明，节点反馈及时，整体服务表现良好。"],
    ["CE202507001", "2025-07-09", "区域数据专线服务采购", "华南数据专线服务标段", "第一业务组", "赵倩", "招标代理", "华润数科", 9.1, [], "项目推进顺畅，服务响应及时。"],
    ["CE202507002", "2025-07-21", "住宅项目景观工程", "结算审核咨询标段", "造价业务组", "王军", "造价咨询", "华润置地", 8.3, ["成果质量"], "整体成果符合要求，部分说明可进一步细化。"],
    ["CE202508001", "2025-08-06", "新能源备件框架采购", "风机备件采购标段", "第一业务组", "赵一宁", "招标代理", "华润新能源", 9.4, [], "采购组织规范，节点衔接高效。"],
    ["CE202508002", "2025-08-19", "园区物业服务采购", "综合物业服务标段", "第二业务组", "周启航", "招标代理", "华润物业", 7.7, ["响应时效"], "澄清回复时间仍有提升空间。"],
    ["CE202509001", "2025-09-11", "商业项目机电改造", "全过程造价咨询标段", "造价业务组", "林晓雯", "造价咨询", "华润商业", 8.8, [], "专业服务到位，配合度较高。"],
    ["CE202509002", "2025-09-24", "区域食材供应集采", "华东食材供应标段", "第二业务组", "吴思远", "招标代理", "华润万家", 6.9, ["沟通协调"], "多方信息确认需要更加及时。"],
    ["CE202510001", "2025-10-08", "光伏逆变器设备采购", "集中式逆变器采购标段", "第一业务组", "赵倩", "招标代理", "华润电力", 9.3, [], "文件质量高，风险提示充分。"],
    ["CE202510002", "2025-10-22", "总部办公楼修缮工程", "控制价编制咨询标段", "造价业务组", "王军", "造价咨询", "华润集团", 8.1, ["现场服务"], "成果符合要求，现场支持可进一步加强。"],
    ["CE202511001", "2025-11-07", "员工补充医疗服务采购", "年度医疗服务标段", "第二业务组", "周启航", "招标代理", "华润医药", 8.7, [], "整体组织规范，沟通顺畅。"],
    ["CE202511002", "2025-11-20", "产业园弱电工程采购", "智能化工程标段", "第一业务组", "赵一宁", "招标代理", "华润产业发展", 5.7, ["专业能力", "沟通协调"], "需求理解和方案复核需要加强。"],
    ["CE202512001", "2025-12-05", "商业综合体改造工程", "结算审核咨询标段", "造价业务组", "林晓雯", "造价咨询", "华润商业", 9.0, [], "审核过程严谨，成果表达清晰。"],
    ["CE202512002", "2025-12-18", "年度信息设备集采", "终端设备采购标段", "第一业务组", "赵倩", "招标代理", "华润数科", 8.4, ["成果质量"], "采购组织有序，附件索引需要进一步完善。"]
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
  const state = {
    roleId: "departmentHead",
    view: "department",
    groupId: null,
    personId: null,
    periodType: "月度",
    selectedPeriods: {
      月度: "2026-07",
      季度: "2026-Q2"
    },
    businessType: "全部",
    rating: "全部",
    chartFilter: null
  };
  let detailPagination = null;

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

  function getRole() {
    return ROLE_VIEWS.find((role) => role.id === state.roleId) || ROLE_VIEWS[0];
  }

  function getGroup(groupId) {
    return GROUPS.find((group) => group.id === groupId) || null;
  }

  function getPerson(personId) {
    const person = PEOPLE.find((item) => item.id === personId);
    if (!person) return null;
    return { person, group: getGroup(person.groupId) };
  }

  function getCurrentPeriod() {
    const options = PERIOD_OPTIONS[state.periodType];
    const selected = options.find((option) => option.value === state.selectedPeriods[state.periodType]);
    return selected || options[0];
  }

  function getScopeLabel() {
    if (state.view === "group") {
      const group = getGroup(state.groupId);
      return group ? group.name : "当前业务组";
    }
    if (state.view === "person") {
      const result = getPerson(state.personId);
      return result ? result.person.name : "当前人员";
    }
    return "代理业务部";
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
    return Number(date.slice(0, 4)) === year && Math.ceil(Number(date.slice(5, 7)) / 3) === quarter;
  }

  function getFilteredRecords(options) {
    const scope = options || {};
    const group = getGroup(scope.groupId);
    const personResult = getPerson(scope.personId);
    const period = state.selectedPeriods[state.periodType];
    return RECORDS.filter((record) => {
      if (!matchesPeriod(record.date, period)) return false;
      if (group && record.group !== group.name) return false;
      if (personResult && record.manager !== personResult.person.name) return false;
      if (state.businessType !== "全部" && record.businessType !== state.businessType) return false;
      if (state.rating !== "全部" && getRating(record.score).name !== state.rating) return false;
      return true;
    }).sort((a, b) => b.date.localeCompare(a.date));
  }

  function getScopeRecords() {
    if (state.view === "group") return getFilteredRecords({ groupId: state.groupId });
    if (state.view === "person") return getFilteredRecords({ personId: state.personId });
    return getFilteredRecords();
  }

  function getDetailRecords(records) {
    if (!state.chartFilter) return records.slice();
    if (state.chartFilter.type === "rating") {
      return records.filter((record) => getRating(record.score).name === state.chartFilter.value);
    }
    return records.filter((record) => record.problems.includes(state.chartFilter.value));
  }

  function averageScore(records) {
    if (!records.length) return 0;
    return records.reduce((sum, record) => sum + record.score, 0) / records.length;
  }

  function formatScore(value) {
    return Number(value || 0).toFixed(1);
  }

  function formatDate(value) {
    return value;
  }

  function renderRoleTabs() {
    $("ceRoleTabs").innerHTML = ROLE_VIEWS.map((role) => [
      '<button type="button" class="dashboard-role-tab',
      role.id === state.roleId ? " active" : "",
      '" data-role-id="',
      role.id,
      '" aria-pressed="',
      String(role.id === state.roleId),
      '">',
      role.icon,
      "<span>",
      escapeHTML(role.label),
      "</span></button>"
    ].join("")).join("");
    $("ceRoleHint").textContent = "正式系统按登录人权限自动进入对应层级，以下切换仅用于原型演示。";
  }

  function renderFilterControls() {
    $("cePeriodTypeTabs").querySelectorAll("[data-period-type]").forEach((button) => {
      const active = button.dataset.periodType === state.periodType;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    $("cePeriodValueSelect").innerHTML = PERIOD_OPTIONS[state.periodType].map((option) => [
      '<option value="',
      option.value,
      '"',
      option.value === state.selectedPeriods[state.periodType] ? " selected" : "",
      ">",
      escapeHTML(option.label),
      "</option>"
    ].join("")).join("");
    $("ceBusinessFilter").value = state.businessType;
    $("ceRatingFilter").value = state.rating;
    $("ceScopeHint").textContent =
      "当前查看" + getScopeLabel() + "在所选" + state.periodType + "的客户评价数据，筛选条件切换后即时更新。";
  }

  function renderHeader() {
    const role = getRole();
    const group = getGroup(state.groupId);
    const personResult = getPerson(state.personId);
    let title = "部门客户评价看板";
    let description = "从部门整体查看各业务组的客户评价表现，并逐级下钻至业务组和个人。";
    let subtitle = role.label + " · 部门评价视图";

    if (state.view === "group" && group) {
      title = group.name + "客户评价";
      description = "查看本组评价概览和组员表现，点击组员姓名进入个人评价视图。";
      subtitle = role.label + " · " + group.name + "视图";
    }
    if (state.view === "person" && personResult) {
      title = personResult.person.name + "个人客户评价";
      description = "查看本人负责项目的评分结构、问题类型与评价明细。";
      subtitle = role.label + " · " + personResult.person.name + "个人视图";
    }

    $("ceUserAvatar").textContent = role.avatar;
    $("ceUserName").textContent = role.userName;
    $("ceUserRole").textContent = role.label;
    $("cePageTitle").textContent = title;
    $("cePageDescription").textContent = description;
    $("topbarPageSubtitle").textContent = subtitle;
    document.title = title + " - 业务管理系统";
    renderBreadcrumb(group, personResult);
    renderPageActions();
  }

  function renderBreadcrumb(group, personResult) {
    const parts = [
      "<span>首页</span><span>/</span>",
      "<span>经营管理</span><span>/</span>"
    ];
    if (state.view === "department") {
      parts.push('<span class="ce-breadcrumb-current">客户评价</span>');
    } else {
      if (state.roleId === "departmentHead") {
        parts.push('<button type="button" class="ce-breadcrumb-button" data-nav-level="department">客户评价</button>');
      } else {
        parts.push("<span>客户评价</span>");
      }
      if (group) {
        parts.push("<span>/</span>");
        if (state.view === "person" && state.roleId !== "member") {
          parts.push(
            '<button type="button" class="ce-breadcrumb-button" data-nav-level="group">',
            escapeHTML(group.name),
            "</button>"
          );
        } else if (state.view === "group") {
          parts.push('<span class="ce-breadcrumb-current">', escapeHTML(group.name), "</span>");
        } else {
          parts.push("<span>", escapeHTML(group.name), "</span>");
        }
      }
      if (state.view === "person" && personResult) {
        parts.push(
          '<span>/</span><span class="ce-breadcrumb-current">',
          escapeHTML(personResult.person.name),
          "</span>"
        );
      }
    }
    $("ceBreadcrumb").innerHTML = parts.join("");
  }

  function renderPageActions() {
    const canBack =
      (state.view === "group" && state.roleId === "departmentHead") ||
      (state.view === "person" && state.roleId !== "member");
    const actions = [];
    if (canBack) {
      actions.push(
        '<button type="button" class="secondary-btn" data-page-action="back">',
        ICONS.back,
        "返回上一级</button>"
      );
    }
    actions.push(
      '<span class="ce-source-status">润汇采数据 · ',
      escapeHTML(getCurrentPeriod().label),
      "</span>"
    );
    $("cePageActions").innerHTML = actions.join("");
  }

  function contextStat(label, value) {
    return [
      '<div class="ce-context-stat"><span>',
      escapeHTML(label),
      "</span><strong>",
      escapeHTML(value),
      "</strong></div>"
    ].join("");
  }

  function renderContextBanner() {
    if (state.view === "group") {
      const group = getGroup(state.groupId);
      if (!group) return "";
      return [
        '<section class="panel ce-context-banner">',
        '<div class="ce-context-main"><span class="ce-context-icon">',
        ICONS.group,
        '</span><div class="ce-context-copy"><span class="ce-context-kicker">业务组客户评价视图</span><h2>',
        escapeHTML(group.name),
        "</h2><p>负责人 ",
        escapeHTML(group.leader),
        " · 共 ",
        group.memberIds.length,
        " 名组员</p></div></div>",
        '<div class="ce-context-stats">',
        contextStat("业务组负责人", group.leader),
        contextStat("组员人数", group.memberIds.length + "人"),
        contextStat("业务类型", group.businessType),
        "</div></section>"
      ].join("");
    }
    if (state.view === "person") {
      const result = getPerson(state.personId);
      if (!result) return "";
      return [
        '<section class="panel ce-context-banner">',
        '<div class="ce-context-main"><span class="ce-person-avatar">',
        escapeHTML(result.person.name.slice(0, 1)),
        '</span><div class="ce-context-copy"><span class="ce-context-kicker">个人客户评价视图</span><h2>',
        escapeHTML(result.person.name),
        "</h2><p>",
        escapeHTML(result.person.position),
        " · ",
        escapeHTML(result.group.name),
        "</p></div></div>",
        '<div class="ce-context-stats">',
        contextStat("当前岗位", result.person.position),
        contextStat("所属业务组", result.group.name),
        contextStat("业务类型", result.group.businessType),
        "</div></section>"
      ].join("");
    }
    return "";
  }

  function renderSummary(records) {
    const count = records.length;
    const excellentCount = records.filter((record) => getRating(record.score).name === "优秀").length;
    const problemCount = records.filter((record) => record.problems.length > 0).length;
    const cards = [
      {
        label: "客户平均分",
        value: count ? formatScore(averageScore(records)) : "—",
        unit: "分",
        foot: "有效评价综合评分均值",
        tone: "",
        icon: SUMMARY_ICONS.average
      },
      {
        label: "有效回收评价",
        value: count,
        unit: "份",
        foot: "当前范围内的评价样本",
        tone: "",
        icon: SUMMARY_ICONS.count
      },
      {
        label: "优秀评价占比",
        value: count ? (excellentCount / count * 100).toFixed(1) : "0.0",
        unit: "%",
        foot: excellentCount + "份评价达到9分及以上",
        tone: "success",
        icon: SUMMARY_ICONS.excellent
      },
      {
        label: "涉及问题评价",
        value: problemCount,
        unit: "份",
        foot: "占有效评价 " + (count ? (problemCount / count * 100).toFixed(1) : "0.0") + "%",
        tone: "warning",
        icon: SUMMARY_ICONS.problem
      }
    ];
    return [
      '<section class="ce-summary-grid" aria-label="评价概览">',
      cards.map((card) => [
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
      ].join("")).join(""),
      "</section>"
    ].join("");
  }

  function renderMetricValue(records, type) {
    if (type === "average") {
      return records.length ? formatScore(averageScore(records)) : "—";
    }
    if (type === "excellent") {
      const count = records.filter((record) => getRating(record.score).name === "优秀").length;
      return records.length ? (count / records.length * 100).toFixed(1) + "%" : "—";
    }
    if (type === "problems") {
      return String(records.filter((record) => record.problems.length > 0).length);
    }
    return String(records.length);
  }

  function renderGroupOverview() {
    const visibleGroups = GROUPS;
    return [
      '<section class="panel ce-hierarchy-panel dashboard-organization-panel">',
      '<div class="panel-head"><div><h2>业务组评价概览</h2><p>横向比较各业务组评价表现，点击业务组名称进入本组视图</p></div>',
      '<span class="dashboard-organization-count">', visibleGroups.length, " 个业务组</span></div>",
      '<div class="ce-hierarchy-table-wrap dashboard-organization-table-wrap"><table class="ce-hierarchy-table dashboard-organization-table">',
      '<colgroup><col style="width: 176px" /><col style="width: 108px" /><col style="width: 112px" /><col /><col /><col /><col /></colgroup>',
      '<thead><tr><th>业务组</th><th>负责人</th><th class="dashboard-organization-text">业务类型</th><th class="numeric-cell">有效评价</th>',
      '<th class="numeric-cell">客户平均分</th><th class="numeric-cell">优秀评价占比</th><th class="numeric-cell">涉及问题评价</th></tr></thead><tbody>',
      visibleGroups.map((group) => {
        const records = getFilteredRecords({ groupId: group.id });
        return [
          "<tr><td>",
          '<button type="button" class="ce-name-button dashboard-organization-link" data-group-id="',
          group.id,
          '"><span>',
          escapeHTML(group.name),
          "</span>",
          ICONS.arrow,
          "</button></td><td>",
          escapeHTML(group.leader),
          '</td><td class="dashboard-organization-text">',
          escapeHTML(group.businessType),
          '</td><td class="numeric-cell"><strong class="ce-table-number">',
          renderMetricValue(records, "count"),
          '</strong><span class="ce-table-unit">份</span></td><td class="numeric-cell"><strong class="ce-table-number">',
          renderMetricValue(records, "average"),
          '</strong><span class="ce-table-unit">分</span></td><td class="numeric-cell"><strong class="ce-table-number">',
          renderMetricValue(records, "excellent"),
          '</strong></td><td class="numeric-cell"><strong class="ce-table-number">',
          renderMetricValue(records, "problems"),
          '</strong><span class="ce-table-unit">份</span></td></tr>'
        ].join("");
      }).join(""),
      "</tbody></table></div></section>"
    ].join("");
  }

  function renderMemberOverview() {
    const group = getGroup(state.groupId);
    if (!group) return "";
    const members = group.memberIds.map((id) => getPerson(id)).filter(Boolean);
    return [
      '<section class="panel ce-hierarchy-panel">',
      '<div class="panel-head"><div><h2>组员评价明细</h2><p>部门负责人和业务组长可点击组员姓名进入个人评价视图</p></div>',
      '<span class="ce-count-tag">', members.length, " 名组员</span></div>",
      '<div class="ce-hierarchy-table-wrap"><table class="ce-hierarchy-table">',
      '<colgroup><col style="width: 196px" /><col style="width: 168px" /><col /><col /><col /><col /><col style="width: 112px" /></colgroup>',
      '<thead><tr><th>组员／项目经理</th><th>岗位</th><th class="numeric-cell">有效评价</th><th class="numeric-cell">客户平均分</th>',
      '<th class="numeric-cell">优秀评价占比</th><th class="numeric-cell">涉及问题评价</th><th>最近评价</th></tr></thead><tbody>',
      members.map((result) => {
        const records = getFilteredRecords({ personId: result.person.id });
        return [
          "<tr><td>",
          '<div class="ce-person-cell"><span class="ce-person-mini-avatar">',
          escapeHTML(result.person.name.slice(0, 1)),
          '</span><div class="ce-person-copy"><button type="button" class="ce-person-name-button" data-person-id="',
          result.person.id,
          '">',
          escapeHTML(result.person.name),
          "</button><span>",
          result.person.name === group.leader ? "业务组负责人" : "业务组成员",
          "</span></div></div></td><td>",
          escapeHTML(result.person.position),
          '</td><td class="numeric-cell"><strong class="ce-table-number">',
          renderMetricValue(records, "count"),
          '</strong><span class="ce-table-unit">份</span></td><td class="numeric-cell"><strong class="ce-table-number">',
          renderMetricValue(records, "average"),
          '</strong><span class="ce-table-unit">分</span></td><td class="numeric-cell"><strong class="ce-table-number">',
          renderMetricValue(records, "excellent"),
          '</strong></td><td class="numeric-cell"><strong class="ce-table-number">',
          renderMetricValue(records, "problems"),
          '</strong><span class="ce-table-unit">份</span></td><td>',
          records.length ? escapeHTML(formatDate(records[0].date)) : "—",
          "</td></tr>"
        ].join("");
      }).join(""),
      "</tbody></table></div></section>"
    ].join("");
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

  function renderTrend(records) {
    if (!records.length) return emptyState("暂无趋势数据", "请调整统计周期或筛选条件后查看");
    const periodMap = new Map();
    records.forEach((record) => {
      const key = state.periodType === "月度" ? record.date : record.date.slice(0, 7);
      if (!periodMap.has(key)) periodMap.set(key, []);
      periodMap.get(key).push(record.score);
    });
    const points = [...periodMap.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, values]) => ({
        label: state.periodType === "月度"
          ? Number(key.slice(5, 7)) + "/" + Number(key.slice(8, 10))
          : Number(key.slice(5, 7)) + "月",
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
    const xFor = (index) => points.length === 1
      ? left + chartWidth / 2
      : left + chartWidth * index / (points.length - 1);
    const yFor = (value) => top + (10 - value) / 5 * chartHeight;
    const coordinates = points.map((point, index) => ({ x: xFor(index), y: yFor(point.value), point }));
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
        '<line class="ce-trend-grid" x1="', left, '" y1="', y, '" x2="', width - right, '" y2="', y,
        '"></line><text class="ce-trend-label" x="', left - 9, '" y="', Number(y) + 4,
        '" text-anchor="end">', tick, "</text>"
      ].join("");
    }).join("");
    const pointMarkup = coordinates.map((item) => [
      '<circle class="ce-trend-dot" cx="', item.x.toFixed(1), '" cy="', item.y.toFixed(1),
      '" r="4"></circle><text class="ce-trend-value" x="', item.x.toFixed(1), '" y="',
      (item.y - 11).toFixed(1), '" text-anchor="middle">', formatScore(item.point.value),
      '</text><text class="ce-trend-label" x="', item.x.toFixed(1), '" y="', height - 8,
      '" text-anchor="middle">', item.point.label, "</text>"
    ].join("")).join("");
    return [
      '<svg class="ce-trend-svg" viewBox="0 0 ', width, " ", height,
      '" role="img" aria-label="客户平均分趋势">',
      '<defs><linearGradient id="ceTrendArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1677ff" stop-opacity="0.20"/><stop offset="100%" stop-color="#1677ff" stop-opacity="0.02"/></linearGradient></defs>',
      gridLines,
      areaPath ? '<path class="ce-trend-area" d="' + areaPath + '"></path>' : "",
      '<path class="ce-trend-line" d="', linePath, '"></path>',
      pointMarkup,
      "</svg>"
    ].join("");
  }

  function getTrendStatus(records) {
    if (records.length < 2) return { className: "pending", label: records.length ? "单周期数据" : "暂无数据" };
    const ordered = records.slice().sort((a, b) => a.date.localeCompare(b.date));
    const delta = ordered[ordered.length - 1].score - ordered[0].score;
    if (delta >= 0.2) return { className: "normal", label: "较期初提升" };
    if (delta <= -0.2) return { className: "warning", label: "较期初下降" };
    return { className: "normal", label: "整体稳定" };
  }

  function renderRatingDistribution(records) {
    if (!records.length) return emptyState("暂无评分数据", "请调整统计周期或筛选条件后查看");
    let cumulative = 0;
    const stats = RATING_META.map((meta) => {
      const count = records.filter((record) => getRating(record.score).name === meta.name).length;
      const percent = count / records.length * 100;
      const start = cumulative;
      cumulative += percent;
      return Object.assign({}, meta, { count, percent, start, end: cumulative });
    });
    const gradient = stats.map((item) => (
      item.color + " " + item.start.toFixed(2) + "% " + item.end.toFixed(2) + "%"
    )).join(", ");
    const interactive = state.view === "person";
    return [
      '<div class="ce-rating-donut-wrap"><div class="ce-rating-donut" style="background:conic-gradient(',
      gradient,
      ')"><div class="ce-rating-donut-center"><strong>',
      formatScore(averageScore(records)),
      "</strong><span>平均分</span></div></div><span>有效评价 ",
      records.length,
      " 份</span></div>",
      '<div class="ce-rating-list">',
      stats.map((item) => {
        const tag = interactive ? "button" : "div";
        const active = state.chartFilter &&
          state.chartFilter.type === "rating" &&
          state.chartFilter.value === item.name;
        return [
          "<", tag, interactive ? ' type="button"' : "",
          ' class="ce-rating-item', active ? " active" : "", '"',
          interactive ? ' data-rating="' + escapeHTML(item.name) + '"' : "",
          '><span class="ce-rating-dot" style="background:', item.color,
          '"></span><span>', escapeHTML(item.name), "</span><strong>",
          item.count, "份</strong><em>", item.percent.toFixed(1), "%</em></", tag, ">"
        ].join("");
      }).join(""),
      "</div>"
    ].join("");
  }

  function getProblemStats(records) {
    const counter = new Map();
    records.forEach((record) => {
      record.problems.forEach((problem) => counter.set(problem, (counter.get(problem) || 0) + 1));
    });
    return [...counter.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "zh-CN"));
  }

  function renderProblemAnalysis(records) {
    const rows = getProblemStats(records);
    if (!rows.length) return emptyState("暂无问题反馈", "当前范围内的评价未标记问题类型");
    const total = rows.reduce((sum, row) => sum + row.count, 0);
    const maxCount = Math.max(...rows.map((row) => row.count));
    const interactive = state.view === "person";
    return [
      '<div class="ce-problem-list">',
      rows.map((row) => {
        const tag = interactive ? "button" : "div";
        const active = state.chartFilter &&
          state.chartFilter.type === "problem" &&
          state.chartFilter.value === row.name;
        return [
          "<", tag, interactive ? ' type="button"' : "",
          ' class="ce-problem-row', active ? " active" : "", '"',
          interactive ? ' data-problem="' + escapeHTML(row.name) + '"' : "",
          "><span>", escapeHTML(row.name),
          '</span><span class="ce-bar-track"><span style="width:',
          (row.count / maxCount * 100).toFixed(1),
          '%"></span></span><strong>', row.count,
          "项</strong><em>", (row.count / total * 100).toFixed(1), "%</em></", tag, ">"
        ].join("");
      }).join(""),
      "</div>"
    ].join("");
  }

  function renderAnalysis(records) {
    const trendStatus = getTrendStatus(records);
    const problemCount = getProblemStats(records).reduce((sum, row) => sum + row.count, 0);
    const interactionTip = state.view === "person"
      ? "点击评分分类筛选本人评价明细"
      : "展示当前层级评价的评分构成";
    return [
      '<section class="ce-analysis-grid primary-analysis">',
      '<article class="panel ce-chart-panel"><div class="panel-head"><div><h2>客户平均分趋势</h2><p>',
      state.periodType === "月度" ? "按评价日期展示当月评分" : "按月展示季度平均分",
      " · 共", records.length, '份</p></div><span class="status-tag ',
      trendStatus.className, '">', trendStatus.label,
      '</span></div><div class="ce-chart-body ce-trend-chart">', renderTrend(records), "</div></article>",
      '<article class="panel ce-chart-panel"><div class="panel-head"><div><h2>评分分布</h2><p>',
      interactionTip, '</p></div><span class="ce-panel-total">',
      records.length, '份</span></div><div class="ce-rating-body">',
      renderRatingDistribution(records), "</div></article></section>",
      '<section class="panel ce-chart-panel ce-problem-panel"><div class="panel-head"><div><h2>问题类型分析</h2>',
      '<p>按问题标签出现次数统计，一份评价可包含多个问题</p></div><span class="ce-panel-total">',
      problemCount, '项</span></div><div class="ce-chart-body">',
      renderProblemAnalysis(records), "</div></section>"
    ].join("");
  }

  function renderProblemTags(record) {
    if (!record.problems.length) return '<span class="ce-no-problem">无问题反馈</span>';
    return [
      '<div class="ce-problem-tags">',
      record.problems.slice(0, 1).map((problem) => (
        '<span class="ce-problem-tag">' + escapeHTML(problem) + "</span>"
      )).join(""),
      record.problems.length > 1
        ? '<span class="ce-problem-tag">+' + (record.problems.length - 1) + "</span>"
        : "",
      "</div>"
    ].join("");
  }

  function renderDetailPanel(records) {
    const detailRecords = getDetailRecords(records);
    const context = state.chartFilter
      ? [
        '<div class="ce-table-context"><span>',
        state.chartFilter.type === "rating"
          ? "图表筛选：评分分类 = " + escapeHTML(state.chartFilter.value)
          : "图表筛选：问题类型 = " + escapeHTML(state.chartFilter.value),
        '</span><button type="button" data-clear-chart-filter>',
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
        "清除图表筛选</button></div>"
      ].join("")
      : "";
    return [
      '<section class="panel ce-detail-panel"><div class="panel-head ce-detail-head"><div><h2>本人评价明细</h2>',
      '<p>仅展示当前人员负责项目的有效客户评价</p></div><span class="status-tag pending">共',
      detailRecords.length, "条</span></div>",
      context,
      '<div class="ce-table-wrap"><table class="ce-table"><thead><tr><th>评价日期</th><th>项目／标段</th>',
      '<th>客户名称</th><th>业务类型</th><th>综合评分</th><th>评分分类</th><th>问题类型</th><th>操作</th>',
      '</tr></thead><tbody id="ceDetailTableBody"></tbody></table></div>',
      '<div class="app-pagination hidden" id="ceDetailPagination" aria-label="本人评价明细分页"></div></section>'
    ].join("");
  }

  function renderDetailRows(records) {
    const body = $("ceDetailTableBody");
    if (!body || !detailPagination) return;
    const paginationState = detailPagination.update(getDetailRecords(records));
    body.innerHTML = paginationState.items.length
      ? paginationState.items.map((record) => {
        const rating = getRating(record.score);
        return [
          "<tr><td>", escapeHTML(formatDate(record.date)),
          '</td><td><div class="ce-project-cell"><strong title="', escapeHTML(record.project), '">',
          escapeHTML(record.project), '</strong><span title="', escapeHTML(record.section), '">',
          escapeHTML(record.section), "</span></div></td><td>", escapeHTML(record.customer),
          "</td><td>", escapeHTML(record.businessType),
          '</td><td><span class="ce-score">', formatScore(record.score),
          '</span></td><td><span class="ce-rating-badge ', rating.className, '">',
          rating.name, "</span></td><td>", renderProblemTags(record),
          '</td><td><button type="button" class="ce-view-button" data-view-id="', escapeHTML(record.id),
          '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6S2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.5"/></svg>查看</button></td></tr>'
        ].join("");
      }).join("")
      : '<tr><td colspan="8" class="ce-table-empty">当前条件下暂无本人评价明细，请调整筛选条件后查看。</td></tr>';
  }

  function renderContent() {
    const records = getScopeRecords();
    if (detailPagination) {
      detailPagination.destroy();
      detailPagination = null;
    }
    const sections = [
      renderContextBanner(),
      renderSummary(records)
    ];
    if (state.view === "department") sections.push(renderGroupOverview());
    if (state.view === "group") sections.push(renderMemberOverview());
    sections.push(renderAnalysis(records));
    if (state.view === "person") sections.push(renderDetailPanel(records));
    $("ceContent").innerHTML = sections.join("");
    if (state.view === "person") {
      detailPagination = window.AppPagination.create({
        container: $("ceDetailPagination"),
        variant: "table",
        itemLabel: "条",
        onChange: () => renderDetailRows(getScopeRecords())
      });
      renderDetailRows(records);
    }
  }

  function renderDashboard() {
    renderRoleTabs();
    renderFilterControls();
    renderHeader();
    renderContent();
  }

  function resetTransientState() {
    state.chartFilter = null;
    closeDrawer();
  }

  function switchRole(roleId) {
    const role = ROLE_VIEWS.find((item) => item.id === roleId);
    if (!role) return;
    state.roleId = role.id;
    state.view = role.defaultView;
    state.groupId = role.groupId || null;
    state.personId = role.personId || null;
    resetTransientState();
    renderDashboard();
  }

  function openGroup(groupId) {
    const group = getGroup(groupId);
    if (!group || state.roleId !== "departmentHead") return;
    state.view = "group";
    state.groupId = group.id;
    state.personId = null;
    resetTransientState();
    renderDashboard();
  }

  function openPerson(personId) {
    const result = getPerson(personId);
    const role = getRole();
    if (!result) return;
    if (role.id === "groupLeader" && result.group.id !== role.groupId) return;
    if (role.id === "member" && result.person.id !== role.personId) return;
    state.view = "person";
    state.groupId = result.group.id;
    state.personId = result.person.id;
    resetTransientState();
    renderDashboard();
  }

  function goBack() {
    if (state.view === "person" && state.roleId !== "member") {
      state.view = "group";
      state.personId = null;
      resetTransientState();
      renderDashboard();
      return;
    }
    if (state.view === "group" && state.roleId === "departmentHead") {
      state.view = "department";
      state.groupId = null;
      resetTransientState();
      renderDashboard();
    }
  }

  function navigateToLevel(level) {
    if (level === "department" && state.roleId === "departmentHead") {
      state.view = "department";
      state.groupId = null;
      state.personId = null;
      resetTransientState();
      renderDashboard();
      return;
    }
    if (level === "group" && state.roleId !== "member" && state.groupId) {
      state.view = "group";
      state.personId = null;
      resetTransientState();
      renderDashboard();
    }
  }

  function setChartFilter(type, value) {
    if (state.view !== "person") return;
    state.chartFilter = state.chartFilter &&
      state.chartFilter.type === type &&
      state.chartFilter.value === value
      ? null
      : { type, value };
    renderContent();
  }

  function openDrawer(recordId) {
    const record = RECORDS.find((item) => item.id === recordId);
    if (!record) return;
    const currentPerson = getPerson(state.personId);
    if (state.view !== "person" || !currentPerson || record.manager !== currentPerson.person.name) return;
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
      if (!button || button.dataset.roleId === state.roleId) return;
      switchRole(button.dataset.roleId);
      if (window.showToast) window.showToast("已切换为：" + getRole().label + "视角");
    });

    $("cePeriodTypeTabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-period-type]");
      if (!button || button.dataset.periodType === state.periodType) return;
      state.periodType = button.dataset.periodType;
      resetTransientState();
      renderDashboard();
      if (window.showToast) window.showToast("已切换为：" + state.periodType + "评价");
    });

    $("cePeriodValueSelect").addEventListener("change", (event) => {
      state.selectedPeriods[state.periodType] = event.target.value;
      resetTransientState();
      renderDashboard();
      if (window.showToast) window.showToast("统计周期已切换为：" + getCurrentPeriod().label);
    });

    $("ceBusinessFilter").addEventListener("change", (event) => {
      state.businessType = event.target.value;
      resetTransientState();
      renderDashboard();
    });

    $("ceRatingFilter").addEventListener("change", (event) => {
      state.rating = event.target.value;
      resetTransientState();
      renderDashboard();
    });

    $("cePageActions").addEventListener("click", (event) => {
      const button = event.target.closest('[data-page-action="back"]');
      if (button) goBack();
    });

    $("ceBreadcrumb").addEventListener("click", (event) => {
      const button = event.target.closest("[data-nav-level]");
      if (button) navigateToLevel(button.dataset.navLevel);
    });

    $("ceContent").addEventListener("click", (event) => {
      const groupButton = event.target.closest("[data-group-id]");
      if (groupButton) {
        openGroup(groupButton.dataset.groupId);
        return;
      }
      const personButton = event.target.closest("[data-person-id]");
      if (personButton) {
        openPerson(personButton.dataset.personId);
        return;
      }
      const ratingButton = event.target.closest("[data-rating]");
      if (ratingButton) {
        setChartFilter("rating", ratingButton.dataset.rating);
        return;
      }
      const problemButton = event.target.closest("[data-problem]");
      if (problemButton) {
        setChartFilter("problem", problemButton.dataset.problem);
        return;
      }
      const clearButton = event.target.closest("[data-clear-chart-filter]");
      if (clearButton) {
        state.chartFilter = null;
        renderContent();
        return;
      }
      const viewButton = event.target.closest("[data-view-id]");
      if (viewButton) {
        openDrawer(viewButton.dataset.viewId);
      }
    });

    [$("ceDrawerClose"), $("ceDrawerCloseButton"), $("ceDrawerMask")].forEach((element) => {
      element.addEventListener("click", closeDrawer);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDrawer();
    });
  }

  function init() {
    setupEvents();
    renderDashboard();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
