module.exports = {
    IncorrectRequestBodySchema : {
        error : "IncorrectRequestBodySchema",
        message : "{messsage}",
        statusCode : 404
    },
    IncorrectRequestParam : {
        error : "IncorrectRequestBodySchema",
        message : "{messsage}",
        statusCode : 404
    },
    UserIdAlreadyExists : {
        error : "UserIdAlreadyExists",
        message : "UserName : {username} already exists",
        statusCode : 409
    },
    InvalidUserName : {
        error : "InvalidUserName",
        message : "Username : {username} is invalid",
        statusCode : 409
    },
    InvalidPassword : {
        error : "InvalidPassword",
        message : "Password was invalid",
        statusCode : 409
    },
    UnAuthorizedAccess : {
        error : "UnAuthorizedAccess",
        message : "You are not authorized to access this resource",
        statusCode : 401
    },
    UnableToAuthenticateUser : { 
        error : "UnableToAuthenticateUser",
        message : "{messsage}",
        statusCode : 500
    },
    // Token expire can be 403 Forbidden error as well
    TokenExpiredError: {
        error: "TokenExpiredError",
        message: "Jwt Token expired",
        statusCode: 403
    },
    UnexpectedErrorOccurred : {
        error : "UnexpectedErrorOccurred",
        message : "An unexpected error occurred. Please try again after sometime",
        statusCode : 500
    },
    UnexpectedServerErrorOccurred : {
        error : "UnexpectedServerErrorOccurred",
        message : "{message}",
        statusCode : 500
    },
    PostAlreadyExits : {
        error : "PostAlreadyExits",
        message : "Post with id : '{id}' already exists",
        statusCode : 409
    },
    DuplicatePostIdNotAllowed : {
        error : "DuplicatePostIdNotAllowed",
        message : "Post with id : '{id}' already exists",
        statusCode : 409
    },
    NoPostsFound : {
        error : "NoPostsFound",
        message : "No post found for id : '{id}'",
        statusCode : 40    
    },
    InvalidToken : {
        error : "InvalidToken",
        message : "The token you provided is invalid. Does not exist",
        statusCode : 409
    },
    LogoutFailed : {
        error : "LogoutFailed",
        message : "Unable to remove token from DB. User might have already logged out",
        statusCode : 409
    },
    UserAlreadyLoggedOut : {
        error : "UserAlreadyLoggedOut",
        message : "User has already logged out",
        statusCode : 409
    }
}