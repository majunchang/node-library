import express from 'express'

import * as loginController from '../controller/login'

const url = '/fullStack'
const router = express.Router();

router.get(url+'/register',loginController.register)
router.post(url+'/login',loginController.login)

// 根据邮箱找回密码
router.post(url+'/SendEmail',loginController.SendEmail)

export  default  router;