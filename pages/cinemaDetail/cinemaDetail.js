// pages/cinemaDetail/cinemaDetail.js
var api = require("../../request/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
	  cinema:[],
	  movieList:[],
	  showOneMovie:[],
	  showIndex:0,
	  dealList:[]
  },
  dealChange(e){
  	var tag = e.currentTarget
  	var index = tag.dataset.index
  	
  	this.setData({
  		showIndex:index
  	})
  },
	clickMovie(e){
		console.log(e)
	},
  clickMovie(e){
		//console.log(e)
		var showOneMovie = e.currentTarget.dataset.movieone
		this.setData({
			showOneMovie: showOneMovie
		})
		console.log(this.data.showOneMovie)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  var cinemaDet = wx.getStorageSync("Maoyan_cinemeDet")
	  console.log(cinemaDet)
	  wx.setNavigationBarTitle({
		title: cinemaDet.nm
	})
	this.setData({
		cinema:cinemaDet
	});
	var self = this;
	var url = api.cinemaDetailUrl
	var cinema_Id=cinemaDet.id
	wx.request({
		url: url,
		data: {
			cinemaId:cinema_Id
		},
		header: {
			'content-type': 'application/json' // 默认值
		},
		success(res) {
			//console.log(res)
			var movieList=res.data.showData.movies
			var dealList=res.data.dealList.dealList
			for(var i=0;i<movieList.length;i++){
				movieList[i].img = movieList[i].img.replace("w.h", "128.180")
			}
			for(var j=0;j<dealList.length;j++){
				dealList[j].imageUrl = dealList[j].imageUrl.replace("w.h","128.180")
			}
			console.log(dealList)
			// console.log(movieList);
			self.setData({
				movieList: movieList,
				showOneMovie:movieList[0],
				dealList:dealList
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