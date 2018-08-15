<template>
  <div id="home">
    <div class="sys-view">
      <div class="overview er-card">
        <div class="card-title">
          <span><i class="ercp-icon-general-summary"></i><b>系统概览</b></span>
        </div>
        <div class="basic-view">
          <div class="case"  v-for="(item, index) in viewOptions" :key="index">
            <div class="icon"> <i :class="item.icon"></i></div>
            <div class="one-case">
              <div class="case-num">{{item.count}}</div>
              <div class="case-title light-text">{{item.title}}</div>
            </div>
          </div>
        </div>
      </div>
       <div class="statistics">
         <div class="case-top er-card">
           <chart ref="A" :options="optionA" auto-resize style="width: 100%;height: 100%;"></chart>
         </div>
         <div class="case-bottom">
           <div class="case-left er-card">
            <chart ref="B" :options="optionB" auto-resize style="width: 100%;height: 100%;"></chart>
          </div>
          <div class="case-right er-card">
            <chart ref="C" :options="optionC" auto-resize style="width: 100%;height: 100%;"></chart>
          </div>
         </div>
       </div>
    </div>
    <div class="daily er-card">
      <div class="card-title">
        <span><i class="ercp-icon-medicine-reservation"></i><b>今日手术</b> <span class="light-text float-right small-text">2018-07--13 10:12:55更新过</span></span>
      </div>
      <div class="case-statistics">
        <div class="case">
          <div class="light-text">完成手术</div>
          <div>4</div>
        </div>
        <div class="case">
          <div class="light-text">待做手术</div>
          <div>2</div>
        </div>
        <div class="case">
          <div class="light-text">未做排期</div>
          <div>1</div>
        </div>
      </div>
      <div class="operation-buttons" v-if="user.codetype && user.codetype=== 5">
        <el-button type="primary" size="medium" @click="refresh" v-if="user.codetype=== 5 || user.codetype=== 6">更新患者</el-button>
        <el-button type="primary" size="medium" @click="add" v-if="user.codetype=== 5">添加患者</el-button>
      </div>
      <div class="daily-work">
        <div class="yet case" v-for="item in ['a', 'b' , 'c', 'd']" :key="item">
          <div class="time">
            14:00
          </div>
          <div class="icon-line">
            <i class="ercp-icon-general-dolist"></i>
            <span class="line"></span>
          </div>
          <div class="operation-info">
            <div>
              <span>林广福<span class="info-text">未手术</span></span>
              <!-- 操作按钮 -->
              <span class="ercp-icon-medicine-operation float-right" v-if="user.codetype && user.codetype=== 5"></span>
              <span class="ercp-icon-general-fail float-right" v-if="user.codetype && user.codetype=== 5"></span>
            </div>
            <div>
              <span>手术报告<span class="info-text"></span></span>
            </div>
            <div>
              <span>手术医生<span class="info-text"></span></span>
            </div>
          </div>
        </div>
        <div class="ing case" v-for="item in ['e', 'f' , 'g', 'h']" :key="item">
          <div class="time">
            12:00
          </div>
          <div class="icon-line">
            <i class="ercp-icon-general-progress"></i>
            <span class="line"></span>
          </div>
          <div class="operation-info">
            <div>
              <span>黄小明<span class="primary-text">手术中</span></span>
              <!-- 操作按钮 -->
              <!-- <span class="ercp-icon-medicine-operation float-right"></span> -->
            </div>
            <div>
              <span>手术报告<span class="info-text">待录入</span></span>
            </div>
            <div>
              <span>手术医生<span class="info-text">王大彪</span></span>
            </div>
          </div>
        </div>
        <div class="done case" v-for="item in ['i', 'j' , 'k', 'l']" :key="item">
          <div class="time">
            10:00
          </div>
          <div class="icon-line">
            <i class="ercp-icon-general-finish"></i>
            <span class="line"></span>
          </div>
          <div class="operation-info">
            <div>
              <span>王小虎<span class="success-text">已完成</span></span>
              <!-- 操作按钮 -->
              <!-- <span class="ercp-icon-medicine-operation float-right"></span> -->
            </div>
            <div>
              <span>手术报告<span class="success-text">已打印</span></span>
            </div>
            <div>
              <span>手术医生<span class="info-text">王小彪</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="添加患者" :visible.sync="dialogTableVisible" :modal="true" append-to-body>
        <el-form ref="basicForm" :rules="rules" :model="basicInfo" label-position="right" label-width="100px">
          <el-col :span="24">
            <el-form-item label="患者姓名:" prop="name">
              <el-input v-model="basicInfo.name" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="患者性别:" prop="gender">
              <el-radio-group v-model="basicInfo.gender">
                <el-radio label="男" value="0"></el-radio>
                <el-radio label="女" value="1"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="患者名族:" prop="nation">
              <el-input v-model="basicInfo.nation" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="住院编号:" prop="hospitalNumber">
              <el-input v-model="basicInfo.hospitalNumber" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="身份证号:" prop="identity">
              <el-input v-model="basicInfo.identity" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="联系方式:" prop="concatNumber">
              <el-input v-model="basicInfo.concatNumber" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常居住地" prop="province">
              <el-cascader
                :options="addressOption"
                v-model="basicInfo.province"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="permanentAddress" label="">
              <el-input v-model="basicInfo.permanentAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div class="operate align-center">
          <el-button type="info" @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirmAdd">确定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import {addressData} from '../../../data/address/addressData'
