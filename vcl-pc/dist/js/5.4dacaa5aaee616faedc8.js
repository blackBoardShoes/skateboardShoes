webpackJsonp([5,23],{"4ru5":function(e,t){},EDN0:function(e,t){},cipx:function(e,t,a){"use strict";a.d(t,"c",function(){return l}),a.d(t,"b",function(){return o}),a.d(t,"a",function(){return s}),a.d(t,"d",function(){return c}),a.d(t,"e",function(){return d});var n=a("gyMJ"),i=a("sICn").proxyTableApi.all,r={headers:{"Content-Type":"multipart/form-data"}},l=function(e){return n.a.get(i+"/termbase/getPageTermbases",{params:e})},o=function(e){return n.a.get(i+"/termbase/getAllTermbases")},s=function(e){return n.a.post(i+"/termbase/addTermbase",e,r)},c=function(e){return n.a.delete(i+"/termbase/removeTermbase",{params:e})},d=function(e){return n.a.put(i+"/termbase/updateTermbase",e)};n.a.CancelToken},n0Rb:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Gu7T"),i=a.n(n),r=a("BO1k"),l=a.n(r),o=a("woOf"),s=a.n(o),c=a("Xxa5"),d=a.n(c),u=a("exGp"),v=a.n(u),p=a("NYxO"),g=a("xelw"),h=a("ho+3"),m=a("zv30"),f=a("DzDz"),b=a("mSAz"),x=a("cipx"),y={name:"rules_index",components:{sxNoRouteControl:g.a,sxOperationReport:h.a,sxRadiography:m.default},data:function(){return{question:{},navArr:[],showAllForms:[],allArr:{},fishData:{},allFish:{relation:{pattern:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","TEXTAREA"]},message:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","TEXTAREA"]},example:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","TEXTAREA"]},required:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","SELECT","SELECTMUTIPLE","DATE","DATETIME","RADIO","TEXTAREA","CHECKBOX","CASCADER"]},tree:{target:"type",rule_type:"EQUAL",value:"CASCADER"},layerTree:{target:"type",rule_type:"EQUAL",value:["SELECT","SELECTMUTIPLE","RADIO","CHECKBOX"]},radioAgain:{target:"type",rule_type:"EQUAL",value:"RADIO"},createCalculate:{target:"type",rule_type:"EQUAL",value:"CREATECALCULATE"},createTable:{target:"type",rule_type:"EQUAL",value:"CREATETABLE"}},fields:[{id:"type",label:"请选择类型",value:"",type:"RADIO",values:[{label:"输入框",value:"INPUT"},{label:"整数类型输入框",value:"INT"},{label:"浮点数类型输入框",value:"DOUBLE"},{label:"文本标签",value:"TEXTAREA"},{label:"选择器",value:"SELECT"},{label:"多选选择器",value:"SELECTMUTIPLE"},{label:"日期选择器",value:"DATE"},{label:"日期时间选择器",value:"DATETIME"},{label:"单选框",value:"RADIO"},{label:"多选框",value:"CHECKBOX"},{label:"级联选择器",value:"CASCADER"},{label:"创建表格",value:"CREATETABLE"},{label:"计算",value:"CREATECALCULATE"}],validations:[{required:!0,message:"请选择类型",trigger:"change"}]},{id:"id",label:"ID",value:"",type:"INPUT",validations:[{required:!0,message:"请输入组件ID",trigger:"change"},{pattern:"^[a-zA-Z][a-zA-Z0-9]+$",message:"只能输入以英文字母开头的英文或数字(两位以上)",trigger:"change"}]},{id:"label",label:"标签名字",value:"",type:"INPUT",validations:[{required:!0,message:"请输入组件标签名",trigger:"change"},{pattern:"^[^\\s~！@#￥%……&*（）——+~!@#$%^&*()_+]*$",message:"不能输入空格或特殊字符",trigger:"change"}]},{id:"pattern",label:"正则",type:"INPUT"},{id:"message",label:"正则提示信息",type:"INPUT",rules:{id:"type",rule_type:"EQUAL",value:"INPUT"}},{id:"example",label:"正则例子",type:"EXAMPLE"},{id:"tree",label:"创建级联",type:"TREE",values:[]},{id:"layerTree",label:"创建选项",type:"LAYERTREE",values:[]},{id:"required",label:"是否必填",value:"",type:"RADIO",values:[{label:"是",value:1},{label:"否",value:0}]},{id:"createCalculate",label:"ID公式",value:"",type:"CREATECALCULATE",validations:[{required:!0,message:"请输入需要计算的 ID 公式,如 (id1+id2)",trigger:"blur"}]},{id:"createTable",label:"创建表格",type:"CREATETABLE",values:[]}]},activeIndexNav:"住院基本情况",activeIndex:0,patientInfo:{},ssbgModel:{operationCheckBox:[],operationSelect:[],operationSelectMz:[],operationSelectJc:[],operationSelectHj:[],operationDateTime:""},smf:!1,undoneFilledFormDialogVisible:!1,undoneFilledFormData:{},undoneFilledFormDataMozhu:{"科研护士":{fields:[{id:"responseName",label:"记录者",values:[{label:"123",value:"123"}],type:"SELECT",validations:[{required:!0,message:"请选择记录者",trigger:"change"}]}]},"诊疗中心":{fields:[{id:"responseName",label:"记录者",type:"INPUT",validations:[{required:!0,message:"请输入姓名",trigger:"change"}]}]}},ubmtData:[],notVerifyingTF:!1,consoleDataTF:!1}},computed:Object(p.b)({user:function(e){return e.user}}),created:function(){var e=this;return v()(d.a.mark(function t(){return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(e.user,"useruseruser"),e.$route.params.data&&(e.patientInfo=JSON.parse(e.$route.params.data),e.activeIndexNav=e.patientInfo.phase),t.next=4,e.firstShow();case 4:return t.next=6,e.init();case 6:e.show();case 7:case"end":return t.stop()}},t,e)}))()},methods:{firstShow:function(){var e=this;return v()(d.a.mark(function t(){var a,n,i;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(x.b)();case 2:if(a=t.sent){for(n in a.data.entity)a.data.entity[n].emerge&&(e.question[n]=a.data.entity[n]);console.log(e.question)}return t.next=6,Object(f.c)();case 6:(i=t.sent)&&(e.showAllForms=i.data.entity);case 8:case"end":return t.stop()}},t,e)}))()},show:function(){var e=this;return v()(d.a.mark(function t(){var a;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(b.a)(e.patientInfo.id);case 2:(a=t.sent)&&(e.fishData=a.data.entity?s()({},a.data.entity.data):{}),console.log(e.fishData,"firstShow");case 5:case"end":return t.stop()}},t,e)}))()},init:function(){var e=this;return v()(d.a.mark(function t(){var a,n,i,r,o,s,c;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.navArr=[],a=[],n=!0,i=!1,r=void 0,t.prev=5,o=l()(e.showAllForms);case 7:if(n=(s=o.next()).done){t.next=15;break}if((c=s.value).phase!==e.activeIndexNav){t.next=12;break}return t.next=12,a.push(c);case 12:n=!0,t.next=7;break;case 15:t.next=21;break;case 17:t.prev=17,t.t0=t.catch(5),i=!0,r=t.t0;case 21:t.prev=21,t.prev=22,!n&&o.return&&o.return();case 24:if(t.prev=24,!i){t.next=27;break}throw r;case 27:return t.finish(24);case 28:return t.finish(21);case 29:e.navArr=[].concat(a),e.smf=!0;case 31:case"end":return t.stop()}},t,e,[[5,17,21,29],[22,,24,28]])}))()},navArrAssignment:function(){var e=this,t=function t(a){for(var n in a){if(a[n].value===e.activeIndexNav)return a[n];if("submenu"in a[n]&&t(a[n].submenu))return t(a[n].submenu)}}(this.allArr);this.navArr=t?t.subFields:[]},emitClick:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return v()(d.a.mark(function a(){return d.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:e.smf=!1,e.activeIndex=t.index,console.log(e.activeIndex,"this.activeIndex"),setTimeout(function(t){e.smf=!0},1);case 4:case"end":return a.stop()}},a,e)}))()},handleSelect:function(e,t){var a=this;return v()(d.a.mark(function t(){return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:a.smf=!1,a.activeIndexNav=e,setTimeout(function(e){a.init()},1);case 3:case"end":return t.stop()}},t,a)}))()},generalSubmit:function(){var e=this;return v()(d.a.mark(function t(){return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log(e.navArr),console.log(e.activeIndex),console.log(e.activeIndexNav),e.undoneFilledFormData={},"科研护士"!==e.user.type){t.next=12;break}return t.next=7,Object(b.d)();case 7:e.ubmtData=t.sent,console.log(e.ubmtData.entity),e.undoneFilledFormDataMozhu["科研护士"].fields[0].values=[].concat(i()(e.ubmtData.data.entity)),t.next=13;break;case 12:console.log(e.patientInfo);case 13:console.log(e.user),console.log(e.patientInfo.header.responseId,e.patientInfo.header.responseName,"patientInfopatientInfo"),e.undoneFilledFormDialogVisible=!0;case 16:case"end":return t.stop()}},t,e)}))()},generalDelete:function(){this.$refs.thatForm.clearData()},generalSave:function(){var e=this;return v()(d.a.mark(function t(){return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.navArr[e.activeIndex].isStatic){t.next=5;break}return t.next=3,e.$refs.thatForm.notVerifying();case 3:t.next=6;break;case 5:console.log(e.fishData,"this.fishData");case 6:if(console.log("truetruetruetruetrue123123123"),!e.notVerifyingTF){t.next=14;break}return console.log("ccccccccccccccccccccccccc"),t.next=11,Object(b.b)(s()(e.patientInfo,{data:e.fishData},{whatUser:e.user}));case 11:t.sent&&e.activeIndex<e.navArr.length-1&&(e.smf=!1,e.activeIndex++,setTimeout(function(t){e.smf=!0},1)),e.notVerifyingTF=!1;case 14:case"end":return t.stop()}},t,e)}))()},notVerifying:function(e,t,a,n,i,r,l,o){var s=this;return v()(d.a.mark(function e(){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:s.$set(s.fishData,s.navArr[s.activeIndex].id,t),s.notVerifyingTF=!0;case 2:case"end":return e.stop()}},e,s)}))()},consoleData:function(e,t,a,n,i,r,l,o){var s=this;return v()(d.a.mark(function e(){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:s.$set(s.fishData,s.navArr[s.activeIndex].id,t),s.consoleDataTF=!0;case 2:case"end":return e.stop()}},e,s)}))()},undoneFilledFormConsoleData:function(e,t,a,n,i,r,o,c){var u=this;return v()(d.a.mark(function v(){var p,g,h,m,f,x,y;return d.a.wrap(function(d){for(;;)switch(d.prev=d.next){case 0:if(console.log(e,t,a,n,i,r,o,c),u.navArr[u.activeIndex].isStatic){d.next=6;break}return d.next=4,u.$refs.thatForm.consoleData();case 4:d.next=7;break;case 6:console.log(u.fishData,"this.fishData");case 7:if(!u.consoleDataTF){d.next=37;break}if("科研护士"!==u.user.type){d.next=30;break}for(p=!0,g=!1,h=void 0,d.prev=12,m=l()(u.ubmtData.data.entity);!(p=(f=m.next()).done);p=!0)(x=f.value).value===t.responseName&&(u.patientInfo.header=s()(u.patientInfo.header,{responseId:x.value,responseName:x.label}));d.next=20;break;case 16:d.prev=16,d.t0=d.catch(12),g=!0,h=d.t0;case 20:d.prev=20,d.prev=21,!p&&m.return&&m.return();case 23:if(d.prev=23,!g){d.next=26;break}throw h;case 26:return d.finish(23);case 27:return d.finish(20);case 28:d.next=31;break;case 30:u.patientInfo.header=s()(u.patientInfo.header,t,{responseId:u.user.username});case 31:return d.next=33,Object(b.c)(s()(u.patientInfo,{data:u.fishData}));case 33:y=d.sent,console.log(y),y&&u.generalBack(),u.consoleDataTF=!1;case 37:case"end":return d.stop()}},v,u,[[12,16,20,28],[21,,23,27]])}))()},generalBack:function(){this.$router.go(-1)}}},I={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"formAll"},[a("div",{staticClass:"formContent"},[a("div",{staticClass:"formTopContent"},[a("el-menu",{staticClass:"formTopLeft",attrs:{"default-active":e.activeIndexNav,mode:"horizontal"},on:{select:e.handleSelect}},[a("el-menu-item",{attrs:{index:e.activeIndexNav}},[e._v(e._s(e.activeIndexNav))])],1),e._v(" "),a("div",{staticClass:"formTopRight"},[e._v("\n        患者: "),a("span",{staticStyle:{color:"#117FD1",opacity:"0.9"}},[e._v(e._s(e.patientInfo.patientName))]),e._v(" ("+e._s(parseInt(e.patientInfo.gender)?"男":"女")+")    \n        住院号: "+e._s(e.patientInfo.patientId)+"\n      ")])],1),e._v(" "),Boolean(e.navArr[e.activeIndex])?a("div",{staticClass:"formContentContent"},[a("sx-no-route-control",{attrs:{navArr:e.navArr,activeIndex:e.activeIndex},on:{emitClick:e.emitClick}}),e._v(" "),a("div",{staticStyle:{width:"100%"}},[a("div",{staticClass:"rightContentControl"},[a("div",{staticClass:"rightContentControlName"},[e.navArr[e.activeIndex].name.length<14?a("div",[e._v("\n              "+e._s(e.navArr[e.activeIndex]?e.navArr[e.activeIndex].name:"")+"\n            ")]):a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top",content:e.navArr[e.activeIndex]?e.navArr[e.activeIndex].name:""}},[a("div",{staticStyle:{"font-weight":"bold",width:"210px","white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis"}},[e._v("\n                "+e._s(e.navArr[e.activeIndex]?e.navArr[e.activeIndex].name:"")+"\n              ")])]),e._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top",content:e.navArr[e.activeIndex]?e.navArr[e.activeIndex].description:""}},[a("div",{staticStyle:{"font-size":"13px","font-weight":"400",width:"180px","white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis"}},[e._v("\n                "+e._s(e.navArr[e.activeIndex]?e.navArr[e.activeIndex].description:"")+"\n              ")])])],1),e._v(" "),a("div",{staticClass:"rightContentControlBtn"},[e.navArr.length-1===e.activeIndex?a("el-button",{attrs:{disabled:e.activeIndexNav!=e.patientInfo.phase},on:{click:e.generalSubmit}},[a("i",{staticClass:"ercp-icon-general-submit"}),e._v(" \n              阶段提交")]):a("div",{staticStyle:{width:"120px"}}),e._v(" "),a("el-button",{staticStyle:{color:"#FF455B"},attrs:{disabled:e.activeIndexNav!=e.patientInfo.phase},on:{click:e.generalDelete}},[a("i",{staticClass:"ercp-icon-general-delete"}),e._v(" \n              删除")]),e._v(" "),a("el-button",{attrs:{disabled:e.activeIndexNav!=e.patientInfo.phase},on:{click:e.generalSave}},[a("i",{staticClass:"ercp-icon-general-save"}),e._v(" \n              保存")])],1)]),e._v(" "),a("div",{staticClass:"formContentRight"},[a("div",{staticClass:"rightContent"},[e.navArr[e.activeIndex].isStatic?a("div",{staticClass:"rightContentStatic"},["手术报告"===e.navArr[e.activeIndex].name?a("sx-operation-report",{ref:"ssbgModel",model:{value:e.fishData[e.navArr[e.activeIndex].id],callback:function(t){e.$set(e.fishData,e.navArr[e.activeIndex].id,t)},expression:"fishData[navArr[activeIndex].id]"}}):e._e(),e._v(" "),"造影"===e.navArr[e.activeIndex].name?a("sx-radiography",{model:{value:e.fishData[e.navArr[e.activeIndex].id],callback:function(t){e.$set(e.fishData,e.navArr[e.activeIndex].id,t)},expression:"fishData[navArr[activeIndex].id]"}}):e._e()],1):a("div",{staticClass:"rightContentDynamic"},[e.smf?a("sx-min-form",{ref:"thatForm",attrs:{question:e.question,disabled:e.activeIndexNav!=e.patientInfo.phase,mozhu:e.navArr[e.activeIndex]},on:{notVerifying:e.notVerifying,consoleData:e.consoleData},model:{value:e.fishData[e.navArr[e.activeIndex].id],callback:function(t){e.$set(e.fishData,e.navArr[e.activeIndex].id,t)},expression:"fishData[navArr[activeIndex].id]"}}):e._e()],1)])])])],1):e._e(),e._v(" "),Boolean(e.navArr[e.activeIndex])?e._e():a("div",{staticStyle:{"text-align":"center",padding:"150px"}},[e._v("\n      暂无数据\n    ")])]),e._v(" "),e.undoneFilledFormDialogVisible?a("el-dialog",{attrs:{"append-to-body":"","modal-append-to-body":"","close-on-click-modal":!1,visible:e.undoneFilledFormDialogVisible},on:{"update:visible":function(t){e.undoneFilledFormDialogVisible=t}}},[a("sx-min-form",{attrs:{submitTF:"",mozhu:e.undoneFilledFormDataMozhu[e.user.type]},on:{consoleData:e.undoneFilledFormConsoleData},model:{value:e.undoneFilledFormData,callback:function(t){e.undoneFilledFormData=t},expression:"undoneFilledFormData"}})],1):e._e()],1)},staticRenderFns:[]};var T=a("VU/8")(y,I,!1,function(e){a("4ru5")},"data-v-386ba63a",null);t.default=T.exports},zv30:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),i=a.n(n),r=a("exGp"),l=a.n(r),o=a("BO1k"),s=a.n(o),c=a("woOf"),d=a.n(c),u={props:{value:{type:Object,default:function(){return{radiographyOrNot:"",radiographyPipeline:"",imagingTime:"",unobstructed:"",irrigation:"",incumbent:"",removeTime:""}}}},watch:{value:{deep:!0,handler:function(e){this.contentModel=d()({},e)}},"contentModel.radiographyOrNot":function(e){var t=!0,a=!1,n=void 0;try{for(var i,r=s()(["radiographyPipeline","imagingTime","unobstructed","irrigation","incumbent","removeTime"]);!(t=(i=r.next()).done);t=!0){var l=i.value;this.contentModel[l]=""}}catch(e){a=!0,n=e}finally{try{!t&&r.return&&r.return()}finally{if(a)throw n}}},"contentModel.radiographyPipeline":function(e){console.log(e),this.text=1===e?this.dText:this.yText,this.init()}},data:function(){return{text:"",dText:'\n        胆总管\n        {{"id":"choledocho","type": "SELECT","values":[{"label": "扩张", "value": "扩张"},{"label": "不扩张", "value": "不扩张"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}\n        ，直径\n        {{"id": "dia","type": "INPUT","validations": [{ "required": "true", "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]+([.]{1}[0-9]+){0,1}$", "message": "小数或整数" }]}}\n        mm，伴\n        {{"id":"choledochoNarrowLocation","type": "SELECT","values":[{"label": "肝门部胆管", "value": "肝门部胆管"},{"label": "胆管中段", "value": "胆管中段"},{"label": "胆管下端", "value": "胆管下端"},{"label": "胆管下段", "value": "胆管下段"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}\n        狭窄，\n        狭窄长度\n        {{"id": "narrowLength","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]+([.]{1}[0-9]+){0,1}$", "message": "小数或整数" }]}}\n        mm，\n        肝内胆管\n        {{"id":"intrahepaticBileDuct","type": "SELECT","values":[{"label": "扩张", "value": "扩张"},{"label": "不扩张", "value": "不扩张"},{"label": "未显影", "value": "未显影"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}\n        。胆总管内\n        {{"id":"choledocholithiasis","type": "SELECT","values":[{"label": "可", "value": "可"},{"label": "未", "value": "未"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}\n        见结石负影，\n        {{"vIf": {"id":"choledocholithiasis", "value": "可"},"label":"结石数目","labelWidth": "70px","unit": "枚，","id": "calculusAmount","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" },{ "pattern": "^[1-9]{0,1}$|^10$", "message": "小数或整数" }]}}\n        {{"vIf": {"id":"choledocholithiasis", "value": "可"},"label":"最大结石直径","labelWidth": "100px","unit": "mm，","id": "maxCalculusDia","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]{0,2}([.]{1}[0-9]+){0,1}$|^[1-2][0-9]{0,2}([.]{1}[0-9]+){0,1}$|^300$", "message": "小数或整数0-300" }]}}\n        肝内胆管\n        {{"id":"hepatolithiasis","type": "SELECT","values":[{"label": "可", "value": "可"},{"label": "未", "value": "未"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}\n        见结石负影，\n        {{"vIf": {"id":"hepatolithiasis", "value": "可"},"label":"结石位于","labelWidth": "70px","id":"calculusLocation","type": "SELECT","values":[{"label": "左", "value": "左"},{"label": "右", "value": "右"},{"label": "全肝内", "value": "全肝内"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}\n        {{"vIf": {"id":"hepatolithiasis", "value": "可"},"label":"结石数目","labelWidth": "70px","id": "calculusAmount","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" },{ "pattern": "^[1-9]{0,1}$|^10$", "message": "小数或整数" }]}}\n        {{"vIf": {"id":"hepatolithiasis", "value": "可"},"labelWidth": "130px","unit": "mm，","label": "枚，最大结石直径","id": "maxCalculusDia","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]{0,2}([.]{1}[0-9]+){0,1}$|^[1-2][0-9]{0,2}([.]{1}[0-9]+){0,1}$|^300$", "message": "小数或整数0-300" }]}}\n        {{"id":"contrastMediaLeakage","type": "SELECT","values":[{"label": "有", "value": "有"},{"label": "无", "value": "无"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}\n        造影剂外漏\n        {{"vIf": {"id":"contrastMediaLeakage", "value": "有"},"label":"，部位","labelWidth": "55px","unit": "胆管。","id":"leakageLocation","type": "SELECT","values":[{"label": "肝内", "value": "肝内"},{"label": "上段", "value": "上段"},{"label": "中段", "value": "中段"},{"label": "下段", "value": "下段"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}\n      ',yText:'\n        主胰管\n        {{"id":"wirsung","type": "SELECT","values":[{"label": "扩张", "value": "扩张"},{"label": "不扩张", "value": "不扩张"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}\n        ，直径\n        {{"id": "dia","type": "INPUT","validations": [{ "required": "true", "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]+([.]{1}[0-9]+){0,1}$", "message": "小数或整数" }]}}\n        mm，\n        伴胰\n        {{"id":"wirsungNarrowLocation","type": "SELECT","values":[{"label": "头", "value": "头"},{"label": "颈", "value": "颈"},{"label": "体", "value": "体"},{"label": "体", "value": "尾"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}\n        部狭窄，\n        狭窄长度\n        {{"id": "narrowLength","type": "INPUT","validations": [{ "required": "true", "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]+([.]{1}[0-9]+){0,1}$", "message": "小数或整数" }]}}\n        mm。\n        胰管内\n        {{"id":"pancreatolithiasis","type": "SELECT","values":[{"label": "可", "value": "可"},{"label": "未", "value": "未"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}\n        见结石负影，\n        {{"vIf": {"id":"pancreatolithiasis", "value": "可"},"label":"结石数目","unit": "枚，","labelWidth": "70px","id": "calculusAmount","type": "INPUT","validations": [{ "required": "true", "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]+([.]{1}[0-9]+){0,1}$", "message": "小数或整数" }]}}\n        {{"vIf": {"id":"pancreatolithiasis", "value": "可"},"label":"最大结石直径","labelWidth": "100px","unit": "mm，","id": "maxCalculusDia","type": "INPUT","validations": [{ "required": "true", "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]{0,2}([.]{1}[0-9]+){0,1}$|^[1-2][0-9]{0,2}([.]{1}[0-9]+){0,1}$|^300$", "message": "小数或整数0-300" }]}}\n        {{"id":"contrastMediaLeakage","type": "SELECT","values":[{"label": "有", "value": "有"},{"label": "无", "value": "无"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}\n        造影剂外漏\n        {{"vIf": {"id":"contrastMediaLeakage", "value": "有"},"labelWidth": "55px","label":"，部位","unit": "胰管。","id":"nasopancreaticTubeleakageLocation","type": "SELECT","values":[{"label": "头", "value": "头"},{"label": "颈", "value": "颈"},{"label": "体", "value": "体"},{"label": "体", "value": "尾"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}\n      ',content:[],contentModel:d()({},this.value),rules:{cholangiographyTime:[{required:!0,message:"请输入",trigger:"change"},{pattern:"^[0-9]$|^[1-2][0-9]$|^30$",message:"0-30"}]}}},created:function(){var e=this;return l()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.init();case 1:case"end":return t.stop()}},t,e)}))()},mounted:function(){},methods:{init:function(){for(var e in this.content=this.text?this.text.match(/\{\{.*?\}\}|[^{}]{0,6}/g):[],this.content)if(/\{\{.*?\}\}/g.test(this.content[e]))switch(this.content[e]=this.content[e].substring(1,this.content[e].length-1),this.content[e]=JSON.parse(this.content[e]),this.content[e].type){case"INPUT":case"SELECT":case"RADIO":this.content[e].id in this.contentModel||this.$set(this.contentModel,this.content[e].id,"");break;case"DATE":this.content[e].id in this.contentModel||this.$set(this.contentModel,this.content[e].id,null)}console.log(this.contentModel),console.log(this.content)}}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"all"},[a("el-form",{ref:"contentModel",attrs:{size:"mini",rules:e.rules,model:e.contentModel,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"是否造影",prop:"radiographyOrNot"}},[a("el-radio-group",{model:{value:e.contentModel.radiographyOrNot,callback:function(t){e.$set(e.contentModel,"radiographyOrNot",t)},expression:"contentModel.radiographyOrNot"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),e.contentModel.radiographyOrNot?a("el-form-item",{attrs:{label:"造影管道",prop:"radiographyPipeline"}},[a("el-radio-group",{model:{value:e.contentModel.radiographyPipeline,callback:function(t){e.$set(e.contentModel,"radiographyPipeline",t)},expression:"contentModel.radiographyPipeline"}},[a("el-radio",{attrs:{label:1}},[e._v("鼻胆管")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("鼻胰管")])],1)],1):e._e(),e._v(" "),e.contentModel.radiographyPipeline?a("el-form-item",{attrs:{label:"造影时间",prop:"imagingTime"}},[a("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[e._v("\n        术后\n        "),a("el-input",{staticStyle:{width:"90%"},model:{value:e.contentModel.imagingTime,callback:function(t){e.$set(e.contentModel,"imagingTime",t)},expression:"contentModel.imagingTime"}}),e._v("\n        天\n      ")],1)]):e._e(),e._v(" "),e.contentModel.radiographyPipeline?a("el-form-item",{attrs:{label:"造影结果",prop:"imagingResult"}},[a("div",{staticClass:"editContain"},e._l(e.content,function(t,n){return a("div",{key:n},[t.type?a("div",{staticStyle:{height:"26px"}},[t.vIf&&e.contentModel[t.vIf.id]!==t.vIf.value?e._e():a("el-form-item",{attrs:{"label-width":t.labelWidth,label:t.label,prop:t.id,rules:t.validations}},[a("div",{staticStyle:{display:"flex"}},["SELECT"===t.type?a("el-select",{style:{width:40+7*e.contentModel[t.id].toString().length+"px !important",height:"100%"},attrs:{placeholder:""},model:{value:e.contentModel[t.id],callback:function(a){e.$set(e.contentModel,t.id,a)},expression:"contentModel[item.id]"}},e._l(t.values,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})):e._e(),e._v(" "),"INPUT"===t.type?a("el-input",{style:{width:55+6*e.contentModel[t.id].toString().length+"px !important",height:"100%"},model:{value:e.contentModel[t.id],callback:function(a){e.$set(e.contentModel,t.id,a)},expression:"contentModel[item.id]"}}):e._e(),e._v(" "),t.unit?a("div",{staticStyle:{"max-width":"50px","text-align":"center"}},[e._v("\n                  "+e._s(t.unit)+"\n                ")]):e._e()],1),e._v(" "),"DATE"===t.type?a("el-date-picker",{style:{width:40+6*e.contentModel[t.id].toString().length+"px !important",height:"100%"},attrs:{type:"date",format:"yyyy/MM/dd","value-format":"yyyy/MM/dd",placeholder:""},model:{value:e.contentModel[t.id],callback:function(a){e.$set(e.contentModel,t.id,a)},expression:"contentModel[item.id]"}}):e._e(),e._v(" "),"RADIO"===t.type?a("el-radio-group",{staticStyle:{"min-width":"100px"},model:{value:e.contentModel[t.id],callback:function(a){e.$set(e.contentModel,t.id,a)},expression:"contentModel[item.id]"}},e._l(t.values,function(e){return a("el-radio",{key:e.value,attrs:{label:e.label}})})):e._e()],1)],1):a("span",[e._v(e._s(t))])])}))]):e._e(),e._v(" "),e.contentModel.radiographyPipeline&e.contentModel.radiographyOrNot?a("el-form-item",{attrs:{label:"是否通畅",prop:"unobstructed"}},[a("el-radio-group",{model:{value:e.contentModel.unobstructed,callback:function(t){e.$set(e.contentModel,"unobstructed",t)},expression:"contentModel.unobstructed"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1):e._e(),e._v(" "),e.contentModel.radiographyPipeline&e.contentModel.radiographyOrNot?a("el-form-item",{attrs:{label:"是否冲洗",prop:"irrigation"}},[a("el-radio-group",{model:{value:e.contentModel.irrigation,callback:function(t){e.$set(e.contentModel,"irrigation",t)},expression:"contentModel.irrigation"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1):e._e(),e._v(" "),e.contentModel.radiographyPipeline&e.contentModel.radiographyOrNot?a("el-form-item",{attrs:{label:"是否在位",prop:"incumbent"}},[a("el-radio-group",{model:{value:e.contentModel.incumbent,callback:function(t){e.$set(e.contentModel,"incumbent",t)},expression:"contentModel.incumbent"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1):e._e(),e._v(" "),e.contentModel.radiographyPipeline&e.contentModel.radiographyOrNot?a("el-form-item",{attrs:{label:"拔除时间",prop:"removeTime"}},[a("el-input",{model:{value:e.contentModel.removeTime,callback:function(t){e.$set(e.contentModel,"removeTime",t)},expression:"contentModel.removeTime"}})],1):e._e()],1),e._v("\n  "+e._s(e.contentModel)+"\n")],1)},staticRenderFns:[]};var p=a("VU/8")(u,v,!1,function(e){a("EDN0")},"data-v-4deaaf82",null);t.default=p.exports}});