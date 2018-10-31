// pages/searchPage/searchPage.js
const app = getApp();
const flockListApi = require("../../service/flockList.js").allServerApi;
const errorFun = require("../../util/errorMsg.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headTop:true,
    haveResult:false,
    searchVal:'搜索您感兴趣的群',
    getAtherVal:'',
    pageIndex: 1,
    textcont: "---上拉加载更多---"
  },
  onSearch(e){
    let that = this;
    that.setData({
      haveResult: true,
      getAtherVal: e.detail.value
    });
    flockListApi.sendOldHertList({
      mp_openid: wx.getStorageSync('openid'),
      content: e.detail.value
    }, function (successMsg) {
      //console.log(successMsg)
    }, function (errorMsg) {
      //console.log(errorMsg)
    })
    that.component();
  },
  // //取消
  // cancerFun(){
  //   wx.navigateBack({
  //     delta: 1
  //   })
  // },
  //接收热门搜索/搜索历史传来的值
  changSearchVal(e){
    let that =this;
    that.setData({
      getAtherVal: e.detail.val,
      haveResult: true
    });
    wx.showLoading({
      title: '查询中',
    })
    that.component();
  },
  component(){
    let that = this;
    let flockList = that.selectComponent("#flockList");
    flockList.getFlockListFun();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
   if(options.name){
     that.setData({
       searchVal: options.name,
       getAtherVal: options.name
     });
     that.setData({
       haveResult: true
     });
     that.component();
   }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    if (that.data.notHaveMsg) 
    return false
    that.setData({
      pageIndex: that.data.pageIndex + 1
    });
    wx.showLoading({
      title: '加载中',
    })
    that.component();
  },
  //改变提示文字
  changeText() {
    let that = this;
    that.setData({
      textcont: "找不到更多的群？查看待开通群列表",
      notHaveMsg:true
    });
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})