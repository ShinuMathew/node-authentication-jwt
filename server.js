require('dotenv').config()
const Express = require('express'),
    cors = require('cors'),    
    PostRoutes = require('./lib/routes/posts/post-routes'),
    AuthRoutes = require('./lib/routes/auth/auth-routes');

const app = Express();

const PORT = process.env.PORT || 3000

app.use(Express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({
        "status": "SUCCESS"
    })
})

app.use('/post',PostRoutes)
app.use('/auth',AuthRoutes)


app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`))