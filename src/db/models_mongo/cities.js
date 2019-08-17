const mongoose = require('../../config/mongoose');
// import mongoose from '../../config/mongoose';

const citiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'City name too short'],
    validate: {
      validator(val) {
        return /^[A-Z]/.test(val);
      },
      message: '{VALUE} should start with uppercase letter'
    }
  },
  country: {
    type: String
  },
  capital: {
    type: Boolean,
    default: false
  },
  location: {
    lat: {
      type: Number,
      default: 0
    },
    long: {
      type: Number,
      default: 0
    }
  },
  lastModifiedDate: Date
});

citiesSchema.pre('save', function (next) {
  const date = new Date();
  this.lastModifiedDate = date;
  next();
})

// export default mongoose.model('City', citiesSchema);
module.exports = mongoose.model('City', citiesSchema);