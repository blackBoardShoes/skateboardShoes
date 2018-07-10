<template>
  <div class='all'>
    <el-form size="mini"
      :model="contentModel" ref="contentModel"
      label-width="0px" style="display: flex;">
      <div v-for="(item, index) in content" :key="index">
        <div v-if="item['type']">
          <!-- :label="item.label" -->
          <el-form-item
            :style="{width: 40 + contentModel[item.id].toString().length * 6 + 'px !important'}"
            :prop="item.id"
            :rules="item.validations">
            <el-input v-if="item['type'] === 'input'" v-model="contentModel[item.id]"></el-input>
          </el-form-item>
        </div>
        <span v-else>{{item}}</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: 'cao{{"id": "input", "type": "input", "validations": [{ "required": true, "message": "liveRADIO", "trigger": "change" }], "label": "label"}}asdassaassad,ca asdasdas1',
      content: [],
      contentModel: {
        input: 55
      }
    }
  },
  async created () {
    this.init()
  },
  mounted () {},
  methods: {
    init () {
      // let str = []
      // for (let i of this.text.match(/\{.*?\}/g) ? this.text.match(/\{.*?\}/g) : []) {
      //   str.push(i)
      //   // str.push(i.substring(1, i.length - 1))
      // }
      this.content = this.text.match(/\{\{.*?\}\}|[\w\s]+/g) ? this.text.match(/\{\{.*?\}\}|[\w\s]+/g) : []
      for (let z in this.content) {
        if (/\{\{.*?\}\}/g.test(this.content[z])) {
          this.content[z] = this.content[z].substring(1, this.content[z].length - 1)
          this.content[z] = JSON.parse(this.content[z])
        }
      }
      console.log(this.content)
    }
  }
}
</script>
<style lang='scss' scoped>
.all {
  height: 100%;
  display: flex;
  >>> .el-input, .el-input__inner {
    padding: 0;
    margin: 0;
  }
}
</style>
