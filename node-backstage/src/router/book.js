import express from 'express'

import * as bookController from '../controller/book'

const url = '/fullStack'
const router = express.Router();

router.get(url+'/addBook',book.addBook)

export default router