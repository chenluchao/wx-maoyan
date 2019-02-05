// pages/movieIntroduce/movieIntroduce.js
var api = require("../../request/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
	  detailMovie:[],
	  hotComments:[],
	  ellipsis: true,
  },
  // 文本点击展开收起
  ellipsis: function () {
    var value = !this.data.ellipsis;
    this.setData({
      ellipsis: value
    })
  },
  goBuyMovie:function(){
	wx.navigateTo({
		url: "../movieDetail/movieDetail"
	})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  var self = this;
	  var movie_Id=wx.getStorageSync("Maoyan_movieId")
	   // var url = "http://m.maoyan.com/ajax/detailmovie";
	   var url = api.movieDetailUrl
	  wx.request({
	  	url: url,
	  	data: {
	  		movieId:movie_Id
	  	},
	  	header: {
	  		'content-type': 'application/json' // 默认值
	  	},
	  	success(res) {
// 			console.log("movieIntroduce")
// 			console.log(res)
			var detailMovie=res.data.detailMovie
			detailMovie.img = detailMovie.img.replace("w.h", "128.180")
			// console.log(detailMovie);
	  		self.setData({
	  			detailMovie: detailMovie
	  		})
	  	}
	  })
	  
	  // var url = "http://m.maoyan.com/review/v2/comments.json";
	  var url = api.commentsUrl
	  	  wx.request({
	  	  	url: url,
	  	  	data: {
	  	  		movieId:movie_Id
	  	  	},
	  	  	header: {
	  	  		'content-type': 'application/json' // 默认值
	  	  	},
	  	  	success(res) {
// 	  			console.log("res")
// 	  			console.log(res)
	  			var hotComments=res.data.data.hotComments
	  	  		self.setData({
	  	  			hotComments: hotComments
	  	  		})
				// console.log(hotComments)
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