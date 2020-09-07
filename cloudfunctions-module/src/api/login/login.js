const crypto = require('crypto')
const jwt = require('jwt-simple')
const {
	tokenExp
} = require('../../utils/constants.js')
const {
	encryptPassword
} = require('../../utils/encryptPassword.js')

const db = uniCloud.database()

async function login(event) {
	const {
		username,
		password 
	} = event
	console.log(`get info: username:${username}, password:${password}`)
	let userInfo = {
		username
	} 
	const userInDB = await db.collection('user').where({
		username,
		password: encryptPassword(password)
	}).get()
	let tokenSecret = crypto.randomBytes(16).toString('hex')
	let token = jwt.encode(userInfo, tokenSecret)
	let userUpdateResult
	if(userInDB.data && userInDB.data.length === 0) {
		return {
			code: -1,
			msg: '用户名或者密码不对'
		}
	} else {
		userUpdateResult = await db.collection('user').doc(userInDB.data[0]._id).update({
			tokenSecret,
			exp: Date.now() + tokenExp
		})
	}
	if(userUpdateResult.id || userUpdateResult.affectedDocs === 1) {
		return {
			code: 0,
			token,
			username,
			msg: '登陆成功'
		}
	}
	return {
		code: -1,
		msg: '登陆失败'
	}
}
exports.main = login
