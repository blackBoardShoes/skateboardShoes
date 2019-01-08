webpackJsonp([8],{Ft2K:function(t,e){},joKO:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Xxa5"),i=a.n(s),n=a("exGp"),l=a.n(n),r=a("tR1G"),o=a("zL8q"),c={name:"patient_record",components:{syncSlider:function(){return a.e(30).then(a.bind(null,"Xp9z"))}},data:function(){return{contentBox:{content:"sync-content",detail:"detail"},activeIndex:0,formData:[],smallNavi:[],basicInfo:{},templates:[],mixForms:[],loadingInstance:""}},mounted:function(){var t=JSON.parse(this.$route.params.id),e=t.recordId;this.basicInfo=t.basicInfo,this.getRecord(e),this.getFormTemplate(),this.loadingInstance=o.Loading.service({lock:!0,target:document.getElementById("patient-record"),text:"患者详情报告生成中",spinner:"el-icon-loading",background:"#fff",fullscreen:!1})},created:function(){},methods:{changeActiveIndex:function(t){this.activeIndex=t},scroll:function(t){this.$refs.child.scroll(t)},printRecord:function(){var t=document.getElementById("sync-content").innerHTML,e=document.body.innerHTML;return document.body.innerHTML=t,window.print(),window.location.reload(),document.body.innerHTML=e,!1},objIntoArr:function(t){var e=this,a=[],s=function(s){e.templates.forEach(function(e){e.id===s&&(t[s].moduleName=e.name,t[s].moduleIcon=e.icon)}),a.push(t[s]),e.smallNavi.indexOf(t[s])<0&&e.smallNavi.push(t[s])};for(var i in t)s(i);return a},getRecord:function(t){var e=this;return l()(i.a.mark(function a(){var s,n,l,o;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(r.i)(t);case 2:if("SUCCESS"===(s=a.sent).data.mitiStatus){for(o in e.formData=s.data.entity,e.formData.forms.length>0&&(n=e.formData.forms[4],e.formData.forms.splice(4,1),e.formData.forms.push(n)),l={},e.formData)"forms"!==o&&(l[o]=e.formData[o]);e.formData.recordCover=l,e.smallNavi.push(l)}else e.$message.error("ERROR: "+s.data.message);case 4:case"end":return a.stop()}},a,e)}))()},getFormTemplate:function(){var t=this;return l()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.c)();case 2:"SUCCESS"===(a=e.sent).data.mitiStatus?t.templates=a.data.entity:t.$message.error("ERROR: "+a.data.message);case 4:case"end":return e.stop()}},e,t)}))()},tableTransform:function(t){var e=[];return t.forEach(function(t){var a={};t.forEach(function(t){a[t.id]=t.label_value||t.real_value}),e.push(a)}),e},tableTransform2:function(t){var e=[];return t[0].forEach(function(t){var a={};a.prop=t.id,a.label=t.label,e.push(a)}),e},mixOptions:function(){var t=this,e=this.formData.forms,a=this.templates;e.forEach(function(t){t._template=[]}),e.forEach(function(e,s){var i=function(s){var i=a.find(function(t){return t.id===s&&t.phase===e.header.phase});if(i){for(var n in i.fields){var l=void 0===i.fields[n].id?"":i.fields[n].id;for(var r in e.data[s])if("RADIO"===i.fields[n].type&&void 0===i.fields[n].values)i.fields[n].type="TITLE",t.matchValue(i.fields[n]);else{if("TABLE"===i.fields[n].type&&r===l){i.fields[n].real_value_first=e.data[s][r],t.matchValue(i.fields[n]);continue}if(r===l){i.fields[n].real_value=e.data[s][r],t.matchValue(i.fields[n]);continue}}}e._template.push(i)}else t.$message.warning("未找到"+s+"的模板")};for(var n in e.data)i(n)}),this.mixForms=e,this.loadingInstance.close()},separate:function(t){var e=this,a=t.real_value_first,s=[];return a.length>0&&a.forEach(function(a){var i=[],n=function(s){var n=t.subFields.find(function(t){return t.id===s});n.real_value=a[s],e.matchValue(n),i.push(n)};for(var l in a)n(l);s.push(i)}),s},transformValue:function(t,e){return e&&t?void 0===e.find(function(e){return e.value===t})?"":e.find(function(e){return e.value===t}).label:null},matchValue:function(t,e){var a=this;if(["INPUT","TEXTAREA","DATETIME","CALCULATE","DATE","INT","DOUBLE","RADIOTEXT"].includes(t.type))t.label_value=""===t.real_value?null:t.real_value;else if("RADIO"===t.type||"SELECT"===t.type)t.label_value=this.transformValue(t.real_value,t.values);else if("CHECKBOX"===t.type||"SELECTMUTIPLE"===t.type)if(t.real_value.length>0){var s=[];t.real_value.forEach(function(e){s.push(a.transformValue(e,t.values))});var i="";s.forEach(function(t,e){i+=(e+1).toString()+"、"+(null===t?"":t)}),t.label_value=i}else t.label_value=null;else if("CHECKBOXTEXT"===t.type){var n="";t.real_value.forEach(function(e,a){null===e&&t.real_value.splice(a,1)}),t.real_value.length>0?(t.real_value.forEach(function(t,e){n+=(e+1).toString()+"、"+(null===t?"":t)}),t.label_value=n):t.label_value=null}else if("TABLE"===t.type)t.real_value=this.separate(t);else if("CASCADER"===t.type){var l=[],r=void 0;if(t.real_value.length>0){t.real_value.forEach(function(e,s){var i="";0===s?(i+=a.transformValue(e,t.children),r=t.children.find(function(t){return t.value===e})):i+="-"+a.transformValue(e,r.children),l.push(i)});var o="";l.forEach(function(t,e){o+=null===t?"":t}),t.label_value=o}else t.label_value=null}else t.label_value=t.real_value}},watch:{templates:{handler:function(t){t&&t!==[]&&this.formData&&this.formData!==[]&&this.mixOptions()},deep:!0}}},v={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"patient-record"}},[t.mixForms.length>0?s("div",{staticClass:"basic-title light-text"},[t._v("\n    患者：\n    "),s("span",{staticClass:"primary-text"},[t._v(t._s(t.formData.patientName))]),t._v(" "),s("span",[t._v("（"+t._s(1===t.formData.gender?"男":"女")+"）")]),t._v(" "),s("span",{staticClass:"hospital-num"},[t._v(" 住院编号："+t._s(t.formData.patientId)+" ")]),t._v(" "),s("div",{staticClass:"operate-buttons"},[s("el-button",{attrs:{type:"primary",plain:"",size:"small"},on:{click:t.printRecord}},[t._v("打印")])],1)]):t._e(),t._v(" "),t.mixForms.length>0?s("sync-slider",{ref:"child",attrs:{contentBox:t.contentBox},on:{changeActiveIndex:t.changeActiveIndex}},[s("div",{staticClass:"nav",attrs:{slot:"nav"},slot:"nav"},[s("div",{staticClass:"navi"},[s("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"unique-opened":!0,"default-active":t.activeIndex.toString()}},[s("el-submenu",{attrs:{index:"11111"}},[s("template",{slot:"title"},[s("div",{staticClass:"text-overflow-ellipsis"},[s("span",[t._v("封面")])])]),t._v(" "),s("el-menu-item",{attrs:{index:t.smallNavi.indexOf(t.formData.recordCover).toString(),"unique-opened":!0}},[s("div",{staticClass:"text-overflow-ellipsis",on:{click:function(e){t.scroll(t.smallNavi.indexOf(t.formData.recordCover).toString())}}},[t._v("\n                "+t._s(t.basicInfo.name)+"的详情报告\n              ")])])],2),t._v(" "),t._l(t.formData.forms,function(e,a){return s("el-submenu",{key:a,attrs:{index:(a+222).toString(),"unique-opened":!0}},[s("template",{slot:"title"},[s("div",{staticClass:"text-overflow-ellipsis"},[s("span",[t._v(t._s(e.header.phase))])])]),t._v(" "),s("el-menu-item-group",{attrs:{"unique-opened":!0}},t._l(t.objIntoArr(e.data),function(e,a){return s("el-menu-item",{key:a,attrs:{index:t.smallNavi.indexOf(e).toString()}},[s("div",{staticClass:"menu-icon"},[s("i",{class:e.moduleIcon})]),t._v(" "),s("div",{staticClass:"text-overflow-ellipsis menu-text",on:{click:function(a){t.scroll(t.smallNavi.indexOf(e).toString())}}},[t._v("\n                  "+t._s(e.moduleName)+"\n                ")])])}))],2)})],2)],1)]),t._v(" "),s("div",{attrs:{slot:"content",id:"sync-content"},slot:"content"},[s("div",{staticClass:"detail"},[s("div",{staticClass:"basic-cover"},[s("div",{staticClass:"top"},[s("div",{staticClass:"top-logo"},[s("div",{staticClass:"hospital"},[s("div",{staticClass:"top-text"},[s("div",{staticClass:"bolder-text"},[t._v("兰州大学第一医院")]),t._v(" "),s("div",{},[t._v("THE FIRST HOSPITAL OF LANZHOU UNIVERSITY")])]),t._v(" "),s("div",{staticClass:"logo"},[s("img",{attrs:{src:a("wdeL"),alt:""}})])])]),t._v(" "),s("div",{staticClass:"top-text"},[s("div",{staticClass:"bolder-text"},[t._v("患者详情报告")]),t._v(" "),s("div",{},[t._v("PATIENT DETAILS RECORD")]),t._v(" "),s("div",{staticClass:"system"},[s("span",[t._v("ERCP")]),t._v("信息录入管理系统")])])]),t._v(" "),s("div",{staticClass:"basic-info"},[s("div",{staticClass:"info-title"},[t._v("\n              患者基本信息\n            ")]),t._v(" "),s("div",{staticClass:"info-content"},[s("div",{staticClass:"info-case"},[s("div",{staticClass:"info-head letter-space"},[s("div",[t._v("姓")]),t._v(" "),s("div",[t._v("名")])]),t._v(" "),s("div",{staticClass:"info-detail text-overflow-ellipsis"},[t._v("："+t._s(t.basicInfo.name))])]),t._v(" "),s("div",{staticClass:"info-case"},[s("div",{staticClass:"info-head letter-space"},[s("div",[t._v("性")]),t._v(" "),s("div",[t._v("别")])]),t._v(" "),s("div",{staticClass:"info-detail text-overflow-ellipsis"},[t._v("："+t._s("1"===t.basicInfo.gender?"男":"女"))])]),t._v(" "),s("div",{staticClass:"info-case"},[s("div",{staticClass:"info-head letter-space"},[s("div",[t._v("民")]),t._v(" "),s("div",[t._v("族")])]),t._v(" "),s("div",{staticClass:"info-detail text-overflow-ellipsis"},[t._v("："+t._s(t.basicInfo.nation))])]),t._v(" "),s("div",{staticClass:"info-case"},[s("div",{staticClass:"info-head"},[t._v("住院编号")]),t._v(" "),s("div",{staticClass:"info-detail text-overflow-ellipsis"},[t._v("："+t._s(t.basicInfo.hospitalId))])]),t._v(" "),s("div",{staticClass:"info-case"},[s("div",{staticClass:"info-head"},[t._v("身份证号")]),t._v(" "),s("div",{staticClass:"info-detail text-overflow-ellipsis"},[t._v("："+t._s(t.basicInfo.idCard))])]),t._v(" "),s("div",{staticClass:"info-case"},[s("div",{staticClass:"info-head"},[t._v("联系方式")]),t._v(" "),s("div",{staticClass:"info-detail text-overflow-ellipsis"},[t._v("："+t._s(t.basicInfo.phoneNum))])]),t._v(" "),s("div",{staticClass:"info-case"},[s("div",{staticClass:"info-head"},[t._v("常居住地")]),t._v(" "),s("div",{staticClass:"info-detail text-overflow-ellipsis"},[t._v("："+t._s(t.basicInfo.province!==t.basicInfo.city?t.basicInfo.city:"")+t._s(t.basicInfo.city)+t._s(t.basicInfo.district)+t._s(t.basicInfo.staAddress))])])])])])]),t._v(" "),t._l(t.mixForms,function(e,a){return s("div",{key:a,staticClass:"forms"},[s("div",{staticClass:"reord-header"},[s("i",{staticClass:"ercp-icon-general-stage"}),t._v("\n          【"+t._s(e.header.phase)+"】\n        ")]),t._v(" "),s("div",{staticClass:"bottom-bg"}),t._v(" "),s("div",{staticClass:"form-recorder light-text"},[s("div",{staticClass:"recorder float-left"},[s("span",[t._v("录入人员："+t._s(e.header.responseName))])]),t._v(" "),s("div",{staticClass:"checker float-right"},[s("span",[t._v("审核人员："+t._s(e.header.checkerName))])])]),t._v(" "),t._l(e._template,function(e,a){return s("div",{key:a,staticClass:"detail"},[s("div",{staticClass:"module-title"},[s("div",{staticClass:"module-title-main"},[s("i",{class:e.icon}),t._v("\n              "+t._s(e.name)+"\n            ")]),t._v(" "),s("div",{staticClass:"right-rounds"})]),t._v(" "),s("div",{staticClass:"module-content"},t._l(e.fields,function(e,a){return s("div",{key:a,staticClass:"question-case"},["TABLE"!==e.type&&null!==e.label_value?s("div",{staticClass:"text-question"},[s("span",{class:{"success-text":"TITLE"===e.type,"bolder-text":"TITLE"===e.type}},[t._v(t._s(e.label)+"：")]),t._v(" "),s("span",[t._v(t._s("string"==typeof e.label_value?e.label_value.split("**")[0]:e.real_value))]),t._v(" "),s("span",[t._v(t._s(e.unit||""))])]):t._e(),t._v(" "),"TABLE"===e.type?s("div",{staticClass:"table-question"},[s("p",{staticClass:"success-text bolder-text"},[t._v(t._s(e.label))]),t._v(" "),t._l(e.real_value,function(e,a){return s("div",{key:a,staticClass:"one-record"},t._l(e,function(e,a){return s("div",{key:a},[s("span",{class:{"success-text":"TITLE"===e.type,"bolder-text":"TITLE"===e.type}},[t._v(t._s(e.label)+"：")]),t._v(" "),s("span",[t._v(t._s(e.label_value||e.real_value))]),t._v(" "),s("span",[t._v(t._s(e.unit||""))])])}))})],2):t._e()])}))])})],2)})],2)]):t._e()],1)},staticRenderFns:[]};var d=a("VU/8")(c,v,!1,function(t){a("ozGV"),a("Ft2K")},"data-v-ad825a06",null);e.default=d.exports},ozGV:function(t,e){}});