const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({})

        const comments = commentData.map((comment) =>
            comment.get({ plain: true }))

        res.render('comment', {
            ...comments,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});



// const withAuth = require('../utils/auth');
//* auth required to manipulate comments
//* POST request / route to add new comment to blog post
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            blog_id: req.session.blog_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

//* DELETE request / route to delete a comment from the blog post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                blog_id: req.params.blog_id,//* will have info about blog (time created, date, etc.?)
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comments associated with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;