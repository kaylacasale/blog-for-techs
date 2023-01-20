const router = require('express').Router();
const { User } = require('../../models');

//* route to create new user (frontend)
//* post request because sending over username and password
//* SIGN UP route (if account not existing) - creating User object with user info
// THEN I am prompted to either sign up or sign in
// WHEN I choose to sign up
// THEN I am prompted to create a username and password
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        // WHEN I click on the sign-up button
        // THEN my user credentials are saved and I am logged into the site
        req.session.save(() => {
            req.session.user_id = userData.id; //* when user_id foreign key from Blog equals User model id
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//* route to login for users (frontend)
// WHEN I revisit the site at a later time and choose to sign in
// THEN I am prompted to enter my username and password

router.post('/login', async (req, res) => {
    try {
        //* find a user where username input matches one stored in User database
        const userData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }
        //* verify (validate) user password from POST request sent (password input)
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            console.log(
                '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
                req.session.cookie
            );

            res
                .status(200)
                .json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//* logout route
//* if still logged in, will destory session (created by cookie), and log user out
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;