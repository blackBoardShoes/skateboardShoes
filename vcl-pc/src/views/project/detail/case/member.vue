<template>
  <div id="project-member">
    <div class="operate-buttons align-right">
      <el-button size="medium" type="primary">添加成员</el-button>
    </div>
    <div class="project-info">
    </div>
  </div>
</template>
<script>
export default {
  name: 'Project_detail_member',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/variable';
  #project-member{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:16px;
    display: flex;
    flex-direction: column;
    .operate-buttons{
      // height: 40px;
      min-height: 40px;
      line-height: 40px;
      padding:10px 0;
    }
    .project-info{
      flex: 1;
    }
  }
</style>
