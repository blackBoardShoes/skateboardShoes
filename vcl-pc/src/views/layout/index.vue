<template>
  <div id="layout">
    <div id="left-wrapper">
      <div class="slider-menu">
        <el-tooltip
          placement="right"
          v-for="(menu,index) in menuData"
          :key="index"
          @click="skip(index,menu)"
          :disabled="menu.children.length < 2">
          <div
            :class="{menu: true, active: menu.path === ($route.path.split('/')[1] === 'home' ? '/home' : '/' +  $route.path.split('/')[1])}"
            @click="skip(index,menu)">
            <div class="icon">
              <span :class="menu.icon"></span>
            </div>
            <div class="text">
              {{menu.title}}
            </div>
            <div class="underline">
              <div class="round" v-for="round in 4" :key="round"></div>
            </div>
          </div>
          <div class="sub-menu" slot="content">
            <div class="child-menu" v-for="(child, index2) in menu.children" :key="index2" @click="skip(index2,child)">
              <span style="display:block;height:30px;line-height:30px;font-size:12px;padding:0 10px;text-align: left;cursor:pointer;">
                {{child.meta.title}}</span>
            </div>
          </div>
        </el-tooltip>
      </div>
      <div class="other-menu">
        <div
          v-for="(item, index) in otherData"
          :key="index"
          @click="skip(index,item)"
          :class="{'link-menu': true, active: item.path === ($route.path.split('/')[1] === 'home' ? '/home' : '/' +  $route.path.split('/')[1])}">
          <span class="menu-title">{{item.title}}</span>
        </div>
      </div>
    </div>
    <div id="right-content">
      <!-- <div id="topbar-wrapper" @contextmenu.prevent.stop="ban"> -->
      <div id="topbar-wrapper">
        <!-- 顶部导航 -->
        <div class="float-left full-height bread-nav">
          <div class="float-left"><i class="ercp-icon-general-menu"></i></div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: item.path }" v-for="(item, index) in currentPath" :key="index">{{item.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="system-operate float-right" v-if="env === 'production'">
          <span class="ercp-icon-general-minimine" @click="windwowOperate('mini')"></span>
          <span class="ercp-icon-general-restore"  @click="windwowOperate('max')"></span>
          <span class="ercp-icon-general-close" @click="windwowOperate('close')"></span>
        </div>
        <div class="system-title float-right">
          <img src="../../assets/ercp标题.png" alt="">
          <span>信息录入管理系统</span>
        </div>
        <div class="message float-right" @click="$router.push('/message/index')">
          <span>
            <i class="ercp-icon-module-message"></i>
            <span class="radial-text-primary">{{messageNum}}</span>
          </span>
        </div>
        <div class="user-operate float-right">
          <el-dropdown
            :show-timeout="10"
            :hide-timeout="10"
            @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="ercp-icon-module-user"></i>
              <span>{{user.department + '-'}}</span>
              <span>{{user.userName}}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>{{'性别：' + user.gender}}</el-dropdown-item>
              <el-dropdown-item>{{user.status === 0 ? '状态：有效' :'状态：无效'}}</el-dropdown-item>
              <el-dropdown-item>{{'账号：' + user.userAccount}}</el-dropdown-item>
              <el-dropdown-item command="exit">退出登陆</el-dropdown-item>
              <el-dropdown-item command="changePs">修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div id="main-content">
        <router-view></router-view>
      </div>
      <el-dialog
        title="修改密码"
        :modal="true"
        append-to-body
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        width="500px">
        <el-form :model="psw" :rules="rules" ref="pswForm" label-position="left" label-width="80px">
          <el-form-item label="当前密码" prop="oldPassword">
            <el-input type="password" v-model="psw.oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="新的密码" prop="newPassword">
            <el-input type="password" v-model="psw.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input type="password" v-model="psw.checkPassword"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer align-center">
          <el-button @click="cancelChange('pswForm')">取 消</el-button>
          <el-button type="primary" @click="changPassword('pswForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import sessionStorage from '../../assets/js/storage/sessionStorage'
