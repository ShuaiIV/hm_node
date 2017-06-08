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
app.use(express.static(path.join(__dirname, 'statics')))

// 使用body-parser解析POST参数
app.use(bodyParser.urlencoded({ extended: false}))

// Use the session middleware 
// 参数1：安全相关
// 参数2：就是分配的那块内存的最长有效期，一般性的网站不超过30网站
// 银行性网站:2分钟以下，单位毫秒
app.use(session({
	secret: 'keyboard cat',
	cookie: {maxAge: 2 * 60 * 1000}
}))

// 创建路由
const accounterRouter = require(path.join(__dirname, 'routers/accounterRouter.js'))
app.use('/accounter', accounterRouter)


// 开启web服务
app.listen(8777, '127.0.0.1', (err) => {
	if (err) {
		console.log(err)
	} else {
		console.log("Server Started !!!!")
	}
})