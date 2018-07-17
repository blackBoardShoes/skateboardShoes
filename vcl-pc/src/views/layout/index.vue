<template>
  <div id="layout">
    <div id="left-wrapper">
      <div class="slider-menu">
        <el-tooltip
          placement="right"
          v-for="(menu,index) in menuData"
          :key="index" @click="skip(index,menu)"
          :disabled="!menu.children">
          <div
            :class="{menu: true, active: menu.path === ($route.path.split('/')[1] === 'home' ? '/home' : '/' + $route.path.split('/')[1])}"
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
          <div class="sub-menu" v-if="menu.children"  slot="content">
            <div class="child-menu" v-for="(child, index2) in menu.children" :key="index2" @click="skip(index2,child)">
              <span style="display:block;height:30px;line-height:30px;font-size:12px;padding:0 10px;text-align: left;cursor:pointer;">{{child.title}}</span>
            </div>
          </div>
           <div class="sub-menu" v-else  slot="content" style="display:none;">
           </div>
        </el-tooltip>
      </div>
      <div class="other-menu">
        <div
          v-for="(item, index) in otherData"
          :key="index"
          @click="skip(index,item)"
          :class="{'link-menu': true, active: item.path === ($route.path.split('/')[1] === 'home' ? '/home' : '/' + $route.path.split('/')[1])}">
          <span class="menu-title">{{item.title}}</span>
        </div>
      </div>
    </div>
    <div id="right-content">
      <div id="topbar-wrapper">
        <!-- 顶部导航 -->
        <div class="float-left full-height">
          <div class="float-left"><i class="el-icon-dogma-menu"></i></div>
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: item.path }" v-for="(item, index) in currentPath" :key="index">{{item.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="sign-out float-right" @click="exit">退出系统</div>
        <div class="system-title float-right">ERCP信息录入管理系统</div>
        <div class="quick-search">
          <el-input v-model="searchText" @keyup.enter.native="search" size="small" placeholder="快速查找">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="search" style="cursor:pointer;"></i>
          </el-input>
        </div>
      </div>
      <div id="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import layout from '../../data/layout.json'
import sessionStorage from '../../assets/js/storage/sessionStorage'
export default {
  name: 'layout',
  data () {
    return {
      menuData: [],
      otherData: [],
      currentPath: '',
      searchText: ''
    }
  },
  created () {
    this.menuData = layout.data
    this.otherData = layout.otherData
  },
  mounted () {
    // fixed: 页面刷新清空缓存
    this.checkAuth()
    this.currentPath = this.getCurrentPath(this.$route)
  },
  methods: {
    checkAuth () {
      let token = this.$store.state.token || sessionStorage.getItem('token')
      if (!token || sessionStorage.getItem('token') === '') {
        // this.$message.success('请登录')
        this.$router.replace('/login')
      } else {
        console.log(token)
      }
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
    skip (index, menu) {
      this.$router.push(menu.path)
      window.document.title = menu.title
    },
    search () {
      console.log(this.searchText)
    },
    getCurrentPath (router) {
      let currentPathArr = []
      if (router.name !== 'home') {
        if (router.name.indexOf('_index') > -1) {
          currentPathArr.push({
            title: router.meta.title,
            path: router.path,
            name: router.name
          })
        } else {
          router.matched.forEach(item => {
            let obj = {
              title: item.meta.title,
              path: item.path,
              name: item.name
            }
            if (item.path.indexOf('/:id') > -1) {
              obj.path = router.path
            }
            currentPathArr.push(obj)
          })
        }
      } else {
        let obj = {
          name: 'home',
          path: '/home',
          title: '系统首页'
        }
        currentPathArr.push(obj)
      }
      return currentPathArr
    }
  },
  watch: {
    '$route' (to) {
      this.currentPath = this.getCurrentPath(to)
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
      height:100%;
      box-sizing: border-box;
      background-color: $siderbarBgColor;
      overflow-y: auto;
      overflow-x: hidden;
      .slider-menu{
        width:100%;
        height:80%;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: auto;
        .menu{
          flex:1;
          width: 100%;
          box-sizing: border-box;
          position: relative;
          color:$siderbarTextColor;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: all 1.5s linear;
          .icon{
            margin-top:10px;
            width:100%;
            height:40px;
            font-size:32px;
            text-align: center;
            color:#878787;
            border-radius: 50%;
          }
          .text{
            margin-top:5px;
            font-size: 14px;
            height:30px;
            line-height:30px;
            color:#878787;
          }
          .underline{
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%);
            display: flex;
            justify-content: center;
            height:4px;
            .round{
              float: left;
              margin:0 2px;
              width: 4px;
              height:4px;
              border-radius: 50%;
              background-color: #878787;
            }
          }
          .sub-menu{
            background-color: $siderbarBgColor;
            .child-menu{
              height:30px;
              line-height:30px;
              font-size:12px;
              text-indent: 2em;
              text-align: left;
            }
          }
        }
        .active{
          transition: all 1.5s linear;
          .icon{
            color:$themeColor;
          }
          .text{
            color:#fff;
          }
          .underline{
            .round{
              background-color: #fff;
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
        height:20%;
        padding-bottom:30px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        .link-menu{
          height: 26px;
          line-height: 26px;
          color: #878787;
          text-align: center;
          font-size: 13px;
        }
        .active{
          color:#fff;
        }
      }
    }
    #right-content{
      flex:1;
      display: flex;
      flex-direction: column;
      #topbar-wrapper{
        box-sizing: border-box;
        overflow: hidden;
        height:48px;
        line-height:48px;
        width:100%;
        padding:0 0 0 20px;
        background-color: #fff;
        border-bottom:1px solid #B4B4B4;
        .sign-out{
          color:teal;
          padding:0 10px;
          cursor: pointer;
        }
        .system-title{
          width:300px;
          text-align: center;
          font-size:16px;
          font-weight: 900;
          background-color:#f9f9f9;
        }
        .el-breadcrumb{
          float: left;
          margin-left:14px;
          height:100%;
          line-height:48px;
          font-size:15px;
          .el-breadcrumb__inner{
            color: #000;
            cursor: pointer;
          }
        }
        .quick-search{
          padding:0 10px;
          width:200px;
          float:right;
          .el-input{
            input{
              border-radius:15px;
            }
          }
        }
      }
      #main-content{
        flex:1;
        background-color: #E6E6E6;
        overflow:auto;
      }
    }
  }
</style>
