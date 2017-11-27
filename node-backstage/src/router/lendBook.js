import express from 'express'

import * as lendBookController from '../controller/lendBook'

const url = '/fullStack'
const router = express.Router();

router.post(url+'/borrowBook',lendBookController.postBorrowBook)
router.get(url+'/lendBackList',lendBookController.getlendBackList)
//  管理员进入还书界面的时候 查询所有书籍
router.get(url+'/ManagerlendBackList',lendBookController.getManagerlendBackList)
// 读者归还书籍
router.get(url+'/returnLendBook',lendBookController.returnLendBook)
// 读者续借书籍
router.get(url+'/renewLendBook',lendBookController.renewLendBook)

// 查找当前热门书籍
router.get(url+'/getCurrentHot',lendBookController.getCurrentHot)

export  default router;