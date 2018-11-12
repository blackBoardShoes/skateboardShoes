
<template>
  <div class="formControlAll">
    <!-- <div class="titleContent">
      <div class="title">
      </div>
    </div> -->
    <slot name="title"></slot>
    <el-menu
      class="menuClass"
      router :default-active="'path' in navArr[0] ? $route.path : $route.name">
      <el-menu-item
        v-for="(item, index) in navArr"
        :index="item.path ? item.path : item.index"
        @click="emitClick(item, index)"
        :key="index">
        <i :class="item.icon"></i>&nbsp;&nbsp;
        <span class="menuName">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  // watch: {
  //   $route (val, oldVal) {
  //     console.log(val)
  //   }
  // },
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
  },
  methods: {
    emitClick (item, index) {
      this.$emit('emitClick', {path: this.$route.path, name: this.$route.name, item: item, index: index})
    }
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
