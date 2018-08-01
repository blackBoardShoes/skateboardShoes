
<template>
  <div class="formControlAll">
    <!-- <div class="titleContent">
      <div class="title">
      </div>
    </div> -->
    <slot name="title"></slot>
    <div class="menuClass">
      <div
        :class="{menuClassItem: true, isActive: isActive === index}"
        v-for="(item, index) in navArr"
        :index="item.path ? item.path : item.index"
        @click="emitClick(item, index)"
        :key="index">
        <i :class="item.icon"></i>
        <span class="menuName">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navArr: {
      type: Array,
      default () {
        return []
      }
    },
    activeIndex: {
      type: Number,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      isActive: this.activeIndex
    }
  },
  methods: {
    emitClick (item, index) {
      console.log(item, index)
      this.isActive = index
      this.$emit('emitClick', {item: item, index: index})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';
$full: 100%;
$minW: 180px;
$W: 16%;
.formControlAll {
  height: $full;
  width: $W;
  min-width: $minW;
  background-color: white;
  .menuClass {
    background-color: white;
    color: $mainTextColor;
    .menuClassItem {
      height: 56px;
      display: flex;
      align-items: center;
      padding: 0 30px;
      border-bottom:0.5px dashed $lightBorderColor;
      i {
        width: 24px;
      }
      font-size: 14px;
    }
    .isActive {
      background: $linearGradient;
      color: $themeColor;
    }
  }
  .menuName {
    font-weight: bold;
  }
}
</style>
