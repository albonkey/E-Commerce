import mongoose from 'mongoose';
import crypto from 'crypto';
import { v1 as uuidv1} from 'uuid';

const userSchema = new mongoose.Schema({
  name:{ type: String, required: true},
  email:{ type: String, required: true, unique: true, dropDups: true},
  hashed_password: { type: String, required: true},
  salt: String,
  isAdmin: { type: Boolean, required: true, default: false},
  history: { type: Array, default: []}
});

userSchema.virtual('password')
.set(function(password) {
  this._password = password;
  this.salt = uuidv1();
  this.hashed_password = this.encryptPassword(password);
})
.get(function() {
  return this._password;
})

userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function(password){
    if(!password) return 'false';

    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    } catch(error){
      return '';
    }
  }
}

const userModel = mongoose.model('User', userSchema);

export default userModel;
