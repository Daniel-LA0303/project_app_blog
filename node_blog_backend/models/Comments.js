 import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userID:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    comment:{
        type: String,
    },
    dateComment: {
        type: Date,
        default: Date.now
    },
    replies: [{
        type: Schema.ObjectId,
        ref: 'Reply'
    }],
    postID:{
        type: Schema.ObjectId,
        ref: 'Post'
    }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
