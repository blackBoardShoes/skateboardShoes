webpackJsonp([15],{"/Ksr":function(e,t){},n0Rb:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Gu7T"),r=a.n(n),i=a("BO1k"),s=a.n(i),o=a("woOf"),l=a.n(o),c=a("Xxa5"),u=a.n(c),d=a("exGp"),v=a.n(d),f=a("NYxO"),p=a("xelw"),m=a("ho+3"),x=a("zv30"),h=a("DzDz"),b=a("mSAz"),g=a("cipx"),A={name:"rules_index",components:{sxNoRouteControl:p.a,sxOperationReport:m.a,sxRadiography:x.a},data:function(){return{question:{},navArr:[],showAllForms:[],allArr:{},fishData:{},allFish:{relation:{pattern:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","TEXTAREA"]},message:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","TEXTAREA"]},example:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","TEXTAREA"]},required:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","SELECT","SELECTMUTIPLE","DATE","DATETIME","RADIO","TEXTAREA","CHECKBOX","CASCADER"]},tree:{target:"type",rule_type:"EQUAL",value:"CASCADER"},layerTree:{target:"type",rule_type:"EQUAL",value:["SELECT","SELECTMUTIPLE","RADIO","CHECKBOX"]},radioAgain:{target:"type",rule_type:"EQUAL",value:"RADIO"},createCalculate:{target:"type",rule_type:"EQUAL",value:"CREATECALCULATE"},createTable:{target:"type",rule_type:"EQUAL",value:"CREATETABLE"}},fields:[{id:"type",label:"请选择类型",value:"",type:"RADIO",values:[{label:"输入框",value:"INPUT"},{label:"整数类型输入框",value:"INT"},{label:"浮点数类型输入框",value:"DOUBLE"},{label:"文本标签",value:"TEXTAREA"},{label:"选择器",value:"SELECT"},{label:"多选选择器",value:"SELECTMUTIPLE"},{label:"日期选择器",value:"DATE"},{label:"日期时间选择器",value:"DATETIME"},{label:"单选框",value:"RADIO"},{label:"多选框",value:"CHECKBOX"},{label:"级联选择器",value:"CASCADER"},{label:"创建表格",value:"CREATETABLE"},{label:"计算",value:"CREATECALCULATE"}],validations:[{required:!0,message:"请选择类型",trigger:"change"}]},{id:"id",label:"ID",value:"",type:"INPUT",validations:[{required:!0,message:"请输入组件ID",trigger:"change"},{pattern:"^[a-zA-Z][a-zA-Z0-9]+$",message:"只能输入以英文字母开头的英文或数字(两位以上)",trigger:"change"}]},{id:"label",label:"标签名字",value:"",type:"INPUT",validations:[{required:!0,message:"请输入组件标签名",trigger:"change"},{pattern:"^[^\\s~！@#￥%……&*（）——+~!@#$%^&*()_+]*$",message:"不能输入空格或特殊字符",trigger:"change"}]},{id:"pattern",label:"正则",type:"INPUT"},{id:"message",label:"正则提示信息",type:"INPUT",rules:{id:"type",rule_type:"EQUAL",value:"INPUT"}},{id:"example",label:"正则例子",type:"EXAMPLE"},{id:"tree",label:"创建级联",type:"TREE",values:[]},{id:"layerTree",label:"创建选项",type:"LAYERTREE",values:[]},{id:"required",label:"是否必填",value:"",type:"RADIO",values:[{label:"是",value:1},{label:"否",value:0}]},{id:"createCalculate",label:"ID公式",value:"",type:"CREATECALCULATE",validations:[{required:!0,message:"请输入需要计算的 ID 公式,如 (id1+id2)",trigger:"blur"}]},{id:"createTable",label:"创建表格",type:"CREATETABLE",values:[]}]},activeIndexNav:"住院基本情况",activeIndex:0,patientInfo:{},ssbgModel:{operationCheckBox:[],operationSelect:[],operationSelectMz:[],operationSelectJc:[],operationSelectHj:[],operationDateTime:""},smf:!1,undoneFilledFormDialogVisible:!1,undoneFilledFormData:{},undoneFilledFormDataMozhu:{"科研护士":{fields:[{id:"responseName",label:"记录者",values:[],type:"SELECT",validations:[{required:!0,message:"请选择记录者",trigger:"change"}]}]},"诊疗中心":{fields:[{id:"responseName",label:"记录者",values:[],type:"SELECT",validations:[{required:!0,message:"请选择记录者",trigger:"change"}]}]}},ubmtData:[],notVerifyingTF:!1,consoleDataTF:!1}},computed:Object(f.b)({user:function(e){return e.user}}),created:function(){var e=this;return v()(u.a.mark(function t(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.$route.params.data&&(e.patientInfo=JSON.parse(e.$route.params.data),e.activeIndexNav=e.patientInfo.phase),t.next=4,e.firstShow();case 4:return t.next=6,e.init();case 6:e.show();case 7:case"end":return t.stop()}},t,e)}))()},methods:{firstShow:function(){var e=this;return v()(u.a.mark(function t(){var a,n,r;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(g.b)();case 2:if(a=t.sent)for(n in a.data.entity)a.data.entity[n].emerge&&(e.question[n]=a.data.entity[n]);return t.next=6,Object(h.c)();case 6:(r=t.sent)&&(e.showAllForms=r.data.entity);case 8:case"end":return t.stop()}},t,e)}))()},show:function(){var e=this;return v()(u.a.mark(function t(){var a;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(b.a)(e.patientInfo.id);case 2:(a=t.sent)&&(e.fishData=a.data.entity?l()({},a.data.entity.data):{});case 5:case"end":return t.stop()}},t,e)}))()},init:function(){var e=this;return v()(u.a.mark(function t(){var a,n,r,i,o,l,c;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.navArr=[],a=[],n=!0,r=!1,i=void 0,t.prev=5,o=s()(e.showAllForms);case 7:if(n=(l=o.next()).done){t.next=15;break}if((c=l.value).phase!==e.activeIndexNav){t.next=12;break}return t.next=12,a.push(c);case 12:n=!0,t.next=7;break;case 15:t.next=21;break;case 17:t.prev=17,t.t0=t.catch(5),r=!0,i=t.t0;case 21:t.prev=21,t.prev=22,!n&&o.return&&o.return();case 24:if(t.prev=24,!r){t.next=27;break}throw i;case 27:return t.finish(24);case 28:return t.finish(21);case 29:e.navArr=[].concat(a),e.smf=!0;case 32:case"end":return t.stop()}},t,e,[[5,17,21,29],[22,,24,28]])}))()},navArrAssignment:function(){var e=this,t=function t(a){for(var n in a){if(a[n].value===e.activeIndexNav)return a[n];if("submenu"in a[n]&&t(a[n].submenu))return t(a[n].submenu)}}(this.allArr);this.navArr=t?t.subFields:[]},emitClick:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return v()(u.a.mark(function a(){return u.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:e.smf=!1,e.activeIndex=t.index,setTimeout(function(t){e.smf=!0},1);case 4:case"end":return a.stop()}},a,e)}))()},handleSelect:function(e,t){var a=this;return v()(u.a.mark(function t(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:a.smf=!1,a.activeIndexNav=e,a.activeIndex=0,setTimeout(function(e){a.init()},1);case 4:case"end":return t.stop()}},t,a)}))()},generalSubmit:function(){var e=this;return v()(u.a.mark(function t(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.undoneFilledFormData={},"科研护士"!==e.user.type){t.next=8;break}return t.next=4,Object(b.e)();case 4:e.ubmtData=t.sent,e.undoneFilledFormDataMozhu["科研护士"].fields[0].values=[].concat(r()(e.ubmtData.data.entity)),t.next=13;break;case 8:return t.next=10,Object(b.e)();case 10:e.ubmtData=t.sent,e.undoneFilledFormDataMozhu["科研护士"].fields[1].values=[].concat(r()(e.ubmtData.data.entity));case 13:e.undoneFilledFormDialogVisible=!0;case 14:case"end":return t.stop()}},t,e)}))()},generalDelete:function(){this.navArr[this.activeIndex].isStatic?(this.$refs.ssbgModel&&this.$refs.ssbgModel.clearData(),this.$refs.zyModel&&this.$refs.zyModel.clearData()):this.$refs.thatForm.clearData()},generalSave:function(){var e=this;return v()(u.a.mark(function t(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.navArr[e.activeIndex].isStatic){t.next=5;break}return t.next=3,e.$refs.thatForm.notVerifying();case 3:t.next=13;break;case 5:if(!e.$refs.zyModel){t.next=8;break}return t.next=8,e.$refs.zyModel.saveData();case 8:if(!e.$refs.ssbgModel){t.next=11;break}return t.next=11,e.$refs.ssbgModel.consoleData();case 11:e.notVerifyingTF=!0;case 13:if(!e.notVerifyingTF){t.next=20;break}return t.next=17,Object(b.c)(l()(e.patientInfo,{data:e.fishData},{whatUser:e.user}));case 17:t.sent&&e.activeIndex<e.navArr.length-1&&(e.smf=!1,e.activeIndex++,setTimeout(function(t){e.smf=!0},1)),e.notVerifyingTF=!1;case 20:case"end":return t.stop()}},t,e)}))()},notVerifying:function(e,t,a,n,r,i,s,o){var l=this;return v()(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:l.$set(l.fishData,l.navArr[l.activeIndex].id,t),l.notVerifyingTF=!0;case 2:case"end":return e.stop()}},e,l)}))()},consoleData:function(e,t,a,n,r,i,s,o){var l=this;return v()(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:l.$set(l.fishData,l.navArr[l.activeIndex].id,t),l.consoleDataTF=!0;case 2:case"end":return e.stop()}},e,l)}))()},undoneFilledFormConsoleData:function(e,t,a,n,r,i,o,c){var d=this;return v()(u.a.mark(function e(){var a,n,r,i,o,c,v,f,p,m,x,h;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(d.navArr[d.activeIndex].isStatic){e.next=6;break}return e.next=4,d.$refs.thatForm.consoleData();case 4:e.next=14;break;case 6:if(!d.$refs.zyModel){e.next=9;break}return e.next=9,d.$refs.zyModel.saveData();case 9:if(!d.$refs.ssbgModel){e.next=12;break}return e.next=12,d.$refs.ssbgModel.consoleData();case 12:d.consoleDataTF=!0;case 14:if(!d.consoleDataTF){e.next=62;break}if("科研护士"!==d.user.type){e.next=37;break}for(a=!0,n=!1,r=void 0,e.prev=19,i=s()(d.ubmtData.data.entity);!(a=(o=i.next()).done);a=!0)(c=o.value).value===t.responseName&&(d.patientInfo.header=l()(d.patientInfo.header,{responseId:c.uuid,responseName:c.label}));e.next=27;break;case 23:e.prev=23,e.t0=e.catch(19),n=!0,r=e.t0;case 27:e.prev=27,e.prev=28,!a&&i.return&&i.return();case 30:if(e.prev=30,!n){e.next=33;break}throw r;case 33:return e.finish(30);case 34:return e.finish(27);case 35:e.next=56;break;case 37:for(v=!0,f=!1,p=void 0,e.prev=40,m=s()(d.ubmtData.data.entity);!(v=(x=m.next()).done);v=!0)(h=x.value).value===t.responseName&&(d.patientInfo.header=l()(d.patientInfo.header,{responseId:h.uuid,responseName:h.label}));e.next=48;break;case 44:e.prev=44,e.t1=e.catch(40),f=!0,p=e.t1;case 48:e.prev=48,e.prev=49,!v&&m.return&&m.return();case 51:if(e.prev=51,!f){e.next=54;break}throw p;case 54:return e.finish(51);case 55:return e.finish(48);case 56:return e.next=58,Object(b.d)(l()(d.patientInfo,{data:d.fishData}));case 58:e.sent&&d.generalBack(),d.consoleDataTF=!1;case 62:case"end":return e.stop()}},e,d,[[19,23,27,35],[28,,30,34],[40,44,48,56],[49,,51,55]])}))()},generalBack:function(){this.$router.go(-1)}}},I={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"formAll"},[a("div",{staticClass:"formContent"},[a("div",{staticClass:"formTopContent"},[a("el-menu",{staticClass:"formTopLeft",attrs:{"default-active":e.activeIndexNav,mode:"horizontal"},on:{select:e.handleSelect}},[a("el-menu-item",{attrs:{index:e.activeIndexNav}},[e._v(e._s(e.activeIndexNav))])],1),e._v(" "),a("div",{staticClass:"formTopRight"},[e._v("\n        患者: "),a("span",{staticStyle:{color:"#117FD1",opacity:"0.9"}},[e._v(e._s(e.patientInfo.patientName))]),e._v("\n         ("+e._s("男"===e.patientInfo.gender|"1"===e.patientInfo.gender?"男":"女"===e.patientInfo.gender|"0"===e.patientInfo.gender?"女":"无")+")    \n        住院号: "+e._s(e.patientInfo.patientId)+"\n      ")])],1),e._v(" "),Boolean(e.navArr[e.activeIndex])?a("div",{staticClass:"formContentContent"},[a("sx-no-route-control",{attrs:{navArr:e.navArr,activeIndex:e.activeIndex},on:{emitClick:e.emitClick}}),e._v(" "),a("div",{staticStyle:{width:"100%"}},[a("div",{staticClass:"rightContentControl"},[a("div",{staticClass:"rightContentControlName"},[e.navArr[e.activeIndex].name.length<14?a("div",[e._v("\n              "+e._s(e.navArr[e.activeIndex]?e.navArr[e.activeIndex].name:"")+"  \n            ")]):a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top",content:e.navArr[e.activeIndex]?e.navArr[e.activeIndex].name:""}},[a("div",{staticStyle:{"font-weight":"bold",width:"210px","white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis"}},[e._v("\n                "+e._s(e.navArr[e.activeIndex]?e.navArr[e.activeIndex].name:"")+"\n              ")])])],1),e._v(" "),a("div",{staticClass:"rightContentControlBtn"},[e.navArr.length-1===e.activeIndex?a("el-button",{attrs:{disabled:e.activeIndexNav!=e.patientInfo.phase},on:{click:e.generalSubmit}},[a("i",{staticClass:"ercp-icon-general-submit"}),e._v(" \n              阶段提交")]):e._e(),e._v(" "),a("el-button",{staticStyle:{color:"#FF455B"},attrs:{disabled:e.activeIndexNav!=e.patientInfo.phase},on:{click:e.generalDelete}},[a("i",{staticClass:"ercp-icon-general-delete"}),e._v(" \n              删除")]),e._v(" "),a("el-button",{attrs:{disabled:e.activeIndexNav!=e.patientInfo.phase},on:{click:e.generalSave}},[a("i",{staticClass:"ercp-icon-general-save"}),e._v(" \n              保存")])],1)]),e._v(" "),a("div",{staticClass:"formContentRight"},[a("div",{staticClass:"rightContent"},[e.navArr[e.activeIndex].isStatic?a("div",{staticClass:"rightContentStatic"},[e.smf&&"手术报告"===e.navArr[e.activeIndex].name?a("sx-operation-report",{ref:"ssbgModel",attrs:{fishData:e.fishData,mozhu:e.navArr},model:{value:e.fishData[e.navArr[e.activeIndex].id],callback:function(t){e.$set(e.fishData,e.navArr[e.activeIndex].id,t)},expression:"fishData[navArr[activeIndex].id]"}}):e._e(),e._v(" "),e.smf&&"鼻胆/胰管造影"===e.navArr[e.activeIndex].name?a("sx-radiography",{ref:"zyModel",model:{value:e.fishData[e.navArr[e.activeIndex].id],callback:function(t){e.$set(e.fishData,e.navArr[e.activeIndex].id,t)},expression:"fishData[navArr[activeIndex].id]"}}):e._e()],1):a("div",{staticClass:"rightContentDynamic"},[e.smf?a("sx-min-form",{ref:"thatForm",attrs:{question:e.question,disabled:e.activeIndexNav!=e.patientInfo.phase,mozhu:e.navArr[e.activeIndex]},on:{notVerifying:e.notVerifying,consoleData:e.consoleData},model:{value:e.fishData[e.navArr[e.activeIndex].id],callback:function(t){e.$set(e.fishData,e.navArr[e.activeIndex].id,t)},expression:"fishData[navArr[activeIndex].id]"}}):e._e()],1)])])])],1):e._e(),e._v(" "),Boolean(e.navArr[e.activeIndex])?e._e():a("div",{staticStyle:{"text-align":"center",padding:"150px"}},[e._v("\n      暂无数据\n    ")])]),e._v(" "),e.undoneFilledFormDialogVisible?a("el-dialog",{attrs:{"append-to-body":"","modal-append-to-body":"","close-on-click-modal":!1,visible:e.undoneFilledFormDialogVisible},on:{"update:visible":function(t){e.undoneFilledFormDialogVisible=t}}},[a("sx-min-form",{attrs:{addNormal:"",submitTF:"",mozhu:e.undoneFilledFormDataMozhu[e.user.type]},on:{consoleData:e.undoneFilledFormConsoleData},model:{value:e.undoneFilledFormData,callback:function(t){e.undoneFilledFormData=t},expression:"undoneFilledFormData"}})],1):e._e()],1)},staticRenderFns:[]};var D=a("VU/8")(A,I,!1,function(e){a("/Ksr")},"data-v-b8ae7c24",null);t.default=D.exports}});