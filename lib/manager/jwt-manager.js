const jwt = require('jsonwebtoken'),
    logger = require('../../helpers/logger/logger');

class JWTManager {

    constructor() {

    }

    async generateJWTTOken(data, expiration) {
        try {
            return new Promise((resolve, reject) => {
                jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, expiration, (err, token) => {
                    if (err) reject(err)
                    else resolve(token)
                })
            })
        } catch (err) {
            logger.log(`Following error occurred when trying to generate jwt token:\n${err}`)
            throw err
        }
    }

    async generateRefreshJWTToken(data) {
        try {
            return new Promise((resolve, reject) => {
                jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, (err, token) => {
                    if (err) reject(err)
                    else resolve(token)
                })
            })
        } catch (err) {
            logger.log(`Following error occurred when trying to generate refresh JWT token:\n${err}`)
            throw err
        }
    }

    async fetchDataFromJWT(jwtToken, accessToken) {
        try {
            return new Promise((resolve, reject) => {
                jwt.verify(jwtToken, accessToken, (err, data) => {
                    if (err) reject(err)
                    else resolve(data)
                })
            })
        } catch (err) {
            logger.log(`Following error occurred when trying to fetchiing data from JWT token:\n${err}`)
            throw err
        }
    }
}

module.exports = JWTManager