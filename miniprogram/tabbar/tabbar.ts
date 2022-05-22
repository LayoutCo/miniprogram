function tabbarinit() {
 return [
      { "current":0,
        "pagePath": "/pages/message/message",
        "iconPath": "/img/more3.png",
        "selectedIconPath": "/img/more2.png",
        "text": "消息中心"
      },
      {
        "current": 0,
        "pagePath": "/pages/discover/discover",
        "iconPath": "/img/plus3.png",
        "selectedIconPath": "/img/plus2.png",
        "text": "互动"
      },
      {
        "current": 0,
        "pagePath": "/pages/index/index",
        "iconPath": "/img/dashi3.png",
        "selectedIconPath": "/img/dashi2.png",
        "text": "通讯录"

      },
      {
        "current": 0,
        "pagePath": "/pages/user/user",
        "iconPath": "/img/user3.png",
        "selectedIconPath": "/img/user2.png",
        "text": "个人中心"
      }
    ]

}

//tabbar 主入口
function tabbarmain(bindName = "tabdata", id:any, target:any) {
  var that = target;
  var bindData:any = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain
}
