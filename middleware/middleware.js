const jwt = require("jsonwebtoken");
let blogModel=require("../Models/BlogModel")

const validationMiddleware = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
         if (!token) return res.status(400).send({ status: false, msg: "token must be present in header" });
         let decodedToken = jwt.verify(token, "project-1-Room-9");
         req.decodedToken = decodedToken
        if (!decodedToken) return res.status(400).send({ status: false, msg: "token is invalid" });
        else {next()}
    }
    catch(err){
        res.status(500).send({msg:err.message})
    }
}

const authorization =async  function  (req, res, next) {
    try {
        let blog= await blogModel.findOne({_id:req.params.blogId})
        if(!blog)return res.status(404).send({status:false,msg:"No such Blog is in dB"})
        console.log(blog.authorId)
        res.send({msg:blog})}
    //     let authId=blog.authorId
    //    if (authId !== res.decodedToken.authorId) return res.status(400).send({ status: false, msg: "you do not have authorization to this " });
   // else {next()}}
    catch(err){
        res.status(500).send({msg:err.message})
    }
}

module.exports.validationMiddleware = validationMiddleware
module.exports.authorization = authorization