const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const Post = require('../models/post');
var flash = require('connect-flash');
const app = require('express')();



app.use(flash());


// ================ LOGIN ================
router.route('/login')
    .get((req, res) => {
        console.log('Dosya Gönderildi');
        res.render('User/login', {message: req.flash('signupMessage')})
    })
    .post(passport.authenticate('local', {
            successRedirect: '/posts',
            failureRedirect: '/user/login',
            failureFlash : true
        }),
        (req, res) => {
            console.log('Sistemdeyiz')
        });


// ================= REGISTER ===============
router.route('/register')
    .get((req, res) => {
        res.render('User/register');
    })
    .post((req, res) => {
        const NewUser = new User({
            email : req.body.email,
            username: req.body.username,
            bio: req.body.bio,
        });
        User.register(NewUser, req.body.password, (err, user) => {
            if (err) {
                console.log('dort');
                console.log(err);
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.redirect('/posts');
                    console.log('Kullancı Oluşturuldu');
                })
            }
        });
    });


// ==================== LOGOUT =====================
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});



// ==================== Profile =====================
router.get('/:slug/profile', UserLogin, (req, res) => {
    Post.findOne({'slug': req.params.slug}, (err, postDB) => {
        if (err) {
            console.log(err)
        } else{
            res.render('User/profile', {posts:postDB, 'params': req.params.slug})
        }
    })
})




// =================== Middleware =====================
function UserLogin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/user/login');
    }

}

module.exports = router;