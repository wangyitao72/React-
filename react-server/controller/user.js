let Module = require('../model/user')
let jwt = require('jsonwebtoken')

let addUser = (req,res,next) =>{

    // console.log(req.body)
    req.body.role = '员工'
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

let Login = (req,res,next) =>{
    console.log(req.query)
    Module.findOne({"username":req.query.username, "password":req.query.password,"role":req.query.role}).then((ret)=>{
        if(ret){
            let token = jwt.sign({username:req.query.username,role:req.query.role},'wocwocc',{ expiresIn: 60*60*24})
            res.send({"errcode":0,"ret":ret,"token":token,"req":req.query})
        }else{
            res.send({"errcode":-1})
        }
    }).catch(()=>{
        res.send({"errcode":-2})
    })
}

let UpdatePassword = (req,res,next) => {
    Module.updateOne({"username":req.body.username},{$set:{"password":req.body.password}}).then((ret)=>{
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
    addUser,
    Login,
    UpdatePassword
}