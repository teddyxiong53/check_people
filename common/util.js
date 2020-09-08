/*
	把一个秒数的时间，转成00：00：00这样的格式字符串
*/
function formatTime(time) {
	if(typeof time !== 'number' || time < 0) {
		return time
	}
	var hour = parseInt(time/3600)
	time = time%3600
	var minute = parseInt(time/60)
	time = time%60
	var second = time
	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' +n
	}).join(':')
}
/*
	这个是把经度和纬度转成这样的数据：
	{
		["1", "00],
		["2", "00"]
	}
*/
function formatLocation(longitude, latitude) {
	if(typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}
	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)
	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}

var dateUtils = {
	//对应的ms数
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(ms) {
		let humanize = ''
		for(let key in this.UNITS) {
			if(ms >= this.UNITS[key]) {
				humanize = Math.floor(ms/this.UNITS[key] + key + '前')
				break
			}
		}
		return humanize || '刚刚'
	},
	format: function(datestr) {
		let date = new Date(datestr)
		let diff = Date.now() - date.getTime()
		if(diff < this.UNITS['天']) {
			return this.humanize(diff)
		}
		//小于10的数字，前面补0
		let _format = function(number) {
			return (number < 10 ? ('0'+number) : number)
		}
		// 2020/09/07-12:10
		return date.getFullYear() + '/' + _format(date.getMonth()+1) + _format(date.getDate()) + '-' + _format(date.getHours()) + ':' + _format(date.getMinutes())
	},
	parse: function(str) {
		let a = str.split(/[^0-9]/)
		return new Date(a[0], a[1]-1, a[2], a[3], a[4], a[5])
	}
}

function formatDate(year, month, day) {
	return year + '-' + getTwo(month) + '-' + getTwo(day)
}

function getTwo(num) {
	if(Number(num) < 10) {
		return '0' + num
	} else {
		return num
	}
}

function checkPhone(phone) {
	if(!/^1[3456789]\d{9}$/.test(phone)) {
		return false
	}
	return true
}

function checkIDCard(num) {
	// 18/15位
	if(!(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(num))){ 
		// alert("身份证号码有误，请重填");  
		return false; 
	} 
	return true;
}

module.exports = {
	formatDate,
	formatLocation,
	dateUtils,
	formatTime,
	checkPhone,
	checkIDCard
}

