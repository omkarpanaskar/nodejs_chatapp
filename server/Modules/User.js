const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter name']
    },
    email: {
        type: String,
        required: [true, 'Please Enter email'],
        unique: [true, 'Duplicate key'],
        lowercase: true,
        validate: [isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please Enter password'],
        minLength: [6, 'The password shoud be minimum length is 6']
    },
})
// encryot password using bcrypt 
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    // console.log('before save',this);
    next();
})
// userSchema.post('save',function(doc,next) {
//     console.log('after save',doc);
//     next();
// })
// login user 
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const isAuthenticate = await bcrypt.compare(password, user.password)
        if (isAuthenticate) {
            return user;
        }
        throw Error('Incorrect password')
    } else {
        throw Error('Incorrect email')
    }
}
const User = mongoose.model('user', userSchema);
module.exports = User;