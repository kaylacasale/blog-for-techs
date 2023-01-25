const User = require('./User');
const Blog = require('./Blog')
const Comment = require('./Comment')

User.hasMany(Blog, {
    foreignKey: 'user_id',
    // onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    // onDelete: 'CASCADE',
})

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
})

// User.hasMany(Comment, {
//     through: {
//         model: Blog,
//     },
//     foreignKey: 'user_id',
//     as: 'comment_users'
// })

// User.hasMany(Comment, {
//     through: {
//         model: Blog,
//     }
// })

// Comment.belongsToMany(User, {
//     through: {
//         model: Blog,
//     },
//     foreignKey: 'user_id',
//     as: 'blog_id'
// })

module.exports = { User, Blog, Comment };