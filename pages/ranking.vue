<template>
	<div class="container">
		
		<div class="wrapper" @change='loadMore'>
			<div class="title">
				<p>{{title}}</p>
			</div>
			<div class="userranktitle">您当前的排名</div>
			<div class="ranking">
				<span class="rank-item"><span class="rank-num">{{ ranksort + 1 }}</span><span class="rank-name">{{ name }}{{ gender === 1 ? '先生' : '女士' }}</span><span class="rank-tel">
						{{ tel }}
					</span></span>
				<div class="rank-info">
					<p class="rank-score">{{ score }}分</p>
					<p class="rank-time">总用时：{{ times }}秒</p>
				</div>
			</div>
			<div class="ranktitle">排行榜</div>
			<div class="ranking" v-for="(item, index) in showlist" :key="index">
				<span class="rank-item"><span class="rank-num">{{ index + 1
          }}</span><span class="rank-name">{{ item.name }}{{ item.gender === 1 ? '先生' : '女士' }}</span><span
					 class="rank-tel">{{
            item.phone
          }}</span></span>
				<div class="rank-info">
					<p class="rank-score">{{ item.score }}分</p>
					<p class="rank-time">总用时：{{ item.seconds }}秒</p>
				</div>
			</div>
			<view class="info"><text class="infotext" v-show="showinfo">{{info}}</text></view>
			<button v-show="showbtn" type="default" @click="getCompleteList" class="loadmorebtn">查看完整排名</button>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'ranking',
		data() {
			return {
				data: null,
				title: null,
				testlist: [{
						gender: 1,
						id: 57,
						name: "胜多",
						phone: "13454315111",
						score: 4,
						seconds: 6,
						sort: 0,
					},
					{
						gender: 1,
						id: 57,
						name: "胜多",
						phone: "13454315111",
						score: 4,
						seconds: 6,
						sort: 0,
					},
					{
						gender: 1,
						id: 57,
						name: "胜多",
						phone: "13454315111",
						score: 4,
						seconds: 6,
						sort: 0,
					},
					{
						gender: 1,
						id: 57,
						name: "胜多",
						phone: "13454315111",
						score: 4,
						seconds: 6,
						sort: 0,
					},
					{
						gender: 1,
						id: 57,
						name: "胜多",
						phone: "13454315111",
						score: 4,
						seconds: 6,
						sort: 0,
					},
					{
						gender: 1,
						id: 57,
						name: "胜多",
						phone: "13454315111",
						score: 4,
						seconds: 6,
						sort: 0,
					}
				],
				list: null, // 总列表
				showlist: null, // 显示的列表
				listnum: 6, // 排行榜显示条数
				name: null,
				gender: null,
				tel: null,
				times: null,
				score: null,
				ranksort: 0, // 当前用户排名
				userdata: null,
				lastname: null,
				showbtn: true,
				info: null,
				showinfo: false
			}
		},
		onLoad: function() {
			this.title = uni.getStorageSync('title')
			console.log(11)
			var that = this
			if (uni.getStorageSync('ranklist')) {
				console.log(22)
				that.data = JSON.parse(uni.getStorageSync('ranklist'))
				that.getRankList()
			}
			if (uni.getStorageSync('rankdata')) {
				console.log(11)
				that.data = JSON.parse(uni.getStorageSync('rankdata'))
				that.getRankList()
			}
			console.log(this.data)
		},
		methods: {
			getRankList(){
				this.info = uni.getStorageSync('info');
				this.list = this.data.data.data.list
				this.ranksort = this.data.data.data.sort
				console.log(this.list);
				console.log(this.ranksort);
				let userdata = this.list[this.ranksort]
				console.log(userdata.name);
				let name = userdata.name
				this.name = this.getLastName(name)
				console.log(this.name);
				this.gender = userdata.gender
				this.tel = userdata.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
				this.times = userdata.seconds
				this.score = userdata.score
				this.list.forEach(item => {
					let lname = ''
					this.getLastName(item.name)
					// console.log(item.name);
					lname = this.lastname
					item.name = lname
					item.phone = item.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
					return this.list
				})
				this.showlist = this.list.slice(0, this.listnum)
				console.log(this.showlist);
				if(this.showlist.length <= this.listnum){
					this.showbtn = false
					this.showinfo = true
				}
			},
			
			getCompleteList () {
				this.showlist = this.list
				this.showbtn = false
				this.showinfo = true
			},
			getLastName(fullname) {
				let hyphenated = [
					'欧阳',
					'太史',
					'端木',
					'上官',
					'司马',
					'东方',
					'独孤',
					'南宫',
					'万俟',
					'闻人',
					'夏侯',
					'诸葛',
					'尉迟',
					'公羊',
					'赫连',
					'澹台',
					'皇甫',
					'宗政',
					'濮阳',
					'公冶',
					'太叔',
					'申屠',
					'公孙',
					'慕容',
					'仲孙',
					'钟离',
					'长孙',
					'宇文',
					'城池',
					'司徒',
					'鲜于',
					'司空',
					'汝嫣',
					'闾丘',
					'子车',
					'亓官',
					'司寇',
					'巫马',
					'公西',
					'颛孙',
					'壤驷',
					'公良',
					'漆雕',
					'乐正',
					'宰父',
					'谷梁',
					'拓跋',
					'夹谷',
					'轩辕',
					'令狐',
					'段干',
					'百里',
					'呼延',
					'东郭',
					'南门',
					'羊舌',
					'微生',
					'公户',
					'公玉',
					'公仪',
					'梁丘',
					'公仲',
					'公上',
					'公门',
					'公山',
					'公坚',
					'左丘',
					'公伯',
					'西门',
					'公祖',
					'第五',
					'公乘',
					'贯丘',
					'公皙',
					'南荣',
					'东里',
					'东宫',
					'仲长',
					'子书',
					'子桑',
					'即墨',
					'达奚',
					'褚师'
				]
				// console.log(fullname);
				let hyset = new Set(hyphenated)
				let vLength = fullname.length
				// 前为姓,后为名
				let lastname = ''
				let firstname = ''
				if (vLength > 2) {
					var preTwoWords = fullname.substr(0, 2)
					// 取命名的前两个字,看是否在复姓库中
					if (hyset.has(preTwoWords)) {
						firstname = preTwoWords
						lastname = fullname.substr(2)
					} else {
						firstname = fullname.substr(0, 1)
						lastname = fullname.substr(1)
					}
				} else if (vLength === 2) {
					// 全名只有两个字时,以前一个为姓,后一下为名
					firstname = fullname.substr(0, 1)
					lastname = fullname.substr(1)
				} else {
					firstname = fullname
				}
				return (this.lastname = firstname)
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		overflow-y: auto;
		padding: 38rpx;
		background-color: #409eff;

		.title p {
			font-size: 38rpx;
			color: #fff;
			margin-bottom: 40rpx;
			text-align: center;
		}
	}

	.wrapper {
		height: 100%;
		overflow-y: auto;
		margin-top: 15rpx;
		border-radius: 7rpx;

		.userranktitle {
			width: 90%;
			height: 220rpx;
			background: url("https://oea.fuhaoyun.cn/upload/images/oea_1.png") no-repeat center;
			background-size: 90% auto;
			text-align: center;
			line-height: 180rpx;
			font-size: 66rpx;
			margin: 0 auto;

		}

		.ranktitle {
			height: 180rpx;
			background: url('https://oea.fuhaoyun.cn/upload/images/oea_2.png') no-repeat center;
			background-size: 100% auto;
			text-align: center;
			line-height: 159rpx;
			font-size: 66rpx;
			margin: 50rpx auto;
		}

		.wrap-title {
			height: 110rpx;
			padding-left: 22rpx;
			border-bottom: 2rpx solid #f1f1f1;

			p {
				font-size: 30rpx;
				line-height: 110rpx;
				text-align: center;
			}
		}

		.ranking {
			height: 110rpx;
			border-radius: 15rpx;
			background-color: #fff;
			padding: 0 22rpx;
			margin-top: 22rpx;
			line-height: 75rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.rank-item {
				font-size: 30rpx;
				font-weight: 700;
			}
			.rank-num{
				// color: #409eff;
			}
			.rank-name {
				font-size: 30rpx;
				margin-left: 38rpx;
			}

			.rank-tel {
				font-size: 30rpx;
				margin-left: 38rpx;
			}

			.rank-info {
				width: 225rpx;
				height: 110rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}

			.rank-score {
				width: 150rpx;
				height: 46rpx;
				background-color: #5490fe;
				border-radius: 15rpx;
				font-size: 30rpx;
				color: #fff;
				line-height: 46rpx;
				text-align: center;
				margin-bottom: 10rpx;
			}

			.rank-time {
				font-size: 30rpx;
				line-height: 29rpx;
			}
		}
	}

	.loading {
		height: 120rpx;
		padding: 0 22rpx;
		margin-top: 22rpx;

		.el-icon-loading {
			color: #ffac00;
		}
	}

	.nomore {
		text-align: center;
		font-size: 38rpx;
	}
	.info{
		width: 674rpx;
		position: absolute;
		bottom: 50rpx;
		text-align: center;
		color: #fff;
	}
	.loadmorebtn{
		margin: 50rpx 0;
	}
</style>
