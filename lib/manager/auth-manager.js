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
                Error.UserIdAlreadyExists.message = Error.UserIdAlreadyExists.message.replace("{username}", user.username)
            }
                throw ;          
            users.push(userInfo)
            res.json(users).status(200)
        } catch (err) {
            throw err
        }
    }

    
}

module.exports = AuthManager;