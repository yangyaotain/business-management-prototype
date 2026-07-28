(function setupEfficiencyDashboard() {
  "use strict";

  const ICONS = {
    department:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V7l8-4 8 4v14"/><path d="M8 10h2M14 10h2M8 14h2M14 14h2M9 21v-3h6v3"/></svg>',
    group:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20c0-3.4 2.5-5.8 5.5-5.8s5.5 2.4 5.5 5.8"/><path d="M13.5 15.3a4.8 4.8 0 0 1 7.5 4"/></svg>',
    person:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 21c0-4.4 3.2-7 7.5-7s7.5 2.6 7.5 7"/></svg>',
    output:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V9M10 19V4M16 19v-7M22 19H2"/><path d="m4 7 5-4 6 6 6-5"/></svg>',
    capacity:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="15" rx="2"/><path d="M8 5V3M16 5V3M3 10h18M8 14h3M14 14h2"/></svg>',
    timeliness:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2M8 2.8l1.2 2M16 2.8l-1.2 2"/></svg>',
    profit:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V5M16 20v-8M22 20H2"/><path d="m5 8 5-5 5 6 6-5"/></svg>',
    back:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/><path d="M9 12h10"/></svg>',
    arrow:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
    info:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>'
  };

  const METRICS = [
    {
      id: "output",
      label: "人均产值",
      personalLabel: "个人产值",
      unit: "万元",
      tone: "blue",
      color: "#1677ff",
      direction: "higher",
      definition: "统计周期总产值 ÷ 统计周期平均人数；原型按所选月度或季度的人效数据展示。",
      personalDefinition: "个人归属产值；与部门、业务组的人均产值使用同一数据归集范围。"
    },
    {
      id: "capacity",
      label: "人均产能",
      personalLabel: "个人产能",
      unit: "个",
      tone: "cyan",
      color: "#06b6d4",
      direction: "higher",
      definition: "人均代理标段数量，包含招标和非招标业务。",
      personalDefinition: "个人完成的代理标段数量，包含招标和非招标业务。"
    },
    {
      id: "timeliness",
      label: "人均时效",
      personalLabel: "个人时效",
      unit: "天",
      tone: "orange",
      color: "#f59e0b",
      direction: "lower",
      definition: "正式统计口径与单位待业务确认；原型暂按平均项目办理天数演示，数值越低表示时效越好。",
      personalDefinition: "个人平均项目办理天数；正式统计口径与单位待业务确认。"
    },
    {
      id: "profit",
      label: "人均净利润",
      personalLabel: "个人净利润",
      unit: "万元",
      tone: "green",
      color: "#22a06b",
      direction: "higher",
      definition: "净利润 ÷ 平均人数；具体成本和利润归集口径待业务确认。",
      personalDefinition: "按人员归属的净利润；具体成本和利润归集口径待业务确认。"
    }
  ];

  const PERIODS = [
    {
      value: "2025-08",
      label: "2025年8月",
      shortLabel: "8月",
      factors: { output: 0.82, capacity: 0.88, timeliness: 1.08, profit: 0.79 }
    },
    {
      value: "2025-09",
      label: "2025年9月",
      shortLabel: "9月",
      factors: { output: 0.86, capacity: 0.90, timeliness: 1.06, profit: 0.83 }
    },
    {
      value: "2025-10",
      label: "2025年10月",
      shortLabel: "10月",
      factors: { output: 0.84, capacity: 0.87, timeliness: 1.09, profit: 0.80 }
    },
    {
      value: "2025-11",
      label: "2025年11月",
      shortLabel: "11月",
      factors: { output: 0.89, capacity: 0.93, timeliness: 1.04, profit: 0.86 }
    },
    {
      value: "2025-12",
      label: "2025年12月",
      shortLabel: "12月",
      factors: { output: 0.92, capacity: 0.95, timeliness: 1.02, profit: 0.90 }
    },
    {
      value: "2026-01",
      label: "2026年1月",
      shortLabel: "1月",
      factors: { output: 0.87, capacity: 0.91, timeliness: 1.05, profit: 0.84 }
    },
    {
      value: "2026-02",
      label: "2026年2月",
      shortLabel: "2月",
      factors: { output: 0.90, capacity: 0.94, timeliness: 1.03, profit: 0.88 }
    },
    {
      value: "2026-03",
      label: "2026年3月",
      shortLabel: "3月",
      factors: { output: 0.93, capacity: 0.96, timeliness: 1.02, profit: 0.91 }
    },
    {
      value: "2026-04",
      label: "2026年4月",
      shortLabel: "4月",
      factors: { output: 0.95, capacity: 0.97, timeliness: 1.01, profit: 0.94 }
    },
    {
      value: "2026-05",
      label: "2026年5月",
      shortLabel: "5月",
      factors: { output: 0.97, capacity: 0.98, timeliness: 0.99, profit: 0.96 }
    },
    {
      value: "2026-06",
      label: "2026年6月",
      shortLabel: "6月",
      factors: { output: 0.98, capacity: 0.99, timeliness: 1.02, profit: 0.98 }
    },
    {
      value: "2026-07",
      label: "2026年7月",
      shortLabel: "7月",
      factors: { output: 1, capacity: 1, timeliness: 1, profit: 1 }
    }
  ];

  const QUARTERS = [
    {
      value: "2025-Q3",
      label: "2025年第三季度",
      shortLabel: "2025 Q3",
      factors: { output: 0.84, capacity: 0.89, timeliness: 1.07, profit: 0.81 }
    },
    {
      value: "2025-Q4",
      label: "2025年第四季度",
      shortLabel: "2025 Q4",
      factors: { output: 0.88, capacity: 0.92, timeliness: 1.05, profit: 0.85 }
    },
    {
      value: "2026-Q1",
      label: "2026年第一季度",
      shortLabel: "2026 Q1",
      factors: { output: 0.92, capacity: 0.95, timeliness: 1.03, profit: 0.90 }
    },
    {
      value: "2026-Q2",
      label: "2026年第二季度",
      shortLabel: "2026 Q2",
      factors: { output: 0.97, capacity: 0.98, timeliness: 1, profit: 0.96 }
    }
  ];

  const BUSINESS_TYPES = [
    {
      value: "all",
      label: "全部业务",
      factors: { output: 1, capacity: 1, timeliness: 1, profit: 1 }
    },
    {
      value: "bid",
      label: "招标业务",
      factors: { output: 0.72, capacity: 0.68, timeliness: 1.06, profit: 0.74 }
    },
    {
      value: "non-bid",
      label: "非招标业务",
      factors: { output: 0.28, capacity: 0.32, timeliness: 0.88, profit: 0.26 }
    }
  ];

  const GROUPS = [
    {
      id: "group-1",
      name: "第一业务组",
      leader: "赵倩",
      members: [
        person("p101", "赵倩", "业务组长", 46.8, 18.1, 19.2, 12.7),
        person("p102", "陈晨", "高级项目经理", 42.5, 16.8, 20.5, 11.6),
        person("p103", "王璐", "项目经理", 39.6, 15.2, 22.1, 9.8),
        person("p104", "刘畅", "项目经理", 44.1, 17.5, 18.9, 12.0)
      ]
    },
    {
      id: "group-2",
      name: "第二业务组",
      leader: "张明",
      members: [
        person("p201", "张明", "业务组长", 45.9, 17.8, 19.8, 12.4),
        person("p202", "李文", "高级项目经理", 43.7, 16.9, 20.7, 11.4),
        person("p203", "孙浩", "项目经理", 40.9, 15.8, 22.4, 10.1),
        person("p204", "何雨", "项目经理", 47.2, 18.5, 18.5, 13.1),
        person("p205", "周琳", "项目经理", 41.8, 16.4, 21.2, 10.8)
      ]
    },
    {
      id: "group-3",
      name: "非电力业务组",
      leader: "孙岚",
      members: [
        person("p301", "孙岚", "业务组长", 48.6, 18.9, 18.6, 13.8),
        person("p302", "郑凯", "高级项目经理", 45.4, 17.6, 19.4, 12.5),
        person("p303", "杨帆", "项目经理", 42.8, 16.7, 21.0, 11.3),
        person("p304", "宋妍", "项目经理", 44.6, 17.2, 20.1, 11.9)
      ]
    },
    {
      id: "group-4",
      name: "造价业务组",
      leader: "王军",
      members: [
        person("p401", "王军", "业务组长", 41.6, 15.9, 20.8, 10.9),
        person("p402", "蒋宁", "高级项目经理", 39.8, 15.1, 21.6, 10.1),
        person("p403", "韩雪", "项目经理", 37.9, 14.4, 22.7, 9.4),
        person("p404", "冯涛", "项目经理", 40.7, 15.6, 20.3, 10.6),
        person("p405", "彭佳", "项目经理", 38.8, 14.9, 21.9, 9.8)
      ]
    }
  ];

  const ROLE_VIEWS = [
    {
      id: "departmentHead",
      label: "部门负责人",
      userName: "陈建",
      avatar: "陈",
      icon: ICONS.department
    },
    {
      id: "groupLeader",
      label: "业务组长",
      userName: "张明",
      avatar: "张",
      groupId: "group-2",
      icon: ICONS.group
    },
    {
      id: "member",
      label: "组员",
      userName: "李文",
      avatar: "李",
      groupId: "group-2",
      personId: "p202",
      icon: ICONS.person
    }
  ];

  const state = {
    roleId: "departmentHead",
    view: "department",
    groupId: null,
    personId: null,
    periodType: "月度",
    periodIndex: PERIODS.length - 1,
    selectedPeriodIndexes: {
      月度: PERIODS.length - 1,
      季度: QUARTERS.length - 1
    },
    businessType: "all",
    activeMetricId: "output"
  };

  function person(id, name, position, output, capacity, timeliness, profit) {
    return {
      id,
      name,
      position,
      base: { output, capacity, timeliness, profit }
    };
  }

  function $(id) {
    return document.getElementById(id);
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"]/g, function replace(char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;"
      }[char];
    });
  }

  function escapeAttr(value) {
    return escapeHTML(value).replace(/'/g, "&#39;");
  }

  function getRole() {
    return ROLE_VIEWS.find((item) => item.id === state.roleId) || ROLE_VIEWS[0];
  }

  function getPeriods() {
    return state.periodType === "季度" ? QUARTERS : PERIODS;
  }

  function getCurrentPeriod() {
    return getPeriods()[state.periodIndex] || getPeriods()[0];
  }

  function getComparisonTerm() {
    return state.periodType === "季度" ? "上季度" : "上月";
  }

  function getTrendRangeLabel() {
    return state.periodType === "季度" ? "近4个季度" : "近12个月";
  }

  function getGroup(groupId) {
    return GROUPS.find((item) => item.id === groupId) || null;
  }

  function getPerson(personId) {
    for (const group of GROUPS) {
      const member = group.members.find((item) => item.id === personId);
      if (member) return { person: member, group };
    }
    return null;
  }

  function getBusinessType() {
    return BUSINESS_TYPES.find((item) => item.value === state.businessType) || BUSINESS_TYPES[0];
  }

  function getMetric(metricId) {
    return METRICS.find((item) => item.id === metricId) || METRICS[0];
  }

  function getPersonMetricValue(member, metricId, periodIndex) {
    const period = getPeriods()[periodIndex];
    const businessType = getBusinessType();
    return member.base[metricId] * period.factors[metricId] * businessType.factors[metricId];
  }

  function average(values) {
    if (!values.length) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function getScopePeople(view, groupId, personId) {
    if (view === "person") {
      const result = getPerson(personId);
      return result ? [result.person] : [];
    }
    if (view === "group") {
      const group = getGroup(groupId);
      return group ? group.members : [];
    }
    return GROUPS.flatMap((group) => group.members);
  }

  function getScopeMetricValue(view, groupId, personId, metricId, periodIndex) {
    const members = getScopePeople(view, groupId, personId);
    return average(members.map((member) => getPersonMetricValue(member, metricId, periodIndex)));
  }

  function formatValue(metric, value) {
    return new Intl.NumberFormat("zh-CN", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value);
  }

  function getChangeInfo(current, previous, metric) {
    if (!previous) {
      return {
        percent: 0,
        label: "首期数据",
        tone: "neutral",
        direction: "flat"
      };
    }

    const percent = ((current - previous) / Math.abs(previous)) * 100;
    if (Math.abs(percent) < 0.05) {
      return {
        percent,
        label: "较" + getComparisonTerm() + "持平",
        tone: "neutral",
        direction: "flat"
      };
    }

    const direction = percent > 0 ? "up" : "down";
    return {
      percent,
      label: "较" + getComparisonTerm() + " " + (percent > 0 ? "+" : "") + percent.toFixed(1) + "%",
      tone: direction,
      direction
    };
  }

  function changeIcon(direction) {
    if (direction === "up") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 14 5-5 5 5"/><path d="M12 9v9"/></svg>';
    }
    if (direction === "down") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/><path d="M12 15V6"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12"/></svg>';
  }

  function metricLabel(metric) {
    return state.view === "person" ? metric.personalLabel : metric.label;
  }

  function metricDefinition(metric) {
    return state.view === "person" ? metric.personalDefinition : metric.definition;
  }

  function getScopeLabel() {
    if (state.view === "group") {
      const group = getGroup(state.groupId);
      return group ? group.name : "业务组";
    }
    if (state.view === "person") {
      const result = getPerson(state.personId);
      return result ? result.person.name : "个人";
    }
    return "代理业务部";
  }

  function getScopeTag() {
    if (state.view === "person") return "个人数据";
    if (state.view === "group") return "业务组均值";
    return "部门均值";
  }

  function renderRoleTabs() {
    $("efficiencyRoleTabs").innerHTML = ROLE_VIEWS.map((role) => [
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
  }

  function renderFilterOptions() {
    const periodSelect = $("efficiencyPeriodSelect");
    const businessSelect = $("efficiencyBusinessTypeSelect");
    const periods = getPeriods();

    $("efficiencyPeriodTypeTabs").querySelectorAll("[data-period-type]").forEach((button) => {
      const isActive = button.dataset.periodType === state.periodType;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    periodSelect.innerHTML = periods.map((period, index) => ({ period, index }))
      .reverse()
      .map(({ period, index }) => [
      '<option value="',
      period.value,
      '"',
      index === state.periodIndex ? " selected" : "",
      ">",
      escapeHTML(period.label),
      "</option>"
    ].join("")).join("");

    businessSelect.innerHTML = BUSINESS_TYPES.map((type) => [
      '<option value="',
      type.value,
      '"',
      type.value === state.businessType ? " selected" : "",
      ">",
      escapeHTML(type.label),
      "</option>"
    ].join("")).join("");

    $("efficiencyScopeHint").textContent =
      "当前查看" + getScopeLabel() + "在所选" + state.periodType +
      "的人效数据，趋势展示" + getTrendRangeLabel() + "。";
  }

  function renderHeader() {
    const role = getRole();
    const group = getGroup(state.groupId);
    const personResult = getPerson(state.personId);
    const period = getCurrentPeriod();

    $("currentUserAvatar").textContent = role.avatar;
    $("currentUserName").textContent = role.userName;
    $("currentUserRole").textContent = role.label;

    let title = "部门人效看板";
    let description = "从部门整体查看各业务组的人效表现，并逐级下钻至业务组和个人。";
    let subtitle = role.label + " · 部门人效视图";

    if (state.view === "group" && group) {
      title = group.name + "人效看板";
      description = "查看本组整体人效数据和组员明细，点击组员姓名进入个人看板。";
      subtitle = role.label + " · " + group.name + "视图";
    }

    if (state.view === "person" && personResult) {
      title = personResult.person.name + "个人人效看板";
      description = "查看个人产值、产能、时效和净利润数据，指标口径与所属业务组保持一致。";
      subtitle = role.label + " · " + personResult.person.name + "个人视图";
    }

    $("efficiencyPageTitle").textContent = title;
    $("efficiencyPageDescription").textContent = description;
    $("topbarPageSubtitle").textContent = subtitle;
    document.title = title + " - 业务管理系统";

    renderBreadcrumb(group, personResult);
    renderPageActions(period);
  }

  function renderBreadcrumb(group, personResult) {
    const parts = [
      '<span>首页</span><span>/</span>',
      '<span>经营管理</span><span>/</span>'
    ];

    if (state.view === "department") {
      parts.push('<span class="efficiency-breadcrumb-current">人效看板</span>');
    } else {
      const canReturnDepartment = state.roleId === "departmentHead";
      if (canReturnDepartment) {
        parts.push(
          '<button type="button" class="efficiency-breadcrumb-button" data-nav-level="department">人效看板</button>'
        );
      } else {
        parts.push("<span>人效看板</span>");
      }

      if (group) {
        parts.push("<span>/</span>");
        if (state.view === "person" && state.roleId !== "member") {
          parts.push(
            '<button type="button" class="efficiency-breadcrumb-button" data-nav-level="group">',
            escapeHTML(group.name),
            "</button>"
          );
        } else if (state.view === "group") {
          parts.push('<span class="efficiency-breadcrumb-current">', escapeHTML(group.name), "</span>");
        } else {
          parts.push("<span>", escapeHTML(group.name), "</span>");
        }
      }

      if (state.view === "person" && personResult) {
        parts.push(
          '<span>/</span><span class="efficiency-breadcrumb-current">',
          escapeHTML(personResult.person.name),
          "</span>"
        );
      }
    }

    $("efficiencyBreadcrumb").innerHTML = parts.join("");
  }

  function renderPageActions(period) {
    const actions = [];
    const canBack =
      (state.view === "group" && state.roleId === "departmentHead") ||
      (state.view === "person" && state.roleId !== "member");

    if (canBack) {
      actions.push(
        '<button type="button" class="secondary-btn" data-page-action="back">',
        ICONS.back,
        "返回上一级</button>"
      );
    }

    actions.push(
      '<span class="efficiency-source-status">业财数据已同步 · ',
      escapeHTML(period.label),
      "</span>"
    );
    $("efficiencyPageActions").innerHTML = actions.join("");
  }

  function renderContextBanner() {
    const type = getBusinessType();
    if (state.view === "group") {
      const group = getGroup(state.groupId);
      if (!group) return "";
      return [
        '<section class="panel efficiency-context-banner">',
        '<div class="efficiency-context-main"><span class="efficiency-context-icon">',
        ICONS.group,
        '</span><div class="efficiency-context-copy"><span class="efficiency-context-kicker">业务组人效视图</span><h2>',
        escapeHTML(group.name),
        "</h2><p>组长 ",
        escapeHTML(group.leader),
        " · 共 ",
        group.members.length,
        " 名组员</p></div></div>",
        '<div class="efficiency-context-stats">',
        contextStat("业务组长", group.leader),
        contextStat("组员人数", group.members.length + "人"),
        contextStat("业务类型", type.label),
        "</div></section>"
      ].join("");
    }

    if (state.view === "person") {
      const result = getPerson(state.personId);
      if (!result) return "";
      return [
        '<section class="panel efficiency-context-banner">',
        '<div class="efficiency-context-main"><span class="efficiency-person-avatar">',
        escapeHTML(result.person.name.slice(0, 1)),
        '</span><div class="efficiency-context-copy"><span class="efficiency-context-kicker">个人人效视图</span><h2>',
        escapeHTML(result.person.name),
        "</h2><p>",
        escapeHTML(result.person.position),
        " · ",
        escapeHTML(result.group.name),
        "</p></div></div>",
        '<div class="efficiency-context-stats">',
        contextStat("当前岗位", result.person.position),
        contextStat("所属业务组", result.group.name),
        contextStat("业务类型", type.label),
        "</div></section>"
      ].join("");
    }

    return "";
  }

  function contextStat(label, value) {
    return [
      '<div class="efficiency-context-stat"><span>',
      escapeHTML(label),
      "</span><strong>",
      escapeHTML(value),
      "</strong></div>"
    ].join("");
  }

  function renderSummaryCards() {
    const currentPeriodIndex = state.periodIndex;
    const previousPeriodIndex = Math.max(0, currentPeriodIndex - 1);
    const period = getPeriods()[currentPeriodIndex];
    const scopeTag = getScopeTag();

    return [
      '<section class="efficiency-summary-grid" aria-label="核心人效指标">',
      METRICS.map((metric) => {
        const current = getScopeMetricValue(
          state.view,
          state.groupId,
          state.personId,
          metric.id,
          currentPeriodIndex
        );
        const previous = currentPeriodIndex
          ? getScopeMetricValue(
            state.view,
            state.groupId,
            state.personId,
            metric.id,
            previousPeriodIndex
          )
          : 0;
        const change = getChangeInfo(current, previous, metric);

        return [
          '<article class="card efficiency-metric-card tone-',
          metric.tone,
          '" title="',
          escapeAttr(metricDefinition(metric)),
          '">',
          '<div class="efficiency-metric-head"><div class="efficiency-metric-label"><strong>',
          escapeHTML(metricLabel(metric)),
          "</strong><span>",
          escapeHTML(metricDefinition(metric)),
          '</span></div><span class="efficiency-metric-icon">',
          ICONS[metric.id],
          "</span></div>",
          '<div class="efficiency-metric-value"><strong>',
          formatValue(metric, current),
          "</strong><span>",
          escapeHTML(metric.unit),
          "</span></div>",
          '<div class="efficiency-metric-change ',
          change.tone,
          '">',
          changeIcon(change.direction),
          "<span>",
          escapeHTML(change.label),
          "</span></div>",
          '<div class="efficiency-metric-foot"><span>',
          escapeHTML(scopeTag),
          "</span><span>",
          escapeHTML(period.shortLabel),
          "</span></div></article>"
        ].join("");
      }).join(""),
      "</section>"
    ].join("");
  }

  function renderGroupTable() {
    return [
      '<section class="panel efficiency-panel dashboard-organization-panel">',
      '<div class="panel-head"><div><h2>业务组人效概览</h2><p>横向比较各业务组四项人效指标，点击组名进入本组看板</p></div>',
      '<div class="efficiency-panel-head-actions"><span class="dashboard-organization-count">',
      GROUPS.length,
      " 个业务组</span></div></div>",
      '<div class="efficiency-table-wrap dashboard-organization-table-wrap"><table class="efficiency-table dashboard-organization-table">',
      '<colgroup><col style="width: 176px" /><col style="width: 108px" /><col style="width: 76px" /><col /><col /><col /><col /></colgroup>',
      '<thead><tr><th>业务组</th><th>负责人</th><th class="people-cell">人数</th>',
      METRICS.map((metric) => '<th class="numeric-cell">' + escapeHTML(metric.label) + "</th>").join(""),
      "</tr></thead><tbody>",
      GROUPS.map((group) => [
        "<tr><td>",
        '<button type="button" class="efficiency-name-button dashboard-organization-link" data-group-id="',
        group.id,
        '"><span>',
        escapeHTML(group.name),
        "</span>",
        ICONS.arrow,
        "</button></td>",
        "<td>",
        escapeHTML(group.leader),
        "</td>",
        '<td class="people-cell">',
        group.members.length,
        "人</td>",
        METRICS.map((metric) => renderTableMetricCell(
          getScopeMetricValue("group", group.id, null, metric.id, state.periodIndex),
          getScopeMetricValue("group", group.id, null, metric.id, Math.max(0, state.periodIndex - 1)),
          metric,
          state.periodIndex === 0
        )).join(""),
        "</tr>"
      ].join("")).join(""),
      "</tbody></table></div></section>"
    ].join("");
  }

  function renderMemberTable() {
    const group = getGroup(state.groupId);
    if (!group) return "";

    return [
      '<section class="panel efficiency-panel">',
      '<div class="panel-head"><div><h2>组员人效明细</h2><p>业务组长和部门负责人可进入组员个人看板，组员仅查看本人</p></div>',
      '<div class="efficiency-panel-head-actions"><span class="efficiency-count-tag">',
      group.members.length,
      " 名组员</span></div></div>",
      '<div class="efficiency-table-wrap"><table class="efficiency-table">',
      '<colgroup><col style="width: 172px" /><col style="width: 124px" /><col /><col /><col /><col /></colgroup>',
      '<thead><tr><th>组员</th><th>岗位</th>',
      METRICS.map((metric) => '<th class="numeric-cell">' + escapeHTML(metric.personalLabel) + "</th>").join(""),
      "</tr></thead><tbody>",
      group.members.map((member) => [
        "<tr><td>",
        '<div class="efficiency-person-cell"><span class="efficiency-person-mini-avatar">',
        escapeHTML(member.name.slice(0, 1)),
        '</span><div class="efficiency-person-copy"><button type="button" class="efficiency-person-name-button" data-person-id="',
        member.id,
        '">',
        escapeHTML(member.name),
        "</button><span>",
        member.name === group.leader ? "业务组长" : "业务组成员",
        "</span></div></div></td>",
        "<td>",
        escapeHTML(member.position),
        "</td>",
        METRICS.map((metric) => renderTableMetricCell(
          getPersonMetricValue(member, metric.id, state.periodIndex),
          state.periodIndex
            ? getPersonMetricValue(member, metric.id, state.periodIndex - 1)
            : 0,
          metric,
          state.periodIndex === 0
        )).join(""),
        "</tr>"
      ].join("")).join(""),
      "</tbody></table></div></section>"
    ].join("");
  }

  function renderTableMetricCell(current, previous, metric, firstPeriod) {
    const change = getChangeInfo(current, firstPeriod ? 0 : previous, metric);
    return [
      '<td class="numeric-cell"><div class="efficiency-table-value"><strong>',
      formatValue(metric, current),
      escapeHTML(metric.unit),
      '</strong><span class="',
      change.tone,
      '">',
      escapeHTML(change.label),
      "</span></div></td>"
    ].join("");
  }

  function renderTrendPanel() {
    const metric = getMetric(state.activeMetricId);
    const periods = getPeriods();
    const values = periods.map((period, index) => ({
      label: period.shortLabel,
      value: getScopeMetricValue(
        state.view,
        state.groupId,
        state.personId,
        metric.id,
        index
      )
    }));
    const current = values[state.periodIndex];
    const previous = state.periodIndex > 0 ? values[state.periodIndex - 1] : null;
    const change = getChangeInfo(current.value, previous ? previous.value : 0, metric);
    const extrema = values.map((item) => item.value);

    return [
      '<section class="panel efficiency-trend-panel">',
      '<div class="panel-head"><div><h2>',
      escapeHTML(getScopeLabel()),
      "人效趋势</h2><p>按指标切换查看" + getTrendRangeLabel() + "示例数据，当前选中 ",
      escapeHTML(periods[state.periodIndex].label),
      "</p></div>",
      '<div class="efficiency-metric-tabs" aria-label="切换趋势指标">',
      METRICS.map((item) => [
        '<button type="button" class="efficiency-metric-tab',
        item.id === state.activeMetricId ? " active" : "",
        '" data-metric-id="',
        item.id,
        '" aria-pressed="',
        String(item.id === state.activeMetricId),
        '">',
        ICONS[item.id],
        "<span>",
        escapeHTML(metricLabel(item)),
        "</span></button>"
      ].join("")).join(""),
      "</div></div>",
      '<div class="efficiency-trend-body"><div class="efficiency-chart-wrap">',
      buildTrendChart(values, metric, state.periodIndex),
      '</div><div class="efficiency-trend-summary">',
      trendStat("当前值", formatValue(metric, current.value) + metric.unit, change.label, change.tone),
      trendStat(
        "上期值",
        previous ? formatValue(metric, previous.value) + metric.unit : "-",
        previous ? periods[state.periodIndex - 1].label : "暂无上期数据",
        "neutral"
      ),
      trendStat(
        "阶段区间",
        formatValue(metric, Math.min.apply(null, extrema)) + "–" +
          formatValue(metric, Math.max.apply(null, extrema)) + metric.unit,
        getTrendRangeLabel(),
        "neutral"
      ),
      "</div></div>",
      '<div class="efficiency-definition-note">',
      ICONS.info,
      "<span><strong>",
      escapeHTML(metricLabel(metric)),
      "口径：</strong>",
      escapeHTML(metricDefinition(metric)),
      "</span></div>",
      "</section>"
    ].join("");
  }

  function trendStat(label, value, note, tone) {
    return [
      '<div class="efficiency-trend-stat"><span>',
      escapeHTML(label),
      "</span><strong>",
      escapeHTML(value),
      '</strong><em class="',
      tone,
      '">',
      escapeHTML(note),
      "</em></div>"
    ].join("");
  }

  function buildTrendChart(values, metric, selectedIndex) {
    const width = 720;
    const height = 226;
    const left = 52;
    const right = 18;
    const top = 18;
    const bottom = 34;
    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;
    let min = Math.min.apply(null, values.map((item) => item.value));
    let max = Math.max.apply(null, values.map((item) => item.value));
    const spread = max - min || Math.max(max * 0.12, 1);
    min = Math.max(0, min - spread * 0.18);
    max += spread * 0.18;

    const points = values.map((item, index) => {
      const x = values.length === 1
        ? left + plotWidth / 2
        : left + (index * plotWidth) / (values.length - 1);
      const y = top + ((max - item.value) / (max - min)) * plotHeight;
      return { x, y, value: item.value, label: item.label };
    });

    const gridLines = [0, 1, 2, 3].map((index) => {
      const ratio = index / 3;
      const y = top + ratio * plotHeight;
      const value = max - ratio * (max - min);
      return [
        '<line class="efficiency-chart-grid" x1="',
        left,
        '" y1="',
        y.toFixed(1),
        '" x2="',
        width - right,
        '" y2="',
        y.toFixed(1),
        '"></line>',
        '<text class="efficiency-chart-axis-label" x="',
        left - 8,
        '" y="',
        (y + 3).toFixed(1),
        '" text-anchor="end">',
        escapeHTML(formatValue(metric, value)),
        "</text>"
      ].join("");
    }).join("");

    const xLabels = points.map((point) => [
      '<text class="efficiency-chart-axis-label" x="',
      point.x.toFixed(1),
      '" y="',
      height - 10,
      '" text-anchor="middle">',
      escapeHTML(point.label),
      "</text>"
    ].join("")).join("");

    const polyline = points.map((point) => (
      point.x.toFixed(1) + "," + point.y.toFixed(1)
    )).join(" ");
    const area = [
      "M",
      points[0].x.toFixed(1),
      (top + plotHeight).toFixed(1),
      "L",
      points.map((point) => point.x.toFixed(1) + " " + point.y.toFixed(1)).join(" L "),
      "L",
      points[points.length - 1].x.toFixed(1),
      (top + plotHeight).toFixed(1),
      "Z"
    ].join(" ");
    const pointNodes = points.map((point, index) => [
      index === selectedIndex
        ? '<circle class="efficiency-chart-current-ring" cx="' + point.x.toFixed(1) +
          '" cy="' + point.y.toFixed(1) + '" r="10" stroke="' + metric.color + '"></circle>'
        : "",
      '<circle class="efficiency-chart-point" cx="',
      point.x.toFixed(1),
      '" cy="',
      point.y.toFixed(1),
      '" r="5" fill="',
      metric.color,
      '"><title>',
      escapeHTML(point.label + "：" + formatValue(metric, point.value) + metric.unit),
      "</title></circle>"
    ].join("")).join("");

    return [
      '<svg class="efficiency-chart" viewBox="0 0 ',
      width,
      " ",
      height,
      '" role="img" aria-label="',
      escapeAttr(getScopeLabel() + metricLabel(metric) + "趋势图"),
      '">',
      gridLines,
      '<path class="efficiency-chart-area" d="',
      area,
      '" fill="',
      metric.color,
      '"></path>',
      '<polyline class="efficiency-chart-line" points="',
      polyline,
      '" stroke="',
      metric.color,
      '"></polyline>',
      pointNodes,
      xLabels,
      "</svg>"
    ].join("");
  }

  function renderContent() {
    const content = [
      renderContextBanner(),
      renderSummaryCards()
    ];

    if (state.view === "department") {
      content.push(renderGroupTable());
    } else if (state.view === "group") {
      content.push(renderMemberTable());
    }

    content.push(renderTrendPanel());
    $("efficiencyContent").innerHTML = content.join("");
  }

  function renderAll() {
    renderRoleTabs();
    renderFilterOptions();
    renderHeader();
    renderContent();
  }

  function switchRole(roleId) {
    const role = ROLE_VIEWS.find((item) => item.id === roleId);
    if (!role) return;

    state.roleId = roleId;
    state.activeMetricId = "output";
    if (role.id === "departmentHead") {
      state.view = "department";
      state.groupId = null;
      state.personId = null;
    } else if (role.id === "groupLeader") {
      state.view = "group";
      state.groupId = role.groupId;
      state.personId = null;
    } else {
      state.view = "person";
      state.groupId = role.groupId;
      state.personId = role.personId;
    }
    renderAll();
  }

  function openGroup(groupId) {
    const group = getGroup(groupId);
    if (!group || state.roleId !== "departmentHead") return;
    state.view = "group";
    state.groupId = groupId;
    state.personId = null;
    renderAll();
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
    renderAll();
  }

  function goBack() {
    if (state.view === "person" && state.roleId !== "member") {
      state.view = "group";
      state.personId = null;
      renderAll();
      return;
    }
    if (state.view === "group" && state.roleId === "departmentHead") {
      state.view = "department";
      state.groupId = null;
      renderAll();
    }
  }

  function navigateToLevel(level) {
    if (level === "department" && state.roleId === "departmentHead") {
      state.view = "department";
      state.groupId = null;
      state.personId = null;
      renderAll();
      return;
    }
    if (level === "group" && state.roleId !== "member" && state.groupId) {
      state.view = "group";
      state.personId = null;
      renderAll();
    }
  }

  function bindEvents() {
    $("efficiencyRoleTabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-role-id]");
      if (!button || button.dataset.roleId === state.roleId) return;
      switchRole(button.dataset.roleId);
    });

    $("efficiencyPeriodTypeTabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-period-type]");
      if (!button || button.dataset.periodType === state.periodType) return;
      state.selectedPeriodIndexes[state.periodType] = state.periodIndex;
      state.periodType = button.dataset.periodType;
      state.periodIndex = state.selectedPeriodIndexes[state.periodType];
      renderAll();
      if (window.showToast) window.showToast("已切换为：" + state.periodType + "人效数据");
    });

    $("efficiencyPeriodSelect").addEventListener("change", (event) => {
      const nextIndex = getPeriods().findIndex((item) => item.value === event.target.value);
      if (nextIndex < 0) return;
      state.periodIndex = nextIndex;
      state.selectedPeriodIndexes[state.periodType] = nextIndex;
      renderAll();
    });

    $("efficiencyBusinessTypeSelect").addEventListener("change", (event) => {
      if (!BUSINESS_TYPES.some((item) => item.value === event.target.value)) return;
      state.businessType = event.target.value;
      renderAll();
    });

    $("efficiencyContent").addEventListener("click", (event) => {
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

      const metricButton = event.target.closest("[data-metric-id]");
      if (metricButton && metricButton.dataset.metricId !== state.activeMetricId) {
        state.activeMetricId = metricButton.dataset.metricId;
        renderContent();
      }
    });

    $("efficiencyPageActions").addEventListener("click", (event) => {
      if (event.target.closest('[data-page-action="back"]')) goBack();
    });

    $("efficiencyBreadcrumb").addEventListener("click", (event) => {
      const button = event.target.closest("[data-nav-level]");
      if (button) navigateToLevel(button.dataset.navLevel);
    });
  }

  function initialize() {
    renderAll();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
