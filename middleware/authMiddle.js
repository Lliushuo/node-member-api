const jwt = require("jsonwebtoken")
const fs = require("fs")
const path = require("path")
module.exports = (req,res,next)=>{
    let token = req.header("X-Access-Token")
    let cert = fs.readFileSync(path.resolve(__dirname,"../keys/public.key"))
    jwt.verify(token,cert,function(err,decoded){
        if(!err){
            req.username = decoded.username;
            next();//交给下一个中间件
        }else{
            res.render("api.fail.ejs",{
                data:JSON.stringify("用户验证失败！")
            })
        }
    })
}