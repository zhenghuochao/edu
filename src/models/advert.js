import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/edu', {useNewUrlParser: true});

// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log("mongodb数据库链接成功");
// });

// 创建一个模型架构
const advertSchema = new mongoose.Schema({
  title:{type:String,required:true},
  image: {type:String,required:true},
  link: {type:String,required:true},
  start_time:{type:Date,required:true},
  end_time:{type:Date,required:true},
  create_time:{type:Date,default:Date.now},
  last_time:{type:Date,default:Date.now},

});

// 通过mongoose.model（） 将架构发布为一个模型
const Advert = mongoose.model('Advert',advertSchema)

// 通过操作模型去操作数据库
export default Advert
