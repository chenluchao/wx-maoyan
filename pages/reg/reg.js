// pages/reg/reg.js
var validate = require("../../lib/validate.js")
var api = require("../../request/api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
		step:1,
		mobile:"",
		isComfirm:true,
		code:"",
		password:"",
		rePassword:""
  },
	dealInput(e){
		var value = e.detail.value
        var key = e.currentTarget.dataset.key
        var dict = {}
        dict[key] = value
        //每次输入检测, 如果手机号对, 改样式
        if (key == "mobile") {
            //console.log("检测1次")
            if (validate.checkMobile(value)) {
                //console.log("改样式")
                this.setData({
                    isMobileTwoValidate: true
                })
            } else {
                this.setData({
                    isMobileTwoValidate: false
                })
            }
        }
        this.setData(dict)
	},
	checkboxChange(e){
		//console.log(e)
		if(e.detail.value.length>0){
			this.setData({
				isComfirm:true
			})
		}else{
			//isComfirm
			this.setData({
				isComfirm: false
			})
		}
	},
	dealGetSms(){
		//signupUrl
		var self = this
		var url = api.signupUrl
		wx.request({
			url: url, // 仅为示例，并非真实的接口地址
			method: "post",
			data: {
				mobile: this.data.mobile
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success(res) {
				console.log(res.data)
				if (res.data.status == 0) {
					wx.showModal({
						title: '提示',
						content: '验证码发送失败,错误信息：' + res.data.message,
						showCancel: false,
						success(res) {
							if (res.confirm) {
								// console.log('确定')
							}
						}
					})
				} else {
					wx.showModal({
						title: '提示',
						content: '验证码发送成功(' + res.data.data.code+')',
						showCancel: false,
						success(res) {
							if (res.confirm) {
								// console.log('确定')
								self.setData({
									step:2
								})
							}
						}
					})
				}
			}
		})
	},
	dealCheckSms(){
		var self = this
		var url = api.signupCheckUrl
		wx.request({
			url: url, // 仅为示例，并非真实的接口地址
			method: "post",
			data: {
				mobile: this.data.mobile,
				code: this.data.code
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success(res) {
				console.log(res.data)
				if (res.data.status == 0) {
					wx.showModal({
						title: '提示',
						content: '输入验证码错误,错误信息：' + res.data.message,
						showCancel: false,
						success(res) {
							if (res.confirm) {
								// console.log('确定')
							}
						}
					})
				} else {
					self.setData({
						step: 3
					})
				}
			}
		})
	},
	dealSignup(){
		//检查密码
		if (!validate.checkPassword(this.data.password, 6, 20)) {
			wx.showModal({
				title: '提示',
				content: '密码格式错误,6~20位字符',
				showCancel: false,
				success(res) {
					if (res.confirm) {
						// console.log('确定')
					}
				}
			})
			return
		}
		//检查重复密码
		if (!validate.checkPassword(this.data.rePassword, 6, 20)) {
			wx.showModal({
				title: '提示',
				content: '确定密码格式错误,6~20位字符',
				showCancel: false,
				success(res) {
					if (res.confirm) {
						//console.log('确定')
					}
				}
			})
			return
		}
		//密码和重复密码不一致
		if (this.data.password != this.data.rePassword) {
			wx.showModal({
				title: '提示',
				content: '重复密码和密码输入不一致',
				showCancel: false,
				success(res) {
					if (res.confirm) {
						//console.log('确定')
					}
				}
			})
			return
		}
		//真正的注册
		//signupSetPasswordUrl
		var self = this
		var url = api.signupSetPasswordUrl
		wx.request({
			url: url, // 仅为示例，并非真实的接口地址
			method: "post",
			data: {
				mobile: this.data.mobile,
				code: this.data.code,
				password: this.data.password
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success(res) {
				//console.log(res.data)
				if (res.data.status == 0) {
					wx.showModal({
						title: '提示',
						content: '注册失败,错误信息：' + res.data.message,
						showCancel: false,
						success(res) {
							if (res.confirm) {
								//console.log('确定')
							}
						}
					})
				} else {
					wx.showModal({
						title: '提示',
						content: '注册成功,是否跳转到登录界面?',
						success(res) {
							if (res.confirm) {
								//console.log('确定')
								wx.navigateTo({
									url: '/pages/login2/mine',
								})
							}
						}
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