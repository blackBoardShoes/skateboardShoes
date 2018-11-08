<template>
  <div class="showMinAll">
    <div v-for="(v, k, index) in whatFileds" :key="k"  style="display: flex;">
      <div v-if="Array.isArray(v)" >
        <div v-for="(item, index) in [...v[0]]" :key="index">
          <!-- <span style="font-weight:bold">{{!index ? whatFiledsWhere[k].label + '：' : ''}}</span> -->
          <sx-show-min :whatFileds="item" :whatFiledsWhere="whatFiledsWhere" :ohShit="false"></sx-show-min>
        </div>
      </div>
      <div v-else>
        <div v-if="v">
          <span v-if="v != '否'">{{whatFiledsWhere[k].label}} </span>{{(v === '是' | v === '否') ? '' : v}}{{whatFiledsWhere[k]['unit']}}
          <span v-if="ohShit && Object.values(whatFileds).length != index + 1">，</span>
          <span v-else>&nbsp;</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    whatFileds: {
      type: Object
    },
    whatFiledsWhere: {
      type: Object
    },
    ohShit: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {
      whatFormWhereObject: {}
    }
  },
  created () {
    // for (let i of this.whatFormWhere) {
    //   this.$set(this.whatFormWhereObject, i.id, i)
    // }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.showMinAll {
  * {
    font-family: "微软雅黑";
  }
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
}
</style>
