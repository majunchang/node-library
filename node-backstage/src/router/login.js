import express from 'express'

import * as loginController from '../controller/login'

const url = '/fullStack'
const router = express.Router();


// 注册用户时  进行的邮箱验证
router.post(url+'/registerSendEmail',loginController.registerSendEmail)
router.get(url+'/register',loginController.register)
router.post(url+'/login',loginController.login)

// 根据邮箱找回密码
router.post(url+'/SendEmail',loginController.SendEmail)
// 验证邮箱 并更改密码
router.post(url+'/changePas',loginController.ChangePas)

export  default  router;