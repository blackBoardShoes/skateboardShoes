<template>
  <div class="slotAll">
    <div class="slotContent">
      <div class="slotTop">
        <slot name="slotTop"></slot>
      </div>
      <div class="slotContain">
        <div class="slotContainOne">
          <slot name="slotContainOne"></slot>
        </div>
        <div class="slotContainTwo">
          <slot name="slotContainTwo"></slot>
        </div>
      </div>
      <div class="slotBottom">
        <slot name="slotBottom"></slot>
      </div>
    </div>
    <!-- <sx-slot-card>
          <div slot="slotTop">
            <div>随访记录</div>
          </div>
          <div slot="slotContainOne">
            <div>
              <p>随访记录</p>
              <p>随访记录</p>
            </div>
          </div>
          <div slot="slotContainTwo">33</div>
          <div slot="slotBottom">cccc</div>
        </sx-slot-card> -->
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';
$full: 100%;
$padding: 15px;
.slotAll {
  width: 24%;
  border: 1px solid $lightBorderColor;
  background: white;
  .slotContent {
    .slotTop {
      padding: 6px $padding;
      background: $mainBackgroundColor;
      font-weight: bold;
    }
    .slotContain {
      .slotContainOne {
        padding: $padding;
        line-height: 24px;
        border-bottom: 1px dashed $lightBorderColor;
      }
      .slotContainTwo {
        padding: $padding;
        line-height: 24px;
      }
    }
    .slotBottom {
      padding: $padding;
    }
  }
}
</style>
