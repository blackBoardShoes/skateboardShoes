<template>
  <div id="write">
    <el-form ref="messagePen" :rules="rules" :model="message" label-position="left" label-width="80px">
      <el-form-item prop="receiver" label="发送对象">
        <el-select v-model="message.receiver" filterable style="margin-right:20px;width:100%;" multiple collapse-tags  placeholder="请搜索用户或选择用户列表">
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

      <el-form-item prop="theme" label="消息主题">
        <el-input v-model="message.theme"></el-input>
      </el-form-item>

      <el-form-item prop="content" label="消息内容">
        <el-input
          v-model="message.content"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6 }"
          ></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" icon="ercp-icon-general-send" class="float-right" @click="sendMessage('messagePen')"> 发送消息</el-button>
  </div>
</template>
<script>
import { getAllUser } from '../../../../src/api/user/user'
export default {
  name: 'message_write',
  data () {
    return {
      message: {
        receiver: [],
        theme: '',
        content: ''
      },
      rules: {
        receiver: [
          {required: true, message: '必填项不能为空', trigger: 'focus'}
        ],
        theme: [
          {required: true, message: '必填项不能为空', trigger: 'focus'}
        ],
        content: [
          {required: true, message: '必填项不能为空', trigger: 'focus'}
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
        // console.log(response.data.entity.data)
        this.initUserOptions(response.data.entity.data)
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
          this.message.receiver.forEach((item1, index1) => {
            this.userOptions.forEach((item2) => {
              if (item1.split('/')[1] === item2.username) {
                arr.push(item2.id)
              }
            })
          })
          let info = this.message
          info.receiver = arr
          console.log(info)
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    this.me = this.$store.state.user
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
