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
            let result = await this.authService.signin(req, res)
            this.responseHandler.replySuccess(res, result, 200);
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

    async refreshToken(req, res) {
        try {
            let result = await this.authService.refreshToken(req, res);
            this.responseHandler.replySuccess(res, result, 201)
        } catch (err) {
            this.responseHandler.replyError(res, err)
        }
    }

    async logOut(req, res) {
        try {
            // Clear jwt from cookie and remove refresh token from DB
            let result = await this.authService.logOut(req, res);
            this.responseHandler.replySuccess(res, result, 200)
        } catch (err) {
            this.responseHandler.replyError(res, err)
        }
    }

}

function registerAuthRoutes() {
    this.authRoutes = new AuthRoutes();
    router.post('/signin', this.authRoutes.authMiddleware.loginUserSchema, async (req, res) => await this.authRoutes.signin(req, res));
    router.post('/signup', this.authRoutes.authMiddleware.registerUserSchema, async (req, res) => await this.authRoutes.signup(req, res));
    router.post('/refresh-token', this.authRoutes.authMiddleware.refreshTokenSchema, async (req, res) => await this.authRoutes.refreshToken(req, res));
    router.post('/logout', this.authRoutes.authMiddleware.logoutSchema, async (req, res) => await this.authRoutes.logOut(req, res));
}

registerAuthRoutes();

module.exports = router;