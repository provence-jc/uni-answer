<template>
	<div class="container">
		<div class="title"><p>洛阳市洛龙区第1期答题活动</p></div>
		<div class="wrapper">
			<div class="wrap-title"><p>答题解析</p></div>
			<div class="topic" v-for="(items, index) of questions" :key="index">
				<p class="topic-top">第{{ index + 1 }}题</p>
				<p class="topic-text">{{ items.title }}</p>
				<ul class="topic-list" v-if="items.type === 1 || items.type === 3">
					<li v-if="items.type === 1" v-for="(value, i, index) in items.options" :key="index">
						<span class="topic-list-text">{{ i }}&nbsp&nbsp&nbsp{{ value }}</span>
						<div v-if="pk(items.correct, i)" class="topic-list-correct">正确</div>
					</li>
					<li v-if="items.type === 3" v-for="(value, i, index) in items.options" :key="index">
						<text>{{ i }}</text>
						<image class="img" :src="'http://oea.fuhaoyun.cn/storage/' + value" mode="aspectFit"></image>
						<div v-if="pk(items.correct, i)" class="topic-list-correct">正确</div>
					</li>

					<div class="parsing">
						<span class="useranswer">您的答案是：{{ items.userneed }}</span>
						<br />
						<span class="parsing-info">答案解析：</span>
						<br />
						<span class="parsing-text">{{ items.analyze }}</span>
					</div>
				</ul>
				<ul class="topic-list" v-if="items.type === 2">
					<li v-for="(value, i, index) in items.options" :key="index">
						<span class="topic-list-text">{{ i }}&nbsp&nbsp&nbsp{{ value }}</span>
						<div v-if="pk(items.correct, i)" class="topic-list-correct">正确</div>
					</li>
					<div class="parsing">
						<span class="useranswer">您的答案是：{{ items.userneed }}</span>
						<br />
						<span class="parsing-info">答案解析：</span>
						<br />
						<span class="parsing-text">{{ items.analyze }}</span>
					</div>
				</ul>
			</div>
			<div class="btn"><button class="subbtn" @click="btnclick">提交个人信息&nbsp;&nbsp;&nbsp;&nbsp;查看排名</button></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'parsing',
	data() {
		return {
			time: 20, // 倒计时
			times: 0, // 答题计时
			score: 0,
			datas: null,
			// userneed: null,
			// title:'',
			// optines: {},
			// correct:''
			current: 1,
			questions: [],
			userneed: null
		};
	},
	created() {
		this.questions = JSON.parse(uni.getStorageSync('datas'));
		this.questions.forEach(item => {
			if (item.type === 2) {
				item.userneed = item.userneed.sort().join('');
			}
			return this.questions;
		});
	},
	methods: {
		pk(val, K) {
			if (val.indexOf(K) > -1) {
				return true;
			} else {
				return false;
			}
		},
		btnclick() {
			uni.setStorageSync('newques', JSON.stringify(this.questions));
			uni.navigateTo({
				url: 'submit'
			});
		}
	}
};
</script>

<style scoped lang="scss">
	.img {
		width: 50%;
		padding: 50rpx;
	}
.container {
	padding: 38rpx;
	background-color: #5490fe;
	.title p {
		font-size: 38rpx;
		color: #fff;
	}
}
.wrapper {
	background-color: #fff;
	margin-top: 46rpx;
	border-radius: 7rpx;
	padding-bottom: 38rpx;
	.wrap-title {
		height: 110rpx;
		padding-left: 23rpx;
		border-bottom: 2rpx solid #f1f1f1;
		p {
			font-size: 30rpx;
			line-height: 110rpx;
		}
	}
}
.topic {
	margin-top: 23rpx;
	padding: 0 38rpx;
	.topic-top {
		font-size: 30rpx;
		color: #c4c4c4;
		padding: 38rpx 0;
	}
	.topic-text {
		font-size: 36rpx;
	}
}
.topic-list {
	margin-top: 23rpx;
	font-size: 38rpx;
	line-height: 60rpx;
	margin-bottom: 75rpx;
	li {
		list-style: none;
		border: 2rpx solid #e6e6e8;
		padding: 15rpx;
		margin-top: 23rpx;
		border-radius: 4rpx;
		color: #606266;
		font-size: 30rpx;
		.topic-list-text{
			word-break:break-all
		}
		.topic-list-err {
			width: 110rpx;
			height: 60rpx;
			background-color: #fa6e53;
			float: right;
			border-radius: 7rpx;
			text-align: center;
			color: #fff;
		}
		.topic-list-correct {
			width: 110rpx;
			height: 60rpx;
			background-color: #00be6f;
			float: right;
			border-radius: 7rpx;
			text-align: center;
			color: #fff;
		}
	}
	.parsing {
		margin-top: 23rpx;

		.useranswer {
			color: red;
		}
		.parsing-text {
			font-size: 30rpx;
			color: #aeaeae;
		}
	}
}
.btn {
	display: flex;
	justify-content: center;
	margin-top: 75rpx;
	.subbtn {
		width: 525rpx;
		height: 90rpx;
		background-color: #6495ed;
		color: #ffffff;
		border: none;
		border-radius: 7rpx;
		font-size: 30rpx;
		line-height: 90rpx;
	}
}
</style>
