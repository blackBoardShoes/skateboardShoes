<template>
  <div class="showMinAll">
    <div v-for="(v, k) in whatFileds" :key="k"  style="display: flex;">
      <div v-if="Array.isArray(v)" style="display: flex;">
        <div v-for="(item, index) in v" :key="index">
          <div>
            {{!index ? whatFiledsWhere[k].label + '：' : ''}}
            <sx-show-min :whatFileds="item" :whatFiledsWhere="whatFiledsWhere"></sx-show-min>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="v">
          {{whatFiledsWhere[k].label}}: {{v}} &nbsp;
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
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
}
</style>
