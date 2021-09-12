const MongoClient = require('../clients/mongo-client'),
    Enum = require('../constants/enums/enum'),
    logger = require('../../helpers/logger/logger'),
    Mongoose = require('mongoose'),
    { MEMCAHE } = require('../../helpers/core/mem-cache'),
    Schema = require('../schemas/data/post-schema'),
    DataModeler = require('../models/data-modeller');

class PostsDataAccessor {

    constructor() {
        this.mongoClient = new MongoClient(Enum.DATABASES.POSTS);
        this.dataModeler = new DataModeler()
    }

    async getAllPosts(username) {
        try {
            this.mongoose = MEMCAHE.DATABASE_CONNECTION[Enum.DATABASES.POSTS]
            this.mongoose = (this.mongoose) ? this.mongoose :
                await this.mongoClient.createNewConnection(Enum.DATABASES.POSTS);
            let PostModel = await this.dataModeler.createModel(this.mongoose, Enum.TABLES.POSTS, Schema.POST)
            let result = await PostModel.find({
                author: username
            });
            return result;
        } catch (err) {
            logger.error(`Following error occured when fetching all posts from mongodb :\n${err}`)
            throw err
        }
    }

    async getPostById(id, username) {
        try {
            this.mongoose = MEMCAHE.DATABASE_CONNECTION[Enum.DATABASES.POSTS]
            this.mongoose = (this.mongoose) ? this.mongoose :
                await this.mongoClient.createNewConnection(Enum.DATABASES.POSTS);
            let PostModel = await this.dataModeler.createModel(this.mongoose, Enum.TABLES.POSTS, Schema.POST)
            let result = await PostModel.find({
                id: id,
                author: username
            });
            return result;
        } catch (err) {
            logger.error(`Following error occured when fetching post by title from mongodb :\n${err}`)
            throw err
        }
    }

    async createPost(postData) {
        try {
            this.mongoose = MEMCAHE.DATABASE_CONNECTION[Enum.DATABASES.POSTS]
            this.mongoose = (this.mongoose) ? this.mongoose :
                await this.mongoClient.createNewConnection(Enum.DATABASES.POSTS);
            let PostModel = await this.dataModeler.createModel(this.mongoose, Enum.TABLES.POSTS, Schema.POST)
            let post = new PostModel(postData);
            await post.save();
        } catch (err) {
            logger.error(`Following error occured when saving post data to mongodb :\n${err}`)
            throw err
        }
    }

    async deletePost(id, username) {
        try {
            this.mongoose = MEMCAHE.DATABASE_CONNECTION[Enum.DATABASES.POSTS]
            this.mongoose = (this.mongoose) ? this.mongoose :
                await this.mongoClient.createNewConnection(Enum.DATABASES.POSTS);
            let PostModel = await this.dataModeler.createModel(this.mongoose, Enum.TABLES.POSTS, Schema.POST)
            let result = await PostModel.deleteOne({
                id: id,
                author: username
            });
            return result;
        } catch (err) {
            logger.error(`Following error occured when deleting post by '${id}' from mongodb :\n${err}`)
            throw err
        }
    }

}

module.exports = PostsDataAccessor;