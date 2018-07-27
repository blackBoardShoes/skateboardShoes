<template>
  <div class="formAll">
    <div class="formContent">
      <sx-form-control :navArr="navArr">
        <div slot="title">
          <div class="slotFormClass">
            <h1> 表单管理 </h1>
            <span>Form Management</span>
          </div>
        </div>
      </sx-form-control>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import sxFormControl from '../../components/submenu/formControl'
export default {
  name: 'form_index',
  components: {
    sxFormControl
  },
  data () {
    return {
      navArr: [
        {
          index: 'bdk',
          icon: 'el-icon-setting',
          name: '表单库'
        },
        {
          index: 'zdk',
          icon: 'el-icon-setting',
          name: '字段库'
        },
        {
          index: 'syk',
          icon: 'el-icon-setting',
          name: '术语库'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/variable';
$full: 100%;
.formAll {
  height: $full;
  width: $full;
  .formContent {
    height: $full;
    width: $full;
    display: flex;
  }
  .slotFormClass {
    width: $full;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1 {
      color:$mainTextColor;
      font-size: 30px;
    }
    span{
      color: $minorTextColor;
      font-size: 14px;
    }
  }
}
</style>
