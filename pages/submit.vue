<template>
	<div class="submit">
		<div class="submit-input">
			<p class="submit-input-info">您的姓名</p>
			<br />
			<input type="text" class="input" v-model="name" @change="namechange" />
			<br />
			<p class="submit-input-info">您的性别</p>
			<br />
			<radio-group name="gender" @change="genderval" class="checkgender">
				<label>
					<radio :value="1" checked="true" class="gebder-man">男</radio>
					<radio :value="2">女</radio>
				</label>
			</radio-group>
			<br />
			<p class="submit-input-info">您的电话</p>
			<br />
			<input type="tel" class="input" v-model="tel" @change="telchange" />
			<br />
		</div>
		<div class="btn">
			<button class="btn-submit" @click="btnsubmit">提&nbsp;交</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'submit',
		data() {
			return {
				name: null,
				gender: 1,
				tel: null,
				nameval: 0,
				telval: 0,
				times: '',
				datas: null,
				score: '',
				activity: null,
				unionid: null,
				res: null

			};
		},
		created() {
			this.datas = JSON.parse(uni.getStorageSync('newques'));
			console.log(this.datas);
			this.times = uni.getStorageSync('times');
			console.log(this.times)
			this.score = uni.getStorageSync('score');
			this.activity = uni.getStorageSync('sc')
			console.log(typeof(this.activity));
			this.unionid = uni.getStorageSync('unionid');
		},
		methods: {
			btnsubmit() {
				if (!/^[\u4E00-\u9FA5]{2,4}$/.test(this.name) || this.nameval === 0) {
					uni.showModal({
						title: '请填写正确的名字',
						showCancel: false
					});
					return;
				}
				if (!/^1[34578]\d{9}$/.test(this.tel) || this.telval === 0) {
					uni.showModal({
						title: '请填写正确的电话号码',
						showCancel: false
					});
					return;
				}

				// 请求
				let data = {};
				let roll = {};
				for (let i = 0; i < this.datas.length; i++) {
					const index = this.datas[i].id;
					roll[index] = this.datas[i].userneed;
				}
				console.log(roll);
				let newroll = JSON.stringify(roll);
				console.log(newroll)
				data.roll = newroll;
				data.seconds = this.times;
				data.score = this.score;
				data.phone = this.tel;
				data.gender = this.gender;
				data.name = this.name;
				data.activity = this.activity
				console.log(data.activity)
				data.unionid = this.unionid
				console.log(data.unionid)
				console.log(this.name);
				uni.setStorageSync('name', this.name);
				uni.setStorageSync('tel', this.tel);
				console.log(data);
				console.log(roll);
				// let postdata = this.$qs.stringify(data);
				// console.log(postdata);
				var that = this
				uni.request({
					url: 'https://oea.fuhaoyun.cn/receive',
					method: 'POST',
					data: data,
					success(res) {
						console.log(res)
						if (res.data.code === 200) {
							uni.setStorageSync('ranklist', JSON.stringify(res));
							uni.navigateTo({
								url: 'ranking'
							})
						} else if (res.data.code === 201) {
							uni.showModal({
								title: '你已参加过本次活动',
								showCancel: false
							});
						} else {
							uni.showModal({
								title: '网络错误，请关闭小程序后台并重新扫码',
								showCancel: false
							});
						}
					}
				})
			},
			namechange() {
				this.nameval = 1;
			},
			genderval(evt) {
				console.log(typeof(evt.detail.value));
				this.gender = evt.detail.value
			},
			telchange() {
				this.telval = 1;
			}
		}
	};
</script>

<style scoped lang="scss">
	.submit-input {
		padding: 50rpx;
	}

	.submit-input-info {
		font-size: 34rpx;
		line-height: 50rpx;
		margin: 20rpx;
	}
    .checkgender{
		margin-left: 18rpx;
	}
	.gebder-man {
		margin-right: 60rpx;
	}

	p.submit-input-info:after {
		content: '* ';
		color: red;
	}

	.input {
		display: block;
		padding-left: 20rpx;
		margin-bottom: 50rpx;
		height: 90rpx;
		border-radius: 20rpx;
		border: 2rpx solid #ededed;
		text-indent: 20rpx;
		box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
		-webkit-appearance: none;
	}

	radio {
		margin-bottom: 50rpx;
	}

	.btn {
		height: 110rpx;
		display: flex;
		justify-content: space-around;

		.btn-submit {
			height: 80rpx;
			width: 300rpx;
			font-size: 30rpx;
			color: #fff;
			background-color: #2571fb;
			border: none;
			border-radius: 50rpx;
			line-height: 80rpx;

		}
	}
</style>
