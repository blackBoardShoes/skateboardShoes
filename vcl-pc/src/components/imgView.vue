<template>
  <div id="img-view">
    <div class="title-header">
      <div class="float-left"> <i class="el-icon-picture-outline"></i> 请挑选镜检照片</div>
      <div class="close" @click="close"><i class="el-icon-close"></i></div>
    </div>
    <div class="img-group">
      <div class="img-choosen">
        <div class="img-choose" v-for="(img, index) in imgArr" :key="index"  :class="{active: activeIndex === index}" @click="changeImg(img, index)">
          <div class="img-index">{{index + 1}}</div>
          <img :src="img.source" alt="error">
          <el-checkbox v-model="img.checked" :disabled="imgCount > 5 && img.checked === false">{{img.information}}</el-checkbox>
          <div class="cover1"></div>
          <div class="cover2"></div>
        </div>
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
              <div class="image-wrapper" v-for="{source, thumbnail} in scope.images" :key="source">
                <img class="image"
                     :src="thumbnail" :data-source="source" :alt="source.split('/').pop()">
              </div>
            </figure>
          </template>
        </viewer>
      </div>
      <div class="operate">
        <div class="info">当前查看第<span class="special">{{activeIndex + 1}}</span>张,已挑选<span class="special">{{imgCount}}张</span>,最多还有<span class="special">{{6-imgCount}}张</span>可挑选</div>
        <div class="buttons">
          <el-button size="medium" type="info">取消</el-button>
          <el-button size="medium" type="primary">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'imgView',
  data () {
    return {
      imgArr: [
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片1镜检照片1镜检照片1镜检照片1镜检照片1'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片2'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片3'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片4'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片5'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片6'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片7'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片8'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片9'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片10'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片11'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片12'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片13'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片14'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片15'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片16'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片17'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片18'
        },
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg'),
          checked: false,
          information: '镜检照片19'
        }
      ],
      previewImages: [
        {
          source: require('../assets/xbx.jpg'),
          thumbnail: require('../assets/xbx.jpg')
        }
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
      this.imgArr.forEach((item) => {
        item.checked = false
      })
    },
    inited (viewer) {
      this.$viewer = viewer
    },
    changeImg (item, index) {
      this.previewImages = []
      this.previewImages.push(item)
      this.activeIndex = index
    },
    close () {
      console.log('close this window')
    }
  },
  computed: {
    imgCount: function () {
      let num = 0
      this.imgArr.forEach((item, index, array) => {
        if (item.checked === true) {
          num += 1
        }
      })
      return num
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
      .float-left{
        float: left;
      }
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
      height:100%;
      display:flex;
      flex-direction: column;
      .img-choosen{
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
        text-align: center;
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
    // margin-top:500px;
    .images {
      display:none;
      // position: absolute;
      // top:-100%;
      // height: 100%;
      // display: flex;
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
