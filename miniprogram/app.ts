// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    let that = this;
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // systemInfo
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.systemInfo = res
      }
    });
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})