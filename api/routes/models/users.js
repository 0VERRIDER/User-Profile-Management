const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId,required: true},
    first_name: {type: String,required: true},
    middle_name: {type: String},
    last_name: {type: String,required: true},
    email : {type: String,required: true,unique: true, dropDups: true},
    password : {type: String,required: true},
    role: {type: String,required: true},
    department : {type: String},
    created_time: {type: Date,required: true},
    updated_time: {type: Date,required: true}

});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     

/**
 * Methods
*/

userSchema.methods = {
    comparePassword: function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    },
}

module.exports = mongoose.model('User',userSchema);