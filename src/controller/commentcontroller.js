const comentModel = require("../Models/comment");

const newComment = async function (req, res) {
  try {
    let data = req.body;
    data.BlogId = req.params.BlogId;
    data.date = new Date().toISOString().split("T")[0];
    console.log(data);
    const comment = await comentModel.create(data);
    res.status(200).send({ data: comment });
  } catch (e) {
    res.status(500).send({ status: false, data: e.message });
  }
};

const getComments = async function (req, res) {
  try {
    const comments = await comentModel.find({
      BlogId: req.params.BlogId,
      isDeleted: false,
    });
    let c = comments.filter((x) => x.CommentId == undefined);
    res.status(200).send({ data: c });
  } catch (e) {
    res.status(500).send({ status: false, data: e.message });
  }
};

const getReply = async function (req, res) {
  try {
    const comments = await comentModel.find({
      CommentId: req.params.CommentId,
      isDeleted: false,
    });
    res.status(200).send({ data: comments });
  } catch (e) {
    res.status(500).send({ status: false, data: e.message });
  }
};

const deleteComment = async function (req, res) {
  try {
    await comentModel.findOneAndUpdate(
      { _id: req.params.commentId },
      { isDeleted: true }
    );

    res.status(200).send({ data: "comment deleted successfully" });
  } catch (e) {
    res.status(500).send({ status: false, data: e.message });
  }
};

const updateComment = async function (req, res) {
  try {
    let data = req.body;
    await comentModel.findOneAndUpdate({ _id: req.params.commentId }, data);

    res.status(200).send({ data: "comment updated successfully" });
  } catch (e) {
    res.status(500).send({ status: false, data: e.message });
  }
};

module.exports = {
  newComment,
  getComments,
  deleteComment,
  getReply,
  updateComment,
};
