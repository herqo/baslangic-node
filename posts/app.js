const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
//const cerezData = require('./cerez');
const PostCommentRouter = require('./route/yorum_router');
const PostRouter = require('./route/post_router');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const AuthRouter = require('./route/auth_user');
const MethodOverride = require('method-override');
const flash = require('connect-flash')
const nunjucks = require('nunjucks')

// view engine settings
// app.set('view engine', 'ejs');
nunjucks.configure('views', { autoescape: true, express: app });
//app.set('views', path.join(__dirname, 'views'));


// PassWord Settings
app.use(require('express-session')( // şifrenin doğru olması
    {
        secret: 'Gizli Cümle',
        resave: true,
        saveUninitialized: false,
    }
));
// Password Ayarları
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done) {
        User.findOne({
            'username': username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        });
    }
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Public Dosyası
app.use('public', express.static(__dirname + 'public'));
app.use(express.static('public'));
//app.use('views', express.static(__dirname + 'views'));


// Body Parser Use
app.use(bodyParser.urlencoded({
    extended: true
}));

// MONGODB
mongoose.connect('mongodb://localhost/Post');

// Method Override Using
app.use(MethodOverride('_method'));

app.use(flash());

// Routerlar ile Paylaşılan Bilgiler

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});


app.get('/', function (req, res) {
    console.log(req.user);
    res.render('home.html')
});


// ==============  Postların Router ları   ==============
app.use('/posts/', PostRouter);


// ==============  Yorumlar 'ın Router ları ==============
app.use('/posts/', PostCommentRouter);


// ==============  User and AUTH Router ==================
app.use('/user', AuthRouter);


// ============== Middleware =============================


//=============== SERVER Port =============================
module.exports = app;