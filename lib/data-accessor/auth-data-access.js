const MongoClient = require('../clients/mongo-client'),
    Enum = require('../constants/enums/enum'),
    logger = require('../../helpers/logger/logger'),
    { AuthModel } = require('../models/auth-model');

class AuthDataAccessor {

    constructor() {
        this.mongoClient = new MongoClient(Enum.DATABASES.AUTH);
    }

    async getUser(username) {
        try {
            this.mongoose = await this.mongoClient.getConnection();
            let result = await AuthModel.find({ username: username });
            return result
        } catch (err) {
            logger.error(`Following error occured when searching for user : ${username} from mongodb :\n${err}`)
            throw err
        }
    }

    async saveUser(user) {
        try {
            this.mongoose = await this.mongoClient.getConnection();
            let userSave = new AuthModel(user);
            await userSave.save();
        } catch (err) {
            logger.error(`Following error occured when saving user data to mongodb :\n${err}`)
            throw err
        }
    }

}

module.exports = AuthDataAccessor;