const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: String,
    middle_name: String,
    last_name: String,
    email : String,
    password: String,
    role: String,
    created_time: Date,
    updated_time: Date

});

module.exports = mongoose.model('Users',userSchema);