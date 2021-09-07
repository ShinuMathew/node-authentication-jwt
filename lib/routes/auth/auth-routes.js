const AuthService = require('../../services/auth-service'),
    Express = require('express'),
    router = Express.Router(),
    { users } = require('../../data-access-stub/stub-data'),
    CommonUtils = require('../../../helpers/core/common-utils'),
    ResponseHandler = require('../../../helpers/core/response-handler');

class AuthRoutes {

    constructor() {
        this.authService = new AuthService();
        this.commonUtils = new CommonUtils();
        this.responseHandler = new ResponseHandler();
    }

    async signin(req, res) {
        try {
            await this.authService.signin(req, res)            
        } catch (err) {
            this.responseHandler.replyError(res, err)
        }
    }

    async signup(req, res) {
        try {
            let result = await this.authService.signup(req);            
            this.responseHandler.replySuccess(res, result, 201)
        } catch (err) {
            this.responseHandler.replyError(res, err)
        }
    }


}

function registerAuthRoutes() {
    this.authRoutes = new AuthRoutes();
    router.post('/signin', async (req, res) => await this.authRoutes.signin(req, res));
    router.post('/signup', async (req, res) => await this.authRoutes.signup(req, res));
}

registerAuthRoutes();

module.exports = router;