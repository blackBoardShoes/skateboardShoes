webpackJsonp([27],{kf9u:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("Xxa5"),i=n.n(o),c=n("exGp"),r=n.n(c),a=n("YaB9"),s={name:"Project_detail",data:function(){return{navOptions:[{icon:"ercp-icon-module-create",title:"基本信息",path:"basic"},{icon:"ercp-icon-module-user",title:"项目成员",path:"member"},{icon:"ercp-icon-module-patient",title:"入组病案",path:"patientCase"},{icon:"ercp-icon-module-data",title:"项目统计",path:"projectStatistics"},{icon:"ercp-icon-module-export",title:"数据导出",path:"projectExport"}],creator:"",projectInfo:{}}},methods:{changeIndex:function(t,e){this.$router.push(t.path)},getProject:function(t){var e=this;return r()(i.a.mark(function n(){var o,c;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return o=t,n.next=3,Object(a.f)(o);case 3:"SUCCESS"===(c=n.sent).data.mitiStatus?(e.projectInfo=c.data.entity,e.navOptions[0].icon=e.selfBuild?"ercp-icon-module-create":"ercp-icon-module-join"):e.$message.error("ERROR: "+c.data.message);case 5:case"end":return n.stop()}},n,e)}))()},getInfo:function(){this.getProject(this.projectId)}},mounted:function(){this.creator=this.$store.state.user.id,this.getProject(this.projectId),console.log(this.creator),console.log(this.projectInfo)},computed:{projectId:function(){return this.$route.path.split("/")[3]},selfBuild:function(){return!(!this.projectInfo.creator||this.projectInfo.creator!==this.creator)}}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("keep-alive",[n("div",{attrs:{id:"project-detail"}},[n("div",{staticClass:"left-nav"},[n("div",{staticClass:"page-title"},[n("h4",[t._v("项目详情")]),t._v(" "),n("h5",{staticClass:"light-text"},[t._v("Project Detail")])]),t._v(" "),n("div",{class:{"project-name":!0,"text-overflow-ellipsis":!0,"self-build":t.selfBuild}},[t._v("\n        "+t._s(t.projectInfo.name)+"\n      ")]),t._v(" "),t._l(t.navOptions,function(e,o){return n("div",{key:o,staticClass:"nav-case",class:{active:t.$route.path.split("/")[4]===e.path},on:{click:function(n){t.changeIndex(e,o)}}},[n("span",{staticClass:"left-icon nav-light-text",class:e.icon}),t._v(" "),n("span",{staticClass:"right-text nav-light-text"},[t._v("\n          "+t._s(e.title)+"\n        ")])])})],2),t._v(" "),n("div",{staticClass:"right-content"},[n("router-view",{attrs:{selfBuild:t.selfBuild,projectInfo:t.projectInfo,projectId:t.projectId},on:{refreshInfo:t.getInfo}})],1)])])},staticRenderFns:[]};var p=n("VU/8")(s,l,!1,function(t){n("uNnt")},"data-v-4384759c",null);e.default=p.exports},uNnt:function(t,e){}});