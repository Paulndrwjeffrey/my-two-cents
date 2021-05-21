const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const opinion = await Comment.create({
      comment: req.body.comment,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    });
    res.status(200).json(opinion);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth,  async (req, res) => {
  try {
    const change = await Comment.update({
      comment: req.body.comment
    },
    {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(change);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const ixnay = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(ixnay);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;