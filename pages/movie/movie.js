// pages/movie/movie.js
var api = require("../../request/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
		showIndex:1,
		movieOnInfoList:[],
		mostExperted:[],
		comingList:[],
		city:{
			id:1,
			nm:"北京"
		}
  },
	dealChange(e){
		var tag = e.currentTarget
		var index = tag.dataset.index
		
		this.setData({
			showIndex:index
		})
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
		//正在上映
    var url = api.movieOnInfoListUrl;
    wx.request({
      url: url,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var list = res.data.movieList
				console.log("movieOnInfoList")
				console.log(list)
        for(var item of list){
          item.img = item.img.replace("w.h","128.180")
        }
        self.setData({
          movieOnInfoList: list
        })
      }
    })
		//最受期待
    var url = api.mostExpectedUrl;
    wx.request({
    	url: url,
    	data: {
    		x: '',
    		y: ''
    	},
    	header: {
    		'content-type': 'application/json' // 默认值
    	},
    	success(res) {
    		var list = res.data.coming
				console.log("mostExperted list")
				console.log(list)
    		for(var item of list){
    			item.img = item.img.replace("w.h","128.180")
    		}
    		self.setData({
    			mostExperted: list
    		})
    	}
    })
		
		//即将上映
    var url = api.comingListUrl
    wx.request({
      url: url, // 仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var list = res.data.coming
				console.log("comingList")
				console.log(list)
        for (var item of list) {
          item.img = item.img.replace("w.h", "128.180")
        }
        self.setData({
          comingList: list
        })
      }
    })
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
		
		var city = wx.getStorageSync("Maoyan_selectCity")
		if(city){
			this.setData({
				city:city
			})
		}

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})