(function setupSpecialManagement() {
  const CURRENT_DATE = "2026-07-28";
  const COMPLETION_TREND_SAMPLE = {
    planned: [1, 1, 2, 2, 3, 4, 5, 6, 7, 7, 8, 9],
    actual: [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2]
  };
  const PAGE_KEY = document.body.dataset.page;
  const IS_LIST_PAGE = PAGE_KEY === "special-list";
  const IS_RESULT_PAGE = PAGE_KEY === "special-results";

  const ICONS = {
    view:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/></svg>',
    progress:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V10M11 20V4M17 20v-7M22 20H2"/></svg>',
    folder:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h7l2 2h9v11H3z"/></svg>',
    clock:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></svg>',
    alert:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.8 19h18.4L12 3z"/><path d="M12 9v4M12 17h.01"/></svg>',
    trend:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 16 5-5 4 3 7-8"/><path d="M16 6h4v4"/></svg>',
    paperclip:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 13 6-6a3 3 0 1 1 4 4l-8 8a5 5 0 0 1-7-7l8-8"/></svg>',
    remove:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    empty:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="17" rx="2"/><path d="M8 2v4M16 2v4M8 11h8M8 15h5"/></svg>'
  };

  const DIRECTIONS = [
    {
      id: "customer-enable",
      label: "强化核心功能-客户赋能",
      value: "通过专业化支持助力客户提升采购能力与经营效益，规避采购风险，提高采购效率与质量，实现双方长期共赢发展。"
    },
    {
      id: "professional-capability",
      label: "锻造专业能力",
      value: "构建完善的业务质量管理体系，实现全过程风险前置防控、服务标准统一落地、运营效能持续提升，以规范化、标准化、精细化管理全面塑造核心竞争力。"
    }
  ];

  const PEOPLE = ["陈建", "朱乐悦", "张明", "赵倩", "邓小勇", "刘其永", "孙岚", "王军", "崔怀胜", "殷浩", "杜宏伟"];

  const specials = [
    createSpecial({
      id: "sp-001",
      year: 2026,
      directionId: "customer-enable",
      name: "客户培训",
      content: "结合客户需求，提供专业培训，围绕招标政策法规、行业规范、项目专业知识等组织专题培训。",
      target: target("次数", 12, "场", "全年各业务组累计完成客户培训不少于12场。"),
      startDate: "2026-01-05",
      deadline: "2026-12-20",
      leader: "朱乐悦",
      owner: "张明",
      assistants: ["各业务组长", "刘其永"],
      status: "in-progress",
      progress: 62,
      planProgress: 56,
      nodes: [
        node("sp001-n1", "完成一季度客户需求收集", "2026-03-20", "2026-03-15", "completed", "已形成培训需求清单。"),
        node("sp001-n2", "完成上半年8场客户培训", "2026-06-30", "2026-06-23", "completed", "已完成8场客户培训。"),
        node("sp001-n3", "形成重点主题课程包", "2026-09-30", "2026-07-25", "ongoing", "正在完善招标文件编制课程。"),
        node("sp001-n4", "完成全年培训总结", "2026-12-20", "2026-12-10", "pending", "")
      ],
      records: [
        record("sp001-r1", "2026年6月", "sp001-n2", "完成2场客户培训，累计完成8场。", 58, "根据客户需求开展电力组专题培训。", "客户培训签到表.pdf", "张明", "2026-06-28 16:20", "completed"),
        record("sp001-r2", "2026年7月", "sp001-n3", "完成课程框架梳理，补充采购文件编制案例。", 62, "完成课程包初稿并组织内部评审。", "课程框架V1.docx", "张明", "2026-07-25 10:12", "ongoing")
      ]
    }),
    createSpecial({
      id: "sp-002",
      year: 2026,
      directionId: "customer-enable",
      name: "专项报告",
      content: "定期为客户输出采购专项报告，结合项目进展、市场变化和风险情况提出专业建议。",
      target: target("次数", 4, "份", "全年完成4份客户采购专项报告。"),
      startDate: "2026-01-10",
      deadline: "2026-12-15",
      leader: "朱乐悦",
      owner: "邓小勇",
      assistants: ["质量管理岗"],
      status: "in-progress",
      progress: 50,
      planProgress: 54,
      nodes: [
        node("sp002-n1", "完成第一份专项报告", "2026-03-31", "2026-03-24", "completed", "已完成一季度采购风险专项报告。"),
        node("sp002-n2", "完成第二份专项报告", "2026-06-30", "2026-06-23", "completed", "已完成上半年专项报告。"),
        node("sp002-n3", "完成第三份专项报告", "2026-09-30", "2026-09-23", "ongoing", "正在收集第三季度数据。"),
        node("sp002-n4", "完成年度专项报告", "2026-12-15", "2026-12-05", "pending", "")
      ],
      records: [
        record("sp002-r1", "2026年6月", "sp002-n2", "完成上半年专项报告并提交客户沟通。", 50, "收集第三季度项目数据，确定报告主题。", "上半年专项报告.pdf", "邓小勇", "2026-06-30 09:45", "completed")
      ]
    }),
    createSpecial({
      id: "sp-003",
      year: 2026,
      directionId: "customer-enable",
      name: "售电集采",
      content: "统筹组织电力售电集采工作，面向各业务单元征集需求，牵头组织电力总部与各业务单元谈判。",
      target: target("节点", 4, "个", "完成需求收集、采购方案、集采实施和结果复盘4个关键节点。"),
      startDate: "2026-02-01",
      deadline: "2026-11-30",
      leader: "朱乐悦",
      owner: "邓小勇",
      assistants: ["刘其永", "各业务单元"],
      status: "in-progress",
      progress: 42,
      planProgress: 56,
      nodes: [
        node("sp003-n1", "完成各单位需求收集", "2026-04-30", "2026-04-23", "completed", "已完成需求汇总。"),
        node("sp003-n2", "确认集采方案", "2026-06-15", "2026-06-08", "completed", "已完成方案确认。"),
        node("sp003-n3", "完成集采实施", "2026-09-30", "2026-09-20", "ongoing", "部分单位仍在对接。"),
        node("sp003-n4", "完成结果复盘", "2026-11-30", "2026-11-20", "pending", "")
      ],
      records: [
        record("sp003-r1", "2026年6月", "sp003-n2", "完成广东、云南、海南、重庆等单位需求对接。", 42, "推进剩余单位衔接并启动集采实施。", "需求对接清单.xlsx", "邓小勇", "2026-06-29 14:10", "completed")
      ]
    }),
    createSpecial({
      id: "sp-004",
      year: 2026,
      directionId: "professional-capability",
      name: "业务培训（审计整改项）",
      content: "组织部门内部专项课程分享，覆盖招标政策法规、业务技能、风险防控和廉洁自律等主题。",
      target: target("次数", 12, "场", "全年部门培训总场数不少于12场。"),
      startDate: "2026-01-06",
      deadline: "2026-06-30",
      completionDate: "2026-06-28",
      leader: "朱乐悦",
      owner: "刘其永",
      assistants: ["各业务组长"],
      status: "completed",
      progress: 100,
      planProgress: 100,
      audit: true,
      nodes: [
        node("sp004-n1", "开展两期四个主题分享", "2026-04-30", "2026-04-23", "completed", "已完成。"),
        node("sp004-n2", "开展两期五个主题分享", "2026-05-31", "2026-05-24", "completed", "已完成。"),
        node("sp004-n3", "开展两期七个主题分享", "2026-06-25", "2026-06-18", "completed", "已完成。"),
        node("sp004-n4", "完成课程计划总结", "2026-06-30", "2026-06-23", "completed", "已完成并归档。")
      ],
      records: [
        record("sp004-r1", "2026年6月", "sp004-n4", "完成七个主题分享及课程计划总结。", 100, "持续完善课程内容并形成常态化机制。", "培训总结.pdf", "刘其永", "2026-06-28 17:30", "completed")
      ]
    }),
    createSpecial({
      id: "sp-005",
      year: 2026,
      directionId: "professional-capability",
      name: "案例库管理（审计整改项）",
      content: "建立案例库，明确收集范围和分类规则，将典型案例纳入部门学习资料。",
      target: target("数量", 35, "个", "全年收集业务案例35个，按月持续更新。"),
      startDate: "2026-01-10",
      deadline: "2026-12-20",
      leader: "邓小勇",
      owner: "崔怀胜",
      assistants: ["质量管理岗"],
      status: "in-progress",
      progress: 68,
      planProgress: 56,
      audit: true,
      nodes: [
        node("sp005-n1", "制定案例收集标准", "2026-04-20", "2026-04-13", "completed", "标准已发布。"),
        node("sp005-n2", "累计收集12个案例", "2026-06-30", "2026-06-23", "completed", "已完成12个案例。"),
        node("sp005-n3", "完成案例分类复核", "2026-09-30", "2026-09-23", "ongoing", "持续收集和复核。"),
        node("sp005-n4", "完成年度案例库归档", "2026-12-20", "2026-12-10", "pending", "")
      ],
      records: [
        record("sp005-r1", "2026年6月", "sp005-n2", "累计收集12个案例并完成初步分类。", 60, "继续收集并开展案例质量复核。", "案例目录.xlsx", "崔怀胜", "2026-06-30 11:26", "completed"),
        record("sp005-r2", "2026年7月", "sp005-n3", "新增4个案例，完成重点案例标签整理。", 68, "组织案例评审，完善分类说明。", "案例标签说明.docx", "崔怀胜", "2026-07-24 15:08", "ongoing")
      ]
    }),
    createSpecial({
      id: "sp-006",
      year: 2026,
      directionId: "professional-capability",
      name: "质量复盘（审计整改项）",
      content: "对合规审核意见、质量问题和上级检查问题进行梳理，定期宣贯并形成改进闭环。",
      target: target("节点", 4, "个", "按季度完成质量问题复盘、宣贯和改进事项闭环。"),
      startDate: "2026-01-08",
      deadline: "2026-12-18",
      leader: "邓小勇",
      owner: "殷浩",
      assistants: ["宏伟", "崔怀胜"],
      status: "in-progress",
      progress: 52,
      planProgress: 56,
      audit: true,
      nodes: [
        node("sp006-n1", "完成一季度质量复盘", "2026-04-15", "2026-04-08", "completed", "已完成并宣贯。"),
        node("sp006-n2", "完成上半年质量复盘", "2026-07-15", "2026-07-08", "ongoing", "复盘材料已整理。"),
        node("sp006-n3", "完成三季度质量复盘", "2026-10-15", "2026-10-08", "pending", ""),
        node("sp006-n4", "完成年度质量总结", "2026-12-18", "2026-12-08", "pending", "")
      ],
      records: [
        record("sp006-r1", "2026年6月", "sp006-n2", "完成5月合规审核意见整理，形成问题清单。", 48, "分析6月审核意见并梳理需宣贯事项。", "审核问题清单.xlsx", "殷浩", "2026-06-30 18:05", "ongoing"),
        record("sp006-r2", "2026年7月", "sp006-n2", "完成上半年问题归类及复盘材料初稿。", 52, "组织复盘宣贯并明确责任人。", "复盘材料初稿.pptx", "殷浩", "2026-07-26 09:18", "ongoing")
      ]
    }),
    createSpecial({
      id: "sp-007",
      year: 2026,
      directionId: "professional-capability",
      name: "搭建学习平台（审计整改项）",
      content: "建设能源行业题库，利用问卷载体开展学习工具应用和岗位知识提升。",
      target: target("百分比", 100, "%", "题库上线应用并完成测试，测试通过率达到100%。"),
      startDate: "2026-01-12",
      deadline: "2026-06-30",
      completionDate: "2026-06-25",
      leader: "朱乐悦",
      owner: "邓小勇",
      assistants: ["学习平台工作组"],
      status: "completed",
      progress: 100,
      planProgress: 100,
      audit: true,
      nodes: [
        node("sp007-n1", "梳理70道火电专业题目", "2026-04-30", "2026-04-23", "completed", "已完成。"),
        node("sp007-n2", "完成平台测试与宣讲", "2026-05-31", "2026-05-24", "completed", "已完成。"),
        node("sp007-n3", "发布100道新能源专业题", "2026-06-20", "2026-06-13", "completed", "已完成。"),
        node("sp007-n4", "完成应用情况跟踪", "2026-06-30", "2026-06-23", "completed", "测试通过率100%。")
      ],
      records: [
        record("sp007-r1", "2026年6月", "sp007-n4", "完成新能源专业知识题库发布和测试，测试通过率100%。", 100, "转入常态化维护并跟踪使用情况。", "题库测试结果.xlsx", "邓小勇", "2026-06-25 16:40", "completed")
      ]
    }),
    createSpecial({
      id: "sp-008",
      year: 2026,
      directionId: "professional-capability",
      name: "政策分析研究",
      content: "动态更新政策法规库，精准解读行业内新发布法规政策，形成业务合规判断依据。",
      target: target("节点", 4, "个", "完成政策收集、重点解读、内部宣贯和年度政策库更新。"),
      startDate: "2026-02-01",
      deadline: "2026-10-31",
      leader: "邓小勇",
      owner: "殷浩",
      assistants: ["法务协同组"],
      status: "in-progress",
      progress: 38,
      planProgress: 56,
      nodes: [
        node("sp008-n1", "建立政策法规目录", "2026-04-30", "2026-04-23", "completed", "已完成目录建立。"),
        node("sp008-n2", "完成重点政策解读", "2026-06-30", "2026-06-23", "ongoing", "部分政策仍需补充分析。"),
        node("sp008-n3", "完成内部政策宣贯", "2026-08-31", "2026-08-24", "pending", ""),
        node("sp008-n4", "更新年度政策法规库", "2026-10-31", "2026-10-21", "pending", "")
      ],
      records: [
        record("sp008-r1", "2026年6月", "sp008-n2", "完成招标投标法修订草案初步分析。", 38, "持续跟踪法规进展，补充合同台账责任分析。", "政策解读初稿.docx", "殷浩", "2026-06-29 19:02", "ongoing")
      ]
    }),
    createSpecial({
      id: "sp-009",
      year: 2026,
      directionId: "professional-capability",
      name: "检查协同（审计、巡视等）",
      content: "保障巡视审计工作顺利推进，及时配合材料提供，维护公司合规形象。",
      target: target("节点", 3, "个", "完成共企互查、问题整改和复核确认三个协同节点。"),
      startDate: "2026-08-01",
      deadline: "2026-11-30",
      leader: "杜宏伟",
      owner: "刘其永",
      assistants: ["相关业务组"],
      status: "not-started",
      progress: 0,
      planProgress: 0,
      nodes: [
        node("sp009-n1", "准备检查资料", "2026-08-31", "2026-08-24", "pending", ""),
        node("sp009-n2", "完成问题整改", "2026-10-15", "2026-10-08", "pending", ""),
        node("sp009-n3", "完成复核确认", "2026-11-30", "2026-11-20", "pending", "")
      ],
      records: []
    })
  ];

  let activeYear = "2026";
  let activeDirection = "all";
  let activeStatus = "all";
  let activeHealth = "all";
  let activeWorkState = "all";
  let activeSpecialId = null;
  let activeDetailTab = "overview";
  let activeDetailNodeId = null;
  let specialPagination = null;
  let editSpecialId = null;
  let editingNodes = [];
  let customSpecialCounter = 1;
  let customRecordCounter = 1;

  const $ = (id) => document.getElementById(id);

  function target(type, value, unit, description) {
    return { type, value, unit, description };
  }

  function node(id, name, dueDate, remindDate, status, noteText, reminderContent) {
    return {
      id,
      name,
      dueDate,
      remindDate,
      status,
      note: noteText || "",
      reminderContent: reminderContent || ""
    };
  }

  function record(id, period, nodeId, current, progressValue, nextPlan, attachment, submitter, submittedAt, nodeStatus) {
    return {
      id,
      period,
      nodeId,
      current,
      progress: progressValue,
      nextPlan,
      attachment,
      submitter,
      submittedAt,
      nodeStatus: nodeStatus || "ongoing"
    };
  }

  function createSpecial(config) {
    const direction = DIRECTIONS.find((item) => item.id === config.directionId);
    return {
      value: direction ? direction.value : "",
      audit: false,
      completionDate: "",
      ...config
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

  function escapeAttr(value) {
    return escapeHTML(value).replace(/'/g, "&#39;");
  }

  function notify(message, tone) {
    if (typeof window.showToast === "function") {
      window.showToast(message, tone);
    }
  }

  function getSpecial(id) {
    return specials.find((item) => item.id === id) || null;
  }

  function getDirection(id) {
    return DIRECTIONS.find((item) => item.id === id) || DIRECTIONS[0];
  }

  function getStatusMeta(status) {
    const map = {
      "not-started": { label: "未开始", className: "not-started" },
      "in-progress": { label: "进行中", className: "in-progress" },
      completed: { label: "已完成", className: "completed" }
    };
    return map[status] || map["in-progress"];
  }

  function getHealth(item) {
    if (item.status === "not-started") return "normal";
    const difference = item.progress - item.planProgress;
    if (difference > 5) return "ahead";
    if (difference < -5) return "delayed";
    return "normal";
  }

  function getHealthMeta(health) {
    const map = {
      ahead: { label: "提前", className: "ahead" },
      normal: { label: "正常", className: "normal" },
      delayed: { label: "延迟", className: "delayed" }
    };
    return map[health] || map.normal;
  }

  function getNodeMeta(status) {
    const map = {
      pending: { label: "未开始", className: "pending" },
      ongoing: { label: "进行中", className: "ongoing" },
      completed: { label: "已完成", className: "completed" }
    };
    return map[status] || map.pending;
  }

  function buildReminderContent(itemName, nodeItem) {
    return "【专项节点提醒】“" + itemName + "”专项的“" + nodeItem.name +
      "”节点将于" + formatDate(nodeItem.dueDate) + "到期，请按计划推进并及时更新进展。";
  }

  function getReminderContent(item, nodeItem) {
    return nodeItem.reminderContent || buildReminderContent(item.name, nodeItem);
  }

  function formatDate(value) {
    if (!value) return "-";
    const parts = value.split("-");
    if (parts.length !== 3) return value;
    return parts[0] + "-" + parts[1] + "-" + parts[2];
  }

  function getCurrentNode(item) {
    return item.nodes.find((nodeItem) => nodeItem.status !== "completed") || item.nodes[item.nodes.length - 1] || null;
  }

  function getWorkState(item) {
    if (item.status === "completed") return "completed";
    const currentNode = getCurrentNode(item);
    if (!currentNode || currentNode.status === "completed") return "completed";
    if (currentNode.dueDate < CURRENT_DATE) return "overdue";
    if (currentNode.remindDate <= CURRENT_DATE) return "action";
    return "normal";
  }

  function getWorkStateMeta(state) {
    const map = {
      action: { label: "待处理", className: "action" },
      overdue: { label: "已逾期", className: "overdue" },
      normal: { label: "正常推进", className: "normal" },
      completed: { label: "已完成", className: "completed" }
    };
    return map[state] || map.normal;
  }

  function getFilteredSpecials() {
    return specials.filter((item) => {
      if (String(item.year) !== activeYear) return false;
      if (activeDirection !== "all" && item.directionId !== activeDirection) return false;
      if (activeStatus !== "all" && item.status !== activeStatus) return false;
      if (activeHealth !== "all" && getHealth(item) !== activeHealth) return false;
      return true;
    });
  }

  function renderWorkTabs(items) {
    if (!IS_LIST_PAGE) return;
    const tabs = [
      { value: "all", label: "全部" },
      { value: "action", label: "待处理" },
      { value: "overdue", label: "已逾期" },
      { value: "normal", label: "正常推进" },
      { value: "completed", label: "已完成" }
    ];
    $("specialWorkTabs").innerHTML = tabs.map((tab) => {
      const count = tab.value === "all"
        ? items.length
        : items.filter((item) => getWorkState(item) === tab.value).length;
      return [
        '<button type="button" class="special-work-tab ',
        tab.value,
        activeWorkState === tab.value ? " active" : "",
        '" data-work-state="',
        tab.value,
        '"><span>',
        escapeHTML(tab.label),
        "</span><strong>",
        count,
        "</strong></button>"
      ].join("");
    }).join("");
  }

  function populateFilters() {
    const directionFilter = $("specialDirectionFilter");
    if (!directionFilter) return;
    const currentValue = directionFilter.value || activeDirection;
    directionFilter.innerHTML = [
      '<option value="all">全部方向</option>',
      ...DIRECTIONS.map((item) => (
        '<option value="' + escapeAttr(item.id) + '">' + escapeHTML(item.label) + "</option>"
      ))
    ].join("");
    directionFilter.value = currentValue;
  }

  function renderProgress(item) {
    const health = getHealth(item);
    return [
      '<div class="special-progress-cell ',
      health,
      '">',
      '<div class="special-progress-head"><strong>',
      item.progress,
      '%</strong><span>计划 ',
      item.planProgress,
      "%</span></div>",
      '<div class="special-progress-track">',
      '<span class="planned" style="width:',
      Math.min(item.planProgress, 100),
      '%"></span>',
      '<span class="actual" style="width:',
      Math.min(item.progress, 100),
      '%"></span>',
      "</div></div>"
    ].join("");
  }

  function renderList() {
    if (!IS_LIST_PAGE) return;
    const baseItems = getFilteredSpecials();
    renderWorkTabs(baseItems);
    const items = activeWorkState === "all"
      ? baseItems
      : baseItems.filter((item) => getWorkState(item) === activeWorkState);
    const paginationState = specialPagination.update(items);
    $("specialListCount").textContent = items.length + "项专项";
    if (!items.length) {
      $("specialListBody").innerHTML = [
        '<tr><td colspan="10"><div class="special-empty">',
        '<span class="special-empty-icon">',
        ICONS.empty,
        "</span><strong>没有符合条件的专项</strong>",
        "<span>请调整年度、工作方向或状态筛选条件。</span>",
        "</div></td></tr>"
      ].join("");
      return;
    }

    $("specialListBody").innerHTML = paginationState.items.map((item) => {
      const direction = getDirection(item.directionId);
      const status = getStatusMeta(item.status);
      const health = getHealthMeta(getHealth(item));
      const currentNode = getCurrentNode(item);
      const workState = getWorkState(item);
      const workStateMeta = getWorkStateMeta(workState);
      return [
        '<tr class="special-work-row ',
        workState,
        '">',
        "<td>",
        '<button type="button" class="special-name-link" data-special-detail="',
        escapeAttr(item.id),
        '" title="',
        escapeAttr(item.name),
        '">',
        escapeHTML(item.name),
        "</button>",
        '<div class="special-name-meta">',
        item.audit ? '<span class="special-audit-tag">审计整改项</span>' : "",
        '<span class="special-target-tag">',
        escapeHTML(item.target.type),
        "目标</span></div>",
        "</td>",
        '<td><span class="special-direction-text" title="',
        escapeAttr(direction.label),
        '">',
        escapeHTML(direction.label),
        "</span></td>",
        "<td>",
        renderProgress(item),
        "</td>",
        '<td><span class="special-status ',
        status.className,
        '">',
        escapeHTML(status.label),
        "</span></td>",
        '<td><span class="special-health ',
        health.className,
        '">',
        escapeHTML(health.label),
        "</span></td>",
        "<td>",
        currentNode
          ? '<div class="special-current-node-state"><div><strong>' +
            escapeHTML(currentNode.name) +
            '</strong><span class="special-work-state ' +
            workStateMeta.className +
            '">' +
            escapeHTML(workStateMeta.label) +
            '</span></div><small>节点期限 ' +
            escapeHTML(formatDate(currentNode.dueDate)) +
            "</small></div>"
          : '<span class="special-current-node-empty">-</span>',
        "</td>",
        '<td><span class="special-table-date">',
        escapeHTML(formatDate(item.deadline)),
        "</span></td>",
        '<td><span class="special-person">',
        escapeHTML(item.leader),
        "</span></td>",
        '<td><span class="special-person">',
        escapeHTML(item.owner),
        "</span></td>",
        '<td><div class="special-row-actions">',
        '<button type="button" class="special-row-button" data-special-detail="',
        escapeAttr(item.id),
        '">',
        ICONS.view,
        "查看</button>",
        item.status !== "completed"
          ? '<button type="button" class="special-row-button primary" data-open-progress="' +
            escapeAttr(item.id) + '" data-progress-node="' +
            escapeAttr(currentNode ? currentNode.id : "") + '">' + ICONS.progress +
            (workState === "overdue" || workState === "action"
              ? "立即填报"
              : "填报") + "</button>"
          : "",
        "</div></td>",
        "</tr>"
      ].join("");
    }).join("");
  }

  function summaryCard(label, value, unit, foot, tone, icon) {
    return [
      '<article class="card special-summary-card ',
      tone || "",
      '">',
      '<div class="special-summary-top"><span>',
      escapeHTML(label),
      '</span><span class="special-summary-icon">',
      icon,
      "</span></div>",
      '<div class="special-summary-value"><strong>',
      value,
      "</strong><span>",
      escapeHTML(unit),
      "</span></div>",
      '<div class="special-summary-foot">',
      escapeHTML(foot),
      "</div></article>"
    ].join("");
  }

  function renderResultSummary(items) {
    const total = items.length;
    const notStarted = items.filter((item) => item.status === "not-started").length;
    const inProgress = items.filter((item) => item.status === "in-progress").length;
    const completed = items.filter((item) => item.status === "completed").length;
    const delayed = items.filter((item) => getHealth(item) === "delayed").length;
    const completionRate = total ? Math.round((completed / total) * 100) : 0;
    const delayRate = total ? Math.round((delayed / total) * 100) : 0;
    $("specialResultSummary").innerHTML = [
      summaryCard("专项总数", total, "项", "当前筛选范围", "", ICONS.folder),
      summaryCard("未开始", notStarted, "项", "尚未进入起始时间", "", ICONS.clock),
      summaryCard("进行中", inProgress, "项", "正在推进的专项", "", ICONS.progress),
      summaryCard("已完成", completed, "项", "已确认完成", "completed", ICONS.check),
      summaryCard("完成率", completionRate, "%", "已完成数量 ÷ 总数", "completed", ICONS.trend),
      summaryCard("延迟率", delayRate, "%", "延迟数量 ÷ 总数", "delayed", ICONS.alert)
    ].join("");
  }

  function renderCompletionChart(items) {
    const maximum = Math.max(items.length, 1);
    const useDefaultSample = activeYear === "2026" &&
      activeDirection === "all" &&
      activeStatus === "all" &&
      activeHealth === "all";
    const months = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      const planned = useDefaultSample
        ? COMPLETION_TREND_SAMPLE.planned[index]
        : items.filter((item) => Number(item.deadline.slice(5, 7)) <= month).length;
      const actual = useDefaultSample
        ? COMPLETION_TREND_SAMPLE.actual[index]
        : items.filter((item) => (
          item.completionDate &&
          Number(item.completionDate.slice(5, 7)) <= month
        )).length;
      return { month, planned, actual };
    });

    $("specialCompletionChart").innerHTML = months.map((item) => {
      const plannedHeight = Math.max(item.planned ? 8 : 4, Math.round((item.planned / maximum) * 170));
      const actualHeight = Math.max(item.actual ? 8 : 4, Math.round((item.actual / maximum) * 170));
      return [
        '<div class="special-chart-month">',
        '<div class="special-chart-bar planned" style="height:',
        plannedHeight,
        'px"><span>',
        item.planned,
        "</span></div>",
        '<div class="special-chart-bar actual" style="height:',
        actualHeight,
        'px"><span>',
        item.actual,
        "</span></div>",
        '<div class="special-chart-label">',
        item.month,
        "月</div></div>"
      ].join("");
    }).join("");
  }

  function renderSingleProgress(value, type, health) {
    return [
      '<div class="special-single-progress ',
      type,
      type === "actual" ? " " + health : "",
      '">',
      '<div class="special-single-progress-head"><span>',
      type === "planned" ? "计划" : "实际",
      "</span><strong>",
      value,
      "%</strong></div>",
      '<div class="special-single-track"><span style="width:',
      Math.min(value, 100),
      '%"></span></div></div>'
    ].join("");
  }

  function renderResultTable(items) {
    const paginationState = specialPagination.update(items);
    $("specialResultCount").textContent = items.length + "项专项";
    if (!items.length) {
      $("specialResultTableBody").innerHTML = [
        '<tr><td colspan="9"><div class="special-empty">',
        '<span class="special-empty-icon">',
        ICONS.empty,
        "</span><strong>没有符合条件的专项</strong>",
        "<span>请调整筛选条件后查看。</span>",
        "</div></td></tr>"
      ].join("");
      return;
    }

    $("specialResultTableBody").innerHTML = paginationState.items.map((item) => {
      const direction = getDirection(item.directionId);
      const healthKey = getHealth(item);
      const health = getHealthMeta(healthKey);
      const status = getStatusMeta(item.status);
      const difference = item.progress - item.planProgress;
      const differenceClass = difference > 0 ? "positive" : difference < 0 ? "negative" : "neutral";
      const differenceText = difference > 0
        ? "提前 " + difference + "%"
        : difference < 0
          ? "落后 " + Math.abs(difference) + "%"
          : "持平";
      return [
        "<tr>",
        '<td><button type="button" class="special-name-link" data-special-detail="',
        escapeAttr(item.id),
        '">',
        escapeHTML(item.name),
        "</button><div class=\"special-name-meta\">",
        item.audit ? '<span class="special-audit-tag">审计整改项</span>' : "",
        '<span class="special-target-tag">',
        escapeHTML(item.target.type),
        "目标</span></div></td>",
        '<td><span class="special-direction-text">',
        escapeHTML(direction.label),
        "</span></td>",
        "<td>",
        renderSingleProgress(item.planProgress, "planned", healthKey),
        "</td>",
        "<td>",
        renderSingleProgress(item.progress, "actual", healthKey),
        "</td>",
        '<td><span class="special-progress-diff ',
        differenceClass,
        '">',
        differenceText,
        "</span></td>",
        '<td><span class="special-health ',
        health.className,
        '">',
        escapeHTML(health.label),
        "</span></td>",
        '<td><span class="special-table-date">',
        escapeHTML(formatDate(item.deadline)),
        "</span></td>",
        '<td><span class="special-status ',
        status.className,
        '">',
        escapeHTML(status.label),
        "</span></td>",
        '<td><div class="special-row-actions"><button type="button" class="special-row-button primary" data-special-detail="',
        escapeAttr(item.id),
        '">',
        ICONS.view,
        "查看详情</button></div></td>",
        "</tr>"
      ].join("");
    }).join("");
  }

  function renderResults() {
    if (!IS_RESULT_PAGE) return;
    const items = getFilteredSpecials();
    $("specialResultPeriod").textContent = activeYear === "2026"
      ? "2026年度 · 截至7月"
      : activeYear + "年度";
    renderResultSummary(items);
    renderCompletionChart(items);
    renderResultTable(items);
  }

  function detailStat(label, value) {
    return [
      '<div class="special-detail-stat"><span>',
      escapeHTML(label),
      "</span><strong>",
      escapeHTML(value),
      "</strong></div>"
    ].join("");
  }

  function detailStatusStat(label, meta, type) {
    return [
      '<div class="special-detail-stat"><span>',
      escapeHTML(label),
      '</span><div class="special-detail-status-value"><span class="special-',
      type,
      " ",
      escapeAttr(meta.className),
      '">',
      escapeHTML(meta.label),
      "</span></div></div>"
    ].join("");
  }

  function infoItem(label, value, full) {
    return [
      '<div class="special-info-item',
      full ? " full" : "",
      '"><span>',
      escapeHTML(label),
      "</span><strong>",
      escapeHTML(value || "-"),
      "</strong></div>"
    ].join("");
  }

  function renderOverview(item) {
    const direction = getDirection(item.directionId);
    const status = getStatusMeta(item.status);
    const health = getHealthMeta(getHealth(item));
    return [
      '<div class="special-detail-summary">',
      detailStat("实际进度", item.progress + "%"),
      detailStat("计划进度", item.planProgress + "%"),
      detailStatusStat("专项状态", status, "status"),
      detailStatusStat("进度状态", health, "health"),
      detailStat("完成期限", formatDate(item.deadline)),
      "</div>",
      '<section class="special-detail-section"><h3>专项信息</h3>',
      '<div class="special-info-grid">',
      infoItem("所属年度", item.year + "年"),
      infoItem("工作方向", direction.label),
      infoItem("起始时间", formatDate(item.startDate)),
      infoItem("最终完成期限", formatDate(item.deadline)),
      infoItem("价值说明", item.value, true),
      infoItem("主要工作内容", item.content, true),
      infoItem("牵头人", item.leader),
      infoItem("主责任人", item.owner),
      infoItem("辅责任人/协同人", item.assistants.join("、"), true),
      "</div></section>",
      '<section class="special-detail-section"><h3>目标与成效</h3>',
      '<div class="special-target-box"><div class="special-target-box-head"><strong>',
      escapeHTML(item.target.type + "目标"),
      '</strong><span class="special-target-tag">目标值 ',
      escapeHTML(item.target.value + item.target.unit),
      "</span></div><p>",
      escapeHTML(item.target.description),
      "</p></div></section>"
    ].join("");
  }

  function renderNodes(item) {
    if (!item.nodes.length) {
      return renderDetailEmpty("暂无工作节点", "请在编辑专项中补充节点和提醒时间。");
    }
    return [
      '<div class="special-node-timeline">',
      item.nodes.map((nodeItem) => {
        const meta = getNodeMeta(nodeItem.status);
        return [
          '<article class="special-node-item ',
          meta.className,
          activeDetailNodeId === nodeItem.id ? " focused" : "",
          '" data-detail-node="',
          escapeAttr(nodeItem.id),
          '"><span class="special-node-dot"></span>',
          '<div class="special-node-card"><div class="special-node-card-head"><strong>',
          escapeHTML(nodeItem.name),
          '</strong><span class="special-node-status ',
          meta.className,
          '">',
          escapeHTML(meta.label),
          "</span></div>",
          '<div class="special-node-card-meta"><span>完成期限：',
          escapeHTML(formatDate(nodeItem.dueDate)),
          "</span><span>消息触发时间：",
          escapeHTML(formatDate(nodeItem.remindDate)),
          "</span></div>",
          nodeItem.note ? "<p>" + escapeHTML(nodeItem.note) + "</p>" : "",
          "</div></article>"
        ].join("");
      }).join(""),
      "</div>"
    ].join("");
  }

  function renderRecords(item) {
    if (!item.records.length) {
      return renderDetailEmpty("暂无进展记录", "主责任人提交进展后将在这里按周期展示。");
    }
    const records = [...item.records].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
    return [
      '<div class="special-record-list">',
      records.map((recordItem) => {
        const nodeItem = item.nodes.find((candidate) => candidate.id === recordItem.nodeId);
        const nodeMeta = getNodeMeta(recordItem.nodeStatus);
        return [
          '<article class="special-record-card"><div class="special-record-head"><div><strong>',
          escapeHTML(recordItem.period),
          "</strong><span>",
          escapeHTML(nodeItem ? nodeItem.name : "未关联节点"),
          '</span></div><span class="special-record-status ',
          nodeMeta.className,
          '">',
          escapeHTML(nodeMeta.label),
          "</span></div>",
          '<div class="special-record-progress"><span>填报进度</span><div><i style="width:',
          Math.min(recordItem.progress, 100),
          '%"></i></div><strong>',
          recordItem.progress,
          "%</strong></div>",
          '<div class="special-record-content">',
          '<div class="special-record-block"><span>本期完成情况</span><p>',
          escapeHTML(recordItem.current),
          "</p></div>",
          '<div class="special-record-block"><span>下周期开展计划</span><p>',
          escapeHTML(recordItem.nextPlan),
          "</p></div></div>",
          '<div class="special-record-foot"><span>填报人：',
          escapeHTML(recordItem.submitter),
          " · ",
          escapeHTML(recordItem.submittedAt),
          "</span>",
          recordItem.attachment
            ? '<span class="special-attachment">' + ICONS.paperclip + escapeHTML(recordItem.attachment) + "</span>"
            : "<span>无附件</span>",
          "</div></article>"
        ].join("");
      }).join(""),
      "</div>"
    ].join("");
  }

  function renderDetailEmpty(title, description) {
    return [
      '<div class="special-empty"><span class="special-empty-icon">',
      ICONS.empty,
      "</span><strong>",
      escapeHTML(title),
      "</strong><span>",
      escapeHTML(description),
      "</span></div>"
    ].join("");
  }

  function renderDetailBody() {
    const item = getSpecial(activeSpecialId);
    if (!item || !$("specialDetailBody")) return;
    const renderers = {
      overview: renderOverview,
      nodes: renderNodes,
      records: renderRecords
    };
    $("specialDetailBody").innerHTML = (renderers[activeDetailTab] || renderOverview)(item);
    document.querySelectorAll("[data-detail-tab]").forEach((button) => {
      button.classList.toggle("active", button.dataset.detailTab === activeDetailTab);
    });
    if (activeDetailTab === "nodes" && activeDetailNodeId) {
      const focusedNode = Array.from(
        $("specialDetailBody").querySelectorAll("[data-detail-node]")
      ).find((nodeElement) => nodeElement.dataset.detailNode === activeDetailNodeId);
      if (focusedNode) {
        requestAnimationFrame(() => focusedNode.scrollIntoView({ block: "center", behavior: "smooth" }));
      }
    }
  }

  function openDetail(itemId, tabName, nodeId) {
    const item = getSpecial(itemId);
    if (!item) return;
    activeSpecialId = item.id;
    activeDetailTab = tabName || "overview";
    activeDetailNodeId = nodeId || null;
    $("specialDetailTitle").textContent = item.name;
    $("specialDetailSubtitle").textContent =
      item.year + "年 · " + getDirection(item.directionId).label + " · 牵头人 " + item.leader;
    if (IS_LIST_PAGE) {
      $("specialProgressButton").classList.toggle("hidden", item.status === "completed");
    }
    renderDetailBody();
    $("specialDetailMask").classList.remove("hidden");
    $("specialDetailDrawer").classList.remove("hidden");
    updateOverlayState();
  }

  function closeDetail() {
    if (!$("specialDetailDrawer")) return;
    $("specialDetailMask").classList.add("hidden");
    $("specialDetailDrawer").classList.add("hidden");
    updateOverlayState();
  }

  function populateFormOptions() {
    if (!IS_LIST_PAGE) return;
    $("specialFormDirection").innerHTML = DIRECTIONS.map((item) => (
      '<option value="' + escapeAttr(item.id) + '">' + escapeHTML(item.label) + "</option>"
    )).join("");
    const personOptions = PEOPLE.map((name) => (
      '<option value="' + escapeAttr(name) + '">' + escapeHTML(name) + "</option>"
    )).join("");
    $("specialFormLeader").innerHTML = personOptions;
    $("specialFormOwner").innerHTML = personOptions;
  }

  function renderAssistantOptions(selected) {
    if (!IS_LIST_PAGE) return;
    const selectedNames = selected || [];
    $("specialAssistantOptions").innerHTML = PEOPLE.map((name) => [
      '<label class="special-assistant-option"><input type="checkbox" value="',
      escapeAttr(name),
      '"',
      selectedNames.indexOf(name) >= 0 ? " checked" : "",
      " />",
      escapeHTML(name),
      "</label>"
    ].join("")).join("");
  }

  function captureNodeEditor() {
    if (!IS_LIST_PAGE || !$("specialNodeEditor")) return;
    const rows = Array.from($("specialNodeEditor").querySelectorAll("[data-node-row]"));
    editingNodes = rows.map((row, index) => ({
      id: editingNodes[index] ? editingNodes[index].id : "custom-node-" + Date.now() + "-" + index,
      name: row.querySelector("[data-node-name]").value.trim(),
      dueDate: row.querySelector("[data-node-due]").value,
      remindDate: row.querySelector("[data-node-remind]").value,
      reminderContent: row.querySelector("[data-node-reminder-content]").value.trim(),
      status: editingNodes[index] ? editingNodes[index].status : "pending",
      note: editingNodes[index] ? editingNodes[index].note : ""
    }));
  }

  function renderNodeEditor() {
    if (!IS_LIST_PAGE) return;
    $("specialNodeEditor").innerHTML = editingNodes.map((nodeItem, index) => [
      '<div class="special-node-editor-row" data-node-row="',
      index,
      '">',
      '<label><span>节点名称</span><input type="text" data-node-name value="',
      escapeAttr(nodeItem.name),
      '" placeholder="请输入节点名称" required /></label>',
      '<label><span>完成期限</span><input type="date" data-node-due value="',
      escapeAttr(nodeItem.dueDate),
      '" required /></label>',
      '<label><span>提醒时间</span><input type="date" data-node-remind value="',
      escapeAttr(nodeItem.remindDate),
      '" required /></label>',
      '<label class="special-node-reminder-field"><span>提醒内容</span><textarea data-node-reminder-content rows="2" ',
      'placeholder="留空时由系统根据专项和节点信息自动生成">',
      escapeHTML(nodeItem.reminderContent),
      "</textarea></label>",
      '<button type="button" class="special-remove-node" data-remove-node="',
      index,
      '" aria-label="删除节点">',
      ICONS.remove,
      "</button></div>"
    ].join("")).join("");
  }

  function openEdit(mode, itemId) {
    if (!IS_LIST_PAGE) return;
    const item = mode === "edit" ? getSpecial(itemId) : null;
    editSpecialId = item ? item.id : null;
    $("specialEditTitle").textContent = item ? "编辑专项" : "新建专项";
    $("specialFormYear").value = item ? String(item.year) : activeYear;
    $("specialFormDirection").value = item ? item.directionId : DIRECTIONS[0].id;
    $("specialFormValue").value = item ? item.value : DIRECTIONS[0].value;
    $("specialFormName").value = item ? item.name : "";
    $("specialFormContent").value = item ? item.content : "";
    $("specialFormStart").value = item ? item.startDate : "2026-08-01";
    $("specialFormDeadline").value = item ? item.deadline : "2026-12-20";
    $("specialFormTargetDescription").value = item ? item.target.description : "";
    $("specialFormTargetType").value = item ? item.target.type : "节点";
    $("specialFormTargetValue").value = item ? item.target.value : "";
    $("specialFormTargetUnit").value = item ? item.target.unit : "个";
    $("specialFormLeader").value = item ? item.leader : "朱乐悦";
    $("specialFormOwner").value = item ? item.owner : "张明";
    renderAssistantOptions(item ? item.assistants.filter((name) => PEOPLE.indexOf(name) >= 0) : []);
    editingNodes = item
      ? item.nodes.map((nodeItem) => ({
        ...nodeItem,
        reminderContent: getReminderContent(item, nodeItem)
      }))
      : [node("custom-node-1", "", "2026-09-30", "2026-09-23", "pending", "")];
    renderNodeEditor();
    $("specialEditMask").classList.remove("hidden");
    $("specialEditDrawer").classList.remove("hidden");
    updateOverlayState();
  }

  function closeEdit() {
    if (!IS_LIST_PAGE) return;
    $("specialEditMask").classList.add("hidden");
    $("specialEditDrawer").classList.add("hidden");
    editSpecialId = null;
    updateOverlayState();
  }

  function calculatePlanProgress(nodes) {
    if (!nodes.length) return 0;
    const dueCount = nodes.filter((nodeItem) => nodeItem.dueDate <= CURRENT_DATE).length;
    return Math.round((dueCount / nodes.length) * 100);
  }

  function deriveInitialStatus(startDate) {
    return startDate > CURRENT_DATE ? "not-started" : "in-progress";
  }

  function handleEditSubmit(event) {
    event.preventDefault();
    captureNodeEditor();
    const startDate = $("specialFormStart").value;
    const deadline = $("specialFormDeadline").value;
    if (startDate > deadline) {
      notify("起始时间不能晚于最终完成期限", "error");
      return;
    }
    if (!editingNodes.length || editingNodes.some((nodeItem) => !nodeItem.name || !nodeItem.dueDate || !nodeItem.remindDate)) {
      notify("请完整填写至少一个工作节点", "error");
      return;
    }
    if (editingNodes.some((nodeItem) => nodeItem.dueDate > deadline)) {
      notify("节点完成期限不能晚于专项最终完成期限", "error");
      return;
    }
    if (editingNodes.some((nodeItem) => nodeItem.remindDate > nodeItem.dueDate)) {
      notify("节点提醒时间不能晚于节点完成期限", "error");
      return;
    }

    const assistants = Array.from(
      $("specialAssistantOptions").querySelectorAll('input[type="checkbox"]:checked')
    ).map((input) => input.value);
    const specialName = $("specialFormName").value.trim();
    editingNodes = editingNodes.map((nodeItem) => ({
      ...nodeItem,
      reminderContent: nodeItem.reminderContent || buildReminderContent(specialName, nodeItem)
    }));
    const formData = {
      year: Number($("specialFormYear").value),
      directionId: $("specialFormDirection").value,
      value: $("specialFormValue").value.trim(),
      name: specialName,
      content: $("specialFormContent").value.trim(),
      startDate,
      deadline,
      target: target(
        $("specialFormTargetType").value,
        Number($("specialFormTargetValue").value),
        $("specialFormTargetUnit").value.trim(),
        $("specialFormTargetDescription").value.trim()
      ),
      leader: $("specialFormLeader").value,
      owner: $("specialFormOwner").value,
      assistants,
      nodes: editingNodes,
      planProgress: calculatePlanProgress(editingNodes)
    };

    if (editSpecialId) {
      const current = getSpecial(editSpecialId);
      if (!current) return;
      Object.assign(current, formData);
      const reopenId = current.id;
      closeEdit();
      renderCurrentPage();
      openDetail(reopenId);
      notify("专项信息已更新");
      return;
    }

    const newItem = createSpecial({
      id: "sp-custom-" + customSpecialCounter,
      ...formData,
      status: deriveInitialStatus(startDate),
      progress: 0,
      planProgress: calculatePlanProgress(editingNodes),
      records: []
    });
    customSpecialCounter += 1;
    specials.unshift(newItem);
    activeYear = String(newItem.year);
    specialPagination.reset();
    $("specialYearFilter").value = activeYear;
    closeEdit();
    renderCurrentPage();
    notify("专项已创建");
  }

  function openProgress(itemId, nodeId) {
    if (!IS_LIST_PAGE) return;
    const item = getSpecial(itemId);
    if (!item) return;
    if (item.status === "completed") {
      notify("已完成专项无需继续填报进度");
      return;
    }
    activeSpecialId = item.id;
    $("specialProgressSubtitle").textContent = item.name + " · 主责任人 " + item.owner;
    $("specialProgressPeriod").value = "2026-07";
    $("specialProgressNode").innerHTML = item.nodes.map((nodeItem) => (
      '<option value="' + escapeAttr(nodeItem.id) + '">' +
      escapeHTML(nodeItem.name) + " · " + escapeHTML(getNodeMeta(nodeItem.status).label) +
      "</option>"
    )).join("");
    const currentNode = item.nodes.find((nodeItem) => nodeItem.id === nodeId) || getCurrentNode(item);
    if (currentNode) {
      $("specialProgressNode").value = currentNode.id;
      $("specialProgressNodeStatus").value =
        currentNode.status === "completed" ? "completed" : "ongoing";
    }
    $("specialProgressCurrent").value = "";
    $("specialProgressValue").value = item.progress;
    $("specialProgressNext").value = "";
    $("specialProgressAttachment").value = "";
    $("specialProgressAttachmentName").textContent = "未选择文件";
    $("specialUploadControl").classList.remove("has-file");
    $("specialProgressMask").classList.remove("hidden");
    $("specialProgressModal").classList.remove("hidden");
    updateOverlayState();
  }

  function closeProgress() {
    if (!IS_LIST_PAGE) return;
    $("specialProgressMask").classList.add("hidden");
    $("specialProgressModal").classList.add("hidden");
    updateOverlayState();
  }

  function monthValueToLabel(value) {
    const parts = value.split("-");
    if (parts.length !== 2) return value;
    return parts[0] + "年" + Number(parts[1]) + "月";
  }

  function handleProgressSubmit(event) {
    event.preventDefault();
    const item = getSpecial(activeSpecialId);
    if (!item) return;
    const progressValue = Number($("specialProgressValue").value);
    if (progressValue < item.progress) {
      notify("本次填报进度不能低于当前已记录进度", "error");
      return;
    }
    const nodeStatus = $("specialProgressNodeStatus").value;
    const attachmentInput = $("specialProgressAttachment");
    const attachment = attachmentInput.files && attachmentInput.files[0]
      ? attachmentInput.files[0].name
      : "";
    item.records.push(record(
      "custom-record-" + customRecordCounter,
      monthValueToLabel($("specialProgressPeriod").value),
      $("specialProgressNode").value,
      $("specialProgressCurrent").value.trim(),
      progressValue,
      $("specialProgressNext").value.trim(),
      attachment,
      item.owner,
      "2026-07-28 16:30",
      nodeStatus
    ));
    item.progress = progressValue;
    const selectedNode = item.nodes.find((nodeItem) => nodeItem.id === $("specialProgressNode").value);
    if (selectedNode) {
      selectedNode.status = nodeStatus;
      selectedNode.note = $("specialProgressCurrent").value.trim();
      if (nodeStatus === "completed" && window.BusinessMessageCenter) {
        window.BusinessMessageCenter.markNodeHandled(selectedNode.id);
      }
    }
    if (progressValue >= 100) {
      item.status = "completed";
      item.progress = 100;
      item.completionDate = CURRENT_DATE;
      if (window.BusinessMessageCenter) {
        item.nodes.forEach((nodeItem) => window.BusinessMessageCenter.markNodeHandled(nodeItem.id));
      }
    } else if (item.status === "not-started" && item.startDate <= CURRENT_DATE) {
      item.status = "in-progress";
    }
    customRecordCounter += 1;
    closeProgress();
    renderCurrentPage();
    openDetail(item.id, "records");
    notify("进度已保存");
  }

  function openStatusEditor() {
    if (!IS_LIST_PAGE) return;
    const item = getSpecial(activeSpecialId);
    if (!item) return;
    const options = ["not-started", "in-progress", "completed"].filter((status) => status !== item.status);
    $("specialStatusTarget").innerHTML = options.map((status) => (
      '<option value="' + status + '">' + escapeHTML(getStatusMeta(status).label) + "</option>"
    )).join("");
    $("specialStatusMask").classList.remove("hidden");
    $("specialStatusModal").classList.remove("hidden");
    updateOverlayState();
  }

  function closeStatusEditor() {
    if (!IS_LIST_PAGE) return;
    $("specialStatusMask").classList.add("hidden");
    $("specialStatusModal").classList.add("hidden");
    updateOverlayState();
  }

  function handleStatusSubmit(event) {
    event.preventDefault();
    const item = getSpecial(activeSpecialId);
    if (!item) return;
    const targetStatus = $("specialStatusTarget").value;
    item.status = targetStatus;
    if (targetStatus === "completed") {
      item.progress = 100;
      item.completionDate = CURRENT_DATE;
      if (window.BusinessMessageCenter) {
        item.nodes.forEach((nodeItem) => window.BusinessMessageCenter.markNodeHandled(nodeItem.id));
      }
    } else {
      item.completionDate = "";
      if (item.progress >= 100) item.progress = 99;
    }
    closeStatusEditor();
    renderCurrentPage();
    renderDetailBody();
    notify("专项状态已调整");
  }

  function updateOverlayState() {
    const openSelectors = [
      "#specialDetailDrawer:not(.hidden)",
      "#specialEditDrawer:not(.hidden)",
      "#specialProgressModal:not(.hidden)",
      "#specialStatusModal:not(.hidden)"
    ];
    const hasOpen = openSelectors.some((selector) => document.querySelector(selector));
    document.body.classList.toggle("has-special-overlay", hasOpen);
  }

  function renderCurrentPage() {
    renderList();
    renderResults();
  }

  function resetPagination() {
    specialPagination.reset();
  }

  function bindFilters() {
    const yearFilter = $("specialYearFilter");
    const directionFilter = $("specialDirectionFilter");
    const statusFilter = $("specialStatusFilter");
    const healthFilter = $("specialHealthFilter");
    if (!yearFilter || !directionFilter || !statusFilter || !healthFilter) return;

    yearFilter.addEventListener("change", (event) => {
      activeYear = event.target.value;
      resetPagination();
      renderCurrentPage();
    });
    directionFilter.addEventListener("change", (event) => {
      activeDirection = event.target.value;
      resetPagination();
      renderCurrentPage();
    });
    statusFilter.addEventListener("change", (event) => {
      activeStatus = event.target.value;
      resetPagination();
      renderCurrentPage();
    });
    healthFilter.addEventListener("change", (event) => {
      activeHealth = event.target.value;
      resetPagination();
      renderCurrentPage();
    });
  }

  function bindSharedEvents() {
    document.addEventListener("click", (event) => {
      const detailButton = event.target.closest("[data-special-detail]");
      if (detailButton) {
        openDetail(detailButton.dataset.specialDetail);
        return;
      }
      const progressButton = event.target.closest("[data-open-progress]");
      if (progressButton) {
        openProgress(progressButton.dataset.openProgress, progressButton.dataset.progressNode);
        return;
      }
    });

    $("specialDetailTabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-detail-tab]");
      if (!button) return;
      activeDetailTab = button.dataset.detailTab;
      renderDetailBody();
    });

    [$("specialDetailClose"), $("specialDetailMask"), ...document.querySelectorAll("[data-close-special-detail]")]
      .filter(Boolean)
      .forEach((element) => element.addEventListener("click", closeDetail));
  }

  function bindListEvents() {
    if (!IS_LIST_PAGE) return;
    $("specialCreateButton").addEventListener("click", () => openEdit("create"));
    $("specialEditButton").addEventListener("click", () => {
      const itemId = activeSpecialId;
      closeDetail();
      openEdit("edit", itemId);
    });
    $("specialProgressButton").addEventListener("click", () => openProgress(activeSpecialId));
    $("specialStatusButton").addEventListener("click", openStatusEditor);
    $("specialWorkTabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-work-state]");
      if (!button) return;
      activeWorkState = button.dataset.workState;
      specialPagination.reset();
      renderList();
    });

    $("specialFormDirection").addEventListener("change", (event) => {
      const direction = getDirection(event.target.value);
      $("specialFormValue").value = direction.value;
    });
    $("specialFormTargetType").addEventListener("change", (event) => {
      const units = { 次数: "场", 数量: "个", 百分比: "%", 节点: "个" };
      $("specialFormTargetUnit").value = units[event.target.value] || "";
    });
    $("specialProgressNode").addEventListener("change", (event) => {
      const item = getSpecial(activeSpecialId);
      const nodeItem = item
        ? item.nodes.find((candidate) => candidate.id === event.target.value)
        : null;
      $("specialProgressNodeStatus").value =
        nodeItem && nodeItem.status === "completed" ? "completed" : "ongoing";
    });
    $("specialProgressAttachmentTrigger").addEventListener("click", () => {
      $("specialProgressAttachment").click();
    });
    $("specialProgressAttachment").addEventListener("change", (event) => {
      const file = event.target.files && event.target.files[0];
      $("specialProgressAttachmentName").textContent = file ? file.name : "未选择文件";
      $("specialUploadControl").classList.toggle("has-file", Boolean(file));
    });

    $("specialAddNodeButton").addEventListener("click", () => {
      captureNodeEditor();
      const index = editingNodes.length + 1;
      editingNodes.push(node(
        "custom-node-" + Date.now() + "-" + index,
        "",
        $("specialFormDeadline").value || "2026-12-20",
        "",
        "pending",
        ""
      ));
      renderNodeEditor();
    });

    $("specialNodeEditor").addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove-node]");
      if (!button) return;
      captureNodeEditor();
      if (editingNodes.length <= 1) {
        notify("专项至少需要保留一个工作节点", "error");
        return;
      }
      editingNodes.splice(Number(button.dataset.removeNode), 1);
      renderNodeEditor();
    });

    $("specialEditForm").addEventListener("submit", handleEditSubmit);
    $("specialProgressForm").addEventListener("submit", handleProgressSubmit);
    $("specialStatusForm").addEventListener("submit", handleStatusSubmit);

    [$("specialEditClose"), $("specialEditMask"), ...document.querySelectorAll("[data-close-special-edit]")]
      .filter(Boolean)
      .forEach((element) => element.addEventListener("click", closeEdit));
    [$("specialProgressClose"), $("specialProgressMask"), ...document.querySelectorAll("[data-close-progress]")]
      .filter(Boolean)
      .forEach((element) => element.addEventListener("click", closeProgress));
    [$("specialStatusClose"), $("specialStatusMask"), ...document.querySelectorAll("[data-close-status]")]
      .filter(Boolean)
      .forEach((element) => element.addEventListener("click", closeStatusEditor));
  }

  function bindEscape() {
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (IS_LIST_PAGE && !$("specialStatusModal").classList.contains("hidden")) closeStatusEditor();
      else if (IS_LIST_PAGE && !$("specialProgressModal").classList.contains("hidden")) closeProgress();
      else if (IS_LIST_PAGE && !$("specialEditDrawer").classList.contains("hidden")) closeEdit();
      else if (!$("specialDetailDrawer").classList.contains("hidden")) closeDetail();
    });
  }

  function handleMessageDeepLink() {
    if (!IS_LIST_PAGE) return;
    const params = new URLSearchParams(window.location.search);
    const specialId = params.get("special");
    const nodeId = params.get("node");
    const action = params.get("action");
    if (!specialId || !getSpecial(specialId)) return;
    if (action === "progress") {
      openProgress(specialId, nodeId);
    } else {
      openDetail(specialId, "nodes", nodeId);
    }
    if (window.history && window.history.replaceState) {
      try {
        window.history.replaceState({}, document.title, window.location.href.split("?")[0]);
      } catch (error) {}
    }
  }

  function init() {
    if (!IS_LIST_PAGE && !IS_RESULT_PAGE) return;
    specialPagination = window.AppPagination.create({
      container: $(IS_LIST_PAGE ? "specialListPagination" : "specialResultPagination"),
      variant: "table",
      itemLabel: "项",
      onChange: renderCurrentPage
    });
    populateFilters();
    populateFormOptions();
    bindFilters();
    bindSharedEvents();
    bindListEvents();
    bindEscape();
    renderCurrentPage();
    handleMessageDeepLink();
  }

  window.SpecialManagement = {
    openNode: (specialId, nodeId) => openDetail(specialId, "nodes", nodeId),
    openProgress: (specialId, nodeId) => openProgress(specialId, nodeId)
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
