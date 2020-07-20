<template>
	<div class="container">
		<div class="wrapper">
			<div class="topic" v-for="(items, index) of ques" :key="index">
				<p class="topic-text">{{ current }}.{{ items.title }}{{ items.type === 1 || items.type === 3 ? '（单选题）' : '（多选题）' }}</p>
				<radio-group class="topic-list" v-if="items.type === 1" @change="answerChange">
					<label v-for="(value, i, index) in items.options" :key="index">
						<view class="topic-item">
							<radio :value="i" color="#007AFF" />
							<text class="radio-text">{{ i }} {{ value }}</text>
						</view>
					</label>
				</radio-group>
				<checkbox-group class="topic-list" v-if="items.type === 2" @change="answerChange">
					<label v-for="(value, i, index) in items.options" :key="index">
						<view class="topic-item">
							<checkbox :value="i" color="#007AFF" />
							<text class="radio-text">{{ i }} {{ value }}</text>
						</view>
					</label>
				</checkbox-group>
				<radio-group class="topic-list" v-if="items.type === 3" @change="answerChange">
					<label v-for="(value, i, index) in items.options" :key="index">
						<view class="topic-item" :style="{height:'auto'}">
							<radio :value="i" color="#007AFF" />
							<text>{{ i }}</text>
							
							<image class="img" :src="'http://oea.fuhaoyun.cn/storage/'+value" mode="aspectFit"></image>
						</view>
					</label>
				</radio-group>
				<div class="btn">
					<button class="submit" @click="submitBtn">{{ button == 1 ? '下一题' : '提交答题，查看解析' }}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			time: 20, // 倒计时
			times: 0, // 答题计时
			score: 0, // 总分
			value: 0,
			answer: 0,
			button: 1,
			// optines: {},
			// correct:''
			current: 1,
			questions: null,
			ques: null,
			userneed: null,
			sort: 0,
			activity: null
		};
	},
	created() {
		// 获取数据
		// var s = setInterval(() => {
		//   this.times++
		// }, 1000);
		this.mounted();
		this.questions = JSON.parse(uni.getStorageSync('questions'));
		this.ques = this.questions.slice(0, 1);
	},
	methods: {
		get() {
			this.times++;
		},
		mounted() {
			this.timer = setInterval(this.get, 1000);
		},
		beforeDestroy() {
			clearInterval(this.timer);
		},
		answerChange(evt) {
			console.log(evt.detail);
			console.log(evt.detail.value);
			this.answer = 1;
			this.userneed = evt.target.value || ect.detail.value;
		},
		submitBtn() {
			if (this.answer === 0) {
				uni.showModal({
					title: '请选择答案',
					showCancel: false
				});
				return;
			}
			if (this.questions[this.current - 1].type === 2) {
				if (this.questions[this.current - 1].correct === this.userneed.sort().join('')) {
					this.score += this.questions[this.current - 1].score;
					
				}
			} else {
				if (this.questions[this.current - 1].correct == this.userneed) {
					this.score += this.questions[this.current - 1].score;
				}
			}
			this.questions[this.current - 1].userneed = this.userneed
			console.log(this.questions[this.current - 1].userneed)
			if (this.button == 0) {
				// 提交操作
				this.beforeDestroy();

				if (this.current >= this.questions.length) {
					uni.setStorageSync('score', this.score);
					uni.setStorageSync('times', this.times);
					uni.setStorageSync('datas', JSON.stringify(this.questions));
					console.log(this.questions)
					uni.navigateTo({
						url: 'parsing'
					});
				}
			} else {
				this.answer = 0;
				this.current++;
				this.sort++;
				let sort = this.sort;
				if (sort === this.questions.length) {
					this.ques = this.questions.slice(sort);
					console.log(this.ques);
				} else {
					this.ques = this.questions.slice(sort, sort + 1);
				}
				if (this.current === this.questions.length) {
					this.button = 0;
				}
			}
			console.log(this.score);
		}
	}
};
</script>

<style scoped lang="scss">
.wrapper {
	padding-bottom: 75rpx;
}
.img {
	padding: 50rpx;
}
.imagewrap {
	width: 90%;
}
// .header {
//   width: 100%;
//   height: 75rpx;
//   background-color: #6495ed;
//   color: #fff;
//   font-size: 38rpx;
//   line-height: 75rpx;
//   text-align: center;
// }
.topic {
	margin-top: 30rpx;
	padding: 0 50rpx;
	.topic-text {
		font-size: 36rpx;
	}
}
.topic-item {
	height: 90rpx;
	border: 2rpx solid #e5e5e5;
	display: flex;
	align-items: center;
	padding-left: 20rpx;
	margin: 15px 0;
	border-radius: 10rpx;
	.radio-text{
		word-break:break-all
	}
}
.btn {
	display: flex;
	justify-content: center;
	margin-top: 75rpx;
}
.submit {
	width: 450rpx;
	height: 90rpx;
	background-color: #6495ed;
	color: #ffffff;
	border: none;
	border-radius: 8rpx;
	font-size: 30rpx;
	line-height: 90rpx;
}
</style>
