// 开启严格模式
"use strict"

// 导入所需的模块
const xtpl = require('xtpl')
const path = require('path')

// 导入操作mongodb数据库的模块
const dbManager = require(path.join(__dirname, '../tools/databaseManager.js'))

// 查询学生列表的方法
module.exports.queryStuList = (req, res) => {
	// 处理查询关键字、每页条数、页数
	// 若没有查询关键字，则默认为空
	let keyword = req.query.keyword || ''

	// 默认每页条数为2条
	let count = parseInt(req.query.count) || 2

	// 默认页数为第一页(索引为0)
	let page = parseInt(req.query.page) || 0

	// 获取满足查询条件的数据总条数
	dbManager.queryCount('students_info', { name: { $regex: keyword } }, (err, total) => {
		// 若出错，则报错返回
		if (err) {
			console.log(err)
			return false
		} else {
			// 根据每页要展示的条数，计算总页数
			const totalPages = Math.ceil(total / count)

			// 因为要动态生成页码组，所以创建一个存放页码的数组
			const pageArr = []
			for (let i = 0; i < totalPages; i++) {
				pageArr.push(i)
			}

			// 查询符合条件的数据列表并返回
			dbManager.queryList('students_info', { name: { $regex: keyword } }, page * count, count, (err, docs) => {
				// 如果出错，则报错返回
				if (err) {
					console.log(err)
					return false
				} else {
					// 将获取到的数据通过x-tpl模板引擎渲染到页面上
					xtpl.renderFile(path.join(__dirname, '../views/list.html'), { studentList: docs, keyword: keyword, page: page, count: count, pageList: pageArr }, (err, content) => {
						// 如果出错，则报错返回
						if (err) {
							console.log(err)
							return false
						} else {
							// 设置响应头
							res.setHeader('Content-type', 'text/html;charset=utf-8')
							// 设置响应体
							res.end(content)
						}
					})
				}
			})
		}
	})


}