webpackJsonp([12],{CWhE:function(t,e){},aIHQ:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"System_manage",data:function(){return{navOptions:[{icon:"ercp-icon-module-user",title:"用户管理",path:"user"},{icon:"ercp-icon-module-log",title:"日志管理",path:"log"}]}},methods:{changeIndex:function(t,e){this.$router.push(t.path)}},mounted:function(){}},s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"System-manage"}},[n("div",{staticClass:"left-nav"},[t._m(0),t._v(" "),t._l(t.navOptions,function(e,a){return n("div",{key:a,staticClass:"nav-case",class:{active:t.$route.path.split("/")[3]===e.path},on:{click:function(n){t.changeIndex(e,a)}}},[n("span",{staticClass:"left-icon nav-light-text",class:e.icon}),t._v(" "),n("span",{staticClass:"right-text nav-light-text"},[t._v("\n        "+t._s(e.title)+"\n      ")])])})],2),t._v(" "),n("div",{staticClass:"right-content"},[n("router-view")],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page-title"},[e("h4",[this._v("系统管理")]),this._v(" "),e("h5",{staticClass:"light-text"},[this._v("System Manage")])])}]};var i=n("VU/8")(a,s,!1,function(t){n("CWhE")},"data-v-cabf34da",null);e.default=i.exports}});