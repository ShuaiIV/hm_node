// 开启严格模式
"use strict"

// 导入所需的模块
const express = require('express')
const path = require('path')

// 创建accountRouter路由
const accountRouter = express.Router()

// 导入相应的控制器
const accountCtrl = require(path.join(__dirname, '../controllers/accountController.js'))

// 处理二级路由
// 返回登陆页面
accountRouter.get('/login', accountCtrl.getLoginPage)
// 返回验证码图片
accountRouter.get('/vcode', accountCtrl.getVcodeImage)
// 处理登陆逻辑
accountRouter.post('/login', accountCtrl.login)
// 处理登出逻辑
accountRouter.get('/logout', accountCtrl.logout)
// 处理获得注册页面逻辑
accountRouter.get('/register', accountCtrl.getRegisterPage)
// 处理注册用户名是否存在逻辑
accountRouter.get('/register/:username', accountCtrl.judgeUsername)
// 处理注册用户逻辑
accountRouter.post('/register', accountCtrl.register)

// 暴露路由接口
module.exports = accountRouter