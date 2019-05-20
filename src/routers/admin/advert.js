import express from 'express'
import { basename } from 'path'
import formidable from 'formidable'
import config from '../../config'
import Advert from '../../models/advert'
import * as AdvertController from '../../controllers/admin/advert'

const router= express.Router()

router.get('/',(req,res,next) =>{

const page =Number(req.query.page,10)
const pageSize = 5
	Advert
		.find()
		.skip( (page - 1) * pageSize)
		.limit(pageSize)
		.exec((err,adverts) => {
		if(err) {
			return next(err)
		}
		Advert.count((err,count) => {
			if(err) {
				return next(err)
			}
			const totalPage = Math.ceil(count / pageSize)

			res.render('advert_list.html',{adverts,page,totalPage})
		})


		
	})
	
	

})
router.get('/add',(req,res,next) =>{

	res.render('advert_add.html')

})

router.get('/list',(req,res,next) =>{
	Advert.find((err,docs) => {
		if(err) {
			return next(err)
		}

		res.json({
		  	err_code:0,
		  	data:docs
		})

	})

})

router.post('/add',  (req, res, next) =>{


const form = new formidable.IncomingForm();
form.uploadDir =config.uploadDir
form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
      	if(err){
      		return next(err)
      	}
      	const body = fields
      	body.image = basename(files.image.path)
      	// console.log(files)

		const advert = new Advert({
			  title:body.title,
			  image: body.image,
			  link: body.link,
			  start_time:body.start_time,
			  end_time:body.end_time,
		})
		advert.save( (eror,reslut) => {
		  if (eror){
		  	 return next(err)
		  }
		  res.json({
		  	err_code:0,
		  	data:reslut
		  })
		});

    });

});


router.get("/one/:advertId",(req,res,next) =>{
	// res.end(req.params.advertId);

	Advert.findById(req.params.advertId,(err,reslut) => {
		if(err) {
			return next(err)
		}

		res.json({
		  	err_code:0,
		  	data:reslut
		})
	
	})
})

router.post("/edit",(req,res,next) =>{


	Advert.findById(req.body.id,(err,advert) => {
		if(err) {
			return next(err)
		}
		const { title,image,link,start_time,end_time  }=  req.body
		  advert.title = title
		  advert.image =  image
		  advert.link =  link
		  advert.start_time = start_time
		  advert.end_time = end_time
		  advert.last_time = Date.now()

		 advert.save((err,reslut) =>{
		 	if(err) {
		 		return next(err)
		 	}

		 	res.json({
		 		err_code:0,
		 		reslut:reslut
		 	})
		 })
	
	})
})



router.get("/del/:advertId",(req,res,next) =>{


	Advert.remove({_id:req.params.advertId}, err =>{
		if(err) {
			return next(err)
		}

		res.json({
			err_code:0
		})
	})
})

export default router