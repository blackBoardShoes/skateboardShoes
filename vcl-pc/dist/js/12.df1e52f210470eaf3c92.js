webpackJsonp([12],{G0d2:function(t,n){},ItCA:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i={props:{navArr:{type:Array,default:function(){return[]}}},data:function(){return{}},methods:{emitClick:function(t,n){this.$emit("emitClick",{path:this.$route.path,name:this.$route.name,item:t,index:n})}}},a={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"formControlAll"},[t._t("title"),t._v(" "),e("el-menu",{staticClass:"menuClass",attrs:{router:"","default-active":"path"in t.navArr[0]?t.$route.path:t.$route.name}},t._l(t.navArr,function(n,i){return e("el-menu-item",{key:i,attrs:{index:n.path?n.path:n.index},on:{click:function(e){t.emitClick(n,i)}}},[e("i",{class:n.icon}),t._v(" "),e("span",{staticClass:"menuName"},[t._v(t._s(n.name))])])}))],2)},staticRenderFns:[]};var s={name:"form_index",components:{sxSubmenuControl:e("VU/8")(i,a,!1,function(t){e("w13n")},"data-v-754f58d5",null).exports},data:function(){return{navArr:[{index:"bdk",icon:"el-icon-setting",name:"表单库"},{index:"zdk",icon:"el-icon-setting",name:"字段库"},{index:"syk",icon:"el-icon-setting",name:"术语库"}]}}},r={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"formAll"},[n("div",{staticClass:"formContent"},[n("sx-submenu-control",{attrs:{navArr:this.navArr}},[n("div",{attrs:{slot:"title"},slot:"title"},[n("div",{staticClass:"slotFormClass"},[n("h1",[this._v(" 表单管理 ")]),this._v(" "),n("span",[this._v("Form Management")])])])]),this._v(" "),n("router-view")],1)])},staticRenderFns:[]};var o=e("VU/8")(s,r,!1,function(t){e("G0d2")},"data-v-083424d0",null);n.default=o.exports},w13n:function(t,n){}});