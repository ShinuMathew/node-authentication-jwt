const Mongoose = require('mongoose'),
    Schema = require('../schemas/data/post-schema');

const postSchema = new Mongoose.Schema(Schema.POST);
const PostModel = Mongoose.model('posts', postSchema);

module.exports = {
    PostModel
}