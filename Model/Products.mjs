import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  fathername: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
});

const Products = model('Products', productSchema);

export default Products;
