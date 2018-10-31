// pages/applyPage/applyPage.js
const app = getApp();
const loginApi = require("../../service/login.js").allServerApi;
const applyApi = require("../../service/apply.js").allServerApi;
const errorFun = require("../../util/errorMsg.js");
const discoverApi = require('../../service/discover.js').allServerApi;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAlt: false,
    typenum:0,
    typeArr: [],
    typeindex:0,
    showApply:false,
    cityName: {
      name: '选地区',
      id: null
    },
    businessName: {
      name: '业务型',
      id: null
    },
    themeName: {
      name: '选主题',
      id: null
    },
    sendId:null,
    showBtn:false
  },
  goSelectPag(e) {
    let that= this
    wx.navigateTo({
      url: '/pages/discover/discover?index=' + e.currentTarget.dataset.index + '&url=' + 'apply' + '&typenum=' + that.data.typenum
    })
  },
  showAltFun() {
    let that = this;
    that.setData({
      showAlt: true
    })
  },
  hideAltFun() {
    let that = this;
    that.setData({
      showAlt: false,
      themeName: that.data.themeName
    });
    
  },
  //验证信息
  testFun(){
    let that = this;
    if (that.data.cityName.name == "选地区") {
      errorFun("请选择地区");
      return false
    }
    if (that.data.businessName.name == "业务型" && that.data.typenum == 0) {
      errorFun("请选择业务型");
      return false
    }
    if (that.data.themeName.name == "选主题" && that.data.typenum == 1) {
      errorFun("请选择选主题");
      return false
    } 
    that.data.sendId = that.data.typenum == 0 ? that.data.businessName.id : that.data.themeName.id;
    //创建群
    applyApi.applyServe({
      'mp_openid': wx.getStorageSync('openid'),
      'type': that.data.typenum,
      'type_id': that.data.sendId,
      'areaid': that.data.cityName.id
    }, function (successMsg) {
     // errorFun("已经提交创建群申请");
      wx.showModal({
        title: '提示',
        content: '您的申请已提交，7天内助力成功即开群，马上邀请好友帮忙助力吧',
        success: function (res) {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        },
        fail: function (res) {
          wx.reLaunch({
            url: '/pages/index/index',
          })
         }
      })
     
    }, function (errorMsg) {
      errorFun(errorMsg);
    })
  },
  //选择主题
  getTypeFun(e) {
    //console.log(e)
    let that = this;
    that.setData({
      typeindex: e.currentTarget.dataset.index
    });
    that.data.themeName.id = e.currentTarget.dataset.id;
    that.data.themeName.name = e.currentTarget.dataset.name
  },
  //获取手机号
  getPhoneNumber(e){
    let that = this;
    let event = e;
    wx.login({
      success: function (e) {
        //console.log(e.code,event.detail.iv, event.detail.encryptedData)
        loginApi.getPhone({
          mp_openid: wx.getStorageSync('openid'),
          iv: event.detail.iv,
          encryptedData: event.detail.encryptedData,
          code: e.code
        }, function (successMsg) {
          wx.setStorageSync('hasPhoneNum', '0');
          that.setData({
            showApply: true
          })
        }, function (errorMsg) {
          wx.setStorageSync('hasPhoneNum', '1');
          errorFun(errorMsg);
        })
       }
    });
  },
  getDataFun(){
    let that = this;
    discoverApi.getThemeOrBusiness({
      mp_openid: wx.getStorageSync('openid'),
      type: 2
    }, function (suc) {
      if (suc.data.result == 0) {
        that.setData({
          typeArr: suc.data.data[0].list
        })
      }
    }, function (err) {
      //console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that =this;
    if (wx.getStorageSync('hasPhoneNum')=='0'){
      that.setData({
        showApply:true
      })
    }else{
      that.setData({
        showApply: false
      });
    }
    that.setData({
      typenum: options.type
    });
    if (that.data.typenum==1){
      that.getDataFun();
    }
    //console.log(options.type)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})