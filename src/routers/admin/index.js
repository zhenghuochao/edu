import express from 'express'
import * as IndexController from '../../controllers/admin/index.js'

const router= express.Router()

router.get('/',IndexController.showIndex);



export default router