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
          <!-- <el-table-column
            type="index"
            width="50">
          </el-table-column> -->
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
          <el-button type="text" @click="deleteWhat" style="padding:0;margin:0;font-size: 17px; color: #FF455B;">删除</el-button>
          &nbsp;&nbsp;
          <el-button type="text" @click="saveWhat" style="padding:0;margin:0;font-size: 17px;">保存</el-button>
        </div>
      </sx-segmenting-line>
      <div class="sykContentBottom">
        <el-form
          class="formModelClass"
          :model="formModel" :rules="rules"
          ref="formModel" size="mini" label-width="100px">
          <el-form-item label="术语名称" prop="name" style="flex-grow: 1">
            <el-input v-model="formModel.name"></el-input>
          </el-form-item>
          <el-form-item label="术语类别" prop="region" >
            <el-select v-model="formModel.region" placeholder="请选择活动区域">
              <el-option label="内科" value="内科"></el-option>
              <el-option label="外科" value="外科"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="术语备注" prop="remarks"  style="flex-grow: 1">
            <el-input v-model="formModel.remarks"></el-input>
          </el-form-item>
          <el-form-item label="术语释义" prop="desc" style="width: 100%">
            <el-input type="textarea" v-model="formModel.desc" :rows="5"></el-input>
          </el-form-item>
          <el-form-item label="示例图像" style="width: 100%">
            <div class="exampleImg">
              <img src="https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=116399c62434349b6b066885f9eb1521/91ef76c6a7efce1ba958b016a351f3deb58f65fe.jpg" alt="">
              <div class="exampleImgBtn">
                <sx-file @onRead="onRead">
                  <i class="el-icon-edit"></i>
                </sx-file>
                <i class="el-icon-close"></i>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import sxSegmentingLine from '@/components/segmentingLine'
import sxFile from '@/components/dynamicForm/file'

export default {
  components: {
    sxFile,
    sxSegmentingLine
  },
  data () {
    return {
      tableData: [{name: 'cccc'}, {name: 'aaa'}, {name: 'ddd'}, {}],
      formModel: {
        name: '',
        region: '',
        remarks: '',
        desc: 'I 型:左右肝管汇合部下方肝总管或胆管残端长度≥2cm\nII 型:左右肝管汇合部下方肝总管残端长度<2cm\nIII 型:左右肝管汇合部完整，左右肝管系统相通\nIV 型:左右肝管汇合部损伤，左右肝管系统狭窄不相通\nV 型:I 型、II 型或III 型+右侧副肝管或迷走胆管狭窄，左侧副肝管或迷走胆管狭窄'
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
    deleteWhat () {
      console.log('111')
      this.$refs['formModel'].resetFields()
    },
    saveWhat () {
      this.$refs['formModel'].validate(valid => {
        if (valid) {
          console.log(1)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCurrentChange (val) {
      this.formModel = Object.assign({}, val)
      console.log(val)
    },
    filterHandler (value, row, column) {
      console.log(value, row, column)
      const property = column['property']
      return row[property] === value
    },
    onRead (data) {
      if (data) {
        console.log(data)
      } else {
        console.log(data)
      }
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
      .formModelClass {
        display: flex;
        flex-wrap: wrap;
        .exampleImg {
          flex-grow: 1;
          height: 260px;
          background: white;
          display: flex;
          padding: 18px;
          img {
            align-self: center;
            margin: auto;
            height: 80%;
            // width: 100%;
            padding: 20px;
          }
          .exampleImgBtn {
            align-self: flex-end;
            display: flex;
            flex-direction: column;
            font-size: 26px;
            text-align: center;
            height: 70px;
            justify-content: space-between;
            i:hover {
              cursor: pointer;
            }
          }
        }
      }
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
