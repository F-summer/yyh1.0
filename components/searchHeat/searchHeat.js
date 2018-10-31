// components/searchHeat/searchHeat.js
const app = getApp();
const flockListApi = require("../../service/flockList.js").allServerApi;
const errorFun = require("../../util/errorMsg.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    heartArr:[],
    oldArr: [],
    hideClaen:false
  },
  ready(){
    let that = this;
    that.getDataList()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //热门搜索
    heartFun(e) {
      var that = this;
      var val = e.detail.value; //通过这个传递数据
      var myEventDetail = {
        val: e.currentTarget.dataset.name
      } // detail对象，提供给事件监听函数
      this.triggerEvent('myevent', myEventDetail);
    },
    //清除历史
    clearArrFun(){
      var that = this;
     
      flockListApi.clearOldList({
        mp_openid: wx.getStorageSync('openid')
      }, function (successMsg) {
        that.setData({
          oldArr: [],
          hideClaen: true
        });
        errorFun("清除成功")
      }, function (errorMsg) {
        errorFun(errorMsg)
      })
    },
    //获取数据
    getDataList(){
      let that = this;
      flockListApi.getOldHertList({
        mp_openid: wx.getStorageSync('openid')
      },function(successMsg){
        that.setData({
          heartArr: successMsg.data.data.hot_search,
          oldArr: successMsg.data.data.search_history
        })
      },function(errorMsg){
         errorFun(errorMsg)
      })
    }
  }
})
