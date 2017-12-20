# 基于数据分析的图书管理系统(原创-全栈项目)
基于**Vue全家桶(2.x)+NodeJs+Express+MongoDB+ES6+iview**制作的图书管理系统，通过该系统来学习当下最流行的大框架和技术，采用前后端分类的开发方式，Vue全家桶（2.x）全部涉及。

##  [图书馆项目地址-https://github.com/majunchang/node-library](https://github.com/majunchang/node-library)

## 技术栈

#### 前端
- Vue: 用于构建用户界面的MVVM框架，它的核心是**实时响应的双向数据绑定和组件系统**
- vue-router: 为vue提供的路由系统，主要体现在路由的跳转，动效的过渡以及对于路由的限制等
- vuex: Vue的集中状态管理，在多个组件共享某些状态时非常便捷，降低了组件开发传递数据的复杂度
- axios： **基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 node.js 中使用**，该项目中前端所有请求都是通过axios来实现数据接收和页面渲染。
- ES6：ECMAScript的新一代语法，模块化，解构赋值，Promise，class等方法，使得开发变得更加简单。


#### 后端
- Node.js: 整个系统后端通过 Node.js 进行实现，通过 Express 框架实现后端的 REST 接口，并以 json 的形式进行输出，对于普通的post请求和文件上传类的post请求 使用body-parser中间件和formidable插件进行处理。


#### 数据库
- mongoDB: NoSQL数据库，使用mongoose进行数据库的连接和对于数据库的快速建模操作

## 收获

1. 掌握了在项目中运用Vue全家桶解决各类问题。
2. 熟悉了vue父子组件之间数据的传递和交互，熟悉了不相关的组件之间如何进行行为的触发和传值
3. 掌握了如何在vue中 使用相关的ui框架和第三方插件
4. 熟悉了组件化、模块化的开发思维，体会到了前后端分类开发的好处
5. 加深了对nodejs和相关模块(path,nodemailer等)的理解和掌握
6. 掌握了nodejs+mongoose操作数据库的一套完整的增删改查方法，体会到了图形统计的作用。

##  项目截图

#### 首页 
![mark](http://oneg19f80.bkt.clouddn.com/blog/20171220/100345688.png)

#### 注册页
![mark](http://oneg19f80.bkt.clouddn.com/blog/20171220/100549732.png)
#### 忘记密码页
![mark](http://oneg19f80.bkt.clouddn.com/blog/20171220/100616314.png)
#### 首页
![mark](http://oneg19f80.bkt.clouddn.com/blog/20171220/100732746.png)
#### 图书总览页
![mark](http://oneg19f80.bkt.clouddn.com/blog/20171220/100843901.png)
#### 分类总览页
![mark](http://oneg19f80.bkt.clouddn.com/blog/20171220/101142131.png)
#### 添加书籍页
![mark](http://oneg19f80.bkt.clouddn.com/blog/20171220/101158378.png)
#### 借书列表页
![mark](http://oneg19f80.bkt.clouddn.com/blog/20171220/101436083.png)
#### 数据分析页
![mark](http://oneg19f80.bkt.clouddn.com/blog/20171220/102026393.png)
![mark](http://oneg19f80.bkt.clouddn.com/blog/20171220/102040259.png)
#### 个人信息页
![mark](http://oneg19f80.bkt.clouddn.com/blog/20171220/101941269.png)
