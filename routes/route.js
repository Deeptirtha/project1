const express=require("express")
const router = express.Router();
const authercontroller=require('../controller/authercontroller')
const blogcontroller=require('../controller/blogcontroller')

router.get("/project",function(req,res){
    res.send("project is started")
})


router.post("/authors",authercontroller.createAuthor)
router.post("/blogs",blogcontroller.createBlog)



module.exports = router;