webpackJsonp([9],{BtdK:function(t,e){},ItCA:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={props:{navArr:{type:Array,default:function(){return[]}}},data:function(){return{}},methods:{emitClick:function(t,e){this.$emit("emitClick",{path:this.$route.path,name:this.$route.name,item:t,index:e})}}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"formControlAll"},[t._t("title"),t._v(" "),n("el-menu",{staticClass:"menuClass",attrs:{router:"","default-active":"path"in t.navArr[0]?t.$route.path:t.$route.name}},t._l(t.navArr,function(e,i){return n("el-menu-item",{key:i,staticStyle:{"text-align":"center"},attrs:{index:e.path?e.path:e.index},on:{click:function(n){t.emitClick(e,i)}}},[n("i",{class:e.icon}),t._v("  \n      "),n("span",{staticClass:"menuName"},[t._v(t._s(e.name))])])}))],2)},staticRenderFns:[]};var r={name:"form_index",components:{sxSubmenuControl:n("VU/8")(i,a,!1,function(t){n("BtdK")},"data-v-5c555d1d",null).exports},data:function(){return{navArr:[{index:"bdk",icon:"ercp-icon-module-form",name:"表单库"},{index:"zdk",icon:"ercp-icon-module-field",name:"字段库"},{index:"syk",icon:"ercp-icon-module-term",name:"术语库"}]}}},s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"formAll"},[e("div",{staticClass:"formContent"},[e("sx-submenu-control",{attrs:{navArr:this.navArr}},[e("div",{attrs:{slot:"title"},slot:"title"},[e("div",{staticClass:"slotFormClass"},[e("h1",[this._v(" 表单管理 ")]),this._v(" "),e("h5",{staticClass:"light-text"},[this._v("Form Management")])])])]),this._v(" "),e("router-view",{staticStyle:{width:"calc(100% - 160px)"}})],1)])},staticRenderFns:[]};var o=n("VU/8")(r,s,!1,function(t){n("PIVh")},"data-v-8148bb96",null);e.default=o.exports},PIVh:function(t,e){}});