webpackJsonp([2],{"8HV8":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={props:{value:{type:String,default:function(){return""}},calculateData:{type:Array,default:function(){return["1","2","3","1","2","3","1","2","3","1","2","3","1","2","3","1","2","3"]}}},data:function(){return{a:"",calculateMethods:[["+","primary"],["-","primary"],["*","primary"],["/","primary"],["^","primary"],["%","primary"],["(","warning"],[")","warning"]],calculateNumber:[["0","default"],["1","default"],["2","default"],["3","default"],["4","default"],["5","default"],["6","default"],["7","default"],["8","default"],["9","default"],[".","default"]],formula:this.value}},computed:{},created:function(){},watch:{formula:function(){this.$emit("input",this.formula)}},methods:{createFormula:function(e,t){var a=this.formula.slice(this.formula.length-1,this.formula.length),r=/^[a-zA-Z]+$/,i=/^[0-9.]+$/,l=/^[%\-*+\\^/]$/,n=/^[(]$/,o=/^[)]$/,s=/[(]/g,u=/[)]/g;if(l.test(e)&l.test(a))this.formula=this.formula.slice(0,this.formula.length-1)+e;else{if(!a)return void(i.test(e)|r.test(e)|u.test(e)?this.formula="("+this.formula+e:n.test(e)?this.formula=this.formula+e:l.test(e)&&(this.formula="(0"+this.formula+e));if(r.test(a)&l.test(e)|r.test(a)&o.test(e)|i.test(a)&l.test(e)|i.test(a)&i.test(e)|i.test(a)&o.test(e)|l.test(a)&r.test(e)|l.test(a)&i.test(e)|l.test(a)&n.test(e)|n.test(a)&n.test(e)|n.test(a)&o.test(e)|n.test(a)&r.test(e)|n.test(a)&i.test(e)|o.test(a)&l.test(e)){var c=this.formula.match(s)?this.formula.match(s).length:[],d=this.formula.match(u)?this.formula.match(u).length:[];if(o.test(e)&&d>=c)return void this.$message({showClose:!0,message:"公式不允许",type:"warning"});this.formula=this.formula+e}}},cutOut:function(){var e=this.formula.slice(this.formula.length-1,this.formula.length),t=this.formula.match(/[a-zA-Z0-9]+/g);/^[%\-*+^./()]$/.test(e)?this.formula=this.formula.slice(0,this.formula.length-1):t&&(this.formula=this.formula.slice(0,this.formula.length-t[t.length-1].length))},clearFormula:function(){this.formula=""}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"allCalculate"},[a("div",{staticClass:"ContentCalculate"},[a("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",filterable:""},on:{change:e.createFormula},model:{value:e.a,callback:function(t){e.a=t},expression:"a"}},e._l(e.calculateData,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.id}})})),e._v(" "),a("br"),e._v(" "),a("br"),e._v(" "),a("el-button-group",e._l(e.calculateNumber,function(t,r){return a("el-button",{key:r,attrs:{size:"mini",plain:"",type:t[1]},on:{click:function(a){e.createFormula(t[0],r)}}},[e._v(" "+e._s(t[0])+" ")])})),e._v(" "),a("br"),e._v(" "),a("br"),e._v(" "),a("el-button-group",e._l(e.calculateMethods,function(t,r){return a("el-button",{key:r,attrs:{size:"mini",type:t[1]},on:{click:function(a){e.createFormula(t[0],r)}}},[e._v(" "+e._s(t[0])+" ")])})),e._v("\n     \n    "),a("el-button",{attrs:{size:"mini",plain:"",circle:"",icon:"el-icon-close"},on:{click:e.cutOut}}),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger",plain:"",circle:""},on:{click:e.clearFormula}},[e._v("AC")]),e._v(" "),a("br"),a("br"),e._v(" "),a("span",{staticClass:"calcultatePresent"},[e._v("\n      "+e._s(e.formula)+"\n    ")])],1)])},staticRenderFns:[]};var l=a("VU/8")(r,i,!1,function(e){a("rqSJ")},"data-v-418f8c64",null);t.default=l.exports},J64a:function(e,t){},JewT:function(e,t){},KjAO:function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("7+uW"),i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var l=a("VU/8")({name:"App"},i,!1,function(e){a("Vbxe")},null,null).exports,n=a("/ocq");r.default.use(n.a);var o=new n.a({routes:[{path:"/c",name:"start",component:function(){return new Promise(function(e){e()}).then(a.bind(null,"8HV8"))}},{path:"/",name:"c",component:function(){return a.e(0).then(a.bind(null,"5Z0N"))}}]}),s=a("gyMJ"),u=a("NYxO"),c={},d={increment:function(e,t){e.count+=t.number}},f={increment:function(e,t){e.commit("increment",t)}};r.default.use(u.a);var h=new u.a.Store({state:{count:[]},getters:c,mutations:d,actions:f}),p=a("tfGq"),v=a.n(p),m=a("zL8q"),b=a.n(m),y=(a("tvR6"),a("pFYg")),g=a.n(y),_=a("Xxa5"),E=a.n(_),A=a("BO1k"),T=a.n(A),x=a("exGp"),D=a.n(x),w=a("woOf"),k=a.n(w),C=a("Gu7T"),M=a.n(C),R={props:{tableData:{type:Object,default:function(){return{values:[],sub_fields:[],relation:{}}}}},created:function(){this.init()},mounted:function(){},data:function(){return{sub_fields:"sub_fields"in this.tableData?[].concat(M()(this.tableData.sub_fields)):[],tableValues:"values"in this.tableData?[].concat(M()(this.tableData.values)):[],dialogVisible:!1,mozhu:{id:"",fields:[],relation:{},compute:{}},fields:[],formModel:{},formLabel:{},addEdit:{index:0,add:0}}},methods:{init:function(){var e=!0,t=!1,a=void 0;try{for(var r,i=T()(this.sub_fields);!(e=(r=i.next()).done);e=!0){var l=r.value;this.formLabel[l.id]={type:l.type,values:l.values,children:l.children?l.children:[]}}}catch(e){t=!0,a=e}finally{try{!e&&i.return&&i.return()}finally{if(t)throw a}}},formatter:function(e,t,a,r){if(e[t.property]){var i="";if(this.formLabel[t.property]){switch(this.formLabel[t.property].type){case"CHECKBOX":var l=!0,n=!1,o=void 0;try{for(var s,u=T()(this.formLabel[t.property].values);!(l=(s=u.next()).done);l=!0){var c=s.value;for(var d in e[t.property])e[t.property][d]===c.value&&(i=i+c.label+"、")}}catch(e){n=!0,o=e}finally{try{!l&&u.return&&u.return()}finally{if(n)throw o}}break;case"CASCADER":!function a(r){var l=!0,n=!1,o=void 0;try{for(var s,u=T()(e[t.property]);!(l=(s=u.next()).done);l=!0){var c=s.value;for(var d in r)r[d].value===c&&(i=i+r[d].label+"、","children"in r[d]&&a(r[d].children))}}catch(e){n=!0,o=e}finally{try{!l&&u.return&&u.return()}finally{if(n)throw o}}}(this.formLabel[t.property].children);break;case"RADIO":case"SELECT":var f=!0,h=!1,p=void 0;try{for(var v,m=T()(this.formLabel[t.property].values);!(f=(v=m.next()).done);f=!0){var b=v.value;e[t.property]===b.value&&(i=b.label)}}catch(e){h=!0,p=e}finally{try{!f&&m.return&&m.return()}finally{if(h)throw p}}break;case"DATE":var y=new Date(e[t.property]);i=e[t.property]?(y.getFullYear()+"-"+(y.getMonth()+1)+"-"+y.getDate()).toString():"否";break;case"DATETIME":var g=new Date(e[t.property]);i=e[t.property]?(g.getFullYear()+"-"+(g.getMonth()+1)+"-"+g.getDate()+" "+g.getHours()+":"+g.getMinutes()+":"+g.getSeconds()).toString():"否";break;case"SWITCH":i=e[t.property]?"是":"否";break;default:i=e[t.property]}return i}return e[t.property]}return""},consoleData:function(e){this.addEdit.add?this.tableValues.push(e):this.$set(this.tableValues,this.addEdit.index,e),this.dialogVisible=!1},deleteClick:function(e,t,a){this.tableValues.splice(t,1)},editClick:function(e,t,a){for(var r in this.addEdit.add=0,this.addEdit.index=t,this.mozhu.relation=this.tableData.relation,this.mozhu.fields=a,e)"DATE"===this.formLabel[r].type|"DATETIME"===this.formLabel[r].type&&(e[r]=new Date(e[r]));this.formModel=k()({},e),this.dialogVisible=!0},addRow:function(){this.addEdit.add=1,this.mozhu.relation=this.tableData.relation,this.mozhu.fields=this.tableData.sub_fields,this.formModel={},this.dialogVisible=!0},getData:function(){this.$emit("getData",this.tableValues)}}},L={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-table",{attrs:{data:e.tableValues}},[a("el-table-column",{attrs:{align:"center",type:"index","min-width":"50"}}),e._v(" "),e._l(e.sub_fields,function(t,r){return a("el-table-column",{key:r,attrs:{align:"center","min-width":"180",prop:t.id,formatter:e.formatter,label:t.label}})}),e._v(" "),a("el-table-column",{attrs:{align:"center",fixed:"right",label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.editClick(t.row,t.$index,e.sub_fields)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.deleteClick(t.row,t.$index,e.sub_fields)}}},[e._v("删除")])]}}])})],2),e._v(" "),a("el-button",{staticStyle:{"margin-top":"15px"},attrs:{size:"small"},on:{click:e.addRow}},[e._v("addRow")]),e._v(" "),a("el-button",{staticStyle:{"margin-top":"15px"},attrs:{size:"small"},on:{click:e.getData}},[e._v("getData")]),e._v(" "),a("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[e.dialogVisible?a("sx-form",{attrs:{mozhu:e.mozhu,formModel:e.formModel},on:{consoleData:e.consoleData}}):e._e()],1)],1)},staticRenderFns:[]};var z=a("VU/8")(R,L,!1,function(e){a("J64a")},"data-v-d84951a0",null).exports,F={props:{value:{type:Array}},data:function(){return{layerTreeData:this.value,treeId:100,sizeForm:{treeName:""}}},created:function(){this.treeId=this.treeId+this.layerTreeData.length},methods:{append:function(e){var t,a=this,r=[];this.$refs.sizeForm.validate((t=D()(E.a.mark(function t(i){var l;return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!i){t.next=13;break}if(r=a.sizeForm.treeName.split("**"),l={value:1===r.length?a.treeId++:parseInt(r[1]),label:a.sizeForm.treeName?a.sizeForm.treeName:"空"},!e){t.next=10;break}if(e.children){t.next=7;break}return t.next=7,a.$set(e,"children",[]);case 7:e.children.push(l),t.next=11;break;case 10:Array.isArray(a.layerTreeData)&&a.layerTreeData.push(l);case 11:t.next=15;break;case 13:return t.abrupt("return",!1);case 15:case"end":return t.stop()}},t,a)})),function(e){return t.apply(this,arguments)}))},remove:function(e,t){var a=e.parent,r=a.data.children||a.data,i=r.findIndex(function(e){return e.value===t.value});r.splice(i,1)},showTreeData:function(){}}},$={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"treeAll"},[a("div",{staticStyle:{width:"100%",display:"flex","align-items":"flex-start"}},[a("el-form",{ref:"sizeForm",staticStyle:{width:"100%"},attrs:{model:e.sizeForm,"label-width":"0px",size:"mini"}},[a("el-form-item",{staticStyle:{width:"100%"},attrs:{prop:"treeName",rules:[{required:!0,message:"请输入要创建的名字",trigger:"change"},{pattern:/(^[^(\*)]+$)|(^[^(\*)]+(\*){2}\d+$)/,message:"radio下**后作为实际值,并且是整数",trigger:"change"}]}},[a("el-input",{staticStyle:{width:"100%"},attrs:{clearable:"",placeholder:"请输入要创建的名字"},model:{value:e.sizeForm.treeName,callback:function(t){e.$set(e.sizeForm,"treeName",t)},expression:"sizeForm.treeName"}})],1)],1),e._v(" "),a("el-button",{attrs:{slot:"append",type:"text"},on:{click:function(t){e.append(!1)}},slot:"append"},[e._v("新建")])],1),e._v(" "),a("el-tree",{attrs:{data:e.layerTreeData,"node-key":"value",draggable:"","default-expand-all":"","expand-on-click-node":!1},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.node,i=t.data;return a("span",{staticClass:"custom-tree-node"},[a("span",[e._v(e._s(r.label))]),e._v(" "),a("span",[a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(){return e.remove(r,i)}}},[e._v("\n          Delete\n        ")])],1)])}}])}),e._v(" "),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:e.showTreeData}},[e._v("\n    showTreeData\n  ")])],1)},staticRenderFns:[]};var I=a("VU/8")(F,$,!1,function(e){a("mfwv")},"data-v-55059c1e",null).exports,S={props:{value:{type:Array}},data:function(){return{treeData:this.value,treeId:100,sizeForm:{treeName:""}}},created:function(){this.treeId=this.treeId+this.treeData.length},methods:{append:function(e){var t,a=this;this.$refs.sizeForm.validate((t=D()(E.a.mark(function t(r){var i;return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!r){t.next=12;break}if(i={value:a.treeId++,label:a.sizeForm.treeName?a.sizeForm.treeName:"空"},!e){t.next=9;break}if(e.children){t.next=6;break}return t.next=6,a.$set(e,"children",[]);case 6:e.children.push(i),t.next=10;break;case 9:Array.isArray(a.treeData)&&a.treeData.push(i);case 10:t.next=14;break;case 12:return t.abrupt("return",!1);case 14:case"end":return t.stop()}},t,a)})),function(e){return t.apply(this,arguments)}))},remove:function(e,t){var a=e.parent,r=a.data.children||a.data,i=r.findIndex(function(e){return e.value===t.value});r.splice(i,1)},showTreeData:function(){}}},U={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"treeAll"},[a("div",{staticStyle:{width:"100%",display:"flex","align-items":"flex-start"}},[a("el-form",{ref:"sizeForm",staticStyle:{width:"100%"},attrs:{model:e.sizeForm,"label-width":"0px",size:"mini"}},[a("el-form-item",{staticStyle:{width:"100%"},attrs:{prop:"treeName",rules:[{required:!0,message:"请输入要创建的名字",trigger:"change"}]}},[a("el-input",{staticStyle:{width:"100%"},attrs:{clearable:"",placeholder:"请输入要创建的名字"},model:{value:e.sizeForm.treeName,callback:function(t){e.$set(e.sizeForm,"treeName",t)},expression:"sizeForm.treeName"}})],1)],1),e._v(" "),a("el-button",{attrs:{slot:"append",type:"text"},on:{click:function(t){e.append(!1)}},slot:"append"},[e._v("新建")])],1),e._v(" "),a("el-tree",{attrs:{data:e.treeData,"node-key":"value",draggable:"","default-expand-all":"","expand-on-click-node":!1},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.node,i=t.data;return a("span",{staticClass:"custom-tree-node"},[a("span",[e._v(e._s(r.label))]),e._v(" "),a("span",[a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(){return e.append(i)}}},[e._v("\n          Append\n        ")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(){return e.remove(r,i)}}},[e._v("\n          Delete\n        ")])],1)])}}])}),e._v(" "),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:e.showTreeData}},[e._v("\n    showTreeData\n  ")])],1)},staticRenderFns:[]};var N=a("VU/8")(S,U,!1,function(e){a("wmpe")},"data-v-22d93526",null).exports,O=a("8HV8"),V={props:{needCreatedRelation:{type:Object,default:function(){return{}}}},data:function(){return{subFields:"sub_fields"in this.needCreatedRelation?this.needCreatedRelation.sub_fields:[],relation:"relation"in this.needCreatedRelation?this.needCreatedRelation.relation:{},id:"id"in this.needCreatedRelation?this.needCreatedRelation.id:"",options:[],relationGroup:{},formatBefore:[],formatAfter:{},a:[]}},created:function(){this.init()},methods:{init:function(){var e=["EQUAL","NOTEQUAL"],t=!0,a=!1,r=void 0;try{for(var i,l=T()(this.subFields);!(t=(i=l.next()).done);t=!0){var n=i.value;this.options.push({value:n.id,label:n.label,children:[]})}}catch(e){a=!0,r=e}finally{try{!t&&l.return&&l.return()}finally{if(a)throw r}}var o=!0,s=!1,u=void 0;try{for(var c,d=T()(this.options);!(o=(c=d.next()).done);o=!0){var f=c.value;if(f.children){var h=!0,p=!1,v=void 0;try{for(var m,b=T()(e);!(h=(m=b.next()).done);h=!0){var y=m.value;f.children.push({value:y,label:y,children:[]})}}catch(e){p=!0,v=e}finally{try{!h&&b.return&&b.return()}finally{if(p)throw v}}}}}catch(e){s=!0,u=e}finally{try{!o&&d.return&&d.return()}finally{if(s)throw u}}var g=!0,_=!1,E=void 0;try{for(var A,x=T()(this.subFields);!(g=(A=x.next()).done);g=!0){var D=A.value;if("RADIO"===D.type){var w=!0,k=!1,C=void 0;try{for(var R,L=T()(this.options);!(w=(R=L.next()).done);w=!0){var z=R.value,F=!0,$=!1,I=void 0;try{for(var S,U=T()(z.children);!(F=(S=U.next()).done);F=!0){S.value.children.push({value:D.id,label:D.label,children:[].concat(M()(D.values))})}}catch(e){$=!0,I=e}finally{try{!F&&U.return&&U.return()}finally{if($)throw I}}}}catch(e){k=!0,C=e}finally{try{!w&&L.return&&L.return()}finally{if(k)throw C}}}}}catch(e){_=!0,E=e}finally{try{!g&&x.return&&x.return()}finally{if(_)throw E}}for(var N in this.relation)this.formatBefore.push([N,this.relation[N].rule_type,this.relation[N].target,this.relation[N].value])},appendRow:function(){this.formatBefore.push([])},deleteRow:function(e,t){this.formatBefore.splice(t,1)},sendData:function(){this.formatAfter={};var e=!0,t=!1,a=void 0;try{for(var r,i=T()(this.formatBefore);!(e=(r=i.next()).done);e=!0){var l=r.value;this.formatAfter[l[0]]={rule_type:l[1],target:l[2],value:l[3]}}}catch(e){t=!0,a=e}finally{try{!e&&i.return&&i.return()}finally{if(t)throw a}}this.$emit("getRealationData",this.formatAfter,this.id)}}},B={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"all"},[a("div",{staticClass:"content"},[a("div",{staticStyle:{"text-align":"right",width:"100%"}},[a("el-button",{attrs:{type:"text"},on:{click:e.appendRow}},[e._v("新建")])],1),e._v(" "),e._l(e.formatBefore,function(t,r){return a("div",{key:r,staticClass:"contentCascader"},[a("el-cascader",{staticStyle:{width:"100%"},attrs:{size:"mini","expand-trigger":"hover",options:e.options},model:{value:e.formatBefore[r],callback:function(t){e.$set(e.formatBefore,r,t)},expression:"formatBefore[index]"}}),e._v(" "),a("el-button",{attrs:{type:"danger",plain:"",size:"mini"},on:{click:function(a){e.deleteRow(t,r)}}},[e._v("\n        删除\n      ")])],1)}),e._v(" "),a("br"),e._v(" "),a("div",{staticStyle:{"text-align":"center",width:"100%"}},[a("el-button",{on:{click:e.sendData}},[e._v("确定")])],1)],2)])},staticRenderFns:[]};var q=a("VU/8")(V,B,!1,function(e){a("RFng")},"data-v-36d26aac",null).exports,H=a("DAYN"),P=a.n(H),X=a("ZzWJ"),Q={components:{sxTable:z,sxTree:N,sxLayerTree:I,sxCalculate:O.default,relationFactory:q,draggable:P.a},props:{mozhu:{type:Object,default:function(){return{}}},formModel:{type:Object,default:function(){return{}}},edit:{type:Boolean,default:function(){return!1}},add:{type:Boolean,default:function(){return!1}},sort:{type:Boolean,default:function(){return!1}}},data:function(){return{newFields:"fields"in this.mozhu?[].concat(M()(this.mozhu.fields)):[],relation:"relation"in this.mozhu?k()({},this.mozhu.relation):{},compute:"compute"in this.mozhu?k()({},this.mozhu.compute):{},mozhuId:"id"in this.mozhu?this.mozhu.id:"",allFish:{relation:{pattern:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","TEXTAREA"]},message:{target:"type",rule_type:"EQUAL",value:"INPUT"},required:{target:"type",rule_type:"EQUAL",value:["INPUT","INT","DOUBLE","SELECT","DATE","DATETIME","RADIO","TEXTAREA","CHECKBOX","CASCADER"]},tree:{target:"type",rule_type:"EQUAL",value:"CASCADER"},layerTree:{target:"type",rule_type:"EQUAL",value:["SELECT","RADIO","CHECKBOX"]},radioAgain:{target:"type",rule_type:"EQUAL",value:"RADIO"},createCalculate:{target:"type",rule_type:"EQUAL",value:"CREATECALCULATE"},createTable:{target:"type",rule_type:"EQUAL",value:"CREATETABLE"}},fields:[{id:"type",label:"请选择类型",value:"",type:"RADIO",values:[{label:"输入框",value:"INPUT"},{label:"整数类型输入框",value:"INT"},{label:"浮点数类型输入框",value:"DOUBLE"},{label:"选择器",value:"SELECT"},{label:"日期选择器",value:"DATE"},{label:"日期时间选择器",value:"DATETIME"},{label:"单选框",value:"RADIO"},{label:"文本标签",value:"TEXTAREA"},{label:"多选框",value:"CHECKBOX"},{label:"级联选择器",value:"CASCADER"},{label:"创建表格",value:"CREATETABLE"},{label:"计算",value:"CREATECALCULATE"}],validations:[{required:!0,message:"请选择类型",trigger:"change"}]},{id:"id",label:"ID",value:"",type:"INPUT",validations:[{required:!0,message:"请输入组件ID",trigger:"change"},{pattern:"^[a-zA-Z][a-zA-Z0-9]*$",message:"只能输入以英文字母开头的英文或数字",trigger:"change"}]},{id:"label",label:"标签名字",value:"",type:"INPUT",validations:[{required:!0,message:"请输入组件标签名",trigger:"change"},{pattern:"^[^\\s~！@#￥%……&*（）——+~!@#$%^&*()_+]*$",message:"不能输入空格或特殊字符",trigger:"change"}]},{id:"pattern",label:"正则",type:"INPUT"},{id:"message",label:"正则提示信息",type:"INPUT",rules:{id:"type",rule_type:"EQUAL",value:"INPUT"}},{id:"required",label:"是否必填",value:"",type:"RADIO",values:[{label:"是",value:"0"},{label:"否",value:"1"}]},{id:"tree",label:"创建级联",type:"TREE",values:[]},{id:"layerTree",label:"创建选项",type:"LAYERTREE",values:[]},{id:"createCalculate",label:"ID公式",value:"",type:"CREATECALCULATE",validations:[{required:!0,message:"请输入需要计算的 ID 公式,如 (id1+id2)",trigger:"blur"}]},{id:"createTable",label:"创建表格",type:"CREATETABLE",values:[]}]},fishData:{},fishEdit:!1,repositoryData:[],dialogVisible:!1,tabelCheckboxGroup:[],relationDialogVisible:!1,needCreatedRelation:{},whatTF:!1,calculateData:[]}},created:function(){this.init(),this.firstShow()},mounted:function(){},methods:{firstShow:function(){var e=this;return D()(E.a.mark(function t(){var a,r,i,l,n,o,s,u,c;return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=["INT","DOUBLE","RADIO"],t.next=3,Object(X.b)();case 3:if(!(r=t.sent)){t.next=35;break}e.repositoryData=[].concat(M()(r.data.entity)),e.calculateData=[],t.t0=E.a.keys(e.repositoryData);case 9:if((t.t1=t.t0()).done){t.next=35;break}if(i=t.t1.value,"TABLE"!==e.repositoryData[i].type){t.next=32;break}for(e.repositoryData[i].createTable=[],l=!0,n=!1,o=void 0,t.prev=16,s=T()(e.repositoryData[i].sub_fields);!(l=(u=s.next()).done);l=!0)c=u.value,e.repositoryData[i].createTable.push(c.label);t.next=24;break;case 20:t.prev=20,t.t2=t.catch(16),n=!0,o=t.t2;case 24:t.prev=24,t.prev=25,!l&&s.return&&s.return();case 27:if(t.prev=27,!n){t.next=30;break}throw o;case 30:return t.finish(27);case 31:return t.finish(24);case 32:a.includes(e.repositoryData[i].type)&&e.calculateData.push(e.repositoryData[i]),t.next=9;break;case 35:case"end":return t.stop()}},t,e,[[16,20,24,32],[25,,27,31]])}))()},init:function(){var e=!0,t=!1,a=void 0;try{for(var r,i=T()(this.newFields);!(e=(r=i.next()).done);e=!0){var l=r.value;switch(l.type){case"CHECKBOX":case"CASCADER":case"TREE":case"LAYERTREE":case"CREATETABLE":this.formModel[l.id]||("value"in l?this.$set(this.formModel,l.id,[].concat(M()(l.value))):this.$set(this.formModel,l.id,[]));break;case"DATE":case"DATETIME":this.formModel[l.id]||("value"in l?this.$set(this.formModel,l.id,new Date(l.value)):this.$set(this.formModel,l.id,null));break;case"SWITCH":this.formModel[l.id]||("value"in l?this.$set(this.formModel,l.id,l.value):this.$set(this.formModel,l.id,!1));break;default:this.formModel[l.id]||("value"in l?this.$set(this.formModel,l.id,l.value):this.$set(this.formModel,l.id,""))}if(l.validations)for(var n in l.validations)"pattern"in l.validations[n]&&(l.validations[n].pattern=new RegExp(l.validations[n].pattern,"g"))}}catch(e){t=!0,a=e}finally{try{!e&&i.return&&i.return()}finally{if(t)throw a}}},tf:function(e){var t=!0;if(this.relation[e.id])switch(this.relation[e.id].rule_type){case"EQUAL":t="object"===g()(this.relation[e.id].value)?this.relation[e.id].value.includes(this.formModel[this.relation[e.id].target]):this.formModel[this.relation[e.id].target]===this.relation[e.id].value;break;case"GT":t=this.formModel[this.relation[e.id].target]>this.relation[e.id].value;break;case"GTOE":t=this.formModel[this.relation[e.id].target]>=this.relation[e.id].value;break;case"LE":t=this.formModel[this.relation[e.id].target]<this.relation[e.id].value;break;case"LEOE":t=this.formModel[this.relation[e.id].target]<=this.relation[e.id].value;break;case"NOTEQUAL":t=this.formModel[this.relation[e.id].target]!==this.relation[e.id].value;break;default:t=!1}return t},conversion:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};switch(e.validations=[],e.type){case"INPUT":case"INT":case"DOUBLE":case"SELECT":case"DATE":case"DATETIME":case"RADIO":case"TEXTAREA":case"CHECKBOX":case"CASCADER":parseInt(e.required)||e.validations.push({required:!parseInt(e.required),message:"请输入或选择"+e.label,trigger:"change"}),"INPUT"===e.type|"INT"===e.type|"DOUBLE"===e.type|"TEXTAREA"===e.type&&e.pattern&&e.validations.push({pattern:e.pattern,message:parseInt(e.message)?e.message:"请按规则填写",trigger:"change"});break;case"CREATETABLE":for(var t in e.type="TABLE",e.sub_fields=[],e.createTable){var a=!0,r=!1,i=void 0;try{for(var l,n=T()(this.repositoryData);!(a=(l=n.next()).done);a=!0){var o=l.value;e.createTable[t]===o.label&&e.sub_fields.push(o)}}catch(e){r=!0,i=e}finally{try{!a&&n.return&&n.return()}finally{if(r)throw i}}}break;case"CREATECALCULATE":e.type="CALCULATE"}return e},formatData:function(){var e=[],t=!0,a=!1,r=void 0;try{for(var i,l=T()(this.newFields);!(t=(i=l.next()).done);t=!0){var n=i.value;e.push({id:n.id})}}catch(e){a=!0,r=e}finally{try{!t&&l.return&&l.return()}finally{if(a)throw r}}return e},consoleData:function(){var e=this;this.$nextTick(function(){if(e.$refs.sxtable){var t=!0,a=!1,r=void 0;try{for(var i,l=T()(e.$refs.sxtable);!(t=(i=l.next()).done);t=!0){var n=i.value;e.formModel[n.tableData.id]=n.tableValues}}catch(e){a=!0,r=e}finally{try{!t&&l.return&&l.return()}finally{if(a)throw r}}}}),this.$refs.formModel.validate(function(t){if(!t)return!1;var a=e.formatData();e.$emit("consoleData",e.mozhuId,e.formModel,e.relation,e.compute,e.newFields,a)})},notVerifying:function(){var e=this.formatData();this.$emit("notVerifying",this.mozhuId,this.formModel,this.relation,this.compute,this.newFields,e)},sortAfterData:function(){this.$emit("sortAfterData",this.formModel)},deleteFormRow:function(e,t){this.newFields.splice(t,1),this.$delete(this.formModel,e.id)},calculate:function(e,t){for(var a=/\d+\.\d+|\d+/,r=/\(/,i=/\)/,l=/\+|\-|\*|\/|\^|\%/,n=/[a-zA-Z][a-zA-Z0-9]+/,o=t.match(/\(|\)|\d+\.\d+|\d+|[a-zA-Z]+|\+|\-|\*|\/|\^|\%/g),s=[],u=[],c=0;c<o.length;c++)if(!r.test(o[c]))if(i.test(o[c])){if(0===u.length)return s[0];var d=s.pop(),f=s.pop(),h=null;switch(u.pop()){case"+":h=d+f;break;case"-":h=f-d;break;case"*":h=d*f;break;case"/":h=f/d;break;case"%":h=f%d;break;case"^":h=Math.pow(f,d);break;default:throw"something wrong while calculating value 1"}s.push(h)}else if(a.test(o[c]))s.push(Number(o[c]));else if(l.test(o[c]))u.push(o[c]);else{if(!n.test(o[c]))throw"something wrong while calculating value 2";null==e[o[c]]&&s.push(0),s.push(Number(e[o[c]]))}return s[0].toString()},onEval:function(e){this.formModel[e.id]=this.calculate(this.formModel,e.calculate)},resetData:function(){},editFormRow:function(e,t){},getData:function(e){},openCreateFish:function(){this.fishData={},this.fishEdit={},this.dialogVisible=!0},createFish:function(e,t,a,r,i,l){var n=this;return D()(E.a.mark(function e(){var a;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.calculate=t.createCalculate?t.createCalculate:"",t.children=[].concat(M()(t.tree)).length?[].concat(M()(t.tree)):[],t.values=[].concat(M()(t.layerTree)).length?[].concat(M()(t.layerTree)):[],a=n.conversion(t),"edit"in n.fishEdit?n.repositoryData.splice(n.fishEdit.index,1,a):n.repositoryData.push(a),e.next=7,Object(X.a)(a);case 7:e.sent,n.dialogVisible=!1;case 11:case"end":return e.stop()}},e,n)}))()},addElement:function(e,t){var a=this.formatData();if("CALCULATE"===e.type){var r=e.calculate.match(/[a-zA-Z][a-zA-Z0-9]*/g),i=[],l=!1,n=!0,o=!1,s=void 0;try{for(var u,c=T()(r);!(n=(u=c.next()).done);n=!0){var d=u.value;l=!1;var f=!0,h=!1,p=void 0;try{for(var v,m=T()(a);!(f=(v=m.next()).done);f=!0){if(v.value.id===d){l=!0;break}}}catch(e){h=!0,p=e}finally{try{!f&&m.return&&m.return()}finally{if(h)throw p}}l||i.push(d)}}catch(e){o=!0,s=e}finally{try{!n&&c.return&&c.return()}finally{if(o)throw s}}i.length?this.$message({showClose:!0,message:"计算中有字段模板中未添加"+i.toString(),type:"warning"}):this.newFields.push(e)}else{var b=!1,y=!0,g=!1,_=void 0;try{for(var E,A=T()(a);!(y=(E=A.next()).done);y=!0){if(E.value.id===e.id){b=!0;break}}}catch(e){g=!0,_=e}finally{try{!y&&A.return&&A.return()}finally{if(g)throw _}}b?this.$message({showClose:!0,message:"模板内已添加",type:"warning"}):this.newFields.push(e)}this.init()},editElement:function(e,t,a){this.fishEdit={index:t,edit:a},this.fishData=k()({},e),"TABLE"===e.type?this.fishData.type="CREATETABLE":"CALCULATE"===e.type&&(this.fishData.type="CREATECALCULATE",this.fishData.createCalculate=this.fishData.calculate),this.dialogVisible=!0},deleteElement:function(e,t){this.$delete(this.repositoryData,t)},openRelation:function(e){var t=this;return D()(E.a.mark(function a(){return E.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:t.whatTF=!!e,t.needCreatedRelation=e||{id:t.mozhuId,relation:t.relation,sub_fields:t.newFields},t.relationDialogVisible=!0;case 4:case"end":return a.stop()}},a,t)}))()},getRealationData:function(e,t){if(this.whatTF){var a=!0,r=!1,i=void 0;try{for(var l,n=T()(this.repositoryData);!(a=(l=n.next()).done);a=!0){var o=l.value;o.id===t&&k()(o.relation,e)}}catch(e){r=!0,i=e}finally{try{!a&&n.return&&n.return()}finally{if(r)throw i}}}else this.relation={},k()(this.relation,e)}}},j={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"formAll"},[a("div",{staticClass:"formContent"},[a("el-form",{ref:"formModel",style:{width:e.add?"70%":"100%"},attrs:{"label-width":"150px","label-position":"left",model:e.formModel,size:"mini"}},[a("draggable",{model:{value:e.newFields,callback:function(t){e.newFields=t},expression:"newFields"}},e._l(e.newFields,function(t,r){return e.tf(t)?a("el-form-item",{key:r,attrs:{rules:t.validations,prop:t.id,label:t.label}},["INPUT"===t.type?a("el-input",{attrs:{clearable:""},model:{value:e.formModel[t.id],callback:function(a){e.$set(e.formModel,t.id,"string"==typeof a?a.trim():a)},expression:"formModel[items.id]"}}):e._e(),e._v(" "),"INT"===t.type?a("el-input",{attrs:{clearable:""},model:{value:e.formModel[t.id],callback:function(a){e.$set(e.formModel,t.id,e._n(a))},expression:"formModel[items.id]"}}):e._e(),e._v(" "),"DOUBLE"===t.type?a("el-input",{attrs:{clearable:""},model:{value:e.formModel[t.id],callback:function(a){e.$set(e.formModel,t.id,e._n(a))},expression:"formModel[items.id]"}}):e._e(),e._v(" "),"TEXTAREA"===t.type?a("el-input",{attrs:{type:"textarea"},model:{value:e.formModel[t.id],callback:function(a){e.$set(e.formModel,t.id,a)},expression:"formModel[items.id]"}}):e._e(),e._v(" "),"RADIO"===t.type?a("el-radio-group",{model:{value:e.formModel[t.id],callback:function(a){e.$set(e.formModel,t.id,a)},expression:"formModel[items.id]"}},e._l(t.values,function(t,r){return a("el-radio",{key:r,attrs:{label:t.value}},[e._v(e._s(t.label))])})):e._e(),e._v(" "),"CHECKBOX"===t.type?a("div",[a("el-checkbox-group",{model:{value:e.formModel[t.id],callback:function(a){e.$set(e.formModel,t.id,a)},expression:"formModel[items.id]"}},e._l(t.values,function(t,r){return a("el-checkbox",{key:r,attrs:{label:t.value}},[e._v(e._s(t.label))])}))],1):e._e(),e._v(" "),"SWITCH"===t.type?a("el-switch",{model:{value:e.formModel[t.id],callback:function(a){e.$set(e.formModel,t.id,a)},expression:"formModel[items.id]"}}):e._e(),e._v(" "),"SELECT"===t.type?a("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",filterable:""},model:{value:e.formModel[t.id],callback:function(a){e.$set(e.formModel,t.id,a)},expression:"formModel[items.id]"}},e._l(t.values,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})):e._e(),e._v(" "),"DATE"===t.type?a("el-date-picker",{staticStyle:{width:"100%"},attrs:{clearable:"",type:"date",placeholder:"选择日期时间"},model:{value:e.formModel[t.id],callback:function(a){e.$set(e.formModel,t.id,a)},expression:"formModel[items.id]"}}):e._e(),e._v(" "),"DATETIME"===t.type?a("el-date-picker",{staticStyle:{width:"100%"},attrs:{clearable:"",type:"datetime",placeholder:"选择日期时间"},model:{value:e.formModel[t.id],callback:function(a){e.$set(e.formModel,t.id,a)},expression:"formModel[items.id]"}}):e._e(),e._v(" "),"CASCADER"===t.type?a("el-cascader",{staticStyle:{width:"100%"},attrs:{"change-on-select":"",clearable:"",filterable:"",options:t.children},model:{value:e.formModel[t.id],callback:function(a){e.$set(e.formModel,t.id,a)},expression:"formModel[items.id]"}}):e._e(),e._v(" "),"CALCULATE"===t.type?a("div",[a("div",[e._v("\n              "+e._s(e.formModel[t.id]?e.formModel[t.id]:0)+"   \n              "),a("el-button",{on:{click:function(a){e.onEval(t)}}},[e._v("计算")])],1)]):e._e(),e._v(" "),"CREATECALCULATE"===t.type?a("div",[a("sx-calculate",{attrs:{calculateData:e.calculateData},model:{value:e.formModel.createCalculate,callback:function(t){e.$set(e.formModel,"createCalculate",t)},expression:"formModel['createCalculate']"}})],1):e._e(),e._v(" "),"TABLE"===t.type?a("div",[a("sx-table",{ref:"sxtable",refInFor:!0,attrs:{tableData:t},on:{getData:e.getData}})],1):e._e(),e._v(" "),"TREE"===t.type?a("div",[a("sx-tree",{model:{value:e.formModel.tree,callback:function(t){e.$set(e.formModel,"tree",t)},expression:"formModel['tree']"}})],1):e._e(),e._v(" "),"LAYERTREE"===t.type?a("div",[a("sx-layer-tree",{model:{value:e.formModel.layerTree,callback:function(t){e.$set(e.formModel,"layerTree",t)},expression:"formModel['layerTree']"}})],1):e._e(),e._v(" "),"CREATETABLE"===t.type?a("div",[a("el-checkbox-group",{model:{value:e.formModel.createTable,callback:function(t){e.$set(e.formModel,"createTable",t)},expression:"formModel['createTable']"}},e._l(e.repositoryData,function(t,r){return"TABLE"!==t.type?a("el-checkbox-button",{key:r,attrs:{label:t.label}},[e._v(e._s(t.label))]):e._e()}))],1):e._e(),e._v(" "),e.edit?a("el-button-group",[a("el-button",{attrs:{type:"danger"},on:{click:function(a){e.deleteFormRow(t,r)}}},[e._v("deleteFormRow")])],1):e._e()],1):e._e()})),e._v("\n      "+e._s(e.formModel)),a("br"),a("br"),e._v(" "),a("el-form-item",{staticStyle:{"text-align":"center"},attrs:{"label-width":"0px"}},[e.sort?a("el-button",{on:{click:e.sortAfterData}},[e._v("sortAfterData")]):e._e(),e._v(" "),e.sort?a("el-button",{on:{click:function(t){e.openRelation(!1)}}},[e._v("openRelation")]):e._e(),e._v(" "),a("el-button",{on:{click:e.consoleData}},[e._v("consoleData")]),e._v(" "),e.sort?a("el-button",{on:{click:e.notVerifying}},[e._v("notVerifying")]):e._e()],1)],1),e._v(" "),e.add?a("div",{staticClass:"formTemplateElement"},[e._l(e.repositoryData,function(t,r){return a("el-row",{key:r},[a("el-button",{attrs:{plain:"",round:""},on:{click:function(a){e.addElement(t,r)}}},[e._v(e._s(t.type+" - "+t.label))]),e._v(" "),a("el-button",{attrs:{circle:"",type:"warning",size:"mini",icon:"el-icon-edit"},on:{click:function(a){e.editElement(t,r,!0)}}}),e._v(" "),a("el-button",{attrs:{circle:"",type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(a){e.deleteElement(t,r)}}}),e._v(" "),"TABLE"===t.type?a("el-button",{attrs:{circle:"",type:"primary",size:"mini",icon:"el-icon-setting"},on:{click:function(a){e.openRelation(t)}}}):e._e()],1)}),e._v(" "),a("br"),e._v(" "),a("el-button",{on:{click:e.openCreateFish}},[e._v("openCreateFish")]),e._v(" "),a("br"),a("br")],2):e._e()],1),e._v(" "),e.dialogVisible?a("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticStyle:{width:"100%"}},[e.dialogVisible?a("sx-form",{attrs:{mozhu:e.allFish,formModel:e.fishData},on:{consoleData:e.createFish}}):e._e()],1)]):e._e(),e._v(" "),e.relationDialogVisible?a("el-dialog",{attrs:{title:"relation提示",visible:e.relationDialogVisible},on:{"update:visible":function(t){e.relationDialogVisible=t}}},[a("div",{staticStyle:{width:"100%"}},[a("relation-factory",{attrs:{needCreatedRelation:e.needCreatedRelation},on:{getRealationData:e.getRealationData}})],1)]):e._e()],1)},staticRenderFns:[]};var J=a("VU/8")(Q,j,!1,function(e){a("KjAO")},"data-v-95614634",null).exports,Z={name:"icon-svg",props:{iconClass:{type:String,required:!0}},computed:{iconName:function(){return"#icon-"+this.iconClass}}},K={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("svg",{staticClass:"svg-icon",attrs:{"aria-hidden":"true"}},[t("use",{attrs:{"xlink:href":this.iconName}})])])},staticRenderFns:[]};var Y=a("VU/8")(Z,K,!1,function(e){a("JewT")},null,null).exports;r.default.component("iconSvg",Y),r.default.component("sx-form",J),r.default.component(v.a.name,v.a),r.default.use(b.a),r.default.config.productionTip=!1,new r.default({el:"#app",router:o,axios:s.a,store:h,components:{App:l},template:"<App/>"})},RFng:function(e,t){},Vbxe:function(e,t){},ZzWJ:function(e,t,a){"use strict";a.d(t,"a",function(){return n}),a.d(t,"b",function(){return o}),a.d(t,"c",function(){return s}),a.d(t,"d",function(){return u});var r=a("gyMJ"),i=a("sICn").proxyTableApi,l=i.api,n=(i.hot,function(e){return r.a.post(l+"/field",e)}),o=function(e){return r.a.get(l+"/fields",e)},s=function(e){return r.a.post(l+"/form",e)},u=function(e){return r.a.get(l+"/forms",e)}},gyMJ:function(e,t,a){"use strict";var r=a("//Fk"),i=a.n(r),l=a("mtWM"),n=a.n(l);n.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n.a.defaults.timeout=3e3,n.a.interceptors.request.use(function(e){return e},function(e){return i.a.reject(e)}),n.a.interceptors.response.use(function(e){return e},function(e){e.response&&e.response.status}),t.a=n.a},mfwv:function(e,t){},rqSJ:function(e,t){},sICn:function(e,t,a){var r={"/api":{target:"http://192.168.10.196:8089",changeOrigin:!0,pathRewrite:{"^/api":"/"}},"/hot":{target:"http://echarts.baidu.com/",changeOrigin:!0,pathRewrite:{"^/hot":"/"}}},i={};for(var l in r)i[l.replace(/\//,"")]=l;for(var n in r)i[n.replace(/\//,"")]=r[n].target;e.exports={proxyTable:r,proxyTableApi:i,gzip:!1}},tvR6:function(e,t){},wmpe:function(e,t){}},["NHnr"]);