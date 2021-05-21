const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: [ 'title', 'text' ],
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
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const posts = await Post.findOne({
      attributes: [ 'title', 'text' ],
      where: {
        id: req.params.id
      },
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
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      text: req.body.text,
      user_id: req.session.user_id
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const update = await Post.update({
      title: req.body.title,
      text: req.body.text
    },
    {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(update);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const ixnay = Post.destroy({
      where : {
        id: req.params.id
      }
    });
    res.status(200).json(ixnay);
  } catch (err) {
    res.status(500)
  }
});

module.exports = router;