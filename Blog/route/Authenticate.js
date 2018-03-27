const express = require('express');

const router = new express.Router();
const User = require('../models/User');
const passport = require('passport');
const middilawareObj = require('../middiliwares/index');

const data = [
  {
    actionId: 1,
    actionName: 'ChangeHomeImage',
    displayName: 'Change Home Image'
  },
  {
    actionId: 2,
    actionName: 'ChangeAboutImage',
    displayName: 'Change About Image'
  },
  {
    actionId: 3,
    actionName: 'ChangeAboutText',
    displayName: 'Change About Text'
  },
  {
    actionId: 4,
    actionName: 'AddNewBlog',
    displayName: 'Add New Post'
  },
  {
    actionId: 5,
    actionName: 'ListAllPost',
    displayName: 'List All Post'
  }
];

router.get('/', middilawareObj.Isloginned, (req, res) => {
  res.render('admin/admin', {
    data
  });
});

router
  .route('/register')
  .get((req, res) => {
    res.render('admin/register');
  })
  .post(async (req, res, next) => {
    // if (req.body.email && req.body.username && req.body.password) {
    const NewUser = new User({
      username: req.body.username,
      email: req.body.email
    });
    User.register(NewUser, req.body.password, (err, user) => {
      if (err) {
        req.flash('error', 'Tekrar Deneyin');
        res.redirect('/admin/register');
        return;
      }
      passport.authenticate('local')(req, res, () => {
        req.flash('success', 'Hosgeldiniz');
        res.redirect('/admin/login');
      });
    });
  });
router
  .route('/login')
  .get((req, res) => {
    res.render('admin/login');
  })
  .post(
    passport.authenticate('local', {
      successRedirect: '/admin',
      failureRedirect: '/admin/login'
    })
  );

router.get('/logout', middilawareObj.Isloginned, (req, res) => {
  req.logOut();
  console.log('Logout');
  res.redirect('/');
});

// function Isloggined(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/admin/login');
// }

module.exports = router;
