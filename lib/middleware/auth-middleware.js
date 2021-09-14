const jwt = require('jsonwebtoken'),
    _ = require('lodash'),
    Errors = require('../constants/errors/errors'),
    SchemaValidator = require('../../helpers/core/schema-validator'),    
    {
        RegisterUser,
        LoginUser,
        RefreshToken, 
        Logout
    } = require('../schemas/api/auth-schema'),
    JWTManager = require('../manager/jwt-manager');

class AuthMiddleware {

    constructor() {
        this.schemaValidator = new SchemaValidator();
        this.jwtManager = new JWTManager();  
    }

    async authenticateToken(req, res, next) {
        const me = this
        const authHeader = req.headers['authorization']
        // Check if auth header is present and then split to get token else throw undefined
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.json(Errors.UnAuthorizedAccess).status(Errors.UnAuthorizedAccess.statusCode)      
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) {
                if (err.name == Errors.TokenExpiredError.error) 
                    return res.json(Errors.TokenExpiredError).status(Errors.TokenExpiredError.statusCode)
                else {
                    let errMsg = _.cloneDeep(Errors.UnexpectedServerErrorOccurred)
                    errMsg.message = errMsg.message.replace("{message}", err)
                    return res.json(errMsg).status(errMsg.statusCode)                
                } 
            }  
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

    refreshTokenSchema(req, res, next) {
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        }
        new SchemaValidator().validateSchema(options, req, res, next, RefreshToken)
    }

    logoutSchema(req, res, next) {
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        }
        new SchemaValidator().validateSchema(options, req, res, next, Logout)
    }

}

module.exports = AuthMiddleware