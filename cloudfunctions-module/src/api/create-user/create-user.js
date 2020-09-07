const crypto = require('crypto')
const jwt = require('jwt-simple')
const {
	tokenExp
} = require('../../utils/constants.js')
const {
	encryptPassword
} = require('../../utils/encryptPassword.js')
const {
	validateToken
} = require('../../utils/validateToken.js')

const db = uniCloud.database()

async function signUp(event) {
	const {
		username,
		password
	} = event
	let userInfo = {
		username
	}
	const userInDB = await db.collection('user').where(userInfo).get()
	let tokenSecret = crypto.randomBytes(16).toString('hex')
	let token = jwt.encode(userInfo, tokenSecret)
	let userUpdateResult 
	if(userInDB.data && userInDB.data.length === 0) {
		//说明当前没有这个用户，可以创建
		userUpdateResult = await db.collection('user').add({
			...userInfo,
			password: encryptPassword(password),
			tokenSecret,
			exp: Date.now() + tokenExp
		})
	} else {
		//否则是重复创建
		return {
			code: -1,
			msg: '重复添加同名用户'
		}
	}
	if(userUpdateResult.id || userUpdateResult.affectedDocs === 1) {
		return {
			code: 0,
			token,
			msg: '注册成功'
		}
	}
	return {
		code: -1,
		msg: '注册失败'
	}
}

async function signUpMany(event) {
	if(event.username) {
		return await signUpByAdmin(event)
	}
	const userList = [
		{
			username: 'admin',
			password: '123456'
		}
	]
	let resultList = []
	for(let i=0; i<userList.length; i++) {
		const res = await signUp(userList[i])
		resultList.push(res.code)
	}
	let signUpManyResult = resultList.every(item => {
		return item === 0
	})
	if(signUpManyResult) {
		return {
			code: 'admin账号注册完成',
			userList
		}
	} else {
		return {
			msg: 'admin账号注册失败'
		}
	}
}
//先留空
async function signUpByAdmin(event) {
	return {
		code: 0
		
	}
}
exports.main = signUpMany
