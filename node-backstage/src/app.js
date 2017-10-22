import path from 'path'
import express from 'express'
import config from './config'

// 手动封装一个 处理普通的post请求的文件
import bodyParser from './middlewares/body-parser'
// 将所有的路由 以读文件的形式 封装 然后引入 这个对象
import mountRouter from './middlewares/mount-router'

const app = express();

//  挂载静态路径
app.use('/public', express.static(config.public_path));

// 挂载解析普通post请求的中间件
app.use(bodyParser)

// 对页面添加限制
/*
 1 必须登录才可以访问的页面
 2 只能是非登录状态才可以访问的页面
 3 无论是登录还是非登录都可以访问的页面
 */
app.use((req, res, next) => {
    const arr = ['/login', 'register'];
    if (arr.includes(req.path)) {
        return next()
    }
    next();
})

mountRouter.configure(path.join(__dirname,'router'),{
    express:app
})

app.listen(3000,()=>{
    console.log('服务器已经启动,监听的端口号是3000');
})