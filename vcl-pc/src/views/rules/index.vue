<template>
  <div class="rulesAll">
    <div class="rulesContent">
      <div class="rulesTop">
        tubiao
      </div>
      <div class="rulesContain">
        <div class="rulesContainTop">
          <div
            :class="{rulesContainTopItem: true, activeIndex: activeIndex === index}"
            @click="rulesContainTopControl(item, index)"
            v-for="(item, index) in rulesContainTop"
            :key="index">
            <div style="font-weight: bold;">
              <i :class="item.icon"></i>
              {{item.title}}
            </div>
            <div>
              <font style="font-weight: bold">{{item.num}}</font> 人次
            </div>
          </div>
        </div>
        <div class="rulesContainContent">
          <el-row>
            <el-col :span="6">
              <el-input
                @keyup.enter.native="lookupFormInput"
                size="small"
                placeholder="姓名/身份证号/住院编号"
                v-model="lookupFormInputData"
                clearable
                prefix-icon="el-icon-search"></el-input>
            </el-col>
          </el-row>
          <sx-min-table
            :mozhu="mozhu"
            :tableData="tableData"
            :filterHandler="filterHandler"
            @operateClick="operateClick"
            ></sx-min-table>
          <div style="text-align: right;margin-top:15px;">
            <el-pagination
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              :page-sizes="[5, 10, 15]"
              :current-page="currentpage"
              :page-size="pagesize"
              @size-change= "pageSize"
              @current-change="changePage"></el-pagination>
          </div>
        </div>
      </div>
      <!-- <router-link :to="{ name: 'sh', params: { data: JSON.stringify({a: 1}) }}">sh</router-link> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import sxMinTable from '../../components/dynamicForm/minTable'
