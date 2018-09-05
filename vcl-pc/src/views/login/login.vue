<template>
  <div class="login">
    <div class="middle-wrapper">
      <div class="login-form">
        <div class="bgi">
          <div class="system-title">
            <span>信息录入管理系统</span>
          </div>
        </div>
        <el-form
          ref="loginForm"
          :model="form"
          :rules="rules"
          @keyup.enter.native="login('loginForm')">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入账号">
              <i slot="prefix" class="el-input__icon ercp-icon-general-account" style="font-size: 18px;"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :type="passwordType" v-model="form.password" placeholder="请输入密码" @keyup.enter.native="login('loginForm')">
              <i slot="prefix" class="el-input__icon ercp-icon-general-password" style="font-size: 18px;"></i>
              <i slot="suffix" class="el-input__icon ercp-icon-general-preview" style="cursor: pointer;"
                 @click="_togglePasswordType"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="yanzhengma">
            <div class="check-code-wrapper">
              <div class="yanzhengma-wrapper">
                <el-input v-model="form.yanzhengma" @keyup.enter.native="login('loginForm')" placeholder="请输入验证码">
                  <i slot="prefix" class="el-input__icon ercp-icon-module-authority" style="font-size: 18px;"></i>
                </el-input>
              </div>
              <div class="validate-code-wrapper">
                <validate-code ref="validate-code" @change="_setCheckCode"></validate-code>
              </div>
            </div>
          </el-form-item>
          <el-form-item style="margin-bottom: 0;margin-top:40px;">
            <el-col :span="24">
              <el-form-item>
                <el-button
                  type="primary"
                  class="login-btn"
                  style="width: 100%;"
                  @click="login('loginForm')">
                  登录系统
                </el-button>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <div class="bottom-wrapper">
      <b>Copyright © 2018 MITI Genomics Inc, All Rights Reserved</b>
    </div> -->
  </div>
</template>
<script>
import validateCode from '../../components/ValidateCode/index'
import { login } from '../../api/user/user.js'
export default {
  created () {
    if (process.env.NODE_ENV === 'production') {
      let ipc = this.$electron.ipcRenderer
      ipc.send('loginResize')
    }
    // 每次在登录页面都要重新清除用户信息
    this.$store.commit('SET_TOKEN', '')
    this.$store.commit('SET_USER', null)
    console.log(this.$store.state)
  },
  data () {
    var checkYanzhengma = (rule, value, callback) => {
      value = value.toUpperCase()
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value !== this.checkCode) {
        callback(new Error('验证码错误'))
        this.$refs['validate-code'].draw()
      } else {
        callback()
      }
    }
    return {
      passwordType: 'password',
      checkCode: '',
      form: {
        username: '',
        password: '',
        yanzhengma: ''
      },
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        yanzhengma: [
          { validator: checkYanzhengma, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 更换验证码
    _setCheckCode (value) {
      this.checkCode = value
      this.form.yanzhengma = value
    },
    // 密码是否可见
    _togglePasswordType () {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
    // 验证码绘制
    _updateCheckCode () {
      this.$refs['validate-code'].draw()
    },
    // 登录请求
    async login (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let info = {
            username: this.form.username,
            password: this.form.password
          }
          let response = await login(info)
          if (response.data.mitiStatus === 'SUCCESS') {
            let user = response.data.entity.User
            let token = response.data.entity.Token.token
            this.$store.commit('SET_TOKEN', token)
            this.$store.commit('SET_USER', user)
            this.$router.push('/home')
          } else {
            this.$message.error('ERROR: ' + response.data.message)
          }
        } else {
          return false
        }
      })
    }
  },
  components: {
    validateCode
  }
}
</script>
<style lang="scss" scoped>
  .login {
    -webkit-app-region: drag;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image:url('../../assets/images/login-bg.png');
    background-size: cover;
    .middle-wrapper {
      position: fixed;
      width: 100%;
      margin: 0 auto;
      top: 50%;
      transform: translateY(-55%);

      .login-form {
        position: relative;
        margin: 0 auto;
        width: 480px;
        height: 360px;
        padding: 30px;
        box-sizing: border-box;
        border-radius: 5px;
        background-color: #ffffff;
        .bgi{
          position: absolute;
          top: -120px;
          left: -10px;
          right: 0;
          bottom: 0;
          height: 490px;
          width: 500px;
          background-image: url('../../assets/images/登录框.png');
          background-repeat: no-repeat;
          // display: none;
          .system-title{
            height: 40px;
            line-height: 40px;
            color:#000;
            margin-top: 150px;
            text-align: center;
            font-size: 20px;
            font-weight: 900;
            display: block;
          }
        }
        .el-form{
          background-image: url('../../assets/images/ldyy.png');
          background-repeat: no-repeat,no-repeat;
          background-position: -50px -50px, 330px 0px;
          background-size: 160px 160px, 80px 80px;
          -webkit-app-region: no-drag;
          margin-top: 50px;
          padding:0 15px;
        }
        .el-row {
          margin-bottom: 20px;

          &:last-child {
            margin-bottom: 0;
          }

        }

        .check-code-wrapper {
          display: flex;
          justify-content: space-between;
          height: 40px;

          .yanzhengma-wrapper {
            flex: 0 1 auto;
          }

          .validate-code-wrapper {
            flex: 0 0 160px;
          }
        }
      }
    }
    .bottom-wrapper{
      position: fixed;
      bottom: 40px;
      margin: 0 auto;
      width: 100%;
      font-size: 14px;
      text-align: center;
    }
  }
</style>
