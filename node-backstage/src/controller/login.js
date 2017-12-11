// 引入操作user的数据库model
import {user} from '../models'
import nodeMailer from 'nodemailer'

//声明处理错误的函数
// function handleErr(err) {
//     if (err) {
//         throw (err);
//     }
//     res.end(err.name + err.stack);
// }


function geneRateMix(n) {
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}

var randomRegisterMailContent = ''
var randomRegisterMailArr = []

// 注册的时候 向邮箱发送验证码
export function registerSendEmail(req, res, next) {
    var mailBox = JSON.parse(req.body).mailBox;
    var userName = JSON.parse(req.body).userName;

    //  在这里做一下  当用户发送多次验证码和服务器高并发的情况
    // 这里与下面的 忘记密码的操作很相似 可以进行封装为一个共有函数去处理  在这里不做具体说明
    randomRegisterMailContent = geneRateMix(6);
    var registerMailObj = {
        userName: userName,
        randomRegisterMailContent: randomRegisterMailContent
    }
    if (randomRegisterMailArr.length === 0) {
        randomRegisterMailArr.push(registerMailObj)
    }
    for (var k = 0; k < randomRegisterMailArr.length; k++) {
        if (randomRegisterMailArr[k].userName = registerMailObj.userName) {
            randomRegisterMailArr[k].randomRegisterMailContent = registerMailObj.randomRegisterMailContent
            break; // 在这里终止循环
        }
        randomRegisterMailArr.push(registerMailObj)
    }
    if (randomRegisterMailArr.length > 20) {
        randomRegisterMailArr.shift()
    }
    var smtpTransport = nodeMailer.createTransport({
        service: 'SMTP',
        host: 'smtp.163.com',
        secureConnection: true,
        port: 465,
        auth: {
            user: '13012270529@163.com',
            pass: 'majunchang521'
        }
    })

    var mailOptions = {
        from: '13012270529@163.com',
        to: mailBox,
        subject: '图书管理系统注册账户验证码',
        html: `<h2>图书管理系统注册账户验证码:</h2><h3>
    <p>您的验证码是</p><p>${randomRegisterMailContent}</p></h3>`
    };

    smtpTransport.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.json({
                code: 501,
                message: '发送邮件失败'
            })
            return
        }
        res.json({
            code: 0,
            message: '发送邮件成功',
            checkCode: randomRegisterMailContent
        })
    })


}

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
            password: req.query.password,
            mail: req.query.mailBox
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

var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
/*
    在这里 本来想使用一个全局变量  去保存验证码 但是 当出现高并发的情况的时候 这种变量就不再适用了
    这种随机生成的验证码 最好和用户去关联起来

 */
var randomMailContent = ''
var userForgetArr = [];


//  向邮箱发送验证码
export function SendEmail(req, res, next) {
    var userName = JSON.parse(req.body).userName;
    var mailBox = JSON.parse(req.body).mailBox;

    // console.log(userName);
    // console.log(mailBox);
    user.findOne({
        name: userName
    }).then((user) => {
        if (!user) {
            console.log(user);
            res.json({
                code: 1,
                message: '该用户不存在'
            })
            return
        }
        if (user.mailBox != mailBox.trim()) {
            res.json({
                code: 1,
                message: '用户注册邮箱有误,不能核实使用人身份！'
            })
            return
        }

        randomMailContent = geneRateMix(6);
        // console.log(randomMailContent);
        var mailObj = {
            userName: userName,
            randomMailContent: randomMailContent
        }
        //  在这里做一下去重判断
        if (userForgetArr.length === 0) {
            userForgetArr.push(mailObj)
        }
        for (var i = 0; i < userForgetArr.length; i++) {
            if (userForgetArr[i].userName === mailObj.userName) {
                userForgetArr[i].randomMailContent = mailObj.randomMailContent
                break
            }
            userForgetArr.push(mailObj)
        }
        if (userForgetArr.length > 10) {
            userForgetArr.shift()
        }

        var smtpTransport = nodeMailer.createTransport({
            service: 'SMTP',
            host: 'smtp.163.com',
            secureConnection: true,
            port: 465,
            auth: {
                user: '13012270529@163.com',
                pass: 'majunchang521'
            }
        })

        var mailOptions = {
            from: '13012270529@163.com',
            to: mailBox,
            subject: '图书管理系统密码找回',
            html: `<h2>图书管理系统密码找回:</h2><h3>
    <p>您的验证码是</p><p>${randomMailContent}</p></h3>`
        };

        smtpTransport.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.json({
                    code: 501,
                    message: '发送邮件失败'
                })
            }
            res.json({
                code: 0,
                message: '发送邮件成功',
            })
            return false;
        })

    }).catch((err) => {
        console.log(err);
        res.json({
            code: 502,
            message: '邮件发送失败'
        })
        return
    })
}


// 验证前端传回的验证码 进行密码修改功能
export function ChangePas(req, res, next) {
    var userName = JSON.parse(req.body).userName;
    var mailCheckNum = JSON.parse(req.body).mailCheckNum;
    var newPas = JSON.parse(req.body).newPas;
    var result = false
    // 首先 检查验证码 然后根据用户名 找到数据库的数据 进行更改
    userForgetArr.forEach((item, index) => {

        if ((item.userName === userName) && (item.randomMailContent.toLowerCase() === mailCheckNum.toLowerCase())) {
            result = true
        }
    })
    // console.log(JSON.stringify(userForgetArr));
    // console.log(result);
    // console.log(userName);
    if (!result) {
        res.json({
            code: 1,
            message: '验证码输入错误,请重新输入'
        })
        return
    }

    user.find({
        name: userName
    }).then((book) => {
        // console.log(book);
        book[0].password = newPas;
        return book[0].save()
    }).then((docs) => {
        res.json({
            code: 0,
            message: '修改密码成功'
        })
    }).catch((err) => {
        console.log(err);
        if (err) {
            res.json({
                code: 500,
                message: '修改密码失败'
            })
            return
        }
    })

}

