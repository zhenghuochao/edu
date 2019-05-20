import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient

const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'edu';

export default (errLog, req, res, next) => {

MongoClient.connect(url, function(err, client) {
	  // if(err) {
	  // 	return next(err)
	  // }
	  console.log("mongodb数据库链接成功");

	  const db = client.db(dbName);

	  // 操作数据库
	 const collection =  db.collection('error_logs');
	 collection.insertOne(
	 	{
	 		name:errLog.name,
	 		message:errLog.message,
	 		stack:errLog.stack,
	 		time:new Date()
	 	},
	 	(err,result) => {
	 	// if(err){
	 	// 	throw err
	 	// }
	 	  res.json({
	 	  	err_code: 500,
	 	  	message:errLog.message
	 	  })
	 })


	  // 关闭数据库
	  client.close();
	});
}