<template>
	<view class="">
		<uni-list>
			<uni-list-item :title="username" show-arrow="false" 
				thumb="/static/font/user.png"
				
			>
				
			</uni-list-item>
			<uni-list-item
				title="修改密码"
				thumb="/static/font/pwd.png"
				@click="modifyPwd()"
			>
			</uni-list-item>
			<uni-list-item
				v-if="username==='admin'"
				title="新建账号"
				thumb="/static/font/exit.png"
				@click="newUser()"
			></uni-list-item>
			<uni-list-item
				title="切换账号/退出"
				thumb="/static/font/exit.png"
				@click="exit()"
			></uni-list-item>
		</uni-list>
		<view class="list">
			<view class="tips">
				可以让外来人员扫描此二维码，自动填写信息
			</view>
			<view class="">
				<view class="qrimg">
					<view class="qrimg-i">
						<tki-qrcode
							v-if="ifShow"
							cid="qrcode2"
							ref="qrcode2"
							:val="val"
							:size="size"
							:onval="onval"
							:loadMake="loadMake"
							:usingComponents="true"
							@result="qrR"
						>
							
						</tki-qrcode>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
 
<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniIcon from "@/components/uni-icons/uni-icons.vue"
	import tkiQrCode from "@/components/tki-qrcode/tki-qrcode.vue"
	
	export default {
		components: {
			uniList,
			uniListItem,
			uniIcon,
			tkiQrCode
		},
		data() {
			return {
				ifShow: true,
				username: uni.getStorageSync('username'),
				val: '',
				size: 350,
				onval: true,
				loadMake: true
			}
		},
		onLoad() {
			this.val = location.href.replace('/pages/tabbar/my', `/pages/tabbar/add?id=${this.username}`)
		},
		methods: {
			createQrCode() {
				console.log("createQrCode")
				this.$refs.qrcode._makeCode()
			},
			qrR(res) {
				// console.log(res)
				// 二维码生成的时候，这里会自动调用到。
				//res是一个base64的图片。
				this.src = res
			},
			exit() {
				uni.removeStorageSync('token')
				uni.removeStorageSync('username')
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},
			newUser() {
				uni.navigateTo({
					url: '/pages/new-user/new-user'
				})
			},
			modifyPwd() {
				console.log("modify pwd")
				uni.navigateTo({
					url:'/pages/change-pwd/change-pwd'
				})
			}
		}
	}
</script>

<style>
	.tips {
		display: flex;
		font-size: 14px;
		color: #007AFF;
	}
	.list {
		padding: 20px 0px;
		text-align: center;
		
	}
</style>
