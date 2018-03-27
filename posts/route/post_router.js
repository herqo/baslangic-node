const express = require('express');
const router = express.Router();
const app = express();
const Post = require('../models/post');


router.route('/')
    .get((req, res) => {
        // Postları Databaseden Çekicez
        Post.find({}, (err, postDb) => {
            if (err) {
                console.log(err);
            } else {
                res.render('Posts/post_list', {
                    posts: postDb
                })
            }
        });
    })
    .post(UserLogin, (req, res) => {
        const name = req.body.name;
        const img = req.body.img;
        const content = req.body.content;
        const slug = req.params.slug
        const created = {
            slug: req.user.slug,
            email: req.user.email,
            username: req.user.username,
            bio: req.user.bio
        };
        const NewPost = {
            title: name,
            img: img,
            content: content,
            created: created,
        };

        Post.create(NewPost, (err, newPost) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/posts');
            }
        });
    });


// Gönderi Olutşurmak İçin Gerekli ejs Dosyasını Yollamak iÇin Gerekli Olan GET
router.get('/new', UserLogin, function (req, res) {
    res.render('Posts/NewPost');
});


// Gönderinin DEtayı
router.get('/:slug', (req, res) => {
    Post.findOne({
        'slug': req.params.slug
    }).populate("comments").exec((err, findPost) => {
        if (err) {
            console.log(err)
        } else {
            res.render('Posts/post_detail', {
                posts: findPost
            });
            // console.log(findPost)
        }
    });

});

// Gönderiyi Düzenleme
router.get('/:slug/edit', UserAuthenticate, (req, res) => {
    Post.findOne({
        'slug': req.params.slug
    }, (err, findPost) => {
        if (err) {
            console.log(err);
        } else {
            res.render('Posts/post_edit', {
                posts: findPost
            })
        }
    })
})


// Başlık Günceeleniyor Ancak slug Alanı Güncellenmiyor
router.route('/:slug')
    .put(UserAuthenticate, (req, res) => {
        Post.findOneAndUpdate(req.params.slug, req.body.post, (err, postUpdate) => {
            if (err) {
                console.log(err);
            } else {

                res.redirect('/posts/')
            }
        })
    })
    .delete(UserAuthenticate, (req, res) => {
        Post.findOneAndRemove({
            'slug': req.params.slug
        }, (err, postDelete) => {
            if (err) {
                console.log(err)
            } else {
                res.redirect('/posts');
            }
        })
    })

// =========== Middleware ===========
function UserLogin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/user/login');
    }

}


function UserAuthenticate(req, res, next) {
    if (req.isAuthenticated()) {
        Post.findOne({
            'slug': req.params.slug
        }, (err, findPost) => {
            if (err) {
                console.log(err);
                res.redirect('back');
            } else {
                if (findPost.created.slug.equals(req.user.slug)) {
                    next()
                } else {
                    res.redirect('back')
                }
            }
        })
    } else {
        res.redirect('/user/login');
    }
}

module.exports = router;