const User = require('./User');
const Blog = require('./Blog')
const Comment = require('./Comment')

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE',
})

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
})

// User.hasMany(Comment, {
//     through: {
//         model: Blog,
//     }
// })

Comment.belongsTo(User, {
    through: {
        model: Blog,
    },
})

module.exports = { User, Blog, Comment };