'use strict';
const {
	validateToken
} = require('../../utils/validateToken.js')
const db = uniCloud.database()

const defaultMemberInfo = {
	id_type: '',
	id_card: '',
	name: '',
	phone: '',
	age: '',
	province: '',
	city: '',
	area: '',
	address: '',
	sex: -1,
	native: 2,
	regtime: ''
}

const defaultRecordInfo = {
	id_type: '',
	status: '',
	from_address: null,
	from_hb: 0,
	from_wh: 0,
	traffice: null,
	temperature: '',
	check_in_address: null,
	check_in_time: '',
	body_status: 0,
	contact_virus: null,
	contact_like_virus: null,
	contact_like_virus_region: null,
	access: null,
	comment: '',
	create_time: 0
}

exports.main = async (event={}, context) => {
	let operator_username = event.operator_username
	if(!operator_username) {
		let validateResult
		try {
			validateResult = await validateToken(event.token)
			
		} catch(e) {
			return {
				code: -3,
				errCode: 'TOKEN_INVALID',
				msg: '登陆状态无效，请重新登陆'
			}
		}
		if(validateResult.code !== 0) {
			return {
				code: -3,
				errCode: 'TOKEN_INVALID',
				msg: '登陆状态无效，请重新登陆'
			}
		}
		operator_username = validateResult.username
	} else {
		const userCollection = db.collection('user')
		let checkOperatorResult = await userCollection.where({
			username: operator_username
		}).get()
		if(checkOperatorResult.data && checkOperatorResult.data.length === 0) {
			return {
				code: -4,
				errCode: 'OPERATOR_ID_INVALID',
				msg: '操作员信息无效，请重新扫码录入'
			}
		}
	}
	const currentTime = new Date().toISOString()
	if(event.check_in_time) {
		event.check_in_time = new Date(event.check_in_time).toISOString()
	}
	if(event.body_status && event.body_status.time) {
		event.body_status.time = new Date(event.body_status.time).toISOString()
	}
	const memberCollection = db.collection('member')
	const recordCollection = db.collection('member_list')
	
	const phone = event.phone
	const memberInfo = {}
	const recordInfo = {}
	const operateInfo = {}
	
	Object.keys(defaultMemberInfo).forEach((key)=> {
		if(key in event && event[key]!== '') {
			memberInfo[key] = event[key]
		}
	})
	if(event.from_address) {
		memberInfo.province = event.from_address.province
		memberInfo.city = event.from_address.city
		memberInfo.area = event.from_address.district
		memberInfo.address = event.from_address.street
	}
	Object.keys(defaultRecordInfo).forEach(key=> {
		if(key in event) {
			recordInfo[key] = event[key]
		}
	})
	recordInfo.create_time = currentTime
	if(!memberInfo.name) {
		return {
			code: -1,
			msg: '姓名不能为空'
		}
	}
	if(!memberInfo.phone) {
		return {
			code: -1,
			msg: '联系电话不能为空'
		}
	}
	try {
		//用手机号来搜索
		const memberInDb = await memberCollection.where({
			phone
		}).get()
		let memberUpdateResult, member_id
		if(memberInDb.data && memberInDb.data.length === 0) {
			memberUpdateResult = await memberCollection.add(Object.assign({
				regtime: currentTime,
				status: 0
			}, memberInfo))
			member_id = memberUpdateResult.id
		} else {
			memberUpdateResult = await memberCollection.doc(memberInDb.data[0]._id).update(memberInfo)
			member_id = memberInDb.data[0]._id
		}
		const recordUpdateResult = await recordCollection.add({
			...recordInfo,
			member_id,
			operator_username
		})
		return {
			code: 0,
			msg: '记录添加成功'
		}
	} catch(e) {
		return {
			code: -2,
			msg: '记录添加失败'
		}
	}
	
};