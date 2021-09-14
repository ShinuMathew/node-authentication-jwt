const Enum = require('../../constants/enums/enum');

module.exports = {
    AUTH : {
        username : {
            type : String,
            required : true,
        },
        password : {
            type : String,
            required : true,
        },
        firstName : {
            type : String,
            required : true,
        },
        lastName : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true,
        },
        created_date : {
            type : Date,
            required: true
        },
        modified_date : {
            type : Date,
            required: true
        },
    },
    TOKEN: {
        token : {
            type : String,
            required : true,
        },
        status : {
            type : String,
            enum : Object.values(Enum.TOKEN_STATUS),
            required : true
        }
    }
}