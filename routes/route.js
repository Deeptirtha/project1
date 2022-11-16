const express=require("express")
const router = express.Router();
const authercontroller=require('../controller/authercontroller')
const blogcontroller=require('../controller/blogcontroller')
const middleware=require('../middleware/middleware')

router.get("/project",function(req,res){
    res.send("project is started")
})


router.post("/authors",authercontroller.createAuthor)
router.post("/login",authercontroller.loginAthor)
router.post("/blogs",blogcontroller.createBlog)
router.get("/blogs",blogcontroller.getBlogData)
router.put("/blogs/:blogId",middleware.validationMiddleware,middleware.authorization,blogcontroller.updateData)
router.delete("/blogs/:blogId",blogcontroller.deleteBlogById)
router.delete("/blogs",blogcontroller.deleteBlogs)



module.exports = router;