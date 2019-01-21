// pages/login/login.js
var validate = require("../../lib/validate.js")
var api = require("../../request/api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
		showIndex:1,
		mobile:"13611112222",
		password:"",
		
		mobileTwo:"",
		code:"",
		isMobileTwoValidate:false
  },
	dealChange(e){
		var tag = e.currentTarget
		var index = tag.dataset.index
		this.setData({
			showIndex:index
		})
	},
	dealLogin(){
		var mobile = this.data.mobile
		var password = this.data.password
		
		//输入信息进行前端验证
		//手机号
		if(!validate.checkMobile(mobile)){
			wx.showModal({
				title:"提示",
				content:"您输入的手机号格式错误，重新输入",
				showCancel:false,
				success(res){
					if(res.confirm){
						//console.log('确定')
					}
				}
			})
			return
		}
		
		//密码6-20
		if(!validate.checkPassword(password,6,20)){
			wx.showModal({
				title: '提示',
				content: '密码格式错误,6~20位字符',
				showCancel: false,
				success(res) {
					if (res.confirm) {
						//console.log('确定')
					}
				}
			})
			return
		}
		//前端验证通过向后台请求数据
		var self = this
		var url = api.userPasswordLoginUrl
		wx.request({
			url:url,
			method:"post",
			data:{
				mobile:mobile,
				password:password
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success(res){
				//console.log(res.data)
				if(res.data.status==0){
					wx.showModal({
						title: '提示',
						content: '用户名或密码错误,请重新登录',
						showCancel: false,
						success(res) {
							if (res.confirm) {
								//console.log('确定')
							}
						}
					})
				}else{
					//登录成功
					//(1) 设置是否登录
					wx.setStorageSync("Maoyan_isLogin",1)
					wx.setStorageSync("Maoyan_user",res.data.data)
					wx.switchTab({
						url:"/pages/mine/mine"
					})
				}
			}
		})
	},
	dealInput(e){
		var value = e.detail.value
		var key = e.currentTarget.dataset.key
		var dict={}
		dict[key] = value
		
		//每次输入检查，如果手机号对该样式
		if(key == "mobileTwo"){
			if(validate.checkMobile(value)){
				this.setData({
					isMobileTwoValidate:true
				})
			}else{
				this.setData({
					isMobileTwoValidate:false
				})
			}
			
		}
		this.setData(dict)
	},
	sendSms(){
		if(!this.data.isMobileTwoValidate){
			console.log('非法操作，"获取验证码" 按钮为灰色')
			return
		}
		//向后台请求数据
		var self = this
		var url = api.mobileLoginCodeUrl
		wx.request({
			url: url, // 仅为示例，并非真实的接口地址
			method: "post",
			data: {
				mobile: this.data.mobileTwo
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success(res) {
				//console.log(res.data)
				if(res.data.status == 0){
					wx.showModal({
						title: '提示',
						content: '验证码发送失败 '+res.data.message,
						showCancel: false,
						success(res) {
							if (res.confirm) {
								//console.log('确定')
							}
						}
					})
				}else{
					wx.showModal({
						title: '提示',
						content: '验证码发送成功 ' + res.data.data.code,
						showCancel: false,
						success(res) {
							if (res.confirm) {
								//console.log('确定')
							}
						}
					})
				}
			}
		})
	},
	dealMobileLogin(){
		if(!this.data.isMobileTwoValidate){
			console.log('非法操作，"登录" 码按钮为灰色')
			return
		}
		var code = this.data.code
		// console.log("code="+code)
		if(!validate.checkCode(code)){
			wx.showModal({
					title: '提示',
					content: '验证码必须为4位数字 ',
					showCancel: false,
					success(res) {
						if (res.confirm) {//登录成功
							//console.log('确定')
						}
					}
				})
				return
		}
		//验证码的登陆
		var self = this
		var url = api.userMobileLoginUrl
		wx.request({
			url: url, // 仅为示例，并非真实的接口地址
			method: "post",
			data: {
				mobile: this.data.mobileTwo,
				code: code
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success(res) {
				//console.log(res.data)
				if (res.data.status == 0) {
					wx.showModal({
						title: '提示',
						content: '用户名或验证码错误,请重新登录',
						showCancel: false,
						success(res) {
							if (res.confirm) {
								//console.log('确定')
							}
						}
					})
				} else {
					//登录成功
					//(1) 设置是否登录
					wx.setStorageSync("Maoyan_isLogin", 1)
					wx.setStorageSync("Maoyan_user", res.data.data)
					wx.switchTab({
						url: "/pages/mine/mine"
					})
				}
			}
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