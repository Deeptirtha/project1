const express = require("express")
const router = express.Router();
const authercontroller = require('../controller/authercontroller')
const blogcontroller = require('../controller/blogcontroller')
const middleware = require('../middleware/middleware')
const { newComment, getComments, deleteComment,getReply ,updateComment}=require("../controller/commentcontroller")

router.get("/project", function (req, res) {
    res.send("project is started")
})


router.post("/authors", authercontroller.createAuthor)

router.put("/authors", authercontroller.createAuthor)

router.post("/login", authercontroller.loginAthor)

router.post("/blogs", middleware.authentication, blogcontroller.createBlog)

router.get("/blogs", blogcontroller.getBlogData)

router.put("/blogs/:blogId", middleware.authentication, middleware.authorization, blogcontroller.updateData)

router.delete("/blogs/:blogId", middleware.authentication, middleware.authorization, blogcontroller.deleteBlogById)

router.delete("/blogs", middleware.authentication, blogcontroller.deleteBlogs)

router.get("/blogs/:id",  blogcontroller.blogd)


router.post("/comment/:BlogId", newComment)

router.get("/comment/:BlogId", getComments)

router.get("/reply/:CommentId", getReply)

router.put("/comment/:commentId", deleteComment)

router.put("/commentUpdate/:commentId", updateComment)





module.exports = router;