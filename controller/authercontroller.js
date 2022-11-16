const AuthorModel= require("../Models/authormodel")
const jwt=require("jsonwebtoken")

const createAuthor= async function (req, res) {

    try{
    let {fname,lname,title,email,password} = req.body
    let body = req.body
    if(!body){return res.status(400).send({status: false, msg:"body is empty" })}
    let bodydata=Object.keys(body)
    if(bodydata.length==0){return res.status(400).send({status: false, msg:"body is empty" })}
    
    if(!fname){ return res.status(400).send({status: false, msg:"firstname is mandatary" })}
    if(!lname){ return res.status(400).send({status: false, msg:"lasttname is mandatary" })}
    if(!title){ return res.status(400).send({status: false, msg:"title is mandatary" })}
    if(!email){ return res.status(400).send({status: false, msg:"email is mandatary" })}
    if(!password){ return res.status(400).send({status: false, msg:"password is manda"})}


    

    function validateEmail(mail) {
        var re = /\S+@\S+\.\S+/;
        return re.test(mail);
      }
      let mailvalidation= validateEmail(email)
      if(mailvalidation==false){res.status(400).send({status: false, msg:"mail id is not valid" })}

    let authorCreated = await AuthorModel.create(req.body)
    res.status(201).send({data: authorCreated})}
    catch(err){
        res.status(500).send({status: false, msg:err.message})
    }
}

const loginAthor=async function(req,res){
    try{
      
       let email=req.body.email
       let password=req.body.password
     let   body=req.body
     if (Object.keys(body)==0)return res.status(400).send({sattus:false,msg:"body is empty can't login"})
     if(!email)return res.status(400).send({sattus:false,msg:"email is empty can't login"})
     if(!password)return res.status(400).send({sattus:false,msg:"password is empty can't login"})
       let auther=await AuthorModel.findOne({email:email,password:password});
       if(!auther)
       return res.status(400).send({status:false,msg:"email and password is not present"});
       let token=jwt.sign({
           authorId:auther._id.toString() 
       },
       "project-1-Room-9"
       )
       res.setHeader("x-api-key",token)
       res.status(200).send({status:true,msg:token})}
       catch(err){
           res.status(500).send({status:false,msg:err.message})}
       }
   
   module.exports.loginAthor=loginAthor

module.exports.createAuthor= createAuthor
