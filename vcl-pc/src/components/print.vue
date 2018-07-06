<template>
  <div id="app">
    <div id="print">
    北京时间7月4日，据美媒体报道，休斯顿火箭队和昔日最佳新秀迈卡威达成了一份1年期的底薪合同。[霸刀传奇陪你度过休赛期！现金红包拿到手软]迈卡威是2013年的首轮11号新秀，并且成为那个赛季的最佳新秀。<s>但是自</s><b>从离开76人之</b>后，迈卡威的职业生涯就一直不太顺利。此后，迈卡威先后效力过雄鹿、公牛和黄蜂。
    </div>
    <div class="png">
      <img src="../assets/logo.png" alt="">
    </div>
    <el-button @click="print">打印</el-button>
  </div>
</template>

<script>
export default {
  name: 'print',
  methods: {
    print () {
      let subOutputRankPrint = document.getElementById('app')
      let newContent = subOutputRankPrint.innerHTML
      let oldContent = document.body.innerHTML
      document.body.innerHTML = newContent
      window.print()
      window.location.reload()
      document.body.innerHTML = oldContent
      return false
    }
  }
}
</script>

<style>
  .beforeHeader,
  .afterFooter{
    display: none;
  }

  @media print {
    /* 打印时显示 */
    .beforeHeader,
    .afterFooter{
        display: none;
    }
  }
  #print{
    background-color: teal;
    color:#fff;
    text-align:justify;
    width:200px;
    height:300px;
    padding:30px;
    position: absolute;
    top:50%;
    left:50%;
    margin-top:-150px;
    margin-left:-100px;
  }
  .png{
    background-color: teal;
  }
</style>
