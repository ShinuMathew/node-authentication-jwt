const Joi = require('joi'),
    Enum = require('../../constants/enums/enum');

module.exports = {
    CreatePost: Joi.object().keys({
        id: Joi.string().pattern(new RegExp('[A-Z]{2}[0-9]{3}')).required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        content: Joi.string().required(),
        status: Joi.string().valid(...Object.values(Enum.POST_STATUS)).required(),
    }),
    UpdatePost: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        content: Joi.string().required(),
        status: Joi.string().valid(...Object.values(Enum.POST_STATUS)).required(),
    }),
    PostId: Joi.object().keys({
        id: Joi.string().pattern(new RegExp('[A-Z]{2}[0-9]{3}')).required()
    })
}