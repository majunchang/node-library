import express from 'express'

import * as bookController from '../controller/book'

const url = '/fullStack'
const router = express.Router();

router.post(url+'/addBook',bookController.addBook)
// 查询所有书籍
router.get(url+'/getAllBook',bookController.getAllBook)
// 将需要更新的原始数据返回给前端
router.get(url+'/updateBook',bookController.getUpdateBook)
// 将前端修改后的数据传给后台
router.post(url+'/updateBook',bookController.postUpdateBook)
// 删除书籍
router.get(url+'/removeBook',bookController.removeBook)

export default router