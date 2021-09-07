
const AuthManager = require('../manager/auth-manager'),
    Error = require('../constants/errors/errors'),
    logger = require('../../helpers/logger/logger'),
    jwt = require('jsonwebtoken'),
    _ = require('lodash'),
    ResponseHandler = require('../../helpers/core/response-handler'),
    CommonUtils = require('../../helpers/core/common-utils');

class AuthService {
    
    constructor() {
        this.authManager = new AuthManager();
        this.commonUtils = new CommonUtils();
        this.responseHandler = new ResponseHandler();
        this.cypherKey = process.env.ACCESS_TOKEN_SECRET
    }

    async signin(req, res) {
        const me = this
        try {
            let result = await this.authManager.signIn(req.body.username, req.body.password);
            let userData = result.userData;
            let reqUserData = ['username', 'firstName', 'lastName', 'email']
            userData = Object.keys(userData).filter(key => reqUserData.includes(key)).reduce((obj, key) => {
                obj[key] = userData[key];
                return obj;
            }, {})            
            jwt.sign(userData, this.cypherKey, {expiresIn : '3600s'}, (err, token) => {                
                let responseody = {
                    result: result.result,
                    jwt : token
                }
                me.responseHandler.replySuccess(res, responseody, 200);                        
            })            
        } catch (err) {
            logger.error(`AuthService signin() failed :\n${err}`)
            throw err;
        }
    }

    async signup(req) {
        try {
            let hashedPassword = await this.commonUtils.hashPassword(req.body.password)
            const user = {
                username: req.body.username,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                created_date: Date.now(),
                modified_date: Date.now()
            }
            return this.authManager.signUp(user);
        } catch (err) {
            logger.error(`AuthService signup() failed :\n${err}`)
            throw err;
        }
    }

}

module.exports = AuthService;