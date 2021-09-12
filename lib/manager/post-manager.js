const StubData = require('../data-access-stub/stub-data'),
    PostDataAccessor = require('../data-accessor/post-data-access'),
    Enum = require('../constants/enums/enum'),
    Errors = require('../constants/errors/errors'),
    logger = require('../../helpers/logger/logger'),
    _ = require('lodash');

class PostManager {

    constructor() {
        this.postDataAccessor = new PostDataAccessor();
    }

    async getAllPosts(user) {
        try {            
            let result = await this.postDataAccessor.getAllPosts(user.username)
            return result
        } catch (err) {
            logger.error(`Following error occured when searching for user : ${user.username} from mongodb :\n${err}`)
            throw err
        }
    }

    async createPosts(reqBody, user) {
        try {
            let result = await this.postDataAccessor.getPostById(reqBody.id, user.username);
            if(result.length > 0) {
                let errMsg = _.cloneDeep(Errors.DuplicatePostIdNotAllowed);
                errMsg.message = errMsg.message.replace("{id}", reqBody.id);
                throw errMsg;
            }
            let post = {
                id: reqBody.id,
                author: user.username,
                title: reqBody.title,
                description: reqBody.description,
                content: reqBody.content,
                created_date: Date.now(),
                modified_date: Date.now()
            }
            await this.postDataAccessor.createPost(post)
            return {
                status: Enum.PROCESS_STATUS.SUCCESS,
                message: `Post ${reqBody.title} added successfully`
            }
        } catch (err) {
            logger.error(`Following error occured when saving user data to mongodb :\n${err}`)
            throw err
        }
    }

    async getPostById(id, user) {
        try {
            let result = await this.postDataAccessor.getPostById(id, user.username);
            if(result.length == 0) {
                let errMsg = _.cloneDeep(Errors.NoPostsFound);
                errMsg.message = errMsg.message.replace("{id}", id);
                throw errMsg;
            }           
            return result
        } catch (err) {
            logger.error(`Following error occured when saving user data to mongodb :\n${err}`)
            throw err
        }
    }

    async deletePost(id, user) {
        try {
            let result = await this.postDataAccessor.deletePost(id, user.username);                           
            if(result.deletedCount == 0) {
                let errMsg = _.cloneDeep(Errors.NoPostsFound);
                errMsg.message = errMsg.message.replace("{id}", id);
                throw errMsg;
            }
            return {
                status: Enum.PROCESS_STATUS.SUCCESS,
                message: `Post ${id} deleted successfully`
            }
        } catch (err) {
            logger.error(`Following error occured when saving user data to mongodb :\n${err}`)
            throw err
        }
    }
}

module.exports = PostManager;