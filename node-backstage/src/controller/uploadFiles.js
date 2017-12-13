// 引入操作user的数据库model
import {user} from '../models'
import nodeMailer from 'nodemailer'
import fileFormidable from '../middlewares/file-formidable'


export function postUploadFiles(req, res, next) {
    // res.json({
    //     code: 0,
    //     result: req
    // })
    fileFormidable(req)
        .then((result) => {
            const [fileds, files] = result
            console.log(fileds);
            console.log(files);
            res.json({
                err_code: 0,
                // imageSrc: `/public/upload/${basename(files.image.path)}`
                message: '上传文件成功'
            })
        })
        .catch((err) => {
            res.json({
                code: 500,
                message: '解析图片失败'
            })
            console.log(err);
            return
        })

}