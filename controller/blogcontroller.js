const { isValidObjectId } = require("mongoose")
const blogModel= require("../Models/BlogModel")

const createBlog= async function (req, res) {
    try{
    let {title,body,authorId,category} = req.body
   
    if(!title||!body||!authorId||!category){res.status(400).send({status:false,msg:"all field is mandatory"})}
    if(!isValidObjectId(authorId)){res.status(400).send({status:false,msg:"author id is not valid"})}
    let blogCreated = await blogModel.create(req.body)
    res.send({data: blogCreated})
}
catch(error){
    message=error.message
    res.status(500).send({status:false,msg:message})
}}

const getBlogData= async function (req, res) {
    let blogs = await BlogModel.find()
    res.send({data: blogs})
}
module.exports.createBlog=createBlog
module.exports.getBlogData=getBlogData
