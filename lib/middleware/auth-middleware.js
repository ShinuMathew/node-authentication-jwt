const jwt = require('jsonwebtoken'),
    _ = require('lodash'),
    Errors = require('../constants/errors/errors'),
    SchemaValidator = require('../../helpers/core/schema-validator'),    
    {
        RegisterUser,
        LoginUser
    } = require('../schemas/api/auth-schema');

class AuthMiddleware {

    constructor() {
        this.schemaValidator = new SchemaValidator();        
    }

    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']
        // Check if auth header is present and then split to get token else throw undefined
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.json(Errors.UnAuthorizedAccess).status(Errors.UnAuthorizedAccess.statusCode)

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.json(Errors.TokenExpiredError).status(Errors.TokenExpiredError.statusCode)
            req.user = user            
            next()
        })
    }

    registerUserSchema(req, res, next) {
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        }
        new SchemaValidator().validateSchema(options, req, res, next, RegisterUser)
    }

    loginUserSchema(req, res, next) {
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        }
        new SchemaValidator().validateSchema(options, req, res, next, LoginUser)
    }

}

module.exports = AuthMiddleware