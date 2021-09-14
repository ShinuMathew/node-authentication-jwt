const AuthManager = require('../manager/auth-manager'),
    logger = require('../../helpers/logger/logger'),
    jwt = require('jsonwebtoken'),
    _ = require('lodash'),
    Errors = require('../constants/errors/errors'),
    ResponseHandler = require('../../helpers/core/response-handler'),
    CommonUtils = require('../../helpers/core/common-utils'),
    JWTManager = require('../manager/jwt-manager'),
    config = require('../../config/config');
class AuthService {

    constructor() {
        this.authManager = new AuthManager();
        this.commonUtils = new CommonUtils();
        this.responseHandler = new ResponseHandler();
        this.jwtManager = new JWTManager();
    }

    async signin(req, res) {
        const me = this
        try {
            let result = await this.authManager.signIn(req.body.username, req.body.password);
            let token = await this.jwtManager.generateJWTTOken(result.userData, {
                expiresIn: config.jwt_expire
            })
            let refreshToken = await this.jwtManager.generateRefreshJWTToken(result.userData)
            await this.authManager.saveRefreshToken(refreshToken)
            res.cookie(config.jwt_signature, token)
            return {
                result: result.result,
                jwt: token,
                refreshToken : refreshToken
            }                       
        } catch (err) {
            logger.error(`AuthService signin() failed :\n${err}`)
            let errMsg = _.cloneDeep(Errors.UnableToAuthenticateUser)
            errMsg.message = err.message.replace('{message}', err)            
            throw errMsg;
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

    async refreshToken(req, res) {
        try {
            await this.authManager.checkRefreshToken(req.body["refresh-token"])
            let data = await this.authManager.fetchDataFromJWT(req.body["refresh-token"])
            let token = await this.jwtManager.generateJWTTOken(data, {
                expiresIn: config.jwt_expire
            })
            res.cookie("insight-jwt", token)
            return {
                jwt: token                
            }   
        } catch (err) {
            logger.error(`AuthService refreshToken() failed :\n${err}`)
            throw err;
        }
    }


    async logOut(req, res) {
        try {
            res.clearCookie(config.jwt_signature);
            return await this.authManager.logout(req.body.jwt)
        } catch (err) {
            logger.error(`AuthService logOut() failed :\n${err}`)
            throw err;
        }
    }

}

module.exports = AuthService;