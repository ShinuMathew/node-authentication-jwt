const PostManager = require('../manager/post-manager');

class PostService {

    constructor() {
        this.postManager = new PostManager();
    }

    async getAllPosts(req) {
        let result = await this.postManager.getAllPosts(req.user);
        result = result.map(r => {
            return {
                id: r.id,
                title: r.title,
                description: r.description,
                content: r.content,
                created_date: r.created_date,
                modified_date: r.modified_date,
                status : r.status
            }
        })
        return result;
    }

    async createPost(req) {
        return await this.postManager.createPosts(req.body, req.user);
    }

    async getPostById(req) {
        let result = await this.postManager.getPostById(req.params.id, req.user)
        result = result.map(r => {
            return {
                id: r.id,
                title: r.title,
                description: r.description,
                content: r.content,
                created_date: r.created_date,
                modified_date: r.modified_date,
                status : r.status
            }
        })
        return result;
    }

    async deletePost(req) {
        let result = await this.postManager.deletePost(req.params.id, req.user)
        return result;
    }

    async updatePost(req) {
        let result = await this.postManager.updatePost(req.params.id, req.body, req.user)
        return result;
    }
}

module.exports = PostService;