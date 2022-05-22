// components/userInfo.ts

Component({
    data: {
      currentTab: 0,
      permissions: ['公开', '不可见', '好友可见', '好友与组可见'],
      index: {
        phone:0,
        mail:0,
        wx:0
      },
    },
    properties: {
    },
    methods:{
      bindPickerChange: function (e:any) {
        let set = e.target.dataset.index
        let ori:any = this.data.index
        ori[set] = e.detail.value
        console.log(ori)
        this.setData({
          index: ori
        })
      },
      swichNav: function(e:any) {
          var that = this;
          let current = that.data.currentTab;
      
          if (e.target.dataset.action === "next") {
              if(current+1>3){
                return 
              }
              that.setData({
                  currentTab: current+1
                })
          } else {
            if(current-1<0){
              return 
            }
            that.setData({
              currentTab: current-1
            })
          }
        }
    }
  })
  
