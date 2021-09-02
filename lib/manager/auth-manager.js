const StubData = require('../data-access-stub/stub-data'),
    Error = require('../constants/errors/errors'),
    _ = require('lodash');

class AuthManager {

    constructor() {

    }

    signIn(username, password) {

    }

    signUp(userInfo) {
        try {
            let userData = StubData.users.find(user => user.username === userInfo.username)
            if(userData) {
                let errMsg = _.cloneDeep(Error.UserIdAlreadyExists)
                errMsg.message.replace("{username}", userInfo.username)
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