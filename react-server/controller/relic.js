let Module = require('../model/relic')

let addRelic = (req,res,next) =>{
    console.log(req.body)
    req.body.state = '保存'
    Module(req.body).save().then(ret=>{
        if(ret){
            res.send({"errcode":0})
        }else{
            res.send({"errcode":-1})
        }
    }).catch(()=>{
        res.send({"errcode":-2})
    })
}



module.exports = {
    addRelic
}