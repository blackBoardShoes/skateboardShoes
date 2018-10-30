<template>
  <div id="project-member">
    <div class="operate-buttons align-right">
      <el-button size="medium" type="primary" @click="clear">清空记录</el-button>
      <el-button size="medium" type="primary" @click="add">添加记录</el-button>
    </div>
    <div class="project-info">
      <el-table
        class="absolute-table"
        :data="tableData"
        height="100%"
        style="width: 100%"
        size="medium"
        fit>
        <el-table-column
          prop="hospNum"
          align="center"
          label="住院号">
        </el-table-column>
        <el-table-column
          prop="serialNum"
          align="center"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="gender"
          align="center"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="dischargeStatus"
          align="center"
          label="出院状态">
        </el-table-column>
        <el-table-column
          prop="joinTime"
          align="center"
          label="入组日期">
        </el-table-column>
        <el-table-column
          prop="operate"
          align="center"
          label="操作"
          fixed="right"
          width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="small" plain @click="viewCase(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination align-right">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 15, 20]"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        @size-change= "SizeChange"
        @current-change = "changePage"
      >
      </el-pagination>
    </div>
    <div :class="{'filter': true, 'filter-disapper': !addCase}">
      <div class="filter-head"><span class="ercp-icon-module-patient primary-text"></span> -  设置入组条件 <span class="ercp-icon-general-next" @click="addCase = false"></span> </div>
      <div class="filter-condition">
        <div class="basic-info-filter" v-for="(info, index) in basicList" :key="index + 111" style="background-color:teal;">
          {{index}}
          <div class="case" v-for="(value, key ,index2) in info" :key="index2 + key">
            {{key}}
          </div>
          <div class="add-case">
            <el-button type="text" size="mini" class="el-icon-plus" @click="addOne(1)"></el-button>
            <el-button type="text" size="mini" class="el-icon-minus" @click="deleteOne(1, index)"></el-button>
          </div>
        </div>
        <div class="record-info-filter" v-for="(record, index) in recordList" :key="index + 222" style="background-color:orange;">
          {{index}}
          <div class="case" v-for="(value, key ,index2) in record" :key="index2 + key">
            {{key}}
          </div>
          <div class="add-case">
            <el-button type="text" size="mini" class="el-icon-plus" @click="addOne(2)"></el-button>
            <el-button type="text" size="mini" class="el-icon-minus" @click="deleteOne(2, index)"></el-button>
          </div>
        </div>
        <div class="other-info-filter"  style="background-color:pink;">
          时间筛选
        </div>
        <div class="operate-space"  style="background-color:skyblue;">操作区域</div>
      </div>
      <div class="filter-cases">
        <el-table
          class="absolute-table"
          :data="tableData2"
          height="100%"
          style="width: 100%"
          size="medium"
          border
          fit>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="hospNum"
            align="center"
            label="住院号">
          </el-table-column>
          <el-table-column
            prop="serialNum"
            align="center"
            label="编号">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="gender"
            align="center"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="dischargeStatus"
            align="center"
            label="出院状态">
          </el-table-column>
          <el-table-column
            prop="joinTime"
            align="center"
            label="入组日期">
          </el-table-column>
          <el-table-column
            prop="operate"
            align="center"
            label="操作"
            fixed="right"
            width="180">
            <template slot-scope="scope">
              <el-button type="primary" size="small" plain @click="viewCase(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination align-right">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 15, 20]"
          :total="total"
          :current-page="currentPage"
          :page-size="pageSize"
          @size-change= "SizeChange"
          @current-change = "changePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {getAllFormTemplates} from '../../../../api/patient/patient.js'
