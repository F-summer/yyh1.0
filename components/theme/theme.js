// components/theme/theme.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array
    },
    comtype:{
      type:String
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    indexCho: -1
  },
ready:function(){
  if (this.properties.comtype == "business" && wx.getStorageSync("business")>-1){
    this.setData({
      indexCho: wx.getStorageSync("business")
    })
  }
  if (this.properties.comtype == "theme" && wx.getStorageSync("theme")>-1) {
    this.setData({
      indexCho: wx.getStorageSync("theme")
    })
  }
},
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击筛选
    choice: function(e) {
      var ids = e.target.dataset.ids;
      this.setData({
        indexCho: ids
      })
      if (this.properties.comtype =="business"){
        wx.setStorageSync("business", ids)
        wx.setStorageSync("theme", -1)
      } else if (this.properties.comtype == "theme"){
        wx.setStorageSync("theme", ids)
        wx.setStorageSync("business", -1)
      }
      
      var name = {
        name: e.target.dataset.name,
        id: e.target.dataset.id
      };
      this.triggerEvent("name", name);
    },
  }
})