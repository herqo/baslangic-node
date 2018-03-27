const express = require('express');

const router = new express.Router();
const PostModel = require('../models/PostModel');

router.get('/', (req, res) => {
  PostModel.find({}, (err, findPost) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(findPost)
      res.render('Link/home', { posts: findPost });
    }
  });
});

router.get('/about', (req, res) => {
  res.render('Link/about');
});

router.get('/contact', (req, res) => {
  res.render('Link/contact');
});

router.get('/resume', (req, res) => {
  res.render('Link/resume');
});

module.exports = router;
