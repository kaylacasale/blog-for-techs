const Blog = require('../models/Blog');
const User = require('../models/User'); //* require User model to get user data for blog post
const Comment = require('../models/Comment') //* require Comment model to get comment associated with blog post

//* to secure login
const withAuth = require('../utils/auth');

//* visitors will see
const router = require('express').Router();

//* when user presses HOME (directs to homepage with blogs if existing)
//* get all blogs for homepage when loading homepage (need authorization from login to access blog homepage)
router.get('/', async (req, res) => {
    try {
        //* get all blogs and JOIN with user data
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User, //* include User data in homepage to note on blog post
                    attributes: [
                        'id',
                        'username',
                    ]

                }
            ]
        });
        //* serialize data so the template can read blog data (map through object elements aka parameters)
        const blogs = blogData.map((blog) =>
            blog.get({ plain: true })
        );
        //* pass serialied data and session flag into template
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
//* renders the handlebar page
router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment',
                        'blog_id'
                    ],
                },
                {
                    mode: User,
                    attributes: [
                        'id',
                        'username',
                    ]
                },
            ],
        });

        const blog = blogData.get({ plain: true });
        res.render('blog', { blog, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }

});

//* GET request - route to get one comment associated with blog post by primary key ( may not need in home routes)
router.get('/comment/:id', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        try {
            const commentData = await Comment.findByPk(req.params.id);

            const comment = commentData.get({ plain: true });

            res.render('comment', { comment, loggedIn: req.session.loggedIn });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

//* Use withAuth middleware to prevent access to route aftrer pressing on SIGN IN option:
// WHEN I revisit the site at a later time and choose to sign in
// THEN I am prompted to enter my username and password
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        //* Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//* login route (to frontend, handlebars.js)
//* if the user is already logged in, redirect the request to another route (the dashboards to view blog posts)
router.get('/login', (req, res) => {
    //* if the user is logged in, allow them to see comment associated with blog
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('dashboard');
});

module.exports = router;