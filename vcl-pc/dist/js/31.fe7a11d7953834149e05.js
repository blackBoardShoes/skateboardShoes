webpackJsonp([31],{Os9L:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("woOf"),i=a.n(l),n=a("Xxa5"),s=a.n(n),o=a("exGp"),r=a.n(o),c=a("zRAg"),u=a("tR1G"),p=a("YaB9"),d={name:"Project_detail_member",data:function(){return{tableData:[{hospNum:"2321323232",serialNum:"654564321123",name:"王小虎",gender:"男",dischargeStatus:"健康",joinTime:"2018-09-10"},{hospNum:"2321323232",serialNum:"654564321123",name:"王小虎",gender:"男",dischargeStatus:"不健康",joinTime:"2018-09-10"},{hospNum:"2321323232",serialNum:"654564321123",name:"王小虎",gender:"男",dischargeStatus:"健康",joinTime:"2018-09-10"},{hospNum:"2321323232",serialNum:"654564321123",name:"王小虎",gender:"男",dischargeStatus:"健康",joinTime:"2018-09-10"}],tableData2:[],pageSize:10,currentPage:1,total:40,addCase:!0,hospitalRecords:[],hospitalExample:{field:{value:[],options:[]},relation:{value:"",options:[],type:""},target:{value:"",options:[],type:""}},basicInfomations:[],basicExample:{field:{value:[],options:[{label:"基本信息",value:"basic",children:[{label:"性别",value:"gender"},{label:"民族",value:"nation"},{label:"常住地址",value:"dizhi"}]}],type:""},relation:{value:"",options:[{label:"等于",value:"equal"}],type:""},target:{value:[],options:[],type:""}},addressOption:[],recordTemplates:[],recordSelectOptions:[],relationOptions:[{type:["INPUT","TEXTAREA","CALCULATE","INT","DOUBLE","RADIOTEXT"],typeOptions:[{label:"等于",value:"equal"},{label:"不等于",value:"unequal"},{label:"大于",value:"morethan"},{label:"小于",value:"lessthan"}]},{type:["RADIO","SELECT"],typeOptions:[{label:"等于",value:"equal"},{label:"不等于",value:"unequal"}]},{type:["CHECKBOX","SELECTMUTIPLE","CHECKBOXTEXT"],typeOptions:[{label:"等于",value:"equal"}]},{type:["CASCADER"],typeOptions:[{label:"等于",value:"equal"}]},{type:["DATE"],typeOptions:[{label:"等于",value:"equal"},{label:"不等于",value:"unequal"},{label:"大于",value:"morethan"},{label:"小于",value:"lessthan"}]},{type:["DATETIME"],typeOptions:[{label:"等于",value:"equal"},{label:"不等于",value:"unequal"},{label:"大于",value:"morethan"},{label:"小于",value:"lessthan"}]}],leaveTime:[],operateTime:[],showConditions:!1,filterCondition:{}}},mounted:function(){this.addressOption=c.a,this.getFormTemplate(),this.initComponent(this.hospitalRecords,this.hospitalExample),this.initComponent(this.basicInfomations,this.basicExample)},methods:{viewCase:function(e){this.$message.warning("查看的是"+e.name)},SizeChange:function(e){},changePage:function(e){},add:function(){this.addCase=!0},clear:function(){this.$message.warning("清空案例")},getFormTemplate:function(){var e=this;return r()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(u.c)();case 2:"SUCCESS"===(a=t.sent).data.mitiStatus?(e.recordTemplates=a.data.entity,e.initFieldOptions()):e.$message.error("ERROR: "+a.data.message);case 4:case"end":return t.stop()}},t,e)}))()},initFieldOptions:function(){var e=[{value:"住院基本情况",label:"住院基本情况",children:[]},{value:"术前",label:"术前",children:[]},{value:"术中",label:"术中",children:[]},{value:"术后",label:"术后",children:[]},{value:"出院综合评估",label:"出院综合评估",children:[]}];this.recordTemplates.forEach(function(t){t.label=t.name,t.value=t.id,t.fields&&(t.children=t.fields,t.children.forEach(function(e){e.value=e.id,e.reference=void 0===e.values?[]:e.values,e.subFields.length>0?(e.children=e.subFields,e.children.forEach(function(e){e.value=e.id,e.reference=void 0===e.values?[]:e.values,e.children=null})):e.children=null})),e.forEach(function(e){e.value===t.phase&&e.children.push(t)})}),this.recordSelectOptions=e},changeRelaAndTarget:function(e,t){var a=e.value;if(0===a.length)this.hospitalRecords[t].relation={value:"",options:[],type:""},this.hospitalRecords[t].target.type={value:"",options:[],type:""};else{var l=this.recordTemplates.find(function(e){return e.id===a[1]});if(l){var i=l.fields.find(function(e){return e.id===a[2]});if(this.hospitalRecords[t].relation={value:"",options:[],type:i.type},this.hospitalRecords[t].target={value:"",options:i.values||i.children,type:i.type},this.relationOptions[3].type.includes(i.type)&&(this.hospitalRecords[t].target.value=[]),i.children){var n=i.children.find(function(e){return e.id===a[3]});this.hospitalRecords[t].relation={value:"",options:[],type:n.type},this.hospitalRecords[t].target={value:"",options:n.values||n.children,type:n.type},this.relationOptions[3].type.includes(n.type)&&(this.hospitalRecords[t].target.value=[])}}}},changeRelaAndTarget2:function(e,t){this.basicInfomations[t].target.value="",this.basicInfomations[t].relation.value="";var a=e.value[1];"gender"===a?this.basicInfomations[t].target.options=[{label:"男",value:1},{label:"女",value:0}]:"dizhi"===a?(this.basicInfomations[t].target.value=[],this.basicInfomations[t].target.options=c.a):"nation"===a&&(this.basicInfomations[t].target.options=[{label:"汉族",value:"汉族"},{label:"回族",value:"回族"},{label:"藏族",value:"藏族"}])},initComponent:function(e,t){var a=i()({},t);e.push(a)},addOne:function(e){1===e?this.hospitalRecordsAble?this.initComponent(this.hospitalRecords,this.hospitalExample):this.$message.info("请先填写完毕当前一组住院记录筛选条件再新增"):this.basicInfoAble?this.initComponent(this.basicInfomations,this.basicExample):this.$message.info("请先填写完毕当前一组基本信息筛选条件再新增")},deleteOne:function(e,t){1===e?this.hospitalRecords.length>1?this.hospitalRecords.splice(t,1):this.$message.info("不能再删除了"):this.basicInfomations.length>1?this.basicInfomations.splice(t,1):this.$message.info("不能再删除了")},filterPaients:function(e){var t=this;return r()(s.a.mark(function a(){var l,i;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return l=e,a.next=3,Object(p.g)(l);case 3:"SUCCESS"===(i=a.sent).data.mitiStatus||t.$message.error("ERROR: "+i.data.message);case 5:case"end":return a.stop()}},a,t)}))()},searchCase:function(){this.basicInfomations.forEach(function(e){})}},watch:{hospitalRecords:{handler:function(e){this.hospitalExample={field:{value:[],options:[]},relation:{value:"",options:[],type:""},target:{value:"",options:[],type:""}};var t=!0;e.forEach(function(e){for(var a in e)""!==e[a].value&&e[a].value!==[]||(t=!1)}),this.hospitalRecordsAble=t},deep:!0},basicInfomations:{handler:function(e){this.basicExample={field:{value:[],options:[{label:"基本信息",value:"basic",children:[{label:"性别",value:"gender"},{label:"民族",value:"nation"},{label:"常住地址",value:"dizhi"}]}],type:""},relation:{value:"",options:[{label:"等于",value:"equal"},{label:"不等于",value:"unequal"}],type:""},target:{value:[],options:[],type:""}};var t=!0;e.forEach(function(e){for(var a in e)""!==e[a].value&&e[a].value!==[]||(t=!1)}),this.basicInfoAble=t},deep:!0}}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"project-member"}},[a("div",{staticClass:"operate-buttons align-right"},[a("el-button",{attrs:{size:"medium",type:"primary"},on:{click:e.clear}},[e._v("清空记录")]),e._v(" "),a("el-button",{attrs:{size:"medium",type:"primary"},on:{click:e.add}},[e._v("添加记录")])],1),e._v(" "),a("div",{staticClass:"project-info"},[a("el-table",{staticClass:"absolute-table",staticStyle:{width:"100%"},attrs:{data:e.tableData,height:"100%",size:"medium",fit:""}},[a("el-table-column",{attrs:{prop:"hospNum",align:"center",label:"住院号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"serialNum",align:"center",label:"编号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",align:"center",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"gender",align:"center",label:"性别"}}),e._v(" "),a("el-table-column",{attrs:{prop:"dischargeStatus",align:"center",label:"出院状态"}}),e._v(" "),a("el-table-column",{attrs:{prop:"joinTime",align:"center",label:"入组日期"}}),e._v(" "),a("el-table-column",{attrs:{prop:"operate",align:"center",label:"操作",fixed:"right",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:function(a){e.viewCase(t.row)}}},[e._v("查看")])]}}])})],1)],1),e._v(" "),a("div",{staticClass:"pagination align-right"},[a("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper","page-sizes":[10,15,20],total:e.total,"current-page":e.currentPage,"page-size":e.pageSize},on:{"size-change":e.SizeChange,"current-change":e.changePage}})],1),e._v(" "),a("div",{class:{filter:!0,"filter-disapper":!e.addCase}},[a("div",{staticClass:"filter-head"},[e._v("数据筛选\n      ")]),e._v(" "),a("div",{staticClass:"filter-condition"},[e._l(e.hospitalRecords,function(t,l){return a("div",{key:l+111,staticClass:"basic-info-filter"},[a("div",{staticClass:"case"},[a("el-cascader",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择住院信息字段",options:e.recordSelectOptions},on:{change:function(a){e.changeRelaAndTarget(t.field,l)}},model:{value:t.field.value,callback:function(a){e.$set(t.field,"value",a)},expression:"info.field.value"}})],1),e._v(" "),a("div",{staticClass:"case"},[""!==t.relation.type?a("el-select",{attrs:{placeholder:"请选择住院信息筛选"},model:{value:t.relation.value,callback:function(a){e.$set(t.relation,"value",a)},expression:"info.relation.value"}},e._l(e.relationOptions.find(function(e){return e.type.includes(t.relation.type)}).typeOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})):e._e()],1),e._v(" "),a("div",{staticClass:"case"},[e.relationOptions[0].type.includes(t.target.type)?a("el-input",{staticStyle:{width:"95%"},attrs:{placeholder:"请填写住院信息目标值"},model:{value:t.target.value,callback:function(a){e.$set(t.target,"value",a)},expression:"info.target.value"}}):e._e(),e._v(" "),e.relationOptions[1].type.includes(t.target.type)?a("el-select",{attrs:{placeholder:"请选择住院信息目标值"},model:{value:t.target.value,callback:function(a){e.$set(t.target,"value",a)},expression:"info.target.value"}},e._l(t.target.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})):e._e(),e._v(" "),e.relationOptions[3].type.includes(t.target.type)?a("el-cascader",{attrs:{options:t.target.options,placeholder:"请选择住院信息目标值"},model:{value:t.target.value,callback:function(a){e.$set(t.target,"value",a)},expression:"info.target.value"}}):e._e(),e._v(" "),e.relationOptions[4].type.includes(t.target.type)?a("el-date-picker",{staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},model:{value:t.target.value,callback:function(a){e.$set(t.target,"value",a)},expression:"info.target.value"}}):e._e(),e._v(" "),e.relationOptions[5].type.includes(t.target.type)?a("el-date-picker",{staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"选择日期时间"},model:{value:t.target.value,callback:function(a){e.$set(t.target,"value",a)},expression:"info.target.value"}}):e._e()],1),e._v(" "),a("div",{staticClass:"add-case"},[a("el-button",{staticClass:"ercp-icon-general-decrease",attrs:{type:"text",size:"mini"},on:{click:function(t){e.deleteOne(1,l)}}}),e._v(" "),a("el-button",{staticClass:"ercp-icon-general-append",attrs:{type:"text",size:"mini"},on:{click:function(t){e.addOne(1)}}})],1)])}),e._v(" "),e._l(e.basicInfomations,function(t,l){return a("div",{key:l+222,staticClass:"record-info-filter"},[a("div",{staticClass:"case"},[a("el-cascader",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择基本信息字段",options:t.field.options},on:{change:function(a){e.changeRelaAndTarget2(t.field,l)}},model:{value:t.field.value,callback:function(a){e.$set(t.field,"value",a)},expression:"record.field.value"}})],1),e._v(" "),a("div",{staticClass:"case"},[t.field.value.length>0?a("el-select",{attrs:{placeholder:"请选择基本信息筛选"},model:{value:t.relation.value,callback:function(a){e.$set(t.relation,"value",a)},expression:"record.relation.value"}},e._l(t.relation.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})):e._e()],1),e._v(" "),a("div",{staticClass:"case"},["gender"===t.field.value[1]||"nation"===t.field.value[1]?a("el-select",{attrs:{"allow-create":"nation"===t.field.value[1],filterable:"nation"===t.field.value[1],placeholder:"nation"===t.field.value[1]?"请选择或填写民族":"请选择性别"},model:{value:t.target.value,callback:function(a){e.$set(t.target,"value",a)},expression:"record.target.value"}},e._l(t.target.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})):e._e(),e._v(" "),"dizhi"===t.field.value[1]?a("el-cascader",{attrs:{"change-on-select":!0,options:e.addressOption,placeholder:"请选择常住地址"},model:{value:t.target.value,callback:function(a){e.$set(t.target,"value",a)},expression:"record.target.value"}}):e._e()],1),e._v(" "),a("div",{staticClass:"add-case"},[a("el-button",{staticClass:"ercp-icon-general-decrease",attrs:{type:"text",size:"mini"},on:{click:function(t){e.deleteOne(2,l)}}}),e._v(" "),a("el-button",{staticClass:"ercp-icon-general-append",attrs:{type:"text",size:"mini"},on:{click:function(t){e.addOne(2)}}})],1)])}),e._v(" "),a("div",{staticClass:"other-info-filter"},[a("div",{staticClass:"case1"},[a("span",{staticClass:"light-text"},[e._v("手术日期")]),e._v(" "),a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.operateTime,callback:function(t){e.operateTime=t},expression:"operateTime"}})],1),e._v(" "),a("div",{staticClass:"case2"},[a("span",{staticClass:"light-text"},[e._v("出院日期")]),e._v(" "),a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.leaveTime,callback:function(t){e.leaveTime=t},expression:"leaveTime"}})],1)]),e._v(" "),a("div",{staticClass:"operate-space"},[a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.searchCase}},[e._v("开始检索")])],1)],2),e._v(" "),a("div",{staticClass:"filter-cases"},[a("el-table",{staticClass:"absolute-table",staticStyle:{width:"100%"},attrs:{data:e.tableData2,height:"100%",size:"medium",border:"",fit:""}},[a("el-table-column",{attrs:{prop:"hospNum",align:"center",label:"住院号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"serialNum",align:"center",label:"编号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",align:"center",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"gender",align:"center",label:"性别"}}),e._v(" "),a("el-table-column",{attrs:{prop:"dischargeStatus",align:"center",label:"出院状态"}}),e._v(" "),a("el-table-column",{attrs:{prop:"joinTime",align:"center",label:"入组日期"}}),e._v(" "),a("el-table-column",{attrs:{prop:"operate",align:"center",label:"操作",fixed:"right",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:function(a){e.viewCase(t.row)}}},[e._v("查看")])]}}])})],1)],1),e._v(" "),a("div",{staticClass:"pagination align-right"},[a("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper","page-sizes":[10,15,20],total:e.total,"current-page":e.currentPage,"page-size":e.pageSize},on:{"size-change":e.SizeChange,"current-change":e.changePage}})],1),e._v(" "),e.showConditions?a("div",{staticClass:"filter-conditions er-card",on:{dblclick:function(t){e.showConditions=!1}}},[e._v("\n      "+e._s(e.filterCondition)+"\n    ")]):e._e()])])},staticRenderFns:[]};var h=a("VU/8")(d,v,!1,function(e){a("UpVr")},"data-v-29302761",null);t.default=h.exports},UpVr:function(e,t){}});