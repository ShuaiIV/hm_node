// 开启严格模式
"use strict"

// 导入项目所依赖的模块
const express = require("express")
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')


// 创建APP
const app = express()

// 集成静态资源中间件
app.use(express.static(path.join(__dirname, 'public')))

// 使用body-parser解析POST参数
app.use(bodyParser.urlencoded({ extended: false }))

// Use the session middleware 
// 参数1：安全相关
// 参数2：就是分配的那块内存的最长有效期，一般性的网站不超过30网站
// 银行性网站:2分钟以下，单位毫秒
app.use(session({
	secret: 'keyboard cat',
	cookie: { maxAge: 2 * 60 * 1000 }
}))

// 权限认证
// 当session中没有用户名时，返回到登录页面
app.all('/*', (req, res, next) => {
	// 当访问的是登录页面时，不需要做权限认证
	if (req.url.includes('/account')) {
		next()
	} else {
		if (req.session.loginedName == null) {
			res.setHeader("Content-Type", "text/html;charset=utf-8")
			res.end("<script>alert('您还没有登录,请先登录');window.location.href='/account/login'</script>")
		} else {
			next()
		}
	}
})

// 创建路由
// 登陆页面路由
const accountRouter = require(path.join(__dirname, 'routers/accountRouter.js'))
app.use('/account', accountRouter)
// 后台管理页面路由
const studentManagerRouter = require(path.join(__dirname, 'routers/studentManagerRouter.js'))
app.use('/studentmanager', studentManagerRouter)

// 开启web服务
app.listen(8777, '127.0.0.1', (err) => {
	if (err) {
		console.log(err)
	} else {
		console.log("Server Started !!!!")
	}
})