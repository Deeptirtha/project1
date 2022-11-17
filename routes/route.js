const express = require("express")
const router = express.Router();
const authercontroller = require('../controller/authercontroller')
const blogcontroller = require('../controller/blogcontroller')
const middleware = require('../middleware/middleware')

router.get("/project", function (req, res) {
    res.send("project is started")
})


router.post("/authors", authercontroller.createAuthor)

router.post("/login", authercontroller.loginAthor)

router.post("/blogs", middleware.authentication, blogcontroller.createBlog)

router.get("/blogs", middleware.authentication, blogcontroller.getBlogData)

router.put("/blogs/:blogId", middleware.authentication, middleware.authorization, blogcontroller.updateData)

router.delete("/blogs/:blogId", middleware.authentication, middleware.authorization, blogcontroller.deleteBlogById)

router.delete("/blogs", middleware.authentication, blogcontroller.deleteBlogs)



module.exports = router;