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
          <el-table
            :data="tableData"
            height="325"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%">
            <!-- <el-table-column
              type="index"
              width="50">
            </el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              v-for="(item, index) in mozhu"
              :key="index + Math.random()"
              :prop="item.prop"
              :label="item.label"
              :sortable="item.sortable"
              :filters="item.filters"
              :filter-method="filterHandler"
              filter-placement="bottom-end"
              :width="item.width">
              <template slot-scope="scope">
                <el-button
                  v-if="item.option"
                  v-for="(x, key) in item.contain"
                  :key="key"
                  :type="x.type ? x.type : 'text'"
                  :size="x.size ? x.size : 'mini'"
                  :style="x.style"
                  @click="handleShow(scope.row, scope.$index, x)">{{x.label}}</el-button>
                  <div v-if="!item.option">
                    {{scope.row[item.prop]}}
                  </div>
              </template>
            </el-table-column>
            <!-- <el-table-column
              width="100"
              align="center"
              label="操作">
               <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="handleShow(scope.$index, scope.row)">查看</el-button>
              </template>
              </el-table-column> -->
          </el-table>
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

export default {
  data () {
    return {
      rulesContainTop: [
        { title: '全部', icon: 'el-icon-delete', num: 55, userType: [1, 2, 3, 4, 5, 6] },
        { title: '待录入', icon: 'el-icon-delete', num: 55, userType: [1, 2, 3, 4, 5, 6] },
        { title: '带修正', icon: 'el-icon-delete', num: 55, userType: [1, 2, 3, 4, 5, 6] },
        { title: '带随访', icon: 'el-icon-delete', num: 55, userType: [1, 2, 3, 4, 5, 6] }
      ],
      activeIndex: 0,
      lookupFormInputData: '',
      tableData: [{name: 15555}, {name: 1, namec: 'woo', ccc: 'aaa'}, {name: 12}, {name: 1}, {name: 1}],
      currentpage: 1,
      pagesize: 5,
      total: 100,
      mozhu: [],
      // 总表 ---> 住院号 编号 姓名 性别 入院日期 术前记录 术中记录 术后记录 是否纳入随访记录
      AlltableColumn: [
        { prop: 'name', label: '住院编号' },
        { prop: 'name', label: '编号' },
        { prop: 'namec', label: '姓名' },
        { prop: 'name', label: '性别', sortable: true },
        { prop: 'name', label: '入院日期' },
        { prop: 'name', label: '术前记录', width: '130', sortable: true, filters: [{ text: '男', value: '男' }, { text: '女', value: '女' }] },
        { prop: 'name', label: '术中记录', width: '130', sortable: true, filters: [{ text: '男', value: '男' }, { text: '女', value: '女' }] },
        { prop: 'name', label: '术后记录', width: '130', sortable: true, filters: [{ text: '男', value: '男' }, { text: '女', value: '女' }] },
        { prop: 'name', label: '是否纳入随访记录', width: '180', sortable: true, filters: [{ text: '男', value: '男' }, { text: '女', value: '女' }] },
        { option: true, label: '操作', contain: [{label: '查看'}] }
      ],
      // 待录入 ---> 住院号 编号 科室 床号 姓名 性别 数据阶段 记录者 操作 (编辑、删除)
      pendingEntryColumn: [
        { prop: 'name', label: '住院号' },
        { prop: 'name', label: '编号' },
        { prop: 'name', label: '科室' },
        { prop: 'name', label: '床号' },
        { prop: 'name', label: '姓名' },
        { prop: 'name', label: '性别', sortable: true },
        { prop: 'name', label: '数据阶段' },
        { prop: 'name', label: '记录者', width: '130', sortable: true },
        { option: true, label: '操作', contain: [{label: '编辑'}, {label: '删除', style: 'color: #FF455B'}] }
      ]
    }
  },
  computed: mapState({
    user: state => state.user
  }),
  created () {
    // 管理员医生 无页面
    // 科研管理员临床质控员 诊疗中心 科研护士
    // 1 - 6 userType
    // 科研管理员 ---> 1.任务概览：工作量统计 2.总表：查看 3.待审核 4.列表：分页及计数
    // 临床质控员 ---> 同上
    // 诊疗中心 ---> 1.任务概览：工作量统计 2.总表：查看 3.待录入：编辑、删除 4.待修正：编辑 5.列表：分页及计数
    // 科研护士 ---> 1.任务概览：工作量统计 2.总表：查看 3.待录入：编辑、删除 4.待修正：编辑 5.待随访：编辑、删除 6.列表：分页及计数
    console.log(this.user)
    this.init()
  },
  methods: {
    init () {
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
      this.rulesContainTop = [...topArr]
      // mozhu 赋值
      this.mozhu = [...this.AlltableColumn]
    },
    rulesContainTopControl (row, index) {
      console.log(row, index)
      this.activeIndex = index
      if (row.title === '待录入') {
        this.mozhu = [...this.pendingEntryColumn]
      } else {
        this.mozhu = [...this.AlltableColumn]
      }
      // this.$router.push({name: 'sh', params: { data: JSON.stringify({a: 1}) }})
    },
    lookupFormInput () {
      console.log('111')
    },
    handleCurrentChange (val) {
      // this.formModel = Object.assign({}, val)
      // console.log(val)
    },
    filterHandler (value, row, column) {
      console.log(value, row, column)
      const property = column['property']
      return row[property] === value
    },
    pageSize (val) {
      this.pagesize = val
    },
    changePage (val) {
      console.log(val, this.pagesize)
    },
    handleShow (row, index, x) {
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