export default {
  name: 'Project_detail_member',
  data () {
    return {
      tableData: [
        {
          hospNum: '2321323232',
          serialNum: '654564321123',
          name: '王小虎',
          gender: '男',
          dischargeStatus: '健康',
          joinTime: '2018-09-10'
        },
        {
          hospNum: '2321323232',
          serialNum: '654564321123',
          name: '王小虎',
          gender: '男',
          dischargeStatus: '不健康',
          joinTime: '2018-09-10'
        },
        {
          hospNum: '2321323232',
          serialNum: '654564321123',
          name: '王小虎',
          gender: '男',
          dischargeStatus: '健康',
          joinTime: '2018-09-10'
        },
        {
          hospNum: '2321323232',
          serialNum: '654564321123',
          name: '王小虎',
          gender: '男',
          dischargeStatus: '健康',
          joinTime: '2018-09-10'
        }
      ],
      tableData2: [],
      // 分页信息
      pageSize: 10,
      currentPage: 1,
      total: 40,
      addCase: true,
      basicList: [],
      basicItem: {
        module: {
          value: '',
          options: []
        },
        field: {
          value: '',
          options: []
        },
        relation: {
          value: '',
          options: []
        },
        target: {
          value: '',
          options: []
        },
        andOr: {
          value: '',
          options: []
        }
      },
      recordList: [],
      recordItem: {
        module: {
          value: '',
          options: []
        },
        field: {
          value: '',
          options: []
        },
        relation: {
          value: '',
          options: []
        },
        target: {
          value: '',
          options: []
        },
        andOr: {
          value: '',
          options: []
        }
      },
      recordTemplates: []
    }
  },
  mounted () {
    this.getFormTemplate()
    this.initComponent(this.basicList, this.basicItem)
    this.initComponent(this.recordList, this.recordItem)
  },
  methods: {
    viewCase (value) {
      this.$message.warning('查看的是' + value.name)
    },
    // 列表页码信息
    SizeChange (size) {
      console.log(size)
      // this.getProject(size, this.currentPage)
    },
    changePage (page) {
      console.log(page)
      // this.getProject(this.pageSize, page)
    },
    // 以下为筛选条件的代码区域
    // 获取表单模板
    async getFormTemplate () {
      let response = await getAllFormTemplates()
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        this.recordTemplates = response.data.entity
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    add () {
      this.addCase = true
    },
    clear () {
      this.$message.warning('清空案例')
    },
    initComponent (array, item) {
      let obj = Object.assign({}, item)
      array.push(obj)
    },
    addOne (index) {
      if (index === 1) {
        this.initComponent(this.basicList, this.basicItem)
      } else {
        this.initComponent(this.recordList, this.recordItem)
      }
    },
    deleteOne (index, rowIndex) {
      if (index === 1) {
        if (this.basicList.length > 1) {
          this.basicList.splice(rowIndex, 1)
        } else {
          this.$message.info('不能删除了')
        }
      } else {
        if (this.recordList.length > 1) {
          this.recordList.splice(rowIndex, 1)
        } else {
          this.$message.info('不能删除了')
        }
      }
    }
    // 初始化条件:
    // initialComponent1 () {
    //   this.item = {
    //     selectedConditions: '',
    //     relationship: '',
    //     target: '',
    //     type: '',
    //     andOr: ''
    //   }
    //   this.rowOption = {
    //     fieldOptions: [],
    //     options1: [],
    //     options2: [],
    //     options3: [],
    //     options5: []
    //   }
    //   let obj = Object.assign({}, this.item)
    //   this.list.push(obj)
    //   let obj2 = Object.assign({}, this.rowOption)
    //   this.rowsOptions.push(obj2)
    // },
    // // 添加条件栏
    // addItem1 (item) {
    //   let flag = true;
    //   for (let key in item) {
    //     if (item[key] === '') {
    //       flag = false;
    //       this.$message({
    //         message: '请将当前筛选条件填写完整之后，再添加新条件',
    //         type: 'warning'
    //       });
    //     }
    //   }
    //   if (flag) {
    //     let obj = Object.assign({}, this.item)
    //     this.list.push(obj)
    //     let obj2 = Object.assign({}, this.rowOption)
    //     this.rowsOptions.push(obj2)
    //   }
    // },
    // // 删除条件栏
    // deleteItem1 (item, index) {
    //   this.$confirm('此操作将删除当前条件 ，是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.list.splice(index, 1)
    //     this.rowsOptions.splice(index, 1)
    //     this.$message({
    //       type: 'success',
    //       message: '删除成功!'
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/variable';
  #project-member{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:16px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    .operate-buttons{
      // height: 40px;
      min-height: 40px;
      line-height: 40px;
      padding:10px 0;
    }
    .project-info{
      flex: 1;
      position: relative;
    }
    .pagination{
      margin-top: 10px;
      min-height: 30px;
      line-height: 30px;
    }
    .filter-disapper{
      // height: 0 !important;
      top: 100vh !important;
      transition: all .5s linear;
    }
    .filter{
      // opacity: 1;
      position: absolute;
      background-color: #fff;
      // min-height: 350px;
      z-index: 111;
      // width: 100%;
      // height: 100%;
      box-sizing: border-box;
      top: 16px;
      left: 16px;
      right: 16px;
      bottom: 16px;
      // top: 0;
      // height: 500px;
      display: flex;
      flex-direction: column;
      transition: all .5s linear;
      background-color: #fff;
      overflow: hidden;
      .filter-head{
        height: 48px;
        // width: 100%;
        box-sizing: border-box;
        line-height: 48px;
        text-align: left;
        margin: 0;
        padding: 0 16px;
        font-weight: 900;
        background: #E8E9EA;
        position: relative;
        .ercp-icon-general-next{
          transform: rotate(90deg);
          cursor: pointer;
          position: absolute;
          right: 16px;
        }
      }
      .filter-condition{
        // flex: 1;
        background-color: #fff;
        box-sizing: border-box;
        // width: 100%;
        // min-height: 220px;
        max-height: 356px;
        overflow: auto;
        margin:0;
        .basic-info-filter, .record-info-filter, .other-info-filter, .operate-space{
          min-height: 50px;
          line-height: 50px;
          // border: 1px dotted #dfdfdf;
          padding: 0 8px;
          box-sizing: border-box;
          margin: 8px;
          display: flex;
          flex-direction: row;
          border-radius: 3px;
          .case{
            flex: 1;
          }
        }
      }
      .filter-cases{
        flex: 1;
        box-sizing: border-box;
        margin: 0 8px;
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
      }
    }
  }
</style>
