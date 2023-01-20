const router = require('express').Router();
const { Comment } = require('../models');
// const withAuth = require('../utils/auth');

//* POST request / route to add new comment to blog post
router.get('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

//* DELETE request / route to delete a comment from the blog post
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!)
    }
})