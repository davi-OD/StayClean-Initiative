const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userRegSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    userName: {
        type: String,   
    },
    password: String
});
userRegSchema.plugin(passportLocalMongoose)
//incase you are using email instead of username:use-
// userRegSchema.plugin(passportLocalMongoose, {usernameField: 'email'})
module.exports = mongoose.model('Users', userRegSchema)