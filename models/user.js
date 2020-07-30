const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, default: 'cyclop_01.png'},
    cardIds: [{type: Number, required: true}]                // User's deck
});

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;