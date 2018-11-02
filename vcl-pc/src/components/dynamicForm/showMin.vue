<template>
  <div class="showMinAll">
    <div class="showMinContent">
      <div v-for="(v, k) in whatFileds" :key="k">
        <div v-if="Array.isArray(v)" style="display:flex;flex-wrap:wrap">
          <div v-for="(item, index) in v" :key="index" style="margin-right:13px">
            <div style="display:flex;">
              {{!index ? whatFiledsWhere[k].label + '：' : ''}}
              <sx-show-min :whatFileds="item" :whatFiledsWhere="whatFiledsWhere"></sx-show-min>
            </div>
            <br>
          </div>
        </div>
        <div v-else>
          {{whatFiledsWhere[k].label}}: {{v}}
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
  .showMinContent{
    .title {
      font-size: 18px;
      height: 36px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
