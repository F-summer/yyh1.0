var QQMapWX = require('util/qqmap-wx-jssdk.js');
const loginApi = require("service/login.js").allServerApi;
const errorFun = require("util/errorMsg.js");
App({

  globalData: {
    userInfo: null,
    postUrl: 'https://www.sblyyh.xyz/api/sp/api.ashx?action=',

    postUrlTwo: 'https://www.sblyyh.xyz/api/mp/api.ashx?action=',

    /* postUrl: 'http://localhost:55708/api/sp/api.ashx?action=',  */

    /*获取新闻*/
    News: '48a63e63-576a-40fb-bd40-5c54bb074fa1',
    /*用户登录*/
    Login: 'f2971551-cae6-4810-94ec-fbcaeeb3763e',
    /*数据解密*/
    AESDecrypt: '20b735bc-6482-4614-9053-19651ab9244f',
    /*获取文章url*/
    NewsUrl: '2afe046a-c83a-4ac2-ae1a-69a2776b0b45',
    openid: wx.getStorageSync('openid'),
    addressRes: wx.getStorageSync('addressRes')||"定位失败"
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  //定位
  locationFunMore() {
    var that = this
    //1、获取当前位置坐标
    wx.getSetting({
      success(res) {
        if (res.authSetting["scope.userLocation"] == true) {
          console.log("用户已开启定位授权");
        } else{
          wx.showModal({
            title: '位置信息授权',
            content: '位置授权暂未开启，无法加入本地群',
            confirmText: '开启授权',
            confirmColor: '#345391',
            cancelText: '仍然拒绝',
            cancelColor: '#999999',
            success: function (res) {
              if (res.confirm) {
                //that.locationFunMore();
                wx.openSetting({
                  success(res) {
                    console.log(res.authSetting)
                    res.authSetting = {
                      "scope.userLocation": true
                    }
                    that.locationFun();
                  }
                })
              }
              if (res.cancel) {
                wx.showModal({
                  title: '加入本地群将失败',
                  content: '无法使用定位权限，加入本地群失败',
                  confirmText: '太遗憾了',
                  confirmColor: '#345391',
                  showCancel: false
                })
              }
            }
          })
        }
        
      }
    })
    
  },
  locationFun(){
    //定位地址
    var that = this
    // 实例化腾讯地图API核心类
    var qqmapsdk = new QQMapWX({
      key: 'IIDBZ-BZCC6-XVLSJ-E2CJM-N52RE-W2FER' // 必填
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //console.log(res)
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            //console.log(addressRes)
            let address = addressRes.result.address_component.province;
            wx.setStorageSync('addressRes', address);
            console.log(wx.getStorageSync("addressRes"))
            // console.log(addressRes.result.address_component.nation)
            if (wx.getStorageSync('openid')) {
              loginApi.sendMyPlace({
                mp_openid: wx.getStorageSync('openid'),
                latitude: res.latitude,
                longitude: res.longitude,
                country: addressRes.result.address_component.nation,
                province: addressRes.result.address_component.province,
                city: addressRes.result.address_component.city
              }, function (successMsg) {
                //console.log(successMsg)
              }, function (errorMsg) {
                errorFun(errorMsg)
              })
            }
          }
        })
      }
    });
  }
})