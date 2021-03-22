const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    register_data: {
        type: Date,
        default: Date.now
    },
    street: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    zip: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    age: {
        type: String,
        default: ""
    },
    skills: {
        type: String,
        default: ""
    },

})

module.exports = mongoose.model('user', UserSchema)