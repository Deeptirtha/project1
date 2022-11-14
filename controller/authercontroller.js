const AuthorModel= require("../Models/authormodel")

const createAuthor= async function (req, res) {

    try{
    let {fname,lname,title,email,password} = req.body

    if(!fname || !lname || !title ||!email|| !password){res.status(400).send({status: false, msg:"all data is mandatary" })}

    function validateEmail(mail) {
        var re = /\S+@\S+\.\S+/;
        return re.test(mail);
      }
      let mailvalidation= validateEmail(email)
      if(mailvalidation==false){res.status(400).send({status: false, msg:"mail id is not valid" })}

    let authorCreated = await AuthorModel.create(req.body)
    res.status(201).send({data: authorCreated})}
    catch(err){
        let message=err.message
        console.log(message)
        res.status(500).send({status: false, msg:message})
    }
}

const getAuthorsData= async function (req, res) {
    let authors = await AuthorModel.find()
    res.send({data: authors})
}

module.exports.createAuthor= createAuthor
module.exports.getAuthorsData= getAuthorsData