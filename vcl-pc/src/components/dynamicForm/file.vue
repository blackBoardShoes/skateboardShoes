<template>
  <div class="fileAll">
    <input
      ref="inputFile"
      class="fileClass"
      @change="onRead($event, model, index)"
      v-bind="$props"
      type="file" :accept="accept" />
    <slot class="slotClass"></slot>
  </div>
</template>
<script>
export default {
  props: {
    autoComplete: {
      type: String,
      default: 'off'
    },
    model: String,
    index: null,
    disabled: { type: Boolean, default: false },
    accept: {type: String, default: 'image/*'}
  },
  methods: {
    onRead (e, model, index) {
      var file = e.target.files || e.dataTransfer.files
      if (file) {
        if (file[0].size / 1024 / 1024 > 9) {
          this.$emit('onRead', false)
        } else {
          var reader = new FileReader()
          reader.readAsDataURL(file[0])
          reader.onload = (e) => {
            this.$emit('onRead', { 'model': model, 'index': index, 'file': file[0], 'result': e.target.result, 'event': e })
            // this.$emit('onRead', e.target.result)
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$full: 100%;
.fileAll {
  input[type="file"]::-webkit-file-upload-button {
    cursor: pointer;
  }
  .fileClass {
    width: $full;
    height: $full;
    cursor: pointer;
    position: absolute;
    opacity: 0;
  }
  .slotClass {
    width: $full;
    height: $full;
  }
}
</style>
