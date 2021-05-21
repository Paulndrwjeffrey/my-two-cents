const User = require('./User.js');
const Post = require('./Post.js');
const Comment = require('./Comment');

User.hasMany(Post);

Post.belongsTo(User);

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User);
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post)

module.exports = { User, Post, Comment };