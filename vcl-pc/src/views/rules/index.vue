<template>
  <div class="rulesAll">
    <div class="rulesContent">
      <div class="rulesTop">
        tubiao
      </div>
      <div class="rulesContain">
        <div class="rulesContainTop">
          <div
            :class="{rulesContainTopItem: true, activeIndex: activeIndex === index}"
            @click="rulesContainTopControl(item, index)"
            v-for="(item, index) in rulesContainTop"
            :key="index">
            <div style="font-weight: bold;">
              <i :class="item.icon"></i>
              {{item.title}}
            </div>
            <div>
              <font style="font-weight: bold">{{item.num}}</font> 人次
            </div>
          </div>
        </div>
        <div class="rulesContainContent">
          aaaaaaaaaaaaa
        </div>
      </div>
      <!-- <router-link :to="{ name: 'sh', params: { data: JSON.stringify({a: 1}) }}">sh</router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rulesContainTop: [
        { title: '全部', icon: 'el-icon-delete', num: 55 },
        { title: '待录入', icon: 'el-icon-delete', num: 55 },
        { title: '带修正', icon: 'el-icon-delete', num: 55 },
        { title: '带随访', icon: 'el-icon-delete', num: 55 }
      ],
      activeIndex: null
    }
  },
  methods: {
    rulesContainTopControl (item, index) {
      this.activeIndex = index
      // this.$router.push({name: 'sh', params: { data: JSON.stringify({a: 1}) }})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';

$full: 100%;
$contentW: 95%;
.rulesAll {
  width: $full;
  height: $full;
  display: flex;
  justify-content: center;
  align-items: center;
  .rulesContent {
    width: $contentW;
    height: $contentW;
    .rulesTop {
      background: white;
      border: $lightBorderColor 1px solid;
      margin-bottom: 10px;
    }
    .rulesContain {
      background: white;
      color: $commonTetxColor;
      width: $full;
      border: $lightBorderColor 1px solid;
      .rulesContainTop {
        height: 60px;
        display: flex;
        width: $full;
        .rulesContainTopItem {
          border-right: 1px solid $lightBorderColor;
          border-bottom: 1px solid $lightBorderColor;
          flex-grow: 1;
          display: flex;
          justify-content: space-around;
          align-items: center;
          transition: all .5s;
        }
        .rulesContainTopItem:last-child {
          border-right: none;
        }
        .rulesContainTopItem:hover {
          color: black;
        }
        .activeIndex {
          background: $linearGradient
        }
      }
      .rulesContainContent {
        padding: 15px;
      }
    }
  }
}
</style>
