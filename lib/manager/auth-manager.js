const StubData = require('../data-access-stub/stub-data'),
    Errors = require('../constants/errors/errors'),
    _ = require('lodash'),
    logger = require('../../helpers/logger/logger'),
    Enum = require('../constants/enums/enum'),
    CommonUtils = require('../../helpers/core/common-utils'),
    AuthDataAccessor = require('../data-accessor/auth-data-access'),
    JWTManager = require('../manager/jwt-manager');

class AuthManager {

    constructor() {
        this.authDataAccessor = new AuthDataAccessor()
        this.commonUtils = new CommonUtils()
        this.jwtManager = new JWTManager();
    }

    async signIn(username, password) {
        try {
            let userData = await this.authDataAccessor.getUser(username);
            if(userData.length === 0) {
                let errMsg = _.cloneDeep(Errors.InvalidUserName)
                errMsg.message = errMsg.message.replace("{username}", username)
                throw errMsg;
            }
            if(await this.commonUtils.comparePassword(password, userData[0].password)) { 
                let data = {
                    username : userData[0].username,
                    firstName : userData[0].firstName,
                    lastName : userData[0].lastName,
                    email : userData[0].email,
                }
                return {
                    userData: data,
                    result : {
                        status: Enum.PROCESS_STATUS.SUCCESS,
                        message: `User ${username} logged in successfully`
                    }
                }
            } else
                throw Error.InvalidPassword       
        } catch (err) {
            logger.error(`auth-manager signIn() fails due to \n${JSON.stringify(err)}`)
            throw err
        }
    }

    async saveRefreshToken(refreshToken) {
        try {
            let token = {
                token : refreshToken,
                status : Enum.TOKEN_STATUS.ACTIVE
            }
            await this.authDataAccessor.saveRefreshToken(token);
        } catch (err) {
            logger.error(`auth-manager saveRefreshToken() fails due to \n${err}`)
            throw err
        }
    }

    async checkRefreshToken(refreshToken) {
        try {            
            let result = await this.authDataAccessor.getRefereshToken(refreshToken);
            if(result.length == 0) throw Errors.InvalidToken            
        } catch (err) {
            logger.error(`auth-manager saveRefreshToken() fails due to \n${err}`)
            throw err
        }
    }

    async fetchDataFromJWT(refreshToken) {
        try {
            let userData = await this.jwtManager.fetchDataFromJWT(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            return {
                username : userData.username,
                firstName : userData.firstName,
                lastName : userData.lastName,
                email : userData.email,
            }
        } catch (err) {
            
        }
    }

    async signUp(userInfo) {
        try {
            let userData = await this.authDataAccessor.getUser(userInfo.username);
            if(userData.length > 0) {
                let errMsg = _.cloneDeep(Errors.UserIdAlreadyExists)
                errMsg.message = errMsg.message.replace("{username}", userInfo.username)
                throw errMsg;
            }
            await this.authDataAccessor.saveUser(userInfo)
            return {
                username: userInfo.username,
                status: "CREATED"
            }
        } catch (err) {
            logger.error(`auth-manager signUp() fails due to \n${err}`)
            throw err
        }
    }

    async logout(refreshToken) {
        try {
            let result = await this.authDataAccessor.getRefereshToken(refreshToken)
            console.log(JSON.stringify(result))
            if(result[0].status == Enum.TOKEN_STATUS.INACTIVE)  throw Errors.UserAlreadyLoggedOut
            result = await this.authDataAccessor.inactivateToken(refreshToken)
            if(result.modifiedCount == 0) throw Errors.LogoutFailed            
            return {
                message: "Logged out successfully",                
            }
        } catch (err) {
            logger.error(`auth-manager signUp() fails due to \n${err}`)
            throw err
        }
    }

    async signUpStub(userInfo) {
        try {
            let userData = await this.authDataAccessor.getUser(userInfo.username);
            userData = StubData.users.find(user => user.username === userInfo.username)
            if(userData) {
                let errMsg = _.cloneDeep(Errors.UserIdAlreadyExists)
                errMsg.message = errMsg.message.replace("{username}", userInfo.username)
                throw errMsg;
            }         
            StubData.users.push(userInfo)
            return {
                username: userInfo.username,
                status: "CREATED"
            }
        } catch (err) {
            throw err
        }
    }

    
}

module.exports = AuthManager;