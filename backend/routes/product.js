const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isValid = allowedTypes.test(file.mimetype);
  isValid ? cb(null, true) : cb(new Error('Only JPEG, JPG, and PNG files are allowed'));
};

const upload = multer({ storage, fileFilter });

// POST route to add a product
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, type, price } = req.body;
    const imageURL = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imageURL) return res.status(400).json({ error: 'Image upload failed' });

    const newProduct = new Product({ name, type, price, imageURL });
    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:type", async (req, res) => {
    try {
      const { type } = req.params;
  
      const products = await Product.find({
        type: { $regex: new RegExp(`^${type}$`, 'i') }
      });
  
      const updated = products.map((p) => ({
        ...p._doc,
        imageURL: `${req.protocol}://${req.get("host")}${p.imageURL}`,
      }));
  
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err.message });
    }
  });
  

module.exports = router;
