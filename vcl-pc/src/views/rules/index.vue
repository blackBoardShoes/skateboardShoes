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
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :sortable="item.sortable"
              :filters="item.filters"
              :filter-method="filterHandler"
              filter-placement="bottom-end"
              :width="item.width">
            </el-table-column>
            <el-table-column
              width="100"
              align="center"
              label="操作">
               <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="handleShow(scope.$index, scope.row)">查看</el-button>
              </template>
              </el-table-column>
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
export default {
  data () {
    return {
      rulesContainTop: [
        { title: '全部', icon: 'el-icon-delete', num: 55 },
        { title: '待录入', icon: 'el-icon-delete', num: 55 },
        { title: '带修正', icon: 'el-icon-delete', num: 55 },
        { title: '带随访', icon: 'el-icon-delete', num: 55 }
      ],
      activeIndex: 0,
      lookupFormInputData: '',
      tableData: [{name: 1}, {name: 1}, {name: 12}, {name: 1}, {name: 1}],
      currentpage: 1,
      pagesize: 5,
      total: 100,
      mozhu: [
        { prop: 'name', label: '住院编号' },
        { prop: 'name', label: '系统编号' },
        { prop: 'name', label: '姓名' },
        { prop: 'name', label: '性别', sortable: true },
        { prop: 'name', label: '入院日期' },
        { prop: 'name', label: '手术日期' },
        { prop: 'name', label: '术前记录', width: '130', sortable: true, filters: [{ text: '男', value: '男' }, { text: '女', value: '女' }] },
        { prop: 'name', label: '术中记录', width: '130', sortable: true, filters: [{ text: '男', value: '男' }, { text: '女', value: '女' }] },
        { prop: 'name', label: '术后记录', width: '130', sortable: true, filters: [{ text: '男', value: '男' }, { text: '女', value: '女' }] },
        { prop: 'name', label: '纳入随访', width: '130', sortable: true, filters: [{ text: '男', value: '男' }, { text: '女', value: '女' }] }
      ]
    }
  },
  created () {
    console.log(this.$store)
  },
  methods: {
    rulesContainTopControl (item, index) {
      this.activeIndex = index
      // this.$router.push({name: 'sh', params: { data: JSON.stringify({a: 1}) }})
    },
    lookupFormInput () {
      console.log('111')
    },
    handleCurrentChange (val) {
      this.formModel = Object.assign({}, val)
      console.log(val)
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
    handleShow () {}
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
