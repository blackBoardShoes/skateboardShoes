<template>
  <div class="formCardAll">
    <div class="formCardContent">
      <div class="topContent" >
        <div class="topLeft" v-if="cardObj.num">已有{{cardObj.num}}项记录</div>
        <div></div>
        <el-button
          class="topRihgt"
          :type="
            cardObj.phase === '术中1' ? 'primary' : cardObj.phase === '术后1' ? 'success' :'info'
            ">{{cardObj.phase}}</el-button>
      </div>
      <div class="centerContent">
        <i :class="cardObj.icon" class="centerIcon"></i>
        <div class="centerTitle">
          {{cardObj.name}}
        </div>
        <div class="centerTitleAddTime">
          新增日期: {{cardObj.createTime ? cardObj.createTime : '新增日期: 我也不知道'}}
        </div>
        <div class="centerTitleEditTime">
          修改日期: {{cardObj.updateTime ? cardObj.updateTime : '修改日期: 我也不知道'}}
        </div>
      </div>
      <div class="bottomContent">
        <i class="el-icon-edit" @click="templateEdit"></i>
        <i class="el-icon-close" @click="templateDelete"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardObj: {
      type: Object,
      default () {
        return {}
      }
    },
    index: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  methods: {
    templateEdit () {
      this.$emit('templateEdit', this.cardObj, this.index)
    },
    templateDelete () {
      this.$emit('templateDelete', this.cardObj, this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';

.formCardAll {
  width: 23.6%;
  // height: 200px;
  border: 0.5px solid $lightBorderColor;
  border-radius: 3px;
  background: $groupColor;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: $commonTetxColor;
  .topContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .topLeft {
      margin-left: 10px;
      color: $minorTextColor;
      font-weight: 300;
      font-size: 14px;
    }
    .el-button {
      border-radius: 0;
      width: 120px;
      font-weight: bold;
      padding: 0;
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
  .centerContent {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    height: 100px;
    .centerIcon {
      font-size: 35px;
    }
    .centerTitle {
      font-size: 18px;
      font-weight: bold;
    }
    .centerTitleAddTime, .centerTitleEditTime {
      font-size: 12px;
      color: $minorTextColor;
    }
    .centerTitleAddTime {
      padding-top: 10px;
    }
  }
  .bottomContent {
    i:hover {
      cursor: pointer;
    }
    i {
      font-size: 20px;
    }
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
