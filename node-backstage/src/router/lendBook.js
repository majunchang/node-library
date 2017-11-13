import express from 'express'

import * as lendBookController from '../controller/lendBook'

const url = '/fullStack'
const router = express.Router();

router.post(url+'/borrowBook',lendBookController.postBorrowBook)
router.get(url+'/lendBackList',lendBookController.getlendBackList)

export  default router;