<template>
  <div class="sykAll">
    <div class="sykContent">
      <div class="sykContentTop">
        <el-row type="flex" justify="space-between">
          <el-col :span="6">
            <el-input
              @keyup.enter.native="searchPattern"
              placeholder="术语名字"
              v-model="searchPatternData"
              clearable
              prefix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="addWhat" >新增术语</el-button>
          </el-col>
        </el-row>
        <br>
        <el-table
          :data="tableData"
          height="300"
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
            prop="type"
            :filters="[{ text: '外科', value: '外科' }, { text: '内科', value: '内科' }]"
            :filter-method="filterHandler"
            filter-placement="bottom-end"
            width="110"
            label="类别">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="reference"
            label="备注"
            ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="paraphrase"
            label="释义"
            ></el-table-column>
        </el-table>
        <div style="text-align: right;margin-top:15px;">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :page-sizes="[5, 10, 15]"
            :current-page="currentPage"
            :page-size="perPage"
            @size-change="pageSize"
            @current-change="changePage"></el-pagination>
        </div>
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
          <el-form-item label="术语名称" prop="id" >
            <el-select v-model="formModel.id" placeholder="请选择字段" clearable filterable @change="changeName">
              <el-option :label="item.label" :value="item.id" v-for="(item, index) in fieldsData" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="术语名称" prop="name" style="flex-grow: 1">
            <el-input v-model="formModel.name"></el-input>
          </el-form-item>
          <el-form-item label="术语类别" prop="type" >
            <el-select v-model="formModel.type" placeholder="请选择活动区域">
              <el-option label="内科" value="内科"></el-option>
              <el-option label="外科" value="外科"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="术语备注" prop="reference"  style="flex-grow: 1">
            <el-input v-model="formModel.reference"></el-input>
          </el-form-item>
          <el-form-item label="术语释义" prop="paraphrase" style="width: 100%">
            <el-input type="textarea" v-model="formModel.paraphrase" :rows="5"></el-input>
          </el-form-item>
          <el-form-item label="示例图像" style="width: 100%" prop="images" >
            <div class="exampleImg" v-loading="imgLoading">
              <div class="exampleImgBtn">
                <el-tooltip effect="dark" content="删除当前图片" placement="top">
                  <i class="el-icon-close"  @click="deleteImages"></i>
                </el-tooltip>
                <el-tooltip effect="dark" content="上传图片" placement="top">
                  <sx-file @onRead="onRead">
                    <i class="el-icon-upload"></i>
                  </sx-file>
                </el-tooltip>
              </div>
              <!-- <img :src="imgSrc" alt=""> -->
              <div class="exampleImages">
                <viewer
                  :images="formModel.images"
                  :options="options"
                  @inited="inited"
                  class="viewer" ref="viewer">
                  <template slot-scope="scope">
                    <figure class="images">
                      <div class="image-wrapper" v-for="(item, index) in scope.images" :key="index">
                        <img class="image" :src="item" :data-source="item" :alt="item.split('/').pop()">
                      </div>
                    </figure>
                  </template>
                </viewer>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <viewer
      :images="images"
      :options="options"
      @inited="inited"
      class="viewer" ref="viewer">
      <template slot-scope="scope">
        <figure class="images">
          <div class="image-wrapper" v-for="{source, thumbnail} in scope.images" :key="source">
            <img class="image" :src="thumbnail" :data-source="source" :alt="source.split('/').pop()">
          </div>
        </figure>
      </template>
    </viewer> -->
  </div>
