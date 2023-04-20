const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    BlogId: {
        type: String,
        required: true
    },
    CommentId: {
        type: String
    },
    date: {
        type: String,
        required: true
    },
    isDeleted: { type: Boolean, default: false },
    comments: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("Ccomment", CommentSchema)