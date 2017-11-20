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

var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var randomMailContent = ''

function geneRateMix(n) {
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}

//  想邮箱发送验证码
export function SendEmail(req, res, next) {
    var userName = JSON.parse(req.body).userName;
    var mailBox = JSON.parse(req.body).mailBox;

    console.log(userName);
    console.log(mailBox);
    user.findOne({
        name: userName
    }).then((user) => {
        if(!user){
            console.log(user);
             res.json({
                code: 1,
                message: '数据库中 没有该用户'
             })
    }
            randomMailContent = geneRateMix(6);
            var smtpTransport = nodeMailer.createTransport({
                service:'SMTP',
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

            smtpTransport.sendMail(mailOptions,  (err, info)=> {
                if (err) {
                    return res.json({
                        code: 500,
                        message: '发送邮件失败'
                    })
                }
                res.json({
                    code: 0,
                    message: '发送邮件成功'
                })
                return false;
            })

    }).catch((err)=>{
        console.log(err);
         res.json({
            code:500,
            message:'邮件发送失败'
        })
        return
    })
}