const Error = require('../../lib/constants/errors/errors');

class ResponseHandler {

    constructor() {

    }

    replySuccess(res, message, statusCode) {
        res.status(statusCode)
        res.json(message)
    }

    replyError(res, err) {
        if(!err.statusCode)
            err = Error.UnexpectedErrorOccurred;
        res.status(err.statusCode)
        res.json(err)
    }
}

module.exports = ResponseHandler;