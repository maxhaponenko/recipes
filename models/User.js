const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String, 
        require: true, 
        unique: true
    },
    password: {
        type: String, 
        require: true
    },
    userType: {
        type: Number, 
        require: true
    },
    registeredAt: {
        type: String, 
        require: true
    },
    accessToken: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String,
        require: true
    }
})

const User = model('User', schema, 'users')

module.exports = User