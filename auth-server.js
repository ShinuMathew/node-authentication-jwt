const Express = require('express'),
    cors = require('cors'),
    AuthRoutes = require('./lib/routes/auth/auth-routes'),
    CommonUtils = require('./helpers/core/common-utils'),
    logger = require('./helpers/logger/logger');

require('dotenv').config({
    path: `${new CommonUtils().getWorkingDirectory()}.env`
});

const app = Express();

const PORT = process.env.PORT || 4000

app.use(Express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({
        "status": "SUCCESS"
    })
})

app.use('/auth', AuthRoutes)


app.listen(PORT, () => logger.info(`Server started at PORT : ${PORT}`))