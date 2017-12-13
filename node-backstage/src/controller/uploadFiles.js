// 引入操作user的数据库model
import {user} from '../models'
import nodeMailer from 'nodemailer'


export function postUploadFiles(req, res, next) {
    res.json({
        code: 0,
        result: req
    })
}