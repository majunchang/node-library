// 引入操作user的数据库model
import {user} from '../models'
import fileFormidable from '../middlewares/file-formidable'
// 引入nodejs的模块中 的path膜快
import {basename} from 'path'

export function postUploadFiles(req, res, next) {
    // res.json({
    //     code: 0,
    //     result: req
    // })
    fileFormidable(req)
        .then((result) => {
            const [fileds, files] = result
            // console.log(fileds);
            // console.log(files);
            // console.log(files.file);
            // console.log(files.file.path);
            res.json({
                code: 0,
                imageSrc: `/static/images/${basename(files.file.path)}`,
                message: '上传文件成功'
            })
        })
        .catch((err) => {
            res.json({
                code: 500,
                message: '解析图片失败'
            })
            console.log('林允儿');
            console.log(err);
            return
        })

}