<template>
  <div class="formAll">
    <div class="formContent">
      <sx-submenu-control :navArr="navArr">
        <div slot="title">
          <div class="slotFormClass">
            <h1> 表单管理 </h1>
            <h5 class="light-text">Form Management</h5>
          </div>
        </div>
      </sx-submenu-control>
      <!-- <keep-alive> -->
      <router-view style="width:calc(100% - 160px);"></router-view>
      <!-- </keep-alive> -->
    </div>
  </div>
</template>
<script>
import sxSubmenuControl from '../../components/submenu/submenuControl'
export default {
  name: 'form_index',
  components: {
    sxSubmenuControl
  },
  data () {
    return {
      navArr: [
        {
          index: 'bdk',
          icon: 'ercp-icon-module-form',
          name: '表单库'
        },
        {
          index: 'zdk',
          icon: 'ercp-icon-module-field',
          name: '字段库'
        },
        {
          index: 'syk',
          icon: 'ercp-icon-module-term',
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
    background: url('../../assets/images/标题栏.png') center center no-repeat;
    width: $full;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1 {
      color:$mainTextColor;
      font-size: 26px;
    }
    span{
      color: $minorTextColor;
      font-size: 14px;
    }
  }
}
</style>
