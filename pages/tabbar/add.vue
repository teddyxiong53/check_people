<template>
	<view class="content">
		<view class="list">
			<view class="list-title">
				人员信息
			</view>
			<view class="list-item">
				<text>姓名</text>
				<input type="text" v-model="name" value="" placeholder="请输入名字" />
			</view>
			<view class="list-item">
				<text>证件类型</text>
				<picker mode="selector" range-key="label" :range="idTypeList" @change="idTypeChange">
					<view class="xiala">
						<text>{{idTypeList[id_type].label}}</text>
						<image src="/static/xl.png" mode=""></image>
					</view>
				</picker>
			</view>
			<view class="list-item">
				<text>证件号码：</text>
				<input v-model="id_card" type="text" placeholder="请输入证件号码"/>
			</view>
			<view class="list-item">
				<text>年龄：</text>
				<slider @change="ageChange" :value="age" min="0" step="1" max="120" show-value/>
			</view>
			<view class="list-item">
				<text>性别：</text>
				<radio-group @change="sexChange">
					<label>
						<radio value="1" checked="sex=='1'"/><text>男</text>
					</label>
					<label>
						<radio value="0" checked="sex=='0'"/><text>女</text>
					</label>
				</radio-group>
			</view>
			<view class="list-item">
				<text>是否本地户籍：</text>
				<radio-group @change="nativeChange">
					<label>
						<radio value="1" :checked="native==='1'"/><text>是</text>
					</label>
					<label>
						<radio value="0" :checked="native==='0'"/><text>否</text>
					</label>
				</radio-group>
			</view>
			<view class="list-item">
				<text>联系电话<text class="color-red">*</text>：</text>
				<input type="text" v-model="phone" value="" placeholder="请输入联系电话" />
			</view>
		</view>
		<view class="list">
			<view class="list-title">
				到访信息
			</view>
			<view class="list-item">
				<text>本单位联系人：</text>
				<input type="text" value="" v-model="access.name" placeholder="请输入联系人姓名" />
			</view>
			<view class="list-item">
				<text>联系人电话：</text>
				<input type="text" value="" v-model="access.phone" placeholder="请输入联系电话" />
			</view>
			<view class="list-item">
				<text>到访事由：</text>
				<input type="text" value="" v-model="access.comment" placeholder="请输入到访事由" />
			</view>
			
		</view>
		
		<view class="list">
			<view class="list-title">
				来源地信息
			</view>
			<view class="list-item">
				<text>是否来自湖北：</text>
				<radio-group name="" @change="fromHbChange">
					<label>
						<radio value="1" /><text>是</text>
					</label>
					<label>
						<radio value="0" /><text>否</text>
					</label>
				</radio-group>
			</view>
			<view class="list-item">
				<text>是否来自武汉：</text>
				<radio-group name="" @change="fromWhChange">
					<label>
						<radio value="1" /><text>是</text>
					</label>
					<label>
						<radio value="0" /><text>否</text>
					</label>
				</radio-group>
			</view>
			<view class="list-item">
				<text>来源地区：</text>
				<input type="text" value="" 
					@click="showCityPicker('from_address')" 
					disabled="disabled"
					placeholder="请输入地址"
					:value="from_address.addressStr"
					/>
			</view>
			<view class="list-item">
				<text>来源地详细地址：</text>
				<input type="text" value="" 
					v-model="from_address.street"
					placeholder="请输入地址"
				 />
			</view>
			<view class="list-item">
				<text>出行方式：</text>
				<radio-group name="" @change="trafficeTypeChange">
					<label>
						<radio value="0" /><text>火车</text>
					</label>
					<label>
						<radio value="1" /><text>自驾</text>
					</label>
					<label>
						<radio value="2" /><text>汽车</text>
					</label>
					<label>
						<radio value="3" /><text>飞机</text>
					</label>
				</radio-group>
			</view>
			<view class="list-item" v-if="traffic.type>-1">
				<text>交通工具信息：</text>
				<input type="text" value="" v-model="traffic.car_plate" placeholder="请务必输入正确信息" />
			</view>
			<view class="list-item">
				<text>到访地区：</text>
				<input type="text" value="" @click="showCityPicker('check_in_address')" 
					disabled="disabled"
					placeholder="请输入地址"
					:value="check_in_address.addressStr"
				/>
			</view>
			<view class="list-item">
				<text>到访详细地址：</text>
				<input type="text" value="" 
					placeholder="请输入地址"
					v-model="check_in_address.street"
				 />
			</view>
			<view class="list-item">
				<text>到达日期：</text>
				<picker mode="date" @change="checkInTimeChange">
					<button size="mini">{{checkIntimeStr||'请选择'}}</button>
				</picker>
			</view>
		</view>
		<view class="list">
			<view class="list-title">
				健康状况
			</view>
			<view class="list-item">
				<radio-group name="" @change="bodyStatusChange">
					<label>
						<radio value="0" /><text>普通</text>
					</label>
					<label>
						<radio value="1" /><text>居家隔离</text>
					</label>
					<label>
						<radio value="2" /><text>发烧</text>
					</label>
					<label>
						<radio value="3" /><text>疑似</text>
					</label>
					<label>
						<radio value="4" /><text>确诊</text>
					</label>
					<label>
						<radio value="5" /><text>死亡</text>
					</label>
				</radio-group>
			</view>
			<view class="list-item">
				<text>记录时间：</text>
				<picker mode="date" @change="bodyStatusDateChange">
					<button size="mini">{{bodyStatusDate || '请选择日期'}}</button>
				</picker>
				<picker mode="time" @change="bodyStatusTimeChange">
					<button size="mini">{{bodyStatusTime || '请选择时间'}}</button>
				</picker>
			</view>
			<view class="divider">
				
			</view>
			<view class="list-item">
				<text>体温：</text>
				<slider @change="temperatureChange" 
					min="35"
					max="40"
					step="0.1"
					value="36.5"
					show-value
				/>
			</view>
			<button type="primary" @click="submit">提交信息</button>
		</view>
		<mpvue-city-picker ref="mpvueCityPicker" 
			:pickerValueDefault="cityPickerValueDefault"
			@onComfirm="onCityConfirm"
			>
		</mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import {
		checkPhone,
		checkIDCard
	} from '@/common/util.js'
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				data: [],
				cityPickerValueDefault: [0,0,1],
				name: '',
				idTypeList: [
					{
						label: '身份证',
						value: 0
					},
					{
						label: '护照',
						value: 1
					}
				],
				id_type: 0,
				id_card: '',
				isCn: false,
				age: 0,
				sex: -1,
				native: 2,
				phone: '',
				from_hb: 0,
				from_wh: 0,
				from_address: {
					addressStr: '',
					street: ''
				},
				traffic: {
					type: -1
				},
				check_in_address: {
					addressStr: '',
					street: ''
				},
				checkIntimeStr: '',
				body_status: {
					status: '0',
					time: Date.now()
				},
				bodyStatusDate: '',
				bodyStatusTime: '',
				temperature: 36.5,
				contact_virus: {
					status: '',
					name: '',
					contact: ''
				},
				contact_like_virus: {
					status: '',
					name: '',
					contact: ''
				},
				contact_like_virus_region: {
					status: '',
					name: '',
					contact: ''
				},
				commont: '',
				operator_name: '',
				access: {
					name: '',
					phone: '',
					comment: ''
				}
			}
		},
		computed: {
			check_in_time: function() {
				return new Date(this.checkIntimeStr).getTime()
			}
		},
		watch: {
			bodyStatusDate() {
				this.getBodyStatusTimeStamp()
			},
			bodyStatusTime() {
				this.getBodyStatusTimeStamp()
			},
			id_type() {
				this.parseIdCard()
			},
			id_card() {
				this.parseIdCard()
			}
		},
		onLoad(e) {
			this.init()
		},
		methods: {
			async init() {
				const getData = await this.$cloud.callFunction({
					name: 'get-data',
					data: {}
				})
				this.data = getData.result.data || []
			},
			parseIdCard() {
				if(this.id_type == 0) {
					this.isCn = /[^\w\.\/]/.test(this.id_card)
					if(this.id_card.length === 18) {
						let year = parseInt(this.id_card.substr(6,4))
						let mark = parseInt(this.id_card.substr(16,1))
						if(!isNaN(year)) {
							this.age = new  Date().getFullYear() - year
						}
						if(!isNaN(mark)) {
							this.sex = mark%2
						}
					}
				}
			},
			idTypeChange(e) {
				this.id_type = e.detail.value
			},
			ageChange(e) {
				this.age = e.detail.value
			},
			sexChange(e) {
				this.sex = e.detail.value
			},
			nativeChange(e) {
				this.native = e.detail.value
			},
			fromHbChange(e) {
				this.from_hb = e.detail.value
			},
			fromWhChange(e) {
				this.from_wh = e.detail.value
			},
			trafficeTypeChange(e) {
				this.traffic = e.detail.value
			},
			showCityPicker(segment) {
				this.tempPickerSegment = segment
				this.$refs.mpvueCityPicker.show()
			},
			onCityConfirm(e) {
				let addressParam = this[this.tempPickerSegment]
				addressParam.province = e.value[0]
				addressParam.city = e.value[1]
				addressParam.district = e.value[2]
				addressParam.addressStr = e.label
			},
			checkInTimeChange(e) {
				this.checkIntimeStr = e.detail.value
			},
			bodyStatusChange(e) {
				this.body_status.status = e.detail.value
			},
			bodyStatusDateChange(e) {
				this.bodyStatusDate = e.detail.value
			},
			bodyStatusTimeChange(e) {
				this.bodyStatusTime = e.detail.value
			},
			getBodyStatusTimeStamp() {
				if(this.bodyStatusDate && this.bodyStatusTime) {
					this.body_status.time = new Date(this.bodyStatusDate + ' ' + this.bodyStatusTime).getTime()
					
				} else {
					this.body_status.time = 0
				}
			},
			temperatureChange(e) {
				this.temperature = e.detail.value
			},
			contactVirusChange(e) {
				this.contact_virus.status = e.detail.value
			},
			contactLikeChange(e) {
				this.contact_like_virus.status = e.detail.value
			},
			contactVirusRegionChange(e) {
				this.contact_like_virus_region.status = e.detail.value
			},
			submit() {
				let _this = this
				if(!this.name) {
					uni.showModal({
						content:"请填写人员姓名",
						showCancel:false
					})
					return false
				}
				if(!this.phone) {
					uni.showModal({
						content:"请填写人员手机号码",
						showCancel:false
					})
					return false
				}
				if(!checkPhone(this.phone)) {
					uni.showModal({
						content:'请检查手机号码',
						showCancel: false
					})
					return false
				}
				if(this.id_type == 0 && this.id_card && !checkIDCard(this.id_card)) {
					uni.showModal({
						content:'请检查身份证号',
						showCancel:false
					})
					return false
				}
				const {
					id_type,
					id_card,
					name,
					phone,
					age,
					sex,
					native,
					from_address,
					from_hb,
					from_wh,
					traffic,
					temperature,
					check_in_address,
					check_in_time,
					body_status,
					contact_status,
					contact_like_virus,
					contact_like_virus_region,
					comment,
					operator_username,
					access
				} = this
				uni.showModal({
					title:'上传中...'
				})
				let is_danger = false
				if(this.data.length === 0) {
					this.init()
				}
				if(this.data.length === 0) {
					//再次获取，还是没有获取到
					uni.hideLoading()
					uni.showModal({
						content:'请重新提交',
						showCancel:false
					})
					return 
				}
				if(this.data.length > 0 && traffic.car_plate && check_in_time) {
					const findData = this.data.find(val => {
						return (
							val.t_no
							.toUpperCase()
							.includes(traffic.car_plate.toUpperCase()) &&
							val.t_date.includes(new Date(check_in_time).toISOString().substring(0,10) || '')
						)
					})
					is_dange = !!findData
				}
				this.$cloud.callFunction({
					name: 'add-member',
					data : {
						is_danger,
						id_type,
						id_card,
						name,
						phone,
						sex,
						native,
						from_address,
						from_hb,
						from_wh,
						traffic,
						temperature,
						check_in_address,
						check_in_time,
						body_status,
						contact_virus,
						contact_like_virus,
						contact_like_virus_region,
						comment,
						token: uni.getStorageSync('token'),
						operator_username,
						access
					}
				}).then(res => {
					uni.hideLoading()
					if(res.result.code === 0) {
						uni.showModal({
							content:'信息上传完成，请重复提交',
							showCancel:false
						})
						if(_this.operator_name) {
							//缓存用户信息，减少重复填写
							uni.setStorageSync('memberInfo', {
								id_type,
								id_card,
								name, 
								phone,
								age,
								sex,
								native
							})
						}
					} else if(res.result.errCode === 'TOKEN_INVALID') {
						uni.showModal({
							content:'登陆状态无效，请重新登陆',
							showCancel:false,
							success() {
								uni.redirectTo({
									url:'/pages/login/login'
								})
							}
						})
					} else {
						return Promise.reject(new Error(res.result.msg))
					}
				}).catch(err => {
					uni.hideLoading()
					uni.showModal({
						content:err.message || '记录添加失败',
						showCancel:false
					})
				})
			}
		}
		
	}
