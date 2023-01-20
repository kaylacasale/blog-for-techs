const Blog = require('../models/Blog');
const User = require('../models/User');
//* to secure login
const withAuth = require('../utils/auth');

//* visitors will see
const router = require('express').Router();


//* get all blogs for homepage
router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        'id',
                        'username',
                        'password',
                    ]

                }
            ]
        });
        const blogs = blogData.map((blog) =>
            blog.get({ plain: true })
        );
        res.render('homepage', {
            blogs,
            loggedIn: req.session.loggedIn,

        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//* GET one blog post
router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment'
                    ],
                },
            ],
        });

        const blog = blogData.get({ plain: true });
        res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }

});


//* login route (to frontend, handlebars.js)
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
module.exports = router;