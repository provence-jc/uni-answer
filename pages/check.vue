<template>
	<div class="check-con">
		<p class="check-con-info" v-if="back">请退出</p>
	</div>
</template>

<script>
	export default {
		name: 'check',
		data() {
			return {
				back: false,
				usercode: null,
				scene: null
			};
		},
		onLoad: function(query) {
			var that = this
			// scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
			let scene = decodeURIComponent(query.scene)
			console.log(scene)
			if (Number(scene)) {
				that.scene = scene
			} else {
				that.scene = 1
			}
			wx.login({
				success(res) {
					console.log('code:' + res.code)
					that.usercode = res.code
					if (that.scene && that.usercode) {
						uni.setStorageSync('sc',that.scene)
						console.log(11)
						that.getdata()
					}
					// that.globalData.code = res.code
					// if (that.globalData.codeCallback) { //判断app.js中是否存在该回调函数，也就是是否存在改方法
					// 	that.globalData.codeCallback(res.code);
					// }
				}
			})

			// const app = getApp()
			// app.globalData.newscene = this.scene
			// //判断是用户是否绑定了，也就是判断全局变量employId 是否存在
			// if (app.globalData.code === '') {
			// 	app.globalData.codeCallback = (code) => {
			// 		that.usercode = code
			// 		that.getdata()
			// 	}
			// } else { //不存在，则在app实例中创建创建codeCallback方法，且该方法带参数employId
			// 	that.usercode = app.globalData.code
			// 	that.getdata()
			// }
		},
		methods: {
			getdata() {
				var that = this
				console.log('scene:' + this.scene)
				console.log('code:' + this.usercode)
				// 发起网络请求
				wx.request({
					url: 'https://oea.fuhaoyun.cn/mp',
					method: 'POST',
					data: {
						code: this.usercode,
						activity: this.scene
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						console.log(res)
						console.log('stastus:' + res.data.code)
						console.log('unionid:' + res.data.data.unionId);
						let unionid = res.data.data.unionid || res.data.data.unionId
						console.log(unionid)
						that.arr = JSON.stringify(res)
						
						uni.setStorageSync('unionid', unionid)
						let code = res.data.code
						if (code === 200) {
							that.back = false;
							uni.navigateTo({
								url: 'home'
							});
						} else if (code === 400 && res.data.msg === 'already attend') {
							uni.request({
								url: 'https://oea.fuhaoyun.cn/rank',
								method: 'POST',
								data: {
									activity: that.scene,
									unionid: unionid
								},
								success(res) {
									console.log(res)
									uni.setStorageSync('rankdata',JSON.stringify(res))
									uni.navigateTo({
										url: 'ranking'
									});
								}
							})
						} else {
							that.back = true;
							uni.showModal({
								title: '网络错误，请关闭小程序后台并重新扫码',
								showCancel: false
							});
						}

					}
				})
			}
		}
	};
</script>

<style lang="scss">
	.check-con {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		.check-con-info {
			margin-top: 75rpx;
			font-size: 30rpx;
			text-align: center;
		}
	}

	.el-message-box__wrapper {
		display: flex;
		justify-content: center;
		align-items: center;

		.messageBox-prompt-test {
			width: 85%;
			// position: absolute;
			// top: 50%;
			// left: 50%;
			// margin: 0 !important;
			// transform: translate(-50%, -50%);
		}
	}
</style>
