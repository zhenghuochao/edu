import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/edu', {useNewUrlParser: true});

// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log("mongodb数据库链接成功");
// });

// 创建一个模型架构
// const personSchems = new mongoose.Schema({
//   name: String,
//   age:Number
// });

// 通过mongoose.model（） 将架构发布为一个模型
// const Person = mongoose.model('Person',personSchems)

// 通过操作模型去操作数据库

