//  http://nodejs.cn/api/querystring.html
//  引入queryString模块
import queryString from 'querystring'

export default (req, res, next) => {

    if (req.method.toLowerCase() === 'get') {
        return next();
    }
    // console.log(req.headers['content-type']);
    // 如果是有文件的表单post 则交给另一个方法去处理
    if(req.headers['content-type'].startsWith('multipart/form-data')){
        return next();
    }
    // 如果是普通表单post 则自己处理 application/x-www-form-urlencoded
    // 在这里使用数据流的形式
    let data = '';
    req.on('data',chunk => {
        data += chunk;
    })

    // 数据接收完毕之后 触发end时间
    req.on('end',()=>{
        console.log('liuyifei');
        // 将拼接字符串类型的data  转化为了对象
        req.body = queryString.parse(data);
        console.log(req.body);
        next();
    })
}