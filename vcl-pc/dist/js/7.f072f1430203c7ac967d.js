webpackJsonp([7],{POvk:function(t,e){},hADW:function(t,e,a){"use strict";var i={created:function(){this.init()},model:{prop:"value",event:"change"},props:{value:{type:String},options:{type:Array},message:{type:String}},data:function(){return{form:{radio:"",text:""}}},computed:{defaultValue:function(){return this.value},radios:function(){var t=this.options;return t.push("其它"),t}},methods:{init:function(){var t=this.value;t&&(this.options.indexOf(t)>-1?this.form.radio=t:(this.form.radio="其它",this.form.text=t))},inputBlur:function(){"其它"===this.form.radio&&""===this.form.text&&this.$refs["text-radio-input"].focus()}},watch:{form:{handler:function(t){var e=this;"其它"===t.radio?(this.$nextTick(function(){e.$refs["text-radio-input"].focus()}),this.$emit("change",t.text)):(this.form.text="",this.$emit("change",t.radio))},immediate:!0,deep:!0},message:{handler:function(t){""!==t&&(this.value=t,this.init())}}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"text-radio"},[a("el-radio-group",{staticClass:"text-radio-group",model:{value:t.form.radio,callback:function(e){t.$set(t.form,"radio",e)},expression:"form.radio"}},t._l(t.radios,function(e,i){return a("el-radio",{key:i,staticClass:"radio-group-item",attrs:{label:e}},[t._v("\n      "+t._s(e)+"\n    ")])})),t._v(" "),a("el-input",{directives:[{name:"show",rawName:"v-show",value:"其它"===t.form.radio,expression:"form.radio === '其它'"}],ref:"text-radio-input",staticClass:"text-radio-input",attrs:{placeholder:"请填写其它的内容"},on:{blur:t.inputBlur},model:{value:t.form.text,callback:function(e){t.$set(t.form,"text",e)},expression:"form.text"}})],1)},staticRenderFns:[]};var r=a("VU/8")(i,s,!1,function(t){a("POvk")},"data-v-6f21c283",null);e.a=r.exports},lc9O:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("mvHQ"),s=a.n(i),r=a("Xxa5"),n=a.n(r),o=a("exGp"),l=a.n(o),c=a("hADW"),u=a("zRAg"),d=a("iGgI"),p=a("tR1G"),h={name:"patient_index",components:{textRadio:c.a},data:function(){return{patientAccount:0,tableData:[],searchText:"",dialogTableVisible:!1,pageSize:10,currentPage:1,total:0,optionA:{},optionB:{}}},mounted:function(){this.addressOption=u.a,this.getPatient(10,1),this.initCharts()},methods:{initCharts:function(){this.dataByGender(),this.dataByArea()},dataByGender:function(){var t=this;return l()(n.a.mark(function e(){var a,i,s;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.f)();case 2:"SUCCESS"===(a=e.sent).data.mitiStatus?(i=a.data.entity,t.patientAccount=i.total,s={text:i.title,subtext:"共计"+i.total+"人",classes:i.types,data:i.data},t.optionA=Object(d.b)(t.optionA,s,2)):t.$message.error("ERROR: "+a.data.message);case 4:case"end":return e.stop()}},e,t)}))()},dataByArea:function(){var t=this;return l()(n.a.mark(function e(){var a,i,s;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.e)();case 2:"SUCCESS"===(a=e.sent).data.mitiStatus?(i=a.data.entity,s={text:i.title,subtext:"共计"+i.total+"人",classes:i.types,data:i.data},t.optionB=Object(d.b)(t.optionB,s,3)):t.$message.error("ERROR: "+a.data.message);case 4:case"end":return e.stop()}},e,t)}))()},search:function(){var t=this;return l()(n.a.mark(function e(){var a,i;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.searchText,e.next=3,Object(p.j)(a);case 3:"SUCCESS"===(i=e.sent).data.mitiStatus?(t.tableData=i.data.entity.data,t.total=i.data.entity.total):t.$message.error("ERROR: "+i.data.message);case 5:case"end":return e.stop()}},e,t)}))()},viewPatient:function(t){var e=s()(t);this.$router.push("/patient/detail/"+e)},refresh:function(){this.$message.success("从医院的his系统更新患者")},SizeChange:function(t){this.pageSize=t,this.getPatient(t,this.currentPage)},changePage:function(t){this.currentPage=t,this.getPatient(this.pageSize,t)},getPatient:function(t,e){var a=this;return l()(n.a.mark(function i(){var s,r;return n.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return s={currentPage:e,pageSize:t},i.next=3,Object(p.d)(s);case 3:"SUCCESS"===(r=i.sent).data.mitiStatus?(a.tableData=r.data.entity.data,a.total=r.data.entity.total):a.$message.error("ERROR: "+r.data.message);case 5:case"end":return i.stop()}},i,a)}))()}}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"patient"}},[a("el-card",{staticClass:"patient-statistics",attrs:{"body-style":{flex:1,"box-sizing":"border-box",padding:"10px"}}},[a("div",{staticClass:"card-title",staticStyle:{height:"0px"},attrs:{slot:"header"},slot:"header"},[a("i",{staticClass:"ercp-icon-general-summary"}),t._v(" "),a("b",[t._v("系统概览")]),t._v(" "),a("span",{staticClass:"float-right light-text"},[t._v("患者总数："),a("span",{staticClass:"primary-text"},[t._v(t._s(t.patientAccount))]),t._v(" 人")])]),t._v(" "),a("div",{staticClass:"card-content"},[a("div",{staticClass:"gender"},[a("chart",{ref:"A",staticStyle:{width:"100%",height:"100%"},attrs:{options:t.optionA,"auto-resize":""}})],1),t._v(" "),a("div",{staticClass:"area"},[a("chart",{ref:"B",staticStyle:{width:"100%",height:"100%"},attrs:{options:t.optionB,"auto-resize":""}})],1)])]),t._v(" "),a("el-card",{staticClass:"patient-list",attrs:{"body-style":{height:"100%","box-sizing":"border-box"}}},[a("div",{staticClass:"card-title",attrs:{slot:"header"},slot:"header"},[a("i",{staticClass:"ercp-icon-module-patient"}),a("b",[t._v("患者列表")])]),t._v(" "),a("div",{staticClass:"card-content"},[a("div",{staticClass:"operate"},[a("div",{staticClass:"serach float-left"},[a("el-input",{staticStyle:{width:"300px"},attrs:{clearable:"",placeholder:"姓名 / 身份证号 / 住院号"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.search(e)}},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}},[a("i",{staticClass:"el-input__icon el-icon-search",staticStyle:{cursor:"pointer"},attrs:{slot:"prefix"},on:{click:t.search},slot:"prefix"})])],1)]),t._v(" "),a("div",{staticClass:"table"},[a("el-table",{staticClass:"absolute-table",staticStyle:{width:"100%"},attrs:{data:t.tableData,size:"small",fit:"",height:"100%"}},[a("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"hospitalId",align:"center",label:"住院号",width:110}}),t._v(" "),a("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"name",align:"center",label:"姓名",width:110}}),t._v(" "),a("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"gender",align:"center",label:"性别",width:80},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s("1"===e.row.gender?"男":"女"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"nation",align:"center",label:"民族",width:80}}),t._v(" "),a("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"phoneNum",align:"center",label:"联系方式",width:140}}),t._v(" "),a("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"address",align:"center",label:"常住地址"}}),t._v(" "),a("el-table-column",{attrs:{prop:"operate",align:"center",label:"操作",width:120,fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:function(a){t.viewPatient(e.row)}}},[t._v("查看")])]}}])})],1)],1),t._v(" "),a("div",{staticClass:"pagination align-right"},[a("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper","page-sizes":[5,10,15,20],total:t.total,"current-page":t.currentPage,"page-size":t.pageSize},on:{"size-change":t.SizeChange,"current-change":t.changePage}})],1)])])],1)},staticRenderFns:[]};var v=a("VU/8")(h,f,!1,function(t){a("nCye")},"data-v-2391fbba",null);e.default=v.exports},nCye:function(t,e){}});