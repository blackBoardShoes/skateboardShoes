
<template>
  <div class="formControlAll">
    <!-- <div class="titleContent">
      <div class="title">
      </div>
    </div> -->
    <slot name="title"></slot>
    <div class="menuClass">
      <div
        :class="{menuClassItem: true, isActive: isActive === index, isDisabled: item.disabled}"
        v-for="(item, index) in newNavArr"
        :index="item.path ? item.path : item.index"
        @click="emitClick(item, index)"
        :key="index">
        <i :class="item.icon"></i>
        <span class="menuName" v-if="item.name.length < 9">{{item.name}}</span>
        <span class="menuName" v-else>
          <el-tooltip class="item" effect="dark" :content="item.name" placement="right">
            <div style="
              width: 110px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;">
              {{item.name}}
            </div>
          </el-tooltip>
        </span>
        &nbsp;
        <span class="comments" v-if="comments[item.id] ? Object.keys(comments[item.id]).length ? Object.keys(comments[item.id]).length : '' : ''">
          {{comments[item.id] ? Object.keys(comments[item.id]).length ? Object.keys(comments[item.id]).length : '' : ''}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Object,
      default () {
        return {}
      }
    },
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
  watch: {
    navArr () {
      this.newNavArr = [...this.navArr]
    },
    activeIndex () {
      this.isActive = this.activeIndex * 1
    }
  },
  data () {
    return {
      isActive: this.activeIndex,
      newNavArr: this.navArr
    }
  },
  methods: {
    emitClick (item, index) {
      console.log(item, index)
      if (!item['disabled']) {
        this.isActive = index
        this.$emit('emitClick', {item: item, index: index})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';
$full: 100%;
$minW: 200px;
// $W: 16%;
.formControlAll {
  height: $full;
  // width: $W;
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
    .isDisabled {
      opacity: .25;
      cursor: not-allowed;
      background: none !important;
    }
  }
  .menuName {
    font-weight: bold;
  }
  .comments {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #117FD1;
    font-size: 10px;
    color: white;
  }
}
</style>
