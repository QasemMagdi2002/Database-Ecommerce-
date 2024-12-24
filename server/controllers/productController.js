const multer = require('multer');
const Product = require('../models/Product');

// Multer storage for in-memory image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    // Convert binary images to base64 strings
    const productsWithImages = products.map((product) => {
      const images = product.images.map((image) =>
        `data:image/jpeg;base64,${image.toString('base64')}`
      );
      return { ...product._doc, images }; // Include converted images
    });

    res.status(200).json(productsWithImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products with advanced filtering
const searchProducts = async (req, res) => {
  try {
    const { keyword, minPrice, maxPrice, category } = req.query;
    const filter = {
      $text: { $search: keyword || '' },
      price: { $gte: parseFloat(minPrice) || 0, $lte: parseFloat(maxPrice) || Infinity },
    };
    if (category) filter.category = category;

    const products = await Product.find(filter).sort({ price: -1 });

    // Convert binary images to base64 strings for search results
    const productsWithImages = products.map((product) => {
      const images = product.images.map((image) =>
        `data:image/jpeg;base64,${image.toString('base64')}`
      );
      return { ...product._doc, images };
    });

    res.status(200).json(productsWithImages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Upload product image
const uploadProductImage = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    const imageBuffer = req.file.buffer; // Image as binary data
    product.images.push(imageBuffer); // Store binary data in the images array
    await product.save();

    res.status(200).json({ message: 'Image uploaded successfully', product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get images for a specific product
const getProductImages = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Convert binary images to base64 for frontend
    const imagesBase64 = product.images.map((img) =>
      `data:image/jpeg;base64,${img.toString('base64')}`
    );
    res.status(200).json({ images: imagesBase64 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  getProductImages,
  upload,
};
