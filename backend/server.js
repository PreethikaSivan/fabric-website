const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path'); // ✅ <-- FIX

const clientRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const orderRoutes = require("./routes/order");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve image uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/client', clientRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/products', productRoutes);

// MongoDB Connection
mongoose.connect('mongodb+srv://preethikas22csd:preethi@cluster0.olfxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log('MongoDB connection failed', err));
