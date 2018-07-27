<template>
  <div id="patient">
    <el-card class="patient-statistics" style="margin-bottom: 4px;">
      <div class="card-title" slot="header">
        <i class="el-icon-dogma-summary"></i> <b>系统概览</b>
        <span class="float-right light-text">患者总数：{{patientAccount}}人</span>
      </div>
      <div class="card-content">
        <!-- 图表1 ： 图表2 -->
      </div>
    </el-card>
    <el-card class="patient-list" :body-style="{height:'100%','box-sizing': 'border-box'}">
      <div class="card-title" slot="header">
        <i class="el-icon-dogma-patient"></i><b>患者列表</b>
      </div>
      <div class="card-content">
        <div class="operate">
          <div class="serach float-left">
            <el-input
              clearable
              v-model="searchText"
              placeholder="姓名 / 身份证号 / 住院编号"
              @keyup.enter.native="search"
              style="width: auto;vertical-align: middle;width:300px;">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="search" style="cursor:pointer;"></i>
            </el-input>
          </div>
          <div class="refresh float-right">
            <el-button type="primary" icon="el-icon-refresh" @click="refresh">更新患者</el-button>
            <el-button type="primary" icon="el-icon-dogma-insert" @click="add">添加患者</el-button>
          </div>
        </div>
        <!-- 患者列表 -->
        <div class="table">
          <el-table
            :data="tableData"
            style="width: 100%"
            size="small"
            fit
            height="100%">
            <el-table-column
              type="index"
              :width="60"
              fixed="left">
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="姓名"
              :width="80">
            </el-table-column>
            <el-table-column
              prop="gender"
              align="center"
              label="性别"
              :width="60">
            </el-table-column>
            <el-table-column
              prop="nation"
              align="center"
              label="民族"
              :width="80">
            </el-table-column>
            <el-table-column
              prop="hospitalNumber"
              align="center"
              label="住院编号"
              :width="120">
            </el-table-column>
            <el-table-column
              prop="identity"
              align="center"
              label="身份证编号"
              :width="200">
            </el-table-column>
            <el-table-column
              prop="concatNumber"
              align="center"
              label="联系方式"
              :width="140">
            </el-table-column>
            <el-table-column
              prop="permanentAddress"
              align="center"
              label="常住地址">
            </el-table-column>
            <el-table-column
              prop="operate"
              align="center"
              label="操作"
              :width="120"
              fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="small" plain @click="viewPatient(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 列表分页 -->
        <div class="pagination align-right">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 15, 20]"
            :total="total"
            :current-page="currentpage"
            :page-size="pagesize"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'patient_index',
  data () {
    return {
      patientAccount: 3515,
      tableData: [
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第一家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第二家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第三家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第四家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第五家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第一家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第二家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第三家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第四家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第五家', operate: '查看'
        }
      ],
      searchText: '',
      // 分页信息：
      pagesize: 10,
      currentpage: 1,
      total: 100
    }
  },
  methods: {
    search () {
      console.log(this.searchText)
    },
    viewPatient (value) {
      console.log(value)
    },
    refresh () {
      console.log('refresh')
    },
    add () {
      console.log('add')
    }
  }
}
</script>
<style lang="scss" scoped>
#patient{
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
  top: 8px;
  display: flex;
  flex-direction: column;
  .patient-statistics{
    flex: 0 0 200px;
    .card-content{
      padding: 10px;
    }
  }
  .patient-list{
    flex: 1;
    display: flex;
    flex-direction: column;
    .el-card_header{
      height: 57px;
      padding: 10px 20px;
    }
    .el-card__body{
      flex: 1;
      .card-content{
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        // overflow: auto;
        .operate{
          min-height: 60px;
          box-sizing: border-box;
          padding: 10px 0;
        }
        .table{
          flex:1;
          height:300px;
        }
        .pagination{
          margin-top: 10px;
          min-height: 30px;
          line-height: 30px;
        }
      }
    }
  }
  .card-title{
    font-size: 15px;
    b{
      padding-left:10px;
    }
  }
  .el-table__header-wrapper{
    background-color: #eee;
  }
}
</style>
