import express from 'express'
import config from './config'
import nunjucks from 'nunjucks'
import {home,admin} from './routers'

import bodyParser from './middlewares/body-parser'
import errorLog from './middlewares/error_log.js' 

const app = express()


// 静态资源文件
app.use('/public', express.static(config.public_path))
// node_modules文件
app.use("/node_modules",express.static(config.node_modules_path))

// 模板引擎设置
// ejs
// app.set('views',config.ViewPath)
// app.set('view engine', 'ejs')
//  app.engine('html', ejs.__express);
// app.set('view engine', 'html');
// 

// nunjucksn
nunjucks.configure(config.ViewPath, {
    autoescape: true,
    noCache :true,
    express: app
});

// 解析处理表单 POST 请求体中间件
app.use(bodyParser)

app.use("/",home)
app.use("/admin",admin)


app.use(errorLog)

app.listen(3000, () => {
	console.log("server listen prot 3000")
})