//discover.js
//获取应用实例
const app = getApp<IAppOption>()
var tabbar = require('../../tabbar/tabbar.js');
Page({
  data: {
    guestInfo: [],
    actData: [],
    hasUserInfo: false,
    loadingHidden: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    disabled: false,
    plain: false,
    loading: false,
    winWidth: 0,
    winHeight: 0,
    currentTab: 0
  },
  //事件处理函数
  guestDetail: function(e:any) {
    var currentPage = getCurrentPages(),
        localStr = "guest";
        wx.setStorageSync(localStr, e.currentTarget.dataset.guest)
    var send = '../guest/guest?guest='+localStr
    wx.navigateTo({
      url:  send, //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
      success: function() {}, //成功后的回调；
      fail: function() {}, //失败后的回调；
      complete: function() {} //结束后的回调(成功，失败都会执行)
    });
  },
  skdDetail: function(e:any) {
    var currentPage = getCurrentPages(),
        localStr = "exhibition";
    wx.setStorageSync(localStr, e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + localStr, //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
      success: function() {}, //成功后的回调；
      fail: function() {}, //失败后的回调；
      complete: function() {} //结束后的回调(成功，失败都会执行)
    });
  },
  bindChange: function(e:any) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  onShareAppMessage: function () {
    return {
      title: '西安全球创意大会',
      desc: '展览单元',
      path: '/page/discover/discover'
    }
  },
  onLoad: function() {
    var that = this;

    tabbar.tabbar("tabBar", 1, that);

    wx.getSystemInfo({
      success: function(res) {
        var exHeights = (res.windowWidth-40)/2;
        that.setData({
          exHeights: exHeights,
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      }
    });
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.request({
      url: 'https://wxapp.gangqintonghuazhilv.com/api/guest/listing',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: { page_num: 0, page_size:99 },
      success: function (res){
        var extGuest=[],
            oridata = res.data.data;
        if("0000"==res.data.code){
          for (var i in oridata) {
              if("4"==oridata[i].state){
                extGuest.push(oridata[i]);
              }
          }
          that.setData({
            guestInfo: extGuest
          });

        }
      }
    });
    wx.request({
      url: 'https://wxapp.gangqintonghuazhilv.com/api/article/listing',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {
        page_num: 0,
        page_size: 999
      },
      success: function(res) {
        var actdata = [],
            oridata = res.data.data;
        for (var i in oridata) {
            if("6"==oridata[i].category){
              actdata.push(oridata[i]);
            }
        }
        that.setData({
          actData: res.data.data,
          loadingHidden: true
        });
      }
    })
  }
})
