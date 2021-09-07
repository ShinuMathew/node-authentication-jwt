const Mongoose = require('mongoose'),
    Schema = require('../schemas/data/auth-schema');

const authSchema = new Mongoose.Schema(Schema.AUTH);
const AuthModel = Mongoose.model('users', authSchema);

module.exports = {
    AuthModel
}