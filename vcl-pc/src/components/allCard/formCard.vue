<template>
  <div class="formCardAll">
    <div class="formCardContent">
      <div class="topContent" >
        <div class="topLeft" v-if="cardObj.num">已有{{cardObj.num}}项记录</div>
        <div></div>
        <el-button
          class="topRihgt"
          :type="
            cardObj.state === '术中' ? 'primary' : cardObj.state === '术后' ? 'success' :'info'
            ">{{cardObj.state}}</el-button>
      </div>
      <div class="centerContent">
        <i :class="cardObj.icon" class="centerIcon"></i>
        <div class="centerTitle">
          {{cardObj.name}}
        </div>
        <div class="centerTitleAddTime">
          {{cardObj.addTime ? cardObj.addTime : '新增日期: 2018-06-08'}}
        </div>
        <div class="centerTitleEditTime">
          {{cardObj.editTime ? cardObj.editTime : '修改日期: 2018-06-08'}}
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
  width: 24%;
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
      width: 80px;
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
    height: 150px;
    .centerIcon {
      font-size: 55px;
    }
    .centerTitle {
      font-size: 18px;
      font-weight: bold;
    }
    .centerTitleAddTime, .centerTitleEditTime {
      font-size: 14px;
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
