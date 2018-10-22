<template>
  <div id="patient-record">
    <!-- 患者详情报告 -->
    <sync-slider :contentBox="contentBox" v-on:changeActiveIndex="changeActiveIndex" ref="child">
      <div slot="nav" class="nav">
        <div class="navi" v-for="(item, index) in 10" :key="index" :class="{active: index === activeIndex}" @click="scroll(index)">
          <span>{{item}}</span>
        </div>
      </div>
      <div slot="content" id="sync-content">
        <div class="detail" v-for="(item, index) in 10" :key="index">{{item}}</div>
      </div>
    </sync-slider>
  </div>
</template>
<script>
// import textRadio from '../../../components/textRadio/textRadio'
// import {addressData} from '../../../data/address/addressData'
// import {getPatientBasic, deletePatient, editPatientBasic, getPatientRecords, getAllFormTemplates} from '../../../api/patient/patient.js'
let syncSlider = () => import('../../../components/syncSlider/syncSlider.vue')
export default {
  name: 'patient_record',
  components: {
    syncSlider
    // textRadio
  },
  data () {
    return {
      contentBox: {
        content: 'sync-content',
        detail: 'detail'
      },
      activeIndex: 0
    }
  },
  mounted () {
  },
  created () {
    // this.NumInHospital = this.$route.params.id
  },
  methods: {
    changeActiveIndex (activeIndex) {
      this.activeIndex = activeIndex
    },
    scroll (index) {
      this.$refs.child.scroll(index)
    }
    // 根据患者id 获取患者的基本信息
    // async getPatient () {
    //   let info = this.NumInHospital
    //   let response = await getPatientBasic(info)
    //   if (response.data.mitiStatus === 'SUCCESS') {
    //     let info = response.data.entity
    //     info.address = []
    //     if (info.province !== '' && info.province !== info.city) {
    //       info.address[0] = info.province
    //       info.address[1] = info.city
    //       info.address[2] = info.district
    //     } else if (info.province !== '' && info.province === info.city) {
    //       info.address[0] = info.city
    //       info.address[1] = info.district
    //     } else {
    //       info.address = []
    //     }
    //     this.$refs.nation.resetField()
    //     this.basicInfo = info
    //   } else {
    //     this.$message.error('ERROR: ' + response.data.message)
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/variable';
  #patient-record{
    overflow: hidden;
    width: 100%;
    min-height: 100%;
    // padding: 16px;
    // box-sizing: border-box;
    // display: flex;
    // flex-direction: column;
    .sync-slider{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      .nav{
        width: 80px;
        height: 100%;
        .navi{
          cursor: pointer;
          transition: all .5s linear;
          height: 50px;
          line-height: 50px;
          font-size: 30px;
          text-align: center;
          background-color: #eee;
        }
        .active{
          background-color: #fff;
        }
      }
      #sync-content{
        flex:1;
        overflow: auto;
        .detail{
          height: 300px;
          text-align: center;
          line-height: 300px;
          font-size: 30px;
          border-bottom:2px solid #fff;
        }
        .bottom{
          height: 400px;
        }
      }
    }
  }
</style>
