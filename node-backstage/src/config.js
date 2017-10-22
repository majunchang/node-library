//  在这里面 配置路由  path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
import {join} from  'path'

export default {
    public_path:join(__dirname,'../public'),
}

