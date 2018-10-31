// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isfilex: false,
    showLoading:true,
    cityName:{
      name:'地区',
      id:0
    },
    businessName:{
      name: '业务型',
      id: 0
    },
    themeName:{
      name: '选主题',
      id: 0
    },
    pageIndex:1,
    address: wx.getStorageSync("addressRes")
  },
  //调用组件获取数据方法
  getDataFun(){
    let that = this;
    let flockList = that.selectComponent("#flockList");
    flockList.getFlockListFun();
    let indexAther = that.selectComponent("#indexAther");
    indexAther.getDataList()
  },
  // 监听滚动条
  onPageScroll: function(e) {
    let that = this;
    //console.log(e);//{scrollTop:99}
    if (e.scrollTop >= 300) {
      //console.log("置顶");
      that.setData({
        isfilex: true
      })
    } else {
      that.setData({
        isfilex: false
      })
    }

  },
  //获取用户信息并授权
  getUserInfoFun() {
    let that = this;
    let getVal = wx.getStorageSync("userInfo");
    if (!getVal || getVal==='0'){
      wx.navigateTo({
        url: '/pages/loginPage/loginPage',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    app.locationFun();
    that.getUserInfoFun();
    setTimeout(function(){
      that.setData({
        showLoading:false
      })
    },1000);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
   // app.locationFun();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that =this;
    that.setData({
      pageIndex:  1,
      address: wx.getStorageSync("addressRes")
    });
    that.getDataFun();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    let that = this;
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    that.reset();
    
  },
  reset(){
    let that = this;
    that.data.cityName = {
      name: '地区',
      id: 0
    }
    that.data.businessName = {
      name: '业务型',
      id: 0
    }
    that.data.themeName = {
      name: '选主题',
      id: 0
    }
    that.setData({
      cityName: that.data.cityName,
      businessName: that.data.businessName,
      themeName: that.data.themeName,
      pageIndex: 1,
      textcont: "---上拉加载更多---",
      notHaveMsg: false
    });
    that.getDataFun();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;
    if (that.data.notHaveMsg)
      return false
    that.setData({
      pageIndex:parseInt(that.data.pageIndex) + 1
    });
    wx.showLoading({
      title: '加载中',
    })
    that.getDataFun();
  },
  //改变提示文字
  changeText(){
    let that = this;
    that.setData({
      notHaveMsg: true
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
   
  }
})