import express from 'express'

import advert from './admin/advert.js'
import index from './admin/index.js'

const router= express.Router()

router.get('/', function (req, res, next) {
	res.render('index.html')
});

router.use("",index)
router.use("/advert",advert)


export default router