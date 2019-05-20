import queryString from 'querystring'
export default  (req, res, next) => {
	// 由于表单 POST 请求可能会携带大量的数据，所以在进行请求提交的时候会分为多次提交
	// 具体分为多少次进行提交不一定，
	if(req.method.toLowerCase() === 'get') {
		// console.log("进入get")
		return next()
	}
	if(req.headers['content-type'].startsWith("multipart/form-data")){
		return next()
	}

	let data = ""
	req.on('data', chunk => {
		data += chunk
	})

	req.on('end',() => {
		req.body = queryString.parse(data)
		next()
	
	})
}