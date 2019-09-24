webpackJsonp([3],{W2Q3:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("Xxa5"),a=r.n(n),s=r("exGp"),i=r.n(s),o={mounted:function(){this.draw()},props:{codeLength:{type:Number,default:4}},data:function(){return{codes:[],ctx:"",colors1:["#fff","#fff","#fff","#fff","#fff"],colors2:["#000","#000","#000","#000","#000"],code_Len:this.codeLength}},computed:{codeString:function(){for(var e="",t=0;t<this.codes.length;t++)e+=this.codes[t];return e.toUpperCase()}},watch:{codeString:function(e,t){this.$emit("change",e)}},methods:{generateRandom:function(){this.codes=[];for(var e="qwertyuiopasdfghjklzxcvbnm0123456789".split(""),t=0;t<this.code_Len;t++){var r=Math.floor(Math.random()*e.length);this.codes.push(e[r])}},draw:function(){this.generateRandom(),this.drawText()},drawLine:function(){for(var e=0;e<100;e++){this.ctx.strokeStyle=this.colors2[Math.floor(5*Math.random())],this.ctx.beginPath();var t=120*Math.random(),r=Math.floor(40*Math.random());this.ctx.moveTo(t,r),this.ctx.lineTo(t+1,r+1),this.ctx.stroke()}},drawText:function(){var e=this.$refs.canvas;this.ctx=e.getContext("2d"),this.ctx.fillStyle="#20272c",this.ctx.fillRect(0,0,120,40),this.ctx.font="20px Verdana";for(var t=15,r=0;r<4;r++)this.ctx.fillStyle=this.colors1[Math.floor(5*Math.random())],this.ctx.fillText(this.codes[r],t,25),t+=25;this.drawLine()}}},c={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"validate-code"},[t("canvas",{ref:"canvas",attrs:{width:"160px",height:"40px"},on:{click:this.draw}})])},staticRenderFns:[]};var l=r("VU/8")(o,c,!1,function(e){r("jwvq")},"data-v-f72f2834",null).exports,p=r("sF3y"),d=r("UKw4"),f={created:function(){if(this.$electron){var e=this.$electron.ipcRenderer;e.send("loginResize"),e.send("nonableResize"),e.send("center")}this.$store.commit("SET_TOKEN",""),this.$store.commit("SET_USER",null)},mounted:function(){if(this.env=this.$electron,d.getItem("api")&&d.getItem("port")){var e={api:d.api,port:d.port};this.apiUrl=e}else this.apiUrl={api:"",port:""}},data:function(){var e=this;return{showlock:!1,apiUrl:{},apiRules:{api:[{required:!0,message:"地址不能为空",trigger:"blur"}],port:[{required:!0,message:"端口号不能为空",trigger:"blur"}]},passwordType:"password",checkCode:"",form:{username:"",password:"",yanzhengma:""},rules:{username:[{required:!0,message:"账号不能为空",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"}],yanzhengma:[{validator:function(t,r,n){""===(r=r.toUpperCase())?(e.yanzhengmaHolder="",n(new Error("请输入验证码"))):r!==e.checkCode?(e.yanzhengmaHolder="",n(new Error("验证码错误")),e.$refs["validate-code"].draw()):n()},trigger:"blur"}]},yanzhengmaHolder:"请输入验证码",env:""}},methods:{lock:function(){var e,t=this;this.$refs.portForm.validate((e=i()(a.a.mark(function e(r){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=4;break}t.$confirm("此操作将修改地址参数，修改成功后需重新启动应用","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){if(d.api=t.apiUrl.api,d.port=t.apiUrl.port,t.showlock=!1,t.env){var e=t.$electron.ipcRenderer;setTimeout(function(){e.send("close")},2e3),t.$message({type:"success",message:"修改成功，本应用将于2秒后关闭，请重新启动应用"})}}).catch(function(){t.showlock=!1,t.$message({type:"info",message:"已取消"})}),e.next=5;break;case 4:return e.abrupt("return",!1);case 5:case"end":return e.stop()}},e,t)})),function(t){return e.apply(this,arguments)}))},_setCheckCode:function(e){this.checkCode=e},_togglePasswordType:function(){this.passwordType="password"===this.passwordType?"text":"password"},_updateCheckCode:function(){this.$refs["validate-code"].draw()},login:function(e){var t=this;return i()(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.$refs.loginForm.validate(function(){var e=i()(a.a.mark(function e(r){var n,s,i,o,c;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=8;break}return n={username:t.form.username,password:t.form.password},e.next=4,Object(p.g)(n);case 4:(s=e.sent).data&&"SUCCESS"===s.data.mitiStatus?(i=s.data.entity.User,o=s.data.entity.Token.token,t.$store.commit("SET_TOKEN",o),t.$store.commit("SET_USER",i),t.$router.push("/home"),t.env&&((c=t.$electron.ipcRenderer).send("hide"),c.send("mainResize"),c.send("ableResize"),c.send("center"))):(t._updateCheckCode(),t.$refs.password.resetField(),t.$refs.yanzhengma.resetField()),e.next=10;break;case 8:return t.form.yanzhengma="",e.abrupt("return",!1);case 10:case"end":return e.stop()}},e,t)}));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}},e,t)}))()},windwowOperate:function(e){if(this.env){var t=this.$electron.ipcRenderer;switch(e){case"mini":t.send("min");break;case"max":t.send("max");break;case"close":t.send("close")}}else this.$message.info("无效点击")}},components:{validateCode:l}},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"login"}},[r("div",{staticClass:"login-wrapper"},[e._m(0),e._v(" "),r("div",{staticClass:"right-login"},[e._m(1),e._v(" "),r("div",{staticClass:"login-form"},[r("el-form",{ref:"loginForm",attrs:{model:e.form,rules:e.rules}},[r("el-form-item",{attrs:{prop:"username"}},[r("el-input",{attrs:{placeholder:"请输入账号"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}},[r("i",{staticClass:"el-input__icon ercp-icon-general-account",staticStyle:{"font-size":"18px","line-height":"48px"},attrs:{slot:"prefix"},slot:"prefix"})])],1),e._v(" "),r("el-form-item",{ref:"password",attrs:{prop:"password"}},[r("el-input",{attrs:{type:e.passwordType,placeholder:"请输入密码"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.login("loginForm")}},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}},[r("i",{staticClass:"el-input__icon ercp-icon-general-password",staticStyle:{"font-size":"18px","line-height":"48px"},attrs:{slot:"prefix"},slot:"prefix"}),e._v(" "),r("i",{staticClass:"el-input__icon ercp-icon-general-preview",staticStyle:{cursor:"pointer","line-height":"48px"},attrs:{slot:"suffix"},on:{click:e._togglePasswordType},slot:"suffix"})])],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:13}},[r("el-form-item",{ref:"yanzhengma",attrs:{prop:"yanzhengma"}},[r("div",{staticClass:"check-code-wrapper"},[r("div",{staticClass:"yanzhengma-wrapper"},[r("el-input",{attrs:{placeholder:e.yanzhengmaHolder},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.login("loginForm")}},model:{value:e.form.yanzhengma,callback:function(t){e.$set(e.form,"yanzhengma",t)},expression:"form.yanzhengma"}},[r("i",{staticClass:"el-input__icon ercp-icon-general-vertify",staticStyle:{"font-size":"18px","line-height":"48px"},attrs:{slot:"prefix"},slot:"prefix"})])],1)])])],1),e._v(" "),r("el-col",{attrs:{span:11}},[r("div",{staticClass:"validate-code-wrapper"},[r("validate-code",{ref:"validate-code",on:{change:e._setCheckCode}})],1)])],1),e._v(" "),r("div",{staticStyle:{"margin-bottom":"0","margin-top":"40px",height:"48px"}},[r("el-col",{attrs:{span:24}},[r("el-button-group",{staticStyle:{width:"100%",display:"flex","justify-content":"center"}},[r("el-button",{staticClass:"login-btn",attrs:{type:"primary"},on:{click:function(t){e.login()}}},[e._v("\n                  登录系统\n                ")]),e._v(" "),e.env?r("el-button",{attrs:{icon:"ercp-icon-module-system",type:"primary"},on:{click:function(t){e.showlock=!0}}}):e._e()],1)],1)],1)],1)],1),e._v(" "),e.env?r("div",{staticClass:"close-button"},[r("i",{staticClass:"ercp-icon-general-minimine",on:{click:function(t){e.windwowOperate("mini")}}}),e._v(" "),r("i",{staticClass:"ercp-icon-general-close",on:{click:function(t){e.windwowOperate("close")}}})]):e._e()]),e._v(" "),r("el-dialog",{staticStyle:{"-webkit-app-region":"no-drag"},attrs:{title:"修改地址",modal:!0,"append-to-body":"","close-on-click-modal":!1,visible:e.showlock,center:"",width:"500px"},on:{"update:visible":function(t){e.showlock=t}}},[r("el-form",{ref:"portForm",attrs:{"label-position":"left",rules:e.apiRules,model:e.apiUrl}},[r("el-row",[r("el-col",{attrs:{span:18}},[r("el-form-item",{attrs:{label:"地址",prop:"api"}},[r("el-input",{model:{value:e.apiUrl.api,callback:function(t){e.$set(e.apiUrl,"api",t)},expression:"apiUrl.api"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:5,offset:1}},[r("el-form-item",{attrs:{label:"端口号",prop:"port"}},[r("el-input",{model:{value:e.apiUrl.port,callback:function(t){e.$set(e.apiUrl,"port",t)},expression:"apiUrl.port"}})],1)],1)],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer align-center",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.showlock=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.lock}},[e._v("确 定")])],1)],1)],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"left-bgi"},[t("img",{attrs:{src:r("bD10"),alt:""}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"login-title"},[t("img",{attrs:{src:r("75n2"),alt:""}}),this._v(" "),t("br"),this._v(" "),t("span",[this._v("信息录入管理系统")])])}]};var h=r("VU/8")(f,u,!1,function(e){r("eNwE"),r("zCq1")},"data-v-1b9a3d6a",null);t.default=h.exports},bD10:function(e,t,r){e.exports=r.p+"img/login.1755101.png"},eNwE:function(e,t){},jwvq:function(e,t){},zCq1:function(e,t){}});