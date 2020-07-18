const mongoose = require('mongoose')
const { hashSync, compare } = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator')


const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String
})

UserSchema.pre("save", function () {
    this.password = hashSync(this.password)
})

UserSchema.methods.comparePassword = function (password) {
    return compare(password, this.password)
}

UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports = mongoose.model("User", UserSchema)