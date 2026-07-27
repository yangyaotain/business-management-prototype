(function setupReportsPage(){
  const ICON='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';
  const CONTROL_ICONS={
    department:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V7l8-4 8 4v14M8 10h2M14 10h2M8 14h2M14 14h2M10 21v-3h4v3"/></svg>',
    leader:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M14 15a5 5 0 0 1 7 4.5"/></svg>',
    member:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></svg>',
    all:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>',
    proxy:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 7h6M9 11h6M9 15h3M3 21h18"/></svg>',
    cost:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16M6 17l3-6 4 3 5-9"/><circle cx="18" cy="5" r="2"/></svg>',
    general:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>'
  };
  const roles=[
    { id:"departmentHead", label: "部门负责人", userName:"陈建", avatar:"陈", level:"department", icon:CONTROL_ICONS.department },
    { id:"groupLeader", label: "业务组长", userName:"张明", avatar:"张", level:"group", groupId:"group2", icon:CONTROL_ICONS.leader },
    { id:"member", label: "组员", userName:"李文", avatar:"李", level:"person", groupId:"group2", person:"李文", icon:CONTROL_ICONS.member }
  ];
  const businessTypes=[
    {id:"all",label:"全部",icon:CONTROL_ICONS.all},
    {id:"proxy",label:"代理",icon:CONTROL_ICONS.proxy},
    {id:"cost",label:"造价",icon:CONTROL_ICONS.cost},
    {id:"general",label:"通用",icon:CONTROL_ICONS.general}
  ];
  const periodOptions={
    月度:[
      {value:"2026-07",label:"2026年7月"},{value:"2026-06",label:"2026年6月"},{value:"2026-05",label:"2026年5月"},
      {value:"2026-04",label:"2026年4月"},{value:"2026-03",label:"2026年3月"},{value:"2026-02",label:"2026年2月"},
      {value:"2026-01",label:"2026年1月"},{value:"2025-12",label:"2025年12月"},{value:"2025-11",label:"2025年11月"},
      {value:"2025-10",label:"2025年10月"},{value:"2025-09",label:"2025年9月"},{value:"2025-08",label:"2025年8月"}
    ],
    季度:[
      {value:"2026-Q2",label:"2026年第二季度"},{value:"2026-Q1",label:"2026年第一季度"},
      {value:"2025-Q4",label:"2025年第四季度"},{value:"2025-Q3",label:"2025年第三季度"}
    ]
  };
  const groups=[
    {id:"group1",name:"第一业务组",leader:"赵倩",members:["赵倩","周航","林悦","王晨","郑凯"],bid:186,deal:162,scale:18.6,revenue:426,rate:"87.1%",alerts:3},
    {id:"group2",name:"第二业务组",leader:"张明",members:["张明","李文","刘颖","吴昊","周敏"],bid:214,deal:193,scale:23.8,revenue:518,rate:"90.2%",alerts:2},
    {id:"group3",name:"非电力业务组",leader:"孙岚",members:["孙岚","许哲","高宇","方琳","唐俊"],bid:158,deal:139,scale:15.2,revenue:365,rate:"88.0%",alerts:4},
    {id:"cost",name:"造价业务组",leader:"王军",members:["王军","蒋宁","韩雪","冯涛","彭佳"],bid:72,deal:68,scale:6.9,revenue:196,rate:"94.4%",alerts:1}
  ];
  const metrics=[
    ["业务规模","招标数量","630个","598个","+5.4%","586个","+7.5%","1,080个","630个",58,"normal",["依法必招 418个","非依法必招 212个","内部业务 372个","外部业务 258个"]],
    ["业务规模","成交数量","562个","529个","+6.2%","520个","+8.1%","960个","562个",59,"normal",["成交标段 562个","流标 48个","终止 20个","成交项目 417项"]],
    ["业务规模","异常数量","10项","8项","+25.0%","13项","-23.1%","≤12项","10项",83,"abnormal",["时效异常 4项","质量异常 3项","费用异常 2项","其他异常 1项"]],
    ["业务规模","交易规模","64.5亿元","60.8亿元","+6.1%","58.2亿元","+10.8%","108亿元","64.5亿元",60,"normal",["内部招标 31.2亿元","外部招标 18.6亿元","非招代理 7.8亿元","造价咨询 6.9亿元"]],
    ["业务规模","营收","1,505万元","1,438万元","+4.7%","1,326万元","+13.5%","2,560万元","1,505万元",59,"normal",["内部代理 708万元","外部代理 426万元","非招代理 175万元","造价咨询 196万元"]],
    ["客户赋能","采购成功率","89.1%","87.4%","+1.7pct","86.8%","+2.3pct","≥88%","89.1%",101,"normal",["成交标段 562个","流标标段 48个","终止标段 20个","统计标段 630个"]],
    ["客户赋能","招标文件建议数量","286条","251条","+13.9%","238条","+20.2%","420条","286条",68,"normal",["一般建议 212条","中高风险建议 74条","已采纳建议 265条","涉及项目 168项"]],
    ["客户赋能","建议采纳率","92.6%","91.8%","+0.8pct","90.4%","+2.2pct","≥92%","92.6%",101,"normal",["有效建议 286条","已采纳 265条","中高风险建议 74条","中高风险采纳 68条"]],
    ["客户赋能","审查覆盖率","98.4%","97.9%","+0.5pct","96.8%","+1.6pct","100%","98.4%",98,"abnormal",["应审查标段 630个","已审查标段 620个","未完成审查 10个","开评标审查 486个"]],
    ["客户赋能","风险识别率","91.3%","89.6%","+1.7pct","88.1%","+3.2pct","≥90%","91.3%",101,"normal",["项目经理识别 146项","质量审核识别 22项","内部抽检 9项","外部审查 3项"]],
    ["质量时效","一次通过率","94.8%","93.6%","+1.2pct","92.9%","+1.9pct","≥95%","94.8%",100,"abnormal",["一次通过 597次","流程提交 630次","审批回退 33次","平均回退 1.2次"]],
    ["客户赋能","开评标审查项目数量","486项","452项","+7.5%","438项","+11.0%","760项","486项",64,"normal",["开标审查 268项","评标审查 218项","应审查项目 494项","已覆盖项目 486项"]],
    ["客户赋能","有效异议/投诉成立率","3.8%","4.6%","-0.8pct","5.1%","-1.3pct","≤4%","3.8%",105,"normal",["异议投诉 26项","有效成立 1项","已办结 24项","处理中 2项"]],
    ["质量时效","质量问题数","16项","19项","-15.8%","21项","-23.8%","≤18项","16项",112,"normal",["一般问题 11项","较大问题 4项","重大问题 1项","已闭环 14项"]],
    ["质量时效","质量问题率","2.8%","3.6%","-0.8pct","4.0%","-1.2pct","≤3%","2.8%",107,"normal",["问题标段 16个","成交标段 562个","业务组问题率 3.1%","个人问题率 2.4%"]],
    ["客户赋能","客户满意度","92.6分","91.4分","+1.2分","90.8分","+1.8分","≥90分","92.6分",103,"normal",["评价项目 146项","已回收评价 138份","五星评价 112份","低分评价 3份"]],
    ["质量时效","平台服务费回收率","96.7%","95.2%","+1.5pct","93.8%","+2.9pct","≥98%","96.7%",99,"abnormal",["应收金额 486万元","实收金额 470万元","应收笔数 214笔","已收笔数 207笔"]],
    ["质量时效","投标保证金应退未退笔数","7笔","11笔","-36.4%","15笔","-53.3%","0笔","7笔",70,"abnormal",["到期应退 126笔","已退款 119笔","应退未退 7笔","平均逾期 1.8天"]],
    ["质量时效","专家费应发未及时发放笔数","3笔","5笔","-40.0%","8笔","-62.5%","0笔","3笔",82,"abnormal",["到期应发 168笔","已按时发放 165笔","未及时发放 3笔","平均逾期 1.3天"]],
    ["质量时效","关键节点时效","91.7%","90.2%","+1.5pct","88.6%","+3.1pct","≥95%","91.7%",97,"abnormal",["按时完成节点 1,284个","统计节点 1,400个","超时节点 116个","平均超时 1.6天"]],
    ["质量时效","项目完成平均周期","28.6天","30.2天","-5.3%","31.4天","-8.9%","≤30天","28.6天",105,"normal",["招标项目 31.2天","非招项目 21.6天","造价项目 34.8天","完成项目 417项"]],
    ["能力建设","案例贡献度","38份","31份","+22.6%","27份","+40.7%","60份","38份",63,"normal",["优秀案例 8份","有效案例 30份","参与人员 24人","已入库 32份"]],
    ["能力建设","测试通过率","96.2%","94.5%","+1.7pct","92.8%","+3.4pct","≥95%","96.2%",101,"normal",["参加测试 132人次","通过 127人次","未通过 5人次","平均分 93.6分"]]
  ];
  const generalMetricNames=["异常数量","一次通过率","质量问题数","质量问题率","客户满意度","关键节点时效","项目完成平均周期"];
  let state={
    level:"department",groupId:null,person:null,category:"全部",role:"departmentHead",
    periodType:"月度",selectedPeriods:{月度:"2026-07",季度:"2026-Q2"},businessType:"all",openMetric:null
  };
  const $=id=>document.getElementById(id);
  const esc=v=>String(v??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const activeGroup=()=>groups.find(g=>g.id===state.groupId)||groups[1];
  const activeRole=()=>roles.find(role=>role.id===state.role)||roles[0];
  function scopeLabel(){return state.level==="department"?"代理业务部":state.level==="group"?activeGroup().name:state.person;}
  function currentPeriod(){
    const options=periodOptions[state.periodType];
    return options.find(option=>option.value===state.selectedPeriods[state.periodType])||options[0];
  }
  function currentPeriodLabel(){return currentPeriod().label;}
  function currentPeriodYear(){return currentPeriod().value.slice(0,4);}
  function currentReportKind(){return state.periodType==="季度"?"季报":"月报";}
  function currentReportName(type){
    return type==="专项报告"
      ?"业务质效提升专项报告【"+currentPeriodLabel()+"】"
      :"代理业务部经营"+currentReportKind()+"【"+currentPeriodLabel()+"】";
  }
  function scaled(value,index){if(state.level==="department")return value;if(index===0||index===1)return Math.round(parseFloat(value.replace(/,/g,""))/(state.level==="group"?3.2:12))+"个";return value}
  function renderControls(){
    $("reportRoleTabs").innerHTML=roles.map(role=>'<button type="button" class="dashboard-role-tab '+(state.role===role.id?"active":"")+'" data-role-id="'+role.id+'" aria-pressed="'+String(state.role===role.id)+'">'+role.icon+"<span>"+role.label+"</span></button>").join("");
    $("reportPeriodTypeTabs").querySelectorAll("[data-period-type]").forEach(button=>{
      const active=button.dataset.periodType===state.periodType;
      button.classList.toggle("active",active);
      button.setAttribute("aria-pressed",String(active));
    });
    $("reportPeriodSelect").innerHTML=periodOptions[state.periodType].map(option=>'<option value="'+option.value+'"'+(option.value===state.selectedPeriods[state.periodType]?" selected":"")+">"+option.label+"</option>").join("");
    $("reportBusinessTypeSelect").innerHTML=businessTypes.map(type=>'<option value="'+type.id+'"'+(state.businessType===type.id?" selected":"")+">"+(type.id==="all"?"全部业务":type.label+"业务")+"</option>").join("");
    const role=activeRole();
    $("reportUserAvatar").textContent=role.avatar;
    $("reportUserName").textContent=role.userName;
    $("reportUserRole").textContent=role.label;
    $("topbarPageSubtitle").textContent=role.label+" · "+(state.level==="department"?"部门":state.level==="group"?"业务组":"个人")+"报表视图";
    $("reportPeriodBadge").textContent=currentPeriodLabel();
  }
  function metricMatchesBusiness(metric){
    if(state.businessType==="all")return true;
    if(state.businessType==="general")return generalMetricNames.includes(metric[1]);
    if(state.businessType==="cost")return ["交易规模","营收"].includes(metric[1])||generalMetricNames.includes(metric[1]);
    return !["能力建设"].includes(metric[0]);
  }
  function renderPath(){
    const parts=[state.role==="departmentHead"?'<button data-level="department">代理业务部</button>':'<span>代理业务部</span>'];
    if(state.level!=="department")parts.push("<i>/</i>",'<button data-level="group">'+esc(activeGroup().name)+"</button>");
    if(state.level==="person")parts.push("<i>/</i>","<span>"+esc(state.person)+"</span>");
    $("reportLevelPath").innerHTML=parts.join("");
    $("reportPageTitle").textContent=state.level==="department"?"部门经营报表":state.level==="group"?activeGroup().name+"报表":state.person+"个人报表";
    $("reportPageDescription").textContent=state.level==="department"?"查看部门及各业务组指标，点击组名进入业务组报表。":state.level==="group"?"查看业务组整体指标及组员数据，点击姓名进入个人报表。":"查看个人指标、基础组成数据及项目明细。";
  }
  function renderSummary(){
    const g=state.level==="department"?{bid:630,deal:562,scale:64.5,revenue:1505,rate:"89.1%",alerts:10}:activeGroup();
    const ratio=state.level==="person"?.24:1;
    const data=[["招标数量",Math.round(g.bid*ratio),"个","同比 +7.5%"],["成交数量",Math.round(g.deal*ratio),"个","环比 +6.2%"],["交易规模",(g.scale*ratio).toFixed(1),"亿元","同比 +10.8%"],["营收",Math.round(g.revenue*ratio),"万元","环比 +4.7%"],["采购成功率",g.rate,"","高于部门均值"],["异常数量",Math.max(1,Math.round(g.alerts*ratio)),"项","需要跟进","alert"]];
    $("reportSummaryGrid").innerHTML=data.map(x=>'<article class="card report-summary-card '+(x[4]||"")+'"><span class="report-summary-label">'+x[0]+'</span><div class="report-summary-value"><strong>'+x[1]+'</strong><span>'+x[2]+'</span></div><div class="report-summary-foot"><span>'+esc(scopeLabel())+'</span><em>'+x[3]+"</em></div></article>").join("");
  }
  function renderOrganization(){
    const panel=$("organizationPanel");
    if(state.level==="person"){panel.classList.add("hidden");return} panel.classList.remove("hidden");
    if(state.level==="department"){
      $("organizationPanelTitle").textContent="业务组指标对比";$("organizationPanelDescription").textContent="点击业务组名称进入本组报表";$("organizationCount").textContent="共 "+groups.length+" 个业务组";
      $("organizationTableHead").innerHTML="<tr><th>业务组</th><th>负责人</th><th>招标数量</th><th>成交数量</th><th>交易规模</th><th>营收</th><th>采购成功率</th><th>异常数量</th></tr>";
      $("organizationTableBody").innerHTML=groups.map(g=>'<tr><td><button class="organization-link" data-group="'+g.id+'">'+g.name+'</button></td><td>'+g.leader+'</td><td>'+g.bid+'个</td><td>'+g.deal+'个</td><td>'+g.scale+'亿元</td><td>'+g.revenue+'万元</td><td><span class="change-up">'+g.rate+'</span></td><td><span class="'+(g.alerts>2?"change-down":"")+'">'+g.alerts+"项</span></td></tr>").join("");
    }else{
      const g=activeGroup(), members=state.role==="member"?["李文"]:g.members;
      $("organizationPanelTitle").textContent="组员数据";$("organizationPanelDescription").textContent=state.role==="member"?"普通组员只显示本人数据":"点击姓名进入个人报表";$("organizationCount").textContent="共 "+members.length+" 人";
      $("organizationTableHead").innerHTML="<tr><th>姓名</th><th>角色</th><th>招标数量</th><th>成交数量</th><th>交易规模</th><th>营收</th><th>质量问题</th><th>平均周期</th></tr>";
      $("organizationTableBody").innerHTML=members.map((n,i)=>'<tr><td><button class="person-link" data-person="'+n+'">'+n+'</button></td><td>'+(i===0?"业务组长":"项目经理")+'</td><td>'+(48+i*7)+'个</td><td>'+(43+i*6)+'个</td><td>'+(4.8+i*.6).toFixed(1)+'亿元</td><td>'+(116+i*18)+'万元</td><td>'+(i+1)+'项</td><td>'+(27.4+i*.8).toFixed(1)+"天</td></tr>").join("");
    }
  }
  function renderMetrics(){
    const cats=["全部","业务规模","客户赋能","质量时效","能力建设"];
    $("metricCategoryTabs").innerHTML=cats.map(c=>'<button type="button" class="'+(state.category===c?"active":"")+'" data-category="'+c+'">'+c+"</button>").join("");
    const list=metrics.filter(m=>(state.category==="全部"||m[0]===state.category)&&metricMatchesBusiness(m));
    $("metricReportBody").innerHTML=list.map((m,i)=>{
      const open=state.openMetric===m[1],current=scaled(m[2],i);
      return '<tr class="metric-row '+m[10]+'"><td class="sticky-name"><button class="metric-toggle '+(open?"open":"")+'" data-metric="'+m[1]+'">'+ICON+'<span>'+m[1]+'</span></button><span class="metric-name-meta">'+m[0]+' · '+scopeLabel()+'</span></td><td>'+current+'</td><td>'+m[3]+'</td><td class="mom-col '+(m[4].startsWith("-")?"change-down":"change-up")+'">'+m[4]+'</td><td>'+m[5]+'</td><td class="yoy-col '+(m[6].startsWith("-")?"change-down":"change-up")+'">'+m[6]+'</td><td>'+m[7]+'</td><td>'+m[8]+'</td><td class="progress-cell"><div class="progress-inline"><span><i style="width:'+Math.min(m[9],100)+'%"></i></span><em>'+m[9]+'%</em></div></td><td class="sticky-action"><button class="table-action" data-detail="'+m[1]+'">查看明细</button></td></tr>'+(open?'<tr class="detail-composition"><td colspan="10"><div class="composition-box">'+m[11].map(x=>{const p=x.split(" ");return '<div class="composition-item"><span>'+p[0]+'</span><strong>'+p.slice(1).join(" ")+"</strong></div>"}).join("")+"</div></td></tr>":"");
    }).join("");
  }
  function modal(content,foot){$("reportOverlayRoot").innerHTML='<div class="modal-mask" data-close-overlay></div><section class="modal wide-modal" role="dialog" aria-modal="true">'+content+(foot?'<div class="modal-foot">'+foot+"</div>":"")+"</section>";document.body.style.overflow="hidden"}
  function closeOverlay(){$("reportOverlayRoot").innerHTML="";document.body.style.overflow=""}
  function openGenerate(){
    modal('<div class="modal-head"><div><h3>生成报告</h3><p>按当前筛选范围生成管理报告或专项报告。</p></div><button class="modal-close" data-close-overlay>×</button></div><div class="modal-body"><div class="report-type-grid"><button class="report-type-card active" data-report-type="管理报告"><strong>管理报告</strong><span>按所选统计周期汇总经营、质效和专项数据。</span></button><button class="report-type-card" data-report-type="专项报告"><strong>专项报告</strong><span>围绕指定专项或指标输出专题分析。</span></button></div><div class="report-config-grid"><label class="field"><span>报告周期</span><input value="'+currentPeriodLabel()+'" disabled></label><label class="field"><span>报告范围</span><input value="'+scopeLabel()+'" disabled></label><label class="field full"><span>报告名称</span><input id="reportNameInput" value="'+currentReportName("管理报告")+'"></label><div class="field full"><span>包含章节</span><div class="section-checks"><label class="section-check"><input type="checkbox" checked>工作总述</label><label class="section-check"><input type="checkbox" checked>业务经营</label><label class="section-check"><input type="checkbox" checked>质效管理</label><label class="section-check"><input type="checkbox" checked>专项工作</label><label class="section-check"><input type="checkbox" checked>其他事项</label></div></div><label class="field full"><span>补充说明</span><textarea placeholder="可补充本期重点情况、原因分析和下一步计划"></textarea></label></div></div>','<button class="ghost-btn" data-close-overlay>取消</button><button class="secondary-btn" id="previewReportButton">预览报告</button><button class="primary-btn" id="confirmReportButton">生成 Word</button>');
  }
  function previewReport(){
    modal('<div class="modal-head"><div><h3>报告预览</h3><p>预览结构按当前'+state.periodType+'统计周期生成。</p></div><button class="modal-close" data-close-overlay>×</button></div><div class="modal-body" style="padding:0"><div class="report-preview-shell"><aside class="report-preview-nav"><strong>章节目录</strong><span>一、工作总述</span><span>二、业务经营</span><span>三、质效管理</span><span>四、专项工作</span><span>五、其他事项</span></aside><div class="report-preview-paper"><h2>'+currentReportName("管理报告")+'</h2><h3>一、工作总述</h3><p>本期部门业务整体运行平稳，交易规模与营收保持增长，采购成功率达到目标要求，个别时效与费用指标仍需持续跟进。</p><h3>二、业务经营</h3><table class="preview-table"><thead><tr><th>指标</th><th>年度目标</th><th>本期完成</th><th>年度累计</th><th>完成进度</th><th>同比</th><th>环比</th></tr></thead><tbody><tr><td>交易规模</td><td>108亿元</td><td>64.5亿元</td><td>64.5亿元</td><td>60%</td><td>+10.8%</td><td>+6.1%</td></tr><tr><td>营收</td><td>2,560万元</td><td>1,505万元</td><td>1,505万元</td><td>59%</td><td>+13.5%</td><td>+4.7%</td></tr></tbody></table></div></div></div>','<button class="ghost-btn" data-close-overlay>关闭</button><button class="primary-btn" id="confirmReportButton">生成 Word</button>');
  }
  function openDetail(name){
    modal('<div class="drawer-head"><div><h2>'+esc(name)+'基础明细</h2><p>'+scopeLabel()+' · '+currentPeriodLabel()+'</p></div><button class="modal-close" data-close-overlay>×</button></div><div class="drawer-body"><div class="detail-list">'+[1,2,3,4].map(i=>'<article class="detail-record"><div><strong>CRCG-'+currentPeriodYear()+'-0'+i+' 采购项目</strong><span>招标代理 · '+activeGroup().name+'</span></div><div><strong>'+["已完成","已完成","跟进中","已完成"][i-1]+'</strong><span>项目状态</span></div><div><strong>'+(26+i)+'.'+i+'天</strong><span>完成周期</span></div><div><strong>'+["正常","正常","异常","正常"][i-1]+'</strong><span>指标状态</span></div></article>').join("")+'</div></div>','<button class="ghost-btn" data-close-overlay>关闭</button><button class="secondary-btn" id="drawerExportButton">导出明细</button>');
  }
  function applyRole(roleId){
    const role=roles.find(item=>item.id===roleId)||roles[0];
    state.role=role.id;
    state.level=role.level;
    state.groupId=role.groupId||null;
    state.person=role.person||null;
    state.openMetric=null;
  }
  function render(){renderControls();renderPath();renderSummary();renderOrganization();renderMetrics()}
  document.addEventListener("click",e=>{
    const group=e.target.closest("[data-group]"),person=e.target.closest("[data-person]"),level=e.target.closest("[data-level]"),cat=e.target.closest("[data-category]"),roleButton=e.target.closest("[data-role-id]"),periodButton=e.target.closest("[data-period-type]"),toggle=e.target.closest("[data-metric]"),detail=e.target.closest("[data-detail]"),reportType=e.target.closest("[data-report-type]");
    if(group&&state.role==="departmentHead"){state.level="group";state.groupId=group.dataset.group;state.person=null;render()}
    else if(person&&state.role!=="member"){state.level="person";state.person=person.dataset.person;render()}
    else if(level&&level.dataset.level==="department"&&state.role==="departmentHead"){state.level="department";state.groupId=null;state.person=null;render()}
    else if(level&&level.dataset.level==="group"&&state.role!=="member"){state.level="group";state.person=null;render()}
    else if(cat){state.category=cat.dataset.category;renderMetrics()}
    else if(roleButton){applyRole(roleButton.dataset.roleId);render();window.showToast("已切换为："+activeRole().label+"视角")}
    else if(periodButton&&periodButton.dataset.periodType!==state.periodType){state.periodType=periodButton.dataset.periodType;render();window.showToast("已切换为："+state.periodType+"经营报表")}
    else if(toggle){state.openMetric=state.openMetric===toggle.dataset.metric?null:toggle.dataset.metric;renderMetrics()}
    else if(detail)openDetail(detail.dataset.detail);
    else if(reportType){document.querySelectorAll("[data-report-type]").forEach(card=>card.classList.toggle("active",card===reportType));const input=$("reportNameInput");if(input)input.value=currentReportName(reportType.dataset.reportType)}
    else if(e.target.closest("#generateReportButton"))openGenerate();
    else if(e.target.closest("#previewReportButton"))previewReport();
    else if(e.target.closest("#confirmReportButton")){closeOverlay();window.showToast("报告已生成，正在准备 Word 文件（原型演示）")}
    else if(e.target.closest("#exportDataButton"))window.showToast("正在导出当前报表数据（原型演示）");
    else if(e.target.closest("#drawerExportButton"))window.showToast("正在导出基础明细（原型演示）");
    else if(e.target.closest("[data-close-overlay]"))closeOverlay();
  });
  $("reportPeriodSelect").addEventListener("change",e=>{state.selectedPeriods[state.periodType]=e.target.value;render();window.showToast("统计周期已切换为："+currentPeriodLabel())});
  $("reportBusinessTypeSelect").addEventListener("change",e=>{state.businessType=e.target.value;state.category="全部";state.openMetric=null;render();const type=businessTypes.find(item=>item.id===state.businessType);window.showToast("业务类型已切换为："+(state.businessType==="all"?"全部业务":type.label+"业务"))});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeOverlay()});
  render();
})();
