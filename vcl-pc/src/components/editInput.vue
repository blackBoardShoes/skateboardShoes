<template>
  <div id="edit-input">
    <div class="text-area">
      <el-form size="mini"
      :model="contentModel"
      ref="contentModel"
      label-width="0px">
      <span class="text-content" v-for="(item, index) in content" :key="index">
        <!-- 可选内容 -->
        <span v-if="item['type']" class="optional-content">
          <span class="text-len">{{item['type'] === 'select' ? (item.values.find((n) => n.value === contentModel[item.id])).label : contentModel[item.id]}}</span>
          <el-form-item
            :prop="item.id"
            :rules="item.validations">
            <!-- 输入框 -->
            <el-input v-if="item['type'] === 'input'" v-model="contentModel[item.id]"></el-input>
            <!-- select选择器 -->
            <el-select v-if="item['type'] === 'select'" v-model="contentModel[item.id]" placeholder="">
              <el-option
                v-for="option in item.values"
                :key="option.value"
                :label="option.label"
                :value="option.value">
              </el-option>
            </el-select>
            <!-- 日期选择器 -->
            <el-date-picker
              v-if="item['type'] === 'DATA'"
              v-model="contentModel[item.id]"
              type="date"
              format="yyyy/MM/dd"
              value-format="yyyy/MM/dd"
              placeholder="">
            </el-date-picker>
          </el-form-item>
        </span>
        <!-- 其他文本内容 -->
        <span v-else>{{item}}</span>
      </span>
    </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'editInput',
  data () {
    return {
      text: '患者姓名：{{"id": "name", "type": "input", "validations": [{ "required": true, "message": "请填入患者姓名", "trigger": "change" }], "label": "label", "value":""}}，患者性别{{"id": "gender", "type": "select", "validations": [{ "required": true, "message": "请选择患者性别", "trigger": "blur" }], "values": [{"label": "男", "value": "0"},{"label": "女", "value": "1"}], "value":""}}，诊断日期{{"id": "diagTime", "type": "DATA", "validations": [{ "required": true, "message": "请选择诊断日期", "trigger": "blur" }], "values": ""}}，其他建议：北京时间7月9日，夏季联赛赛场出现中国德比，周琦所在的火箭以87-81逆转勇士。周琦发挥出色，他首发出场，在19分钟里得了9分6个篮板，此外还有全场最高的4个盖帽。火箭在最后一节以35-14胜出，一举翻盘。RJ-享特是火箭逆转功臣，得了24分，梅尔顿17尔腾施泰因12分7个篮板另一中国球员阿不都沙拉木代表勇士出场，他以替补身份出战4分钟，未能得分，抢了1个篮板送出1个封盖。马库斯-德里克森23分7个篮板，乔丹-贝尔只得5分2次助攻，替补出场的奥马里-约翰逊10分。两名中国球员的德比令人关注，但两人角色不同，在场上没有面对面的机会。周琦在常规赛中难得有出场机会，但到了夏季联赛却是首发，是火箭重点考察的对象。阿布都沙拉木刚到勇士，出场时间很少。',
      content: [],
      contentModel: {
        name: '李富贵',
        gender: '1',
        diagTime: '2017/10/10'
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.content = this.text ? this.text.match(/\{\{.*?\}\}|[^{}]+/g) : []
      for (let z in this.content) {
        if (/\{\{.*?\}\}/g.test(this.content[z])) {
          this.content[z] = this.content[z].substring(1, this.content[z].length - 1)
          this.content[z] = JSON.parse(this.content[z])
        }
      }
      console.log(this.content)
    }
  },
  watch: {
    'contentModel': {
      handler: function (newVal) {
        console.log(newVal)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
// 本页样式
  #edit-input{
    width:100%;
    height:100%;
    padding:40px;
    box-sizing: border-box;
    background-color:darkcyan;
    .text-area{
      // text-indent: 2em;
      height: 100%;
      width:100%;
      background-color: #fff;
      font-size: 16px;
      line-height: 1.5;
      .el-form{
        height:100%;
        .text-content{
          line-height: 3;
          .optional-content{
            position: relative;
            .text-len{
              padding:0px 4px;
              z-index: -999;
              opacity: 0;
            }
            .el-form-item{
              position: absolute;
              left: 0;
              top: 0;
              right:0;
              bottom: 0;
              text-align: center;
              z-index: 999;
            }
          }
        }
        .text-content:nth-of-type(1){
          text-indent:2em;
          padding-left: 2em;
        }
      }
    }
  }
</style>
<style lang="scss">
// 本页局部样式修改
  .el-input--suffix{
    width:100%;
    height:100%;
  }
  .el-input__inner{
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 0;
    box-sizing: border-box;
    color: teal;
    display: block;
    font-size: 16px;
    line-height: 1.5;
    padding: 0px !important;
    margin:0px !important;
    border:none;
    width:100%;
    height:100% !important;
    // border-bottom:1px solid teal;
    outline:none;
    text-align: center;
    &:hover{
      border-color: #b4bccc;
    }
    &:focus{
      border-color: #409EFF;
      outline: 0;
    }
  }
  .el-select__caret{
    display:none;
  }
  .el-input__suffix{
    display:none;
  }
  .el-input__prefix{
    display: none;
  }
  .el-form-item__error{
    position: absolute;
    width:300%;
    left:-150%;
    margin-left:50%;
  }
  .el-date-editor{
    width:100% !important;
  }
  .el-form-item__content{
    line-height:1 !important;
  }
</style>
