const StubData = require('../data-access-stub/stub-data'),
    Error = require('../constants/errors/errors'),
    _ = require('lodash'),
    logger = require('../../helpers/logger/logger'),
    Enum = require('../constants/enums/enum'),
    CommonUtils = require('../../helpers/core/common-utils'),
    AuthDataAccessor = require('../data-accessor/auth-data-access');

class AuthManager {

    constructor() {
        this.authDataAccessor = new AuthDataAccessor()
        this.commonUtils = new CommonUtils()
    }

    async signIn(username, password) {
        try {
            let userData = await this.authDataAccessor.getUser(username);
            if(userData.length === 0) {
                let errMsg = _.cloneDeep(Error.InvalidUserName)
                errMsg.message = errMsg.message.replace("{username}", userInfo.username)
                throw errMsg;
            }
            if(await this.commonUtils.comparePassword(password, userData[0].password)) {               
                return {
                    userData: userData,
                    result : {
                        status: Enum.PROCESS_STATUS.SUCCESS,
                        message: `User ${username} logged in successfully`
                    }
                }
            } else
                throw Error.InvalidPassword       
        } catch (err) {
            logger.error(`auth-manager signIn() fails due to \n${err}`)
            throw err
        }
    }

    async signUp(userInfo) {
        try {
            let userData = await this.authDataAccessor.getUser(userInfo.username);
            if(userData.length > 0) {
                let errMsg = _.cloneDeep(Error.UserIdAlreadyExists)
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

    async signUpStub(userInfo) {
        try {
            let userData = await this.authDataAccessor.getUser(userInfo.username);
            userData = StubData.users.find(user => user.username === userInfo.username)
            if(userData) {
                let errMsg = _.cloneDeep(Error.UserIdAlreadyExists)
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