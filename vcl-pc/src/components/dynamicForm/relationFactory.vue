<template>
  <div class="all">
    <div class="content">
      <!-- <el-form :model="relaForm" label-width="0px" size="mini" style="width:100%">
        <el-form-item style="width:100%" prop="treeName"
          :rules="[{ required: true, message: '请输入要创建的名字', trigger: 'change' }]">
          <el-input style="width:100%" clearable v-model='sizeForm.treeName' placeholder="请输入要创建的名字"></el-input>
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions2"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-form> -->
      <div style="text-align:right;width:100%">
        <el-button
          type="text"
          @click="appendRow">新建</el-button>
      </div>
      <div class="contentCascader"
        v-for="(items, index) in formatBefore" :key="index">
        <el-cascader
          style="width:100%"
          size="mini"
          expand-trigger="hover"
          v-model="formatBefore[index]"
          :options="options">
        </el-cascader>
        <el-button
          @click="deleteRow(items, index)"
          type="danger"
          plain size="mini">
          删除
        </el-button>
      </div>
      <br>
      <div style="text-align:center;width:100%">
        <el-button
        @click="sendData">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    needCreatedRelation: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      subFields: 'subFields' in this.needCreatedRelation ? this.needCreatedRelation['subFields'] : [],
      relation: 'relation' in this.needCreatedRelation ? this.needCreatedRelation['relation'] : {},
      id: 'id' in this.needCreatedRelation ? this.needCreatedRelation['id'] : '',
      options: [],
      relationGroup: {},
      formatBefore: [],
      formatAfter: {},
      a: []
    }
  },
  created () {
    console.log(this.needCreatedRelation, '拿到的数据')
    this.init()
  },
  methods: {
    init () {
      // options init
      let ruleType = ['EQUAL', 'NOTEQUAL']
      for (let i of this.subFields) {
        // if (i.type !== 'RADIO') {
        //   this.options.push(
        //     {value: i.id, label: i.label, children: []}
        //   )
        // }
        this.options.push(
          {value: i.id, label: i.label, children: []}
        )
      }
      for (let j of this.options) {
        if (j.children) {
          for (let z of ruleType) {
            j.children.push(
              {value: z, label: z, children: []}
            )
          }
        }
      }
      console.log(this.options, 'this.optionsthis.optionsthis.optionsthis.optionsthis.options')
      for (let w of this.subFields) {
        if (w.type === 'RADIO' | w.type === 'SELECT') {
          if (w['values']) {
            for (let r of this.options) {
              for (let u of r.children) {
                u.children.push({value: w.id, label: w.label, children: [...w.values]})
              }
            }
          }
        }
      }
      // relationGroup init
      for (let e in this.relation) {
        this.formatBefore.push(
          [e, this.relation[e]['ruleType'], this.relation[e]['target'], this.relation[e]['value']]
        )
      }
    },
    appendRow () {
      this.formatBefore.push([])
      console.log('what')
    },
    deleteRow (items, index) {
      this.formatBefore.splice(index, 1)
    },
    sendData () {
      this.formatAfter = {}
      for (let i of this.formatBefore) {
        this.formatAfter[i[0]] = {
          ruleType: i[1],
          target: i[2],
          value: i[3]
        }
      }
      console.log(this.formatAfter)
      this.$emit('getRealationData', this.formatAfter, this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.all {
  .content {
    width: 100%;
    .contentCascader {
      display: flex;
      align-items: flex-start;
      width: 100%;
      margin-top:5px;
      margin-bottom:3px；
    }
  }
}
</style>
