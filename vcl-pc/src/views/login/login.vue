<template>
  <div id="login">
    <div class="login-wrapper">
      <div class="left-bgi">
        <img src="../../assets/images/login.png" alt="">
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
            <el-form-item prop="password" ref="password">
              <el-input :type="passwordType" v-model="form.password" placeholder="请输入密码" @keyup.enter.native="login('loginForm')">
                <i slot="prefix" class="el-input__icon ercp-icon-general-password" style="font-size: 18px;line-height:48px;"></i>
                <i slot="suffix" class="el-input__icon ercp-icon-general-preview" style="cursor: pointer;line-height:48px;"
                  @click="_togglePasswordType"></i>
              </el-input>
            </el-form-item>

            <el-row>
              <el-col :span="13">
                <el-form-item prop="yanzhengma" ref="yanzhengma">
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
              <el-col :span="24">
                <el-button-group style="width:100%;display:flex;justify-content:center;">
                  <el-button
                    type="primary"
                    class="login-btn"
                    @click="login()">
                    登录系统
                  </el-button>
                  <el-button icon="ercp-icon-module-system" type="primary" @click="showlock = true" v-if="env">
                  </el-button>
                </el-button-group>
              </el-col>
            </div>
          </el-form>
        </div>
        <div class="close-button" v-if="env">
          <i class="ercp-icon-general-minimine" @click="windwowOperate('mini')"></i>
          <i class="ercp-icon-general-close" @click="windwowOperate('close')"></i>
        </div>
      </div>
      <el-dialog
        title="修改地址"
        :modal="true"
        append-to-body
        :close-on-click-modal="false"
        :visible.sync="showlock"
        center
        style="-webkit-app-region: no-drag;"
        width="500px">
        <el-form label-position="left" :rules="apiRules" ref="portForm" :model="apiUrl">
          <el-row>
            <el-col :span="18">
              <el-form-item label="地址" prop="api">
                <el-input  v-model="apiUrl.api"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-form-item label="端口号" prop="port">
                <el-input  v-model="apiUrl.port"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer align-center">
          <el-button @click="showlock = false">取 消</el-button>
          <el-button type="primary" @click="lock">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import validateCode from '../../components/ValidateCode/index'
import { login } from '../../api/user/user.js'
var localStorage = require('localStorage')
export default {
  created () {
    // 如果是在electron环境下，动画
    if (this.$electron) {
      let ipc = this.$electron.ipcRenderer
      ipc.send('loginResize')
      ipc.send('nonableResize')
      ipc.send('center')
    }
    // 每次在登录页面都要重新清除用户信息
    this.$store.commit('SET_TOKEN', '')
    this.$store.commit('SET_USER', null)
  },
  mounted () {
    this.env = this.$electron
    if (localStorage.getItem('api') && localStorage.getItem('port')) {
      let apiUrl = {
        api: localStorage.api,
        port: localStorage.port
      }
      this.apiUrl = apiUrl
    } else {
      this.apiUrl = {
        api: '',
        port: ''
      }
    }
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
      // stor: '',
      showlock: false,
      apiUrl: {},
      apiRules: {
        api: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '端口号不能为空', trigger: 'blur' }
        ]
      },
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
    lock () {
      this.$refs['portForm'].validate(async valid => {
        if (valid) {
          this.$confirm('此操作将修改地址参数，修改成功后需重新启动应用', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            localStorage.api = this.apiUrl.api
            localStorage.port = this.apiUrl.port
            this.showlock = false
            if (this.env) {
              let ipc = this.$electron.ipcRenderer
              setTimeout(() => {
                ipc.send('close')
              }, 2000)
              this.$message({
                type: 'success',
                message: '修改成功，本应用将于2秒后关闭，请重新启动应用'
              })
            }
          }).catch(() => {
            this.showlock = false
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        } else {
          return false
        }
      })
    },
    // 更换验证码
    _setCheckCode (value) {
      this.checkCode = value
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
          if (response.data && response.data.mitiStatus === 'SUCCESS') {
            let user = response.data.entity.User
            let token = response.data.entity.Token.token
            this.$store.commit('SET_TOKEN', token)
            this.$store.commit('SET_USER', user)
            this.$router.push('/home')
            // 如果是在electron环境下，动画
            if (this.env) {
              let ipc = this.$electron.ipcRenderer
              ipc.send('hide')
              ipc.send('mainResize')
              ipc.send('ableResize')
              ipc.send('center')
            }
          } else {
            this._updateCheckCode()
            this.$refs.password.resetField()
            this.$refs.yanzhengma.resetField()
          }
        } else {
          this.form.yanzhengma = ''
          return false
        }
      })
    },
    windwowOperate (operate) {
      // 按钮操控主进程窗口
      if (this.env) {
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
      } else {
        this.$message.info('无效点击')
      }
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
        .login-title{
          -webkit-app-region: no-drag;
          text-align: center;
          font-size:19px;
          font-weight: 900;
          color: #fff;

          img{
            width: 80px;
            height: 18px;
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
  .el-dialog__wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-dialog{
    // height: 280px;
    margin: 0 !important;
  }
</style>
