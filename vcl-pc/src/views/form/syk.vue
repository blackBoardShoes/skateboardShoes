<template>
  <div class="sykAll">
    <sx-table
      ref="sxtable" :tableData="tableData"
      :showOperation="false" :showBtn="false"></sx-table>
      <sx-segmenting-line>
        <div slot="prepend" class="centerCenter">
          <i class="el-icon-setting centerCenterIcon"></i>&nbsp;术语详情-道损伤分型
        </div>
        <div slot="append" class="centerCenter">
          <el-button type="text" @click="saveWhat" icon="el-icon-edit" style="padding:0;margin:0;font-size: 16px;">保存</el-button>
        </div>
      </sx-segmenting-line>
  </div>
</template>
<script>
import sxSegmentingLine from '@/components/segmentingLine'
import sxTable from '../../components/dynamicForm/table'

export default {
  components: {
    sxSegmentingLine,
    sxTable
  },
  data () {
    return {
      tableData: {
        values: [{
          TEXTAREA: '111',
          INPUT: '222',
          SELECT: '0',
          CASCADER: ['0', '1']
        }, {
          TEXTAREA: '222',
          INPUT: '王小虎',
          CHECKBOX: ['0', '2', '3']
        }],
        subFields: [
          {
            id: 'TEXTAREA',
            label: 'TEXTAREA',
            type: 'TEXTAREA'
          }
        ]
      }
    }
  },
  methods: {
    saveWhat () {}
  }
}
</script>
<style lang="scss" scoped>
$full: 100%;
.sykAll {
  width: $full;
  border:1px solid red;
  .centerCenter {
    display: flex;
    align-items: center;
    padding-top:10px;
    padding-bottom:10px;
    .centerCenterIcon {
      font-size: 26px;
    }
  }
}

</style>
