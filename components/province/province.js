// components/province/province.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    province: {
      type: Array
    },
    bendi:{
      type: String,
      value: app.globalData.addressRes
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    letter: []
  },
  ready: function() {
    let that = this;
    let letterLS = [];
    for (var i = 0; i < that.properties.province.length; i++) {
      letterLS.push(that.properties.province[i].initials);
    }
    that.setData({
      letter: letterLS,
      bendi: app.globalData.addressRes
    });
    //console.log(wx.getStorageSync("addressRes"))
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    that.setData({
      cityHeight: windowHeight * (750 / windowHeight) - 100,
    });

  },
  /**
   * 组件的方法列表
   */
  methods: {
    letters:function(){
      let that = this;
      let letterLS = [];
      for (var i = 0; i < that.properties.province.length; i++) {
        letterLS.push(that.properties.province[i].initials);
      }
      that.setData({
        letter: letterLS,
        bendi: wx.getStorageSync("addressRes")
      })
    },
    choiceLetter: function(e) {
      var ids = e.target.dataset.letter;
      this.setData({
        ids: ids
      })
    },
    choiceProvince: function(e) {
      var province = {
        id: e.target.dataset.id,
        name: e.target.dataset.province
      };
      wx.setStorageSync("provinceid2", e.target.dataset.id)
      this.triggerEvent("getProvince", province);
    },
    //从新定位
    resetBendi(){
      let that =this;
      app.locationFunMore();
      
    }
  }
})