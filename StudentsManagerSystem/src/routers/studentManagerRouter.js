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
// 获得学生列表的路由
studentManagerRouter.get('/list', studentManagerCtrl.queryStuList)
// 获得修改学生信息页面的路由
studentManagerRouter.get('/edit/:stuId', studentManagerCtrl.editStuInfoPage)
// 请求修改学生信息的路由
studentManagerRouter.post('/edit/:id', studentManagerCtrl.editStuInfo)
// 获得添加学生信息页面的路由
studentManagerRouter.get('/add', studentManagerCtrl.addStuInfoPage)
// 请求添加学生信息的路由
studentManagerRouter.post('/add', studentManagerCtrl.addStuInfo)


// 暴露路由接口
module.exports = studentManagerRouter