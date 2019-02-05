// pages/movieDetail/movieDetail.js
var api = require("../../request/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
	  detailMovie:[],
	  movieUrl:[],
	  dates:[],
	  showIndex:1
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
	  var movie_Id=wx.getStorageSync("Maoyan_movieId")
	   //var url = "http://m.maoyan.com/ajax/detailmovie";
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
			// console.log(res)
			var detailMovie=res.data.detailMovie
			detailMovie.img = detailMovie.img.replace("w.h", "128.180")
			// console.log(detailMovie);
	  		self.setData({
	  			detailMovie: detailMovie
	  		})
	  	}
	  })
	  
	  var url = api.movieUrl;
	  wx.request({
	  	url: url,
	  	data: {
	  		movieId:movie_Id,
			day:"2019-01-08",
			cityId:1
	  	},
	  	header: {
	  		'content-type': 'application/json' // 默认值
	  	},
	  	success(res) {
			// console.log(res)
			var movieUrl=res.data.cinemas
			var dates=res.data.showDays.dates
			// console.log(dates)
			// console.log(movieUrl);
	  		self.setData({
	  			movieUrl: movieUrl,
				dates:dates
	  		})
	  	}
	  })
	  
  },
  setCinemaDet(e){
	  // console.log(e.currentTarget.dataset.cinemadet)
	  var cinemeDet=e.currentTarget.dataset.cinemadet
	  wx.setStorageSync("Maoyan_cinemeDet",cinemeDet)
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