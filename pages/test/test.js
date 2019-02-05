// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	   ellipsis: true,
	   imgUrls: [
		  "http://p0.meituan.net/148.208/movie/ec30a55b1b20e7b8621bfb7682b530f9568248.jpg",
		  "http://p1.meituan.net/148.208/movie/70147090b78af5ab17c04c60889d42fe729655.jpg",
		  "http://p1.meituan.net/148.208/movie/616cd50a33550a9225ac781e52d14ae54967551.jpg"
		],
		indicatorDots: false,
		autoplay: false,
		interval: 5000,
		duration: 1000
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  animationfinish(e){
	  console.log(e)
	  console.log("运动结束")
  },
  
  
  
  
  ellipsis: function () {  
    var value = !this.data.ellipsis;
    this.setData({
      ellipsis: value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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