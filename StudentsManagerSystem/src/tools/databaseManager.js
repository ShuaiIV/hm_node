// 开启严格模式
"use strict"

// 导入所需的模块
const mongodb = require('mongodb')

// 创建数据库管理系统
const mongodbClient = mongodb.MongoClient

// // mongodb的ID前缀
// const objectID = mongodb.ObjectId

// 要连接的数据库地址
const url = "mongodb://localhost:27017/hm_db"

// 获取到db对象
const getDB = (callback) => {
	// 连接到数据库
	mongodbClient.connect(url, (err, db) => {
		// 回调中指向后续操作
		callback(err, db)
	})
}

// 精准查询一条数据的方法
/**
 * @param {str} collectionName 要查询数据的集合名
 * @param {obj} condition 查询条件
 * @param {fn} callback 返回查询结果后，执行的回调函数
 */
module.exports.queryOne = (collectionName, condition, callback) => {
	// 获取到db对象
	getDB((err, db) => {
		// 出错则报错返回
		if (err) {
			console.log(err)
			return false
		} else {
			// 连接到数据库后
			// 获取要查询的集合
			let collection = db.collection(collectionName)

			// 根据查询条件查询数据库
			collection.findOne(condition, (err, doc) => {
				// 回调函数处理返回的结果
				callback(err, doc)

				// 关闭数据库
				db.close()
			})
		}
	})
}

// 查询多条数据的方法
/**
 * @param {str} collectionName 要查询数据的集合名
 * @param {obj} condition 查询条件
 * @param {num} skipCount 要跳过的数据个数
 * @param {num} limitCount 每页的数据数
 * @param {fn} callback 返回查询结果后，执行的回调函数
 */
module.exports.queryList = (collectionName, condition, skipCount, limitCount, callback) => {
	// 获取到db对象
	getDB((err, db) => {
		// 出错则报错返回
		if (err) {
			console.log(err)
			return false
		} else {
			// 连接到数据库后
			// 获取要查询的集合
			let collection = db.collection(collectionName)

			// 根据查询条件查询数据库
			collection.find(condition).skip(skipCount).limit(limitCount).toArray((err, docs) => {
				// 回调函数处理返回的结果
				callback(err, docs)

				// 关闭数据库
				db.close()
			})
		}
	})
}

// 获取满足查询条件的数据个数
/**
 * @param {str} collectionName 要查询数据的集合名
 * @param {obj} condition 查询条件
 * @param {fn} callback 返回查询结果后，执行的回调函数
 */
module.exports.queryCount = (collectionName, condition, callback) => {
	// 获取到数据库对象
	getDB((err, db) => {
		// 如果出错，则报错返回
		if (err) {
			console.log(err)
			return false
		} else {
			// 获取集合
			let collection = db.collection(collectionName)
			// 查询满足查询条件的数据个数
			collection.find(condition).count((err, count) => {
				// 将查询结果传递到回调中
				callback(err, count)

				// 关闭数据库
				db.close()
			})
		}
	})
}

// 新增一条数据的方法
/**
 * @param {str} collectionName 要新增数据的集合名
 * @param {obj} condition 新增数据的属性
 * @param {fn} callback 返回新增结果后，执行的回调函数
 */
module.exports.addOne = (collectionName, condition, callback) => {
	// 获取数据库对象
	getDB((err, db) => {
		// 如果出错，则报错返回
		if (err) {
			console.log(err)
			return false
		} else {
			// 获取集合
			let collection = db.collection(collectionName)

			// 新增数据
			collection.insertOne(condition, (err, doc) => {
				// 将新增的结果传递到回调中
				callback(err, doc)

				// 关闭数据库
				db.close()
			})
		}
	})
}

// 修改数据的方法
/**
 * @param {str} collectionName 要修改数据的集合名
 * @param {obj} condition 要修改的数据的查询条件
 * @param {obj} newValue 要修改的属性
 * @param {fn} callback 返回修改结果后，执行的回调函数
 */
module.exports.updateValue = (collectionName, condition, newValue, callbakc) => {
	// 获取到数据库对象
	getDB((err, db) => {
		// 若出错，则报错返回
		if (err) {
			console.log(err)
			return false
		} else {
			// 获取到要查询的集合
			let colleciton = db.collection(collectionName)

			// 修改指定的数据
			collection.updateOne(condition, {$set: newValue}, (err, doc) => {
				// 将修改后的结果传递到回调中
				callback(err, doc)

				// 关闭数据库
				db.close()
			})
		}
	})
}

// 删除一条数据的方法
/**
 * @param {str} collectionName 要删除数据的集合名
 * @param {obj} condition 要输出数据的查询条件
 * @param {fn} callback 返回删除结果后，执行的回调函数
 */
module.exports.removeOne = (collectionName, condition, callback) => {
	// 获取数据库对象
	getDB((err, db) => {
		// 若出错，则报错返回
		if (err) {
			console.log(err)
			return false
		} else {
			// 获取要删除数据的集合
			let collection = db.collection(collectionName)

			// 删除指定的数据
			collection.deleteOne(condition, (err, doc) => {
				// 将删除结果传递到回调中
				callback(err, doc)

				// 关闭数据库
				db.close()
			})
		}
	})
}