import {charts} from '../../../data/chartTemplates/chart'
export default {
  name: 'home',
  data () {
    return {
      optionA: {},
      optionB: {},
      optionC: {},
      dialogTableVisible: false,
      basicInfo: {
        name: '',
        gender: '',
        nation: '',
        hospitalNumber: '',
        identity: '',
        concatNumber: '',
        province: [],
        permanentAddress: ''
      },
      rules: {
        name: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        gender: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        nation: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        hospitalNumber: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        identity: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        concatNumber: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        province: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        permanentAddress: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }]
      },
      addressOption: [],
      user: {},
      viewOptions: []
    }
  },
  mounted () {
    this.user = this.$store.state.user
    if (this.user.codetype !== null) {
      this.initView(this.user.codetype)
    }
    this.optionA = charts[4]
    this.optionB = charts[0]
    this.optionC = charts[0]
    this.addressOption = addressData
  },
  methods: {
    initView (type) {
      switch (type) {
        // 管理员
        case 1:
          this.viewOptions = [
            {
              icon: 'ercp-icon-module-patient',
              title: '患者人数',
              count: '117'
            },
            {
              icon: 'ercp-icon-module-patient',
              title: '住院人次',
              count: '127'
            },
            {
              icon: 'ercp-icon-module-user',
              title: '用户数量',
              count: '34'
            },
            {
              icon: 'ercp-icon-module-project',
              title: '项目数',
              count: '3'
            }
          ]
          break
        // 医生
        case 2:
          this.viewOptions = [
            {
              icon: 'ercp-icon-module-patient',
              title: '患者人数',
              count: '117'
            },
            {
              icon: 'ercp-icon-module-patient',
              title: '住院人次',
              count: '127'
            },
            {
              icon: 'ercp-icon-module-project',
              title: '自有项目',
              count: '2'
            },
            {
              icon: 'ercp-icon-module-project',
              title: '参与项目',
              count: '3'
            }
          ]
          break
        // 科研管理员
        case 3:
          this.viewOptions = [
            {
              icon: 'ercp-icon-module-patient',
              title: '患者人数',
              count: '117'
            },
            {
              icon: 'ercp-icon-module-patient',
              title: '住院人次',
              count: '127'
            },
            {
              icon: 'ercp-icon-module-user',
              title: '用户数量',
              count: '34'
            },
            {
              icon: 'ercp-icon-module-project',
              title: '项目数',
              count: '3'
            }
          ]
          break
        // 临床质控员
        case 4:
          this.viewOptions = [
            {
              icon: 'ercp-icon-module-patient',
              title: '患者人数',
              count: '117'
            },
            {
              icon: 'ercp-icon-module-patient',
              title: '住院人次',
              count: '127'
            },
            {
              icon: 'ercp-icon-general-audit',
              title: '今日审核',
              count: '34'
            },
            {
              icon: 'ercp-icon-general-audit',
              title: '待审核',
              count: '3'
            }
          ]
          break
        // 诊疗中心
        case 5:
          this.viewOptions = [
            {
              icon: 'ercp-icon-module-patient',
              title: '患者人数',
              count: '117'
            },
            {
              icon: 'ercp-icon-module-patient',
              title: '住院人次',
              count: '127'
            },
            {
              icon: 'ercp-icon-general-audit',
              title: '待审核',
              count: '34'
            },
            {
              icon: 'ercp-icon-general-correct',
              title: '待修正',
              count: '3'
            }
          ]
          break
        // 科研护士
        case 6:
          this.viewOptions = [
            {
              icon: 'ercp-icon-module-patient',
              title: '患者人数',
              count: '117'
            },
            {
              icon: 'ercp-icon-module-patient',
              title: '住院人次',
              count: '127'
            },
            {
              icon: 'ercp-icon-general-audit',
              title: '待审核',
              count: '34'
            },
            {
              icon: 'ercp-icon-general-correct',
              title: '待修正',
              count: '3'
            }
          ]
          break
        default:
          this.$messsage.error('未存在该用户类型')
          break
      }
    },
    // 地区
    handleChange (data) {
      console.log(data)
    },
    // 弹出添加患者的对话框
    add () {
      this.dialogTableVisible = true
    },
    refresh () {
      this.$message.success('已更新患者列表,成功添加2名患者')
    },
    // 取消添加
    cancel () {
      this.dialogTableVisible = false
      this.$refs.basicForm.resetFields()
    },
    // 确认添加患者
    confirmAdd () {
      this.$refs.basicForm.validate(valid => {
        if (valid) {
          console.log(this.basicInfo)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  #home{
    position: relative;
    // left: 16px;
    // right: 16px;
    // top: 16px;
    // bottom: 16px;
    width:100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    .sys-view{
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      .overview{
        height: 140px;
        margin-bottom: 8px;
        display: flex;
        flex-direction: column;
        .basic-view{
          flex:1;
          box-sizing: border-box;
          padding: 8px;
          display: flex;
          flex-direction: row;
          .case{
            margin: 0 6px;
            flex:1;
            height: 100%;
            box-sizing: border-box;
            border-right: 1px dotted #ddd;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .icon{
              height:55px;
              width: 55px;
              margin: 0 10px;
              line-height: 55px;
              text-align: center;
              font-size:30px;
              color:#fff;
              border-radius: 50%;
              background-color: #117FD1;
              border: 5px solid #B8D9F1;
            }
            .one-case{
              text-align: center;
              .case-num{
                font-size:22px;
                font-weight:900;
              }
              .case-title{
                font-size:14px;
              }
            }
            // background-color: #fff;
          }
          .case:nth-of-type(4) {
            border:none;
          }
        }
      }
      .statistics{
        flex: 1;
        width:100%;
        display: flex;
        flex-direction: column;
        .case-top{
          width:100%;
          height: 40%;
          min-height: 40%;
          padding: 8px;
          margin-bottom: 8px;
          box-sizing: border-box;
        }
        .case-bottom{
          height: 60%;
          width:100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .case-left, .case-right{
            flex: 1;
            box-sizing: border-box;
            padding: 8px;
          }
          .case-left{
            margin-right: 8px;
          }
        }
      }
    }
    .daily{
      flex: 0 0 360px;
      min-width: 360px;
      margin-left: 8px;
      height: 100%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .case-statistics{
        height: 60px;
        margin: 20px 0;
        line-height: 30px;
        display: flex;
        flex-direction: row;
        .case{
          flex:1;
          border-right: 1px dotted #eee;
          text-align: center;
          font-weight: 900;
          font-size:20px;
          .light-text{
            font-weight:400;
            font-size:16px;
          }
        }
        .case:nth-of-type(3){
          border:none;
        }
      }
      .operation-buttons{
        height: 30px;
        width: 100%;
        line-height: 30px;
        padding: 10px 0;
        text-align: center;
      }
      .daily-work{
        flex: 1;
        padding:16px;
        border-top: 1px solid #ddd;
        overflow-x: auto;
        .case{
          height: 80px;
          padding: 0 10px;
          box-sizing: border-box;
          display: flex;
          font-size: 14px;
          flex-direction: row;
          line-height: 26px;
          .time{
            width: 50px;
            height: 100%;
          }
          .icon-line{
            width: 20px;
            font-size:16px;
            position: relative;
            .line{
              position: absolute;
              top: 26px;
              bottom: 0px;
              border-radius: 4px;
              left: 50%;
              margin-left: -2px;
              width: 2px;
              background-color: #eee;
            }
          }
          .operation-info{
            flex:1;
            span{
              margin-left: 6px;
            }
          }
        }
        .yet{
          .icon-line{
            // color: #eee;
            .line{
              background-color: #878A8D;
            }
          }
        }
        .ing{
          .icon-line{
            color: #117FD1;
            .line{
              background-color: #117FD1;
            }
          }
        }
        .done{
          .icon-line{
            color: #409D2D;
            .line{
              background-color: #409D2D;
            }
          }
        }
      }
    }
  }
</style>
