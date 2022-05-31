let mongoose = require('mongoose')      //引入mongoose
let Schema = new mongoose.Schema({        //设定规则   required：必须写   unique:唯一    default：默认值
    relicname:{type:String,required:true,unique:true},
    years:{type:String,required:true},
    integrity:{type:String},
    level:{type:String}
})

let userModule = mongoose.model('relic',Schema)    //生成模型
module.exports = userModule                        //暴露模型