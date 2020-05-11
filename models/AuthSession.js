const { Schema, model } = require('mongoose')

const schema = new Schema({
    token: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    userEmail: {
        type: String,
        require: true
    }
})

const AuthSession = model('AuthSession', schema, 'auth_sessions')

module.exports = AuthSession 