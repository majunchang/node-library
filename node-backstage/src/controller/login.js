// 引入操作user的数据库model
import {user} from '../models'

//声明处理错误的函数
// function handleErr(err) {
//     if (err) {
//         throw (err);
//     }
//     res.end(err.name + err.stack);
// }

export function register(req, res, next) {

    //  在这里注册 的时候 增加学号的注册  从20170001开始

    user
        .findOne({
            name: req.query.username
        }).then(result => {
        if (result) {
            res.json({
                code: 1,
                message: '用户名被占用'
            });
            return null
        }
        const newUser = new user({
            name: req.query.username,
            password: req.query.password
        })
        return newUser.save();
    }).then((docs) => {
        if (docs) {
            res.json({
                code: 0,
                message: '您已经成功注册了一个新用户'
            })
        }
    })
        .catch(err => {
            console.log(err);
        })
}

export function login(req, res, next) {
    var name = JSON.parse(req.body).name;
    user
        .findOne({
            name: name
        }).then(result => {
        if (result) {
            return res.json({
                code: 0,
                message: '登录成功'
            });
        }
        // 如果没有找到
        return res.json({
            code: 1,
            message: '数据库中 没有该用户'
        });
    }).catch(err => {
        console.log(err);
    })
}