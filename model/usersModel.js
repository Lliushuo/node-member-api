const db = require("../utils/db-utils")
const usersSchema = db.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true}
})
//创建Users
const Users = db.model("users",usersSchema)


//注册用户的方法
const loginup = data=>{
    return Users.insertMany(data)
                .then(res=>true)
                .catch(err=>{
                    return false
                })
}

const findUser = data=>{
    return Users.findOne(data)
}

module.exports = {
    loginup,
    findUser
}