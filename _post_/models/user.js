const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const speakUrl = require('speakingurl');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug:{
        type:String,
        unique:true
    },
    password: {
        type: String
    },
    bio:{
        type:String,
        required:false,
        trim:true
    },
    post: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        },
        title: String,
        img: String,
        content: String,
        slug: {
            type: String,
            unique: true
        },
        created: {
            slug: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            email: String,
            username: String,
            bio:String
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
                bio:String
            }}
    }]
});

userSchema.plugin(passportLocalMongoose);

userSchema.pre('save', function(next){
    this.slug = speakUrl(this.username, {
        lang: 'tr'
    });
    next();
});


var User = mongoose.model('User', userSchema);
module.exports = User;