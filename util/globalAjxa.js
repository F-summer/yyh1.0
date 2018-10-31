var conf = {
  serverHost: 'https://www.yaobc.info/api/yyh/'
  //serverHost: 'http://www.1100111.net/api/yyh/'
  
};
var serverGlobal = {
  request: function (param) {
    wx.request({
      url: param.url, //仅为示例，并非真实的接口地址
      data: param.data,
      method: param.method || 'POST',
      header: {
        'content-type': param.contType || 'application/json'
      },
      success: function (res) {
        //console.log(res) 
        //成功调用正确数据
        if (res.data.result === 0 || res.data.statusCode===0) {
          typeof param.success === 'function' && param.success(res, res.data.msg);
        } else {
          typeof param.error === 'function' && param.error(res.data.message);
        }
        //console.log(res.data)
      },
      fail: function (err) {
        typeof param.error === 'function' && param.error(err);
      }
    })

    //requestTask.abort()
  },
  getServerUrl: function (path) {
    return conf.serverHost + path;
  },
  uploadFile: function (param) {
    for (var i in param.src) {
      console.log(param.src[i])
      wx.uploadFile({
        url: param.url,
        filePath: param.src[i],
        name: param.name,
        header: {
          "Content-Type": "multipart/form-data"
        },
        success: function (res) {
          console.log(res)
          res.data = JSON.parse(res.data)
          //成功调用正确数据
          if (res.data.result === 0 || res.statusCode===0)  {
            typeof param.success === 'function' && param.success(res, res.data.msg);
          } else {
            // console.log(res.data)
            typeof param.error === 'function' && param.error(res.data.msg);
          }
          //console.log(res.data)
        },
        fail: function (err) {
          console.log(err)
          typeof param.error === 'function' && param.error(err);
        }
      })
    };
  }
}

module.exports.serverGlobal = serverGlobal;