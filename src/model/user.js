const mongoose = require('mongoose');


// eslint-disable-next-line
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  google_id: String,
});

const User = mongoose.model('User', userSchema);

exports.User = User;
