// components/city/city.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cityShow: {
      type: Boolean,
      observer: function(newVal, oldVal, changedPath) {
        if (newVal) {
          this.showB();
        }
      }
    },
    cityList: {
      type: Array
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    indexCho: -1,
    showC: false
  },
  ready: function() {
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      cityHeight: windowHeight * (750 / windowHeight) - 100,
    });
    if (wx.getStorageSync("provinceid2") == wx.getStorageSync("provinceid1")){
      this.setData({
        indexCho: wx.getStorageSync("cityid"),
      });
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    active: function(e) {
      var ids = e.target.dataset.id;
      this.setData({
        indexCho: ids
      })
      wx.setStorageSync("cityid", ids)
      wx.setStorageSync("provinceid1", wx.getStorageSync("provinceid2"))
    },
    closeAll: function(e) {
      var city = {
        name: e.target.dataset.name,
        id: e.target.dataset.id
      };
      this.triggerEvent("city", city);

      this.setData({
        cityShow: false,
        showC: false
      })
    },
    close:function(){
      var city = {
        name: "",
        id: ""
      };
      this.triggerEvent("city", city);

      this.setData({
        cityShow: false,
        showC: false
      })
    },
    showB: function() {
      var that = this;
      setTimeout(function() {
        that.setData({
          showC: true
        })
      }, 10);
    }
  }
})