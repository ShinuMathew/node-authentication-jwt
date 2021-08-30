const PostService = require('../../services/post-service'),
    Express = require('express'),
    router = Express.Router();

class PostRoutes {
    constructor() {
        this.postService = new PostService();
    }

    getAllPosts(req, res) {
        res.send(this.postService.getAllPosts())
    }
}

function registerPostRoutes() {
    this.postRoutes = new PostRoutes();
    router.get('/', (req, res) => this.postRoutes.getAllPosts(req, res))
}

registerPostRoutes();

module.exports = router;