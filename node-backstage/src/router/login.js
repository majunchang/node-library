import express from 'express'

import * as loginController from '../controller/login'

const url = '/fullStack'
const router = express.Router();

router.get(url+'/register',loginController.register)
router.post(url+'/login',loginController.login)

export  default  router;