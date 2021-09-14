module.exports = {
    DATABASES: {
        AUTH: 'auth-user',
        POSTS: 'posts'
    },
    TABLES: {
        POSTS: 'posts',
        USERS: 'users',
        TOKENS: 'tokens'
    },
    DB_TYPE: {
        LOCAL: 'local',
        REMOTE: 'remote'
    },
    PROCESS_STATUS: {
        SUCCESS: 'success',
        FAILED: 'failed',
        INPROGRESS: 'inprogress',
        PENDING: 'pending'
    },
    POST_STATUS: {
        INPROGRESS: 'inprogress',
        COMPLETED: 'completed',
        YETTOSTART: 'yettostart'
    },
    TOKEN_STATUS: {
        ACTIVE: 'active',
        INACTIVE: 'inactive'
    }
}