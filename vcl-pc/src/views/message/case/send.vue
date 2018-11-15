<template>
  <div id="send">
    <div class="top-nav">
      <div style="margin-right: 20px;">
        <el-button type="primary" @click="messageAllClear"> <i class="ercp-icon-general-clean"></i>全部清空</el-button>
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
          <div class="hover-bgc" style="width:100%;padding:0 10px;box-sizing:border-box;height:36px;" @click="search('receiver')">
            <span class="float-left">搜索收件人为</span>
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
        <div class="message-box-title">
          <div class="sender-title">收件人</div>
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
              <div class="message-title">
                <div class="sender text-overflow-ellipsis"><span :class="{'primary-text': item.status === 1}">{{item.receiveUser=== null ? '' : item.receiveUser.name}}</span></div>
              </div>
              <div class="message-content">
                <div class="theme">{{item.title}}</div>
                <div class="content light-text">- {{item.message}}</div>
              </div>
              <div class="send-time">
                <div class="date">20{{item.sendTime}}</div>
              </div>
              <div class="operate">
                <div class="inside">
                  <el-tooltip class="item" effect="dark" content="删除消息" placement="top">
                    <i class="ercp-icon-general-remove danger-text" @click.stop="deleteSingle(item)"></i>
                  </el-tooltip>
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
        :page-sizes="[5, 10, 15]"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        @size-change= "SizeChange"
        @current-change = "changePage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getPageMail, removeSingleMail, clearAllMessage, findMessage } from '../../../../src/api/message/message'
export default {
  name: 'message_receive',
  data () {
    return {
      searchText: '',
      // 分页信息：
      pageSize: 10,
      currentPage: 1,
      total: 0,
      messageList: [],
      visible: false
    }
  },
  methods: {
    // 获取消息列表
    async getSendMessage (pageSize, currentPage) {
      let info = {
        keyword: 'send',
        userId: this.$store.state.user.id,
        perpage: pageSize,
        currentPage: currentPage,
        type: 1
      }
      let response = await getPageMail(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.total = response.data.entity.total
        this.messageList = response.data.entity.data
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 全标已读
    async messageAllClear () {
      let info = {
        userId: this.$store.state.user.id,
        keyword: 'send',
        type: 1
      }
      let response = await clearAllMessage(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        // this.$message.success(response.data.entity)
        this.getSendMessage(this.pageSize, this.currentPage)
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 搜索消息
    async searchMessage () {
      let info = {
        userId: this.$store.state.user.id,
        searchText: this.searchText,
        keyword: 'send',
        perPage: this.pageSize,
        currentPage: this.currentPage,
        type: 1
      }
      let response = await findMessage(info)
      if (response.data.mitiStatus === 'SUCCESS') {
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
        keyword: 'send',
        perPage: this.pageSize,
        currentPage: 1,
        type: 1
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
    // 删除单个消息
    async deleteSingle (item) {
      let info = {
        mailId: item.id,
        messageType: 'send'
      }
      let response = await removeSingleMail(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        // this.$message.success(response.data.entity)
        this.getSendMessage(this.pageSize, this.currentPage)
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    SizeChange (size) {
      this.pageSize = size
      this.getSendMessage(this.pageSize, this.currentPage)
    },
    changePage (page) {
      this.currentPage = page
      this.getSendMessage(this.pageSize, this.currentPage)
    }
  },
  mounted () {
    this.getSendMessage(this.pageSize, this.currentPage)
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
  #send{
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
    }
    .message-list{
      overflow-y: auto;
      overflow-x: hidden;
      flex: 1;
      padding: 8px;
      .message-box{
        background-color: #fff;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .message-box-title{
          color: #909399;
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
          flex: 1;
          overflow: auto;
          cursor: pointer;
          font-size: 15px;
          box-sizing: border-box;
          line-height: 50px;
          display: flex;
          flex-direction: row;
          .send-time{
            text-align: left;
            width: 140px;
          }
          .message-title{
            text-align: center;
            width: 80px;
            padding-right: 10px;
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
          padding-right: 230px;
          box-sizing: border-box;
          text-align: justify;
          line-height: 30px;
          min-height: 30px;
          max-height: 150px;
          overflow: auto;
          font-size: 15px;
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
