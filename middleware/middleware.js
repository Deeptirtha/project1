const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose")
let blogModel = require("../Models/BlogModel")


const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "token must be present in header" })
  
        var decodedToken = jwt.verify(token, "project-1-Room-9", function (err, decodedToken) {
            if (err) { return res.status(401).send({  status: false, msg: "invalid Token comming" }) }
           else{
            req.decodedToken = decodedToken
            next()
            return decodedToken
            }
        })}

    //    try{ var decodedToken = jwt.verify(token, "project-1-Room-9")}
    //    catch(err){return res.status(401).send({  status: false, msg: "invalid Token comming" })}
    //     req.decodedToken = decodedToken
    //     next()
    // }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

const authorization = async function (req, res, next) {
    try {
        let getBlogId = req.params.blogId;

        if (!isValidObjectId(getBlogId)) return res.status(400).send({ status: false, msg: "Enter a valid blog Id" })

        let blog = await blogModel.findOne({ _id: req.params.blogId })
        if (!blog) return res.status(404).send({ status: false, msg: "No such Blog is in dB" })
        if (blog.isDeleted) return res.status(404).send({ status: false, msg: "Blog already been deleted" })

        let authId = blog.authorId
        if (authId != req.decodedToken.authorId) return res.status(403).send({ status: false, msg: "you do not have authorization to this " });
        else { next() }
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

module.exports.authentication = authentication
module.exports.authorization = authorization