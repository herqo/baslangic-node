const express = require('express');

const router = new express.Router();
const PostModel = require('../models/PostModel');

const middlewareObj = require('../middiliwares/index');

router
  .route('/new')
  .get(middlewareObj.Isloginned, (req, res) => {
    res.render('Blog/post_create');
  })
  .post(middlewareObj.Isloginned, (req, res) => {
    const Title = req.body.data.PostTitle;
    const PostCom = req.body.data.PostCom;
    const PostImg = req.body.data.PostImg;
    const Post = req.body.data.Post;

    const newPost = {
      Title,
      PostCom,
      PostImg,
      Post
    };
    console.log(req.body.data);
    PostModel.create(newPost)
      .then((NewPost) => {
        console.log(NewPost);
        res.status(201).json(NewPost);
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.route('/all-posts').get((req, res) => {
  PostModel.find({}, (err, allposts) => {
    if (err) {
      console.log(err);
    } else {
      res.render('Blog/all_posts', {
        posts: allposts
      });
    }
  });
});

router
  .route('/:slug')
  .get((req, res) => {
    const seoname = req.params.slug;
    PostModel.findOne({
      myslug: seoname
    })
      .then((FindPost) => {
        if (FindPost) {
          res.render('Blog/post_detail', {
            posts: FindPost
          });
        } else {
          res.render('Blog/error');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .put((req, res) => {
    const param = req.params.slug;
    const Title = req.body.PostTitle;
    const PostCom = req.body.PostCom;
    const PostImg = req.body.PostImg;
    const Post = req.body.editor;

    const EDITpost = {
      Title,
      PostCom,
      PostImg,
      Post
    };

    PostModel.findOneAndUpdate({ myslug: param }, EDITpost, (err, editiedPost) => {
      if (err) {
        console.log(err);
      } else {
        console.log(EDITpost);
        res.redirect('/');
      }
    });
  })
  .delete((req, res) => {
    const param = req.params.slug;
    PostModel.findOneAndRemove({ myslug: param })
      .then((deltepost) => {
        if (deltepost) {
          res.redirect('/');
        } else {
          res.render('Blog/eroor');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.route('/:slug/edit').get((req, res) => {
  const param = req.params.slug;
  PostModel.findOne({
    myslug: param
  })
    .then((EditPost) => {
      if (EditPost) {
        res.render('Blog/post_edit', {
          post: EditPost
        });
      } else {
        res.render('Blog/error');
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
