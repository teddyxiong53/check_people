<template>
	<view class="">
		<view class="section">
			<input v-model="username" placeholder="用户名" />
		</view>
		<view class="section">
			<input v-model="password" placeholder="密码" />
		</view>
		
		<button type="primary" @click="login">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			login() {
				const {
					username,
					password
				} = this;
				if(!username) {
					uni.showModal({
						content:"请输入用户名",
						showCancel:false
					})
					return
				}
				if(!password) {
					uni.showModal({
						content:"请输入密码",
						showCancel:false
					})
					return
				}
				uni.showLoading({
					title:"登陆中..."
				})
				console.log("username:" + username + " password:" + password)
				this.$cloud.callFunction({
					name: 'login',
					data: {
						username,
						password
					}
				}).then((res) => {
					uni.hideLoading()
					if(res.result.token) {
						uni.showToast({
							title:"登录成功",
							icon:"none"
						})
						//保存token
						uni.setStorageSync('token', res.result.token)
						uni.setStorageSync('username', res.result.username)
						//跳转到member页面
						uni.switchTab({
							url:'/pages/tabbar/member'
						})
					} else {
						return Promise.reject(new Error(res.result.msg))
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: err.message || "登录失败",
						showCancel:false
					})
				})
			}
		}
	}
</script>

<style>
	.section {
		margin: 20px;
		padding: 10px 0px;
		border-bottom: 2rpx solid #eee;
	}
</style>
