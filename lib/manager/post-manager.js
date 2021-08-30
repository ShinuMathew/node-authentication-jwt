const StubData = require('../data-access-stub/stub-data');

class PostManager {

    constructor() {

    }

    getAllPosts() {
        return StubData.post;
    }
}

module.exports = PostManager;