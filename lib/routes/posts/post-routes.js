const PostService = require('../../services/post-service'),
    Express = require('express'),
    router = Express.Router(),
    ResponseHandler = require('../../../helpers/core/response-handler'),
    PostMiddleware = require('../../middleware/post-middleware');

class PostRoutes {
    constructor() {
        this.postService = new PostService();
        this.responseHandler = new ResponseHandler();
        this.postMiddleware = new PostMiddleware();
    }

    async getAllPosts(req, res) {
        try {
            let result = await this.postService.getAllPosts(req)
            this.responseHandler.replySuccess(res, result, 200)
        } catch (err) {
            this.responseHandler.replyError(res, err)
        }
    }

    async createPost(req, res) {
        try {
            let result = await this.postService.createPost(req)
            this.responseHandler.replySuccess(res, result, 201)
        } catch (err) {
            this.responseHandler.replyError(res, err)
        }
    }

    async getPostById(req, res) {
        try {
            let result = await this.postService.getPostById(req)
            this.responseHandler.replySuccess(res, result, 200)
        } catch (err) {
            this.responseHandler.replyError(res, err)
        }
    }

    async deletePost(req, res) {
        try {
            let result = await this.postService.deletePost(req)
            this.responseHandler.replySuccess(res, result, 202)
        } catch (err) {
            this.responseHandler.replyError(res, err)
        }
    }
}

function registerPostRoutes() {
    this.postRoutes = new PostRoutes();
    router.get('/', (req, res) => this.postRoutes.getAllPosts(req, res))
    router.get('/:id', (req, res) => this.postRoutes.getPostById(req, res))
    router.delete('/:id', (req, res) => this.postRoutes.deletePost(req, res))
    router.post('/', this.postRoutes.postMiddleware.registerUserSchema, (req, res) => this.postRoutes.createPost(req, res))
}

registerPostRoutes();

module.exports = router;