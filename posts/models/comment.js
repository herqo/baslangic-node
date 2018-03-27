const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: String,
    writer: {
        slug: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        email:String,
        username: String,
        bio:String,
        slug:String
    }
});

module.exports = mongoose.model('PostComment', commentSchema);