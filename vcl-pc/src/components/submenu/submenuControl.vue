
<template>
  <div class="formControlAll">
    <!-- <div class="titleContent">
      <div class="title">
      </div>
    </div> -->
    <slot name="title"></slot>
    <el-menu
      class="menuClass"
      router :default-active="$route.name">
      <el-menu-item
        v-for="(item, index) in navArr"
        :index="item.index"
        :key="index">
        <i :class="item.icon"></i>
        <span class="menuName">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  watch: {
    $route (val, oldVal) {
      console.log(val)
    }
  },
  props: {
    navArr: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';
$full: 100%;
$minW: 160px;
$W: 16%;
.formControlAll {
  height: $full;
  width: $W;
  min-width: $minW;
  background-color: $groupColor;
  .menuClass {
    background-color: $groupColor;
    color: $mainTextColor;
    border: none;
    .is-active {
      background: $mainBackgroundColor
    }
  }
  .menuName {
    font-weight: bold;
  }
}
</style>
