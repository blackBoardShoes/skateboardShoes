webpackJsonp([7],{LomH:function(e,t){},iF77:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"support-center"},[e._m(0),e._v(" "),s("div",{staticClass:"main-question"},[s("div",{staticClass:"qus-nav"},[s("el-collapse",{attrs:{accordion:""},on:{change:e.handleChange},model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},e._l(e.treeQuestions,function(t,n){return s("el-collapse-item",{key:n,attrs:{name:n}},[s("template",{slot:"title"},[s("div",{staticClass:"header",staticStyle:{"text-indent":"2em","font-weight":"900"}},[e._v("\n               "+e._s(t.trunkTitle)+"\n             ")])]),e._v(" "),e._l(t.trunkQuestions,function(t,i){return s("div",{key:i,class:{"active-question":i===e.activeIndex2&&n===e.activeIndex1,question:!0},on:{click:function(t){e.handSelect(n,i)}}},[s("span",{class:{"el-icon-caret-right":i===e.activeIndex2&&n===e.activeIndex1,"leaf-title":!0}},[e._v(e._s(t.leafTitle))])])})],2)}))],1),e._v(" "),s("div",{staticClass:"qus-main"},["query"!==e.currentQus.type?s("div",{staticClass:"current-qustions"},[s("h2",[e._v(e._s(e.treeQuestions[e.activeIndex1].trunkTitle)+" / "),s("span",{staticStyle:{"font-size":"16px","font-weight":"600"}},[e._v(e._s(e.currentQus.leafTitle)+" ：")])]),e._v(" "),s("ul",[0===e.currentQus.leafQuestions.length?s("p",[e._v("暂无")]):e._e(),e._v(" "),e._l(e.currentQus.leafQuestions,function(t,n){return"step"===e.currentQus.type?s("li",{key:n},[s("p",[e._v(e._s(n+1)+"、"+e._s(t.step))]),e._v(" "),t.tips?s("p",{staticClass:"attention"},[e._v("注意："+e._s(t.tips))]):e._e(),e._v(" "),t.imgSrc?s("img",{attrs:{src:t.imgSrc,alt:""}}):e._e()]):e._e()}),e._v(" "),e._l(e.currentQus.leafQuestions,function(t,n){return"faqs"===e.currentQus.type?s("li",{key:n},[s("p",[s("i",{staticClass:"el-icon-question"}),e._v(" "),s("span",[e._v(" "+e._s(t.ask))])]),e._v(" "),s("p",[e._v(" 答："+e._s(t.answer))])]):e._e()})],2)]):e._e()])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"search"},[t("div",{staticClass:"search-input"},[this._v("\n     帮助中心\n   ")])])}]};var i=s("VU/8")({data:function(){return{treeQuestions:[{trunkTitle:"模块1",trunkQuestions:[{type:"step",leafTitle:"步骤类",leafQuestions:[{step:"步骤1"},{step:"步骤2"},{step:"步骤3"},{step:"步骤4"}]},{type:"faqs",leafTitle:"常见问题",leafQuestions:[{ask:"问题1",answer:"回答1"},{ask:"问题2",answer:"回答2"},{ask:"问题3",answer:"回答3"}]}]},{trunkTitle:"模块2",trunkQuestions:[{type:"step",leafTitle:"步骤类",leafQuestions:[{step:"步骤1"},{step:"步骤2"},{step:"步骤3"},{step:"步骤4"}]},{type:"faqs",leafTitle:"常见问题",leafQuestions:[{ask:"问题1",answer:"回答1"},{ask:"问题2",answer:"回答2"},{ask:"问题3",answer:"回答3"}]}]},{trunkTitle:"模块3",trunkQuestions:[{type:"step",leafTitle:"步骤类",leafQuestions:[{step:"步骤1"},{step:"步骤2"},{step:"步骤3"},{step:"步骤4"}]},{type:"faqs",leafTitle:"常见问题",leafQuestions:[{ask:"问题1",answer:"回答1"},{ask:"问题2",answer:"回答2"},{ask:"问题3",answer:"回答3"}]}]}],activeNames:0,activeIndex1:0,activeIndex2:0,currentQus:""}},created:function(){this.currentQus=this.treeQuestions[this.activeNames].trunkQuestions[0]},mounted:function(){},methods:{handleChange:function(e){},handSelect:function(e,t){this.activeIndex1=e,this.activeIndex2=t,this.currentQus=this.treeQuestions[e].trunkQuestions[t],this.filterText=""}}},n,!1,function(e){s("LomH")},"data-v-49dfd273",null);t.default=i.exports}});