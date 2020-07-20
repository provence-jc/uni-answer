<template>
	<div class="container" :style="{background: 'url('+'http://oea.fuhaoyun.cn/storage/'+back_pic+') no-repeat',backgroundSize:'100% 100%'}">
		<div class="wrapper">
			<div class="title">{{ title }}</div>
			<div class="subtitle">{{ sub_title }}</div>
			<div class="time">答题时间 {{ begin }} 到 {{ end }}</div>
			<div class="tips">
				<div class="tips-title">{{instruction_title}}</div>
				<div class="tips-text">
					<span v-for='(item,index) of instruction' :key='index'>{{index+1}}.{{item}}<br />
					</span>
				</div>
			</div>
			<div class="prize">
				<div class="prize-title">{{award_title}}</div>
				<div class="prize-text">
					<span v-for="(item, index) in award" :key="index">
						{{ item.level }}
						<span class="keynode">{{ item.num }}</span>
						个：奖品为
						<span class="keynode">{{ item.name }}</span><br />
					</span>
					<span class="address">
						奖品领取地址：
						<span class="keynode">{{ address }}</span>
					</span><br />
					<span>{{ sponsor }}</span>
				</div>
			</div>
			<div class="startbtn"><button class="btn" @click="start">开始答题</button></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'home',
		data: function() {
			return {
				address: null,
				award_title: null,
				award: null,
				back_pic: null,
				begin: null,
				end: null,
				instruction: null,
				instruction_title: null,
				num: null,
				sponsor: null,
				sub_title: null,
				title: null,
				scene: null
			}
		},
		onLoad: function() {
			var that = this
			this.scene = uni.getStorageSync('sc')
			this.$http.get('https://oea.fuhaoyun.cn/send?activity=' + this.scene).then(res => {
				console.log(res)
				console.log(res.data.data.questions)
				let data = res.data.data.rules
				this.address = data.address
				this.award_title = data.award_title
				this.back_pic =data.back_pic
				this.begin = data.begin
				this.end = data.end
				this.instruction = data.instruction
				this.instruction_title = data.instruction_title
				this.num = data.num
				this.sponsor = data.sponsor
				this.sub_title = data.sub_title
				this.address = data.address
				this.title = data.title
				uni.setStorageSync('title',this.title)
				this.award = data.award
				console.log(this.award)
				this.award.forEach(item => {
					switch (item.level) {
						case 1:
							item.level = '一等奖'
							break
						case 2:
							item.level = '二等奖'
							break
						case 3:
							item.level = '三等奖'
							break
						case 4:
							item.level = '四等奖'
							break
						case 5:
							item.level = '五等奖'
							break
						case 6:
							item.level = '六等奖'
							break
					}
				})
				this.award[this.award.length-1].level = '幸运奖'
				uni.setStorageSync('questions', JSON.stringify(res.data.data.questions))
				// uni.setStorageSync('activity', res.data.data.rules.activity)
				uni.setStorageSync('info', res.data.data.rules.info)
				console.log(this.award)
			})
		},
		methods: {
			start() {
				uni.navigateTo({
					url: 'index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		// position: absolute;
		min-height: 100vh;
	}

	.title {
		font-size: 46rpx;
		text-align: center;
		padding-top: 23rpx;
	}

	.subtitle {
		font-size: 38rpx;
		text-align: center;
		line-height: 75rpx;
	}

	.time {
		font-size: 30rpx;
		text-align: center;
	}

	.tips,
	.prize {
		padding-top: 38rpx;
		margin: 0 auto;
		width: 620rpx;

		.tips-text,
		.prize-text {
			padding-top: 23rpx;
			font-size: 26rpx;
			line-height: 48rpx;
		}
	}

	.tips-title,
	.prize-title {
		width: 165rpx;
		height: 46rpx;
		border-radius: 46rpx;
		background-color: #58897e;
		text-align: center;
		font-size: 30rpx;
		color: #fff;
	}

	.address {
		display: inline-block;
		margin-top: 23rpx;
	}

	.keynode {
		color: #e2a642;
		font-weight: 600;
	}

	.startbtn {
		margin-top: 75rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn {
		width: 675rpx;
		height: 112.5rpx;
		background-color: #e2a642;

		border-radius: 7.5rpx;
		border: none;
		color: #fff;
		font-size: 32rpx;
		line-height: 112.5rpx;
	}
</style>
