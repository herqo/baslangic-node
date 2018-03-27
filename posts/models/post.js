const mongoose = require('mongoose');
const speakUrl = require('speakingurl');

const postSchema = new mongoose.Schema({
    title: String,
    img: String,
    content: String,
    slug: {
        type:String,
        unique:true
    },
    created: {
        slug: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        email:String,
        username: String,
        bio:String,

    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostComment'
    }],
    comment: {
        comments:String,
        writer : {
        slug: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        email:String,
        username: String,
        bio:String,
        slug:String
    }}
});

postSchema.pre('save', function(next){
    this.slug = speakUrl(this.title, {
        lang: 'tr'
    }); 
    next();
})
module.exports = mongoose.model('Post', postSchema);