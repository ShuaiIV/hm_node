// 开启严格模式
"use strict"

// 导入所需的模块
const express = require('express')
const path = require('path')

// 创建路由
const studentManagerRouter = express.Router()

// 导入相应的控制器
const studentManagerCtrl = require(path.join(__dirname, '../controllers/studentManagerController.js'))

// 处理二级路由
studentManagerRouter.get('/list', studentManagerCtrl.queryStuList)


// 暴露路由接口
module.exports = studentManagerRouter