const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const expressSession = require('express-session');
// PassWord config
const passport = require('passport');
const LocalStrategy = require('passport-local');

// Third
const MethodOverride = require('method-override');
const flash = require('connect-flash');
const morgan = require('morgan');
// Router
const IndexRoutes = require('./route/IndexRoute');
const AuthRoutes = require('./route/Authenticate');
const PostRoutes = require('./route/PostRoute');
// Models
const User = require('./models/User');

// App Locals

app.locals.moment = moment;

// ===================================== //
// App Config
mongoose.connect('mongodb://localhost/BlogApp');
/* app.set("twig options", {
  strict_variables: false
}); */

app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(MethodOverride('_method'));
// Express-Session
app.use(
  expressSession({
    secret: 'Gizli Cumlemiz',
    resave: false,
    saveUninitialized: false
  })
);

// PassWord Config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Share current User info within all routes
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
// Flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_mesages = req.flash('success');
  res.locals.error_message = req.flash('error');
  next();
});
console.error();

// app.use(express.favicon());

// Request
app.use('/', IndexRoutes);
app.use('/admin', AuthRoutes);
app.use('/post', PostRoutes);

const server = app.listen(3000, () => {
  console.log('Uygulama Başladı Port Numarısı : %d', server.address().port);
});
