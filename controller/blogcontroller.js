const { isValidObjectId } = require("mongoose")
const blogModel= require("../Models/BlogModel")
const AuthorModel= require("../Models/authormodel")

const createBlog= async function (req, res) {
    try{
    let {title,body,authorId,category} = req.body
    let sendbody = req.body
    let bodydata=Object.keys(sendbody)
    if(bodydata.length==0){return res.status(400).send({status: false, msg:"body is empty" })}

    if(!title){return res.status(400).send({status:false,msg:"title is mandatory"})}
    if(!body){return res.status(400).send({status:false,msg:"body is mandatory"})}
    if(!authorId){return res.status(400).send({status:false,msg:"authorld is mandatory"})}
    if(!category){return res.status(400).send({status:false,msg:"category is mandatory"})}

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
    let subcata=req.query.subcategory
if (!tag && !subcata && !authQuery && !cata){
    let blogs = await blogModel.find().populate('authorId')
    return res.status(200).send({status:true,msg:blogs})
    }
    
if(!tag && !subcata){
    if(!authQuery){return res.status(400).send({status:false,msg:"author id is not present"})}
    if(!cata){return res.status(400).send({status:false,msg:"category is not present"})}

    if(!isValidObjectId(authQuery)){return res.status(400).send({status:false,msg:"author id is not valid"})}

    let authorchk = await AuthorModel.find({_id:authQuery})
    if(authorchk.length<1) {return res.status(400).send({status:false,msg:"author id is not present in db"})}

    let categorychk = await blogModel.find({category:cata})
    if(categorychk.length<1) {return res.status(400).send({status:false,msg:"no such category present in db"})}

    let blogs = await blogModel.find({authorId:authQuery,category:cata}).populate('authorId')

   return res.status(200).send({status:true,msg:blogs})

}
if(!authQuery && !cata){
   if(!tag){return res.status(400).send({status:false,msg:"tag is not present"})}
   if(!subcata){return res.status(400).send({status:false,msg:"subcata is not present"})}


    let tagchk = await blogModel.find({tags:tag})
    if(tagchk.length<1) {return res.status(400).send({status:false,msg:"no such tag present in db"})}

    let subcategorychk = await blogModel.find({subcategory:subcata})
    if(subcategorychk.length<1) {return res.status(400).send({status:false,msg:"no such tag present in db"})}

    let blogs = await blogModel.find({tags:tag,subcategory:subcata}).populate('authorId')

  return   res.status(200).send({status:true,msg:blogs})

}


else{ return res.status(400).send({status:false,msg:"enter valid paid of query"})}

}
catch(error){
   res.status(500).send({status:false,msg:error.message})
}}
module.exports.createBlog=createBlog
module.exports.getBlogData=getBlogData