export default {
  components: {
    sxMinTable
  },
  data () {
    return {
      rulesContainTop: [
        { title: '总表', key: 'AlltableColumn', icon: 'el-icon-delete', num: 55, userType: [1, 3, 4, 5, 6] },
        { title: '待录入', key: 'pendingEntryColumn', icon: 'el-icon-delete', num: 55, userType: [1, 5, 6] },
        { title: '待审核', key: 'toBeAuditedColumn', icon: 'el-icon-delete', num: 55, userType: [1, 3, 4] },
        { title: '带修正', key: 'toBeAmendedColumn', icon: 'el-icon-delete', num: 55, userType: [1, 5, 6] },
        { title: '带随访', key: 'followUpColumn', icon: 'el-icon-delete', num: 55, userType: [1, 6] }
      ],
      activeIndex: 0,
      activeRow: {},
      lookupFormInputData: '',
      tableData: [{zyh: 15555, bh: 6666, name: 'siri', sex: '无'}, {name: 1, namec: 'woo', ccc: 'aaa'}, {name: 12}, {name: 1}, {name: 1}],
      currentpage: 1,
      pagesize: 5,
      total: 100,
      mozhu: [],
      whatObj: {
        // 总表 ---> 住院号 编号 姓名 性别 入院日期 术前记录 术中记录 术后记录 是否纳入随访记录
        AlltableColumn: [
          { prop: 'name', label: '住院号' },
          { prop: 'name', label: '编号' },
          { prop: 'namec', label: '姓名' },
          { prop: 'name', label: '性别', sortable: true },
          { prop: 'name', label: '入院日期' },
          { prop: 'name', label: '术前记录', width: '130', sortable: true, filters: [{ text: '男', value: '男' }, { text: '女', value: '女' }] },
          { prop: 'name', label: '术中记录', width: '130', sortable: true, filters: [{ text: '男', value: '男' }, { text: '女', value: '女' }] },
          { prop: 'name', label: '术后记录', width: '130', sortable: true, filters: [{ text: '男', value: '男' }, { text: '女', value: '女' }] },
          { prop: 'name', label: '是否纳入随访记录', width: '180', sortable: true, filters: [{ text: '男', value: '男' }, { text: '女', value: '女' }] }
        ],
        // 待录入 ---> 住院号 编号 科室 床号 姓名 性别 数据阶段 记录者 操作 (编辑、删除)
        pendingEntryColumn: [
          { prop: 'zyh', label: '住院号' },
          { prop: 'bh', label: '编号' },
          { prop: 'name', label: '科室' },
          { prop: 'name', label: '床号' },
          { prop: 'name', label: '姓名' },
          { prop: 'sex', label: '性别', sortable: true },
          { prop: 'name', label: '数据阶段' },
          { prop: 'name', label: '记录者', width: '130', sortable: true },
          { option: true, label: '操作', contain: [{label: '编辑'}, {label: '删除', style: 'color: #FF455B'}] }
        ],
        // 待审核 ---> 住院号 编号 科室 床号 姓名 性别 数据阶段 记录者 操作 (审核
        toBeAuditedColumn: [
          { prop: 'name', label: '住院号' },
          { prop: 'name', label: '编号' },
          { prop: 'name', label: '科室' },
          { prop: 'name', label: '床号' },
          { prop: 'name', label: '姓名' },
          { prop: 'name', label: '性别', sortable: true },
          { prop: 'name', label: '数据阶段', sortable: true },
          { prop: 'name', label: '记录者', sortable: true },
          { option: true, label: '操作', contain: [{label: '审核'}] }
        ],
        // 待修正 ---> 住院号 编号 科室 床号 姓名 性别 数据阶段 记录者 操作 (编辑
        toBeAmendedColumn: [
          { prop: 'name', label: '住院号' },
          { prop: 'name', label: '编号' },
          { prop: 'name', label: '科室' },
          { prop: 'name', label: '床号' },
          { prop: 'name', label: '姓名' },
          { prop: 'name', label: '性别', sortable: true },
          { prop: 'name', label: '数据阶段', sortable: true },
          { prop: 'name', label: '记录者', sortable: true },
          { option: true, label: '操作', contain: [{label: '编辑'}] }
        ],
        // 待随访 ---> 住院号 编号 姓名 性别 主管医生 术后诊断 出院日期 记录者 状态（待问询、已失联、待复查） 操作（编辑）
        followUpColumn: [
          { prop: 'zyh', label: '住院号' },
          { prop: 'bh', label: '编号' },
          { prop: 'name', label: '姓名' },
          { prop: 'sex', label: '性别', sortable: true },
          { prop: 'name', label: '主管医生' },
          { prop: 'name', label: '术后诊断' },
          { prop: 'name', label: '出院日期' },
          { prop: 'name', label: '记录者', sortable: true },
          { prop: 'name', label: '状态 (待问询、已失联、待复查)', sortable: true, width: 250 },
          { option: true, label: '操作', contain: [{label: '编辑'}] }
        ]
      }
    }
  },
  computed: mapState({
    user: state => state.user
  }),
  created () {
    // 规则 a
    let a = {
      // 管理员 医生 无页面
      // 科研管理员 临床质控员 诊疗中心 科研护士
      // 1 - 6 userType 总表 待录入 待审核 待修正 待随访

      // 科研管理员 3（总表, 待审核）---> 1.任务概览：工作量统计 2.总表：查看 3.待审核 4.列表：分页及计数
      // 1.工作量统计：按日（最近10天）、按周（最近8周）、按月（最近一年）（手术、审核）
      // 2.总表查看：均为不可编辑状态
      // 3.待审核：点击跳转至对应页面
      // 4.驳回/审核通过后回到列表页

      // 临床质控员 4 （总表, 待审核) ---> 同上

      // 诊疗中心 5（总表, 待录入, 待修正) ---> 1.任务概览：工作量统计 2.总表：查看 3.待录入：编辑、删除 4.待修正：编辑 5.列表：分页及计数
      // "1.工作量统计：按日（最近10天）、按周（最近8周）、按月（最近一年）（手术、录入、修正）
      // 2.总表查看：已审核、待审核状态的为不可编辑状态，待录入、待修正部分为可编辑状态
      // 3.待录入/待修正编辑：跳转至对应位置，其他部分不可编辑状态
      // 4.删除：弹框确认
      // 5.提交后回到列表页"

      // 科研护士 6（总表, 待录入, 待修正, 待随访） ---> 1.任务概览：工作量统计 2.总表：查看 3.待录入：编辑、删除 4.待修正：编辑 5.待随访：编辑、删除 6.列表：分页及计数
      // "1.工作量统计：按日（最近10天）、按周（最近8周）、按月（最近一年）（录入、修正、随访）
      // 2.总表查看：已审核、待审核状态的为不可编辑状态，待录入、待修正部分为可编辑状态
      // 3.待录入/待修正编辑：跳转至对应位置，其他部分不可编辑状态
      // 4.待随访编辑：跳转至对应页面
      // 5.删除：弹框确认
      // 6.提交后回到列表页"
    }
    console.log(a)
    console.log(this.user)
    this.init()
  },
  methods: {
    init () {
      // 角色 button 分配   this.user用户数据
      let topArr = []
      for (let i of this.rulesContainTop) {
        if (i['userType']) {
          if (i['userType'].includes(this.user.userType)) {
            topArr.push(i)
          }
        } else {
          topArr.push(i)
        }
      }
      console.log(topArr)
      this.rulesContainTop = [...topArr]
      // 中间数组 mozhu 默认值
      this.mozhu = [...this.whatObj['AlltableColumn']]
      this.activeRow = this.rulesContainTop[this.activeIndex]
    },
    async rulesContainTopControl (row, index) {
      this.activeIndex = index
      this.activeRow = row
      this.mozhu = [...this.whatObj[row.key]]
      // this.tableData = []
      // this.$router.push({name: 'sh', params: { data: JSON.stringify({a: 1}) }})
    },
    lookupFormInput () {
      console.log(this.lookupFormInputData)
      console.log(this.activeRow)
    },
    filterHandler (value, row, column) {
      console.log(value, row, column, '=======, filterHandler')
      const property = column['property']
      return row[property] === value
    },
    pageSize (val) {
      this.pagesize = val
    },
    changePage (val) {
      console.log(val, this.pagesize)
    },
    async operateClick (row, index, x) {
      console.log(this.activeRow)
      let deleteBtn = true
      switch (x.label) {
        case '编辑':
          console.log('编辑')
          break
        case '审核':
          console.log('审核')
          break
        default:
          deleteBtn = false
          this.$confirm('此操作将删除该数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(_ => {
            this.$message({
              type: 'success',
              message: '删除成功!',
              showClose: true
            })
          }).catch(_ => {})
          break
      }
      if (deleteBtn) {
        switch (this.activeRow.title) {
          case '待录入':
            this.$router.push({ name: 'lr', params: { data: JSON.stringify(row) } })
            break
          case '待审核':
            break
          case '待修正':
            break
          case '待随访':
            break
        }
      }
      console.log(row, index, x, '----------')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';

$full: 100%;
$contentW: 95%;
.rulesAll {
  width: $full;
  height: $full;
  display: flex;
  justify-content: center;
  align-items: center;
  .rulesContent {
    width: $contentW;
    height: $contentW;
    .rulesTop {
      background: white;
      border: $lightBorderColor 1px solid;
      margin-bottom: 10px;
    }
    .rulesContain {
      background: white;
      color: $commonTetxColor;
      width: $full;
      border: $lightBorderColor 1px solid;
      .rulesContainTop {
        height: 60px;
        display: flex;
        width: $full;
        .rulesContainTopItem {
          border-right: 1px solid $lightBorderColor;
          border-bottom: 1px solid $lightBorderColor;
          flex-grow: 1;
          display: flex;
          justify-content: space-around;
          align-items: center;
          transition: all .5s;
          i {
            font-size: 17px;
          }
        }
        .rulesContainTopItem:last-child {
          border-right: none;
        }
        .rulesContainTopItem:hover {
          cursor: pointer;
          color: black;
        }
        .activeIndex {
          background: $linearGradient;
          i {
            color: $themeColor;
          }
        }
      }
      .rulesContainContent {
        padding: 15px;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
