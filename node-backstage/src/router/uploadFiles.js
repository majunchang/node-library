import express from 'express'

import * as uploadController from '../controller/uploadFiles'

const url = '/fullStack'
const router = express.Router();


router.post(url+'/uploadFiles',uploadController.postUploadFiles)



export  default  router;