module.exports = {
    db: {
        protocol: 'mongodb',
        host_temp: 'localhost',
        host: 'mongo',  // Docker mongo container
        port: "27017:27017",
    },
    cloud_db: "mongodb+srv://shinmatz1234:shinz9474@cluster0.asls6.mongodb.net/${database}?retryWrites=true&w=majority",
    secret: 'secret'
}