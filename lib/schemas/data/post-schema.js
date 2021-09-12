module.exports = {    
    POST : {
        id : {
            type : String,
            required : true
        },
        author : {
            type : String,
            required : true
        },
        title : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        content : {
            type : String,
            required : true
        },
        created_date : {
            type : Date,
            required: true
        },
        modified_date : {
            type : Date,
            required: true
        },
    }
}