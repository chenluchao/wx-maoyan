// pages/cinema/cinema.js
var api = require("../../request/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
		cinemas:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		this.downloadData()
  },
	downloadData(){
		var self = this;
		var url = api.cinemaListUrl
		wx.request({
			url:url,
			data:{
				
			},
			header:{
				'content-type':'application/json'
			},
			success(res){
				//console.log(res.data.cinemas)
				self.setData({
					cinemas:res.data.cinemas
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