const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        required: true,
        ref: "Author"
    },
    tags: [String],
    category: {
        type: String,
        required: true
    },
    subcategory: [String],
    isDeleted: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    deletedAt: {
        type: String
    },
    publishedAt: {
        type: String,
    }
},
    { timestamps: true });

module.exports = mongoose.model('Blogs', blogSchema)