const express = require('express');
const {
  getProducts,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  getProductImages,
  upload,
} = require('../controllers/productController');

const { protect } = require('../controllers/userController'); // Import protect middleware for JWT authentication

const router = express.Router();

// Public Routes
router.get('/', getProducts); // Get all products
router.get('/search', searchProducts); // Search products

// Protected Routes
router.post('/', protect, createProduct); // Create product
router.put('/:id', protect, updateProduct); // Update product
router.delete('/:id', protect, deleteProduct); // Delete product
router.post('/upload-image', protect, upload.single('image'), uploadProductImage); // Upload product image
router.get('/:productId/images', getProductImages); // Retrieve product images

module.exports = router;
