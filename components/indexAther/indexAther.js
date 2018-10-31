// components/indexAther/indexAther.js
const app = getApp();
const flockListApi = require("../../service/flockList.js").allServerApi;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cityName: {
      type: Object,
      value: {
        id: 0,
        name:'地区'
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    arr: []
  },
  ready() {
    let that = this;
    that.getDataList();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goSearch() {
      wx.navigateTo({
        url: '/pages/searchPage/searchPage',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      });
    },
    goBuild() {
      wx.navigateTo({
        url: '/pages/construction_group/construction_group',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      });
    },
    //搜索
    searchFun(e) {
      wx.navigateTo({
        url: '/pages/searchPage/searchPage?name=' + e.currentTarget.dataset.name,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      });
    },
    //获取数据
    getDataList() {
      let that = this;
      flockListApi.getOldHertList({
        mp_openid: wx.getStorageSync('openid')
      }, function(successMsg) {
        that.setData({
          arr: successMsg.data.data.hot_search
        })
      }, function(errorMsg) {
        //console.log(errorMsg)
      })
    }
  }
})