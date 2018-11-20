webpackJsonp([24],{"4mOL":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("woOf"),r=a.n(n),i=a("BO1k"),s=a.n(i),l=a("Gu7T"),c=a.n(l),o=a("Xxa5"),v=a.n(o),u=a("exGp"),d=a.n(u),f=a("xelw"),p=a("ho+3"),h=a("zv30"),x=a("DzDz"),A=a("mSAz"),m=a("gyMJ"),I=a("sICn").proxyTableApi.api,b={name:"rules_index",components:{sxNoRouteControl:f.a,sxOperationReport:p.a,sxRadiography:h.a},data:function(){return{navArr:[],showAllForms:[],subNavData:[],fishData:{},fishAllData:[],allFish:{relation:{pattern:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","TEXTAREA"]},message:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","TEXTAREA"]},example:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","TEXTAREA"]},required:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","SELECT","SELECTMUTIPLE","DATE","DATETIME","RADIO","TEXTAREA","CHECKBOX","CASCADER"]},tree:{target:"type",rule_type:"EQUAL",value:"CASCADER"},layerTree:{target:"type",rule_type:"EQUAL",value:["SELECT","SELECTMUTIPLE","RADIO","CHECKBOX"]},radioAgain:{target:"type",rule_type:"EQUAL",value:"RADIO"},createCalculate:{target:"type",rule_type:"EQUAL",value:"CREATECALCULATE"},createTable:{target:"type",rule_type:"EQUAL",value:"CREATETABLE"}},fields:[{id:"type",label:"请选择类型",value:"",type:"RADIO",values:[{label:"输入框",value:"INPUT"},{label:"整数类型输入框",value:"INT"},{label:"浮点数类型输入框",value:"DOUBLE"},{label:"文本标签",value:"TEXTAREA"},{label:"选择器",value:"SELECT"},{label:"多选选择器",value:"SELECTMUTIPLE"},{label:"日期选择器",value:"DATE"},{label:"日期时间选择器",value:"DATETIME"},{label:"单选框",value:"RADIO"},{label:"多选框",value:"CHECKBOX"},{label:"级联选择器",value:"CASCADER"},{label:"创建表格",value:"CREATETABLE"},{label:"计算",value:"CREATECALCULATE"}],validations:[{required:!0,message:"请选择类型",trigger:"change"}]},{id:"id",label:"ID",value:"",type:"INPUT",validations:[{required:!0,message:"请输入组件ID",trigger:"change"},{pattern:"^[a-zA-Z][a-zA-Z0-9]+$",message:"只能输入以英文字母开头的英文或数字(两位以上)",trigger:"change"}]},{id:"label",label:"标签名字",value:"",type:"INPUT",validations:[{required:!0,message:"请输入组件标签名",trigger:"change"},{pattern:"^[^\\s~！@#￥%……&*（）——+~!@#$%^&*()_+]*$",message:"不能输入空格或特殊字符",trigger:"change"}]},{id:"pattern",label:"正则",type:"INPUT"},{id:"message",label:"正则提示信息",type:"INPUT",rules:{id:"type",rule_type:"EQUAL",value:"INPUT"}},{id:"example",label:"正则例子",type:"EXAMPLE"},{id:"tree",label:"创建级联",type:"TREE",values:[]},{id:"layerTree",label:"创建选项",type:"LAYERTREE",values:[]},{id:"required",label:"是否必填",value:"",type:"RADIO",values:[{label:"是",value:1},{label:"否",value:0}]},{id:"createCalculate",label:"ID公式",value:"",type:"CREATECALCULATE",validations:[{required:!0,message:"请输入需要计算的 ID 公式,如 (id1+id2)",trigger:"blur"}]},{id:"createTable",label:"创建表格",type:"CREATETABLE",values:[]}]},activeIndexNav:"住院基本情况",activeIndexId:"",activeIndex:0,patientInfo:{},ssbgModel:{operationCheckBox:[],operationSelect:[],operationSelectMz:[],operationSelectJc:[],operationSelectHj:[],operationDateTime:""},smf:!1}},created:function(){var e=this;return d()(v.a.mark(function t(){return v.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.$route.params.data&&(e.patientInfo=JSON.parse(e.$route.params.data),e.subNavData=e.patientInfo.information.data,e.activeIndexNav=e.patientInfo.activeIndexNav?e.patientInfo.activeIndexNav:"住院基本情况"),t.next=3,e.firstShow();case 3:return t.next=5,e.init();case 5:e.show();case 6:case"end":return t.stop()}},t,e)}))()},methods:{firstShow:function(){var e=this;return d()(v.a.mark(function t(){var a;return v.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(x.c)();case 2:(a=t.sent)&&(e.showAllForms=a.data.entity);case 4:case"end":return t.stop()}},t,e)}))()},show:function(){var e=this;return d()(v.a.mark(function t(){var a,n,r,i,l,o,u,d;return v.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v=e.patientInfo.id,m.a.get(I+"/formdata/record/"+v);case 2:if(!(a=t.sent)){t.next=25;break}for(e.fishAllData=a.data.entity?[].concat(c()(a.data.entity.forms)):[],n=e.gainId(e.subNavData,e.activeIndexNav),r=!0,i=!1,l=void 0,t.prev=9,o=s()(e.fishAllData);!(r=(u=o.next()).done);r=!0)d=u.value,n===d.id&&(e.fishData=d.data);t.next=17;break;case 13:t.prev=13,t.t0=t.catch(9),i=!0,l=t.t0;case 17:t.prev=17,t.prev=18,!r&&o.return&&o.return();case 20:if(t.prev=20,!i){t.next=23;break}throw l;case 23:return t.finish(20);case 24:return t.finish(17);case 25:case"end":return t.stop()}var v},t,e,[[9,13,17,25],[18,,20,24]])}))()},init:function(){var e=this;return d()(v.a.mark(function t(){var a,n,r,i,l,c,o;return v.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.navArr=[],a=[],n=!0,r=!1,i=void 0,t.prev=5,l=s()(e.showAllForms);case 7:if(n=(c=l.next()).done){t.next=15;break}if(o=c.value,!e.activeIndexNav.includes(o.phase)){t.next=12;break}return t.next=12,a.push(o);case 12:n=!0,t.next=7;break;case 15:t.next=21;break;case 17:t.prev=17,t.t0=t.catch(5),r=!0,i=t.t0;case 21:t.prev=21,t.prev=22,!n&&l.return&&l.return();case 24:if(t.prev=24,!r){t.next=27;break}throw i;case 27:return t.finish(24);case 28:return t.finish(21);case 29:e.navArr=[].concat(a),e.smf=!0;case 31:case"end":return t.stop()}},t,e,[[5,17,21,29],[22,,24,28]])}))()},emitClick:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return d()(v.a.mark(function a(){return v.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:e.smf=!1,e.activeIndex=t.index,setTimeout(function(t){e.smf=!0},1);case 3:case"end":return a.stop()}},a,e)}))()},gainId:function(e,t){for(var a in e){if(e[a].label===t)return e[a].id;if(e[a].submenu.length&&this.gainId(e[a].submenu,t))return this.gainId(e[a].submenu,t)}},handleSelect:function(e,t){var a=this;return d()(v.a.mark(function t(){var n,r,i,l,c,o,u;return v.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:for(a.smf=!1,a.activeIndexNav=e,a.activeIndex=0,n=a.gainId(a.subNavData,e),r=!0,i=!1,l=void 0,t.prev=7,c=s()(a.fishAllData);!(r=(o=c.next()).done);r=!0)u=o.value,n===u.id&&(a.fishData=u.data);t.next=15;break;case 11:t.prev=11,t.t0=t.catch(7),i=!0,l=t.t0;case 15:t.prev=15,t.prev=16,!r&&c.return&&c.return();case 18:if(t.prev=18,!i){t.next=21;break}throw l;case 21:return t.finish(18);case 22:return t.finish(15);case 23:setTimeout(function(e){a.init()},1);case 24:case"end":return t.stop()}},t,a,[[7,11,15,23],[16,,18,22]])}))()},generalSubmit:function(){var e=this;return d()(v.a.mark(function t(){return v.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.$refs.thatForm.consoleData(),t.next=6,Object(A.d)(r()(e.patientInfo,{data:e.fishData}));case 6:t.sent&&e.generalBack();case 9:case"end":return t.stop()}},t,e)}))()},generalDelete:function(){},generalSave:function(){var e=this;return d()(v.a.mark(function t(){return v.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.$refs.thatForm.notVerifying(),t.next=3,Object(A.c)(r()(e.patientInfo,{data:e.fishData}));case 3:t.sent&&e.activeIndex<=e.navArr.length-1&&e.activeIndex++;case 5:case"end":return t.stop()}},t,e)}))()},notVerifying:function(e,t,a,n,r,i,s,l){var c=this;return d()(v.a.mark(function e(){return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:c.$set(c.fishData,c.navArr[c.activeIndex].id,t);case 1:case"end":return e.stop()}},e,c)}))()},consoleData:function(e,t,a,n,r,i,s,l){var c=this;return d()(v.a.mark(function e(){return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:c.$set(c.fishData,c.navArr[c.activeIndex].id,t);case 1:case"end":return e.stop()}},e,c)}))()},generalBack:function(){this.$router.go(-1)}}},E={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"formAll"},[a("div",{staticClass:"formContent"},[a("div",{staticClass:"formTopContent"},[a("el-menu",{staticClass:"formTopLeft",attrs:{"default-active":e.activeIndexNav,mode:"horizontal"},on:{select:e.handleSelect}},[e._l(e.subNavData,function(t,n){return[t.submenu.length?a("el-submenu",{key:n,attrs:{index:t.label,"show-timeout":100}},[a("template",{slot:"title"},[e._v(e._s(t.label))]),e._v(" "),e._l(t.submenu,function(t,n){return t.submenu.length?a("el-menu-item",{key:n,attrs:{index:t.label}},[a("el-submenu",{attrs:{index:t.label}},[a("template",{slot:"title"},[e._v(e._s(t.label))]),e._v(" "),e._l(t.submenu,function(t,n){return a("el-menu-item",{key:n,attrs:{index:t.label}},[e._v(e._s(t.label))])})],2)],1):a("el-menu-item",{attrs:{index:t.label}},[e._v(e._s(t.label))])})],2):a("el-menu-item",{key:n+111,attrs:{index:t.label}},[e._v(e._s(t.label))])]})],2),e._v(" "),a("div",{staticClass:"formTopRight"},[e._v("\n        患者: "),a("span",{staticStyle:{color:"#117FD1",opacity:"0.9"}},[e._v(e._s(e.patientInfo.patientName))]),e._v("\n         ("+e._s("男"===e.patientInfo.gender|"1"===e.patientInfo.gender?"男":"女"===e.patientInfo.gender|"0"===e.patientInfo.gender?"女":"无")+")    \n        住院号："+e._s(e.patientInfo.patientId)+"\n      ")])],1),e._v(" "),Boolean(e.navArr[e.activeIndex])?a("div",{staticClass:"formContentContent"},[a("sx-no-route-control",{attrs:{navArr:e.navArr,activeIndex:e.activeIndex},on:{emitClick:e.emitClick}}),e._v(" "),a("div",{staticStyle:{width:"100%"}},[a("div",{staticClass:"rightContentControl"},[a("div",{staticClass:"rightContentControlName"},[e.navArr[e.activeIndex].name.length<14?a("div",[e._v("\n              "+e._s(e.navArr[e.activeIndex]?e.navArr[e.activeIndex].name:"")+"\n            ")]):a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top",content:e.navArr[e.activeIndex]?e.navArr[e.activeIndex].name:""}},[a("div",{staticStyle:{"font-weight":"bold",width:"210px","white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis"}},[e._v("\n                "+e._s(e.navArr[e.activeIndex]?e.navArr[e.activeIndex].name:"")+"\n              ")])])],1),e._v(" "),a("div",{staticClass:"rightContentControlBtn"})]),e._v(" "),a("div",{staticClass:"formContentRight"},[a("div",{staticClass:"rightContent"},[e.navArr[e.activeIndex]&&e.navArr[e.activeIndex].isStatic?e._e():a("div",{staticClass:"rightContentDynamic"},[e.smf?a("sx-min-form",{ref:"thatForm",attrs:{closeRules:"",disabled:"",mozhu:e.navArr[e.activeIndex]},on:{notVerifying:e.notVerifying,consoleData:e.consoleData},model:{value:e.fishData[e.navArr[e.activeIndex].id],callback:function(t){e.$set(e.fishData,e.navArr[e.activeIndex].id,t)},expression:"fishData[navArr[activeIndex].id]"}}):e._e()],1),e._v(" "),"isStatic"in e.navArr[e.activeIndex]&&e.navArr[e.activeIndex].isStatic?a("div",{staticClass:"rightContentStatic"},[e.smf&&"手术报告"===e.navArr[e.activeIndex].name?a("sx-operation-report",{ref:"ssbgModel",attrs:{fishAllData:e.fishAllData,activeIndexNav:e.activeIndexNav,fishData:e.fishData,mozhu:e.navArr},model:{value:e.fishData[e.navArr[e.activeIndex].id],callback:function(t){e.$set(e.fishData,e.navArr[e.activeIndex].id,t)},expression:"fishData[navArr[activeIndex].id]"}}):e._e(),e._v(" "),e.smf&&"鼻胆/胰管造影"===e.navArr[e.activeIndex].name?a("sx-radiography",{ref:"zyModel",model:{value:e.fishData[e.navArr[e.activeIndex].id],callback:function(t){e.$set(e.fishData,e.navArr[e.activeIndex].id,t)},expression:"fishData[navArr[activeIndex].id]"}}):e._e()],1):e._e()])])])],1):e._e(),e._v(" "),Boolean(e.navArr[e.activeIndex])?e._e():a("div",{staticStyle:{"text-align":"center",padding:"150px"}},[e._v("\n      暂无数据\n    ")])])])},staticRenderFns:[]};var g=a("VU/8")(b,E,!1,function(e){a("pm47")},"data-v-2674b757",null);t.default=g.exports},pm47:function(e,t){}});