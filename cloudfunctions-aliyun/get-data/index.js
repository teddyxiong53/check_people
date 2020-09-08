'use strict';
const http = require('http')
exports.main = async (event={}, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	const data = await new Promise(resolve => {
		// console.log("before http get")
		http.get('http://2019ncov.nosugartech.com/data.json?439046', function(res) {
			res.setEncoding('utf8')
			// console.log("http get return")
			let rawData = ''
			res.on('data', function(chunk) {
				// console.log("length:"+chunk.length)
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
	// console.log("before return")
	//返回数据给客户端
	// console.log(data)
	return {
		code: 0,
		data: data.data||[],
		msg: 'ok'
	}
};
