let mongoose = require('mongoose')      //引入mongoose
let Schema = new mongoose.Schema({        //设定规则   required：必须写   unique:唯一    default：默认值
    username:{type:String,required:true,unique:true},
    password:{type:String},
    role:{type:String}
})

let userModule = mongoose.model('user',Schema)    //生成模型
module.exports = userModule                        //暴露模型