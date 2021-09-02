const Error = require('../../lib/constants/errors/errors');

class ResponseHandler {

    constructor() {

    }

    replySuccess(res) {

    }

    replyError(res, err) {
        if(!err.statusCode)
            err = Error.UnexpectedErrorOccurred;
           
        res.json(err).status(err.statusCode)
    }
}

module.exports = ResponseHandler;