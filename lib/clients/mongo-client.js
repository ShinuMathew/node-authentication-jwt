const mongoose = require('mongoose'),
    logger = require('../../helpers/logger/logger'),
    yargs = require('yargs'),
    Enum = require('../constants/enums/enum'),
    config = require('../../config/db-config'),
    {
        MEMCAHE
    } = require('../../helpers/core/mem-cache');

class MongoClient {

    constructor(database) {
        this.database = database;
    }

    async getConnection() {
        logger.info(`Attempting to connect \n${this.database} database...`);
        let dbCon = MEMCAHE.DATABASE_CONNECTION[database]
        return (dbCon && dbCon.connection.readyState == 1) ? dbCon : await this.createNewConnection();
    }

    async createNewConnection(database) {
        try {
            let connectionString = (yargs.argv.dbType == Enum.DB_TYPE.LOCAL) ?
                `${config.db.protocol}://${config.db.host}:${config.db.port}/${database}` :
                this._getRemoteClusterConnection(database)
            let dbCon = await mongoose.createConnection(connectionString);
            MEMCAHE.DATABASE_CONNECTION[database] = dbCon
            logger.info(`Connect to mongo db : ${database}`);
            return dbCon;
        } catch (err) {
            logger.error(`Unable to connect to mongo db. Following error occured :\n${err}`)
        }
    }

    _getRemoteClusterConnection(database) {
        return config.cloud_db.replace("${database}", database)
    }
}

module.exports = MongoClient;