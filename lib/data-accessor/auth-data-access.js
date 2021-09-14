const MongoClient = require('../clients/mongo-client'),
    Enum = require('../constants/enums/enum'),
    logger = require('../../helpers/logger/logger'),    
    { MEMCAHE } = require('../../helpers/core/mem-cache'),
    Schema = require('../schemas/data/auth-schema'),
    DataModeler = require('../models/data-modeller');

class AuthDataAccessor {

    constructor() {
        this.mongoClient = new MongoClient(Enum.DATABASES.AUTH);
        this.dataModeler = new DataModeler()
    }

    async getUser(username) {
        try {
            this.mongoose = MEMCAHE.DATABASE_CONNECTION[Enum.DATABASES.AUTH]
            this.mongoose = (this.mongoose) ? this.mongoose :
                await this.mongoClient.createNewConnection(Enum.DATABASES.AUTH);
            let AuthModel = await this.dataModeler.createModel(this.mongoose, Enum.TABLES.USERS, Schema.AUTH)
            let result = await AuthModel.find({
                username: username
            });
            return result
        } catch (err) {
            logger.error(`Following error occured when searching for user : ${username} from mongodb :\n${err}`)
            throw err
        }
    }

    async saveUser(user) {
        try {
            this.mongoose = MEMCAHE.DATABASE_CONNECTION[Enum.DATABASES.AUTH]
            this.mongoose = (this.mongoose) ? this.mongoose :
                await this.mongoClient.createNewConnection(Enum.DATABASES.AUTH);
            let AuthModel = await this.dataModeler.createModel(this.mongoose, Enum.TABLES.USERS, Schema.AUTH)
            let userSave = new AuthModel(user);
            await userSave.save();
        } catch (err) {
            logger.error(`Following error occured when saving user data to mongodb :\n${err}`)
            throw err
        }
    }

    async saveRefreshToken(token) {
        try {
            this.mongoose = MEMCAHE.DATABASE_CONNECTION[Enum.DATABASES.AUTH]
            this.mongoose = (this.mongoose) ? this.mongoose :
                await this.mongoClient.createNewConnection(Enum.DATABASES.AUTH);
            let AuthModel = await this.dataModeler.createModel(this.mongoose, Enum.TABLES.TOKENS, Schema.TOKEN)
            let userSave = new AuthModel(token);
            await userSave.save();
        } catch (err) {
            logger.error(`Following error occured when saving user data to mongodb :\n${err}`)
            throw err
        }
    }

    async getRefereshToken(refreshToken) {
        try {
            this.mongoose = MEMCAHE.DATABASE_CONNECTION[Enum.DATABASES.AUTH]
            this.mongoose = (this.mongoose) ? this.mongoose :
                await this.mongoClient.createNewConnection(Enum.DATABASES.AUTH);
            let TokenModel = await this.dataModeler.createModel(this.mongoose, Enum.TABLES.TOKENS, Schema.TOKEN)
            let result = await TokenModel.find({
                token: refreshToken
            });
            return result
        } catch (err) {
            logger.error(`Following error occured when searching for refresh token : ${username} from mongodb :\n${err}`)
            throw err
        }
    }

    async inactivateToken(refreshToken) {
        try {
            this.mongoose = MEMCAHE.DATABASE_CONNECTION[Enum.DATABASES.AUTH]
            this.mongoose = (this.mongoose) ? this.mongoose :
                await this.mongoClient.createNewConnection(Enum.DATABASES.AUTH);
            let TokenModel = await this.dataModeler.createModel(this.mongoose, Enum.TABLES.TOKENS, Schema.TOKEN)
            let result = await TokenModel.updateOne({
                token: refreshToken                
            }, {
                token: refreshToken,
                status: Enum.TOKEN_STATUS.INACTIVE
            });
            return result;
        } catch (err) {
            logger.error(`Following error occured when deleting token from mongodb :\n${JSON.stringify(err)}`)
            throw err
        }
    }
}

module.exports = AuthDataAccessor;