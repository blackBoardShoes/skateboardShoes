webpackJsonp([33],{Zhoz:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=t("BO1k"),r=t.n(n),i=t("woOf"),l=t.n(i),s=t("Xxa5"),c=t.n(s),o=t("exGp"),v=t.n(o),u=t("NYxO"),d=t("xelw"),p=t("zv30"),E=t("DzDz"),A=t("mSAz"),m=t("gyMJ"),f=t("sICn").proxyTableApi.api,g={name:"rules_index",components:{sxNoRouteControl:d.a,sxRadiography:p.a},data:function(){return{navArr:[],showAllForms:[],allArr:{zyjb:{label:"住院基本情况",value:"zyjb",subFields:[{icon:"ercp-icon-medicine-report",name:"手术报告",isStatic:"ssbg"},{icon:"ercp-icon-medicine-guidewire",name:"导丝",template:{relation:{pattern:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","TEXTAREA"]},message:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","TEXTAREA"]},example:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","TEXTAREA"]},required:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","SELECT","SELECTMUTIPLE","DATE","DATETIME","RADIO","TEXTAREA","CHECKBOX","CASCADER"]},tree:{target:"type",rule_type:"EQUAL",value:"CASCADER"},layerTree:{target:"type",rule_type:"EQUAL",value:["SELECT","SELECTMUTIPLE","RADIO","CHECKBOX"]},radioAgain:{target:"type",rule_type:"EQUAL",value:"RADIO"},createCalculate:{target:"type",rule_type:"EQUAL",value:"CREATECALCULATE"},createTable:{target:"type",rule_type:"EQUAL",value:"CREATETABLE"}},fields:[{id:"type",label:"请选择类型",value:"",type:"RADIO",values:[{label:"输入框",value:"INPUT"},{label:"整数类型输入框",value:"INT"},{label:"浮点数类型输入框",value:"DOUBLE"},{label:"文本标签",value:"TEXTAREA"},{label:"选择器",value:"SELECT"},{label:"多选选择器",value:"SELECTMUTIPLE"},{label:"日期选择器",value:"DATE"},{label:"日期时间选择器",value:"DATETIME"},{label:"单选框",value:"RADIO"},{label:"多选框",value:"CHECKBOX"},{label:"级联选择器",value:"CASCADER"},{label:"创建表格",value:"CREATETABLE"},{label:"计算",value:"CREATECALCULATE"}],validations:[{required:!0,message:"请选择类型",trigger:"change"}]},{id:"id",label:"ID",value:"",type:"INPUT",validations:[{required:!0,message:"请输入组件ID",trigger:"change"},{pattern:"^[a-zA-Z][a-zA-Z0-9]+$",message:"只能输入以英文字母开头的英文或数字(两位以上)",trigger:"change"}]},{id:"label",label:"标签名字",value:"",type:"INPUT",validations:[{required:!0,message:"请输入组件标签名",trigger:"change"},{pattern:"^[^\\s~！@#￥%……&*（）——+~!@#$%^&*_+]*$",message:"不能输入空格或特殊字符",trigger:"change"}]},{id:"pattern",label:"正则",type:"INPUT"},{id:"message",label:"正则提示信息",type:"INPUT",rules:{id:"type",rule_type:"EQUAL",value:"INPUT"}},{id:"example",label:"正则例子",type:"EXAMPLE"},{id:"tree",label:"创建级联",type:"TREE",values:[]},{id:"layerTree",label:"创建选项",type:"LAYERTREE",values:[]},{id:"required",label:"是否必填",value:"",type:"RADIO",values:[{label:"是",value:1},{label:"否",value:0}]},{id:"createCalculate",label:"ID公式",value:"",type:"CREATECALCULATE",validations:[{required:!0,message:"请输入需要计算的 ID 公式,如 (id1+id2)",trigger:"blur"}]},{id:"createTable",label:"创建表格",type:"CREATETABLE",values:[]}]}}]},ssjl:{label:"手术记录",value:"ssjl",submenu:{sq:{label:"术前",value:"sq",subFields:[{icon:"ercp-icon-medicine-report",name:"手术报告",isStatic:"ssbg"},{icon:"ercp-icon-medicine-guidewire",name:"导丝",template:{fields:[{id:"type",label:"请选择类型",value:"",type:"RADIO",values:[{label:"输入框",value:"INPUT"},{label:"整数类型输入框",value:"INT"},{label:"浮点数类型输入框",value:"DOUBLE"},{label:"文本标签",value:"TEXTAREA"},{label:"选择器",value:"SELECT"},{label:"多选选择器",value:"SELECTMUTIPLE"},{label:"日期选择器",value:"DATE"},{label:"日期时间选择器",value:"DATETIME"},{label:"单选框",value:"RADIO"},{label:"多选框",value:"CHECKBOX"},{label:"级联选择器",value:"CASCADER"},{label:"创建表格",value:"CREATETABLE"},{label:"计算",value:"CREATECALCULATE"}],validations:[{required:!0,message:"请选择类型",trigger:"change"}]},{id:"id",label:"ID",value:"",type:"INPUT",validations:[{required:!0,message:"请输入组件ID",trigger:"change"},{pattern:"^[a-zA-Z][a-zA-Z0-9]+$",message:"只能输入以英文字母开头的英文或数字(两位以上)",trigger:"change"}]},{id:"label",label:"标签名字",value:"",type:"INPUT",validations:[{required:!0,message:"请输入组件标签名",trigger:"change"},{pattern:"^[^\\s~！@#￥%……&*（）——+~!@#$%^&*()_+]*$",message:"不能输入空格或特殊字符",trigger:"change"}]},{id:"pattern",label:"正则",type:"INPUT"},{id:"message",label:"正则提示信息",type:"INPUT",rules:{id:"type",rule_type:"EQUAL",value:"INPUT"}},{id:"example",label:"正则例子",type:"EXAMPLE"},{id:"tree",label:"创建级联",type:"TREE",values:[]},{id:"layerTree",label:"创建选项",type:"LAYERTREE",values:[]},{id:"required",label:"是否必填",value:"",type:"RADIO",values:[{label:"是",value:1},{label:"否",value:0}]},{id:"createCalculate",label:"ID公式",value:"",type:"CREATECALCULATE",validations:[{required:!0,message:"请输入需要计算的 ID 公式,如 (id1+id2)",trigger:"blur"}]},{id:"createTable",label:"创建表格",type:"CREATETABLE",values:[]}]}},{icon:"ercp-icon-medicine-guidewire",name:"导丝",disabled:!0}]},sz:{label:"术中",value:"sz",subFields:[{icon:"ercp-icon-medicine-report",name:"手术报告"},{icon:"ercp-icon-medicine-guidewire",name:"导丝"},{icon:"ercp-icon-medicine-guidewire",name:"导丝",disabled:!0}]},sh:{label:"术后",value:"sh",subFields:[{icon:"ercp-icon-medicine-report",name:"手术报告"},{icon:"ercp-icon-medicine-cannula",name:"插管"},{icon:"ercp-icon-medicine-guidewire",name:"手术报告",isStatic:"ssbg"}]}}},cyzh:{label:"出院综合评估",value:"cyzh",subFields:[{icon:"ercp-icon-medicine-cannula",name:"插管"},{icon:"ercp-icon-medicine-guidewire",name:"导丝",disabled:!0}]}},fishData:{},fishDataComments:{},allFish:{relation:{pattern:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","TEXTAREA"]},message:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","TEXTAREA"]},example:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","TEXTAREA"]},required:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","SELECT","SELECTMUTIPLE","DATE","DATETIME","RADIO","TEXTAREA","CHECKBOX","CASCADER"]},tree:{target:"type",rule_type:"EQUAL",value:"CASCADER"},layerTree:{target:"type",rule_type:"EQUAL",value:["SELECT","SELECTMUTIPLE","RADIO","CHECKBOX"]},radioAgain:{target:"type",rule_type:"EQUAL",value:"RADIO"},createCalculate:{target:"type",rule_type:"EQUAL",value:"CREATECALCULATE"},createTable:{target:"type",rule_type:"EQUAL",value:"CREATETABLE"}},fields:[{id:"type",label:"请选择类型",value:"",type:"RADIO",values:[{label:"输入框",value:"INPUT"},{label:"整数类型输入框",value:"INT"},{label:"浮点数类型输入框",value:"DOUBLE"},{label:"文本标签",value:"TEXTAREA"},{label:"选择器",value:"SELECT"},{label:"多选选择器",value:"SELECTMUTIPLE"},{label:"日期选择器",value:"DATE"},{label:"日期时间选择器",value:"DATETIME"},{label:"单选框",value:"RADIO"},{label:"多选框",value:"CHECKBOX"},{label:"级联选择器",value:"CASCADER"},{label:"创建表格",value:"CREATETABLE"},{label:"计算",value:"CREATECALCULATE"}],validations:[{required:!0,message:"请选择类型",trigger:"change"}]},{id:"id",label:"ID",value:"",type:"INPUT",validations:[{required:!0,message:"请输入组件ID",trigger:"change"},{pattern:"^[a-zA-Z][a-zA-Z0-9]+$",message:"只能输入以英文字母开头的英文或数字(两位以上)",trigger:"change"}]},{id:"label",label:"标签名字",value:"",type:"INPUT",validations:[{required:!0,message:"请输入组件标签名",trigger:"change"},{pattern:"^[^\\s~！@#￥%……&*（）——+~!@#$%^&*()_+]*$",message:"不能输入空格或特殊字符",trigger:"change"}]},{id:"pattern",label:"正则",type:"INPUT"},{id:"message",label:"正则提示信息",type:"INPUT",rules:{id:"type",rule_type:"EQUAL",value:"INPUT"}},{id:"example",label:"正则例子",type:"EXAMPLE"},{id:"tree",label:"创建级联",type:"TREE",values:[]},{id:"layerTree",label:"创建选项",type:"LAYERTREE",values:[]},{id:"required",label:"是否必填",value:"",type:"RADIO",values:[{label:"是",value:1},{label:"否",value:0}]},{id:"createCalculate",label:"ID公式",value:"",type:"CREATECALCULATE",validations:[{required:!0,message:"请输入需要计算的 ID 公式,如 (id1+id2)",trigger:"blur"}]},{id:"createTable",label:"创建表格",type:"CREATETABLE",values:[]}]},activeIndexNav:"住院基本情况",activeIndex:0,patientInfo:{},ssbgModel:{operationCheckBox:[],operationSelect:[],operationSelectMz:[],operationSelectJc:[],operationSelectHj:[],operationDateTime:""},smf:!1}},computed:Object(u.b)({user:function(e){return e.user}}),created:function(){var e=this;return v()(c.a.mark(function a(){return c.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.$route.params.data&&(e.patientInfo=JSON.parse(e.$route.params.data),e.activeIndexNav=e.patientInfo.phase),a.next=3,e.firstShow();case 3:return a.next=5,e.init();case 5:e.show();case 7:case"end":return a.stop()}},a,e)}))()},methods:{firstShow:function(){var e=this;return v()(c.a.mark(function a(){var t;return c.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(E.c)();case 2:(t=a.sent)&&(e.showAllForms=t.data.entity);case 4:case"end":return a.stop()}},a,e)}))()},show:function(){var e=this;return v()(c.a.mark(function a(){var t;return c.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(A.a)(e.patientInfo.id);case 2:(t=a.sent)&&(e.fishData=t.data.entity?l()({},t.data.entity.data):{},e.fishDataComments=t.data.entity&&"comments"in t.data.entity?l()({},t.data.entity.comments):{});case 5:case"end":return a.stop()}},a,e)}))()},init:function(){var e=this;return v()(c.a.mark(function a(){var t,n,i,l,s,o,v;return c.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:e.navArr=[],t=[],n=!0,i=!1,l=void 0,a.prev=5,s=r()(e.showAllForms);case 7:if(n=(o=s.next()).done){a.next=19;break}if((v=o.value).phase!==e.activeIndexNav){a.next=16;break}if("术中"!==v.phase||"手术报告"!==v.name){a.next=14;break}a.next=16;break;case 14:return a.next=16,t.push(v);case 16:n=!0,a.next=7;break;case 19:a.next=25;break;case 21:a.prev=21,a.t0=a.catch(5),i=!0,l=a.t0;case 25:a.prev=25,a.prev=26,!n&&s.return&&s.return();case 28:if(a.prev=28,!i){a.next=31;break}throw l;case 31:return a.finish(28);case 32:return a.finish(25);case 33:e.navArr=[].concat(t),e.smf=!0;case 36:case"end":return a.stop()}},a,e,[[5,21,25,33],[26,,28,32]])}))()},navArrAssignment:function(){var e=this,a=function a(t){for(var n in t){if(t[n].value===e.activeIndexNav)return t[n];if("submenu"in t[n]&&a(t[n].submenu))return a(t[n].submenu)}}(this.allArr);this.navArr=a?a.subFields:[]},emitClick:function(){var e=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return v()(c.a.mark(function t(){return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.smf=!1,e.activeIndex=a.index,setTimeout(function(a){e.smf=!0},1);case 4:case"end":return t.stop()}},t,e)}))()},handleSelect:function(e,a){var t=this;return v()(c.a.mark(function a(){return c.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:t.smf=!1,t.activeIndexNav=e,t.activeIndex=0,setTimeout(function(e){t.init()},1);case 4:case"end":return a.stop()}},a,t)}))()},opinionDelete:function(e){this.$refs.thatForm.deleteError(e)},generalSave:function(){var e=this;return v()(c.a.mark(function a(){return c.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$refs.thatForm.notVerifying();case 2:return a.next=4,Object(A.c)(l()(e.patientInfo,{data:e.fishData,comments:e.fishDataComments,whatUser:e.user}));case 4:a.sent;case 6:case"end":return a.stop()}},a,e)}))()},generalReject:function(){var e=this;return v()(c.a.mark(function a(){return c.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$refs.thatForm.notVerifying();case 2:return a.next=4,t=l()(e.patientInfo,{data:e.fishData,comments:e.fishDataComments}),m.a.post(f+"/formdata/reject",t);case 4:a.sent&&e.generalBack();case 7:case"end":return a.stop()}var t},a,e)}))()},generalPass:function(){var e=this;return v()(c.a.mark(function a(){return c.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$refs.thatForm.consoleData();case 2:return a.next=4,t=l()(e.patientInfo,{data:e.fishData},{whatUser:e.user}),m.a.post(f+"/formdata/pass/"+t.whatUser.id+"/"+t.whatUser.name,t);case 4:a.sent&&e.generalBack();case 7:case"end":return a.stop()}var t},a,e)}))()},createEvaluate:function(e){this.$set(this.fishDataComments,this.navArr[this.activeIndex].id,{}),this.$set(this.fishDataComments,this.navArr[this.activeIndex].id,e)},notVerifying:function(e,a,t,n,r,i,l,s){this.fishData[this.navArr[this.activeIndex].id]=a,this.fishDataComments[this.navArr[this.activeIndex].id]=l},consoleData:function(e,a,t,n,r,i,l,s){this.fishData[this.navArr[this.activeIndex].id]=a},generalBack:function(){this.$router.go(-1)}}},T={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"formAll"},[t("div",{staticClass:"formContent"},[t("div",{staticClass:"formTopContent"},[t("el-menu",{staticClass:"formTopLeft",attrs:{"default-active":e.activeIndexNav,mode:"horizontal"},on:{select:e.handleSelect}},[t("el-menu-item",{attrs:{index:e.activeIndexNav}},[e._v(e._s(e.activeIndexNav))])],1),e._v(" "),t("div",{staticClass:"formTopRight"},[e._v("\n        患者: "),t("span",{staticStyle:{color:"#117FD1",opacity:"0.9"}},[e._v(e._s(e.patientInfo.patientName))]),e._v("\n         ("+e._s("男"===e.patientInfo.gender|"1"===e.patientInfo.gender?"男":"女"===e.patientInfo.gender|"0"===e.patientInfo.gender?"女":"无")+")    \n        住院号: "+e._s(e.patientInfo.patientId)+"\n      ")])],1),e._v(" "),Boolean(e.navArr[e.activeIndex])?t("div",{staticClass:"formContentContent"},[t("sx-no-route-control",{attrs:{comments:e.fishDataComments,navArr:e.navArr,activeIndex:e.activeIndex},on:{emitClick:e.emitClick}}),e._v(" "),t("div",{staticStyle:{width:"100%"}},[t("div",{staticClass:"rightContentControl"},[t("div",{staticClass:"rightContentControlName"},[e.navArr[e.activeIndex].name.length<14?t("div",[e._v("\n              "+e._s(e.navArr[e.activeIndex]?e.navArr[e.activeIndex].name:"")+"\n            ")]):t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top",content:e.navArr[e.activeIndex]?e.navArr[e.activeIndex].name:""}},[t("div",{staticStyle:{"font-weight":"bold",width:"210px","white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis"}},[e._v("\n                "+e._s(e.navArr[e.activeIndex]?e.navArr[e.activeIndex].name:"")+"\n              ")])]),e._v(" "),t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top",content:e.navArr[e.activeIndex]?e.navArr[e.activeIndex].description:""}},[t("div",{staticStyle:{"font-size":"13px","font-weight":"400",width:"180px","white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis"}},[e._v("\n                "+e._s(e.navArr[e.activeIndex]?e.navArr[e.activeIndex].description:"")+"\n              ")])])],1),e._v(" "),t("div",{staticClass:"rightContentControlBtn"},[t("el-popover",{attrs:{placement:"bottom",width:"400",trigger:"hover"}},[t("el-button",{staticStyle:{color:"#878A8D"},attrs:{slot:"reference",disabled:e.activeIndexNav!=e.patientInfo.phase},slot:"reference"},[t("i",{staticClass:"ercp-icon-general-opinion"}),e._v(" \n                备注 \n              ")]),e._v(" "),e._l(e.fishDataComments[e.navArr[e.activeIndex].id],function(a,n,r){return t("div",{key:r,staticStyle:{display:"flex","justify-content":"space-between","min-height":"25px","align-items":"center","white-space":"normal","word-break":"break-all","word-wrap":"break-word"}},[e._v("\n              【"+e._s(a.label)+"】 "+e._s(a.type)+" "+e._s(a.otherType)+"\n              "),t("i",{staticClass:"ercp-icon-general-delete",on:{click:function(t){e.opinionDelete(a)}}})])})],2),e._v(" "),t("el-button",{staticStyle:{color:"#FF455B"},attrs:{disabled:e.activeIndexNav!=e.patientInfo.phase},on:{click:e.generalReject}},[t("i",{staticClass:"ercp-icon-general-fail"}),e._v(" \n              驳回")]),e._v(" "),t("el-button",{attrs:{type:"success",disabled:e.activeIndexNav!=e.patientInfo.phase},on:{click:e.generalPass}},[t("i",{staticClass:"ercp-icon-general-pass"}),e._v(" \n              通过")]),e._v(" "),t("el-button",{staticStyle:{color:"#117FD1"},attrs:{disabled:e.activeIndexNav!=e.patientInfo.phase},on:{click:e.generalSave}},[t("i",{staticClass:"ercp-icon-general-save"}),e._v(" \n              保存")])],1)]),e._v(" "),t("div",{staticClass:"formContentRight"},[t("div",{staticClass:"rightContent"},[e.navArr[e.activeIndex]&&e.navArr[e.activeIndex].isStatic?e._e():t("div",{staticClass:"rightContentDynamic"},[e.smf?t("sx-min-form",{ref:"thatForm",attrs:{disabled:"",isSh:"",closeRules:"",mozhu:e.navArr[e.activeIndex],mozhuComments:e.fishDataComments[e.navArr[e.activeIndex].id]},on:{createEvaluate:e.createEvaluate,notVerifying:e.notVerifying,consoleData:e.consoleData},model:{value:e.fishData[e.navArr[e.activeIndex].id],callback:function(a){e.$set(e.fishData,e.navArr[e.activeIndex].id,a)},expression:"fishData[navArr[activeIndex].id]"}}):e._e()],1),e._v(" "),t("div",{staticClass:"rightContentStatic"},["鼻胆/胰管造影"===e.navArr[e.activeIndex].name?t("sx-radiography",{ref:"zyModel",model:{value:e.fishData[e.navArr[e.activeIndex].id],callback:function(a){e.$set(e.fishData,e.navArr[e.activeIndex].id,a)},expression:"fishData[navArr[activeIndex].id]"}}):e._e()],1)])])])],1):e._e(),e._v(" "),Boolean(e.navArr[e.activeIndex])?e._e():t("div",{staticStyle:{"text-align":"center",padding:"150px"}},[e._v("\n      暂无数据\n    ")])])])},staticRenderFns:[]};var h=t("VU/8")(g,T,!1,function(e){t("pdXi")},"data-v-12791f04",null);a.default=h.exports},pdXi:function(e,a){}});