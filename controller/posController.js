//引入model/posModel
const posModel = require("../model/posModel")
const moment = require("moment")
//添加数据然后返回前端
const add = async (req,res,next)=>{
    req.body.createTime = moment().format("YYYY-MM-DD HH:mm")
    let flag = await posModel.save(req.body)    // Promise<Pending>
    if(flag){
        res.render("api.succ.ejs",{
            data:JSON.stringify({
                message:"success"
            })
        })
    }else{
        res.render("api.fail.ejs",{
            data:JSON.stringify({
                message:"fail"
            })
        })
    }
}

const find = async(req,res,next)=>{
    let result = await posModel.find()
    res.render("api.succ.ejs",{
        data:JSON.stringify(result)
    })
}

const findById = async(req,res,next)=>{
    let result = await posModel.findById(req.params.id)
    res.render("api.succ.ejs",{
        data:JSON.stringify(result)
    })
}

const update = async(req,res,next)=>{
    req.body.createTime = moment().format("YYYY-MM-DD HH:mm")
    let flag = posModel.update(req.body.id,req.body)
    if(flag){
        res.render("api.succ.ejs",{
            data:JSON.stringify({
                message:"success"
            })
        })
    }else{
        res.render("api.fail.ejs",{
            data:JSON.stringify({
                message:"fail"
            })
        })
    }
}

const deleteOne = async(req,res,next)=>{
    let flag = await posModel.deleteOne(req.body.posId)
    if(flag){
        res.render("api.succ.ejs",{
            data:JSON.stringify({
                message:"success"
            })
        })
    }else{
        res.render("api.fail.ejs",{
            data:JSON.stringify({
                message:"fail"
            })
        })
    }
}   
module.exports = {
    add,
    find,
    findById,
    update,
    deleteOne
}