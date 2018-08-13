<template>
    <div class="support-center">
      <div class="search">
        <div class="help-title float-left">
          <h4>帮助中心</h4>
          <h5 class="light-text">Help Center</h5>
        </div>
        <div class="serch-input float-left">
          <el-input size="medium" v-model="searchText" placeholder="请输入问题" @keyup.enter.native="search">
            <i class="ercp-icon-general-search el-input__icon" slot="suffix" @click="search"></i>
          </el-input>
        </div>
        <div class="our-connection">
          <span class="light-text">0571-886554555 SUPPORT@MITIGENOMICS.COM</span>
        </div>
      </div>
    <div class="main-question">
       <!-- 导航 -->
        <div class="qus-nav">
          <el-collapse v-model="activeNames" @change="handleChange" accordion>
            <el-collapse-item  :name="index1" v-for="(item, index1) in treeQuestions" :key="index1">
              <template slot="title">
                <div class="header" style="text-indent:2em;font-weight:900;" >
                  {{item.trunkTitle}}
                </div>
              </template>
              <div :class="{'active-question':index2 === activeIndex2 && index1 === activeIndex1, 'question': true}"
                v-for="(item2, index2) in item.trunkQuestions"
                :key="index2"
                @click="handSelect(index1, index2)">
                <span :class="{'el-icon-caret-right':index2 === activeIndex2 && index1 === activeIndex1, 'leaf-title': true}">{{item2.leafTitle}}</span>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <!-- 问题详情 -->
        <div class="qus-main">
           <div class="current-qustions" v-if="currentQus.type !==  'query'">
             <h2>{{treeQuestions[activeIndex1].trunkTitle}} / <span style="font-size:16px;font-weight:600;">{{currentQus.leafTitle}} ：</span></h2>
             <ul>
               <p v-if="currentQus.leafQuestions.length === 0 ">暂无</p>
               <!-- 步骤类问题 -->
               <li v-for="(question, index) in currentQus.leafQuestions" v-if="currentQus.type==='step'" :key="index">
                 <p>{{index + 1}}、{{question.step}}</p>
                 <p v-if="question.tips" class="attention">注意：{{question.tips}}</p>
                 <img v-bind:src="question.imgSrc"  alt="" v-if="question.imgSrc">
               </li>
               <!-- 问答类问答 -->
               <li v-for="(question,index) in currentQus.leafQuestions" v-if="currentQus.type==='faqs'" :key="index">
                 <p><i class="el-icon-question"></i> <span> {{question.ask}}</span></p>
                 <p> 答：{{question.answer}}</p>
               </li>
             </ul>
           </div>
        </div>
    </div>
   </div>
