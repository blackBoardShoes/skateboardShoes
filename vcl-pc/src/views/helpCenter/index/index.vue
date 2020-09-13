<template>
  <div class="support-center">
    <div class="search">
        <div class="help-title float-left">
          <h4>帮助中心</h4>
          <h5 class="light-text">Help Center</h5>
        </div>
        <div class="serch-input float-left">
          <el-select
            style="width: 360px;"
            @change="search"
            v-model="searchText"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="our-connection">
          <span class="light-text">SUPPORT@MITIGENOMICS.COM</span>
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
              <div :class="{'active-question':index2 === activeIndex[1] && index1 === activeIndex[0], 'question': true}"
                v-for="(item2, index2) in item.trunkQuestions"
                :key="index2"
                @click="handSelect(index1, index2)">
                <span :class="{'el-icon-caret-right':index2 === activeIndex[1] && index1 === activeIndex[0], 'leaf-title': true}">{{item2.leafTitle}}</span>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <!-- 问题详情 -->
        <div class="qus-main">
          <div @click="prev()" class="prev">
            <div class="ercp-icon-general-previous"></div>
          </div>
          <div @click="next()" class="next">
            <div class="ercp-icon-general-next"></div>
          </div>
          <div class="content" key="cat">
            <p v-for="(item, index) in currentQus.leafQuestions"
              :key="index"
              :class="item.class"
              @click="linkTo(item.link === undefined ? 'not' : item.link)">
              <i :class="item.icon" style="margin-right: 5px;" v-if="item.icon"></i>
              <span v-if="!item.src" :class="{'light-text': item.link && item.link === 'not'}">{{item.content}}</span>
              <i class="el-icon-loading" v-if="item.src && item.class === 'loading'" style="margin:20px 50%;"></i>
              <img :src="item.src" alt="" v-if="item.src && item.class !== 'loading'" @click="huger(item.src)">
            </p>
          </div>
        </div>
    </div>
    <transition name="fade">
      <div class="image-huge" v-if="showImage" key="cat"  @click="showImage = false">
        <img :src="this_image" alt="">
      </div>
    </transition>
   </div>
