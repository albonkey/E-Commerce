import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name:{ type: String, required: true},
  description: { type: String, required: true, default: false},
  price:{ type: Number, required: true, default: 0},
  image:{ data: Buffer, contentType: String},
  category: { type: String, required: true},
  countInStock: { type: Object, required: true},

});

const productModel = mongoose.model('Product', productSchema);

export default productModel;
