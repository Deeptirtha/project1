const { Router } = require("express")
const express=require("express")
const router = express.Router();

router.get("/project",function(req,res){
    res.send("project is started")
})

module.exports = router;