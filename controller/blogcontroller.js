const { isValidObjectId } = require("mongoose")
const blogModel = require("../Models/BlogModel")
const AuthorModel = require("../Models/authormodel")

const createBlog = async function (req, res) {
  try {
    let { title, body, authorId, category } = req.body
    let sendbody = req.body

    let bodydata = Object.keys(sendbody)
    if (bodydata.length == 0) { return res.status(400).send({ status: false, msg: "body is empty" }) }



    if (!title) { return res.status(400).send({ status: false, msg: "title is mandatory" }) }
    if (!body) { return res.status(400).send({ status: false, msg: "body is mandatory" }) }
    if (!authorId) { return res.status(400).send({ status: false, msg: "authorld is mandatory" }) }
    if (!category) { return res.status(400).send({ status: false, msg: "category is mandatory" }) }

    function trimm(name) {
      if (name.trim().length == 0) { return false }
      else { return name.trim() }
    }

    title = trimm(title)
    body = trimm(body)
    sendbody.title = title
    sendbody.body = body

    if (!isValidObjectId(authorId)) { return res.status(400).send({ status: false, msg: "author id is not valid" }) }

    let authorchk = await AuthorModel.findById(authorId)
    if (!authorchk) { return res.status(404).send({ status: false, msg: "author id is not found in db" }) }

    let blogCreated = await blogModel.create(req.body)
    res.status(201).send({ data: blogCreated })
  }
  catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}

const getBlogData = async function (req, res) {
  try {
    let data = req.query
    data.isDeleted = false
    data.isPublished = true
    let Id = req.query.authorId

    if (!Id) {
      let result = await blogModel.find(data).populate('authorId')
      if (result.length < 1) { res.status(404).send({ status: false, msg: "No blog found" }) }
      else { res.status(200).send({ status: true, msg: result }) }
    }
    else {
      if (!isValidObjectId(Id)) { return res.status(400).send({ status: false, msg: "author id is not valid" }) }
      let result = await blogModel.find(data).populate('authorId')
      if (result.length == 0) { res.status(404).send({ status: false, msg: "no blog found" }) }
      else { res.status(200).send({ status: true, msg: result }) }
    }
  }

  catch (err) {
    res.status(500).send({ status: false, msg: err.message })
  }
}
const updateData = async (req, res) => {
  try {
    let getBlogId = req.params.blogId;

    if (!isValidObjectId(getBlogId)) return res.status(400).send({ status: false, msg: "Enter a valid blog Id" })

    let findBlogId = await blogModel.findOne({ _id: getBlogId });
    if (!findBlogId) return res.status(404).send({ status: false, msg: "No such blog exist" })
    if (findBlogId.isDeleted) return res.status(404).send({ status: false, msg: "Blog already been deleted" })
    let data = req.body

    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Data is required to update Blog" })
    if (data.hasOwnProperty('isDeleted') || data.hasOwnProperty('authorId') || data.hasOwnProperty('deletedAt') || data.hasOwnProperty('publishedAt')) return res.status(403).send({ status: false, msg: "Action is Forbidden can't change this data" })

    let updatedBlog = await blogModel.findByIdAndUpdate(
      { _id: getBlogId },
      {
        $push: { tags: data.tags, subcategory: data.subcategory },
        category: data.category,
        title: data.title,
        body: data.body,
        isPublished: data.isPublished,
      },
      { new: true }
    )
    res.status(200).send({ status: true, data: updatedBlog })
  } catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }
}

const deleteBlogById = async (req, res) => {
  try {
    let blogId = req.params.blogId
    if (!isValidObjectId(blogId)) return res.status(400).send({ status: false, msg: "Enter a valid blog Id" })
    let data = await blogModel.findById(blogId)
    if (!data) return res.status(404).send({ status: false, msg: "No such blog found" })
    if (data.isDeleted) return res.status(404).send({ status: false, msg: "Data already deleted" })
    let timeStamps = new Date()
    await blogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true, isPublished: false, deletedAt: timeStamps })
    res.status(200).send({ status: true, msg: "Deleted" })
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
}

const deleteBlogs = async (req, res) => {
  try {
    let data = req.query
    let decodedToken = req.decodedToken

    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Error!, no query found" })

    if (data.hasOwnProperty('authorId')) {
      if (!isValidObjectId(data.authorId)) return res.status(400).send({ status: false, msg: "Enter a valid author Id" })
      if (decodedToken.authorId !== data.authorId) return res.status(403).send({ status: false, msg: "Action Forbidden" })
    }
    data.authorId = req.decodedToken.authorId

    let timeStamps = new Date()

    let getBlogData = await blogModel.find(data)
    if (getBlogData.length == 0) {
      return res.status(404).send({ status: false, msg: "No blog found" })
    }

    const getNotDeletedBlog = getBlogData.filter(ele => ele.isDeleted == false)

    if (getNotDeletedBlog.length == 0) {
      return res.status(404).send({ status: false, msg: "The Blog is already deleted" })
    }

    let deletedBlogs = await blogModel.updateMany({ $or: [{ authorId: data.authorId }, { category: data.category }, { tags: data.tag }, { subcategory: data.subcategory }, { isPublished: data.isPublished }] },
      { $set: { isDeleted: true, isPublished: false, deletedAt: timeStamps } }
    )

    res.status(200).send({ status: true, msg: `${deletedBlogs.modifiedCount} blogs are deleted` })
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
}





module.exports.createBlog = createBlog
module.exports.getBlogData = getBlogData
module.exports.updateData = updateData
module.exports.deleteBlogById = deleteBlogById
module.exports.deleteBlogs = deleteBlogs
