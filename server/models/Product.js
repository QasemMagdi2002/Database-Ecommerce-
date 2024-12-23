const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  images: [{ type: Buffer }], // Store images as binary data
  category: { type: String },
  stock: { type: Number, default: 0 },
  attributes: { type: Map, of: String },
});

// Create a text index for searching
ProductSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', ProductSchema);

