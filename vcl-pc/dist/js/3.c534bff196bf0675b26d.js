webpackJsonp([3],{"0CHp":function(e,t){},W2Q3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("Xxa5"),s=n.n(r),a=n("exGp"),i=n.n(a),o={mounted:function(){this.draw()},props:{codeLength:{type:Number,default:4}},data:function(){return{codes:[],ctx:"",colors1:["#fff","#fff","#fff","#fff","#fff"],colors2:["#000","#000","#000","#000","#000"],code_Len:this.codeLength}},computed:{codeString:function(){for(var e="",t=0;t<this.codes.length;t++)e+=this.codes[t];return e.toUpperCase()}},watch:{codeString:function(e,t){this.$emit("change",e)}},methods:{generateRandom:function(){this.codes=[];for(var e="qwertyuiopasdfghjklzxcvbnm0123456789".split(""),t=0;t<this.code_Len;t++){var n=Math.floor(Math.random()*e.length);this.codes.push(e[n])}},draw:function(){this.generateRandom(),this.drawText()},drawLine:function(){for(var e=0;e<300;e++){this.ctx.strokeStyle=this.colors2[Math.floor(5*Math.random())],this.ctx.beginPath();var t=120*Math.random(),n=Math.floor(40*Math.random());this.ctx.moveTo(t,n),this.ctx.lineTo(t+1,n+1),this.ctx.stroke()}},drawText:function(){var e=this.$refs.canvas;this.ctx=e.getContext("2d"),this.ctx.fillStyle="#20272c",this.ctx.fillRect(0,0,100,40),this.ctx.font="20px Verdana";for(var t=15,n=0;n<4;n++)this.ctx.fillStyle=this.colors1[Math.floor(5*Math.random())],this.ctx.fillText(this.codes[n],t,25),t+=25;this.drawLine()}}},c={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"validate-code"},[t("canvas",{ref:"canvas",attrs:{width:"160px",height:"40px"},on:{click:this.draw}})])},staticRenderFns:[]};var l=n("VU/8")(o,c,!1,function(e){n("kGod")},"data-v-91116dbc",null).exports,d=n("sF3y"),f={created:function(){if(this.$electron){var e=this.$electron.ipcRenderer;e.send("loginResize"),e.send("nonableResize"),e.send("center")}this.$store.commit("SET_TOKEN",""),this.$store.commit("SET_USER",null)},mounted:function(){this.env=this.$electron},data:function(){var e=this;return{passwordType:"password",checkCode:"",form:{username:"",password:"",yanzhengma:""},rules:{username:[{required:!0,message:"账号不能为空",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"}],yanzhengma:[{validator:function(t,n,r){""===(n=n.toUpperCase())?(e.yanzhengmaHolder="",r(new Error("请输入验证码"))):n!==e.checkCode?(e.yanzhengmaHolder="",r(new Error("验证码错误")),e.$refs["validate-code"].draw()):r()},trigger:"blur"}]},yanzhengmaHolder:"请输入验证码",env:""}},methods:{_setCheckCode:function(e){this.checkCode=e},_togglePasswordType:function(){this.passwordType="password"===this.passwordType?"text":"password"},_updateCheckCode:function(){this.$refs["validate-code"].draw()},login:function(e){var t=this;return i()(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.$refs.loginForm.validate(function(){var e=i()(s.a.mark(function e(n){var r,a,i,o,c;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=8;break}return r={username:t.form.username,password:t.form.password},e.next=4,Object(d.g)(r);case 4:(a=e.sent).data&&"SUCCESS"===a.data.mitiStatus?(i=a.data.entity.User,o=a.data.entity.Token.token,t.$store.commit("SET_TOKEN",o),t.$store.commit("SET_USER",i),t.$router.push("/home"),t.env&&((c=t.$electron.ipcRenderer).send("hide"),c.send("mainResize"),c.send("ableResize"),c.send("center"))):(t._updateCheckCode(),t.$refs.password.resetField(),t.$refs.yanzhengma.resetField()),e.next=10;break;case 8:return t.form.yanzhengma="",e.abrupt("return",!1);case 10:case"end":return e.stop()}},e,t)}));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}},e,t)}))()},windwowOperate:function(e){if(this.env){var t=this.$electron.ipcRenderer;switch(e){case"mini":t.send("min");break;case"max":t.send("max");break;case"close":t.send("close")}}else this.$message.info("无效点击")}},components:{validateCode:l}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"login"}},[n("div",{staticClass:"login-wrapper"},[e._m(0),e._v(" "),n("div",{staticClass:"right-login"},[e._m(1),e._v(" "),n("div",{staticClass:"login-form"},[n("el-form",{ref:"loginForm",attrs:{model:e.form,rules:e.rules}},[n("el-form-item",{attrs:{prop:"username"}},[n("el-input",{attrs:{placeholder:"请输入账号"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}},[n("i",{staticClass:"el-input__icon ercp-icon-general-account",staticStyle:{"font-size":"18px","line-height":"48px"},attrs:{slot:"prefix"},slot:"prefix"})])],1),e._v(" "),n("el-form-item",{ref:"password",attrs:{prop:"password"}},[n("el-input",{attrs:{type:e.passwordType,placeholder:"请输入密码"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.login("loginForm")}},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}},[n("i",{staticClass:"el-input__icon ercp-icon-general-password",staticStyle:{"font-size":"18px","line-height":"48px"},attrs:{slot:"prefix"},slot:"prefix"}),e._v(" --\x3e\n              "),n("i",{staticClass:"el-input__icon ercp-icon-general-preview",staticStyle:{cursor:"pointer","line-height":"48px"},attrs:{slot:"suffix"},on:{click:e._togglePasswordType},slot:"suffix"})])],1),e._v(" "),n("el-row",[n("el-col",{attrs:{span:13}},[n("el-form-item",{ref:"yanzhengma",attrs:{prop:"yanzhengma"}},[n("div",{staticClass:"check-code-wrapper"},[n("div",{staticClass:"yanzhengma-wrapper"},[n("el-input",{attrs:{placeholder:e.yanzhengmaHolder},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.login("loginForm")}},model:{value:e.form.yanzhengma,callback:function(t){e.$set(e.form,"yanzhengma",t)},expression:"form.yanzhengma"}},[n("i",{staticClass:"el-input__icon ercp-icon-general-vertify",staticStyle:{"font-size":"18px","line-height":"48px"},attrs:{slot:"prefix"},slot:"prefix"})])],1)])])],1),e._v(" "),n("el-col",{attrs:{span:11}},[n("div",{staticClass:"validate-code-wrapper"},[n("validate-code",{ref:"validate-code",on:{change:e._setCheckCode}})],1)])],1),e._v(" "),n("div",{staticStyle:{"margin-bottom":"0","margin-top":"40px",height:"48px"}},[n("el-col",{attrs:{offset:6,span:12}},[n("el-button",{staticClass:"login-btn",staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:function(t){e.login()}}},[e._v("\n                登录系统\n              ")])],1)],1)],1)],1),e._v(" "),e.env?n("div",{staticClass:"close-button"},[n("i",{staticClass:"ercp-icon-general-minimine",on:{click:function(t){e.windwowOperate("mini")}}}),e._v(" "),n("i",{staticClass:"ercp-icon-general-close",on:{click:function(t){e.windwowOperate("close")}}})]):e._e()])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"left-bgi"},[t("img",{attrs:{src:n("dDpO"),alt:""}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"login-title"},[t("img",{attrs:{src:n("75n2"),alt:""}}),this._v(" "),t("br"),this._v(" "),t("span",[this._v("信息录入管理系统")])])}]};var h=n("VU/8")(f,p,!1,function(e){n("0CHp"),n("h6kp")},"data-v-2163ec30",null);t.default=h.exports},dDpO:function(e,t,n){e.exports=n.p+"img/登录框.1755101.png"},h6kp:function(e,t){},kGod:function(e,t){}});