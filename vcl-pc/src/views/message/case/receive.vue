<template>
  <div id="receive">
    <div class="top-nav">
      <el-radio-group v-model="messageType" @change="changeType">
        <el-radio-button label="1">用户消息</el-radio-button>
        <el-radio-button label="2">系统消息</el-radio-button>
      </el-radio-group>
      <div style="margin-right: 20px;">
        <el-button type="primary" @click="messageAllRead"> <i class="ercp-icon-general-read"></i> 全部标记为已读</el-button>
        <el-button type="primary" @click="messageAllClear"> <i class="ercp-icon-general-clean"></i> 全部清空</el-button>
      </div>
      <el-popover
        placement="bottom-start"
        width="225"
        trigger="manual"
        v-model="visible">
        <div class="select-type" style="line-height:36px;cursor:pointer;transform:scale(1.1, 1.2);font-size:12px;text-align:center;">
          <div class="hover-bgc" style="width:100%;padding:0 10px;box-sizing:border-box;height:36px;" @click="search('title')">
            <span class="float-left">搜索主题包含</span>
            <div class="text-overflow-ellipsis" style="width:90px;float:left;padding:0 2px;"><b>「 {{searchText}} 」</b></div>
            <span class="float-left">的消息</span>
          </div>
          <div class="hover-bgc" style="width:100%;padding:0 10px;box-sizing:border-box;height:36px;" @click="search('message')">
            <span class="float-left">搜索正文包含</span>
            <div class="text-overflow-ellipsis" style="width:90px;float:left;padding:0 2px;"><b>「 {{searchText}} 」</b></div>
            <span class="float-left">的消息</span>
          </div>
          <div class="hover-bgc" style="width:100%;padding:0 10px;box-sizing:border-box;height:36px;" @click="search('sender')">
            <span class="float-left">搜索发件人为</span>
            <div class="text-overflow-ellipsis" style="width:90px;float:left;padding:0 2px;"><b>「 {{searchText}} 」</b></div>
            <span class="float-left">的消息</span>
          </div>
        </div>
        <el-input slot="reference" v-model="searchText" style="width:251px" placeholder="搜索信息" clearable>
          <i slot="prefix" class="el-input__icon el-icon-search" style="cursor:pointer;"></i>
        </el-input>
      </el-popover>
    </div>
    <div class="message-list">
      <div class="message-box">
        <div class="message-box-title light-text">
          <div class="sender-title">发件人</div>
          <div class="theme-title">主题 - 正文</div>
          <div class="sendtime-title">时间</div>
          <div class="operate-title">操作</div>
        </div>
        <div class="no-message light-text" v-if = "messageList.length === 0">
          暂无消息
        </div>
        <el-collapse accordion>
          <el-collapse-item v-for="(item, index) in messageList" :key="index" style="position:relative;">
            <div class="message-case" slot="title">
              <div :class="{'read': true, 'not-readyet': item.isRead === 0}"></div>
              <div class="message-title" @click="singleMark(item)">
                <div class="sender text-overflow-ellipsis"><span :class="{'primary-text': item.isRead === 0}">{{item.sendUser === null ? '系统通知' : item.sendUser.name}}</span></div>
              </div>
              <div class="message-content" @click="singleMark(item)">
                <div class="theme">{{item.title}}</div>
                <div class="content light-text"> - {{item.message}}</div>
              </div>
              <div class="send-time" @click="singleMark(item)">
                <div class="date">20{{item.sendTime}}</div>
              </div>
              <div class="operate">
                <div class="inside">
                  <i class="ercp-icon-general-forward primary-text" @click.stop="recall(item)"></i>
                  <i class="ercp-icon-general-close danger-text" @click.stop="deleteSingle(item)"></i>
                </div>
              </div>
            </div>
            <div class="message-view">
              <b>消息正文：</b><span class="light-text">{{item.message}}</span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="pagination align-right">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 15, 20]"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        @size-change= "SizeChange"
        @current-change = "changePage"
      >
      </el-pagination>
    </div>
    <el-dialog :title="'回复来自  「' + recallMessage.receivers[0] + '」 的消息'" :visible.sync="showRecall" :modal="true" append-to-body width="700px">
      <el-form ref="reMessage" :rules="rules" :model="recallMessage" label-position="right" label-width="80px">
        <el-form-item prop="receivers" label="收件人">
          <el-select v-model="recallMessage.receivers" multiple style="margin-right:20px;width:100%;" disabled>
        </el-select>
        </el-form-item>
        <el-form-item prop="title" label="消息主题">
          <el-input v-model="recallMessage.title"></el-input>
        </el-form-item>
        <el-form-item prop="message" label="消息正文">
          <el-input
            clearable
            v-model="recallMessage.message"
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 12 }"
            ></el-input>
        </el-form-item>
      </el-form>
      <div class="operate align-center">
        <el-button type="info" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirmSend">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getPageMail, allRead, sendMessage, removeSingleMail, clearAllMessage, singleRead, findMessage } from '../../../../src/api/message/message'
