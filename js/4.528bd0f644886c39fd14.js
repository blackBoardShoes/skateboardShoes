webpackJsonp([4],{"5Z0N":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("Xxa5"),n=a.n(r),i=a("Gu7T"),o=a.n(i),s=a("woOf"),c=a.n(s),l=a("exGp"),u=a.n(l),f=a("gyMJ"),m=a("sICn").proxyTableApi,p=m.api,d=(m.hot,function(t){return f.a.get(p+"/fields",t)}),h={name:"HelloWorld",data:function(){return{momo:[],gainData:!1,confirmTemplateDialogVisible:!1,confirmAllFish:{fields:[{id:"id",label:"ID",value:"",type:"INPUT",validations:[{pattern:"^[a-zA-Z][a-zA-Z0-9]*$",message:"只能输入以英文字母开头的英文或数字",trigger:"change"}]},{id:"name",label:"模板名字",value:"",type:"INPUT",validations:[{required:!0,message:"请输入模板名",trigger:"change"},{pattern:"^[^\\s~！@#￥%……&*（）——+~!@#$%^&*()_+]*$",message:"不能输入空格或特殊字符",trigger:"change"}]},{id:"description",label:"描述",value:"",type:"TEXTAREA",validations:[{pattern:"^[^\\s~！@#￥%……&*（）——+~!@#$%^&*()_+]*$",message:"不能输入空格或特殊字符",trigger:"change"}]}]},submitData:{}}},computed:{},created:function(){this.firstShow()},methods:{firstShow:function(){var t=this;return u()(n.a.mark(function e(){var a,r;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n=void 0,f.a.get(p+"/forms",n);case 2:return(a=e.sent)&&c()(t.mozhu,a.data.entity[0]),e.next=6,d();case 6:(r=e.sent)&&(t.momo=[].concat(o()(r.data.entity))),t.gainData=!0;case 9:case"end":return e.stop()}var n},e,t)}))()},createFish:function(t){var e=this;return u()(n.a.mark(function a(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a=t,f.a.post(p+"/field",a);case 2:e.sent;case 4:case"end":return e.stop()}var a},a,e)}))()},consoleData:function(t,e,a,r,i,o,s){var l=this;return u()(n.a.mark(function t(){return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:l.submitData.fields=i,c()(l.submitData,{relation:a},{errors:o},{comments:s}),l.confirmTemplateDialogVisible=!0;case 3:case"end":return t.stop()}},t,l)}))()},notVerifying:function(t,e,a,r,i,o,s){var l=this;return u()(n.a.mark(function t(){return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:l.submitData.fields=i,c()(l.submitData,{relation:a},{errors:o},{comments:s}),l.confirmTemplateDialogVisible=!0;case 4:case"end":return t.stop()}},t,l)}))()},confirmData:function(t,e,a,r,i,o,s){var l=this;return u()(n.a.mark(function t(){return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return c()(l.submitData,e),t.next=4,a=l.submitData,f.a.post(p+"/form",a);case 4:t.sent,l.confirmTemplateDialogVisible=!1;case 7:case"end":return t.stop()}var a},t,l)}))()},sortAfterData:function(t){}}},g={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("div",{staticClass:"content"},[t.gainData?a("sx-form",{attrs:{add:"",edit:"",sort:"",momo:t.momo,mozhu:t.mozhu},on:{consoleData:t.consoleData,createFish:t.createFish,notVerifying:t.notVerifying,sortAfterData:t.sortAfterData}}):t._e()],1),t._v(" "),t.confirmTemplateDialogVisible?a("el-dialog",{attrs:{title:"创建模板",visible:t.confirmTemplateDialogVisible},on:{"update:visible":function(e){t.confirmTemplateDialogVisible=e}}},[a("div",{staticStyle:{width:"100%"}},[a("sx-form",{staticStyle:{width:"100%"},attrs:{mozhu:t.confirmAllFish},on:{consoleData:t.confirmData}})],1)]):t._e()],1)},staticRenderFns:[]};var v=a("VU/8")(h,g,!1,function(t){a("CIcr")},"data-v-2d8bcab0",null);e.default=v.exports},CIcr:function(t,e){},sICn:function(t,e,a){var r={"/api":{target:"http://192.168.10.196:8089",changeOrigin:!0,pathRewrite:{"^/api":"/"}},"/hot":{target:"http://echarts.baidu.com/",changeOrigin:!0,pathRewrite:{"^/hot":"/"}}},n={};for(var i in r)n[i.replace(/\//,"")]=i;t.exports={proxyTable:r,proxyTableApi:n,gzip:!0}}});