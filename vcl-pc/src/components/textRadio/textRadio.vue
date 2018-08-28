<template>
  <div class="text-radio">
    <el-radio-group v-model="form.radio" class="text-radio-group" :disabled="disabled">
      <el-radio
        v-for="(radio,index) in radios"
        :key="index"
        :label="radio"
        class="radio-group-item"
      >
        {{radio}}
      </el-radio>
    </el-radio-group>
    <el-input
      ref="text-radio-input"
      v-show="form.radio === '其它'"
      v-model="form.text"
      @blur="inputBlur"
      :disabled="disabled"
      placeholder="请填写其它的内容"
      class="text-radio-input"
    >
    </el-input>
  </div>
</template>
<script>
export default {
  created () {
    this.init()
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String
    },
    options: {
      type: Array
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        radio: '',
        text: ''
      }
    }
  },
  computed: {
    defaultValue () {
      return this.value
    },
    radios () {
      let options = this.options
      options.push('其它')
      return options
    }
  },
  methods: {
    init () {
      let defaultValue = this.value
      if (defaultValue) {
        if (this.options.indexOf(defaultValue) > -1) {
          this.form.radio = defaultValue
        } else {
          this.form.radio = '其它'
          this.form.text = defaultValue
        }
      }
    },
    inputBlur () {
      if (this.form.radio === '其它') {
        if (this.form.text === '') {
          this.$refs['text-radio-input'].focus()
        }
      }
    }
  },
  watch: {
    'form': {
      handler: function (form) {
        if (form.radio === '其它') {
          this.$nextTick(() => {
            this.$refs['text-radio-input'].focus()
          })
          this.$emit('change', form.text)
        } else {
          this.form.text = ''
          this.$emit('change', form.radio)
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .text-radio {

    .radio-group-item {
      margin-left: 0;
      margin-right: 30px;
      line-height: 2;

      &:last-child {
        margin-right: 0;
      }
    }

    .text-radio-input {
      width: 250px;
    }
  }
</style>
