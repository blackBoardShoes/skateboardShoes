<template>
  <div class="sykAll">
    <div class="sykContent">
      <div class="sykContentTop">
        <el-table
          :data="tableData"
          height="252"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="name"
            align="center"
            label="名称"
            width="180">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="address"
            :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
            :filter-method="filterHandler"
            filter-placement="bottom-end"
            width="110"
            label="类别">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="tag"
            label="备注"
            ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="shiyi"
            label="释义"
            ></el-table-column>
        </el-table>
      </div>
      <sx-segmenting-line>
        <div slot="prepend" class="centerCenter">
          <!-- <i class="el-icon-setting centerCenterIcon"></i> -->
          &nbsp;术语详情-道损伤分型
        </div>
        <div slot="append" class="centerCenter">
          <el-button type="text" @click="saveWhat" style="padding:0;margin:0;font-size: 17px; color: #FF455B;">删除</el-button>
          &nbsp;&nbsp;
          <el-button type="text" @click="saveWhat" style="padding:0;margin:0;font-size: 17px;">保存</el-button>
        </div>
      </sx-segmenting-line>
      <div class="sykContentBottom">
        <el-form :model="formModel" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import sxSegmentingLine from '@/components/segmentingLine'

export default {
  components: {
    sxSegmentingLine
  },
  data () {
    return {
      tableData: [{}, {}, {}, {}],
      formModel: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    saveWhat () {},
    handleCurrentChange (val) {
      console.log(val)
    },
    filterHandler (value, row, column) {
      console.log(value, row, column)
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>
<style lang="scss" scoped>
$full: 100%;
$contentW: 95%;
$padding: 30px;
.sykAll {
  width: $full;
  .sykContent {
    width: $full;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .sykContentTop {
      width: $contentW;
      padding-top: $padding;
      padding-bottom: $padding;
    }
    .sykContentBottom {
      width: $contentW;
      padding-top: $padding;
      padding-bottom: $padding;
    }
  }
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
