const express = require('express')                        //路由属于是express的东西
var router = express.Router()                             //获得路由实例
let {addUser,Login,UpdatePassword} = require('../controller/user')                            //去C中获得需要的方法
router.post('/adduser',addUser)                                     //设定路径
router.get('/login',Login)
router.post('/updatepswd',UpdatePassword)
module.exports = router  