<template>
  <div id="project-export">
    <div class="operate-buttons align-right">
      <el-button type="primary" @click="preview">预览数据</el-button>
      <el-button type="primary" @click="beginExport">开始导出</el-button>
    </div>
    <div class="export">
      我是导出
    </div>
  </div>
</template>
<script>
export default {
  name: 'Project_detail_export',
  data () {
    return {
    }
  },
  methods: {
    preview () {
      this.$message.success('预览数据待做')
    },
    beginExport () {
      this.$message.success('导出数据待做')
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/variable';
   #project-export{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:16px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .operate-buttons{
      min-height: 40px;
      line-height: 40px;
      padding:10px 0;
    }
    .export{
      flex: 1;
    }
  }
</style>
