const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors")
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')

const form = new formidable.IncomingForm();
// 解决跨域
app.use(cors())
// 处理请求的 content-type 为a pplication/json
app.use(bodyParser.json())

//处理请求的 content-type 为 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

app.get('/user', (req, res) => {
  console.log('get请求内容==>', req.query)
  res.send('成功接收get请求')
})

app.post('/user', (req, res) => {
  console.log('post请求体==>', req.body)
  res.send('成功接收post表单请求')
})

app.post('/ajax', (req, res) => {
  console.log('ajax请求体==>', req.body)
  res.json(req.body)
})

app.post('/file', (req, res) => {
  form.parse(req, function (err, fields, files) {
    console.log('post请求文件==>', files)
    res.send('成功接收post文件请求')

  })
})
app.listen(3008, () => {
  console.log('服务已启动...')
})