webpackJsonp([2],{"8sbH":function(e,t){},Er1X:function(e,t){},KXDw:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("gRE1"),n=i.n(a),r=i("woOf"),o=i.n(r),l=i("BO1k"),c=i.n(l),s=i("Gu7T"),d=i.n(s),h=i("Xxa5"),u=i.n(h),f=i("exGp"),p=i.n(f),v={props:{cardObj:{type:Object,default:function(){return{}}},index:{type:Number,default:function(){return 0}}},methods:{templateEdit:function(){this.$emit("templateEdit",this.cardObj,this.index)},templateDelete:function(){this.$emit("templateDelete",this.cardObj,this.index)}}},m={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"formCardAll"},[i("div",{staticClass:"formCardContent"},[i("div",{staticClass:"topContent"},[e.cardObj.num?i("div",{staticClass:"topLeft"},[e._v("已有"+e._s(e.cardObj.num)+"项记录")]):e._e(),e._v(" "),i("div"),e._v(" "),i("el-button",{staticClass:"topRihgt",attrs:{type:"术中1"===e.cardObj.phase?"primary":"术后1"===e.cardObj.phase?"success":"info"}},[e._v(e._s(e.cardObj.phase))])],1),e._v(" "),i("div",{staticClass:"centerContent"},[i("i",{staticClass:"centerIcon",class:e.cardObj.icon}),e._v(" "),i("div",{staticClass:"centerTitle"},[e._v("\n        "+e._s(e.cardObj.name)+"\n      ")]),e._v(" "),i("div",{staticClass:"centerTitleAddTime"},[e._v("\n        新增日期: "+e._s(e.cardObj.createTime?e.cardObj.createTime:"新增日期: 我也不知道")+"\n      ")]),e._v(" "),i("div",{staticClass:"centerTitleEditTime"},[e._v("\n        修改日期: "+e._s(e.cardObj.updateTime?e.cardObj.updateTime:"修改日期: 我也不知道")+"\n      ")])]),e._v(" "),i("div",{staticClass:"bottomContent"},[i("i",{staticClass:"el-icon-edit",on:{click:e.templateEdit}}),e._v(" "),i("i",{staticClass:"el-icon-close",on:{click:e.templateDelete}})])])])},staticRenderFns:[]};var b=i("VU/8")(v,m,!1,function(e){i("Z4E1")},"data-v-217094f3",null).exports,C=i("UhWg"),g=i("eH3R"),y={props:{needCreatedCoordinate:{type:Object,default:function(){return{}}}},data:function(){return{subFields:"subFields"in this.needCreatedCoordinate?this.needCreatedCoordinate.subFields:[],coordinate:"coordinate"in this.needCreatedCoordinate?this.needCreatedCoordinate.coordinate:{},id:"id"in this.needCreatedCoordinate?this.needCreatedCoordinate.id:"",options:[],formatBefore:[],formatAfter:{}}},created:function(){console.log(this.needCreatedCoordinate,"拿到的数据"),this.init()},methods:{init:function(){var e=[32,45,60],t=!0,i=!1,a=void 0;try{for(var n,r=c()(this.subFields);!(t=(n=r.next()).done);t=!0){var o=n.value;this.options.push({value:o.id,label:o.label,children:[]})}}catch(e){i=!0,a=e}finally{try{!t&&r.return&&r.return()}finally{if(i)throw a}}var l=!0,s=!1,d=void 0;try{for(var h,u=c()(this.options);!(l=(h=u.next()).done);l=!0){var f=h.value;if(f.children){var p=!0,v=!1,m=void 0;try{for(var b,C=c()(e);!(p=(b=C.next()).done);p=!0){var g=b.value;f.children.push({value:g,label:g})}}catch(e){v=!0,m=e}finally{try{!p&&C.return&&C.return()}finally{if(v)throw m}}}}}catch(e){s=!0,d=e}finally{try{!l&&u.return&&u.return()}finally{if(s)throw d}}for(var y in this.coordinate)this.formatBefore.push([y,this.coordinate[y]])},appendRow:function(){this.formatBefore.push([]),console.log("what")},deleteRow:function(e,t){this.formatBefore.splice(t,1)},sendData:function(){this.formatAfter={};var e=!0,t=!1,i=void 0;try{for(var a,n=c()(this.formatBefore);!(e=(a=n.next()).done);e=!0){var r=a.value;this.formatAfter[r[0]]=r[1]}}catch(e){t=!0,i=e}finally{try{!e&&n.return&&n.return()}finally{if(t)throw i}}console.log(this.formatAfter),this.$emit("getCoordinateData",this.formatAfter)}}},k={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"all"},[i("div",{staticClass:"content"},[i("div",{staticStyle:{"text-align":"right",width:"100%"}},[i("el-button",{attrs:{type:"text"},on:{click:e.appendRow}},[e._v("新建")])],1),e._v(" "),e._l(e.formatBefore,function(t,a){return i("div",{key:a,staticClass:"contentCascader"},[i("el-cascader",{staticStyle:{width:"100%"},attrs:{size:"mini","expand-trigger":"hover",options:e.options},model:{value:e.formatBefore[a],callback:function(t){e.$set(e.formatBefore,a,t)},expression:"formatBefore[index]"}}),e._v(" "),i("el-button",{attrs:{type:"danger",plain:"",size:"mini"},on:{click:function(i){e.deleteRow(t,a)}}},[e._v("\n        删除\n      ")])],1)}),e._v(" "),i("br"),e._v(" "),i("div",{staticStyle:{"text-align":"center",width:"100%"}},[i("el-button",{on:{click:e.sendData}},[e._v("确定")])],1)],2)])},staticRenderFns:[]};var T=i("VU/8")(y,k,!1,function(e){i("Er1X")},"data-v-566b5163",null).exports,D={props:{mark:{type:String,default:function(){return""}},value:{type:Array,default:function(){return[]}},draggable:{type:Boolean,default:function(){return!1}},showCheckbox:{type:Boolean,default:function(){return!1}},title:{type:String,default:function(){return""}}},data:function(){return{isIndeterminate:!1,checkAll:!1,filterText:"",minTreeData:this.value,defaultProps:{children:"childrens",label:"label"},oneToOne:[{label:"选择器",value:"SELECT"},{label:"文本标签",value:"TEXTAREA"},{label:"多选选择器",value:"SELECTMUTIPLE"},{label:"日期时间选择器",value:"DATETIME"},{label:"计算",value:"CALCULATE"},{label:"单选框",value:"RADIO"},{label:"表格",value:"TABLE"},{label:"日期选择器",value:"DATE"},{label:"整数类型输入框",value:"INT"},{label:"多选框",value:"CHECKBOX"},{label:"输入框",value:"INPUT"},{label:"级联选择器",value:"CASCADER"},{label:"文本单选框",value:"RADIOTEXT"},{label:"文本多选框",value:"CHECKBOXTEXT"},{label:"浮点类型输入框",value:"DOUBLE"}],checkList:["INT","DOUBLE","TEXTAREA","RADIO","RADIOTEXT","CHECKBOX","CHECKBOXTEXT","SELECT","SELECTMUTIPLE","DATE","DATETIME","CASCADER","INPUT","TABLE","CALCULATE"],checkListData:["INT","DOUBLE","TEXTAREA","RADIO","RADIOTEXT","CHECKBOX","CHECKBOXTEXT","SELECT","SELECTMUTIPLE","DATE","DATETIME","CASCADER","INPUT","TABLE","CALCULATE"]}},watch:{filterText:function(e){this.$refs.minTreeData.filter(e)},checkList:function(e){var t=[];if(Array.isArray(e)){var i=!0,a=!1,n=void 0;try{for(var r,o=c()(this.value);!(i=(r=o.next()).done);i=!0){var l=r.value;e.includes(l.type)&&t.push(l)}}catch(e){a=!0,n=e}finally{try{!i&&o.return&&o.return()}finally{if(a)throw n}}}this.minTreeData=t},value:{handler:function(e){this.minTreeData=e}}},created:function(){},methods:{oneToOneText:function(e){var t=!0,i=!1,a=void 0;try{for(var n,r=c()(this.oneToOne);!(t=(n=r.next()).done);t=!0){var o=n.value;if(e===o.value)return o.label}}catch(e){i=!0,a=e}finally{try{!t&&r.return&&r.return()}finally{if(i)throw a}}},handleCheckAllChange:function(e){var t=[],i=!0,a=!1,n=void 0;try{for(var r,o=c()(this.minTreeData);!(i=(r=o.next()).done);i=!0){var l=r.value;this.filterNode(this.filterText,l)&&t.push(l)}}catch(e){a=!0,n=e}finally{try{!i&&o.return&&o.return()}finally{if(a)throw n}}this.$refs.minTreeData.setCheckedNodes(e?t:[]),this.isIndeterminate=!1},filterNode:function(e,t){return!e||-1!==n()(t).toString().toLowerCase().indexOf(e.toLowerCase())},iconJudgeChoose:function(e){var t="";switch(e){case"INPUT":t="ercp-icon-component-input";break;case"INT":case"DOUBLE":t="ercp-icon-component-integer";break;case"TEXTAREA":t="ercp-icon-component-textarea";break;case"RADIO":case"RADIOTEXT":t="ercp-icon-component--radio";break;case"CHECKBOX":case"CHECKBOXTEXT":t="ercp-icon-component-check";break;case"SELECT":case"SELECTMUTIPLE":t="ercp-icon-component-checklist";break;case"DATE":t="ercp-icon-component-date";break;case"DATETIME":t="ercp-icon-component-time";break;case"CASCADER":t="ercp-icon-component-cascade";break;case"CALCULATE":t="ercp-icon-component-compute";break;case"TABLE":t="ercp-icon-component-table";break;default:t="el-icon-info"}return t},allowDrop:function(e,t,i){return"next"===i|"prev"===i},handleCheckChange:function(e,t,i){var a=this.$refs.minTreeData.getCheckedNodes(),n=this.$refs.minTreeData.getCheckedKeys(),r=a.length;this.checkAll=r===this.minTreeData.length,this.isIndeterminate=r>0&&r<this.minTreeData.length,this.$emit("handleCheckChange",a,n,this.mark)},clearCheckAll:function(){this.checkAll=!1,this.isIndeterminate=!1}}},x={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"treeAll"},[i("div",{staticClass:"treeTop"},[i("div",{staticStyle:{"margin-left":"25px",display:"flex","align-items":"center"}},[i("el-checkbox",{attrs:{indeterminate:e.isIndeterminate},on:{change:e.handleCheckAllChange},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}}),e._v(" \n      "+e._s(e.title)+"\n    ")],1),e._v(" "),i("div",{staticStyle:{"margin-right":"25px","font-weight":"400"}},[e._v("\n      "+e._s(e.minTreeData.length)+"\n    ")])]),e._v(" "),i("br"),e._v(" "),i("div",{staticClass:"searchClass",staticStyle:{width:"90.2%",display:"flex"}},[i("el-input",{attrs:{clearable:"",placeholder:"输入关键字进行过滤"},model:{value:e.filterText,callback:function(t){e.filterText="string"==typeof t?t.trim():t},expression:"filterText"}}),e._v(" "),i("el-popover",{attrs:{placement:"bottom-start",width:"300",trigger:"click"}},[i("el-button",{staticStyle:{"border-left":"none","border-radius":"0"},attrs:{slot:"reference"},slot:"reference"},[e._v("筛选")]),e._v(" "),i("el-checkbox-group",{model:{value:e.checkList,callback:function(t){e.checkList=t},expression:"checkList"}},e._l(e.checkListData,function(t,a){return i("el-checkbox",{key:a,staticStyle:{width:"100px","margin-left":"20px","margin-right":"20px"},attrs:{label:t}},[e._v(e._s(e.oneToOneText(t)))])}))],1)],1),e._v(" "),i("br"),e._v(" "),i("div",{staticClass:"treeContent"},[i("el-tree",e._b({ref:"minTreeData",attrs:{"check-on-click-node":"",props:e.defaultProps,"node-key":"id",data:e.minTreeData,"allow-drop":e.allowDrop,"default-expand-all":"","expand-on-click-node":!1,"filter-node-method":e.filterNode},on:{"check-change":e.handleCheckChange},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.node,n=t.data;return i("span",{staticClass:"custom-tree-node"},[i("div",[i("i",{class:e.iconJudgeChoose(n.type)}),e._v("\n            "+e._s(a.label)+"  "+e._s(n.id)+"\n        ")])])}}])},"el-tree",e.$props,!1))],1),e._v(" "),i("div",{staticStyle:{width:"100%"}},[e._t("bottom",[i("div",{staticClass:"bottomDiv"})])],2)])},staticRenderFns:[]};var E=i("VU/8")(D,x,!1,function(e){i("yF9B")},"data-v-446e6d99",null).exports,w=i("t9TI"),_=i("DzDz"),A={components:{sxFormCard:b,sxRelationFactory:g.a,sxCoordinateFactory:T,sxSegmentingLine:C.a,sxMinTree:E},data:function(){return{mozhu:{},relationDialogVisible:!1,previewDialogVisible:!1,coordinateDialogVisible:!1,needCreatedRelation:{},fewStepsTF:!0,cardArr:[{num:"111",state:"术中",icon:"el-icon-goods",name:"ERCP取石结果"},{num:"111",state:"术后",icon:"el-icon-edit",name:"ERCP取石结果"},{state:"术前",icon:"el-icon-goods",name:"ERCP取石结果"}],cardIndex:0,editOrAdd:!1,iconArr:[{label:"麻醉",value:"ercp-icon-medicine-anaesthesia"},{label:"腹部",value:"ercp-icon-medicine-belly"},{label:"取消预约",value:"ercp-icon-medicine-cancel"},{label:"插管",value:"ercp-icon-medicine-cannula"},{label:"并发症",value:"ercp-icon-medicine-complication"},{label:"切开",value:"ercp-icon-medicine-cut"},{label:"诊断",value:"ercp-icon-medicine-diagnosis"},{label:"饮食",value:"ercp-icon-medicine-diet"},{label:"出院评估",value:"ercp-icon-medicine-discharge"},{label:"憩室",value:"ercp-icon-medicine-diverticulum"},{label:"引流",value:"ercp-icon-medicine-drainage"},{label:"饮酒",value:"ercp-icon-medicine-drinking"},{label:"药品",value:"ercp-icon-medicine-drug"},{label:"手术评估",value:"ercp-icon-medicine-estimate"},{label:"扩张",value:"ercp-icon-medicine-expand"},{label:"随访",value:"ercp-icon-medicine-followup"},{label:"胆管",value:"ercp-icon-medicine-gallbladder"},{label:"导丝",value:"ercp-icon-medicine-guidewire"},{label:"医院",value:"ercp-icon-medicine-hospital"},{label:"炎症",value:"ercp-icon-medicine-inflammation"},{label:"输液",value:"ercp-icon-medicine-infusion"},{label:"实验检查",value:"ercp-icon-medicine-laboratory"},{label:"取石",value:"ercp-icon-medicine-lithotomy"},{label:"手术",value:"ercp-icon-medicine-operation"},{label:"肠胰",value:"ercp-icon-medicine-pancreas"},{label:"既往史",value:"ercp-icon-medicine-passhistory"},{label:"五联症",value:"ercp-icon-medicine-pentalogy"},{label:"影像学",value:"ercp-icon-medicine-photograph"},{label:"体格",value:"ercp-icon-medicine-physique"},{label:"造影",value:"ercp-icon-medicine-radiography"},{label:"手术报告",value:"ercp-icon-medicine-report"},{label:"预约",value:"ercp-icon-medicine-reservation"},{label:"床位",value:"ercp-icon-medicine-sickbed"},{label:"一般情况",value:"ercp-icon-medicine-situation"},{label:"胃脏",value:"ercp-icon-medicine-stomach"}],createTopForm:[{id:"id",label:"ID",width:"30%",type:"INPUT",validations:[{required:!0,message:"请输入组件ID",trigger:"change"},{pattern:"^[a-zA-Z][a-zA-Z0-9]+$",message:"以英文字母开头的英文或数字(两位以上)",trigger:"change"}]},{id:"name",label:"表单名称",type:"INPUT",validations:[{required:!0,message:"请输入表单名称",trigger:"change"}]},{width:"23%",id:"phase",value:[{value:"住院基本情况",label:"住院基本情况"},{value:"术前",label:"术前"},{value:"术中",label:"术中"},{value:"术后",label:"术后"},{value:"出院综合评估",label:"出院综合评估"},{value:"随访",label:"随访"}],label:"所属阶段",type:"SELECT",validations:[{required:!0,message:"请选择所属阶段",trigger:"change"}]},{id:"icon",label:"表单图标",type:"ICON",width:"190px",validations:[{required:!0,message:"请选择表单图标",trigger:"change"}]},{id:"description",label:"表单简介",type:"INPUT",width:"60.5%"},{id:"sortIndex",label:"排序索引",type:"INPUTNUMBER",width:"190px"}],lookupData:"",stagelookupData:["住院基本情况","术前","术中","术后","出院综合评估","随访"],stageLookUpArr:["住院基本情况","术前","术中","术后","出院综合评估","随访"],formModel:{},previewFormModel:{},leftChecked:[],rightChecked:[],leftData:[],rightData:[],previewFishData:{}}},created:function(){console.log(this.leftChecked,"---------"),this.firstShow(),this.show()},methods:{show:function(){var e=this;return p()(u.a.mark(function t(){var i;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(_.c)();case 2:t.t0=t.sent,i={formsData:t.t0},e.cardArr=i.formsData?i.formsData.data.entity:[],console.log(e.cardArr,"this.cardArr");case 6:case"end":return t.stop()}},t,e)}))()},firstShow:function(){var e=this;return p()(u.a.mark(function t(){var i;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(w.a)();case 2:i=t.sent,console.log(i),i&&(e.mozhu=i.data.entity);case 5:case"end":return t.stop()}},t,e)}))()},init:function(){this.$set(this.formModel,"relation",{}),this.$set(this.formModel,"coordinate",{}),this.$set(this.formModel,"fields",[]),this.leftData=[].concat(d()(this.mozhu)),this.rightData=[],this.leftChecked=[],this.rightChecked=[],console.log(this.formModel);var e=!0,t=!1,i=void 0;try{for(var a,n=c()(this.createTopForm);!(e=(a=n.next()).done);e=!0){var r=a.value;"INPUTNUMBER"===r.type?this.$set(this.formModel,r.id,this.cardArr.length):this.$set(this.formModel,r.id,"")}}catch(e){t=!0,i=e}finally{try{!e&&n.return&&n.return()}finally{if(t)throw i}}},templateEdit:function(e,t){if(this.init(),this.formModel=o()({},e),console.log(this.formModel,"-----"),console.log(this.mozhu,"---11111111--"),this.formModel.fields){this.rightData=[].concat(d()(this.formModel.fields)),this.leftData=[];var i=[].concat(d()(this.mozhu));for(var a in i){var n=!0,r=!1,l=void 0;try{for(var s,h=c()(this.rightData);!(n=(s=h.next()).done);n=!0){var u=s.value;i[a].id===u.id&&(i[a]=!1)}}catch(e){r=!0,l=e}finally{try{!n&&h.return&&h.return()}finally{if(r)throw l}}}var f=!0,p=!1,v=void 0;try{for(var m,b=c()(i);!(f=(m=b.next()).done);f=!0){var C=m.value;C&&this.leftData.push(C)}}catch(e){p=!0,v=e}finally{try{!f&&b.return&&b.return()}finally{if(p)throw v}}}else this.rightData=[],this.leftData=[].concat(d()(this.mozhu));this.cardIndex=t,this.editOrAdd=!0,this.fewStepsTF=!1},templateDelete:function(e,t){var i=this;return p()(u.a.mark(function a(){return u.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:i.$confirm("此操作将删除表单","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a=p()(u.a.mark(function a(n){return u.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(_.d)(e.id);case 2:a.sent&&i.cardArr.splice(t,1);case 4:case"end":return a.stop()}},a,i)}));return function(e){return a.apply(this,arguments)}}()).catch(function(e){});case 1:case"end":return a.stop()}},a,i)}))()},addForm:function(){this.init(),this.editOrAdd=!1,this.fewStepsTF=!1},iconJudgeChoose:function(e){var t="";switch(e){case"INPUT":t="ercp-icon-component-input";break;case"INT":case"DOUBLE":t="ercp-icon-component-integer";break;case"TEXTAREA":t="ercp-icon-component-textarea";break;case"RADIO":case"RADIOTEXT":t="ercp-icon-component--radio";break;case"CHECKBOX":case"CHECKBOXTEXT":t="ercp-icon-component-check";break;case"SELECT":case"SELECTMUTIPLE":t="ercp-icon-component-checklist";break;case"DATE":t="ercp-icon-component-date";break;case"DATETIME":t="ercp-icon-component-time";break;case"CASCADER":t="ercp-icon-component-cascade";break;case"CALCULATE":t="ercp-icon-component-compute";break;case"TABLE":t="ercp-icon-component-table";break;default:t="el-icon-info"}return t},lookupChange:function(e){return console.log(e),!e.isStatic&&n()(e).toString().includes(this.lookupData)},filterItem:function(e){return this.stagelookupData.includes(e.phase)},handleCheckChange:function(e,t,i){"leftChecked"===i?this.leftChecked=e:this.rightChecked=e},deleteField:function(){for(var e in this.leftData=this.leftData.concat([].concat(d()(this.rightChecked))),this.rightData)for(var t in this.rightChecked)this.rightData[e].id===this.rightChecked[t].id&&this.$delete(this.rightData,e);this.rightChecked=[],this.$refs.minTreeTwo.clearCheckAll()},addField:function(){for(var e in this.rightData=this.rightData.concat([].concat(d()(this.leftChecked))),this.leftData)for(var t in this.leftChecked)this.leftData[e].id===this.leftChecked[t].id&&this.$delete(this.leftData,e);this.leftChecked=[],this.$refs.minTreeOne.clearCheckAll()},renderFunc:function(e,t){return e("span",null,["  ",e("i",{class:this.iconJudgeChoose(t.type)}),"   ",t.label])},transferHandleChange:function(e,t,i){console.log(e)},openRelation:function(){this.$set(this.formModel,"fields",[].concat(d()(this.rightData))),this.formModel.relation=this.formModel.relation?this.formModel.relation:{},this.needCreatedRelation={id:this.formModel.id,relation:this.formModel.relation,subFields:this.formModel.fields},this.relationDialogVisible=!0},getRealationData:function(e,t){this.formModel.relation=o()({},e),this.relationDialogVisible=!1},openCoordinate:function(){this.$set(this.formModel,"fields",[].concat(d()(this.rightData))),this.needCreatedCoordinate={coordinate:this.formModel.coordinate,subFields:this.formModel.fields},this.coordinateDialogVisible=!0},getCoordinateData:function(e,t){this.formModel.coordinate=o()({},e),this.coordinateDialogVisible=!1},openPreview:function(){console.log(this.rightData),this.previewFishData={},this.previewFormModel=o()({},this.formModel),this.$set(this.previewFormModel,"fields",[].concat(d()(this.rightData))),this.previewDialogVisible=!0},editAddBack:function(){console.log(this.formModel),console.log(this.cardArr),this.fewStepsTF=!0},editAddForm:function(){var e,t=this;this.$refs.formModel.validate((e=p()(u.a.mark(function e(i){var a,n,r,o,l,s,d,h;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!i){e.next=39;break}for(a=[],n=!0,r=!1,o=void 0,e.prev=5,l=c()(t.rightData);!(n=(s=l.next()).done);n=!0)d=s.value,a.push({id:d.id});e.next=13;break;case 9:e.prev=9,e.t0=e.catch(5),r=!0,o=e.t0;case 13:e.prev=13,e.prev=14,!n&&l.return&&l.return();case 16:if(e.prev=16,!r){e.next=19;break}throw o;case 19:return e.finish(16);case 20:return e.finish(13);case 21:if(t.$set(t.formModel,"fields",a),!t.checkUpData()){e.next=37;break}if(h="",!t.editOrAdd){e.next=30;break}return e.next=27,Object(_.b)(t.formModel);case 27:h=e.sent,e.next=33;break;case 30:return e.next=32,Object(_.a)(t.formModel);case 32:h=e.sent;case 33:if(!h){e.next=37;break}return t.fewStepsTF=!0,e.next=37,t.show();case 37:e.next=40;break;case 39:return e.abrupt("return",!1);case 40:case"end":return e.stop()}},e,t,[[5,9,13,21],[14,,16,20]])})),function(t){return e.apply(this,arguments)}))},checkUpData:function(){var e=/[a-zA-Z][a-zA-Z0-9]*/g,t=!0,i=!1,a=void 0;try{for(var n,r=c()(this.formModel.fields);!(t=(n=r.next()).done);t=!0){var o=n.value,l=!0,s=!1,d=void 0;try{for(var h,u=c()(this.mozhu);!(l=(h=u.next()).done);l=!0){var f=h.value;if(f.id===o.id&"CALCULATE"===f.type){var p=f.calculate.match(e)?f.calculate.match(e):[],v=[],m=[],b=!1,C=!0,g=!1,y=void 0;try{for(var k,T=c()(p);!(C=(k=T.next()).done);C=!0){var D=k.value;b=!1;var x=!0,E=!1,w=void 0;try{for(var _,A=c()(this.formModel.fields);!(x=(_=A.next()).done);x=!0){if(_.value.id===D){b=!0;break}}}catch(e){E=!0,w=e}finally{try{!x&&A.return&&A.return()}finally{if(E)throw w}}b||m.push(D)}}catch(e){g=!0,y=e}finally{try{!C&&T.return&&T.return()}finally{if(g)throw y}}var M=!0,O=!1,S=void 0;try{for(var L,I=c()(this.mozhu);!(M=(L=I.next()).done);M=!0){var R=L.value,F=!0,B=!1,U=void 0;try{for(var $,X=c()(m);!(F=($=X.next()).done);F=!0){var N=$.value;R.id===N&&v.push(R.label)}}catch(e){B=!0,U=e}finally{try{!F&&X.return&&X.return()}finally{if(B)throw U}}}}catch(e){O=!0,S=e}finally{try{!M&&I.return&&I.return()}finally{if(O)throw S}}return!m.length||(this.$message({showClose:!0,message:"计算中有字段模板中未添加 "+v.toString(),type:"warning"}),!1)}}}catch(e){s=!0,d=e}finally{try{!l&&u.return&&u.return()}finally{if(s)throw d}}}}catch(e){i=!0,a=e}finally{try{!t&&r.return&&r.return()}finally{if(i)throw a}}return!0}}},M={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"formAll"},[i("div",{staticClass:"formContent"},[e.fewStepsTF?i("div",{staticClass:"formContentTop"},[i("div",{staticClass:"formTop"},[i("div",{staticClass:"formTopLeft"},[i("div",{staticClass:"formTopLeftLeft"},[i("el-input",{attrs:{size:"small",placeholder:"检索表单",clearable:"","prefix-icon":"el-icon-search"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.lookupChange(t)}},model:{value:e.lookupData,callback:function(t){e.lookupData=t},expression:"lookupData"}})],1),e._v(" "),i("div",{staticClass:"formTopLeftRight"},[e._v("\n              阶段筛选:     \n              "),i("el-checkbox-group",{model:{value:e.stagelookupData,callback:function(t){e.stagelookupData=t},expression:"stagelookupData"}},e._l(e.stageLookUpArr,function(t,a){return i("el-checkbox",{key:a,staticStyle:{margin:"0px 5px"},attrs:{label:t}},[e._v(e._s(t))])}))],1)]),e._v(" "),i("div",{staticClass:"formTopRight"},[i("el-button",{attrs:{type:"primary"},on:{click:e.addForm}},[e._v("新增表单")])],1)]),e._v(" "),i("div",{staticClass:"formCard"},[i("div",{staticClass:"formCardContent"},e._l(e.cardArr,function(t,a){return e.lookupChange(t)&e.filterItem(t)?i("sx-form-card",{key:a,staticClass:"formCardContentCard",attrs:{cardObj:t,index:a},on:{templateEdit:e.templateEdit,templateDelete:e.templateDelete}}):e._e()}))])]):e._e(),e._v(" "),e.fewStepsTF?e._e():i("div",{staticClass:"createFormContent"},[i("div",{staticClass:"createTop"},[i("el-button",{attrs:{type:"info"},on:{click:e.editAddBack}},[e._v("返回")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.editAddForm}},[e._v("保存")])],1),e._v(" "),i("div",{staticClass:"createTopForm"},[i("el-form",{ref:"formModel",staticStyle:{display:"flex","flex-wrap":"wrap"},attrs:{size:"small",model:e.formModel,"label-width":"90px"}},e._l(e.createTopForm,function(t,a){return i("el-form-item",{key:a,style:{width:t.width},attrs:{prop:t.id,rules:t.validations,label:t.label}},["INPUT"===t.type?i("el-input",{staticStyle:{width:"100%"},attrs:{placeholder:t.placeholder},model:{value:e.formModel[t.id],callback:function(i){e.$set(e.formModel,t.id,"string"==typeof i?i.trim():i)},expression:"formModel[item.id]"}}):e._e(),e._v(" "),"SELECT"===t.type?i("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:t.placeholder},model:{value:e.formModel[t.id],callback:function(i){e.$set(e.formModel,t.id,i)},expression:"formModel[item.id]"}},e._l(t.value,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})):e._e(),e._v(" "),"ICON"===t.type?i("el-popover",{staticClass:"iconPopover",attrs:{placement:"bottom-start",width:"500",trigger:"hover"}},[i("el-radio-group",{staticStyle:{margin:"8px"},model:{value:e.formModel[t.id],callback:function(i){e.$set(e.formModel,t.id,i)},expression:"formModel[item.id]"}},e._l(e.iconArr,function(t,a){return i("el-radio",{key:a,staticStyle:{width:"100px",margin:"10px"},attrs:{label:t.value}},[i("i",{class:t.value,staticStyle:{"font-size":"18px"}}),e._v(" "+e._s(t.label)+"\n                  ")])})),e._v(" "),i("el-button",{attrs:{slot:"reference",icon:e.formModel[t.id]?e.formModel[t.id]:"el-icon-plus",circle:""},slot:"reference"})],1):e._e(),e._v(" "),"INPUTNUMBER"===t.type?i("el-input-number",{attrs:{min:0},model:{value:e.formModel[t.id],callback:function(i){e.$set(e.formModel,t.id,i)},expression:"formModel[item.id]"}}):e._e()],1)}))],1),e._v(" "),i("sx-segmenting-line",[i("div",{staticClass:"centerCenter",attrs:{slot:"prepend"},slot:"prepend"},[i("i",{staticClass:"el-icon-setting centerCenterIcon"}),e._v(" 字段设置\n        ")])]),e._v(" "),i("br"),e._v(" "),i("div",{staticClass:"createContent"},[i("sx-min-tree",{ref:"minTreeOne",staticStyle:{width:"400px"},attrs:{title:"字段库",mark:"leftChecked",showCheckbox:""},on:{handleCheckChange:e.handleCheckChange},model:{value:e.leftData,callback:function(t){e.leftData=t},expression:"leftData"}}),e._v(" "),i("div",{staticStyle:{display:"flex","flex-grow":"0.1","flex-direction":"column","align-self":"center","justify-content":"center",padding:"35px"}},[i("div",[i("el-button",{staticStyle:{width:"100%"},attrs:{disabled:Boolean(!e.rightChecked.length),type:"primary",icon:"el-icon-arrow-left"},on:{click:e.deleteField}},[e._v("\n              删除字段")])],1),e._v(" "),i("div",{staticStyle:{"margin-top":"15px"}},[i("el-button",{staticStyle:{width:"100%"},attrs:{disabled:Boolean(!e.leftChecked.length),type:"primary",icon:"el-icon-arrow-right"},on:{click:e.addField}},[e._v("\n              增加字段")])],1)]),e._v(" "),i("sx-min-tree",{ref:"minTreeTwo",staticStyle:{width:"400px"},attrs:{title:"当前表",mark:"rightChecked",draggable:"",showCheckbox:""},on:{handleCheckChange:e.handleCheckChange},model:{value:e.rightData,callback:function(t){e.rightData=t},expression:"rightData"}},[i("div",{staticClass:"createContentBottom",attrs:{slot:"bottom"},slot:"bottom"},[i("el-button",{attrs:{size:"mini"},on:{click:e.openRelation}},[e._v("关联关系")]),e._v(" "),i("el-button",{attrs:{size:"mini"},on:{click:e.openCoordinate}},[e._v("排版")]),e._v(" "),i("el-button",{attrs:{size:"mini"},on:{click:e.openPreview}},[e._v("预览")])],1)])],1)],1)]),e._v(" "),e.relationDialogVisible?i("el-dialog",{attrs:{title:"关联关系","append-to-body":"",visible:e.relationDialogVisible},on:{"update:visible":function(t){e.relationDialogVisible=t}}},[i("div",{staticStyle:{width:"100%"}},[i("sx-relation-factory",{attrs:{needCreatedRelation:e.needCreatedRelation},on:{getRealationData:e.getRealationData}})],1)]):e._e(),e._v(" "),e.coordinateDialogVisible?i("el-dialog",{attrs:{title:"排版","append-to-body":"",visible:e.coordinateDialogVisible},on:{"update:visible":function(t){e.coordinateDialogVisible=t}}},[i("div",{staticStyle:{width:"100%"}},[i("sx-coordinate-factory",{attrs:{needCreatedCoordinate:e.needCreatedCoordinate},on:{getCoordinateData:e.getCoordinateData}})],1)]):e._e(),e._v(" "),e.previewDialogVisible?i("el-dialog",{attrs:{width:"1000px",title:"预览","append-to-body":"",visible:e.previewDialogVisible},on:{"update:visible":function(t){e.previewDialogVisible=t}}},[i("div",{staticStyle:{width:"100%"}},[i("sx-min-form",{ref:"thatFormPreview",attrs:{mozhu:e.previewFormModel},model:{value:e.previewFishData,callback:function(t){e.previewFishData=t},expression:"previewFishData"}})],1)]):e._e()],1)},staticRenderFns:[]};var O=i("VU/8")(A,M,!1,function(e){i("8sbH"),i("m5e/")},"data-v-f74c2b5e",null);t.default=O.exports},Z4E1:function(e,t){},"m5e/":function(e,t){},yF9B:function(e,t){}});