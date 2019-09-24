<template>
  <div id="img-view">
    <!-- <div class="title-header">
      <div class="float-left"> <i class="el-icon-picture-outline"></i> 请挑选镜检照片</div>
      <div class="close" @click="closeAndCancel"><i class="el-icon-close"></i></div>
    </div> -->
    <div class="img-group">
      <div class="img-choosen">
        <el-checkbox-group v-model="newCheckImageList">
          <div class="img-choose" v-for="(img, index) in newImgArr" :key="index"  :class="{active: activeIndex === index}" @click="changeImg(img, index)">
            <div class="img-index">{{index + 1}}</div>
            <img :src="img" alt="error">
            <el-checkbox :label="img" :disabled="newCheckImageList.length >= 6 && !(newCheckImageList.includes(img))">{{null}}</el-checkbox>
            <div class="cover1"></div>
            <div class="cover2"></div>
          </div>
        </el-checkbox-group>
      </div>
      <div class="clear-choosen">
        <span class="clear" @click="clearAll">重置选区</span>
      </div>
    </div>
    <div class="img-preview tile is-10 is-vertical is-parent">
      <div class="viewer-wrapper">
        <viewer :images="previewImages"
                :options="options"
                @inited="inited"
                class="viewer" ref="viewer">
          <template slot-scope="scope">
            <figure class="images">
              <div class="image-wrapper" v-for="(item, index) in scope.images" :key="index">
                <img class="image" :src="item" :data-source="item" :alt="item.split('/').pop()">
              </div>
            </figure>
          </template>
        </viewer>
      </div>
      <div class="operate">
        <div class="info">当前查看第<span class="special">{{activeIndex + 1}}</span>张,已挑选<span class="special">{{newCheckImageList.length}}张</span>,最多还有<span class="special">{{6-newCheckImageList.length}}张</span>可挑选</div>
        <div class="buttons">
          <!-- <el-button size="medium" type="info" @click="closeAndCancel">取消</el-button> -->
          <el-button size="medium" type="primary" @click="confirmData">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'imgView',
  props: {
    imgArr: {
      type: Array,
      default () {
        return []
      }
    },
    checkImageList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    imgArr: {
      handler (val) {
        this.newImgArr = val
      },
      deep: true
    },
    checkImageList: {
      handler (val) {
        this.newCheckImageList = val
      },
      deep: true
    }
  },
  created () {
    if (this.newCheckImageList.length) {
      this.previewImages = []
      this.previewImages.push(this.newCheckImageList[0])
    }
  },
  data () {
    return {
      newImgArr: this.imgArr,
      newCheckImageList: this.checkImageList,
      previewImages: [
        // {
        //   source: require('../../../src/assets/images/xbx.jpg'),
        //   thumbnail: require('../../../src/assets/images/xbx.jpg')
        // }
      ],
      options: {
        inline: true,
        button: true,
        navbar: false,
        title: true,
        toolbar: true,
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        transition: true,
        fullscreen: true,
        keyboard: true,
        url: 'data-source'
      },
      activeIndex: 0
    }
  },
  methods: {
    clearAll () {
      this.newCheckImageList = []
    },
    inited (viewer) {
      this.$viewer = viewer
    },
    changeImg (item, index) {
      this.previewImages = []
      this.previewImages.push(item)
      this.activeIndex = index
    },
    closeAndCancel () {
      console.log('close cancel this window')
    },
    confirmData () {
      console.log(this.newCheckImageList, 'this.newCheckImageList')
      this.$emit('confirmData', this.newCheckImageList)
    }
  }
}
</script>
<style lang="scss" scoped>
  #img-view{
    background-color:#F0F0F0;
    height:100%;
    width:100%;
    box-sizing: border-box;
    padding-top:40px;
    display: flex;
    flex-direction: row;
    position: relative;
    .title-header{
      position: absolute;
      top: 0;
      width: 100%;
      padding:0 20px;
      box-sizing: border-box;
      line-height: 40px;
      .close{
        float:right;
        font-size:16px;
        height:40px;
        line-height:40px;
        cursor:pointer;
        i{
          font-weight:900;
        }
      }
    }
    .img-group{
      background-color: #fff;
      width:530px;
      border-right:1px solid #f0f0f0;
      // height:636px;
      overflow: auto;
      display:flex;
      flex-direction: column;
      .img-choosen{
        max-height:596px;
        flex:1;
        overflow: auto;
        text-align: center;
        position: relative;
        .img-choose{
          position: relative;
          width:150px;
          float: left;
          margin-left:17.5px;
          margin-top:20px;
          height:150px;
          box-sizing: border-box;
          border-radius:2px;
          overflow: hidden;
          background-color: #f0f0f0;
          img{
            width:100%;
            height:100%;
          }
          .el-checkbox{
            overflow: hidden;
            position: absolute;
            bottom: 0px;
            left: 0px;
            color: #fff;
            text-align: left;
            width:100%;
            box-sizing: border-box;
            padding:0 5px;
            line-height: 1.5;
            background-color:rgba($color: #111, $alpha: 0.3);
          }
          .img-index{
            // display: none;
            position: absolute;
            top: 5px;
            right: 5px;
            width: 20px;
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            color: #fff;
            border-radius: 50%;
            background-color: rgba(0,0,0,0.1);
            transition: all 0.2s linear;
          }
        }
        .active{
          z-index: 111;
          background-color:rgba($color: #ffffff, $alpha: 0.2);
          // .cover1{
          //   position: absolute;
          //   left: -4px;
          //   width:20px;
          //   height:20px;
          //   top: -4px;
          //   background-color:#117FD1;
          //   z-index: -1;
          //   transition: all 1s linear;
          // }
          // .cover2{
          //   position: absolute;
          //   right: -4px;
          //   width:20px;
          //   height:20px;
          //   bottom: -4px;
          //   background-color:#117FD1;
          //   z-index: -1;
          //   transition: all 1s linear;
          // }
          .img-index{
            transition: all 0.2s linear;
            background-color: rgba(17,127,209,1);
          }
        }
      }
      >>>.img-choosen::-webkit-scrollbar-track
      {
        width: 5px;
        background-color: #f0f0f0;
      }
      >>>.img-choosen::-webkit-scrollbar
      {
        width: 5px;
        background-color: #f1f1f1;
      }
      >>>.img-choosen::-webkit-scrollbar-thumb
      {
        width: 5px;
        background-color: #D2D2D2;
      }
      .clear-choosen{
        height:40px;
        padding-right:30px;
        text-align: right;
        line-height:40px;
        background-color: #f0f0f0;
        color: #117FD1;
        font-weight: 900;
        cursor: pointer;
      }
    }
    .img-preview{
      flex:1;
      height:100%;
      padding:20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      background: #fff;
      .viewer-wrapper{
        width:90%;
        height:500px;
      }
      .operate{
        width: 100%;
        text-align: center;
        margin-top: 20px;
        line-height: 2;
        .info{
          height:40px;
          font-size: 15px;
          letter-spacing: 1px;
          .special{
            font-weight:900;
            color:#117FD1;
          }
        }
      }
    }
  }
  .viewer {
    height: 100%;
    position: relative;
    .images {
      display:none;
      justify-content: center;
      align-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding: 5px;
      .image-wrapper {
        display: inline-block;
        width: calc(33% - 20px);
        margin: 5px 5px 0 5px;
        .image {
          width: 100%;
          cursor: pointer;
          display: inline-block;
        }
      }
    }
  }
</style>
<style>
  .viewer-reset{
    display: none;
  }
  .viewer-prev{
    display: none;
  }
  .viewer-next{
    display: none;
  }
  .viewer-play,.viewer-large{
    display: none;
  }
  .el-checkbox__label{
    text-overflow:ellipsis;
    /* overflow: hidden; */
  }
</style>
