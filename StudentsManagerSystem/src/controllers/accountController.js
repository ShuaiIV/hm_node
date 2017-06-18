// 开启严格模式
"use strcit"

// 导入所需的模块
const fs = require('fs')
const path = require('path')
const captchapng = require('captchapng');

// 导入操作数据库模块
const dbManager = require(path.join(__dirname, '../tools/databaseManager.js'))

// 获取登陆页面逻辑
module.exports.getLoginPage = (req, res) => {
	// 返回登陆页面
	fs.readFile(path.join(__dirname, '../views/login.html'), (err, data) => {
		// 设置响应头
		res.setHeader('Content-type', 'text/html;charset=utf-8')
		res.end(data)
	})
}

// 获取验证码图片逻辑
module.exports.getVcodeImage = (req, res) => {
	// 生成随机的四位数
	let vCode = parseInt(Math.random() * 9000 + 1000)
	// console.log(vCode)

	// 将验证码存储到专属的存储空间
	req.session.vcodeId = vCode

	// 借用导入的验证码模块生成验证码图片
	let pic = new captchapng(80, 30, vCode) // 图片的宽度，图片的高度，图片中的数字
	// 设置图片的背景色
	pic.color(0, 0, 0, 0) //red, green, blue, alpha
	// 设置图片中数字的颜色
	pic.color(80, 80, 80, 255) //red, green, blue, alpha

	// 将图片转换为base64格式
	let imgBase64 = new Buffer(pic.getBase64(), 'base64')

	// 设置响应头
	res.setHeader('Content-type', 'image/png')

	// 返回图片
	res.end(imgBase64)
}

// 处理登陆请求逻辑
module.exports.login = (req, res) => {
	// 借助body-parser解析POST请求参数
	let params = req.body

	// 先初始化返回的结果，根据验证结果的不同，来改变结果的值
	const result = {
		status: 1,
		message: "登陆成功"
	}

	// 验证验证码
	// console.log(params.vcode, req.session.vcodeId)
	if (params.vcode != req.session.vcodeId) {
		// 当验证码验证不通过时，将返回结果改为
		result.status = 0
		result.message = "验证码错误！！！！"

		// 返回结果
		res.json(result)
	} else {
		// 验证用户名和密码
		dbManager.queryOne('user_list', { name: params.username, password: params.password }, (err, doc) => {
			// 如果查询不到结果
			if (doc == null) {
				result.status = 2
				result.message = "用户名或密码错误"
			} else {
				// 登录成功后，将用户名存入session中
				// 目的1：用于后续的权限验证
				// 目的2：在欢迎页面使用
				req.session.loginedName = params.username
			}

			// 返回结果
			res.json(result)
		})
	}
}

// 处理登出请求逻辑
module, exports.logout = (req, res) => {
	// 将已经登录的用户名清空
	req.session.loginedName = null
	// 跳转到登录页面
	// 设置响应头
	res.setHeader('Content-type', 'text/html;charset-utf-8')
	// 设置响应体
	res.end('<script>window.location.href="/account/login"</script>')
}

// 处理请求注册页面逻辑
module.exports.getRegisterPage = (req, res) => {
	fs.readFile(path.join(__dirname, '../views/register.html'), (err, data) => {
		// 如果出错，则报错返回
		if (err) {
			console.log(err)
			return false
		} else {
			// 返回数据
			// 设置请求头
			res.setHeader('Content-type', 'text/html;charset=utf-8')
			res.end(data)
		}
	})
}

// 处理判断用户名是否存在逻辑
module.exports.judgeUsername = (req, res) => {
	// console.log(req.params.username)
	// 先初始化返回的结果，根据验证结果的不同，来改变结果的值
	const result = {
		status: 1,
		message: "该用户名可以注册"
	}
	// 向数据库中查询此用户名是否存在
	dbManager.queryOne('user_list', { name: req.params.username }, (err, doc) => {
		// 如果出错，则报错返回
		if (err) {
			console.log(err)
			return false
		} else {
			// 如果查询到数据，则不可以注册这个用户名
			if (doc != null) {
				result.status = 0
				result.message = "该用户名已被注册，请填写新的用户名"
			}
			res.json(result)
		}
	})
}

// 处理注册用户请求逻辑
module.exports.register = (req, res) => {
	// 借助body-parser解析POST请求参数
	let params = req.body
	console.log(params);

	// 先创建一个对象来返回响应信息
	const result = {
		status: 1,
		message: '注册成功，请返回登陆页面！'
	}

	// 在数据库中添加新注册的用户
	dbManager.addOne('user_list', params, (err, doc) => {
		// 如果出错，则报错返回
		if (err) {
			console.log(err)
			return false
		} else {
			// console.log(doc);
			if (doc == null) {
				result.status = 0
				result.message = '注册失败，请重试！'
			}
		}

		// 返回结果
		// 设置响应头
		res.setHeader('Content-Type', 'text/html;charset=utf-8')
		// 设置响应体
		res.json(result)
	})
}