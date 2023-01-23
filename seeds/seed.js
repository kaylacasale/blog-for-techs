const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

//* require user, blog, and comment data from seed js files
const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const blog of blogData) {
        await Blog.create({
            ...blog,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }
    //* do not know if this is correct below (awaiting blog data to seed comments?)
    const blogs = await Blog.bulkCreate(blogData, {
        individualHooks: true,
        returning: true,
    });
    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            comment_id: blogs[Math.floor(Math.random() * users.length)].id,

        });
    }

    process.exit(0);
};

seedDatabase();
