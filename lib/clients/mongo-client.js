const mongoose = require('mongoose'),    
    logger = require('../../helpers/logger/logger'),
    yargs = require('yargs'),
    Enum = require('../constants/enums/enum'),
    config = require('../../config/db-config');

class MongoClient {

    constructor(database) {
        this.database = database;
    }

    async getConnection() {
        logger.info(`Attempting to connect \n${this.database} database...`);
        if (mongoose.connection.db === undefined || mongoose.connection.db.databaseName !== this.database)
            await this.createNewConnection(this.database)
        else
            logger.info(`Connection already exists for : \n${mongoose.connection.db.databaseName}`);
        return mongoose;
    }

    async createNewConnection() {
        try {
            let connectionString = (yargs.argv.dbType == Enum.DB_TYPE.LOCAL) 
                                ? `${config.db.protocol}://${config.db.host}:${config.db.port}/${this.database}` 
                                : this._getRemoteClusterConnection()
            await mongoose.connect(connectionString);
            logger.info(`Connect to mongo db : ${mongoose.connection.db.databaseName}`);
        } catch (err) {
            logger.error(`Unable to connect to mongo db. Following error occured :\n${err}`)
        }
    }

    _getRemoteClusterConnection() {
        return config.cloud_db.replace("${database}", this.database)
    }
}

module.exports = MongoClient;