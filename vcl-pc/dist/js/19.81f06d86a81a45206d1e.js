webpackJsonp([19],{5973:function(e,t){},MBAZ:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("Xxa5"),i=s.n(a),r=s("exGp"),n=s.n(r),c=s("UuhT"),l={name:"message_receive",data:function(){return{messageType:"1",visible:!1,searchText:"",messageList:[],showRecall:!1,recallMessage:{receivers:[],title:"",message:""},rules:{receivers:[{required:!0,message:"请至少选择一个发送对象",trigger:"focus"}],title:[{min:1,max:15,message:"字数在15字以内",trigger:"change"},{required:!0,message:"请输入消息主题",trigger:"focus"}],message:[{required:!0,message:"请输入消息正文",trigger:"focus"}]},pageSize:10,currentPage:1,total:0}},methods:{getMyMessage:function(e,t,s){var a=this;return n()(i.a.mark(function r(){var n,l;return i.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return n={keyword:"receive",userId:a.$store.state.user.id,perpage:t,currentPage:s,type:e},i.next=3,Object(c.d)(n);case 3:"SUCCESS"===(l=i.sent).data.mitiStatus?(a.total=l.data.entity.total,a.messageList=l.data.entity.data):a.$message.error("ERROR: "+l.data.message);case 5:case"end":return i.stop()}},r,a)}))()},changeType:function(){this.getMyMessage(this.messageType,this.pageSize,this.currentPage)},messageAllRead:function(){var e=this;return n()(i.a.mark(function t(){var s,a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s={userId:e.$store.state.user.id,type:e.messageType},t.next=3,Object(c.a)(s);case 3:"SUCCESS"===(a=t.sent).data.mitiStatus?(e.$message.success(a.data.entity),e.getMyMessage(e.messageType,e.pageSize,e.currentPage)):e.$message.error("ERROR: "+a.data.message);case 5:case"end":return t.stop()}},t,e)}))()},messageAllClear:function(){var e=this;return n()(i.a.mark(function t(){var s,a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s={userId:e.$store.state.user.id,keyword:"receive",type:e.messageType},t.next=3,Object(c.b)(s);case 3:"SUCCESS"===(a=t.sent).data.mitiStatus?(e.$message.success(a.data.entity),e.getMyMessage(e.messageType,e.pageSize,e.currentPage)):e.$message.error("ERROR: "+a.data.message);case 5:case"end":return t.stop()}},t,e)}))()},showPopoper:function(e){""!==e&&(this.visible=!0)},searchMessage:function(){var e=this;return n()(i.a.mark(function t(){var s,a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s={userId:e.$store.state.user.id,searchText:e.searchText,keyword:"receive",perPage:e.pageSize,currentPage:e.currentPage,type:e.messageType},t.next=3,Object(c.c)(s);case 3:"SUCCESS"===(a=t.sent).data.mitiStatus?(e.total=a.data.entity.total,e.messageList=a.data.entity.data):e.$message.error("ERROR: "+a.data.message);case 5:case"end":return t.stop()}},t,e)}))()},search:function(e){var t=this;return n()(i.a.mark(function s(){var a,r;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return a={mode:e,userId:t.$store.state.user.id,like:t.searchText,keyword:"receive",perPage:t.pageSize,currentPage:1,type:t.messageType},s.next=3,Object(c.c)(a);case 3:"SUCCESS"===(r=s.sent).data.mitiStatus?(t.total=r.data.entity.total,t.messageList=r.data.entity.data):t.$message.error("ERROR: "+r.data.message);case 5:case"end":return s.stop()}},s,t)}))()},singleMark:function(e){var t=this;return n()(i.a.mark(function s(){var a,r;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(0!==e.isRead){s.next=6;break}return a=e.id,s.next=4,Object(c.g)(a);case 4:"SUCCESS"===(r=s.sent).data.mitiStatus?(t.$message.success(r.data.entity),t.getMyMessage(t.messageType,t.pageSize,t.currentPage)):t.$message.error("ERROR: "+r.data.message);case 6:case"end":return s.stop()}},s,t)}))()},recall:function(e){this.showRecall=!0,this.recallMessage.receivers=[],this.recallMessage.title="Re「"+(e.title.length>=11?e.title.slice(0,11):e.title)+"」",this.recallMessage.receivers.push(e.sendUser.name),this.recallMessage.backReceiver=e.sendUser.id},cancel:function(){this.showRecall=!1,this.$refs.reMessage.resetFields()},confirmSend:function(){var e=this;return n()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.$refs.reMessage.validate(function(){var t=n()(i.a.mark(function t(s){var a,r;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!s){t.next=9;break}return(a={receivers:[e.recallMessage.backReceiver],title:e.recallMessage.title,message:e.recallMessage.message,type:1}).sender=e.$store.state.user.id,t.next=5,Object(c.f)(a);case 5:"SUCCESS"===(r=t.sent).data.mitiStatus?(e.$message.success(r.data.entity),e.$refs.reMessage.resetFields(),e.showRecall=!1):e.$message.error("ERROR: "+r.data.message),t.next=10;break;case 9:return t.abrupt("return",!1);case 10:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}},t,e)}))()},deleteSingle:function(e){var t=this;return n()(i.a.mark(function s(){var a,r;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return a={mailId:e.id,messageType:"receive"},s.next=3,Object(c.e)(a);case 3:"SUCCESS"===(r=s.sent).data.mitiStatus?(t.$message.success(r.data.entity),t.getMyMessage(t.messageType,t.pageSize,t.currentPage)):t.$message.error("ERROR: "+r.data.message);case 5:case"end":return s.stop()}},s,t)}))()},SizeChange:function(e){this.pageSize=e,this.getMyMessage(this.messageType,this.pageSize,this.currentPage)},changePage:function(e){this.currentPage=e,this.getMyMessage(this.messageType,this.pageSize,this.currentPage)}},mounted:function(){this.getMyMessage(this.messageType,this.pageSize,this.currentPage)},watch:{searchText:{handler:function(e){this.visible=""!==e},deep:!0}}},o={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"receive"}},[s("div",{staticClass:"top-nav"},[s("el-radio-group",{on:{change:e.changeType},model:{value:e.messageType,callback:function(t){e.messageType=t},expression:"messageType"}},[s("el-radio-button",{attrs:{label:"1"}},[e._v("用户消息")]),e._v(" "),s("el-radio-button",{attrs:{label:"2"}},[e._v("系统消息")])],1),e._v(" "),s("div",{staticStyle:{"margin-right":"20px"}},[s("el-button",{attrs:{type:"primary"},on:{click:e.messageAllRead}},[s("i",{staticClass:"ercp-icon-general-read"}),e._v(" 全部标记为已读")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.messageAllClear}},[s("i",{staticClass:"ercp-icon-general-clean"}),e._v(" 全部清空")])],1),e._v(" "),s("el-popover",{attrs:{placement:"bottom-start",width:"225",trigger:"manual"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[s("div",{staticClass:"select-type",staticStyle:{"line-height":"36px",cursor:"pointer",transform:"scale(1.1, 1.2)","font-size":"12px","text-align":"center"}},[s("div",{staticClass:"hover-bgc",staticStyle:{width:"100%",padding:"0 10px","box-sizing":"border-box",height:"36px"},on:{click:function(t){e.search("title")}}},[s("span",{staticClass:"float-left"},[e._v("搜索主题包含")]),e._v(" "),s("div",{staticClass:"text-overflow-ellipsis",staticStyle:{width:"90px",float:"left",padding:"0 2px"}},[s("b",[e._v("「 "+e._s(e.searchText)+" 」")])]),e._v(" "),s("span",{staticClass:"float-left"},[e._v("的消息")])]),e._v(" "),s("div",{staticClass:"hover-bgc",staticStyle:{width:"100%",padding:"0 10px","box-sizing":"border-box",height:"36px"},on:{click:function(t){e.search("message")}}},[s("span",{staticClass:"float-left"},[e._v("搜索正文包含")]),e._v(" "),s("div",{staticClass:"text-overflow-ellipsis",staticStyle:{width:"90px",float:"left",padding:"0 2px"}},[s("b",[e._v("「 "+e._s(e.searchText)+" 」")])]),e._v(" "),s("span",{staticClass:"float-left"},[e._v("的消息")])]),e._v(" "),s("div",{staticClass:"hover-bgc",staticStyle:{width:"100%",padding:"0 10px","box-sizing":"border-box",height:"36px"},on:{click:function(t){e.search("sender")}}},[s("span",{staticClass:"float-left"},[e._v("搜索发件人为")]),e._v(" "),s("div",{staticClass:"text-overflow-ellipsis",staticStyle:{width:"90px",float:"left",padding:"0 2px"}},[s("b",[e._v("「 "+e._s(e.searchText)+" 」")])]),e._v(" "),s("span",{staticClass:"float-left"},[e._v("的消息")])])]),e._v(" "),s("el-input",{staticStyle:{width:"251px"},attrs:{slot:"reference",placeholder:"搜索信息",clearable:""},slot:"reference",model:{value:e.searchText,callback:function(t){e.searchText=t},expression:"searchText"}},[s("i",{staticClass:"el-input__icon el-icon-search",staticStyle:{cursor:"pointer"},attrs:{slot:"prefix"},slot:"prefix"})])],1)],1),e._v(" "),s("div",{staticClass:"message-list"},[s("div",{staticClass:"message-box"},[e._m(0),e._v(" "),0===e.messageList.length?s("div",{staticClass:"no-message light-text"},[e._v("\n        暂无消息\n      ")]):e._e(),e._v(" "),s("el-collapse",{attrs:{accordion:""}},e._l(e.messageList,function(t,a){return s("el-collapse-item",{key:a,staticStyle:{position:"relative"}},[s("div",{staticClass:"message-case",attrs:{slot:"title"},slot:"title"},[s("div",{class:{read:!0,"not-readyet":0===t.isRead}}),e._v(" "),s("div",{staticClass:"message-title",on:{click:function(s){e.singleMark(t)}}},[s("div",{staticClass:"sender text-overflow-ellipsis"},[s("span",{class:{"primary-text":0===t.isRead}},[e._v(e._s(0===t.type?"系统通知":null===t.sendUser?"无发件人":t.sendUser.name))])])]),e._v(" "),s("div",{staticClass:"message-content",on:{click:function(s){e.singleMark(t)}}},[s("div",{staticClass:"theme"},[e._v(e._s(t.title))]),e._v(" "),s("div",{staticClass:"content light-text"},[e._v(" - "+e._s(t.message))])]),e._v(" "),s("div",{staticClass:"send-time",on:{click:function(s){e.singleMark(t)}}},[s("div",{staticClass:"date"},[e._v("20"+e._s(t.sendTime))])]),e._v(" "),s("div",{staticClass:"operate"},[s("div",{staticClass:"inside"},[s("el-tooltip",{attrs:{effect:"dark",content:"回复消息",placement:"top"}},[1===t.type?s("i",{staticClass:"ercp-icon-general-forward primary-text",on:{click:function(s){s.stopPropagation(),e.recall(t)}}}):e._e()]),e._v(" "),s("el-tooltip",{attrs:{effect:"dark",content:"删除消息",placement:"top"}},[s("i",{staticClass:"ercp-icon-general-remove light-text",on:{click:function(s){s.stopPropagation(),e.deleteSingle(t)}}})])],1)])]),e._v(" "),s("div",{staticClass:"message-view"},[s("b",[e._v("消息正文：")]),s("span",{staticClass:"light-text"},[e._v(e._s(t.message))])])])}))],1)]),e._v(" "),s("div",{staticClass:"pagination align-right"},[s("el-pagination",{attrs:{layout:"total, sizes, prev, pager, next, jumper","page-sizes":[5,10,15,20],total:e.total,"current-page":e.currentPage,"page-size":e.pageSize},on:{"size-change":e.SizeChange,"current-change":e.changePage}})],1),e._v(" "),s("el-dialog",{attrs:{title:"回复来自  「"+e.recallMessage.receivers[0]+"」 的消息",visible:e.showRecall,modal:!0,"append-to-body":"",width:"700px"},on:{"update:visible":function(t){e.showRecall=t}}},[s("el-form",{ref:"reMessage",attrs:{rules:e.rules,model:e.recallMessage,"label-position":"right","label-width":"80px"}},[s("el-form-item",{attrs:{prop:"receivers",label:"收件人"}},[s("el-select",{staticStyle:{"margin-right":"20px",width:"100%"},attrs:{multiple:"",disabled:""},model:{value:e.recallMessage.receivers,callback:function(t){e.$set(e.recallMessage,"receivers",t)},expression:"recallMessage.receivers"}})],1),e._v(" "),s("el-form-item",{attrs:{prop:"title",label:"消息主题"}},[s("el-input",{model:{value:e.recallMessage.title,callback:function(t){e.$set(e.recallMessage,"title",t)},expression:"recallMessage.title"}})],1),e._v(" "),s("el-form-item",{attrs:{prop:"message",label:"消息正文"}},[s("el-input",{attrs:{clearable:"",type:"textarea",autosize:{minRows:6,maxRows:12}},model:{value:e.recallMessage.message,callback:function(t){e.$set(e.recallMessage,"message",t)},expression:"recallMessage.message"}})],1)],1),e._v(" "),s("div",{staticClass:"operate align-center"},[s("el-button",{attrs:{type:"info"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.confirmSend}},[e._v("确定")])],1)],1)],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"message-box-title light-text"},[t("div",{staticClass:"sender-title"},[this._v("发件人")]),this._v(" "),t("div",{staticClass:"theme-title"},[this._v("主题 - 正文")]),this._v(" "),t("div",{staticClass:"sendtime-title"},[this._v("时间")]),this._v(" "),t("div",{staticClass:"operate-title"},[this._v("操作")])])}]};var g=s("VU/8")(l,o,!1,function(e){s("5973")},"data-v-8fb563f0",null);t.default=g.exports}});