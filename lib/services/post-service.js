const PostManager = require('../manager/post-manager');

class PostService {

    constructor() {
        this.postManager = new PostManager();
    }

    getAllPosts() {
        return this.postManager.getAllPosts();
    }
}

module.exports = PostService;