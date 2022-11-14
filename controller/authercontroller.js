const AuthorModel= require("../Models/authormodel")

const createAuthor= async function (req, res) {

    try{
    let {fname,lname,title,email,password} = req.body
    let body = req.body
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

const getAuthorsData= async function (req, res) {
    let authors = await AuthorModel.find()
    res.send({data: authors})
}

module.exports.createAuthor= createAuthor
module.exports.getAuthorsData= getAuthorsData