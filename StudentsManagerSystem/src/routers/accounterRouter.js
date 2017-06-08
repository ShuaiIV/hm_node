// 开启严格模式
"use strict"

// 导入所需的模块
const express = require('express')
const path = require('path')

// 创建accounterRouter路由
const accounterRouter = express.Router()

// 导入相应的控制器
const accounterCtrl = require(path.join(__dirname, '../controllers/accounterController.js'))

// 处理二级路由
// 返回登陆页面
accounterRouter.get('/login', accounterCtrl.getLoginPage)
// 返回验证码图片
accounterRouter.get('/vcode', accounterCtrl.getVcodeImage)
// 处理登陆逻辑
accounterRouter.post('/login', accounterCtrl.login)

// 暴露路由接口
module.exports = accounterRouter