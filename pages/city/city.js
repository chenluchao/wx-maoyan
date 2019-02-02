// pages/city/city.js
var api = require("../../request/api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
		cts:[],
		group:[],
    //热门城市
    hot:[],
    //最近访问
    history:[],
    scrollId:"location",
    //0 - 没有开始定位
    //1 - 开始定位
    //2 - 定位成功
    //3 - 定位失败
    locationStatus:1,
		//定位
    locationCity:{}
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		this.downloadData()
  },
	downloadData(){
		var self = this;
		var url = api.cityListUrl
		wx.request({
			url:url,
			data:{},
			 header: {
        'content-type': 'application/json' // 默认值
      },
			success(res){
				console.log(res.data)
				self.setData({
					cts:res.data.cts,
					hot:res.data.hot
				})
				//处理城市分组
				self.dealCityGrouping()
				//开始定位
				self.startLocation()
				//获取历史城市
				if(wx.getStorageSync("Maoyan_historyCity")){
						var getHistory = wx.getStorageSync("Maoyan_historyCity")
						//console.log(getHistory)
					self.setData({
						history:getHistory
					})
					//console.log(self.data.history)
				}
			}
		})
	},
	
//处理城市分组
dealCityGrouping:function(){
	var group=[]
	for(var i=0;i<26;i++){
		var b = String.fromCharCode(65+i).toString()
		var s = String.fromCharCode(97+i).toString()
		group.push({
			b:b,
			s:s,
			list:[]
		})
	}
	//console.log(group)
	//遍历每个城市, 提取出每个城市拼音的第一个字符, 归类的当前数组中
	var cts = this.data.cts
	for(var i=0;i<cts.length;i++){
		var item = cts[i]
		var f = item.py.charAt(0);
		//根据第一个字符计算, 对应的数组的序号
      //  a 0     0=97-97
      //  b 1     1=98-97
      //  c 2			  ...
			var index = f.charCodeAt(0)-97
			//console.log("f ="+f+" index="+index)
			group[index].list.push(item)
	}
	//console.log(group)
	this.setData({
		group:group
	})
},

//开始定位
startLocation(){
	//console.log("开始定位")
    var self = this
		self.setData({
			locationStatus:1
		})
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log("longitude=" + longitude + " latitude=" + latitude)
        self.getCurrentCity(longitude, latitude)
      },
      fail(){
        self.setData({
          locationStatus:3
        })
      }
    })
  },
	//定位成功后对定位到的城市处理并显示到页面
	getCurrentCity(longitude, latitude){
		var self = this;
    var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=" + latitude + "," + longitude+"&output=json&pois=0"
		wx.request({
			url:url,
			data:{},
			header: {
        'content-type': 'application/json' // 默认值
      },
			success(res){
				//console.log(res.data)
				//数据格式：renderReverse&&renderReverse(对象)
        var str = res.data.substring("renderReverse&&renderReverse(".length, res.data.length-1)
				//console.log(str)
				var dict = JSON.parse(str)
				console.log(dict)
				var cityName = dict.result.addressComponent.city
				//去掉最后的字符 ”市“
				cityName = cityName.substring(0,cityName.length-1)
				//console.log("定位城市为"+cityName)
				//用城市名在cts数组中查找对象
				var findCity = null;
				for(var i=0;i<self.data.cts.length;i++){
					var city = self.data.cts[i]
					if(city.nm==cityName){
						findCity = city
						break;
					}
				}
				//console.log("发现cts中的定位城市")
				//console.log(findCity)
				self.setData({
					locationStatus:2,
          locationCity:findCity
				})
			},
			fail(){
				self.setData({
          locationStatus: 3
        })
			}
		})
	},
	
	//点击城市执行函数
	dealSelectCity(e){
		var item = e.currentTarget.dataset.item
		//console.log(item)
		//存储数据
		//类似 localStorage.setItem(key,value)
    wx.setStorageSync("Maoyan_selectCity",item)
		//存储最近访问城市
		var history = [];
		if(wx.getStorageSync("Maoyan_historyCity")){//如果已经有历史城市
			var getStorage = wx.getStorageSync("Maoyan_historyCity")
			//console.log(getStorage)
			for(var j=0;j<getStorage.length;j++){//循环将已有的Storage的数据遍历进history数组
				history.push(getStorage[j])
			}
			//去重
			var isRepeat = false;//设置isRepeat变量判断是否有重复 false-无重复| true-有重复
			for(var m=history.length-1;m>=0;m--){
				if(history[m].id==item.id){
					var repeat = history.splice(m,1)
					//console.log(repeat)
					isRepeat = true
					break;
				}
			}
			if(!isRepeat){
				history.unshift(item)
			}else{
				history.unshift(repeat[0])
			}
			if(history.length>6){
				history.pop()
			}
			wx.setStorageSync("Maoyan_historyCity",history)//将倒叙后的history_black设置为新的Storage
		}else{//没有历史城市
			history.push(item)
			wx.setStorageSync("Maoyan_historyCity",history)
		}
		//选择城市后返回上一界面
		wx.navigateBack({
      delta: 1
    })
	},
	dealNav(e){
		var id = e.currentTarget.dataset.id
		//console.log(id)
		this.setData({
			scrollId:id
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