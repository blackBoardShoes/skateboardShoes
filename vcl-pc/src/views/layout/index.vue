<template>
  <div class="layout">
    <div id="sliderbar-wrapper">
      <div class="slider-menu">
        <!-- 测试阶段使用  后期去掉 -->
        <el-tooltip
          placement="right"
          v-for="(menu,index) in menuData"
          :key="index"
          @click="linkTo(menu)"
          :disabled="menu.title !== '开发测试'">
          <div
            @click="linkTo(menu)"
            :class="{menu: true, active: menu.path === ($route.path.split('/')[1] === 'home' ? '/home' : '/' +  $route.path.split('/')[1])}">
            <div class="menu-icon">
              <span :class="menu.icon"></span>
            </div>
            <div class="menu-title">
              {{menu.title}}
            </div>
            <div class="underline">
              <div class="round" v-for="round in 3" :key="round"></div>
            </div>
          </div>
          <!-- 测试阶段使用  后期去掉 -->
          <div class="sub-menu" slot="content">
            <div class="child-menu" v-for="(child, index2) in menu.children" :key="index2" @click="linkTo(child)">
              <span style="display:block;height:30px;line-height:30px;font-size:12px;padding:0 10px;text-align: left;cursor:pointer;">
                {{child.meta.title}}</span>
            </div>
          </div>
        </el-tooltip>
      </div>
      <!-- 帮助中心 -->
      <div class="other-menu">
        <div
          v-for="(item, index) in otherData"
          :key="index"
          @click="linkTo(item)"
          :class="{'link-menu': true, active: item.path === ($route.path.split('/')[1] === 'home' ? '/home' : '/' +  $route.path.split('/')[1])}">
          <span class="menu-title">{{item.title}}</span>
        </div>
      </div>
    </div>
    <!-- 禁止右键: 程序上不允许调出自定义菜单 -->
    <!-- <div id="topbar-wrapper" @contextmenu.prevent.stop="ban"> -->
    <div id="topbar-wrapper">
      <!-- 顶部导航 -->
      <div class="bread-nav float-left">
        <div class="float-left">
          <i class="ercp-icon-general-menu"></i>
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: item.path }" v-for="(item, index) in currentPath" :key="index">{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 系统操作按钮: 最大化/最小化/关闭 -->
      <div class="system-operate float-right" v-if="env === 'production'">
        <span class="ercp-icon-general-minimine" @click="windwowOperate('mini')"></span>
        <span class="ercp-icon-general-restore"  @click="windwowOperate('max')"></span>
        <span class="ercp-icon-general-close" @click="windwowOperate('close')"></span>
      </div>
      <!-- 系统标题 -->
      <div class="system-title float-right">
        <img src="../../assets/images/ercp标题.png" alt="">
        <span>信息录入管理系统</span>
      </div>
      <!-- 消息提醒 -->
      <div class="message float-right" @click="$router.push('/message/index')">
        <el-popover
          placement="bottom"
          width="500"
          trigger="hover">
          <div class="message-box">
            <div class="title">
              <span>未读消息</span>
              <span>全部标记为已读</span>
            </div>
            <div class="message">
              <div class="no-message" v-if="message.length === 0">
                <span>暂无未读消息</span>
              </div>
              <div class="message-case" v-for="(item, index) in message" :key="index" :class="{unread: item.status === 0}">
                <div class="from">
                  {{item.from}}
                </div>
                <div class="content">
                  {{item.content}}
                </div>
              </div>
            </div>
            <div class="bottom">
              <!-- <span @click="readAll">全部标记为已读</span> -->
              <span @click="toMessage">查看全部未读消息  <i class="el-icon-arrow-right"></i> </span>
            </div>
          </div>
          <div slot="reference" @click="toMessage">
            <i class="ercp-icon-module-message"></i>
            <span class="radial-text-primary">{{message.length}}</span>
          </div>
        </el-popover>
      </div>
      <!-- 用户操作用户信息 -->
      <div class="user-operate float-right">
        <el-dropdown
          placement="bottom"
          :show-timeout="10"
          :hide-timeout="10"
          @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="ercp-icon-module-user"></i>
            <span class="primary-text" v-if="user.name">{{user.name}}</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item style="cursor:default;">{{'账号：' + user.username}}</el-dropdown-item>
            <el-dropdown-item style="cursor:default;">{{user.insititution}}</el-dropdown-item>
            <el-dropdown-item style="cursor:default;">{{user.department}}</el-dropdown-item>
            <!-- <el-dropdown-item style="cursor:default;">{{'性别：' + user.gender}}</el-dropdown-item> -->
            <el-dropdown-item command="changePs" divided>修改密码</el-dropdown-item>
            <el-dropdown-item command="exit" divided>退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div id="content-wrapper">
      <router-view></router-view>
    </div>
    <!-- 修改密码 -->
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
</template>
<script>
// 设置导航菜单以及面包屑导航
import { setMenu, getCurrentPath } from '../../../src/assets/js/util'
import { changePassword, exit } from '../../api/user/user.js'
export default {
  name: 'layout',
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
      user: {},
      env: {},
      menuData: [],
      otherData: [],
      currentPath: '',
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
      message: [
        {
          from: '王小虎',
          content: '科室1需要两万盒阿莫西林',
          status: 0
        },
        {
          from: '王小虎',
          content: '科室1需要两万盒阿莫西林',
          status: 0
        },
        {
          from: '王小虎',
          content: '科室1需要两万盒阿莫西林',
          status: 1
        },
        {
          from: '王小虎',
          content: '科室1需要两万盒阿莫西林',
          status: 1
        },
        {
          from: '王小虎',
          content: '科室1需要两万盒阿莫西林',
          status: 1
        },
        {
          from: '王小虎',
          content: '科室1需要两万盒阿莫西林',
          status: 1
        }
      ]
    }
  },
  created () {
    this.checkAuth()
    this.env = process.env.NODE_ENV
  },
  mounted () {
    // fixed: 页面刷新清空缓存
    // fixed：刷新后面包屑重置
    this.user = this.$store.state.user
    this.initMenu(this.menu)
    this.currentPath = getCurrentPath(this, this.$route)
  },
  methods: {
    initMenu (menu) {
      if (menu) {
        menu.forEach((item) => {
          if (item.title === '帮助中心') {
            this.otherData.push(item)
          } else {
            this.menuData.push(item)
          }
        })
      }
    },
    checkAuth () {
      // 检查用户权限
      let token = this.$store.state.token
      if (!token || token === '') {
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
    cancelChange (formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
    },
    changePs () {
      this.dialogVisible = true
    },
    async changPassword (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let response = await changePassword(this.psw)
          if (response.data.mitiStatus === 'SUCCESS') {
            console.log(response.data)
            this.$store.commit('SET_TOKEN', '')
            this.$store.commit('SET_USER', null)
            this.$router.replace({ path: '/login' })
            this.$refs[formName].resetFields()
          } else {
            this.$message.error('ERROR: ' + response.data.message)
          }
        } else {
          return false
        }
      })
    },
    async exit () {
      this.$confirm('即将退出系统登陆，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let response = await exit()
        if (response.data.mitiStatus === 'SUCCESS') {
          console.log(this.$store.state)
        } else {
          console.log(response.data)
        }
        this.$store.commit('SET_TOKEN', '')
        this.$store.commit('SET_USER', null)
        this.$router.replace({ path: '/login' })
        console.log(exit)
      }).catch(() => {
        return false
      })
    },
    toMessage () {
      this.$router.push('/message/index')
    },
    readAll () {
      this.$message.success('全部标记为已读')
    },
    linkTo (menu) {
      this.$router.push(menu.path)
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
        return setMenu(this.$store.state.routers, this.user.codetype)
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

    // 左侧导航栏
    #sliderbar-wrapper{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: $siderbarWidth;
      background-color: $siderbarBgColor;
      cursor: pointer;
      overflow: hidden;
      display: flex;
      flex-direction: column;

      .slider-menu{
        flex:1;
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
          .menu-icon{
            height:40px;
            font-size:32px;
          }
          .menu-title{
            margin-top:5px;
            height:30px;
            font-size: 14px;
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
              height: 4px;
              border-radius: 50%;
              background-color: $minorTextColor;
            }
          }
        }

        .menu:hover{
          transition: all .5s linear;
          .menu-icon{
            color:$lightTextColor;
          }
          .menu-title{
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
          .menu-icon{
            color:$themeColor;
          }
          .menu-title{
            color:$lightTextColor;
          }
          .underline{
            .round{
              background-color: $lightTextColor;
            }
          }
        }

        .active::before,.menu::before{
          content: '';
          position: absolute;
          left: -4px;
          top:10px;
          bottom:10px;
          width:8px;
          border-radius: 8px;
          background-color:transparent;
          transition: all .35s ease-in-out;
        }

        .active::before{
          background-color:$themeColor;
        }
      }

      .other-menu{
        height:60px;
        padding:15px 0;
        .link-menu{
          position: relative;
          height: 80px;
          line-height: 80px;
          color: #878787;
          text-align: center;
          font-size: 13px;
        }
        .active, .link-menu:hover{
          color:$themeColor;
        }
        .active::before,.menu::before{
          content: '';
          position: absolute;
          left: -4px;
          top:30px;
          bottom:30px;
          width:8px;
          border-radius: 4px;
          background-color:transparent;
          transition: all .35s ease-in-out;
        }
        .active::before{
          background-color:$themeColor;
        }
      }
    }

    // 顶部导航栏
    #topbar-wrapper{
      // 顶部区域可拖拽
      -webkit-app-region: drag;
      position: fixed;
      left: $siderbarWidth;
      top: 0;
      right: 0;
      height:$topbarHeight;
      box-sizing: border-box;
      line-height:$topbarHeight;
      background-color: $topbarBgColor;
      border-bottom:1px solid $deepBorderColor;
      line-height: 48px;

      .bread-nav{
        -webkit-app-region: no-drag;
        padding:0 15px;

        .el-breadcrumb{
          float: left;
          margin-left: 10px;
          height:100%;
          line-height:48px;
          font-size:15px;

          .el-breadcrumb__inner{
            color: $mainTextColor;
            cursor: pointer;
          }
        }
      }

      .user-operate{
        -webkit-app-region: no-drag;
        padding:0 10px;

        .primary-text{
          margin-left: 5px;
        }

        .el-dropdown-link{
          cursor: pointer;
          display: block;
          height: 100%;
        }
      }

      .system-title{
        width:300px;
        text-align: center;
        font-size:19px;
        font-weight: 900;
        background-color: rgba($color: $themeColor, $alpha: 0.05);

        img{
          width: 80px;
          height: 18px;
          vertical-align: middle;
          margin-bottom: 4px;
        }
      }

      .message{
        cursor: pointer;
        position: relative;
        padding: 0 15px;
        -webkit-app-region: no-drag;

        .radial-text-primary{
          position: absolute;
          font-size: 6px;
          top: 10px;
          right: 0px;
        }
      }

      .system-operate{
        -webkit-app-region: no-drag;
        cursor: pointer;
        width: 100px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        span:hover{
          color: $themeColor;
        }
      }

    }

    // 内容区域
    #content-wrapper{
      position: fixed;
      left: $siderbarWidth;
      top: $topbarHeight;
      bottom: 0;
      right: 0;
      background-color: $mainBackgroundColor;
    }

    // 未读消息局部样式修改：
    .el-popover{
      padding: 0;
      margin: 0;
      border-radius: 0;
      .message-box{
        height:400px;
        width: 100%;
        box-sizing: border-box;
        line-height:20px;
        cursor:pointer;

        .no-message{
          height: 300px;
          line-height: 300px;
          text-align: center;
        }

        .message{
          box-sizing: border-box;
          height: 300px;
          padding-left: 20px;
          overflow: auto;

          .message-case{
            margin: 0;
            height: 80px;
            line-height: 40px;
            box-sizing: border-box;
            border-bottom: 1px solid $lightBorderColor;
            position: relative;
          }

          .unread{
            color: $minorTextColor;
          }

          .message-case:hover{
            color: $themeColor;
          }

          .message-case:nth-last-of-type(1){
            border-bottom: none;
          }
        }

        .title{
          height:50px;
          padding: 0 10px;
          line-height:50px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-bottom: 1px solid $deepBorderColor;

          span:nth-of-type(1){
            font-size: 18px;
          }
        }

        .bottom{
          height:50px;
          text-align: center;
          line-height:50px;
          border-top: 1px solid $deepBorderColor;
        }

        .bottom span:nth-last-of-type(1):hover, .title span:nth-last-of-type(1):hover{
          color: $themeColor;
        }
      }

    }
</style>
