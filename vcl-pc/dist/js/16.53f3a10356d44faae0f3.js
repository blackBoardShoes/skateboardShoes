webpackJsonp([16],{"8Dsd":function(e,t){},uTEB:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Xxa5"),n=a.n(r),l=a("exGp"),s=a.n(l),i=a("sF3y"),o={name:"system_detail_user",data:function(){var e=this;return{searchUser:"",tableData:[],memoryTable:[],dialogTableVisible:!1,typeOptions:[],newUser:{name:"",gender:"",department:"",institution:"",type:""},nameArr:[],permissionData:[{page0:"管理员",page1:"×",page2:"×",page3:"√",page4:"×",page5:"×",page6:"×",page7:"×",page8:"×",page9:"×",page10:"√",page11:"√",page12:"√",page13:"√",page14:"√",pag15:"√",page16:"√"},{page0:"科研管理员",page1:"×",page2:"×",page3:"√",page4:"×",page5:"×",page6:"×",page7:"×",page8:"×",page9:"√",page10:"√",page11:"×",page12:"×",page13:"√",page14:"×",pag15:"√",page16:"×"},{page0:"医生",page1:"×",page2:"×",page3:"√",page4:"×",page5:"×",page6:"×",page7:"√",page8:"×",page9:"×",page10:"√",page11:"×",page12:"×",page13:"√",page14:"×",pag15:"×",page16:"×"},{page0:"临床质控员",page1:"×",page2:"×",page3:"√",page4:"×",page5:"×",page6:"×",page7:"√",page8:"×",page9:"×",page10:"×",page11:"×",page12:"√",page13:"×",page14:"×",pag15:"×",page16:"×"},{page0:"诊疗中心",page1:"√",page2:"√",page3:"√",page4:"√",page5:"√",page6:"√",page7:"×",page8:"×",page9:"×",page10:"×",page11:"×",page12:"×",page13:"√",page14:"×",pag15:"×",page16:"×"},{page0:"科研护士",page1:"√",page2:"√",page3:"√",page4:"√",page5:"×",page6:"√",page7:"×",page8:"√",page9:"√",page10:"×",page11:"×",page12:"×",page13:"√",page14:"×",pag15:"×",page16:"×"}],rules:{name:[{validator:function(t,a,r){""===a?r(new Error("请填写用户姓名")):(e.nameArr.find(function(t){return t.name===a&&t.type===e.newUser.type})&&r(new Error("同类型用户，该用户名已存在，请输入其他用户名")),r())},trigger:"blur"}],institution:[{required:!0,message:"必填项不能为空",trigger:"change"}],type:[{required:!0,message:"必填项不能为空",trigger:"change"}]}}},methods:{search:function(){if(this.searchUser){var e=this.searchUser,t=[];this.tableData.forEach(function(a,r){(a.username.indexOf(e)>-1||a.name.indexOf(e)>-1)&&t.push(a)}),this.tableData=t}else this.tableData=this.memoryTable},cancel:function(){this.dialogTableVisible=!1,this.$refs.newUserForm.resetFields()},clearDepartment:function(){this.newUser.department="",this.newUser.gender=""},confirmAdd:function(){var e=this;return s()(n.a.mark(function t(){return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.$refs.newUserForm.validate(function(){var t=s()(n.a.mark(function t(a){var r,l;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!a){t.next=9;break}return(r=e.newUser).institution_name=r.institution,t.next=5,Object(i.a)(r);case 5:"SUCCESS"===(l=t.sent).data.mitiStatus?(e.getAllUser(1),e.$refs.newUserForm.resetFields(),e.dialogTableVisible=!1):e.$message.error("ERROR: "+l.data.message),t.next=10;break;case 9:return t.abrupt("return",!1);case 10:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}},t,e)}))()},forbiddenClass:function(e,t){if("禁用"===e.row.status)return"forbidden"},showOperate:function(e){var t=e.status,a=e.type,r=this.$store.state.user.type;return"禁用"!==t&&("管理员"!==a&&("管理员"===r||"科研管理员"===r&&"科研管理员"!==a))},filterTag1:function(e,t){return t.type===e},filterTag2:function(e,t){return t.department===e},filterTag3:function(e,t){return t.status===e},getAllUser:function(e){var t=this;return s()(n.a.mark(function a(){var r,l,s,o,p,c,u;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return r={currentPage:1,pageSize:500},a.next=3,Object(i.e)(r);case 3:if("SUCCESS"===(l=a.sent).data.mitiStatus){for(u in s=l.data.entity.data,o=[],p=function(e){s.forEach(function(t){t.type===e&&"禁用"!==t.status&&o.push(t)})},c={type1:"医生",type2:"科研护士",type3:"诊疗中心",type4:"临床质控员",type5:"科研管理员",type6:"管理员"})p(c[u]);t.tableData=o,t.memoryTable=t.tableData,t.nameArr=[],t.tableData.forEach(function(e){t.nameArr.push(e)}),1===e?t.$message.success("新增用户成功"):2===e&&t.$message.success("禁用用户成功")}else t.$message.error("ERROR: "+l.data.message);case 5:case"end":return a.stop()}},a,t)}))()},banUser:function(e){var t=this;return s()(n.a.mark(function a(){return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:t.$confirm("操作将删除  "+e.name+"  用户，是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(s()(n.a.mark(function a(){var r;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(i.d)(e.id);case 2:"SUCCESS"===(r=a.sent).data.mitiStatus?t.getAllUser(2):console.log(r.data);case 4:case"end":return a.stop()}},a,t)}))).catch(function(){return!1});case 1:case"end":return a.stop()}},a,t)}))()},resetUser:function(e){var t=this;return s()(n.a.mark(function a(){return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:t.$confirm("操作将重置  "+e.name+"  的用户密码，是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(s()(n.a.mark(function a(){var r;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(i.h)(e.id);case 2:"SUCCESS"===(r=t.sent).data.mitiStatus?console.log(r):console.log(r.data);case 4:case"end":return t.stop()}},a,t)}))).catch(function(){return!1});case 1:case"end":return a.stop()}},a,t)}))()}},mounted:function(){null!==this.$store.state.user&&(1===this.$store.state.user.codetype?(this.typeOptions=["科研管理员","科研护士","诊疗中心","临床质控员","医生"],this.getAllUser()):2===this.$store.state.user.codetype?(this.typeOptions=["科研护士","诊疗中心","临床质控员","医生"],this.getAllUser()):this.$router.push("/error:401"))},watch:{searchUser:{handler:function(e){this.search()},deep:!0}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"system-user"}},[a("div",{staticClass:"operate-buttons align-right"},[a("el-col",{attrs:{span:6}},[a("el-input",{attrs:{size:"medium",placeholder:"搜索成员",clearable:""},model:{value:e.searchUser,callback:function(t){e.searchUser=t},expression:"searchUser"}},[a("i",{staticClass:"ercp-icon-general-search el-input__icon",attrs:{slot:"prefix"},on:{click:e.search},slot:"prefix"})])],1),e._v(" "),a("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(t){e.dialogTableVisible=!0}}},[e._v("新增用户")])],1),e._v(" "),a("div",{staticClass:"user-table"},[a("el-table",{staticClass:"absolute-table",staticStyle:{width:"100%"},attrs:{data:e.tableData,height:"100%",size:"medium",fit:"","row-class-name":e.forbiddenClass}},[a("el-table-column",{attrs:{"show-overflow-tooltip":"",fixed:"",prop:"username",align:"center",label:"账号"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"100","show-overflow-tooltip":"",prop:"type",align:"center",label:"用户类型",filters:[{text:"管理员",value:"管理员"},{text:"科研管理员",value:"科研管理员"},{text:"医生",value:"医生"},{text:"诊疗中心",value:"诊疗中心"},{text:"科研护士",value:"科研护士"},{text:"临床质控员",value:"临床质控员"}],"filter-method":e.filterTag1}}),e._v(" "),a("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"name",align:"center",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"gender",align:"center",label:"性别"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.gender||"/"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"department",align:"center",label:"科室",filters:[{text:"外科一",value:"外科一"},{text:"外科二",value:"外科二"},{text:"特需外科",value:"特需外科"}],"filter-method":e.filterTag2},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.department||"/"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"institution",align:"center",label:"机构","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"100","show-overflow-tooltip":"",prop:"createDate",align:"center",sortable:"",label:"创建日期"}}),e._v(" "),a("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"status",align:"center",label:"状态",filters:[{text:"正常",value:"正常"},{text:"禁用",value:"禁用"}],"filter-method":e.filterTag3,width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"operate",align:"center",label:"操作",fixed:"right",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showOperate(t.row)?a("span",[a("el-button",{attrs:{type:"danger",size:"small",plain:""},on:{click:function(a){e.banUser(t.row)}}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:function(a){e.resetUser(t.row)}}},[e._v("重置密码")])],1):a("span",[e._v(" - ")])]}}])})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"新增用户",visible:e.dialogTableVisible,modal:!0,"append-to-body":"",width:"600px",center:""},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("el-form",{ref:"newUserForm",attrs:{rules:e.rules,model:e.newUser,"label-position":"left","label-width":"100px"}},[a("el-col",{attrs:{span:23}},[a("el-form-item",{attrs:{label:"用户类型:",prop:"type"}},[a("el-select",{staticStyle:{width:"100%"},on:{change:e.clearDepartment},model:{value:e.newUser.type,callback:function(t){e.$set(e.newUser,"type",t)},expression:"newUser.type"}},e._l(e.typeOptions,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:1}},[a("div",{staticClass:"tips"},[a("el-popover",{attrs:{placement:"bottom-start",width:"800",trigger:"click"}},[a("el-table",{attrs:{data:e.permissionData,border:"",stripe:""}},[a("el-table-column",{attrs:{align:"center",label:"用户/页面",property:"page0",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"患者中心"}},[a("el-table-column",{attrs:{align:"center",property:"page1",label:"删除"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",property:"page2",label:"编辑"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",property:"page3",label:"查看"}})],1),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"任务中心"}},[a("el-table-column",{attrs:{align:"center",property:"page4",label:"新增"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",property:"page5",label:"编辑"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",property:"page6",label:"录入"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",property:"page7",label:"审核"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",property:"page8",label:"修正"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",property:"page9",label:"随访"}})],1),e._v(" "),a("el-table-column",{attrs:{align:"center",property:"page10",label:"数据管理"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"表单管理"}},[a("el-table-column",{attrs:{align:"center",property:"page11",label:"表单库"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",property:"page12",label:"字段库"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",property:"page13",label:"术语库（查看、查询）",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",property:"page14",label:"术语库（新增、编辑）",width:"180"}})],1),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"系统管理"}},[a("el-table-column",{attrs:{align:"center",property:"pag15",label:"用户管理"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",property:"page16",label:"日志管理"}})],1)],1),e._v(" "),a("span",{staticClass:"el-icon-question",attrs:{slot:"reference"},slot:"reference"})],1)],1)]),e._v(" "),a("el-col",{attrs:{span:23}},[a("el-form-item",{attrs:{label:"用户机构:",prop:"institution"}},[a("el-select",{staticStyle:{width:"100%"},model:{value:e.newUser.institution,callback:function(t){e.$set(e.newUser,"institution",t)},expression:"newUser.institution"}},[a("el-option",{attrs:{label:"兰州大学第一医院",value:"兰州大学第一医院"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:23}},[a("el-form-item",{attrs:{label:"用户姓名:",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入用户姓名"},model:{value:e.newUser.name,callback:function(t){e.$set(e.newUser,"name",t)},expression:"newUser.name"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:23}},[a("el-form-item",{attrs:{label:"用户科室:",prop:"department"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{disabled:"医生"!==e.newUser.type},model:{value:e.newUser.department,callback:function(t){e.$set(e.newUser,"department",t)},expression:"newUser.department"}},[a("el-option",{attrs:{label:"外科一",value:"外科一"}}),e._v(" "),a("el-option",{attrs:{label:"外科二",value:"外科二"}}),e._v(" "),a("el-option",{attrs:{label:"特需外科",value:"特需外科"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:23}},[a("el-form-item",{attrs:{label:"用户性别:",prop:"gender"}},[a("el-radio-group",{model:{value:e.newUser.gender,callback:function(t){e.$set(e.newUser,"gender",t)},expression:"newUser.gender"}},[a("el-radio",{attrs:{label:"男",value:"男"}}),e._v(" "),a("el-radio",{attrs:{label:"女",value:"女"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"operate align-center clearfix",staticStyle:{width:"100%"}},[a("el-button",{attrs:{type:"info"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.confirmAdd}},[e._v("确定")])],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(o,p,!1,function(e){a("8Dsd")},"data-v-89b4d9c0",null);t.default=c.exports}});