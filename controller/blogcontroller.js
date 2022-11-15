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

    if(!isValidObjectId(authorId)){return res.status(400).send({status:false,msg:"author id is not valid"})}

    let authorchk = await AuthorModel.find({_id:authorId})
    if(authorchk.length<1) {return res.status(400).send({status:false,msg:"author id is not present in db"})}

    let blogCreated = await blogModel.create(req.body)
    res.status(201).send({data: blogCreated})
}
catch(error){
    res.status(500).send({status:false,msg:error.message})
}}

const getBlogData= async function (req, res) {
     try{
        let data=req.query
        data.isDeleted=false
        data.isPublished=true
        let Id =req.query.authorId
     
        if(!Id){
            let result =await blogModel.find(data).populate('authorId')
            if (result.length<1){res.status(404).send({status:false,msg:"no blog found"})}
          else{res.status(200).send({status:true,msg:result})}
        }
        else{
        if(!isValidObjectId(Id)){return res.status(400).send({status:false,msg:"author id is not valid"})}
        let result =await blogModel.find(data).populate('authorId')
        if (result.length<1){res.status(404).send({status:false,msg:"no blog found"})}
        else{res.status(200).send({status:true,msg:result})}
        }}

    catch(err){
        res.status(500).send({status:false,msg:err.message}) 
    }
    }


module.exports.createBlog=createBlog
module.exports.getBlogData=getBlogData
