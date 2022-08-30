const Joi = require('joi');

module.exports = {
    RegisterUser : Joi.object({
        username : Joi.string().required(),
        password : Joi.string().required(),
        confirmPassword: Joi.string().required(),
        firstName : Joi.string().required(),
        lastName : Joi.string().required(),
        email : Joi.string().email().required()
    }),
    LoginUser : Joi.object({
        username : Joi.string().required(),
        password : Joi.string().required(),
        consent : Joi.boolean().required()
    }),
    RefreshToken : Joi.object({
        "refresh-token" : Joi.string().required()        
    }),
    Logout : Joi.object({
        "jwt" : Joi.string().required()        
    }),
}