</template>
<script>
import sxSegmentingLine from '@/components/segmentingLine'
import sxFile from '@/components/dynamicForm/file'
import { fieldAllFields } from '@/api/form/zdk.js'
import { termbaseGetPageTermbases, termbaseAddTermbase, termbaseRemoveTermbase, updateTermbase, termbaseSelectTermbase } from '../../api/form/syk.js'
export default {
  components: {
    sxFile,
    sxSegmentingLine
  },
  data () {
    return {
      imgLoading: false,
      tableData: [],
      formModel: {
        name: '',
        type: '',
        reference: '',
        paraphrase: 'I 型:左右肝管汇合部下方肝总管或胆管残端长度≥2cm\nII 型:左右肝管汇合部下方肝总管残端长度<2cm\nIII 型:左右肝管汇合部完整，左右肝管系统相通\nIV 型:左右肝管汇合部损伤，左右肝管系统狭窄不相通\nV 型:I 型、II 型或III 型+右侧副肝管或迷走胆管狭窄，左侧副肝管或迷走胆管狭窄',
        images: [
          // require('../../../src/assets/images/xbx.jpg'),
          // 'https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=116399c62434349b6b066885f9eb1521/91ef76c6a7efce1ba958b016a351f3deb58f65fe.jpg'
        ],
        inputImages: []
      },
      rules: {
        name: [
          { required: true, message: '请输入术语名称', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择术语类别', trigger: 'change' }
        ]
      },
      searchPatternData: '',
      currentPage: 1,
      perPage: 5,
      total: 0,
      // imgSrc: 'https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=116399c62434349b6b066885f9eb1521/91ef76c6a7efce1ba958b016a351f3deb58f65fe.jpg',
      images: [
        {
          source: require('../../../src/assets/images/xbx.jpg'),
          thumbnail: require('../../../src/assets/images/xbx.jpg')
        },
        {
          source: 'https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=116399c62434349b6b066885f9eb1521/91ef76c6a7efce1ba958b016a351f3deb58f65fe.jpg',
          thumbnail: require('../../../src/assets/images/xbx.jpg')
        }
      ],
      options: {
        inline: true,
        button: true,
        navbar: true,
        title: true,
        toolbar: true,
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: false,
        scalable: false,
        transition: true,
        fullscreen: true,
        keyboard: true,
        url: 'data-source'
      },
      addOrEdit: true,
      fieldsData: []
    }
  },
  created () {
    this.firstShow()
    this.show()
  },
  methods: {
    inited (viewer) {
      this.$viewer = viewer
    },
    async firstShow () {
      let faf = await fieldAllFields()
      if (faf) {
        this.fieldsData = faf.data.entity
      }
      console.log(this.fieldsData)
    },
    async show () {
      let tgp = await termbaseGetPageTermbases({currentPage: this.currentPage, perPage: this.perPage, searchPattern: this.searchPatternData})
      console.log(tgp)
      if (tgp) {
        this.total = tgp.data.entity.total
        this.tableData = tgp.data.entity.data
        return true
      }
      return false
    },
    changeName (val) {
      for (let i of this.fieldsData) {
        if (val === i.id) {
          this.formModel.name = i.label
        }
      }
    },
    async searchPattern () {
      if (await this.show()) {
        this.$message({
          type: 'success',
          showClose: true,
          message: '查询完毕'
        })
      } else {
        this.$message({
          showClose: true,
          message: '查询失败'
        })
      }
    },
    async deleteWhat () {
      console.log('111')
      if (!this.addOrEdit) {
        console.log(this.formModel)
        let tbrtb = await termbaseRemoveTermbase(this.formModel)
        console.log(tbrtb)
        this.show()
        this.$refs['formModel'].resetFields()
        this.addOrEdit = true
      } else {
        this.$message({
          showClose: true,
          message: '请点击要删除的表格行'
        })
      }
    },
    pageSize (val) {
      this.perPage = val
      this.show()
    },
    async changePage (val) {
      this.currentPage = val
      this.show()
    },
    addWhat () {
      this.addOrEdit = true
      this.imgLoading = false
      this.$refs['formModel'].resetFields()
    },
    saveWhat () {
      this.$refs['formModel'].validate(async valid => {
        if (valid) {
          if (this.addOrEdit) {
            // 新增
            console.log(this.formModel)
            let formModels = Object.assign(this.formModel, { images: [] })
            let newFormModels = new FormData()
            for (let i in formModels) {
              if (i === 'inputImages') {
                for (let i of formModels['inputImages']) {
                  newFormModels.append('inputImages', i)
                }
              } else newFormModels.append(i, formModels[i])
            }
            let tbati = await termbaseAddTermbase(newFormModels)
            console.log(tbati)
            if (tbati) {
              this.$refs['formModel'].resetFields()
              this.formModel.inputImages = []
              this.show()
            }
          } else {
            // 编辑
            let formModels = Object.assign(this.formModel, { images: [] })
            let udtb = await updateTermbase(formModels)
            if (udtb) {
              this.addOrEdit = true
              this.$refs['formModel'].resetFields()
              this.show()
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async handleCurrentChange (val) {
      console.log(val, 'valvalvalvalvalvla')
      if (val) {
        this.addOrEdit = false
        this.imgLoading = true
        this.formModel = Object.assign(this.formModel, val)
        let tbstb = await termbaseSelectTermbase(this.formModel)
        if (tbstb) this.formModel = Object.assign(this.formModel, tbstb.data.entity)
        this.imgLoading = false
      }
    },
    filterHandler (value, row, column) {
      console.log(value, row, column)
      const property = column['property']
      return row[property] === value
    },
    deleteImages () {
      this.formModel.inputImages.splice(this.$viewer.index, 1)
      this.formModel.images.splice(this.$viewer.index, 1)
    },
    onRead (data) {
      if (data) {
        console.log(this.formModel.images.length)
        if (parseInt(this.formModel.images.length) < 5) {
          this.formModel.inputImages.push(data.file)
          this.formModel.images.push(data.result)
        } else {
          this.$message({
            showClose: true,
            message: '最多上传5张'
          })
        }
        // this.imgSrc = data.result
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
  padding-bottom: 100px;
  overflow: auto;
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
          flex-direction: column;
          height: 260px;
          background: white;
          display: flex;
          padding: 18px;
          .exampleImgBtn {
            width: 80px;
            margin: 5px 0;
            display: flex;
            align-self: flex-end;
            // flex-direction: column;
            font-size: 26px;
            justify-content: space-between;
            i:hover {
              cursor: pointer;
            }
          }
          .exampleImages {
            flex: 1;
            .viewer {
              .images {
                display: none;
                justify-content: center;
                align-content: center;
                align-items: center;
                flex-wrap: wrap;
                padding: 5px;
                .image-wrapper {
                  display: inline-block;
                  width: calc(33% - 20px);
                  margin: 5px 5px 0 5px;
                  .image {
                    width: 100%;
                    cursor: pointer;
                    display: inline-block;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .el-table--group::after, .el-table--border::after, .el-table::before {
    z-index: 0
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
<style lang="scss">
  .el-tooltip__popper, .is-dark{
    max-width: 650px !important;
  }
</style>
