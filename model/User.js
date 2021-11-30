const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
   nick: String,
   email: String,
   password: String
});

mongoose.model('users', userSchema);
