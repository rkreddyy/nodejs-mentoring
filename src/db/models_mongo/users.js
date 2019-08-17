const mongoose = require('../../config/mongoose');
// import mongoose from '../../config/mongoose';

const usersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: [3, 'Firstname should be of minimum 3 characters']
  },
  lastname: {
    type: String,
    required: true,
    minlength: [3, 'Lastname should be of minimum 3 characters']
  },
  username: {
    type: String,
    required: true,
    minlength: [3, 'Username should be of minimum 3 characters']
  },
  email: {
    type: String,
    required: true,
    minlength: [5, 'Email too short'],
    validate: {
      validator(val) {
        return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val);
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password should be atleast 8 characters long'],
    maxlength: [20, 'Password should not exceed 20 characters long']
  },
  lastModifiedDate: Date
});

usersSchema.pre('save', function (next){
  const date = new Date();
  this.lastModifiedDate = date;
  next();
});

module.exports = mongoose.model('User', usersSchema);
// export default mongoose.model('User', usersSchema);