import { setMenu, getCurrentPath } from '../../../src/assets/js/util'
import { userMixin } from '../../../src/mixin/index'
export default {
  name: 'layout',
  mixins: [userMixin],
  data () {
    let validateOldPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入当前密码'))
      }
      callback()
    }
    let validateNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新的密码'))
      } else {
        if (this.psw.checkPassword !== '') {
          this.$refs.pswForm.validateField('checkPassword')
        }
        callback()
      }
    }
    let validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.psw.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      env: {},
      menuData: [],
      otherData: [],
      currentPath: '',
      searchText: '',
      dialogVisible: false,
      psw: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [
          { validator: validateOldPassword, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validateNewPassword, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validateCheckPassword, trigger: 'blur' }
        ]
      },
      messageNum: 9
    }
  },
  created () {
    this.checkAuth()
    this.initMenu(this.menu)
    this.env = process.env.NODE_ENV
  },
  mounted () {
    console.log(this.user)
    // fixed: 页面刷新清空缓存
    // fixed：刷新后面包屑重置
    this.currentPath = getCurrentPath(this, this.$route)
  },
  methods: {
    initMenu (menu) {
      if (menu) {
        menu.forEach((item) => {
          if (item.title === '帮助中心' || item.title === '信息反馈' || item.title === '关于系统') {
            this.otherData.push(item)
          } else {
            this.menuData.push(item)
          }
        })
      }
    },
    checkAuth () {
      // 检查用户权限
      let token = this.$store.state.token || sessionStorage.getItem('token')
      if (!token || sessionStorage.getItem('token') === '') {
        this.$router.replace('/login')
      } else {
        console.log(token)
      }
    },
    handleCommand (command) {
      if (command === 'changePs') {
        this.changePs()
      } else if (command === 'exit') {
        this.exit()
      }
    },
    changPassword (formName) {
      console.log(this.$refs)
      this.$refs.pswForm.validate((valid) => {
        if (valid) {
          let newPassword = this.psw.newPassword
          let oldPassword = this.psw.oldPassword
          console.log(oldPassword)
          console.log(newPassword)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    exit () {
      this.$confirm('即将退出系统登陆，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('SET_TOKEN', '')
          this.$store.commit('SET_USER', null)
          this.$router.replace({ path: '/login' })
        })
        .catch(() => {
          return false
        })
    },
    cancelChange (formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
    },
    changePs () {
      console.log(1)
      this.dialogVisible = true
    },
    toMessage () {
      this.$router.push('/message/index')
    },
    skip (index, menu) {
      console.log(menu.path)
      this.$router.push(menu.path)
    },
    search () {
      console.log(this.searchText)
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
      // console.log(ipc)
    },
    ban () {
      console.log('阻止默认的右键出现菜单事件')
    }
  },
  computed: {
    menu () {
      if (this.user) {
        return setMenu(this.$store.state.routers, this.user.userType)
      }
    }
  },
  watch: {
    '$route' (to) {
      this.currentPath = getCurrentPath(this, to)
      console.log(this.currentPath)
    }
  }
}
</script>
<style lang="scss">
  @import '../../assets/css/variable';
  #layout{
    height:100%;
    width:100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    #left-wrapper{
      cursor: pointer;
      width:150px;
      min-width: 150px;
      height:100%;
      background-color: $siderbarBgColor;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .slider-menu{
        width:100%;
        flex:1;
        // height:90%;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: auto;
        .menu{
          flex:1;
          max-height:126px;
          min-height:96px;
          box-sizing: border-box;
          position: relative;
          color:$minorTextColor;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          transition: all 1.5s linear;
          .icon{
            height:40px;
            font-size:32px;
          }
          .text{
            margin-top:5px;
            font-size: 14px;
            height:30px;
            line-height:30px;
          }
          .underline{
            position: absolute;
            bottom: 0;
            width: 30px;
            display: flex;
            justify-content: center;
            .round{
              margin:0 2px;
              width: 4px;
              height:4px;
              border-radius: 50%;
              background-color: $minorTextColor;
            }
          }
          .sub-menu{
            background-color: $siderbarBgColor;
          }
        }
        .menu:hover{
          transition: all .5s linear;
          .icon{
            color:$lightTextColor;
          }
          .text{
            color:$lightTextColor;
          }
          .underline{
            .round{
              background-color: $lightTextColor;
            }
          }
        }
        .active{
          transition: all 1.5s linear;
          .icon{
            color:$themeColor;
          }
          .text{
            color:$lightTextColor;
          }
          .underline{
            .round{
              background-color: $lightTextColor;
            }
          }
        }
        .menu::before{
          content: '';
          position: absolute;
          left: -4px;
          top:10px;
          bottom:10px;
          width:8px;
          background-color:transparent;
          transition: all .35s ease-in-out;
        }
        .active::before{
          content: '';
          position: absolute;
          left: -4px;
          top:10px;
          bottom:10px;
          width:8px;
          border-radius:8px;
          background-color:$themeColor;
          transition: all .35s ease-in-out;
        }
      }
      .other-menu{
        height:60px;
        padding:15px 0;
        .link-menu{
          height: 80px;
          line-height: 80px;
          color: #878787;
          text-align: center;
          font-size: 13px;
        }
        .active, .link-menu:hover{
          color:#fff;
        }
      }
    }
    #right-content{
      flex:1;
      display: flex;
      flex-direction: column;
      #topbar-wrapper{
        // 顶部区域可拖拽
        -webkit-app-region: drag;
        box-sizing: border-box;
        overflow-y: hidden;
        overflow-x: auto;
        height:48px;
        line-height:48px;
        background-color: #fff;
        border-bottom:1px solid #B4B4B4;
        .system-title{
          width:300px;
          text-align: center;
          font-size:18px;
          font-weight: 900;
          background-color: rgba($color: $themeColor, $alpha: 0.05);
          img{
            width: 80px;
            height: 18px;
            vertical-align: middle;
          }
        }
        .bread-nav{
          padding:0 15px;
          -webkit-app-region: no-drag;
          .el-breadcrumb{
            float: left;
            margin-left:14px;
            height:100%;
            line-height:48px;
            font-size:15px;
            .el-breadcrumb__inner{
              color: $mainTextColor;
              cursor: pointer;
            }
          }
        }
        .system-operate{
          cursor: pointer;
          -webkit-app-region: no-drag;
          width: 100px;
          height:100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          span:hover{
            color: $themeColor;
          }
        }
        .message{
          cursor: pointer;
          position: relative;
          padding: 0 15px;
          .radial-text-primary{
            position: absolute;
            // height: 15px;
            // width: 15px;
            // line-height: 15px;
            font-size: 6px;
            top: 10px;
            right: 0px;
          }
        }
        .user-operate{
          padding:0 10px;
          .el-dropdown-link{
            display: block;
            cursor: pointer;
            height: 100%;
          }
        }
      }
      #main-content{
        z-index: 1;
        flex:1;
        background-color: $mainBackgroundColor;
        overflow-y: auto;
        position: relative;
      }
    }
  }
</style>
