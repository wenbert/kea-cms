const debug = require('debug')('app:mainController');
const { ObjectID } = require('mongodb');
const Post = require('../models/post');

function blogController(nav) {
  function getPosts(req, res) {
    (async function mongo() {
      try {
        const posts = await Post.find();
        res.render(
          'blog/index',
          {
            title: 'Blog Posts',
            nav,
            posts,
          },
        );
      } catch (err) {
        debug(err.stack);
      }
    }());
  }

  function getPost(req, res) {
    const { id } = req.params;
    (async function mongo() {
      try {
        const post = await Post.findOne({ _id: new ObjectID(id) });
        res.render(
          'blog/post',
          {
            title: 'Blog Posts',
            nav,
            post,
          },
        );
      } catch (err) {
        debug(err.stack);
      }
    }());
  }

  return {
    getPosts,
    getPost,
  };
}

module.exports = blogController;