</template>
<script>
export default {
  data () {
    return {
      searchText: '',
      // treeQuestions - trunkQuestions - leafQuestions - main - tips - img - ask - answer
      treeQuestions: [
        {
          trunkTitle: '模块1',
          trunkQuestions: [
            {
              type: 'step',
              leafTitle: '步骤类',
              leafQuestions: [
                {
                  step: '步骤1'
                },
                {
                  step: '步骤2'
                },
                {
                  step: '步骤3'
                },
                {
                  step: '步骤4'
                }
              ]
            },
            {
              type: 'faqs',
              leafTitle: '常见问题',
              leafQuestions: [
                {
                  ask: '问题1',
                  answer: '回答1'
                },
                {
                  ask: '问题2',
                  answer: '回答2'
                },
                {
                  ask: '问题3',
                  answer: '回答3'
                }
              ]
            }
          ]
        },
        {
          trunkTitle: '模块2',
          trunkQuestions: [
            {
              type: 'step',
              leafTitle: '步骤类',
              leafQuestions: [
                {
                  step: '步骤1'
                },
                {
                  step: '步骤2'
                },
                {
                  step: '步骤3'
                },
                {
                  step: '步骤4'
                }
              ]
            },
            {
              type: 'faqs',
              leafTitle: '常见问题',
              leafQuestions: [
                {
                  ask: '问题1',
                  answer: '回答1'
                },
                {
                  ask: '问题2',
                  answer: '回答2'
                },
                {
                  ask: '问题3',
                  answer: '回答3'
                }
              ]
            }
          ]
        },
        {
          trunkTitle: '模块3',
          trunkQuestions: [
            {
              type: 'step',
              leafTitle: '步骤类',
              leafQuestions: [
                {
                  step: '步骤1'
                },
                {
                  step: '步骤2'
                },
                {
                  step: '步骤3'
                },
                {
                  step: '步骤4'
                }
              ]
            },
            {
              type: 'faqs',
              leafTitle: '常见问题',
              leafQuestions: [
                {
                  ask: '问题1',
                  answer: '回答1'
                },
                {
                  ask: '问题2',
                  answer: '回答2'
                },
                {
                  ask: '问题3',
                  answer: '回答3'
                }
              ]
            }
          ]
        }
      ],
      activeNames: 0,
      activeIndex1: 0,
      activeIndex2: 0,
      currentQus: ''
    }
  },
  // 初始化当前问题
  created () {
    this.currentQus = this.treeQuestions[this.activeNames].trunkQuestions[0]
  },
  mounted () {
  },
  methods: {
    search () {
      this.$message.success(this.searchText)
    },
    handleChange: function (activeNames) {
    },
    handSelect (index1, index2) {
      this.activeIndex1 = index1
      this.activeIndex2 = index2
      this.currentQus = this.treeQuestions[index1].trunkQuestions[index2]
      this.filterText = ''
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../../assets/css/variable';
  .question{
    text-indent:2.5em;
    font-size:14px;
    line-height:48px;
    cursor:pointer;
    padding:0px;
    .leaf-title{
      text-indent:-1em;
    }
  }
  .support-center{
    // 盒子的自适应布局
    height:100%;
    display:flex;
    justify-content:center;
    flex-direction:column;
    background-color:#d7d7d7;
    border-radius:4px;
    // 搜索
    .search{
      width:100%;
      height:80px;
      background-color:#E8E9EA;
      text-align: center;
      // line-height: 100px;
      .help-title{
        float: left;
        width: 180px;
        height: 100%;
        padding: 15px 0;
        text-align: center;
        line-height: 25px;
        background: url('../../../../src/assets/images/标题栏.png') center top no-repeat;
        h4{
          font-size: 26px;
        }
        h5{
          font-weight: 300;
        }
      }
      .serch-input{
        margin-top: 22px;
        width: 300px;
        float: left;
      }
      .our-connection{
        height: 30px;
        float: right;
        margin-right: 20px;
        font-style: italic;
        line-height: 30px;
        margin-top: 25px;
        font-size: 14px;
      }
    }
    // 问题中心
    .main-question{
      width:100%;
      flex:1;
      box-sizing:border-box;
      background-color:#fff;
      // border: 1px solid #ebeef5;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      display:flex;
      .qus-nav{
        flex:0 0 300px;
        overflow-x:hidden;
        overflow-y:auto;
        background-color: #eee;
        .el-collapse{
          .el-collapse-item{
            padding:0px;
            // .header{
            //   background-color: #eee;
            //   border-bottom:2px solid #fff;
            // }
          }
        }
      }

      .qus-main{
        border: 1px solid #ebeef5;
        overflow:auto;
        flex:1;
        padding:20px;
        .current-qustions{
          text-align:justify;
          font-size:16px;
          line-height:1.5;
          width:100%;
          height:100%;
          box-sizing:border-box;
          overflow:hidden;
          display:flex;
          flex-direction:column;
          h2{
            margin:0px 0px 10px 0px;
            font-weight:500;
          }
          ul{
            flex:1;
            overflow:auto;
            li{
              line-height:1.5;
              margin-top:5px;
              .attention{
                color:rgb(2, 131, 141);
              }
              .el-icon-question{
                color:rgb(2, 131, 141);
              }
              img{
                width:80%;
                margin-top:10px;
              }
              p{
                margin-top:10px;
              }
            }
          }
        }
        .query-fields{
          width:100%;
          height:100%;
          display:flex;
          flex-direction:column;
          .fields{
            width:100%;
            flex:1;
            display:flex;
            flex-direction:column;
            .fields-query{
              height:40px;
              margin-bottom:10px;
              border-bottom:1px solid #eee;
            }
            .fields-all{
              flex:1;
              overflow:auto;
            }
          }
        }
      }

    }
  }

</style>
