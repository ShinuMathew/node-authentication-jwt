const Joi = require('joi'),
    _ = require('lodash'),
    ResponseHandler = require('../../helpers/core/response-handler'),
    Errors = require('../../lib/constants/errors/errors');

class SchemaValidator {

    constructor() {
        this.responseHandler = new ResponseHandler();
    }

    validateSchema(options, req, res, next, schema) {
        const { error, value } = schema.validate(req.body)        
        if (error) {            
            let errorMsg = _.cloneDeep(Errors.IncorrectRequestBodySchema)
            errorMsg.message = `Validation Error : ${error.details.map(err => err.message).join(', ')}`            
            return this.responseHandler.replyError(res, errorMsg)           
        } else {
            req.body = value
            next()
        }
    }
}

module.exports = SchemaValidator