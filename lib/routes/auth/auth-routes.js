const AuthService = require('../../services/auth-service'),
    Express = require('express'),
    router = Express.Router(),
    { users } = require('../../data-access-stub/stub-data'),
    CommonUtils = require('../../../helpers/core/common-utils');

class AuthRoutes {

    constructor() {
        this.authService = new AuthService();
        this.commonUtils = new CommonUtils();
    }

    signin(req, res) {

    }

    async signup(req, res) {
        try {
            let result = this.authService.signup(req);
            res.json()
        } catch (err) {
            
        }
    }


}

function registerAuthRoutes() {
    this.authRoutes = new AuthRoutes();
    router.get('/signin', (req, res) => this.authRoutes.signin(req, res));
    router.post('/signup', async (req, res) => await this.authRoutes.signup(req, res));
}

registerAuthRoutes();

module.exports = router;