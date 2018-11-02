<template>
  <div class="operationAll">
    <el-form
      ref="contentModel" :model="contentModel" :disabled="disabled"
      class="operationContent" label-position="left" label-width="80px" size="small">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <div slot="title" class="titleClass">
            <div>术中采取方式 </div>
            <div>手术方式:ERCP+EST</div>
          </div>
          <el-form-item prop="operationCheckBox" label-width="0px">
            <el-checkbox-group v-model="contentModel['operationCheckBox']">
              <el-checkbox v-for="(it, ii) in formData['operationCheckBox']" :key="ii" :label="it.value" >{{it.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item name="2">
          <div slot="title" class="titleClass">
            <div>术中特殊治疗</div>
            <div>特殊治疗:活检+FNA</div>
          </div>
          <div class="twoContentTop">
            <div></div>
            <!-- <div style="display: flex;">
              <el-form-item label="报告医师 :" prop="operationSelect">
                <el-select clearable filterable v-model="contentModel.operationSelect">
                  <el-option v-for="(it, ii) in formData['operationSelect']" :key="ii" :label="it.label" :value="it.value" ></el-option>
                </el-select>
              </el-form-item>
              &nbsp;&nbsp;&nbsp;
              <el-form-item label="报告日期 :" prop="operationDateTime">
                <el-date-picker
                  v-model="contentModel.operationDateTime"
                  value-format="yyyy-MM-dd HH:hh:mm:ss"
                  type="datetime"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </div> -->
            <div>
              <el-button type="primary" size="small" @click="openDialogVisible" :loading="loadingImages">获取图像</el-button>
              <el-button type="primary" size="small" @click="printAndBrowse" :loading="loadingReport">报告预览</el-button>
            </div>
          </div>
          <br>
          <div class="twoContentContain">
            <div class="twoContentContainEdit">
              <!-- {{contentModel}} -->
              <div v-for="(row, i) in contentModel.operationCheckBox" :key="i" class="editContain">
                <div v-for="(item, index) in content[row]" :key="index">
                  <!--  && contentModel[item.id] -->
                  <div v-if="item['type']" style="height: 26px;margin-left: 1px">
                    <el-form-item
                      style="display:flex;height: 26px;width:100%"
                      v-if="item.vIf ? (Array.isArray(item.vIf.value) ? item.vIf.value.includes(contentModel[item.vIf.id]) : contentModel[item.vIf.id] === item.vIf.value) : true"
                      :label-width="item.labelWidth ? item.labelWidth : '0px'"
                      :label="item.label"
                      :prop="item.id"
                      :rules="item.validations">
                      <div style="display: flex">
                        <el-select
                          :style="{ width: 40 + contentModel[item.id].toString().length * 10 + 'px !important', height: '100%' }" v-if="item['type'] === 'SELECT'" v-model="contentModel[item.id]" placeholder="">
                          <el-option
                            v-for="option in item.values"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value">
                          </el-option>
                        </el-select>
                        <el-input :style="{ width: 40 + contentModel[item.id].toString().length * 6 + 'px !important', height: '100%' }"
                          v-if="item['type'] === 'INPUT'" v-model="contentModel[item.id]"></el-input>
                        <div style="max-width: 200px;text-align:center" v-if="item.unit">
                          {{item.unit}}
                        </div>
                      </div>
                      <el-date-picker
                        :style="{ width: 40 + contentModel[item.id].toString().length * 6 + 'px !important', height: '100%' }"
                        v-if="item['type'] === 'DATE'"
                        v-model="contentModel[item.id]"
                        type="date"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                        placeholder="">
                      </el-date-picker>
                      <el-radio-group
                        style="min-width: 100px"
                        v-if="item['type'] === 'RADIO'"
                        v-model="contentModel[item.id]">
                        <el-radio
                          v-for="option in item.values"
                          :key="option.value"
                          :label="option.label"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                  <span v-else>{{item}}</span>
                </div>
              </div>
              <br>
            </div>
            <div class="imgGroup">
              <img src="">
              <img src="">
              <img src="">
              <img src="">
              <img src="">
              <img src="">
            </div>
          </div>
          <!-- <div class="twoContentBottom">
            <el-form-item label="麻醉方式 :" prop="operationSelectMz" style="flex-grow:1;">
              <el-select clearable filterable v-model="contentModel.operationSelectMz" style="width:90%;">
                <el-option v-for="(it, ii) in formData['operationSelectMz']" :key="ii" :label="it.label" :value="it.value" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="检查诊断 :" prop="operationSelectJc" style="flex-grow:1;">
              <el-select clearable filterable v-model="contentModel.operationSelectJc" style="width:90%;">
                <el-option v-for="(it, ii) in formData['operationSelectJc']" :key="ii" :label="it.label" :value="it.value" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活检部位 :" prop="operationSelectHj" style="flex-grow:1;">
              <el-select clearable filterable v-model="contentModel.operationSelectHj" style="width:90%;">
                <el-option v-for="(it, ii) in formData['operationSelectHj']" :key="ii" :label="it.label" :value="it.value" ></el-option>
              </el-select>
            </el-form-item>
          </div> -->
        </el-collapse-item>
      </el-collapse>
      <div ref="printAndBrowse" v-show="true">
        <div v-for="(row, i) in contentModel.operationCheckBox" :key="i" class="showContain">
          <div v-for="(item, index) in content[row]" :key="index">
            <!--  && contentModel[item.id] -->
            <div v-if="item['type']" style="height: 26px;margin-left: 1px">
              <el-form-item
                style="display:flex;height: 26px;width:100%"
                v-if="item.vIf ? (Array.isArray(item.vIf.value) ? item.vIf.value.includes(contentModel[item.vIf.id]) : contentModel[item.vIf.id] === item.vIf.value) : true"
                :label-width="item.labelWidth ? item.labelWidth : '0px'"
                :label="item.label"
                :prop="item.id"
                :rules="item.validations">
                <div style="display: flex">
                  <el-select
                    :style="{ width: 40 + contentModel[item.id].toString().length * 10 + 'px !important', height: '100%' }" v-if="item['type'] === 'SELECT'" v-model="contentModel[item.id]" placeholder="">
                    <el-option
                      v-for="option in item.values"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value">
                    </el-option>
                  </el-select>
                  <el-input :style="{ width: 40 + contentModel[item.id].toString().length * 6 + 'px !important', height: '100%' }"
                    v-if="item['type'] === 'INPUT'" v-model="contentModel[item.id]"></el-input>
                  <div style="max-width: 200px;text-align:center" v-if="item.unit">
                    {{item.unit}}
                  </div>
                </div>
                <el-date-picker
                  :style="{ width: 40 + contentModel[item.id].toString().length * 6 + 'px !important', height: '100%' }"
                  v-if="item['type'] === 'DATE'"
                  v-model="contentModel[item.id]"
                  type="date"
                  format="yyyy/MM/dd"
                  value-format="yyyy/MM/dd"
                  placeholder="">
                </el-date-picker>
                <el-radio-group
                  style="min-width: 100px"
                  v-if="item['type'] === 'RADIO'"
                  v-model="contentModel[item.id]">
                  <el-radio
                    v-for="option in item.values"
                    :key="option.value"
                    :label="option.label"></el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <span v-else>{{item}}</span>
          </div>
        </div>
      </div>
    </el-form>
    <el-dialog
      title="请挑选镜检照片"
      append-to-body
      modal-append-to-body
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      width="80%">
      <imgView :imgArr="imgArr" @confirmData="confirmData"></imgView>
    </el-dialog>
  </div>
</template>

<script>
import imgView from '../../components/imgView/imgView.vue'
import { formdataGetPeroperative } from '../../api/rules/lr.js'
import { fieldAllFields } from '../../api/form/zdk.js'
export default {
  components: {
    imgView
  },
  props: {
    disabled: {
      type: Boolean
    },
    value: {
      type: Object,
      default () {
        return {}
      }
    },
    fishData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      activeNames: ['1', '2'],
      imgArr: [
        {
          source: require('../../../src/assets/images/xbx.jpg'),
          thumbnail: require('../../../src/assets/images/xbx.jpg'),
          checked: false,
          information: '镜检照片1镜检照片1镜检照片1镜检照片1镜检照片1'
        }
      ],
      contentModel: {},
      formData: {
        operationCheckBox: [
          { value: '进镜', label: '进镜' },
          { value: '观察乳头', label: '观察乳头' },
          { value: '支架', label: '支架' },
          { value: '蛔虫', label: '蛔虫' },
          { value: '插管', label: '插管' },
          { value: '造影', label: '造影' },
          { value: '滞网', label: '滞网' },
          { value: '再次观察有出血', label: '再次观察有出血' },
          { value: '预防胰腺炎方式', label: '预防胰腺炎方式' }
        ],
        operationSelect: [
          { value: 'ERCP1', label: 'ESR(网篮取石)' }
        ],
        operationSelectMz: [
          { value: 'ERCP1', label: 'ESR(网篮取石)' }
        ],
        operationSelectJc: [
          { value: 'ERCP1', label: 'ESR(网篮取石)' }
        ],
        operationSelectHj: [
          { value: 'ERCP1', label: 'ESR(网篮取石)' }
        ]
      },
      text: '',
      textObj: {
        进镜: `
          {{"id": "a1","unit": "进境，","type": "SELECT","values":[{"label": "十二指肠镜", "value": "十二指肠镜"},{"label": "胃镜", "value": "胃镜"},{"label": "单气囊小肠镜", "value": "单气囊小肠镜"},{"label": "双气囊小肠镜", "value": "双气囊小肠镜"},{"label": "结肠镜", "value": "结肠镜"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a2","labelWidth": "55px","label": "见食管","type": "SELECT","values":[{"label": "全段", "value": "全段"},{"label": "上段", "value": "上段"},{"label": "中段", "value": "中段"},{"label": "下段", "value": "下段"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a3","vIf": {"id":"a7", "value": ["息肉","隆起性肿物","溃疡","糜烂"]},"unit": "mm ×","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "a4","vIf": {"id":"a7", "value": ["息肉","隆起性肿物","溃疡","糜烂"]},"unit": "mm","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "a5","vIf": {"id":"a7", "value": ["凝血块","鲜血"]},"type": "SELECT","values":[{"label": "少量", "value": "少量"},{"label": "大量", "value": "大量"}],"validations": [{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a6","vIf": {"id":"a7", "value": ["曲张静脉"]},"unit": "条","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "a7","type": "SELECT","values":[{"label": "无异常", "value": "无异常"},{"label": "狭窄", "value": "狭窄"},{"label": "宿食", "value": "宿食"},{"label": "息肉", "value": "息肉"},{"label": "隆起性肿物", "value": "隆起性肿物"},{"label": "溃疡", "value": "溃疡"},{"label": "糜烂", "value": "糜烂"},{"label": "凝血块", "value": "凝血块"},{"label": "鲜血", "value": "鲜血"},{"label": "曲张静脉", "value": "曲张静脉"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a8","vIf": {"id":"a7", "value": ["凝血块","鲜血"]},"label": "，量约","labelWidth": "54px","unit": "ml","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "a9","vIf": {"id":"a7", "value": ["曲张静脉"]},"type": "SELECT","values":[{"label": "轻度", "value": "轻度"},{"label": "中度", "value": "中度"},{"label": "重度", "value": "重度"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a10","vIf": {"id":"a7", "value": ["狭窄","息肉","隆起性肿物","溃疡","糜烂","凝血块","鲜血","曲张静脉"]},"labelWidth": "20px","label": "，","type": "SELECT","values":[{"label": "有活动性出血", "value": "有活动性出血"},{"label": "无活动性出血", "value": "无活动性出血"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          
          {{"id": "a11","labelWidth": "68px","label": "，贲门口","type": "SELECT","values":[{"label": "未见明显异常", "value": "未见明显异常"},{"label": "松弛", "value": "松弛"},{"label": "轻度狭窄", "value": "轻度狭窄"},{"label": "中度狭窄", "value": "中度狭窄"},{"label": "重度狭窄", "value": "重度狭窄"},{"label": "息肉", "value": "息肉"},{"label": "隆起性肿物", "value": "隆起性肿物"},{"label": "溃疡", "value": "溃疡"},{"label": "糜烂", "value": "糜烂"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a12","vIf": {"id":"a11", "value": ["息肉","隆起性肿物","溃疡","糜烂"]},"unit": "mm ×","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "a13","vIf": {"id":"a11", "value": ["息肉","隆起性肿物","溃疡","糜烂"]},"unit": "mm","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "a14","vIf": {"id":"a11", "value": ["息肉","隆起性肿物","溃疡","糜烂","凝血块","鲜血"]},"labelWidth": "20px","label": "，","unit": "，","type": "SELECT","values":[{"label": "有活动性出血", "value": "有活动性出血"},{"label": "无活动性出血", "value": "无活动性出血"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}

          {{"id": "a15","label": "镜身","labelWidth": "40px","unit": "通过，","type": "SELECT","values":[{"label": "顺利", "value": "顺利"},{"label": "勉强", "value": "勉强"},{"label": "不能", "value": "不能"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a16","label": "胃底胃粘液湖颜色","labelWidth": "124px","type": "SELECT","values":[{"label": "清亮", "value": "清亮"},{"label": "浑浊", "value": "浑浊"},{"label": "咖啡色", "value": "咖啡色"},{"label": "鲜红", "value": "鲜红"},{"label": "暗红色", "value": "暗红色"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a17","label": "，质地","labelWidth": "54px","unit": "，","type": "SELECT","values":[{"label": "稀薄", "value": "稀薄"},{"label": "粘稠", "value": "粘稠"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          
          {{"id": "a18","type": "SELECT","values":[{"label": "胃底", "value": "胃底"},{"label": "胃前壁", "value": "胃前壁"},{"label": "胃后壁", "value": "胃后壁"},{"label": "胃大弯", "value": "胃大弯"},{"label": "胃小弯", "value": "胃小弯"},{"label": "胃窦", "value": "胃窦"},{"label": "胃角", "value": "胃角"},{"label": "幽门", "value": "幽门"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a19","vIf": {"id":"a22", "value": ["息肉","隆起性肿物","溃疡","糜烂"]},"unit": "mm ×","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "a20","vIf": {"id":"a22", "value": ["息肉","隆起性肿物","溃疡","糜烂"]},"unit": "mm","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "a21","vIf": {"id":"a22", "value": ["凝血块","鲜血"]},"type": "SELECT","values":[{"label": "少量", "value": "少量"},{"label": "大量", "value": "大量"}],"validations": [{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a22","type": "SELECT","values":[{"label": "未见明显异常", "value": "未见明显异常"},{"label": "宿食", "value": "宿食"},{"label": "息肉", "value": "息肉"},{"label": "隆起性肿物", "value": "隆起性肿物"},{"label": "溃疡", "value": "溃疡"},{"label": "糜烂", "value": "糜烂"},{"label": "凝血块", "value": "凝血块"},{"label": "鲜血", "value": "鲜血"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a23","vIf": {"id":"a22", "value": ["凝血块","鲜血"]},"label": "，量约","labelWidth": "54px","unit": "ml，","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "a24","vIf": {"id":"a22", "value": ["息肉","隆起性肿物","溃疡","糜烂","凝血块","鲜血"]},"labelWidth": "20px","label": "，","type": "SELECT","values":[{"label": "有活动性出血", "value": "有活动性出血"},{"label": "无活动性出血", "value": "无活动性出血"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          
          {{"id": "a25","labelWidth": "54px","label": "，幽门","type": "SELECT","values":[{"label": "未见明显异常", "value": "未见明显异常"},{"label": "松弛", "value": "松弛"},{"label": "轻度狭窄", "value": "轻度狭窄"},{"label": "中度狭窄", "value": "中度狭窄"},{"label": "重度狭窄", "value": "重度狭窄"},{"label": "息肉", "value": "息肉"},{"label": "隆起性肿物", "value": "隆起性肿物"},{"label": "溃疡", "value": "溃疡"},{"label": "糜烂", "value": "糜烂"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a26","vIf": {"id":"a25", "value": ["息肉","隆起性肿物","溃疡","糜烂"]},"unit": "mm ×","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "a27","vIf": {"id":"a25", "value": ["息肉","隆起性肿物","溃疡","糜烂"]},"unit": "mm","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "a28","vIf": {"id":"a25", "value": ["松弛","轻度狭窄","中度狭窄","重度狭窄","息肉","隆起性肿物","溃疡","糜烂"]},"label": "，","labelWidth": "20px","unit": "，","type": "SELECT","values":[{"label": "有活动性出血", "value": "有活动性出血"},{"label": "无活动性出血", "value": "无活动性出血"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a29","label": "镜身","labelWidth": "40px","unit": "通过，","type": "SELECT","values":[{"label": "顺利", "value": "顺利"},{"label": "勉强", "value": "勉强"},{"label": "不能", "value": "不能"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a30","label": "十二指肠","labelWidth": "68px","type": "SELECT","values":[{"label": "未见明显异常", "value": "未见明显异常"},{"label": "球部", "value": "球部"},{"label": "降部", "value": "降部"},{"label": "水平部", "value": "水平部"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a31","vIf": {"id":"a30", "value": ["球部","降部","水平部"]},"label": "可见：","labelWidth": "54px","type": "SELECT","values":[{"label": "明显水肿", "value": "明显水肿"},{"label": "外压型狭窄", "value": "外压型狭窄"},{"label": "息肉", "value": "息肉"},{"label": "隆起性肿物", "value": "隆起性肿物"},{"label": "溃疡", "value": "溃疡"},{"label": "糜烂", "value": "糜烂"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a32","vIf": {"id":"a31", "value": ["息肉","隆起性肿物","溃疡","糜烂"]},"unit": "mm ×","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "a33","vIf": {"id":"a31", "value": ["息肉","隆起性肿物","溃疡","糜烂"]},"unit": "mm","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "a34","vIf": {"id":"a31", "value": ["松弛","轻度狭窄","中度狭窄","重度狭窄","息肉","隆起性肿物","溃疡","糜烂"]},"label": "，","labelWidth": "20px","type": "SELECT","values":[{"label": "有活动性出血", "value": "有活动性出血"},{"label": "无活动性出血", "value": "无活动性出血"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "a35","label": "，镜身","labelWidth": "54px","unit": "通过。","type": "SELECT","values":[{"label": "顺利", "value": "顺利"},{"label": "勉强", "value": "勉强"},{"label": "不能", "value": "不能"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        `,
        观察乳头: `
          {{"id": "b1","label": "十二指肠","labelWidth": "68px","type": "SELECT","values":[{"label": "球部", "value": "球部"},{"label": "降部", "value": "降部"},{"label": "水平部", "value": "水平部"},{"label": "幽门管", "value": "幽门管"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "b2","type": "SELECT","values":[{"label": "可见", "value": "可见"},{"label": "未见", "value": "未见"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "b3","vIf": {"id":"b2", "value": ["可见"]},"unit": "乳头，","type": "SELECT","values":[{"label": "主", "value": "主"},{"label": "副", "value": "副"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "b4","label": "乳头","labelWidth": "40px","type": "SELECT","values":[{"label": "大小正常", "value": "大小正常"},{"label": "增大", "value": "增大"},{"label": "结石嵌顿", "value": "结石嵌顿"},{"label": "菜花样", "value": "菜花样"},{"label": "隆起性肿物", "value": "隆起性肿物"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "b5","vIf": {"id":"b4", "value": ["菜花样","隆起性肿物"]},"unit": "mm ×","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "b6","vIf": {"id":"b4", "value": ["菜花样","隆起性肿物"]},"unit": "mm","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "b7","vIf": {"id":"b4", "value": ["菜花样","隆起性肿物"]},"labelWidth": "20px","label": "，","type": "SELECT","values":[{"label": "有活动性出血", "value": "有活动性出血"},{"label": "无活动性出血", "value": "无活动性出血"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "b8","labelWidth": "40px","label": "，呈","unit": "，","type": "SELECT","values":[{"label": "乳头型", "value": "乳头型"},{"label": "半球型", "value": "半球型"},{"label": "扁平型", "value": "扁平型"},{"label": "裂隙型", "value": "裂隙型"},{"label": "缩孔型", "value": "缩孔型"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "b9","labelWidth": "40px","label": "开口","unit": "。","type": "SELECT","values":[{"label": "切开状", "value": "切开状"},{"label": "多点颗粒型", "value": "多点颗粒型"},{"label": "颗粒型", "value": "颗粒型"},{"label": "裂口型", "value": "裂口型"},{"label": "纵口型", "value": "纵口型"},{"label": "硬化单孔型", "value": "硬化单孔型"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "b10","label": "十二指肠乳头","labelWidth": "100px","unit": "内瘘。","type": "SELECT","values":[{"label": "有", "value": "有"},{"label": "无", "value": "无"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        `,
        支架: `
          {{"id": "c1","label": "可见乳头口","labelWidth": "84px","type": "SELECT","values":[{"label": "金属", "value": "金属"},{"label": "塑料", "value": "塑料"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "c2","type": "SELECT","values":[{"label": "胆管", "value": "胆管"},{"label": "胰管", "value": "胰管"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "c3","label": "支架","labelWidth": "40px","unit": "枚，","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "c4","label": "支架","labelWidth": "40px","unit": "胆泥附着，","type": "SELECT","values":[{"label": "可见", "value": "可见"},{"label": "未见", "value": "未见"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "c5","label": "置入","labelWidth": "40px","unit": "拔除支架，","type": "SELECT","values":[{"label": "圈套器", "value": "圈套器"},{"label": "异物钳", "value": "异物钳"},{"label": "网篮", "value": "网篮"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "c6","type": "SELECT","values":[{"label": "可见", "value": "可见"},{"label": "未见", "value": "未见"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "c7","type": "SELECT","unit": "随支架拖出。","values":[{"label": "结石", "value": "结石"},{"label": "胆泥", "value": "胆泥"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        `,
        蛔虫: `
          {{"id": "d1","label": "可见乳头口蛔虫","unit": "支，","labelWidth": "110px","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "d2","label": "置入","labelWidth": "40px","unit": "取出。","type": "SELECT","values":[{"label": "网篮", "value": "网篮"},{"label": "异物钳", "value": "异物钳"},{"label": "圈套器", "value": "圈套器"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        `,
        插管: `
          {{"id": "e1","unit": "选择性","type": "SELECT","values":[{"label": "弓状切开刀", "value": "弓状切开刀"},{"label": "造影导管", "value": "造影导管"},{"label": "球囊", "value": "球囊"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "e2","unit": "插管","type": "SELECT","values":[{"label": "胆管", "value": "胆管"},{"label": "胰管", "value": "胰管"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "e3","unit": "，","type": "SELECT","values":[{"label": "成功", "value": "成功"},{"label": "困难", "value": "困难"},{"label": "不成功", "value": "不成功"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "e4","label": "导丝","labelWidth": "40px","unit": "进入","type": "SELECT","values":[{"label": "顺利", "value": "顺利"},{"label": "不能", "value": "不能"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "e5","vIf": {"id":"e4", "value": ["顺利"]},"type": "SELECT","unit": "，","values":[{"label": "胆管", "value": "胆管"},{"label": "胰管", "value": "胰管"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "e6","label": "双导丝法插管","labelWidth": "100px","type": "SELECT","unit": "，","values":[{"label": "成功", "value": "成功"},{"label": "不成功", "value": "不成功"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "e7","type": "SELECT","unit": "沿","values":[{"label": "弓状刀", "value": "弓状刀"},{"label": "针刀", "value": "针刀"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "e8","unit": "点方向行预切开后插管","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "e9","unit": "。","type": "SELECT","values":[{"label": "成功", "value": "成功"},{"label": "不成功", "value": "不成功"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        `,
        造影: `
          {{"id": "f1","type": "SELECT","label": "于","labelWidth": "20px","values":[{"label": "胆总管上段", "value": "胆总管上段"},{"label": "胆总管中段", "value": "胆总管中段"},{"label": "胆总管下段", "value": "胆总管下段"},{"label": "左侧肝内胆管", "value": "左侧肝内胆管"},{"label": "右侧肝内胆管）", "value": "右侧肝内胆管"},{"label": "胰头部胰管", "value": "胰头部胰管"},{"label": "颈部胰管", "value": "颈部胰管"},{"label": "体部胰管", "value": "体部胰管"},{"label": "尾部胰管", "value": "尾部胰管"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "f2","label": "注入","labelWidth": "40px","type": "SELECT","values":[{"label": "泛影葡胺", "value": "泛影葡胺"},{"label": "非离子型造影剂", "value": "非离子型造影剂"},{"label": "空气", "value": "空气"},{"label": "CO2", "value": "CO2"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "f3","unit": "ml。","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
          
          {{"id": "f4","unit": "，","label": "可见：胆总管","labelWidth": "100px","type": "SELECT","values":[{"label": "扩张", "value": "扩张"},{"label": "不扩张", "value": "不扩张"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "f5","unit": "mm，","label": "直径","labelWidth": "40px","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "f6","unit": "狭窄，","label": "伴","labelWidth": "20px","type": "SELECT","values":[{"label": "肝门部胆管", "value": "肝门部胆管"},{"label": "胆管中段", "value": "胆管中段"},{"label": "胆管下端", "value": "胆管下端"},{"label": "胆管下段", "value": "胆管下段"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "f7","unit": "mm，","label": "狭窄长度","labelWidth": "68px","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "f8","unit": "肝内胆管","type": "SELECT","values":[{"label": "左侧", "value": "左侧"},{"label": "右侧", "value": "右侧"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "f9","unit": "，","type": "SELECT","values":[{"label": "狭窄", "value": "狭窄"},{"label": "扩张", "value": "扩张"},{"label": "不扩张", "value": "不扩张"},{"label": "未显影", "value": "未显影"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "f10","unit": "mm。","label": "直径","labelWidth": "40px","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
          
          {{"id": "f11","unit": "见结石负影，","label": "胆总管内","labelWidth": "68px","type": "SELECT","values":[{"label": "可", "value": "可"},{"label": "未", "value": "未"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "f12","vIf": {"id":"f11", "value": ["可"]},"unit": "枚，","label": "结石数目","labelWidth": "68px","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "f13","vIf": {"id":"f11", "value": ["可"]},"unit": "mm，","label": "最大结石直径","labelWidth": "100px","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
          
          {{"id": "f14","unit": "见结石负影，","label": "肝内胆管","labelWidth": "68px","type": "SELECT","values":[{"label": "可", "value": "可"},{"label": "未", "value": "未"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "f15","vIf": {"id":"f14", "value": ["可"]},"unit": "，","label": "结石位于","labelWidth": "68px","type": "SELECT","values":[{"label": "左肝内", "value": "左肝内"},{"label": "右肝内", "value": "右肝内"},{"label": "全肝内", "value": "全肝内"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "f16","vIf": {"id":"f14", "value": ["可"]},"unit": "枚，","label": "结石数目","labelWidth": "68px","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "f17","vIf": {"id":"f14", "value": ["可"]},"unit": "mm，","label": "最大结石直径","labelWidth": "100px","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "f18","vIf": {"id":"f19", "value": ["有"]},"type": "SELECT","values":[{"label": "肝内胆管", "value": "肝内胆管"},{"label": "上段胆管", "value": "上段胆管"},{"label": "中段胆管", "value": "中段胆管"},{"label": "下段胆管", "value": "下段胆管"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "f19","unit": "造影剂外漏。","type": "SELECT","values":[{"label": "有", "value": "有"},{"label": "无", "value": "无"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          

          {{"id": "f20","unit": "，","label": "可见：主胰管","labelWidth": "100px","type": "SELECT","values":[{"label": "扩张", "value": "扩张"},{"label": "不扩张", "value": "不扩张"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "f21","unit": "mm，","label": "直径","labelWidth": "40px","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "f22","unit": "串珠样改变，","type": "SELECT","values":[{"label": "有", "value": "有"},{"label": "无", "value": "无"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "f23","unit": "狭窄，","label": "伴","labelWidth": "20px","type": "SELECT","values":[{"label": "胰头部", "value": "胰头部"},{"label": "胰颈部", "value": "胰颈部"},{"label": "胰体部", "value": "胰体部"},{"label": "胰尾部", "value": "胰尾部"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "f24","unit": "mm，","label": "狭窄长度","labelWidth": "68px","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
          
          {{"id": "f25","unit": "见结石负影，","label": "胰管内","labelWidth": "68px","type": "SELECT","values":[{"label": "可", "value": "可"},{"label": "未", "value": "未"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "f26","vIf": {"id":"f25", "value": ["可"]},"unit": "枚，","label": "结石数目","labelWidth": "68px","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "f27","vIf": {"id":"f25", "value": ["可"]},"unit": "mm，","label": "最大结石直径","labelWidth": "100px","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "f28","vIf": {"id":"f29", "value": ["有"]},"type": "SELECT","values":[{"label": "胰头管", "value": "胰头管"},{"label": "胰颈管", "value": "胰颈管"},{"label": "胰体管", "value": "胰体管"},{"label": "胰尾管", "value": "胰尾管"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "f29","unit": "造影剂外漏。","type": "SELECT","values":[{"label": "有", "value": "有"},{"label": "无", "value": "无"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        `,
        滞网: `
          {{"id": "g1","unit": "，","label": "再次置入网篮碎石","labelWidth": "124px","type": "SELECT","values":[{"label": "成功", "value": "成功"},{"label": "失败", "value": "失败"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "g2","unit": "，","label": "采用激光碎石","labelWidth": "100px","type": "SELECT","values":[{"label": "成功", "value": "成功"},{"label": "失败", "value": "失败"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "g3","label": "置入spyglass观察可见","labelWidth": "155px","type": "SELECT","values":[{"label": "胆总管上段", "value": "胆总管上段"},{"label": "胆总管中段", "value": "胆总管中段"},{"label": "胆总管下段", "value": "胆总管下段"},{"label": "左侧肝内胆管", "value": "左侧肝内胆管"},{"label": "右侧肝内胆管", "value": "右侧肝内胆管"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "g4","unit": "，","type": "SELECT","values":[{"label": "结石", "value": "结石"},{"label": "肿物", "value": "肿物"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "g5","vIf": {"id":"g4", "value": ["结石"]},"unit": "mm，","label": "结石大小","labelWidth": "68px","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "g6","vIf": {"id":"g4", "value": ["结石"]},"unit": "枚","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
          {{"id": "g7","vIf": {"id":"g4", "value": ["结石"]},"unit": "。","label": "采用激光碎石","labelWidth": "100px","type": "SELECT","values":[{"label": "成功", "value": "成功"},{"label": "失败", "value": "失败"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"id": "g8","vIf": {"id":"g4", "value": ["肿物"]},"unit": "枚","label": "取活检","labelWidth": "55px","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
        `,
        再次观察有出血: `
          {{"id": "h1","unit": "，","label": "出血后的处理方式：","labelWidth": "138px","type": "SELECT","values":[{"label": "喷洒去甲肾上腺素盐水", "value": "喷洒去甲肾上腺素盐水"},{"label": "喷洒肾上腺素盐水", "value": "喷洒肾上腺素盐水"},{"label": "球囊压迫", "value": "球囊压迫"},{"label": "电凝", "value": "电凝"},{"label": "止血夹", "value": "止血夹"},{"label": "粘膜下注射", "value": "粘膜下注射"},{"label": "金属覆膜支架植入", "value": "金属覆膜支架植入"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        `,
        预防胰腺炎方式: `
          {{"id": "h1","unit": "ml","label": "喷洒肾上腺素盐水","labelWidth": "124px","type": "INPUT","validations":[{ "required": true, "message": "请输入", "trigger": "change" }]}}
        `
      },
      content: {},
      dialogVisible: false,
      loadingImages: false,
      loadingReport: false,
      reportData: {},
      filedsObject: {}
    }
  },
  watch: {
    contentModel: {
      handler (val, oldVal) {
        this.$emit('input', this.contentModel)
      },
      deep: true
    }
  },
  async created () {
    if (this.$route.params.data) {
      this.patientInfo = JSON.parse(this.$route.params.data)
    }
    this.$set(this.contentModel, 'operationCheckBox', [])
    await this.init()
    this.contentModel = Object.assign(this.contentModel, this.value)
    let faf = await fieldAllFields()
    if (faf) {
      for (let i of faf.data.entity) {
        this.$set(this.filedsObject, i.id, i)
      }
    }
  },
  methods: {
    async init () {
      for (let i in this.textObj) {
        this.$set(this.content, i, await this.returnTextarea(this.textObj[i]).content)
        let contentModel = this.returnTextarea(this.textObj[i]).contentModel
        for (let z in contentModel) {
          this.$set(this.contentModel, z, contentModel[z])
        }
      }
      console.log(this.contentModel, 'this.contentModel')
    },
    returnTextarea (string) {
      let content = string ? string.match(/\{\{.*?\}\}|[^{}]{0,6}/g) : []
      let contentModel = {}
      for (let z in content) {
        if (/\{\{.*?\}\}/g.test(content[z])) {
          content[z] = content[z].substring(1, content[z].length - 1)
          content[z] = JSON.parse(content[z])
          switch (content[z].type) {
            case 'INPUT':
            case 'SELECT':
            case 'RADIO':
              if (!(content[z].id in contentModel)) {
                this.$set(contentModel, content[z].id, '')
              }
              break
            case 'DATE':
              if (!(content[z].id in contentModel)) {
                this.$set(contentModel, content[z].id, null)
              }
              break
          }
        }
      }
      return { content: content, contentModel: contentModel }
    },
    async openDialogVisible () {
      this.dialogVisible = true
    },
    confirmData (confirmData) {
      console.log(confirmData, 'confirmData')
      this.dialogVisible = false
    },
    clearData () {
      this.$refs['contentModel'].resetFields()
    },
    async printAndBrowse () {
      // console.log(this.fullScream)
      // this.$nextTick(_ => {
      //   let newContent = this.$refs.printAndBrowse.innerHTML
      //   let oldContent = document.body.innerHTML
      //   document.body.innerHTML = newContent
      //   window.print()
      //   window.location.reload()
      //   document.body.innerHTML = oldContent
      // })
      if (!Object.values(this.filedsObject).length) {
        let faf = await fieldAllFields()
        if (faf) {
          for (let i of faf.data.entity) {
            this.$set(this.filedsObject, i.id, i)
          }
        }
      }
      this.loadingReport = true
      await Promise.all([formdataGetPeroperative(this.patientInfo.recordId)])
      // let anaType = 'anaType' in a[0].data.entity.data.preoperativeRecord ? a[0].data.entity.data.preoperativeRecord['anaType'] : ''
      // 麻醉方式=术前-麻醉方式（ANAtype）（radio）；
      // 检查诊断=术中诊断
      console.log(this.fishData['intraoperativeDiagnosisAndEvaluation'].intraoperativeDiagnosis, this.fishData['intraoperativeDiagnosisAndEvaluation'].operationOperator, 'this.fishDatathis.fishData')
      let intraoperativeDiagnosis = this.fishData['intraoperativeDiagnosisAndEvaluation'].intraoperativeDiagnosis
      // console.log(intraoperativeDiagnosis)
      // // 报告医师=术中-手术操作者（operationOperator
      let operationOperator = this.fishData['intraoperativeDiagnosisAndEvaluation'].operationOperator
      // console.log(intraoperativeDiagnosis)
      // // 活检器官及部位=术中-术中手术方式-活检-器官及部位 organAndPosition
      // let operationOperator = this.fishData['intraoperativeProcedure'].biopsyTable
      // console.log(intraoperativeDiagnosis)
      // // 切开  incisionExpansionAndDrainage
      // let est = this.fishData['intraoperativeProcedure'].est
      // console.log(est)
      // // 切开长度 incisionLength
      // let incisionLength = this.fishData['intraoperativeProcedure'].incisionLength
      // console.log(incisionLength)
      // let filedsObject = {}
      // for (let i of a[1].data.entity) {
      //   filedsObject[i.id] = i
      // }
      let dc = this.filedsDataConversion(this.filedsObject, {
        'intraoperativeDiagnosis': intraoperativeDiagnosis,
        'operationOperator': operationOperator
      })
      console.log(dc, 'dcdcdcdcdcdc')
      // console.log(this.reportData)
      this.loadingReport = false
    },
    filedsDataConversion (filedsObject, filedsData) {
      let dc = {}
      for (let i in filedsData) {
        switch (filedsObject[i].type) {
          case 'TABLE':
            this.$set(dc, i, this.tableDataConversion(filedsObject, filedsData[i]))
            break
          case 'CHECKBOX':
          case 'SELECTMUTIPLE':
            let arr = ''
            for (let o in filedsObject[i].values) {
              if (filedsData[i].includes(filedsObject[i].values[o].value)) {
                arr = arr + o + '、' + filedsObject[i].values[o].label
              }
            }
            this.$set(dc, i, arr)
            break
          case 'CASCADER':
            let z = ''
            var forFn = arr => {
              for (let w of filedsData[i]) {
                for (let j in arr) {
                  if (arr[j].value === w) {
                    if ('children' in arr[j]) {
                      z = z + arr[j].label + '/'
                      forFn(arr[j].children)
                    } else {
                      z = z + arr[j].label
                    }
                  }
                }
              }
            }
            forFn(filedsObject[i].children)
            this.$set(dc, i, z)
            break
          case 'SELECT':
          case 'RADIO':
            for (let o of filedsObject[i].values) {
              if (o.value === filedsData[i]) {
                this.$set(dc, i, o.label)
              }
            }
            break
          case 'CHECKBOXTEXT':
            let text = ''
            for (let o in filedsObject[i].values) {
              if (filedsData[i].includes(filedsObject[i].values[o].label)) {
                text = text + o + '、' + filedsObject[i].values[o].label
              }
            }
            this.$set(dc, i, text)
            break
          default:
            this.$set(dc, i, filedsData[i])
            break
        }
      }
      return dc
    },
    tableDataConversion (filedsObject, tableData) {
      let arr = []
      for (let i of tableData) {
        arr.push(this.filedsDataConversion(filedsObject, i))
      }
      return arr
    },
    handleChange (val) {
      // console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';

$full: 100%;
$marginW: 15px;
$marginContentW: 25px;
.operationAll {
  width: $full;
  height: $full;
  // overflow: hidden;
  .operationContent {
    width: $full;
    /deep/ .el-collapse-item__header{
      padding-left: $marginW;
      background: $groupColor;
      font-weight: bold;
      font-size: 15px;
    }
    /deep/ .el-collapse-item__content {
      padding: $marginContentW;
    }
    .titleClass {
      width:95%;
      display:flex;
      justify-content: space-between;
    }
    .twoContentTop {
      width: $full;
      display: flex;
      justify-content: space-between;
    }
    .twoContentContain {
      width: $full;
      min-height: 300px;
      .twoContentContainEdit {
        // border: 1px solid $lightBorderColor;
      }
      .imgGroup {
        width: $full;
        display: flex;
        height: 140px;
        justify-content: space-between;
        margin-top: $marginW;
        margin-bottom: $marginW;
        img {
          width: 140px;
          height: 140px;
        }
      }
    }
    .twoContentBottom {
      width: $full;
      display: flex;
      justify-content: space-between;
    }
  }
  // .el-checkbox {
  //   min-width: 170px;
  //   margin: 5px;
  //   // margin-left: 15px;
  //   margin-right: 25px;
  // }
  .editContain {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    line-height: 40px;
    /deep/ .el-form-item__label {
      color: black;
      margin-right: 0px !important;
    }
    /deep/ .el-form-item__label:before{
      content: '';
      margin-right: 0px;
    }
    /deep/ .el-form-item__content {
      margin:0px !important;
    }
    /deep/ .el-input__inner {
      background-color: transparent;
      border-radius: 0;
      font-size: 14px;
      padding: 0px !important;
      margin:0px !important;
      border-top: none;
      border-left: none;
      border-right: none;
      width:100%;
      height:100% !important;
      // color: #117FD1;
      // border-bottom:1px solid #117FD1;
      text-align: center;
      // &:hover{
      //   border-color: #b4bccc;
      // }
      // &:focus{
      //   border-color: #409EFF;
      //   outline: 0;
      // }
    }
    /deep/ .el-select__caret{
      display:none;
    }
  }
}
.showContain {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    line-height: 40px;
    /deep/ .el-form-item__label {
      color: black;
      margin-right: 0px !important;
    }
    /deep/ .el-form-item__label:before{
      content: '';
      margin-right: 0px;
    }
    /deep/ .el-form-item__content {
      margin:0px !important;
    }
    /deep/ .el-input__inner {
      background-color: transparent;
      border-radius: 0;
      font-size: 14px;
      padding: 0px !important;
      margin:0px !important;
      border: none;
      width:100%;
      height:100% !important;
      // color: #117FD1;
      // border-bottom:1px solid #117FD1;
      text-align: center;
      // &:hover{
      //   border-color: #b4bccc;
      // }
      // &:focus{
      //   border-color: #409EFF;
      //   outline: 0;
      // }
    }
    /deep/ .el-select__caret{
      display:none;
    }
  }
</style>