</script>

<style>
	page {
		background: #f0f0f0;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 50rpx;
	}
	.list {
		display: flex;
		flex-direction: column;
		width: 680rpx;
		margin: auto;
		margin-top: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		padding-bottom: 20rpx;
	}
	.list-title {
		display: flex;
		font-size: 40rpx;
		font-weight: bold;
		margin: auto;
		padding: 20rpx;
		
	}
	.list-item {
		width: 580rpx;
		padding: 20rpx;
		display: flex;
		margin: auto;
		font-size: 30rpx;
		align-items: center;
	}
	.list-item>text {
		white-space: nowrap;
	}
	.list-item input {
		background: #f0f0f0;
		border-radius: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		width: 300rpx;
		height: 60rpx;
		color: #999999;
		font-size: 30rpx;
	}
	.list-item slider {
		width: 300rpx;
	}
	.list-item picker {
		margin-right: 10px;
	}
	.list-item picker button {
		vertical-align: middle;
	}
	.list-item label {
		display: inline-block;
		margin: 5px 0px;
	}
	.list-item label text {
		margin-right: 10px;
	}
	
	.xiala {
		display: flex;
		font-size: 30rpx;
	}
	.xiala image {
		display: flex;
		padding-top: 5rpx;
		width: 30rpx;
		height: 30rpx;
		margin-left: 10rpx;
	}
	.color-red {
		color: #FF3333;
	}
	.divider {
		content: '';
		width: 580rpx;
		margin: 5px auto;
		height: 1px;
		background-color: #DDDDDD;
	}
</style>
