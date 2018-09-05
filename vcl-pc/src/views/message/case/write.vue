<template>
  <div id="write">
    <el-form ref="messagePen" :rules="rules" :model="message" label-position="left" label-width="80px">
      <el-form-item prop="receivers" label="发送对象">
        <el-select v-model="message.receivers" filterable style="margin-right:20px;width:100%;" multiple collapse-tags  placeholder="请搜索用户账号/姓名或选择用户列表">
        <el-option
          v-for="(item, index) in userOptions"
          :laebl="item.name + '/' + item.username"
          :value="item.name + '/' + item.username"
          :key="index">
          <span style="float: left; color: #8492a6; font-size: 11px">{{ '账号：' + item.username }}</span>
          <span style="float: right; color: #8492a6; font-size: 11px;margin-right:20px;">{{ '姓名：' + item.name }}</span>
        </el-option>
      </el-select>
      </el-form-item>

      <el-form-item prop="title" label="消息主题">
        <el-input v-model="message.title"></el-input>
      </el-form-item>

      <el-form-item prop="message" label="消息正文">
        <el-input
          v-model="message.message"
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 12 }"
          ></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" icon="ercp-icon-general-send" class="float-right" @click="sendMessage('messagePen')"> 发送消息</el-button>
  </div>
</template>
<script>
import { getAllUser } from '../../../../src/api/user/user'
import { sendMessage } from '../../../../src/api/message/message'
export default {
  name: 'message_write',
  data () {
    return {
      message: {
        receivers: [],
        title: '',
        message: '',
        sender: ''
      },
      rules: {
        receivers: [
          {required: true, message: '请至少选择一个发送对象', trigger: 'focus'}
        ],
        title: [
          {required: true, message: '消息主题不能为空', trigger: 'focus'},
          {min: 1, max: 15, message: '字数在15字以内', trigger: 'change'}
        ],
        message: [
          {required: true, message: '消息正文不能为空', trigger: 'focus'}
        ]
      },
      userOptions: [
        {
          label: '001',
          value: '12323123'
        }
      ],
      me: ''
    }
  },
  methods: {
    async getUser () {
      let info = {
        pageSize: 100,
        currentPage: 1
      }
      let response = await getAllUser(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.initUserOptions(response.data.entity.data)
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async faMessage (info) {
      // let info = this.message
      let response = await sendMessage(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.$message.success(response.data.entity)
        this.message = {
          receivers: [],
          title: '',
          message: '',
          sender: ''
        }
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    initUserOptions (arr) {
      let options = []
      arr.forEach((item) => {
        if (item.status === '正常' && item.id !== this.me.id) {
          let obj = {
            username: item.username,
            name: item.name,
            id: item.id
          }
          options.push(obj)
        }
      })
      this.userOptions = options
    },
    sendMessage (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let arr = []
          this.message.receivers.forEach((item1, index1) => {
            this.userOptions.forEach((item2) => {
              if (item1.split('/')[1] === item2.username) {
                arr.push(item2.id)
              }
            })
          })
          let info = this.message
          info.receivers = arr
          this.faMessage(info)
          console.log(info)
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    this.me = this.$store.state.user
    this.message.sender = this.me.id
    this.getUser()
  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
  #write{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 16px;
  }
</style>
