const { isValidObjectId } = require("mongoose")
const blogModel= require("../Models/BlogModel")
const AuthorModel= require("../Models/authormodel")

const createBlog= async function (req, res) {
    try{
    let {title,body,authorId,category} = req.body

    if(!title||!body||!authorId||!category){return res.status(400).send({status:false,msg:"all field is mandatory"})}
    if(!isValidObjectId(authorId)){return res.status(400).send({status:false,msg:"author id is not valid"})}

    let authorchk = await AuthorModel.find({_id:authorId})
    if(authorchk.length<1) {return res.status(400).send({status:false,msg:"author id is not present in db"})}

    let blogCreated = await blogModel.create(req.body)
    res.status(201).send({data: blogCreated})
}
catch(error){
    message=error.message
    res.status(500).send({status:false,msg:message})
}}

const getBlogData= async function (req, res) {
try{
    let authQuery=req.query.authorId
    let cata=req.query.category
    let tag=req.query.tag
    let subcategory=req.query.subcategory
    let blogs = await blogModel.find().populate('authorId')



    res.status(200).send({status:true,msg:blogs})

}
catch(error){
   res.status(500).send({status:false,msg:error.message})
}}
module.exports.createBlog=createBlog
module.exports.getBlogData=getBlogData
