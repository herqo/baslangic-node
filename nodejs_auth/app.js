const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const LocalStrategy = require('passport-local');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/auth');


app.use(require('express-session')({
    secret: "Gizli Cümle",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// Routes

app.get('/', (req, res) => {
    res.render('home');
});


function isLoggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}

// secret 
app.get('/secret', isLoggedin, (req, res) => {
    res.render('gizli');
});

app.route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post((req, res) => {
        User.register(new User({
            username: req.body.username
        }), req.body.password, (err, user) => {
            if (err) {
                console.log(err)
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.redirect('/secret');
                })
            }
        })
    });



// Giriş Route 
// Formun Getirilmesi

app.route('/login')

    .get((req, res) => {
        res.render('login');
    })
    .post(passport.authenticate('local' , {
        successRedirect: '/secret',
        failureRedirect: '/login',
    }), (req, res) => {

    });


// Çıkış Route

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});




const server = app.listen(3000, () => {
    console.log('Uygulama Başladı SErver Port : %d', server.address().port);
});