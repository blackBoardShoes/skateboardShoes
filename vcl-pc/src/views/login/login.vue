<template>
  <div id="login">
    <div class="login-wrapper">
      <div class="left-bgi">
        <img src="../../assets/images/登录框@2x.png" alt="">
      </div>
      <div class="right-login">
        <div class="login-title">
          <img src="../../assets/images/ercp标题.png" alt="">
          <br>
          <span>信息录入管理系统</span>
        </div>
        <div class="login-form">
          <el-form
            ref="loginForm"
            :model="form"
            :rules="rules">
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="请输入账号">
                <i slot="prefix" class="el-input__icon ercp-icon-general-account" style="font-size: 18px;line-height:48px;"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input :type="passwordType" v-model="form.password" placeholder="请输入密码" @keyup.enter.native="login('loginForm')">
                <i slot="prefix" class="el-input__icon ercp-icon-general-password" style="font-size: 18px;line-height:48px;"></i> -->
                <i slot="suffix" class="el-input__icon ercp-icon-general-preview" style="cursor: pointer;line-height:48px;"
                  @click="_togglePasswordType"></i>
              </el-input>
            </el-form-item>
            <el-row>
              <el-col :span="13">
                <el-form-item prop="yanzhengma">
                  <div class="check-code-wrapper">
                    <div class="yanzhengma-wrapper">
                      <el-input v-model="form.yanzhengma" @keyup.enter.native="login('loginForm')" :placeholder="yanzhengmaHolder">
                        <i slot="prefix" class="el-input__icon ercp-icon-general-vertify" style="font-size: 18px;line-height:48px;"></i>
                      </el-input>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <div class="validate-code-wrapper">
                  <validate-code ref="validate-code" @change="_setCheckCode"></validate-code>
                </div>
              </el-col>
            </el-row>
            <div style="margin-bottom: 0;margin-top:40px;height:48px;">
              <el-col :offset="6" :span="12">
                <!-- <el-form-item> -->
                <el-button
                  type="primary"
                  class="login-btn"
                  style="width: 100%;"
                  @click="login()">
                  登录系统
                </el-button>
                <!-- </el-form-item> -->
              </el-col>
            </div>
          </el-form>
        </div>
        <div class="close-button">
          <i class="ercp-icon-general-minimine" @click="windwowOperate('mini')"></i>
          <i class="ercp-icon-general-close" @click="windwowOperate('close')"></i>
        </div>
      </div>
    </div>
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
      ipc.send('nonableResize')
      ipc.send('center')
    }
    // 每次在登录页面都要重新清除用户信息
    this.$store.commit('SET_TOKEN', '')
    this.$store.commit('SET_USER', null)
    console.log(this.$store.state)
  },
  mounted () {
    this.env = process.env.NODE_ENV
  },
  data () {
    var checkYanzhengma = (rule, value, callback) => {
      value = value.toUpperCase()
      if (value === '') {
        this.yanzhengmaHolder = ''
        callback(new Error('请输入验证码'))
      } else if (value !== this.checkCode) {
        this.yanzhengmaHolder = ''
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
      },
      yanzhengmaHolder: '请输入验证码',
      env: ''
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
      this.$refs['loginForm'].validate(async valid => {
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
            this.env = process.env.NODE_ENV
            if (this.env === 'production') {
              let ipc = this.$electron.ipcRenderer
              ipc.send('hide')
              ipc.send('mainResize')
              ipc.send('ableResize')
              ipc.send('center')
            }
          } else {
            this.$message.error('ERROR: ' + response.data.message)
          }
        } else {
          return false
        }
      })
    },
    windwowOperate (operate) {
      // 按钮操控主进程窗口
      let ipc = this.$electron.ipcRenderer
      switch (operate) {
        case 'mini':
          ipc.send('min')
          break
        case 'max':
          ipc.send('max')
          break
        case 'close':
          ipc.send('close')
          break
      }
      console.log(operate)
    }
  },
  components: {
    validateCode
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/css/variable';
  #login{
    width: 100%;
    height: 100%;
    background-color: rgba($color: $siderbarBgColor, $alpha: .9);
    .login-wrapper{
      width: 840px;
      height: 360px;
      position: fixed;
      left: 50%;
      top: 50%;
      margin-left: -420px;
      margin-top: -180px;
      background-size: 100% 100%;
      background-origin: padding-box;
      .left-bgi{
        -webkit-app-region: drag;
        width: 480px;
        height: 360px;
        float: left;
        background-color: rgba($color: $siderbarBgColor, $alpha: 1);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        img{
          width: 100%;
          height: 100%;
          filter: grayscale(90%);
        }
      }
      .right-login{
        -webkit-app-region: drag;
        float: left;
        width: 360px;
        height: 360px;
        box-sizing: border-box;
        padding: 30px;
        background-color: rgba($color: $siderbarBgColor, $alpha: .9);
        // background: url('../../assets/images/ldyy.png') center center;
        // background-size: 100% 100%;
        .login-title{
          -webkit-app-region: no-drag;
          // width:300px;
          text-align: center;
          font-size:19px;
          font-weight: 900;
          color: #fff;
          // background-color: rgba($color: $themeColor, $alpha: 0.05);

          img{
            width: 80px;
            height: 18px;
            // vertical-align: middle;
            // margin-bottom: 4px;
          }
        }
        .login-form{
          -webkit-app-region: no-drag;
          margin-top: 30px;
          overflow: hidden;
          border-radius: 2px;
        }
        .close-button{
          -webkit-app-region: no-drag;
          width: 50px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          position: absolute;
          right: 16px;
          top: 16px;
          color: #c0c4cc;
          cursor: pointer;
        }
      }
    }
  }
</style>
<style lang="scss">
  @import '../../assets/css/variable';
  .login-form .el-input__inner{
    height: 48px;
    line-height: 48px;
    background-color: rgba($color: $siderbarBgColor, $alpha: .9) !important;
    border: none;
    border-radius: 0;
    color:#fff;
  }
  .login-form .el-form-item{
    margin: 0;
    padding: 0;
  }
  .validate-code-wrapper{
    height: 48px;
    padding: 6px;
    box-sizing: border-box;
    background-color: rgba($color: $siderbarBgColor, $alpha: .9);
  }

  .login-form .el-form .el-form-item__error{
    width: 72px;
    top: 16px;
    text-align: right;
    right: 32px;
    left: auto;
  }

  .login-form .el-input--prefix .el-input__inner{
    padding-left: 40px !important;
  }

  .login-form .el-row .el-form-item__error{
    width: 72px;
    top: 16px;
    text-align: right;
    right: 16px;
    left: auto;
  }
</style>
