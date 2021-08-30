module.exports = {
    UserIdAlreadyExists : {
        error : "UserIdAlreadyExists",
        message : "UserName : {username} already exists",
        statusCode : 409
    },
    InvalidUserNameOrPassword : {
        error : "InvalidUserNameOrPassword",
        message : "Username or Password was invalid",
        statusCode : 404
    },
    UnAuthorizedAccess : {
        error : "UnAuthorizedAccess",
        message : "You are not authorized to access this resource",
        statusCode : 401
    },
    UnexpectedErrorOccurred : {
        error : "UnexpectedErrorOccurred",
        message : "An unexpected error occurred. Please try again after sometime",
        statusCode : 500
    }
}