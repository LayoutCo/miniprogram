//dashi.js
//获取应用实例
const app = getApp<IAppOption>()
var tabbar = require('../../tabbar/tabbar.js');
Page({
  data: {
    userInfo: {},
    imgUrls: [
      {
        url:'https://2018-xian.oss-cn-hangzhou.aliyuncs.com/article/banner1.jpg',
        id:1
      },{
        url:  'https://2018-xian.oss-cn-hangzhou.aliyuncs.com/article/banner2.jpg',
        id:2
      },{
        url:  'https://2018-xian.oss-cn-hangzhou.aliyuncs.com/article/banner3.jpg',
        id:3
      }

    ],
    dashiImg:'https://2018-xian.oss-cn-hangzhou.aliyuncs.com/guest/dashi.jpg',
    posterUrl:'https://2018-xian.oss-cn-hangzhou.aliyuncs.com/video/poster.jpg',
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    hasUserInfo: false,
    loadingHidden: false,
    imgheights:240,
    itemheights:240,
    videoheight:240,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openId: null,
    disabled: false,
    plain: false,
    loading: false,
    winWidth: 0,
    winHeight: 0,
    currentTab: '0',
    actData: []
  },
  //事件处理函数
  skdDetail: function(e:any) {
    var currentPage = getCurrentPages();
    wx.navigateTo({
      url: '../detail/detail?id=' + JSON.stringify(e.currentTarget.dataset.id), //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
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
  swichNav: function(e:any) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  setDisabled: function(e:any) {
    this.setData({
      disabled: !this.data.disabled
    })
  },
  setPlain: function(e:any) {
    this.setData({
      plain: !this.data.plain
    })
  },
  setLoading: function(e:any) {
    this.setData({
      loading: !this.data.loading
    })
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  imageLoad: function(e:any) {
    if(this.data.imgheights!==240){
      return;
    }
    //获取图片真实宽度
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比
      ratio = imgwidth / imgheight;
    //计算的高度值
    var viewHeight = this.data.winWidth / ratio;
    this.setData({
      imgheights: viewHeight
    })
  },
  onShareAppMessage: function () {
    return {
      title: '西安全球创意大会',
      desc: '大师班',
      path: '/page/dashi/dashi'
    }
  },
  onLoad: function() {
    var that = this;

    tabbar.tabbar("tabBar", 0, that);

    wx.getSystemInfo({
      success: function(res) {
        var viewHeight = res.windowWidth*0.3;
        var videoHeight = (res.windowWidth-40)/16*9;
        that.setData({
          itemheights: viewHeight,
          videoheight: videoHeight,
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
      };

      app.openIdCallback = (openid: any) => {
        this.setData({
          openId: openid,
        });
      };
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
            if("5"==oridata[i].category){
              oridata[i].content= JSON.parse(oridata[i].content);
              actdata.push(oridata[i]);
            }
        }
        that.setData({
          actData: actdata,
          loadingHidden: true
        });
      }
    })
  }
})
