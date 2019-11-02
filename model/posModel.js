//就是一个M层
const db = require("../utils/db-utils")
//创建集合
const positionSchema = db.Schema({
    city:{type:String,required:true},
    companyName:{type:String,required:true},
    degree:{type:String,required:true},
    description:{type:String,required:true},
    experience:{type:String,required:true},
    positionName:{type:String,required:true},
    salary:{type:String,required:true},
    type:{type:String,required:true},
    createTime:{type:String,required:true}
})

const Position = db.model("positions",positionSchema)


//插入数据的方法  mongodb中对于数据库的操作都是异步的！
const save = (data)=>{
    return Position.insertMany(data)
                   .then(res=>{
                       return true
                   })
                   .catch(err=>{
                       return false
                   })
}

//查找所有职位的方法
const find = ()=>{
    return Position.find()
}

//根据传入的Id查找对象
const findById = id=>{
    return Position.findById(id)
}

//根据传入的id和更新的数据进行更新操作
const update = (id,data)=>{
    return Position.findByIdAndUpdate(id,data)
                   .then(res=>{
                       return true
                   })
                   .catch(err=>{
                       return false
                   })
}


const deleteOne = id=>{
    return Position.deleteOne({_id:id}) //findByIdAndRemove(id)
                   .then(res=>{
                       return true
                   })
                   .catch(err=>{
                       return false
                   })
}

module.exports = {
    save,find,findById,update,deleteOne
}