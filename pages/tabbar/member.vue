<template>
</template>
	<view class="">
		<view class="none" v-if="!members.length">
			暂无数据
		</view>
		<view class="flex-item flex-item-V uni-bg-blue">
			<uni-list>
				<uni-list-item
					v-for="(item,index) in members"
					:key="index"
					@click="openDetail(item)"
					:color="item.is_dange?'red':''"
					:title="item.is_dange? `${item.name}(感染者同程)`: item.name"
					:note="item.address || '地址未填写'"
				>
					
				</uni-list-item>
			</uni-list>
		</view>
	</view>
<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	export default {
		components: {
			uniList,
			uniListItem,
			uniTag
		},
		data() {
			return {
				members: [],
				page: 0,
				data: []
				
			}
		},
		onLoad() {
			this.loadData()
			console.log("after load")
		},
		onPullDownRefresh() {
			this.members=[]
			this.page = 0
			this.loadData()
			console.log("after load")
		},
		onReachBottom() {
			this.loadData()
		},
		methods: {
			loadData() {
				uni.showLoading({
					title:'加载中...'
				})
				this.$cloud.callFunction({
					name: 'member-list',
					data: {
						token: uni.getStorageSync('token'),
						page: this.page,
						length: 15
					}
				}).then(({result}) => {
					uni.hideLoading()
					uni.stopPullDownRefresh()
					if(result.code === -3) {
						uni.showModal({
							content:'登陆状态无效',
							showCancel:false,
							complete: () => {
								uni.redirectTo({
									url:'/pages/login/login'
								})
							}
						})
						return
					}
					
					if(result.code !== 0) {
						uni.showToast({
							icon:'none',
							title:result.msg
						})
						return
					}
					
					//正常情况
					this.page++
					console.log("result.data")
					console.log(...result.data)
					this.members.push(...result.data)
					console.log(this.members)
					console.log("length:" + this.members.length) 
					
					//检查是否有感染风险
					this.members.forEach(async (v, i)=> {
						//已经检测是风险状态了，就直接返回。
						
						if(v.is_dange) {
							return
						}
						console.log(1)
						//从云端读取信息
						if(this.data.length === 0) {
							const getData = await this.$cloud.callFunction({
								name: 'get-data',
								data: {}
							})
							console.log(2)
							this.data = getData.result.data || []
							console.log(this.data)
						}
						console.log(3)
						//利用读取到的信息，对比行程信息，看看是否有感染风险。
						if(this.data.length > 0 && 
							v.traffic.car_plate &&
							v.check_in_time
						) {
							const findData = this.data.find(val=> {
								return (
									val.t_no.toUpperCase().includes(v.traffic.car_plate.toUpperCase())
									&& val.t_date.includes(v.check_in_time.substring(0,10) || "") 
								)
							})
							v.is_danger = !!findData
							this.$set(this.members, i, v)
						}
					})
				}).catch(e => {
					console.log("fail")
					uni.hideLoading()
					uni.stopPullDownRefresh()
					uni.showToast({
						icon:'none',
						title:'加载数据失败'
					})
				})
			},
			openDetail(item) {
				console.log(item)
				uni.navigateTo({
					url:`../member-detail/member-detail?item=${encodeURIComponent(JSON.stringify(item))}`
				})
			}
		}
	}
</script>

<style>
</style>
