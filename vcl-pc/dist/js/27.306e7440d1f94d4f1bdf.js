webpackJsonp([27],{ajKd:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"System_manage",data:function(){return{navOptions:[{icon:"ercp-icon-module-report",title:"数据统计",path:"charts"},{icon:"ercp-icon-module-export",title:"数据导出",path:"export"}]}},methods:{changeIndex:function(t,e){console.log(e),console.log(t),this.$router.push(t.path)}},mounted:function(){}},s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"data-center"}},[n("div",{staticClass:"left-nav"},[t._m(0),t._v(" "),t._l(t.navOptions,function(e,a){return n("div",{key:a,staticClass:"nav-case",class:{active:t.$route.path.split("/")[3]===e.path},on:{click:function(n){t.changeIndex(e,a)}}},[n("span",{staticClass:"left-icon nav-light-text",class:e.icon}),t._v(" "),n("span",{staticClass:"right-text nav-light-text"},[t._v("\n        "+t._s(e.title)+"\n      ")])])})],2),t._v(" "),n("div",{staticClass:"right-content"},[n("router-view")],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page-title"},[e("h4",[this._v("数据中心")]),this._v(" "),e("h5",{staticClass:"light-text"},[this._v("Data Center")])])}]};var i=n("VU/8")(a,s,!1,function(t){n("f8WX")},"data-v-314aabf0",null);e.default=i.exports},f8WX:function(t,e){}});