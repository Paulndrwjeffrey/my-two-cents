const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//HOMEPAGE
router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      order: [ [ 'createdAt', 'DESC' ] ],
      include : [{
        model: User,
        attributes: [ 'name' ]
      },
      {
        model: Comment,
        attributes: [ 'comment' ],
        include: {
          model: User,
          attributes: [ 'name' ]
        }
      }
      ]
    });

    const posts = allPosts.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//ONE POST WITH COMMENTS
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postDetail = await Post.findOne({
      attributes: [ 'id', 'title', 'text'],
      where: {
        id: req.params.id
      },  
      include: [
        {
          model: User,
          attributes: [ 'name' ]
        },
        {
          model: Comment,
          attributes: [ 'comment', 'createdAt' ],
          include: {
            model: User,
            attributes: [ 'name' ]
          }
        }
      ],
    });
    
    const post = postDetail.get({ plain: true });
    
    res.render('post-detail', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DASHBOARD
router.get('/dashboard', withAuth, async (req, res) => {
  try { 
    const userPosts = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: [ 'name' ]
        },
        {
          model: Comment,
          attributes: [ 'comment' ],
          include: {
            model: User,
            attributes: [ 'name' ]
          }
        }
      ],
    });

    const posts = userPosts.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DASHBOARD WRITE POST
router.get('/dashboard/write', withAuth, async (req, res) => {
  try {
    res.render('write');
  } catch (err) {
    res.status(500).json(err);
  }
});

//DASHBOARD EDIT POST
router.get('/dashboard/edit/:id', withAuth, async (req, res) => {
  try {
    const postInQuestion = await Post.findOne({
      where: {
        id: req.params.id
      }
    });

    const post = postInQuestion.get({ plain: true });

    res.render('edit', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

//SIGNUP
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;
