const mongoose = require('../../config/mongoose');
// import mongoose from '../../config/mongoose';

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Product Name too short']
  },
  price: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Array
  },
  lastModifiedDate: Date
});

productsSchema.pre('save', function (next){
  const date = new Date();
  this.lastModifiedDate = date;
  next();
});

module.exports = mongoose.model('Product', productsSchema);
// export default mongoose.model('Product', productsSchema);
