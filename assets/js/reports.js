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
  const SUMMARY_ICONS={
    tender:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10M9 2h6v4H9z"/><path d="M6 4H5a2 2 0 0 0-2 2v14h18V6a2 2 0 0 0-2-2h-1"/><path d="M7 11h10M7 15h6"/></svg>',
    deal:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 4-4 4 3 4-3 4 4"/><path d="m7 13 4 4a2 2 0 0 0 3 0l3-4"/><path d="M3 7h4l2-2h6l2 2h4"/></svg>',
    scale:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16"/><path d="M7 17v-5M12 17V8M17 17V4"/><path d="m6 7 4-3 4 2 4-3"/></svg>',
    revenue:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 8h8M8 12h8M12 8v9"/><path d="m9 14 3 3 3-3"/></svg>',
    success:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="m9.5 12 1.7 1.7 3.6-4"/></svg>',
    alert:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 4.2 2.8 18a2 2 0 0 0 1.8 3h14.8a2 2 0 0 0 1.8-3L13.7 4.2a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>'
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
  const detailProjectNames=[
    "华南区域生产物资框架采购","新能源场站设备集中采购","广东区域工程服务采购","智慧园区信息化设备采购",
    "燃机项目检修服务采购","年度办公设备集中采购","分布式光伏施工采购","储能电站运维服务采购",
    "环保设施技术改造采购","电厂备品备件框架采购","综合能源项目咨询服务","区域公司车辆租赁采购",
    "热电联产工程监理采购","风电场道路维护服务采购","数字化平台升级采购","安全生产培训服务采购",
    "海上风电设备检测采购","年度后勤物业服务采购"
  ];
  const generalMetricNames=["异常数量","一次通过率","质量问题数","质量问题率","客户满意度","关键节点时效","项目完成平均周期"];
  let state={
    level:"department",groupId:null,person:null,category:"全部",role:"departmentHead",
    periodType:"月度",selectedPeriods:{月度:"2026-07",季度:"2026-Q2"},businessType:"all",openMetric:null,
    detailMetric:null,detailKeyword:"",detailStatus:"all",detailRecords:[]
  };
  let metricReportPagination=null;
  let detailPagination=null;
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
  function currentPeriodProfile(){
    const optionIndex=Math.max(0,periodOptions[state.periodType].findIndex(option=>option.value===state.selectedPeriods[state.periodType]));
    const monthlyProfiles=[
      {volume:1,rateDelta:0,durationDelta:0},
      {volume:.94,rateDelta:-.4,durationDelta:.4},
      {volume:.91,rateDelta:-.7,durationDelta:.7},
      {volume:.89,rateDelta:-.3,durationDelta:.5},
      {volume:.86,rateDelta:-.9,durationDelta:1.1},
      {volume:.82,rateDelta:-1.2,durationDelta:1.4},
      {volume:.84,rateDelta:-.8,durationDelta:.9},
      {volume:.96,rateDelta:-.2,durationDelta:.3},
      {volume:.92,rateDelta:-.6,durationDelta:.8},
      {volume:.88,rateDelta:-1,durationDelta:1.2},
      {volume:.85,rateDelta:-1.3,durationDelta:1.5},
      {volume:.81,rateDelta:-1.5,durationDelta:1.7}
    ];
    const quarterlyProfiles=[
      {volume:.84,rateDelta:.4,durationDelta:-.3},
      {volume:.42,rateDelta:-.3,durationDelta:.5},
      {volume:1.46,rateDelta:.1,durationDelta:.1},
      {volume:1.08,rateDelta:-.7,durationDelta:.9}
    ];
    return (state.periodType==="季度"?quarterlyProfiles:monthlyProfiles)[optionIndex]||monthlyProfiles[0];
  }
  function formatAdjustedNumber(value,decimals){
    return Number(value).toLocaleString("zh-CN",{
      minimumFractionDigits:decimals,
      maximumFractionDigits:decimals
    });
  }
  function adjustIntervalValue(value,levelFactor=1){
    const text=String(value);
    const match=text.replace(/,/g,"").match(/-?\d+(?:\.\d+)?/);
    if(!match)return text;
    const profile=currentPeriodProfile();
    const original=Number(match[0]);
    const decimals=match[0].includes(".")?1:0;
    let adjusted;
    if(text.includes("%"))adjusted=original+profile.rateDelta;
    else if(text.includes("分"))adjusted=original+profile.rateDelta*.6;
    else if(text.includes("天"))adjusted=original+profile.durationDelta;
    else adjusted=original*profile.volume*levelFactor;
    return text.replace(/-?[\d,]+(?:\.\d+)?/,formatAdjustedNumber(adjusted,decimals));
  }
  function currentBusinessTypeLabel(){
    const type=businessTypes.find(item=>item.id===state.businessType)||businessTypes[0];
    return state.businessType==="all"?"全部业务":type.label+"业务";
  }
  function metricLevelFactor(metric){
    return state.level==="department"||!["招标数量","成交数量"].includes(metric[1])?1:1/(state.level==="group"?3.2:12);
  }
  function metricIntervalValue(metric,index){
    return adjustIntervalValue(metric[index],metricLevelFactor(metric));
  }
  function metricCurrentValue(metric){
    return metricIntervalValue(metric,2);
  }
  function metricProgressValue(metric){
    return Math.max(1,Math.min(130,Math.round(metric[9]*currentPeriodProfile().volume)));
  }
  function visibleMetrics(){
    return metrics.filter(metric=>(state.category==="全部"||metric[0]===state.category)&&metricMatchesBusiness(metric));
  }
  function summaryData(){
    const source=state.level==="department"?{bid:630,deal:562,scale:64.5,revenue:1505,rate:"89.1%",alerts:10}:activeGroup();
    const ratio=state.level==="person"?.24:1;
    const profile=currentPeriodProfile();
    return [
      ["招标数量",Math.round(source.bid*ratio*profile.volume),"个","同比 +7.5%","",SUMMARY_ICONS.tender],
      ["成交数量",Math.round(source.deal*ratio*profile.volume),"个","环比 +6.2%","",SUMMARY_ICONS.deal],
      ["交易规模",(source.scale*ratio*profile.volume).toFixed(1),"亿元","同比 +10.8%","",SUMMARY_ICONS.scale],
      ["营收",Math.round(source.revenue*ratio*profile.volume),"万元","环比 +4.7%","",SUMMARY_ICONS.revenue],
      ["采购成功率",adjustIntervalValue(source.rate),"","高于部门均值","",SUMMARY_ICONS.success],
      ["异常数量",Math.max(1,Math.round(source.alerts*ratio*profile.volume)),"项","需要跟进","alert",SUMMARY_ICONS.alert]
    ];
  }
  function periodGroupData(group){
    const profile=currentPeriodProfile();
    return {
      ...group,
      bid:Math.round(group.bid*profile.volume),
      deal:Math.round(group.deal*profile.volume),
      scale:Number((group.scale*profile.volume).toFixed(1)),
      revenue:Math.round(group.revenue*profile.volume),
      rate:adjustIntervalValue(group.rate),
      alerts:Math.max(1,Math.round(group.alerts*profile.volume))
    };
  }
  function groupMemberData(){
    const group=activeGroup();
    const members=state.role==="member"?["李文"]:group.members;
    const profile=currentPeriodProfile();
    return members.map((name,index)=>({
      name,
      role:index===0?"业务组长":"项目经理",
      bid:Math.round((48+index*7)*profile.volume),
      deal:Math.round((43+index*6)*profile.volume),
      scale:Number(((4.8+index*.6)*profile.volume).toFixed(1)),
      revenue:Math.round((116+index*18)*profile.volume),
      qualityIssues:Math.max(1,Math.round((index+1)*profile.volume)),
      averageCycle:Number((27.4+index*.8+profile.durationDelta).toFixed(1))
    }));
  }
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
    $("reportPeriodBadge").textContent=currentPeriodLabel();
    $("topbarPageSubtitle").textContent=role.label+" · "+(state.level==="department"?"部门":state.level==="group"?"业务组":"个人")+"报表视图";
    $("reportBackButton").classList.toggle("hidden",!((state.level==="group"&&state.role==="departmentHead")||(state.level==="person"&&state.role!=="member")));
  }
  function metricMatchesBusiness(metric){
    if(state.businessType==="all")return true;
    if(state.businessType==="general")return generalMetricNames.includes(metric[1]);
    if(state.businessType==="cost")return ["交易规模","营收"].includes(metric[1])||generalMetricNames.includes(metric[1]);
    return !["能力建设"].includes(metric[0]);
  }
  function renderPath(){
    $("reportPageTitle").textContent=state.level==="department"?"部门经营报表":state.level==="group"?activeGroup().name+"报表":state.person+"个人报表";
    $("reportPageDescription").textContent=state.level==="department"?"查看部门及各业务组指标，点击组名进入业务组报表。":state.level==="group"?"查看业务组整体指标及组员数据，点击姓名进入个人报表。":"查看个人指标、基础组成数据及项目明细。";
  }
  function renderSummary(){
    const data=summaryData();
    $("reportSummaryGrid").innerHTML=data.map(x=>'<article class="card report-summary-card '+(x[4]||"")+'"><span class="report-summary-label">'+x[0]+'</span><span class="report-summary-icon" aria-hidden="true">'+x[5]+'</span><div class="report-summary-value"><strong>'+x[1]+'</strong><span>'+x[2]+'</span></div><div class="report-summary-foot"><span>'+esc(scopeLabel())+'</span><em>'+x[3]+"</em></div></article>").join("");
  }
  function renderOrganization(){
    const panel=$("organizationPanel");
    if(state.level==="person"){panel.classList.add("hidden");return} panel.classList.remove("hidden");
    if(state.level==="department"){
      $("organizationPanelTitle").textContent="业务组报表概览";$("organizationPanelDescription").textContent="横向比较各业务组核心报表指标，点击业务组名称进入本组报表。";$("organizationCount").textContent=groups.length+" 个业务组";
      $("organizationTableHead").innerHTML="<tr><th>业务组</th><th>负责人</th><th>招标数量</th><th>成交数量</th><th>交易规模</th><th>营收</th><th>采购成功率</th><th>异常数量</th></tr>";
      $("organizationTableBody").innerHTML=groups.map(group=>{
        const g=periodGroupData(group);
        return '<tr><td><button type="button" class="organization-link dashboard-organization-link" data-group="'+g.id+'"><span>'+g.name+'</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button></td><td>'+g.leader+'</td><td>'+g.bid+'个</td><td>'+g.deal+'个</td><td>'+g.scale+'亿元</td><td>'+g.revenue+'万元</td><td><span class="change-up">'+g.rate+'</span></td><td><span class="'+(g.alerts>2?"change-down":"")+'">'+g.alerts+"项</span></td></tr>";
      }).join("");
    }else{
      const members=groupMemberData();
      $("organizationPanelTitle").textContent="组员数据";$("organizationPanelDescription").textContent=state.role==="member"?"普通组员只显示本人数据":"点击姓名进入个人报表";$("organizationCount").textContent="共 "+members.length+" 人";
      $("organizationTableHead").innerHTML="<tr><th>姓名</th><th>角色</th><th>招标数量</th><th>成交数量</th><th>交易规模</th><th>营收</th><th>质量问题</th><th>平均周期</th></tr>";
      $("organizationTableBody").innerHTML=members.map(member=>'<tr><td><button class="person-link" data-person="'+member.name+'">'+member.name+'</button></td><td>'+member.role+'</td><td>'+member.bid+'个</td><td>'+member.deal+'个</td><td>'+member.scale+'亿元</td><td>'+member.revenue+'万元</td><td>'+member.qualityIssues+'项</td><td>'+member.averageCycle+"天</td></tr>").join("");
    }
  }
  function renderMetrics(){
    const cats=["全部","业务规模","客户赋能","质量时效","能力建设"];
    $("metricCategoryTabs").innerHTML=cats.map(c=>'<button type="button" class="'+(state.category===c?"active":"")+'" data-category="'+c+'">'+c+"</button>").join("");
    const list=visibleMetrics();
    const paginationState=metricReportPagination.update(list);
    $("metricReportBody").innerHTML=paginationState.items.map(m=>{
      const open=state.openMetric===m[1],current=metricCurrentValue(m),previous=metricIntervalValue(m,3),samePeriod=metricIntervalValue(m,5),cumulative=metricIntervalValue(m,8),progress=metricProgressValue(m);
      return '<tr class="metric-row '+m[10]+'"><td class="sticky-name"><button class="metric-toggle '+(open?"open":"")+'" data-metric="'+m[1]+'">'+ICON+'<span>'+m[1]+'</span></button><span class="metric-name-meta">'+m[0]+' · '+scopeLabel()+'</span></td><td>'+current+'</td><td>'+previous+'</td><td class="mom-col '+(m[4].startsWith("-")?"change-down":"change-up")+'">'+m[4]+'</td><td>'+samePeriod+'</td><td class="yoy-col '+(m[6].startsWith("-")?"change-down":"change-up")+'">'+m[6]+'</td><td>'+m[7]+'</td><td>'+cumulative+'</td><td class="progress-cell"><div class="progress-inline"><span><i style="width:'+Math.min(progress,100)+'%"></i></span><em>'+progress+'%</em></div></td><td class="sticky-action"><button class="table-action" data-detail="'+m[1]+'">查看明细</button></td></tr>'+(open?'<tr class="detail-composition"><td colspan="10"><div class="composition-box">'+m[11].map(x=>{const p=x.split(" ");return '<div class="composition-item"><span>'+p[0]+'</span><strong>'+p.slice(1).join(" ")+"</strong></div>"}).join("")+"</div></td></tr>":"");
    }).join("");
  }
  function exportOverviewMetadata(){
    return [
      ["统计周期",currentPeriodLabel()],
      ["角色身份",activeRole().label],
      ["当前用户",activeRole().userName],
      ["业务类型",currentBusinessTypeLabel()],
      ["当前层级",state.level==="department"?"部门":state.level==="group"?"业务组":"个人"],
      ["数据范围",scopeLabel()],
      ["指标分类",state.category],
      ["导出时间",new Date().toLocaleString("zh-CN",{hour12:false})]
    ];
  }
  function appendStyledExportSheet(workbook,name,config){
    return window.AppExcelExport.appendStyledSheet(workbook,name,config);
  }
  async function downloadExcelWorkbook(workbook,fileName){
    return window.AppExcelExport.downloadWorkbook(workbook,fileName);
  }
  function organizationExportData(){
    if(state.level==="department"){
      return {
        headers:["业务组","负责人","招标数量（个）","成交数量（个）","交易规模（亿元）","营收（万元）","采购成功率","异常数量（项）"],
        rows:groups.map(group=>{
          const item=periodGroupData(group);
          return [item.name,item.leader,item.bid,item.deal,item.scale,item.revenue,item.rate,item.alerts];
        }),
        widths:[18,12,16,16,18,16,16,16]
      };
    }
    if(state.level==="group"){
      return {
        headers:["姓名","角色","招标数量（个）","成交数量（个）","交易规模（亿元）","营收（万元）","质量问题（项）","平均周期（天）"],
        rows:groupMemberData().map(member=>[member.name,member.role,member.bid,member.deal,member.scale,member.revenue,member.qualityIssues,member.averageCycle]),
        widths:[14,14,16,16,18,16,16,16]
      };
    }
    return {
      headers:["说明"],
      rows:[["当前为个人报表，无下级组织数据。"]],
      widths:[44]
    };
  }
  async function exportCurrentData(){
    if(!window.ExcelJS){
      window.showToast("Excel 导出组件加载失败，请刷新页面后重试","error");
      return;
    }
    const exportButton=$("exportDataButton");
    if(exportButton?.disabled)return;
    if(exportButton){
      exportButton.disabled=true;
      exportButton.setAttribute("aria-busy","true");
    }
    try{
      const workbook=new window.ExcelJS.Workbook();
      workbook.creator="业务管理系统";
      workbook.created=new Date();
      workbook.modified=new Date();
      workbook.subject="当前报表展示数据导出";
      workbook.title=scopeLabel()+" "+currentPeriodLabel()+"经营数据";

      appendStyledExportSheet(workbook,"报表概览",{
        title:"经营数据报表概览",
        metadata:exportOverviewMetadata(),
        headers:["指标","当前值","单位","对比说明"],
        rows:summaryData().map(item=>[item[0],item[1],item[2],item[3]]),
        widths:[20,18,12,24]
      });

      const organization=organizationExportData();
      appendStyledExportSheet(workbook,"组织数据",{
        title:"组织数据",
        headers:organization.headers,
        rows:organization.rows,
        widths:organization.widths
      });

      const metricList=visibleMetrics();
      appendStyledExportSheet(workbook,"指标明细",{
        title:"指标明细",
        headers:["数据范围","指标分类","指标名称","当前区间值","上期值","环比","同期值","同比","年度目标","年度累计","完成进度","指标状态"],
        rows:metricList.map(metric=>[
          scopeLabel(),metric[0],metric[1],metricCurrentValue(metric),metricIntervalValue(metric,3),metric[4],metricIntervalValue(metric,5),metric[6],
          metric[7],metricIntervalValue(metric,8),metricProgressValue(metric)+"%",metric[10]==="abnormal"?"需关注":"正常"
        ]),
        widths:[18,14,26,16,14,12,14,12,14,14,14,12]
      });

      const compositionRows=[];
      metricList.forEach(metric=>{
        metric[11].forEach(composition=>{
          const parts=composition.split(" ");
          compositionRows.push([scopeLabel(),metric[0],metric[1],parts[0],parts.slice(1).join(" ")]);
        });
      });
      appendStyledExportSheet(workbook,"指标组成",{
        title:"指标基础组成",
        headers:["数据范围","指标分类","指标名称","组成项","组成值"],
        rows:compositionRows,
        widths:[18,14,26,24,18]
      });

      const safeScope=scopeLabel().replace(/[\\/:*?"<>|]/g,"-");
      const safePeriod=currentPeriodLabel().replace(/[\\/:*?"<>|]/g,"-");
      const fileName=safeScope+"经营数据【"+safePeriod+"】.xlsx";
      await downloadExcelWorkbook(workbook,fileName);
      window.showToast("已导出“"+fileName+"”");
    }catch(error){
      console.error("Excel export failed",error);
      window.showToast("Excel 导出失败，请稍后重试","error");
    }finally{
      if(exportButton){
        exportButton.disabled=false;
        exportButton.removeAttribute("aria-busy");
      }
    }
  }
  function destroyOverlayPaginators(){
    if(detailPagination){detailPagination.destroy();detailPagination=null}
  }
  function modal(content,foot){destroyOverlayPaginators();$("reportOverlayRoot").innerHTML='<div class="modal-mask" data-close-overlay></div><section class="modal wide-modal" role="dialog" aria-modal="true">'+content+(foot?'<div class="modal-foot">'+foot+"</div>":"")+"</section>";document.body.style.overflow="hidden"}
  function closeOverlay(){destroyOverlayPaginators();$("reportOverlayRoot").innerHTML="";document.body.style.overflow=""}
  function detailMetricValue(metricName,index){
    if(metricName==="异常数量")return index%5===2?"1项":"0项";
    if(metricName==="交易规模")return (0.8+(index%8)*0.36).toFixed(1)+"亿元";
    if(metricName==="营收")return 48+(index%9)*9+"万元";
    if(metricName==="招标文件建议数量")return 1+(index%4)+"条";
    if(metricName==="开评标审查项目数量")return index%4===0?"2项":"1项";
    if(metricName==="质量问题数")return index%6===2?"1项":"0项";
    if(metricName==="投标保证金应退未退笔数"||metricName==="专家费应发未及时发放笔数")return index%7===3?"1笔":"0笔";
    if(metricName==="项目完成平均周期")return (24.6+(index%7)*1.3).toFixed(1)+"天";
    if(metricName==="客户满意度")return 90+(index%7)+"分";
    if(metricName==="案例贡献度")return 1+(index%3)+"份";
    if(metricName.includes("率")||metricName==="关键节点时效")return (88.4+(index%8)*1.25).toFixed(1)+"%";
    if(metricName.includes("数量"))return "1个";
    return index%4===0?"已完成":"正常";
  }
  function detailCompletionDate(index){
    const selectedValue=currentPeriod().value;
    let year=selectedValue.slice(0,4);
    let month;
    if(state.periodType==="月度"){
      month=selectedValue.slice(5,7);
    }else{
      const quarter=Number(selectedValue.slice(-1));
      month=String(Math.min(12,quarter*3-2+(index%3))).padStart(2,"0");
    }
    const day=String(3+(index*3)%25).padStart(2,"0");
    return year+"-"+month+"-"+day;
  }
  function createDetailRecords(metricName){
    const statuses=["正常","正常","正常","需关注","正常","异常"];
    const projectStatuses=["已完成","已完成","跟进中","已完成","已完成","已终止"];
    return detailProjectNames.map((project,index)=>{
      const group=state.level==="department"?groups[index%groups.length]:activeGroup();
      const owner=state.level==="person"?state.person:group.members[index%group.members.length];
      const selectedBusiness=businessTypes.find(item=>item.id===state.businessType);
      const businessType=state.businessType==="all"?["招标代理","造价咨询","通用业务"][index%3]:selectedBusiness.label+"业务";
      return {
        code:"CRCG-"+currentPeriodYear()+"-"+String(index+1).padStart(3,"0"),
        project,
        businessType,
        group:group.name,
        owner,
        metricValue:detailMetricValue(metricName,index),
        projectStatus:projectStatuses[index%projectStatuses.length],
        metricStatus:statuses[index%statuses.length],
        completedAt:detailCompletionDate(index)
      };
    });
  }
  function filteredDetailRecords(){
    const keyword=state.detailKeyword.toLowerCase();
    return state.detailRecords.filter(record=>{
      const matchesKeyword=!keyword||[record.code,record.project,record.businessType,record.group,record.owner]
        .some(value=>String(value).toLowerCase().includes(keyword));
      const matchesStatus=state.detailStatus==="all"||record.metricStatus===state.detailStatus;
      return matchesKeyword&&matchesStatus;
    });
  }
  function detailStatusClass(status){
    return status==="正常"?"normal":status==="需关注"?"warning":"error";
  }
  function renderDetailResults(){
    const body=$("detailTableBody");
    const count=$("detailResultCount");
    if(!body||!count||!detailPagination)return;
    const records=filteredDetailRecords();
    const paginationState=detailPagination.update(records);
    const pageRecords=paginationState.items;
    count.textContent="共 "+records.length+" 条";
    body.innerHTML=pageRecords.length?pageRecords.map(record=>[
      "<tr><td><span class=\"detail-code\">",esc(record.code),"</span></td>",
      "<td><div class=\"detail-project-cell\"><strong>",esc(record.project),"</strong><small>",esc(record.group)," · ",esc(record.owner),"</small></div></td>",
      "<td>",esc(record.businessType),"</td><td>",esc(record.metricValue),"</td><td>",esc(record.projectStatus),"</td>",
      '<td><span class="detail-status-tag ',detailStatusClass(record.metricStatus),'">',esc(record.metricStatus),"</span></td>",
      "<td>",esc(record.completedAt),"</td></tr>"
    ].join("")).join(""):'<tr><td colspan="7"><div class="detail-table-empty"><strong>未找到匹配明细</strong><span>请调整查询条件后重试。</span></div></td></tr>';
  }
  async function exportDetailData(){
    if(!window.ExcelJS){
      window.showToast("Excel 导出组件加载失败，请刷新页面后重试","error");
      return;
    }
    const records=filteredDetailRecords();
    if(!records.length){
      window.showToast("当前查询条件下没有可导出的明细","error");
      return;
    }
    const exportButton=$("drawerExportButton");
    if(exportButton?.disabled)return;
    if(exportButton){
      exportButton.disabled=true;
      exportButton.setAttribute("aria-busy","true");
    }
    try{
      const workbook=new window.ExcelJS.Workbook();
      workbook.creator="业务管理系统";
      workbook.created=new Date();
      workbook.modified=new Date();
      workbook.subject=state.detailMetric+"基础明细";
      workbook.title=scopeLabel()+" "+currentPeriodLabel()+" "+state.detailMetric+"基础明细";
      appendStyledExportSheet(workbook,"明细数据",{
        title:state.detailMetric+"基础明细",
        metadata:[
          ["统计周期",currentPeriodLabel()],
          ["数据范围",scopeLabel()],
          ["业务类型",currentBusinessTypeLabel()],
          ["查询关键字",state.detailKeyword||"全部"],
          ["指标状态",state.detailStatus==="all"?"全部":state.detailStatus],
          ["导出时间",new Date().toLocaleString("zh-CN",{hour12:false})]
        ],
        headers:["项目编号","项目名称","业务类型","业务组","负责人","指标结果","项目状态","指标状态","完成日期"],
        rows:records.map(record=>[
          record.code,record.project,record.businessType,record.group,record.owner,record.metricValue,
          record.projectStatus,record.metricStatus,record.completedAt
        ]),
        widths:[19,34,15,18,12,15,14,13,15]
      });
      const safeScope=scopeLabel().replace(/[\\/:*?"<>|]/g,"-");
      const safeMetric=state.detailMetric.replace(/[\\/:*?"<>|]/g,"-");
      const safePeriod=currentPeriodLabel().replace(/[\\/:*?"<>|]/g,"-");
      const fileName=safeScope+"_"+safeMetric+"明细【"+safePeriod+"】.xlsx";
      await downloadExcelWorkbook(workbook,fileName);
      window.showToast("已导出 "+records.length+" 条明细：“"+fileName+"”");
    }catch(error){
      console.error("Detail Excel export failed",error);
      window.showToast("明细 Excel 导出失败，请稍后重试","error");
    }finally{
      if(exportButton){
        exportButton.disabled=false;
        exportButton.removeAttribute("aria-busy");
      }
    }
  }
  function openDetail(name){
    state.detailMetric=name;
    state.detailKeyword="";
    state.detailStatus="all";
    state.detailRecords=createDetailRecords(name);
    modal([
      '<div class="drawer-head"><div><h2>',esc(name),'基础明细</h2><p>',esc(scopeLabel())," · ",esc(currentPeriodLabel()),
      '</p></div><button class="modal-close" data-close-overlay aria-label="关闭">×</button></div>',
      '<div class="drawer-body detail-drawer-body"><div class="detail-query-bar">',
      '<label class="detail-query-field detail-query-keyword"><span>关键词</span><div class="detail-search-input">',
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
      '<input id="detailKeywordInput" type="search" placeholder="搜索项目名称、编号、负责人" autocomplete="off"></div></label>',
      '<label class="detail-query-field"><span>指标状态</span><select id="detailStatusSelect"><option value="all">全部状态</option><option value="正常">正常</option><option value="需关注">需关注</option><option value="异常">异常</option></select></label>',
      '<button type="button" class="secondary-btn detail-query-button" id="detailSearchButton">',
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>查询</button>',
      '<button type="button" class="ghost-btn detail-query-button" id="detailResetButton">',
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4v6h6M20 20v-6h-6"/><path d="M5.5 15a8 8 0 0 0 13.5 2M18.5 9A8 8 0 0 0 5 7"/></svg>重置</button>',
      '</div><div class="detail-result-head"><div><strong>明细数据</strong><span id="detailResultCount"></span></div><span>默认每页 10 条</span></div>',
      '<div class="table-wrap detail-table-wrap"><table class="report-table detail-data-table"><thead><tr>',
      '<th>项目编号</th><th>项目名称</th><th>业务类型</th><th>指标结果</th><th>项目状态</th><th>指标状态</th><th>完成日期</th>',
      '</tr></thead><tbody id="detailTableBody"></tbody></table></div><div class="app-pagination hidden" id="detailPagination" aria-label="基础明细分页"></div></div>'
    ].join(""),[
      '<button class="ghost-btn" data-close-overlay><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>关闭</button>',
      '<button class="secondary-btn" id="drawerExportButton"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>导出 Excel</button>'
    ].join(""));
    detailPagination=window.AppPagination.create({
      container:$("detailPagination"),
      variant:"table",
      itemLabel:"条",
      onChange:renderDetailResults
    });
    renderDetailResults();
  }
  function goBack(){
    if(state.level==="person"&&state.role!=="member"){
      state.level="group";
      state.person=null;
      state.openMetric=null;
      metricReportPagination.reset();
      render();
      return;
    }
    if(state.level==="group"&&state.role==="departmentHead"){
      state.level="department";
      state.groupId=null;
      state.openMetric=null;
      metricReportPagination.reset();
      render();
    }
  }
  function applyRole(roleId){
    const role=roles.find(item=>item.id===roleId)||roles[0];
    state.role=role.id;
    state.level=role.level;
    state.groupId=role.groupId||null;
    state.person=role.person||null;
    state.openMetric=null;
    metricReportPagination.reset();
  }
  function render(){
    renderControls();
    renderPath();
    renderSummary();
    renderOrganization();
    renderMetrics();
  }
  document.addEventListener("click",e=>{
    const group=e.target.closest("[data-group]"),person=e.target.closest("[data-person]"),level=e.target.closest("[data-level]"),cat=e.target.closest("[data-category]"),roleButton=e.target.closest("[data-role-id]"),periodButton=e.target.closest("[data-period-type]"),toggle=e.target.closest("[data-metric]"),detail=e.target.closest("[data-detail]");
    if(group&&state.role==="departmentHead"){state.level="group";state.groupId=group.dataset.group;state.person=null;metricReportPagination.reset();render()}
    else if(person&&state.role!=="member"){state.level="person";state.person=person.dataset.person;metricReportPagination.reset();render()}
    else if(level&&level.dataset.level==="department"&&state.role==="departmentHead"){state.level="department";state.groupId=null;state.person=null;metricReportPagination.reset();render()}
    else if(level&&level.dataset.level==="group"&&state.role!=="member"){state.level="group";state.person=null;metricReportPagination.reset();render()}
    else if(cat){state.category=cat.dataset.category;state.openMetric=null;metricReportPagination.reset();renderMetrics()}
    else if(roleButton&&roleButton.dataset.roleId!==state.role){applyRole(roleButton.dataset.roleId);render()}
    else if(periodButton&&periodButton.dataset.periodType!==state.periodType){state.periodType=periodButton.dataset.periodType;state.openMetric=null;metricReportPagination.reset();render()}
    else if(toggle){state.openMetric=state.openMetric===toggle.dataset.metric?null:toggle.dataset.metric;renderMetrics()}
    else if(detail)openDetail(detail.dataset.detail);
    else if(e.target.closest("#reportBackButton"))goBack();
    else if(e.target.closest("#exportDataButton"))exportCurrentData();
    else if(e.target.closest("#detailSearchButton")){
      state.detailKeyword=$("detailKeywordInput").value.trim();
      state.detailStatus=$("detailStatusSelect").value;
      detailPagination.reset();
      renderDetailResults();
    }
    else if(e.target.closest("#detailResetButton")){
      state.detailKeyword="";
      state.detailStatus="all";
      detailPagination.reset();
      $("detailKeywordInput").value="";
      $("detailStatusSelect").value="all";
      renderDetailResults();
    }
    else if(e.target.closest("#drawerExportButton"))exportDetailData();
    else if(e.target.closest("[data-close-overlay]"))closeOverlay();
  });
  $("reportPeriodSelect").addEventListener("change",e=>{state.selectedPeriods[state.periodType]=e.target.value;state.openMetric=null;metricReportPagination.reset();render()});
  $("reportBusinessTypeSelect").addEventListener("change",e=>{state.businessType=e.target.value;state.category="全部";state.openMetric=null;metricReportPagination.reset();render()});
  document.addEventListener("keydown",e=>{
    if(e.key==="Escape")closeOverlay();
    else if(e.key==="Enter"&&e.target.id==="detailKeywordInput"){
      state.detailKeyword=e.target.value.trim();
      state.detailStatus=$("detailStatusSelect").value;
      detailPagination.reset();
      renderDetailResults();
    }
  });
  metricReportPagination=window.AppPagination.create({
    container:$("metricReportPagination"),
    variant:"table",
    itemLabel:"项",
    onChange:()=>{state.openMetric=null;renderMetrics()}
  });
  render();
})();
