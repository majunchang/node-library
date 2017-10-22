import express from 'express'

const bodyParser = require('body-parser')
const app = express()


// body-parser 专门用来解析表单 post 请求体
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const router = express.Router()

router.get('/', (req, res, next) => {
  Contact
    .find()
    .then(contacts => {
      // var data = {
      //   err_code: 0,
      //   result: contacts
      // }
      // data = JSON.stringify(data)
      // res.end(`${req.query.callback}(${data})`)

      // express 内置了一个 jsonp 方法，可以直接传入一个对象
      // 内部会自动将本次请求路径中的查询字符串里面的 callback 拿出来
      // 然后和要发送的数据对象包装起来，格式如下：
      // /**/ typeof callbackName === 'function' && callbackName(响应数据)
      // res.jsonp({
      //   err_code: 0,
      //   result: contacts
      // })

      // 在响应头中加入以下首部字段，浏览器就不会有跨域限制了
      // res.set("Access-Control-Allow-Origin", "*")

      res.json({
        err_code: 0,
        result: contacts
      })

    })
})

router.post('/', (req, res, next) => {
  const body = req.body
  const contact = new Contact({
    name: body.name,
    phone: body.phone,
    remark: body.remark
  })
  contact
    .save()
    .then(contact => {
      res.json({
        err_code: 0,
        contact
      })
    })
})

router.get('/:id', (req, res, next) => {
  Contact
    .findById(req.params.id)
    .then(contact => {
      res.json({
        err_code: 0,
        result: contact
      })
    })
})

router.patch('/:id', (req, res, next) => {
  const body = req.body
  Contact
    .findById(req.params.id)
    .then(contact => {
      contact.name = body.name
      contact.phone = body.phone
      contact.remark = body.remark
      return contact.save()
    })
    .then(contact => {
      res.json({
        err_code: 0,
        result: contact
      })
    })
})

router.delete('/:id', (req, res, next) => {
  Contact
    .remove({
      _id: req.params.id
    })
    .then(() => {
      res.json({
        err_code: 0
      })
    })
})


app.use('/contacts', router)

app.listen(3000, () => {
  console.log('API Server is Running...')
})
