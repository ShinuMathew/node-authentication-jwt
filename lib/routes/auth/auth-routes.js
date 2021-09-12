const AuthService = require('../../services/auth-service'),
    Express = require('express'),
    router = Express.Router(),    
    CommonUtils = require('../../../helpers/core/common-utils'),
    ResponseHandler = require('../../../helpers/core/response-handler'),
    AuthMiddleware = require('../../middleware/auth-middleware');

class AuthRoutes {

    constructor() {
        this.authService = new AuthService();
        this.commonUtils = new CommonUtils();
        this.responseHandler = new ResponseHandler();
        this.authMiddleware = new AuthMiddleware();
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
    router.post('/signin', this.authRoutes.authMiddleware.loginUserSchema, async (req, res) => await this.authRoutes.signin(req, res));
    router.post('/signup', this.authRoutes.authMiddleware.registerUserSchema, async (req, res) => await this.authRoutes.signup(req, res));
}

registerAuthRoutes();

module.exports = router;