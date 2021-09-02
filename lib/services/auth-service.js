const AuthManager = require('../manager/auth-manager'),
    Error = require('../constants/errors/errors'),
    CommonUtils = require('../../helpers/core/common-utils');

class AuthService {
    
    constructor() {
        this.authManager = new AuthManager();
        this.commonUtils = new CommonUtils();
    }

    signin(req) {

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
            }
            return this.authManager.signUp(user);
        } catch (err) {
            throw err;
        }
    }

}

module.exports = AuthService;