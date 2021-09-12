const AuthManager = require('../manager/auth-manager'),    
    logger = require('../../helpers/logger/logger'),
    jwt = require('jsonwebtoken'),
    _ = require('lodash'),
    Errors = require('../constants/errors/errors'),
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
            // let reqUserData = ['username', 'firstName', 'lastName', 'email']         
            // let userData = Object.keys(result.userData).filter(key => reqUserData.includes(key))
            //     .reduce((obj, key) => {
            //         obj[key] = userData[key];
            //         return obj;
            //     }, {})            
            jwt.sign(result.userData, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '1200s'}, (err, token) => {
                if(err) {
                    let errMsg = _.cloneDeep(Errors.UnableToAuthenticateUser)
                    errMsg.message = err.message.replace('{message}', err)
                    return me.responseHandler.replyError(res, errMsg)
                }
                let responseody = {
                    result: result.result,
                    jwt : token
                }
                res.cookie("insight-jwt", token)
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

    async logOut() {

    }

}

module.exports = AuthService;