<template>
  <div id="edit">
    <h2>编辑文本：</h2>
    <span class="text-area">
      <!-- {{report[0].content}} -->
      <span class="inside" v-for="cases in report" :key="cases.name">
        <span v-for="(content, index2) in cases.content" :key="index2">
        <span>{{content.before}}</span>
        <!-- <span style="color:teal;font-weight:900;" @click="handleSelect">{{content.detail.value}}</span> -->
        <!-- <el-autocomplete
          popper-class="my-autocomplete"
          v-model="content.detail.value"
          :fetch-suggestions="querySearch"
          @select="handleSelect">
          <i
            class="el-icon-edit el-input__icon"
            slot="suffix"
            @click="handleIconClick">
          </i>
          <template slot-scope="{ item }" :v-for="(item3, index3) in content.detail.options">
            <div class="name">{{ item.label }}</div>
          </template>
        </el-autocomplete> -->
        <span>{{content.after}}</span>
        </span>
      </span>
      <br>
      <br>
      <el-select v-model="value" placeholder="" :style="fontWidth(value)">
      <!-- <el-select v-model="value" placeholder="" > -->
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.label">
          <span></span>
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
      <el-select v-model="value2" placeholder="" :style="fontWidth(value2)">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
      我去二无群二无群二群翁无群二翁无群二群翁无群二翁无群二无群二无群二无群二翁无群二群翁无群二群翁无群二翁无群二无群
    </span>
  </div>
</template>
<script>
export default {
  name: 'editInput',
  data () {
    return {
      report: [
        {
          name: 'case1',
          // content: '鼻胆管造影结果：胆总管(扩张/不扩张)，直径（）mm，伴有（肝胆部胆管、肝胆中段、胆管下端）'
          content: [
            {
              before: '鼻胆管造影结果：胆总管我删掉撒欢地阿',
              detail: {
                id: 'phase1',
                type: 'select',
                options: [
                  {label: '扩张', value: '扩张'},
                  {label: '不扩张', value: '不扩张'}
                ],
                value: '扩张'
              },
              after: '，'
            }
          ]
        },
        {
          name: 'case2',
          // content: '鼻胆管造影结果：胆总管(扩张/不扩张)，直径（）mm，伴有（肝胆部胆管、肝胆中段、胆管下端）'
          content: [
            {
              before: '鼻胆管造影结果：胆总管',
              detail: {
                id: 'phase1',
                type: 'select',
                options: [
                  {label: '扩张', value: '扩张'},
                  {label: '不扩张', value: '不扩张'}
                ],
                value: ''
              },
              after: '，'
            }
          ]
        }
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '19:00'
        }, {
          value: '选项5',
          label: 'life is always a struggle'
        }
      ],
      value: '泡面',
      value2: '泡面'
    }
  },
  methods: {
    fontWidth (value) {
      console.log(value)
      // let fontLength = value.length
      // let cnChar = value.match(/[^\x00-\x80]/g)
      // let cnCharLen = cnChar.length
      // let enCharLen = fontLength - cnChar
      let fontLen = this.strlen(value)
      console.log(fontLen)
      console.log('width:' + fontLen * 8 + 'px')
      return 'width:' + fontLen * 8 + 'px;'
    },
    strlen (str) {
      var len = 0
      for (var i = 0; i < str.length; i++) {
        if (this.charCodeAt(i) > 127 || this.charCodeAt(i) === 94) {    
          len += 2
        } else {
          len ++ 
        }
      }
      return len
    },
    handleSelect (item) {
      console.log(item)
    },
    handleIconClick (ev) {
      console.log(ev)
    },
    querySearch (queryString, cb) {
      var restaurants = this.report[0].content[0].detail.options
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    intValue (value1, value2) {
      value1 = value2
    }
  }
}
</script>
<style lang="scss" scoped>

  .select{
    background-color: red;
  }
  input{
    border:none !important;
    outline:none !important;
  }
  .el-input__inner{
    border:none !important;
    outline:none !important;
  }
  .el-input_inner{
    background-color:red;
  }
  #edit{
    background-color:teal;
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2{
      padding:20px;
    }
    .text-area{
      // text-indent: 2em;
      text-align: justify;
      background-color: #fff;
      width:600px;
      padding:20px;
      height:500px;
    }
  }
</style>
<style lang="scss">
  .el-input--suffix{
    width:100%;
  }
  .el-input__inner{
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 0;
    box-sizing: border-box;
    color: teal;
    font-weight:900;
    font-size:14px;
    display: inline-block;
    font-size: 14px;
    height: 40px;
    line-height: 1;
    padding: 0px !important;
    margin:0px !important;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    // width:36px;
    // width:100%;
    border:none;
    width:100%;
    // border-bottom:1px solid #333;
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
    width:0px;
    padding: 0px !important;
    margin:0px !important;
  }
  .el-input__suffix{
    display:none;
    width:0px;
    padding: 0px !important;
    margin:0px !important;
  }
</style>