</template>
<script>
import { getImages } from '../../../api/user/user.js'
export default {
  data () {
    return {
      searchText: '',
      treeQuestions: [
        // 使用手册
        {
          trunkTitle: '帮助手册',
          trunkQuestions: [
            {
              leafTitle: '关于ERCP系统',
              leafQuestions: [
                {
                  class: 'title',
                  content: '关于ERCP系统'
                },
                {
                  content: '“ERCP系统”是由杭州米天基因科技有限公司自主开发完成的，用于录入并管理ERCP相关操作及随访数据的电子系统。本系统通过使用规范受控的医学术语，结构化记录ERCP手术过程中所有手术流程和术前术后监控数据，并通过限制重复录入、规范定义字节字段和自动纠错等功能保证数据的准确性和完整性。此外，本系统开发注重灵活性及能动性，用户可根据实际需要自行创建字段、表单等，极大提高工作效率，减少对系统开发人员的依赖。'
                }
              ]
            },
            {
              leafTitle: '全部功能及使用场景',
              leafQuestions: [
                {
                  class: 'title',
                  content: '全部功能及使用场景'
                },
                {
                  content: '本部分主要介绍ERCP系统全部功能及具体适用场景。'
                },
                {
                  content: '结合实际使用流程对系统功能进行阐述：'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-module-system',
                  link: [1, 0],
                  content: '系统管理'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-module-form',
                  link: [2, 0],
                  content: '表单管理'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-module-task',
                  link: [3, 0],
                  content: '任务中心'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-module-patient',
                  link: [4, 0],
                  content: '患者中心'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-module-data',
                  link: [5, 0],
                  content: '数据管理'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-module-user',
                  link: [6, 0],
                  content: '个人中心'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-module-message',
                  link: [7, 0],
                  content: '消息中心'
                },
                {
                  content: '每位用户可根据自身类型和实际工作场景学习如何使用。'
                },
                {
                  content: '用户的主要操作流程如下图：'
                },
                {
                  src: '41',
                  class: 'loading'
                }
              ]
            }
          ]
        },
        // 系统管理
        {
          trunkTitle: '系统管理',
          trunkQuestions: [
            {
              leafTitle: '系统管理概览',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '系统管理主要包括：'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-module-user',
                  link: [1, 1],
                  content: '用户管理'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-module-log',
                  link: [1, 2],
                  content: '日志管理'
                },
                {
                  content: '用户管理用于新增及管理系统使用用户，禁用该用户，重置密码等操作；日志管理可查看特定时间段特定用户的操作。'
                }
              ]
            },
            {
              leafTitle: '用户管理',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '新增用户'
                },
                {
                  src: '1',
                  class: 'loading'
                },
                {
                  src: '2',
                  class: 'loading'
                },
                {
                  content: '点击“新增用户”按钮，出现新增用户的弹框，点击“？”可查看不同用户类型权限，用户姓名重复时会有提醒。'
                },
                {
                  content: '用户初始密码均为“ldyyercp”。'
                },
                {
                  class: 'sub-title',
                  content: '重置密码及禁用'
                },
                {
                  src: '3',
                  class: 'loading'
                },
                {
                  content: '“重置密码”，将该用户密码重置为初始密码；“禁用”将用户状态变成禁用状态，不可再恢复。'
                }
              ]
            },
            {
              leafTitle: '日志管理',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '日志管理'
                },
                {
                  src: '4',
                  class: 'loading'
                },
                {
                  content: '“日志管理”可查看本系统所有用户的具体操作，可通过筛选日期、操作账号、操作类型进行搜索查看'
                }
              ]
            }
          ]
        },
        // 表单管理
        {
          trunkTitle: '表单管理',
          trunkQuestions: [
            {
              leafTitle: '表单管理概览',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '表单管理主要包括：'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-module-field',
                  link: [2, 1],
                  content: '字段库'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-module-form',
                  link: [2, 2],
                  content: '表单库'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-module-term',
                  link: [2, 3],
                  content: '术语库'
                },
                {
                  content: '本系统开发注重灵活性及能动性，用户可根据实际需要自行创建字段、表单等，极大提高工作效率，减少对系统开发人员的依赖。'
                },
                {
                  content: '字段库包含本系统全部表单中所有字段，可进行新增、编辑等操作。'
                },
                {
                  content: '表单库即本系统所有表单，可进行新增、编辑、删除等操作。'
                },
                {
                  content: '术语库即字段或者选项内容的解释，记录数据时可查看相关解释，提高数据记录准确性。'
                }
              ]
            },
            {
              leafTitle: '字段库',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '新增字段'
                },
                {
                  content: '点击“新增字段”，选择要添加的字段类型。'
                },
                {
                  src: '5',
                  class: 'loading'
                },
                {
                  content: '若想添加标题，可选择“单选框”类型，不添加选项即可。'
                },
                {
                  src: '6',
                  class: 'loading'
                },
                {
                  src: '7',
                  class: 'loading'
                },
                {
                  content: '若所添加的字段的选项值为数字，则应以“1**1”方式添加选项值。'
                },
                {
                  src: '8',
                  class: 'loading'
                },
                {
                  content: '若添加表格类型，选择表格里需要放的字段，点击确定即新增成功，可设置表格中各字段之间关联关系。'
                },
                {
                  src: '9',
                  class: 'loading'
                },
                {
                  src: '10',
                  class: 'loading'
                }
              ]
            },
            {
              leafTitle: '表单库',
              leafQuestions: [
                {
                  content: '当前系统所有表单共分为住院基本情况、术前记录、术中记录、术后记录、出院综合评估、随访6个阶段。'
                },
                {
                  class: 'sub-title',
                  content: '新增表单'
                },
                {
                  content: '点击“新增表单”进入新增页面，从“字段库”中选择表单中包含的字段，点击“增加字段”'
                },
                {
                  src: '11',
                  class: 'loading'
                },
                {
                  src: '12',
                  class: 'loading'
                },
                {
                  content: '“关联关系”可设置当前表单中所含字段之间的关联关系'
                },
                {
                  src: '13',
                  class: 'loading'
                },
                {
                  content: '“排版”可以设置当前表单中字段的分布，可选“33”、“45”、“60”三种'
                },
                {
                  src: '14',
                  class: 'loading'
                },
                {
                  content: '点击“预览”可预览当前新增的表单，可根据预览重新调整排版或新增关联关系已创建的表单可编辑或删除'
                },
                {
                  src: '15',
                  class: 'loading'
                }
              ]
            },
            {
              leafTitle: '术语库',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '新增术语'
                },
                {
                  content: '若需要新增的是字段库里的字段，可以直接在2中筛选，若字段库中没有，可直接在3中输入新增的术语名称。术语可通过5上传或删除示例图;4 若选择显示，即在含该字段的表单中可查看具体解释或相关图例，如下图'
                },
                {
                  src: '16',
                  class: 'loading'
                },
                {
                  src: '17',
                  class: 'loading'
                }
              ]
            }
          ]
        },
        // 任务中心
        {
          trunkTitle: '任务中心',
          trunkQuestions: [
            {
              leafTitle: '任务中心概览',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '任务中心主要包括以下模块：'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-module-patient',
                  link: [3, 1],
                  content: '新增住院记录/手术记录/患者'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-general-edit',
                  link: [3, 2],
                  content: '待录入'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-general-audit',
                  link: [3, 3],
                  content: '待审核'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-general-correct',
                  link: [3, 4],
                  content: '待修正'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-medicine-followup',
                  link: [3, 5],
                  content: '随访'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-module-report',
                  link: [3, 6],
                  content: '总表'
                }
              ]
            },
            {
              leafTitle: '任务中心-新增住院记录/手术记录/患者',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '任务中心-新增住院记录/手术记录/患者'
                },
                {
                  content: '若患者需要做ERCP手术，在“任务中心”点击“新增”，输入相关信息，系统根据所录信息判断该患者为本次住院第一次手术或多次手术，若是第一次手术则会增加一条完整的住院记录（包括：住院基本情况、术前、术中、术后、出院综合评估），若非第一次手术，则只增加一条手术记录（包括：术前、术中、术后）'
                },
                {
                  src: '18',
                  class: 'loading'
                },
                {
                  content: '输入“住院号”，系统会对该住院号进行判断，若系统中不存在该患者，提醒新增患者 '
                },
                {
                  src: '19',
                  class: 'loading'
                },
                {
                  content: '点击确定即出现新增患者的弹框，录入患者基本信息即可新增患者成功'
                },
                {
                  src: '20',
                  class: 'loading'
                }
              ]
            },
            {
              leafTitle: '任务中心-待录入',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '任务中心-待录入'
                },
                {
                  src: '21',
                  class: 'loading'
                },
                {
                  content: '新增完毕后，可“待录入”列表中进行操作，包括编辑住院基本信息，录入表单数据，删除本次住院记录。'
                },
                {
                  src: '22',
                  class: 'loading'
                },
                {
                  src: '23',
                  class: 'loading'
                },
                {
                  content: '每个表单录入完成后点击“保存”成功后，会自动跳转到下一个表单，直到最后表单录入完成，可点击“阶段提交”，该阶段录入的所有表单数据将被提交到待审核列表。'
                }
              ]
            },
            {
              leafTitle: '任务中心-待审核',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '任务中心-待审核'
                },
                {
                  content: '点击“审核”，进入审核页面'
                },
                {
                  src: '24',
                  class: 'loading'
                },
                {
                  content: '审核时发现有数据录入错误，可双击该字段标记错误原因'
                },
                {
                  src: '25',
                  class: 'loading'
                },
                {
                  content: '被标记错误的字段旁边会有“×”的标记，且在“备注”中可查看所有被标记的错误原因。若标记错误可点击“×”取消该标记'
                },
                {
                  src: '26',
                  class: 'loading'
                },
                {
                  content: '审核完毕后可点击“通过”通过审核或者“驳回”到“待修正”列表'
                }
              ]
            },
            {
              leafTitle: '任务中心-待修正',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '任务中心-待修正'
                },
                {
                  content: '点击“编辑”进入修正页面'
                },
                {
                  src: '27',
                  class: 'loading'
                },
                {
                  content: '可根据表单中的错误标记及原因进行修改，修改完毕后点击“阶段提交”被条数据会再次被提交到“待审核”列表（同待审核）'
                },
                {
                  src: '28',
                  class: 'loading'
                }
              ]
            },
            {
              leafTitle: '任务中心-随访',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '任务中心-随访'
                },
                {
                  content: '本系统根据出院患者的出院日期进行推算，从出院日期起分别间隔3个月、6个月、12个月、24个月、36个月进行一次随访，若该患者失访，则点击“失访”，该患者状态变成“已失访”，则之后不会再提醒该患者需要随访。'
                },
                {
                  src: '29',
                  class: 'loading'
                },
                {
                  content: '点击“完成”则本次随访记录完成'
                },
                {
                  src: '30',
                  class: 'loading'
                }
              ]
            },
            {
              leafTitle: '任务中心-总表',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '任务中心-总表'
                },
                {
                  content: '总表中可查看患者本次住院的全部信息及每个阶段数据状态'
                },
                {
                  src: '31',
                  class: 'loading'
                },
                {
                  content: '点击查看进入详情页面，若该患者在一次住院时有多次手术，则可以选择想查看的手术记录'
                },
                {
                  src: '32',
                  class: 'loading'
                }
              ]
            }
          ]
        },
        // 患者中心
        {
          trunkTitle: '患者中心',
          trunkQuestions: [
            {
              leafTitle: '患者中心',
              leafQuestions: [
                {
                  content: '点击“查看”进入该患者详情页'
                },
                {
                  src: '33',
                  class: 'loading'
                },
                {
                  content: '患者详情页可编辑患者基本信息，也可删除该患者（操作会同时删除该患者所有数据，请谨慎操作）'
                },
                {
                  src: '34',
                  class: 'loading'
                },
                {
                  content: '患者详情以卡片形式展示不同阶段住院记录及随访记录，每条住院记录中点击“查看报告”可查看本次住院记录的全部数据，本报告可打印或导出成PDF格式文件'
                },
                {
                  src: '35',
                  class: 'loading'
                }
              ]
            }
          ]
        },
        // 数据管理
        {
          trunkTitle: '数据管理',
          trunkQuestions: [
            {
              leafTitle: '数据管理概览',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '数据管理包括：'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-module-data',
                  link: 'not',
                  content: '数据统计'
                },
                {
                  class: 'link',
                  icon: 'ercp-icon-module-export',
                  link: [5, 1],
                  content: '数据导出'
                },
                {
                  content: '本部分主要是对系统的数据进行简单的统计图展示，当医生有科研需要时，可通过一定的筛选条件筛选需导出的数据，导出文件为Excel格式。'
                }
              ]
            },
            {
              leafTitle: '数据导出',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '数据导出'
                },
                {
                  src: '36',
                  class: 'loading'
                },
                {
                  content: '筛选条件分为基本信息及住院信息两类，可自行增减条件'
                },
                {
                  content: '条件选择完毕后（若没有选择筛选条件，则将获取数据库中全部数据）点击“开始检索”'
                },
                {
                  content: '选择要导出的表单及字段，选择完毕后，输入文件名生成文件，找到生成的文件导出即可。'
                }
              ]
            }
          ]
        },
        // 个人中心
        {
          trunkTitle: '个人中心',
          trunkQuestions: [
            {
              leafTitle: '个人中心',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '个人中心'
                },
                {
                  content: '顶部操作栏点击用户姓名，可查看当前账号ID、用户类型、科室等信息，也可进行修改密码、退出登录的操作（因本系统所有账号创建时均为相同的默认密码，为保证用户数据安全建议首次登录后进行修改密码操作）'
                },
                {
                  src: '37',
                  class: 'loading'
                }
              ]
            }
          ]
        },
        // 消息中心
        {
          trunkTitle: '消息中心',
          trunkQuestions: [
            {
              leafTitle: '消息中心',
              leafQuestions: [
                {
                  class: 'sub-title',
                  content: '消息中心'
                },
                {
                  content: '本系统可在系统用户之间发送信息'
                },
                {
                  content: '顶部栏点击“信封”的icon，可查看信息内容'
                },
                {
                  src: '38',
                  class: 'loading'
                },
                {
                  content: '点击“查看全部消息”进入消息中心'
                },
                {
                  content: '可进行回复消息或删除等操作'
                },
                {
                  src: '39',
                  class: 'loading'
                },
                {
                  content: '点击“写消息”可选择发送对象进行系统内信息沟通'
                },
                {
                  src: '40',
                  class: 'loading'
                }
              ]
            }
          ]
        }
      ],
      activeNames: 0,
      activeIndex: [0, 0],
      currentQus: {},
      options4: [],
      loading: false,
      image: '',
      this_image: '',
      showImage: false
    }
  },
  // 初始化当前问题
  created () {
  },
  mounted () {
    this.currentQus = this.treeQuestions[this.activeIndex[0]].trunkQuestions[this.activeIndex[1]]
    // this.getImagesMeth('1')
  },
  methods: {
    remoteMethod (query) {
      if (query && query !== '') {
        this.loading = true
        this.options4 = []
        setTimeout(() => {
          this.loading = false
          this.treeQuestions.forEach((item1, index1) => {
            item1.trunkQuestions.forEach((item2, index2) => {
              if (item2.leafTitle.includes(query)) {
                let obj = {
                  label: item2.leafTitle,
                  value: JSON.stringify([index1, index2])
                }
                this.options4.push(obj)
                this.loading = false
              }
            })
          })
        }, 200)
      } else {
        this.options4 = []
      }
    },
    search (value) {
      if (value) {
        console.log(value)
        let index = JSON.parse(value)
        this.handSelect(index[0], index[1])
      }
    },
    handleChange: function (activeNames) {
    },
    handSelect (index1, index2) {
      this.activeIndex[0] = index1
      this.activeIndex[1] = index2
      this.currentQus = this.treeQuestions[index1].trunkQuestions[index2]
      this.activeNames = index1
      console.log(this.activeIndex)
    },
    linkTo (value) {
      if (value !== null && value !== 'not') {
        this.handSelect(value[0], value[1])
      }
    },
    prev (value) {
      let index1 = this.activeIndex[0]
      let index2 = this.activeIndex[1]
      if (index2 > 0) {
        index2 = index2 - 1
      } else {
        if (index1 > 0) {
          let index3 = this.allQues[index1 - 1] - 1
          index1 = index1 - 1
          index2 = index3
        } else {
          this.$message('已经是第一页了')
        }
      }
      this.handSelect(index1, index2)
    },
    next (value) {
      let index1 = this.activeIndex[0]
      let index2 = this.activeIndex[1]
      let index3 = this.allQues[index1]
      if (index2 < index3 - 1) {
        index2 += 1
      } else {
        if (index1 + 1 < this.allQues.length) {
          index1 = index1 + 1
          index2 = 0
        } else {
          this.$message('已经是最后一页了')
        }
      }
      this.handSelect(index1, index2)
    },
    async getImagesMeth (value) {
      let info = value
      let response = await getImages(info)
      const blob = new Blob([response.data], {type: 'image/png'})
      return window.URL.createObjectURL(blob)
    },
    huger (value) {
      this.showImage = true
      this.this_image = value
    }
  },
  computed: {
    'allQues': {
      get: function () {
        let arr = []
        this.treeQuestions.forEach((item, index) => {
          let num = item.trunkQuestions.length
          arr.push(num)
        })
        return arr
      }
    }
  },
  watch: {
    'currentQus': {
      handler: function (newVal) {
        newVal.leafQuestions.forEach((item) => {
          if (item.class === 'loading') {
            let mata = item.src
            let getImagesMeth = async () => {
              let info = mata
              let response = await getImages(info)
              let uzi = window.URL.createObjectURL(response.data)
              item.src = uzi
              item.class = 'finish'
            }
            getImagesMeth()
          }
        })
      },
      deep: true
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
        width: 300px;
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
      .feedback{
        margin-top: 22px;
        margin-left: 10px;
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
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      display:flex;
      max-height: 100%;
      .qus-nav{
        flex:0 0 300px;
        overflow-x:hidden;
        overflow-y:auto;
        background-color: #eee;
        .el-collapse{
          .el-collapse-item{
            padding:0px;
          }
        }
      }

      .qus-main{
        flex: 1;
        padding: 24px 90px;
        background-color: #f5f7fa;
        box-sizing: border-box;
        overflow: auto;
        position: relative;
        transition: all .5s linear;
        max-height: 100%;
        .content{
          overflow: hidden;
          p{
            line-height: 2;
          }
          .title{
            text-shadow: 2px 2px 2px #dfdfdf;
            font-size: 26px;
            font-weight: 900;
            padding: 10px 0;
          }
          .link{
            color: rgba($color: $themeColor, $alpha: .8);
            cursor: pointer;
          }
          .link:hover{
            text-shadow: 2px 2px 1px #dfdfdf;
          }
          .sub-title{
            text-shadow: 2px 2px 2px #dfdfdf;
            font-size: 20px;
            font-weight: 900;
            text-indent: 0;
          }
          img{
            width: 80%;
            margin: 10px 0;
          }
        }
      }
      .prev, .next{
        position: fixed;
        top: 130px;
        left: 470px;
        height: calc(100% - 130px);
        width: 40px;
        transition: all .5s linear;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        div{
          cursor: pointer;
          font-weight: 100;
          color: #fff;
          border-radius: 50%;
          line-height: 30px;
          text-indent: 0;
          text-align: center;
          background-color: rgba($color: #000000, $alpha: .4);
          height: 30px;
          width: 30px;
          font-size: 15px;
          transition: all .25s linear;
        }
        div:hover{
          transition: all .25s linear;
          background-color: rgba($color: #000000, $alpha: .6);
        }
      }
      .next{
        left: auto;
        right: 20px !important;
      }
    }
  }
  .image-huge{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba($color: #000, $alpha: .7);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    img{
      width: 90%;
    }
  }
</style>
