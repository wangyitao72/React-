const express = require('express')                        //路由属于是express的东西
var router = express.Router()                             //获得路由实例
let {addRelic} = require('../controller/relic')                            //去C中获得需要的方法
router.post('/addrelic',addRelic)                                     //设定路径
module.exports = router  