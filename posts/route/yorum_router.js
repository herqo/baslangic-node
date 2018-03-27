const express = require('express');
const Post = require('../models/post');
const PostComment = require('../models/comment');
const app = express();
const router = express.Router();


router.get('/:slug/comment/new', UserLogin, (req, res) => {
    Post.findOne({'slug':req.params.slug}, (err, finded) => {
        if (err) {
            console.log(err);
        } else {
            res.render('Comments/NewComment.ejs', {post: finded})
        }
    });
});

router.post('/:slug/comment', UserLogin, (req, res) => {
    Post.findOne({'slug':req.params.slug}, (err, findPost) => {
        if (err) {
            console.log(err)
        } else {
            PostComment.create(req.body.yorum, (err, commment) => {
                commment.writer.id = req.user.slug;
                commment.writer.username = req.user.username;
                commment.save();
                findPost.comments.push(commment);
                findPost.save();
                res.redirect('/posts/' + findPost.slug)
            })
        }
    });
});

// =========== Middleware ===========
function UserLogin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/user/login');
    }

}


module.exports = router;