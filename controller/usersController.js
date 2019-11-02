//引入usersModel
const usersModel = require("../model/usersModel")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const path = require("path")
const
const loginup = async (req,res,next)=>{
    //获取用户名  对象的解构
    let {username}= req.body; 
    let flag = await usersModel.findUser({username});
    if(flag){ //说明数据库已经有这个用户名了
        res.render("api.succ.ejs",{
            data:JSON.stringify({message:"此用户名已存在，请重新注册！"})
        })
    }else{
        let flag = await usersModel.loginup(req.body)
        flag ? res.render("api.succ.ejs",{
                data:JSON.stringify({message:"恭喜您！注册成功！"})
            })
            :
            res.render("api.succ.ejs",{
                data:JSON.stringify({message:"注册失败！"})
            })    
    }
}

const loginin = async(req,res,next)=>{
    let flag = await usersModel.findUser(req.body)
    if(flag){
        //服务端产生token令牌
        let token = genToken({username:req.body.username})
        res.render("api.succ.ejs",{
            data:JSON.stringify({username:req.body.username,token})
        })
    }else{
        res.render("api.fail.ejs",{
            data:JSON.stringify({message:"用户名或者密码输入错误，请重新登录！"})
        })    
    }
}

//生成token
function genToken(payload){
    //非对称加密
    //后端对于payLoad进行私钥加密  然后后端对于前端每次请求携带来的token进行公钥解密
    //生成私钥  ssh-keygen -t rsa -b 2048 -f private.key
    //生成公钥  openssl rsa -in private.key -pubout -outform PEM -out public.key
    let privateKey = fs.readFileSync(path.resolve(__dirname,"../keys/private.key"))
    let token = jwt.sign(payload,privateKey,{ 
        algorithm: 'RS256',
        expiresIn:'5h'
    })
    return token;
}


//验证登录
const isloginin = async(req,res,next)=>{
    res.render("api.succ.ejs",{
        data:JSON.stringify({username:req.username})
    })

    // let token = req.header("X-Access-Token")
    // let cert = fs.readFileSync(path.resolve(__dirname,"../keys/public.key"))
    // jwt.verify(token,cert,function(err,decoded){
    //     if(!err){
    //         res.render("api.succ.ejs",{
    //             data:JSON.stringify({username:decoded.username})
    //         })
    //     }else{
    //         res.render("api.fail.ejs",{
    //             data:JSON.stringify("用户验证失败！")
    //         })
    //     }
    // })
}


module.exports = {
    loginup,loginin,isloginin
}