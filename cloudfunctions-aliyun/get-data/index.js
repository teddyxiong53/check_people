'use strict';
const http = require('http')
exports.main = async (event={}, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const data = await new Promise(resolve => {
		http.get('http://2019ncov.nosugartech.com/data.json?439046', function(res) {
			res.setEncoding('utf8')
			let rawData = ''
			res.on('data', function(chunk) {
				rawData += chunk
			})
			res.on('end', function() {
				try {
					const parsedData = JSON.parse(rawData)
					resolve(parsedData)
				} catch(e) {
					return {
						code: -1,
						msg: e
					}
				}
			})
		})
	})
	//返回数据给客户端
	return {
		code: 0,
		data: data.data||[],
		msg: 'ok'
	}
};
