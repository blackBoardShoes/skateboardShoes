<template>
  <div class="segmentingLineAll">
    <div class="prepend">
      <slot name="prepend"></slot>
    </div>
    <div class="append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../assets/css/variable';
$full: 100%;
$margin: 20px;
.segmentingLineAll {
  background: $groupColor;
  width: $full;
  // margin: $margin;
  margin-left: 0;
  margin-right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  .prepend {
    margin-left: $margin;
  }
  .append {
    margin-right: 30px;
  }
}
</style>
