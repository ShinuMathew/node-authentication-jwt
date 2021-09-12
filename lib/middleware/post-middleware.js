const SchemaValidator = require('../../helpers/core/schema-validator'),
    {
        CreatePost,
        UpdatePost,
        PostId
    } = require('../schemas/api/post-schema');

class PostMiddleware {

    constructor() {

    }

    registerUserSchema(req, res, next) {
        const options = {
            abortEarly: true, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        }
        new SchemaValidator().validateSchema(options, req, res, next, CreatePost)
    }

    updateUserSchema(req, res, next) {
        const options = {
            abortEarly: true, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        }
        new SchemaValidator().validateSchema(options, req, res, next, UpdatePost)
    }

    updateUserParam(req, res, next) {
        const options = {
            abortEarly: true, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        }
        new SchemaValidator().validateParam(options, req, res, next, PostId)
    }

}

module.exports = PostMiddleware