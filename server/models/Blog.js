const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is Required']
    },
    content: {
        type: String,
        required: [true, 'Content is Required']
    },
    author: {
        username: {
            type: String,
            required: [true, 'Author username is required']
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Author userId is required']
        }
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    comments: [
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        username: {
            type: String,
            required: false
        },
        comment: {
            type: String,
            required: [true, 'Comment cannot be empty']
        }
    }
]

});

module.exports = mongoose.model('Blog', blogSchema);
