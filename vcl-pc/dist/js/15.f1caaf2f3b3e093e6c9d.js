webpackJsonp([15],{qGcH:function(t,e){},w9lk:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("Xxa5"),i=a.n(r),n=a("exGp"),s=a.n(n),o=a("YaB9"),c={name:"Project_detail_basic",props:{selfBuild:{type:Boolean,required:!0},projectInfo:{type:Object,required:!0}},data:function(){return{ableModify:!1,basciInfo:{name:"",abbreviation:"",creatorName:"",intro:""},rules:{name:[{required:!0,message:"必填项不能为空",trigger:"focus"}],abbreviation:[{required:!0,message:"必填项不能为空",trigger:"focus"}]}}},methods:{byValue:function(){this.$emit("refreshInfo")},saveChange:function(){var t=this;return s()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.$refs.infomation.validate(function(){var e=s()(i.a.mark(function e(a){var r,n,s;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=9;break}return r=t.basciInfo,n={name:r.name,abbreviation:r.abbreviation,id:t.projectInfo.id,intro:r.intro},e.next=5,Object(o.l)(n);case 5:"SUCCESS"===(s=e.sent).data.mitiStatus?t.byValue():t.$message.error("ERROR: "+s.data.message),e.next=10;break;case 9:return e.abrupt("return",!1);case 10:case"end":return e.stop()}},e,t)}));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}},e,t)}))()},lock:function(){var t=this;return s()(i.a.mark(function e(){var a,r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.projectId,e.next=3,Object(o.k)(a);case 3:"SUCCESS"===(r=e.sent).data.mitiStatus?t.$router.push("/project/index"):t.$message.error("ERROR: "+r.data.message);case 5:case"end":return e.stop()}},e,t)}))()},deletePro:function(){var t=this;return s()(i.a.mark(function e(){var a,r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.projectId,e.next=3,Object(o.d)(a);case 3:"SUCCESS"===(r=e.sent).data.mitiStatus?t.$router.push("/project/index"):t.$message.error("ERROR: "+r.data.message);case 5:case"end":return e.stop()}},e,t)}))()}},mounted:function(){this.projectInfo!=={}&&(this.basciInfo={name:this.projectInfo.name,abbreviation:this.projectInfo.abbreviation,creatorName:this.projectInfo.creatorSta?this.projectInfo.creatorSta.name:"",intro:this.projectInfo.intro})},watch:{projectInfo:{handler:function(t,e){t.name&&(this.basciInfo={name:t.name,abbreviation:t.abbreviation,creatorName:this.projectInfo.creatorSta?this.projectInfo.creatorSta.name:"",intro:t.intro})},deep:!0},basciInfo:{handler:function(t,e){t.name===this.projectInfo.name&&t.abbreviation===this.projectInfo.abbreviation&&t.intro===this.projectInfo.intro?this.ableModify=!1:this.ableModify=!0},deep:!0}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"project-basic"}},[a("div",{staticClass:"project-info"},[a("el-form",{ref:"infomation",attrs:{rules:t.rules,"lebel-position":"left",model:t.basciInfo,"label-width":"100px",disabled:!t.selfBuild||"0"===t.projectInfo.status}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"项目名称",prop:"name"}},[a("el-input",{model:{value:t.basciInfo.name,callback:function(e){t.$set(t.basciInfo,"name",e)},expression:"basciInfo.name"}})],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"项目简称",prop:"abbreviation"}},[a("el-input",{model:{value:t.basciInfo.abbreviation,callback:function(e){t.$set(t.basciInfo,"abbreviation",e)},expression:"basciInfo.abbreviation"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"项目负责人",prop:"creator"}},[a("el-input",{attrs:{disabled:""},model:{value:t.basciInfo.creatorName,callback:function(e){t.$set(t.basciInfo,"creatorName",e)},expression:"basciInfo.creatorName"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"项目简介",prop:"intro"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.basciInfo.intro,callback:function(e){t.$set(t.basciInfo,"intro",e)},expression:"basciInfo.intro"}})],1)],1)],1)],1),t._v(" "),t.selfBuild?a("div",{staticClass:"operate-buttons"},[a("ul",{staticClass:"operation-list"},[a("li",{staticClass:"operation-item clearfix"},[t._m(0),t._v(" "),a("div",{staticClass:"btn-wrapper float-right"},[a("el-button",{attrs:{size:"medium",type:"primary",disabled:!t.ableModify},on:{click:t.saveChange}},[t._v("保存修改")])],1)]),t._v(" "),a("li",{staticClass:"operation-item clearfix"},[t._m(1),t._v(" "),a("div",{staticClass:"btn-wrapper float-right"},[a("el-button",{attrs:{size:"medium",type:"primary",disabled:"0"===t.projectInfo.status},on:{click:t.lock}},[t._v("锁定项目")])],1)]),t._v(" "),a("li",{staticClass:"operation-item clearfix"},[t._m(2),t._v(" "),a("div",{staticClass:"btn-wrapper float-right"},[a("el-button",{attrs:{size:"medium",type:"danger"},on:{click:t.deletePro}},[t._v("删除项目")])],1)])])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"tips-list float-left"},[e("li",{staticClass:"tips-item"},[this._v("保存当前修改")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"tips-list float-left"},[e("li",{staticClass:"tips-item"},[this._v("锁定当前项目，将无法对当前项目进行其他操作，锁定后将跳转到项目列表页面")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"tips-list float-left"},[e("li",{staticClass:"tips-item"},[this._v("删除当前项目，操作不可逆，删除该项目后将跳转到项目列表页面")])])}]};var f=a("VU/8")(c,l,!1,function(t){a("qGcH")},"data-v-d774851c",null);e.default=f.exports}});