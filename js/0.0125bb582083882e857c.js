webpackJsonp([0],{"5Z0N":function(e,a,l){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=l("Xxa5"),i=l.n(t),r=l("woOf"),n=l.n(r),u=l("exGp"),s=l.n(u),o=l("ZzWJ"),v={id:"wode",fields:[{id:"liveRADIO",label:"liveRADIO",value:"",type:"RADIO",values:[{label:"是",value:"0"},{label:"否",value:"1"}],validations:[{required:!0,message:"liveRADIO",trigger:"change"}]},{id:"INTnumAdult",label:"INTnumAdult",value:"",type:"INT",validations:[{required:!0,message:"INTnumAdult",trigger:"change"},{pattern:"^(\\w){4,10}$",message:"只能输入4-10个字母、数字、下划线",trigger:"change"}]},{id:"numAdultaINPUT",label:"除了自己以外18岁以上成年人有几位11111",value:"",type:"INPUT",validations:[{required:!0,message:"numAdultaINPUT",trigger:"change"},{pattern:"^(\\w){4,10}$",message:"只能输入4-10个字母、数字、下划线",trigger:"change"}]},{id:"heartAttackUnder50",label:"我CHECKBOX",value:"",type:"CHECKBOX",values:[{label:"A",value:"0"},{label:"B",value:"1"},{label:"C",value:"2"},{label:"D",value:"3"}],validations:[{type:"array",required:!0,message:"我CHECKBOX",trigger:"change"}]},{id:"aCascader",label:"我帅么111",value:"",type:"CASCADER",children:[{value:"0",label:"Basic",children:[{value:"1",label:"Layout 布局"},{value:"2",label:"Color 色彩"},{value:"3",label:"Typography 字体"},{value:"4",label:"Icon 图标"},{value:"5",label:"Button 按钮"}]}],validations:[{type:"array",required:!0,message:"请至少选择CASCADER",trigger:"change"}]},{id:"heartAttackUnder53",label:"我帅么",value:"",type:"SWITCH"},{id:"heartAttackUnder52",label:"RADIORADIO",value:"1",type:"RADIO",values:[{label:"是",value:"0"},{label:"否",value:"1"}],validations:[{required:!0,message:"请选择RADIO",trigger:"change"}]},{id:"oncologyHistoryTime1",label:"DATE",value:"2018-06-13",type:"DATE",validations:[{type:"date",required:!0,message:"请选择DATE",trigger:"change"}]},{id:"oncologyHistoryTime2",label:"DATETIMEDATETIME",type:"DATETIME",value:"2018-06-13 16:25:49",validations:[{type:"date",required:!0,message:"请选择DATETIME",trigger:"change"}]},{id:"paternalDiagnosis",label:"INPUTINPUT",type:"INPUT",validations:[{required:!0,message:"诊断INPUT",trigger:"change"},{min:3,max:5,message:"长度在 3 到 5 个字符INPUT",trigger:"change"}]},{id:"paternalDiagnosis6",label:"TEXTAREA",type:"TEXTAREA",validations:[{required:!0,message:"诊断TEXTAREA",trigger:"change"},{min:3,max:5,message:"长度在TEXTAREA",trigger:"change"}]},{id:"heartAttackUnder51",label:"我SELECTSELECT",value:"",type:"SELECT",values:[{label:"是",value:"0"},{label:"否",value:"1"}],validations:[{required:!0,message:"请选择SELECTSELECT",trigger:"change"}]},{id:"smallCALCULATE",label:"CALCULATECATE",values:"(INTnumAdult + numAdultaINPUT)",type:"CALCULATE",validations:{}},{id:"concreteOncology",label:"TABLETABLE",values:[{TEXTAREA:"111",INPUT:"222",SELECT:"0",DATE:"2018-06-13",DATETIME:"2018-06-13 16:25:49",CHECKBOX:["0","2"],SWITCH:!0,RADIO:"0",CASCADER:["0","1"]},{TEXTAREA:"222",INPUT:"王小虎",CHECKBOX:["0","2","3"]}],type:"TABLE",sub_fields:[{id:"TEXTAREA",label:"TEXTAREA",type:"TEXTAREA",validations:[{required:!0,message:"请输入活动",trigger:"change"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"change"}]},{id:"INPUT",label:"INPUT",type:"INPUT",validations:[{required:!0,message:"请输入名称",trigger:"change"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"change"}]},{id:"SELECT",label:"SELECT",value:"",type:"SELECT",values:[{label:"是",value:"0"},{label:"否",value:"1"}],validations:[{required:!0,message:"请选择活动资源",trigger:"change"}]},{id:"DATE",label:"DATE",type:"DATE",validations:[{type:"date",required:!0,message:"请选择时间",trigger:"change"}]},{id:"DATETIME",label:"诊断时间",type:"DATETIME",validations:[{type:"date",required:!0,message:"请选择时间",trigger:"change"}]},{id:"CHECKBOX",label:"CHECKBOX",value:"",type:"CHECKBOX",values:[{label:"A",value:"0"},{label:"B",value:"1"},{label:"C",value:"2"},{label:"D",value:"3"}],validations:[{type:"array",required:!0,message:"请至少选择一个活动性质",trigger:"change"}]},{id:"SWITCH",label:"SWITCH",value:"",type:"SWITCH"},{id:"RADIO",label:"RADIO",value:"",type:"RADIO",values:[{label:"是",value:"0"},{label:"否",value:"1"}],validations:[{required:!0,message:"请选择活动资源",trigger:"change"}]},{id:"CASCADER",label:"CASCADER",value:"",type:"CASCADER",children:[{value:"0",label:"指南",children:[{value:"1",label:"设计原则",children:[{value:"2",label:"一致"},{value:"fankui",label:"反馈"},{value:"xiaolv",label:"效率"},{value:"kekong",label:"可控"}]},{value:"daohang",label:"导航",children:[{value:"cexiangdaohang",label:"侧向导航"},{value:"dingbudaohang",label:"顶部导航"}]}]},{value:"zujian",label:"组件",children:[{value:"basic",label:"Basic",children:[{value:"layout",label:"Layout 布局"},{value:"color",label:"Color 色彩"},{value:"typography",label:"Typography 字体"},{value:"icon",label:"Icon 图标"},{value:"button",label:"Button 按钮"}]},{value:"form",label:"Form",children:[{value:"radio",label:"Radio 单选框"},{value:"checkbox",label:"Checkbox 多选框"},{value:"input",label:"Input 输入框"},{value:"input-number",label:"InputNumber 计数器"},{value:"select",label:"Select 选择器"},{value:"cascader",label:"Cascader 级联选择器"},{value:"switch",label:"Switch 开关"},{value:"slider",label:"Slider 滑块"},{value:"time-picker",label:"TimePicker 时间选择器"},{value:"date-picker",label:"DatePicker 日期选择器"},{value:"datetime-picker",label:"DateTimePicker 日期时间选择器"},{value:"upload",label:"Upload 上传"},{value:"rate",label:"Rate 评分"},{value:"form",label:"Form 表单"}]},{value:"data",label:"Data",children:[{value:"table",label:"Table 表格"},{value:"tag",label:"Tag 标签"},{value:"progress",label:"Progress 进度条"},{value:"tree",label:"Tree 树形控件"},{value:"pagination",label:"Pagination 分页"},{value:"badge",label:"Badge 标记"}]},{value:"notice",label:"Notice",children:[{value:"alert",label:"Alert 警告"},{value:"loading",label:"Loading 加载"},{value:"message",label:"Message 消息提示"},{value:"message-box",label:"MessageBox 弹框"},{value:"notification",label:"Notification 通知"}]},{value:"navigation",label:"Navigation",children:[{value:"menu",label:"NavMenu 导航菜单"},{value:"tabs",label:"Tabs 标签页"},{value:"breadcrumb",label:"Breadcrumb 面包屑"},{value:"dropdown",label:"Dropdown 下拉菜单"},{value:"steps",label:"Steps 步骤条"}]},{value:"others",label:"Others",children:[{value:"dialog",label:"Dialog 对话框"},{value:"tooltip",label:"Tooltip 文字提示"},{value:"popover",label:"Popover 弹出框"},{value:"card",label:"Card 卡片"},{value:"carousel",label:"Carousel 走马灯"},{value:"collapse",label:"Collapse 折叠面板"}]}]},{value:"ziyuan",label:"资源",children:[{value:"axure",label:"Axure Components"},{value:"sketch",label:"Sketch Templates"},{value:"jiaohu",label:"组件交互文档"}]}],validations:[{type:"array",required:!0,message:"请至少选择一个活动性质",trigger:"change"}]}],relation:{INPUT:{target:"SELECT",rule_type:"EQUAL",value:"111"}}}],relation:{heartAttackUnder50:{target:"liveRADIO",rule_type:"EQUAL",value:"1"},aCascader:{target:"liveRADIO",rule_type:"EQUAL",value:"1"},numAdultaINPUT:{target:"INTnumAdult",rule_type:"EQUAL",value:"666"}},compute:{smallCALCULATE:"(INTnumAdult + numAdultaINPUT)"}},d={name:"HelloWorld",data:function(){return{mozhu:{},gainData:!1,confirmTemplateDialogVisible:!1,confirmAllFish:{fields:[{id:"id",label:"ID",value:"",type:"INPUT",validations:[{pattern:"^[a-zA-Z][a-zA-Z0-9]*$",message:"只能输入以英文字母开头的英文或数字",trigger:"change"}]},{id:"name",label:"模板名字",value:"",type:"INPUT",validations:[{required:!0,message:"请输入模板名",trigger:"change"},{pattern:"^[^\\s~！@#￥%……&*（）——+~!@#$%^&*()_+]*$",message:"不能输入空格或特殊字符",trigger:"change"}]},{id:"description",label:"描述",value:"",type:"TEXTAREA",validations:[{pattern:"^[^\\s~！@#￥%……&*（）——+~!@#$%^&*()_+]*$",message:"不能输入空格或特殊字符",trigger:"change"}]}]},submitData:{}}},computed:{},created:function(){this.firstShow()},methods:{firstShow:function(){var e=this;return s()(i.a.mark(function a(){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(o.d)();case 2:a.sent,n()(e.mozhu,v),e.gainData=!0;case 6:case"end":return a.stop()}},a,e)}))()},consoleData:function(e,a,l,t,r,u){var o=this;return s()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:o.submitData.fields=u,n()(o.submitData,l,t),o.confirmTemplateDialogVisible=!0;case 3:case"end":return e.stop()}},e,o)}))()},notVerifying:function(e,a,l,t,r,u){var o=this;return s()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:o.submitData.fields=u,n()(o.submitData,l,t),o.confirmTemplateDialogVisible=!0;case 3:case"end":return e.stop()}},e,o)}))()},confirmData:function(e,a,l,t,r,u){var v=this;return s()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n()(v.submitData,a),e.next=3,Object(o.c)(v.submitData);case 3:e.sent;case 5:case"end":return e.stop()}},e,v)}))()},sortAfterData:function(e){}}},g={render:function(){var e=this,a=e.$createElement,l=e._self._c||a;return l("div",{staticClass:"hello"},[l("div",{staticClass:"content"},[e.gainData?l("sx-form",{attrs:{add:"",edit:"",sort:"",mozhu:e.mozhu},on:{consoleData:e.consoleData,notVerifying:e.notVerifying,sortAfterData:e.sortAfterData}}):e._e()],1),e._v(" "),e.confirmTemplateDialogVisible?l("el-dialog",{attrs:{title:"创建模板",visible:e.confirmTemplateDialogVisible},on:{"update:visible":function(a){e.confirmTemplateDialogVisible=a}}},[l("div",{staticStyle:{width:"100%"}},[l("sx-form",{staticStyle:{width:"100%"},attrs:{mozhu:e.confirmAllFish},on:{consoleData:e.confirmData}})],1)]):e._e()],1)},staticRenderFns:[]};var c=l("VU/8")(d,g,!1,function(e){l("WsGY")},"data-v-171965ef",null);a.default=c.exports},WsGY:function(e,a){}});