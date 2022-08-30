const Express = require('express'),
    cors = require('cors'),
    PostRoutes = require('./lib/routes/posts/post-routes'), 
    AuthRoutes = require('./lib/routes/auth/auth-routes'),   
    CommonUtils = require('./helpers/core/common-utils'),
    AuthMiddleware = require('./lib/middleware/auth-middleware'),
    logger = require('./helpers/logger/logger');

require('dotenv').config({
    path: `${new CommonUtils().getWorkingDirectory()}.env`
});

const app = Express();

const PORT = process.env.PORT || 3000

app.use(Express.json());
app.use(cors())

app.get('/', (req, res) => {    
    res.status(200).json({
        "status": "SUCCESS"
    })
})

let authMiddleWare = new AuthMiddleware()
app.use('/post', authMiddleWare.authenticateToken, PostRoutes)
app.use('/auth', AuthRoutes)


app.listen(PORT, () => logger.info(`Server started at PORT : ${PORT}`))