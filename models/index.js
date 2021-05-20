const User = require('./User.js');
const Post = require('./Post.js');
const Comment = require('./Comment');

User.hasMany(Post);
Post.belongsTo(User);
Post.hasMany(Comment);
User.hasMany(Comment);
// this doesn't work 
// Comment.belongsTo(Post, User);

module.exports = { User, Post };