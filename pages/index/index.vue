<template>
	<view class="">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {
			const token = uni.getStorageSync('token')
			if(token) {
				console.log("to member tab")
				uni.switchTab({
					url: '../tabbar/member'
				})
			} else {
				uni.redirectTo({
					url: '../login/login'
				})
			}
		}
	}
	
</script>
<style>
	
</style>