export default {
  name: 'message_receive',
  data () {
    return {
      messageType: '1',
      visible: false,
      searchText: '',
      messageList: [],
      showRecall: false,
      recallMessage: {
        receivers: [],
        title: '',
        message: ''
      },
      rules: {
        receivers: [
          {required: true, message: '请至少选择一个发送对象', trigger: 'focus'}
        ],
        title: [
          {min: 1, max: 15, message: '字数在15字以内', trigger: 'change'},
          {required: true, message: '请输入消息主题', trigger: 'focus'}
        ],
        message: [
          {required: true, message: '请输入消息正文', trigger: 'focus'}
        ]
      },
      // 分页信息：
      pageSize: 10,
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    // 获取消息列表（系统消息/用户消息：1/2）
    async getMyMessage (type, pageSize, currentPage) {
      let info = {
        keyword: 'receive',
        userId: this.$store.state.user.id,
        perpage: pageSize,
        currentPage: currentPage,
        type: type
      }
      let response = await getPageMail(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.total = response.data.entity.total
        this.messageList = response.data.entity.data
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 切换消息类型
    changeType () {
      this.getMyMessage(this.messageType, this.pageSize, this.currentPage)
    },
    // 当前页面全部标记为已读
    async messageAllRead () {
      let info = {
        userId: this.$store.state.user.id,
        type: this.messageType
      }
      let response = await allRead(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.$message.success(response.data.entity)
        this.getMyMessage(this.messageType, this.pageSize, this.currentPage)
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 清空全部消息
    async messageAllClear () {
      // 全标已读接口
      let info = {
        userId: this.$store.state.user.id,
        keyword: 'receive',
        type: this.messageType
      }
      let response = await clearAllMessage(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.$message.success(response.data.entity)
        this.getMyMessage(this.messageType, this.pageSize, this.currentPage)
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    showPopoper (value) {
      if (value !== '') {
        this.visible = true
      }
      console.log(value)
    },
    // 搜索消息
    async searchMessage () {
      let info = {
        userId: this.$store.state.user.id,
        searchText: this.searchText,
        keyword: 'receive',
        perPage: this.pageSize,
        currentPage: this.currentPage,
        type: this.messageType
      }
      let response = await findMessage(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        // this.$message.success(response.data.entity)
        this.total = response.data.entity.total
        this.messageList = response.data.entity.data
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async search (value) {
      let info = {
        mode: value,
        userId: this.$store.state.user.id,
        like: this.searchText,
        keyword: 'receive',
        perPage: this.pageSize,
        currentPage: 1,
        type: this.messageType
      }
      let response = await findMessage(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        // this.$message.success(response.data.entity)
        this.total = response.data.entity.total
        this.messageList = response.data.entity.data
        console.log(response.data.entity.data)
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 单个标记为已读
    async singleMark (item) {
      if (item.isRead === 0) {
        let info = item.id
        let response = await singleRead(info)
        if (response.data.mitiStatus === 'SUCCESS') {
          this.$message.success(response.data.entity)
          this.getMyMessage(this.messageType, this.pageSize, this.currentPage)
        } else {
          this.$message.error('ERROR: ' + response.data.message)
        }
      }
    },
    // 弹出回复消息的对话框
    recall (item) {
      this.showRecall = true
      this.recallMessage.receivers = []
      this.recallMessage.title = 'Re「' + (item.title.length >= 11 ? item.title.slice(0, 11) : item.title) + '」'
      this.recallMessage.receivers.push(item.sendUser.name)
      this.recallMessage.backReceiver = item.sendUser.id
    },
    // 取消发送
    cancel () {
      this.showRecall = false
      this.$refs.reMessage.resetFields()
    },
    // 确认发送回复
    async confirmSend () {
      this.$refs.reMessage.validate(async valid => {
        if (valid) {
          let info = {
            receivers: [this.recallMessage.backReceiver],
            title: this.recallMessage.title,
            message: this.recallMessage.message
          }
          info.sender = this.$store.state.user.id
          let response = await sendMessage(info)
          if (response.data.mitiStatus === 'SUCCESS') {
            this.$message.success(response.data.entity)
            this.$refs.reMessage.resetFields()
            this.showRecall = false
          } else {
            this.$message.error('ERROR: ' + response.data.message)
          }
        } else {
          return false
        }
      })
    },
    // 删除单个消息
    async deleteSingle (item) {
      let info = {
        mailId: item.id,
        messageType: 'receive'
      }
      let response = await removeSingleMail(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.$message.success(response.data.entity)
        this.getMyMessage(this.messageType, this.pageSize, this.currentPage)
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 改变每页消息数
    SizeChange (size) {
      this.pageSize = size
      this.getMyMessage(this.messageType, this.pageSize, this.currentPage)
    },
    // 改变当前页数
    changePage (page) {
      this.currentPage = page
      this.getMyMessage(this.messageType, this.pageSize, this.currentPage)
    }
  },
  mounted () {
    // 初始化消息列表
    this.getMyMessage(this.messageType, this.pageSize, this.currentPage)
  },
  watch: {
    'searchText': {
      handler: function (newVal) {
        // console.log(newVal)
        if (newVal !== '') {
          this.visible = true
        } else {
          this.visible = false
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/variable';
  #receive{
    padding: 16px;
    width: 100%;
    height:100%;
    box-sizing: border-box;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .top-nav{
      overflow: hidden;
      height: 40px;
      min-height: 40px;
      line-height: 40px;
      padding: 8px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      overflow: auto;
    }
    .message-list{
      // overflow: auto;
      padding: 8px;
      .message-box{
        width: 100%;
        height: 100%;
        // overflow-x: hidden;
        // overflow-y: auto;
        .message-box-title{
          display: flex;
          flex-direction: row;
          text-align: center;
          text-indent: 3px;
          font-size: 15px;
          height: 40px;
          padding: 10px 0;
          line-height: 20px;
          box-sizing: border-box;
          background-color: #E8E9EA;;
          .sender-title{
            width: 90px;
            border-right: 1px solid #ababab;
          }
          .theme-title{
            flex: 1;
            border-right: 1px solid #ababab;
          }
          .sendtime-title{
            width: 150px;
            border-right: 1px solid #ababab;
          }
          .operate-title{
            width: 80px;
          }
        }
        .no-message{
          height: 48px;
          width: 100%;
          font-size: 15px;
          line-height: 48px;
          text-align: center;
        }
        .message-case{
          cursor: pointer;
          font-size: 15px;
          box-sizing: border-box;
          line-height: 50px;
          display: flex;
          flex-direction: row;
          // position: relative;
          .read{
            position: absolute;
            left: 0;
            top: 0;
            width: 0px;
            height: 0px;
            border-width: 6px;
            border-style:solid;
            border-color: transparent;
          }
          .not-readyet{
            border-color: $themeColor transparent transparent $themeColor;
          }
          .send-time{
            text-align: left;
            width: 140px;
          }
          .message-title{
            width: 80px;
            padding-right: 10px;
            text-align: center;
            .sender{
              height: 50px;
              padding-left: 10px;
            }
          }
          .message-content{
            flex: 1;
            padding:0 10px;
            overflow: hidden;
            line-height:50px;
            display: flex;
            flex-direction: row;
            .theme{
              margin-right: 5px;
              // font-weight: 900;
            }
            .content{
              flex: 1;
              height: 50px;
              overflow: hidden;
              .content{
                min-width:0;
                width: 100%;
              }
            }
          }
        }
        .operate{
          width: 67px;
          .inside{
            position: absolute;
            background-color: #fff;
            height: 48px;
            line-height: 48px;
            top: 0px;
            box-sizing: border-box;
            right: 0px;
            padding: 0 10px;
            width: 80px;
            z-index: 111;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
        }
        .message-view{
          padding-left: 103px;
          padding-right: 80px;
          box-sizing: border-box;
          // width: 100%;
          text-align: justify;
          line-height: 30px;
          min-height: 30px;
          max-height: 150px;
          overflow: auto;
          font-size: 15px;
          background-color: #fff;
        }
      }
    }
    .pagination{
      margin-top: 10px;
      min-height: 30px;
      line-height: 30px;
    }
  }
</style>
