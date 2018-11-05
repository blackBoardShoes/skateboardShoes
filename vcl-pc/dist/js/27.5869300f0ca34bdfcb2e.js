webpackJsonp([27],{QM0h:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("zRAg"),a=i("iGgI"),n={name:"home",data:function(){return{optionA:{},optionB:{},optionC:{},dialogTableVisible:!1,basicInfo:{name:"",gender:"",nation:"",hospitalNumber:"",identity:"",concatNumber:"",province:[],permanentAddress:""},rules:{name:[{required:!0,message:"必填项不能为空",trigger:"change"}],gender:[{required:!0,message:"必填项不能为空",trigger:"change"}],nation:[{required:!0,message:"必填项不能为空",trigger:"change"}],hospitalNumber:[{required:!0,message:"必填项不能为空",trigger:"change"}],identity:[{required:!0,message:"必填项不能为空",trigger:"change"}],concatNumber:[{required:!0,message:"必填项不能为空",trigger:"change"}],province:[{required:!0,message:"必填项不能为空",trigger:"change"}],permanentAddress:[{required:!0,message:"必填项不能为空",trigger:"change"}]},addressOption:[],user:{},viewOptions:[]}},mounted:function(){this.user=this.$store.state.user,null!==this.user.codetype&&this.initView(this.user.codetype),this.optionA=a.a[4],this.optionB=a.a[0],this.optionC=a.a[0],this.addressOption=s.a},methods:{initView:function(t){switch(t){case 1:this.viewOptions=[{icon:"ercp-icon-module-patient",title:"患者人数",count:"117"},{icon:"ercp-icon-module-patient",title:"住院人次",count:"127"},{icon:"ercp-icon-module-user",title:"用户数量",count:"34"},{icon:"ercp-icon-module-project",title:"项目数",count:"3"}];break;case 2:this.viewOptions=[{icon:"ercp-icon-module-patient",title:"患者人数",count:"117"},{icon:"ercp-icon-module-patient",title:"住院人次",count:"127"},{icon:"ercp-icon-module-project",title:"自有项目",count:"2"},{icon:"ercp-icon-module-project",title:"参与项目",count:"3"}];break;case 3:this.viewOptions=[{icon:"ercp-icon-module-patient",title:"患者人数",count:"117"},{icon:"ercp-icon-module-patient",title:"住院人次",count:"127"},{icon:"ercp-icon-module-user",title:"用户数量",count:"34"},{icon:"ercp-icon-module-project",title:"项目数",count:"3"}];break;case 4:this.viewOptions=[{icon:"ercp-icon-module-patient",title:"患者人数",count:"117"},{icon:"ercp-icon-module-patient",title:"住院人次",count:"127"},{icon:"ercp-icon-general-audit",title:"今日审核",count:"34"},{icon:"ercp-icon-general-audit",title:"待审核",count:"3"}];break;case 5:case 6:this.viewOptions=[{icon:"ercp-icon-module-patient",title:"患者人数",count:"117"},{icon:"ercp-icon-module-patient",title:"住院人次",count:"127"},{icon:"ercp-icon-general-audit",title:"待审核",count:"34"},{icon:"ercp-icon-general-correct",title:"待修正",count:"3"}];break;default:this.$messsage.error("未存在该用户类型")}},handleChange:function(t){console.log(t)},add:function(){this.dialogTableVisible=!0},refresh:function(){this.$message.success("已更新患者列表,成功添加2名患者")},cancel:function(){this.dialogTableVisible=!1,this.$refs.basicForm.resetFields()},confirmAdd:function(){var t=this;this.$refs.basicForm.validate(function(e){if(!e)return!1;console.log(t.basicInfo)})}}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"home"}},[i("div",{staticClass:"sys-view"},[i("div",{staticClass:"overview er-card"},[t._m(0),t._v(" "),i("div",{staticClass:"basic-view"},t._l(t.viewOptions,function(e,s){return i("div",{key:s,staticClass:"case"},[i("div",{staticClass:"icon"},[i("i",{class:e.icon})]),t._v(" "),i("div",{staticClass:"one-case"},[i("div",{staticClass:"case-num"},[t._v(t._s(e.count))]),t._v(" "),i("div",{staticClass:"case-title light-text"},[t._v(t._s(e.title))])])])}))]),t._v(" "),i("div",{staticClass:"statistics"},[i("div",{staticClass:"case-top er-card"},[i("chart",{ref:"A",staticStyle:{width:"100%",height:"100%"},attrs:{options:t.optionA,"auto-resize":""}})],1),t._v(" "),i("div",{staticClass:"case-bottom"},[i("div",{staticClass:"case-left er-card"},[i("chart",{ref:"B",staticStyle:{width:"100%",height:"100%"},attrs:{options:t.optionB,"auto-resize":""}})],1),t._v(" "),i("div",{staticClass:"case-right er-card"},[i("chart",{ref:"C",staticStyle:{width:"100%",height:"100%"},attrs:{options:t.optionC,"auto-resize":""}})],1)])])]),t._v(" "),i("div",{staticClass:"daily er-card"},[t._m(1),t._v(" "),t._m(2),t._v(" "),i("div",{staticClass:"operation-buttons"},[5===t.user.codetype||6===t.user.codetype?i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.refresh}},[t._v("更新患者")]):t._e(),t._v(" "),5===t.user.codetype?i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.add}},[t._v("添加患者")]):t._e()],1),t._v(" "),i("div",{staticClass:"daily-work"},[t._l(["a","b","c","d"],function(e){return i("div",{key:e,staticClass:"yet case"},[i("div",{staticClass:"time"},[t._v("\n          14:00\n        ")]),t._v(" "),t._m(3,!0),t._v(" "),i("div",{staticClass:"operation-info"},[i("div",[t._m(4,!0),t._v(" "),t.user.codetype&&5===t.user.codetype?i("span",{staticClass:"ercp-icon-medicine-operation float-right"}):t._e(),t._v(" "),t.user.codetype&&5===t.user.codetype?i("span",{staticClass:"ercp-icon-general-fail float-right"}):t._e()]),t._v(" "),t._m(5,!0),t._v(" "),t._m(6,!0)])])}),t._v(" "),t._l(["e","f","g","h"],function(e){return i("div",{key:e,staticClass:"ing case"},[i("div",{staticClass:"time"},[t._v("\n          12:00\n        ")]),t._v(" "),t._m(7,!0),t._v(" "),t._m(8,!0)])}),t._v(" "),t._l(["i","j","k","l"],function(e){return i("div",{key:e,staticClass:"done case"},[i("div",{staticClass:"time"},[t._v("\n          10:00\n        ")]),t._v(" "),t._m(9,!0),t._v(" "),t._m(10,!0)])})],2)]),t._v(" "),i("el-dialog",{attrs:{title:"添加患者",visible:t.dialogTableVisible,modal:!0,"append-to-body":""},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[i("el-form",{ref:"basicForm",attrs:{rules:t.rules,model:t.basicInfo,"label-position":"right","label-width":"100px"}},[i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:"患者姓名:",prop:"name"}},[i("el-input",{attrs:{size:"small"},model:{value:t.basicInfo.name,callback:function(e){t.$set(t.basicInfo,"name",e)},expression:"basicInfo.name"}})],1)],1),t._v(" "),i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:"患者性别:",prop:"gender"}},[i("el-radio-group",{model:{value:t.basicInfo.gender,callback:function(e){t.$set(t.basicInfo,"gender",e)},expression:"basicInfo.gender"}},[i("el-radio",{attrs:{label:"男",value:"0"}}),t._v(" "),i("el-radio",{attrs:{label:"女",value:"1"}})],1)],1)],1),t._v(" "),i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:"患者名族:",prop:"nation"}},[i("el-input",{attrs:{size:"small"},model:{value:t.basicInfo.nation,callback:function(e){t.$set(t.basicInfo,"nation",e)},expression:"basicInfo.nation"}})],1)],1),t._v(" "),i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:"住院编号:",prop:"hospitalNumber"}},[i("el-input",{attrs:{size:"small"},model:{value:t.basicInfo.hospitalNumber,callback:function(e){t.$set(t.basicInfo,"hospitalNumber",e)},expression:"basicInfo.hospitalNumber"}})],1)],1),t._v(" "),i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:"身份证号:",prop:"identity"}},[i("el-input",{attrs:{size:"small"},model:{value:t.basicInfo.identity,callback:function(e){t.$set(t.basicInfo,"identity",e)},expression:"basicInfo.identity"}})],1)],1),t._v(" "),i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:"联系方式:",prop:"concatNumber"}},[i("el-input",{attrs:{size:"small"},model:{value:t.basicInfo.concatNumber,callback:function(e){t.$set(t.basicInfo,"concatNumber",e)},expression:"basicInfo.concatNumber"}})],1)],1),t._v(" "),i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"常居住地",prop:"province"}},[i("el-cascader",{attrs:{options:t.addressOption},on:{change:t.handleChange},model:{value:t.basicInfo.province,callback:function(e){t.$set(t.basicInfo,"province",e)},expression:"basicInfo.province"}})],1)],1),t._v(" "),i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{prop:"permanentAddress",label:""}},[i("el-input",{model:{value:t.basicInfo.permanentAddress,callback:function(e){t.$set(t.basicInfo,"permanentAddress",e)},expression:"basicInfo.permanentAddress"}})],1)],1)],1),t._v(" "),i("div",{staticClass:"operate align-center"},[i("el-button",{attrs:{type:"info"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.confirmAdd}},[t._v("确定")])],1)],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-title"},[e("span",[e("i",{staticClass:"ercp-icon-general-summary"}),e("b",[this._v("系统概览")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-title"},[e("span",[e("i",{staticClass:"ercp-icon-medicine-reservation"}),e("b",[this._v("今日手术")]),this._v(" "),e("span",{staticClass:"light-text float-right small-text"},[this._v("2018-07--13 10:12:55更新过")])])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"case-statistics"},[i("div",{staticClass:"case"},[i("div",{staticClass:"light-text"},[t._v("完成手术")]),t._v(" "),i("div",[t._v("4")])]),t._v(" "),i("div",{staticClass:"case"},[i("div",{staticClass:"light-text"},[t._v("待做手术")]),t._v(" "),i("div",[t._v("2")])]),t._v(" "),i("div",{staticClass:"case"},[i("div",{staticClass:"light-text"},[t._v("未做排期")]),t._v(" "),i("div",[t._v("1")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"icon-line"},[e("i",{staticClass:"ercp-icon-general-dolist"}),this._v(" "),e("span",{staticClass:"line"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[this._v("林广福"),e("span",{staticClass:"info-text"},[this._v("未手术")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",[this._v("手术报告"),e("span",{staticClass:"info-text"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",[this._v("手术医生"),e("span",{staticClass:"info-text"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"icon-line"},[e("i",{staticClass:"ercp-icon-general-progress"}),this._v(" "),e("span",{staticClass:"line"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"operation-info"},[i("div",[i("span",[t._v("黄小明"),i("span",{staticClass:"primary-text"},[t._v("手术中")])])]),t._v(" "),i("div",[i("span",[t._v("手术报告"),i("span",{staticClass:"info-text"},[t._v("待录入")])])]),t._v(" "),i("div",[i("span",[t._v("手术医生"),i("span",{staticClass:"info-text"},[t._v("王大彪")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"icon-line"},[e("i",{staticClass:"ercp-icon-general-finish"}),this._v(" "),e("span",{staticClass:"line"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"operation-info"},[i("div",[i("span",[t._v("王小虎"),i("span",{staticClass:"success-text"},[t._v("已完成")])])]),t._v(" "),i("div",[i("span",[t._v("手术报告"),i("span",{staticClass:"success-text"},[t._v("已打印")])])]),t._v(" "),i("div",[i("span",[t._v("手术医生"),i("span",{staticClass:"info-text"},[t._v("王小彪")])])])])}]};var o=i("VU/8")(n,c,!1,function(t){i("kd4x")},"data-v-5ad04392",null);e.default=o.exports},kd4x:function(t,e){}});