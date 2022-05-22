const app = getApp<IAppOption>()
var tabbar = require('../../tabbar/tabbar.js');
Page({
  data: {
    motto: [{
        id: 0,
        name: '分享名片',
        icon: '../../img/map.png'
      },
      {
        id: 1,
        name: '管理个人信息',
        icon: '../../img/msg.png'
      },
      {
        id: 3,
        name: '联系我们',
        icon: '../../img/contact.png'
      }
    ],
    bakImg:'https://2018-xian.oss-cn-hangzhou.aliyuncs.com/other/pub.jpg',
    userInfo: app.globalData.userInfo,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false
  },
  //事件处理函数
  listTap: function(e:any) {
    var id = e.currentTarget.dataset.tab;
    switch (id) {
      case 0:
      wx.navigateTo({
        url: '../trafic/trafic'
      });
        break;
      case 1:
        wx.navigateTo({
          url: '../publish/pub'
        });
        break;
      case 2:
      wx.navigateTo({
        url: '../food/food'
      });
        break;
      case 3:
      wx.navigateTo({
        url: '../contact/contact'
      });
        break;
      default:
        console.log("not get id");
    }
  },
  onLoad: function() {
    var that = this;

    tabbar.tabbar("tabBar", 3, that);


    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
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
  }
})
