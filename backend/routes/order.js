const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product=require("../models/Product")

// ✅ ADD THIS BLOCK ONLY: POST /api/orders --> Place a new order
// router.post("/", async (req, res) => {
//   try {
//     const orderData = req.body;

//     if (!orderData.quantity || !orderData.design) {
//       return res.status(400).json({ error: "Missing required order fields" });
//     }

//     const newOrder = new Order(orderData);
//     await newOrder.save();

//     res.status(201).json({ message: "Order placed successfully", order: newOrder });
//   } catch (error) {
//     console.error("Error placing order:", error);
//     res.status(500).json({ error: "Failed to place order" });
//   }
// });

// Existing routes below (unchanged)

router.patch('/update-status/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.get("/dashboard-summary", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    const completedOrders = await Order.countDocuments({ status: "Completed" });
    const cancelledOrders = await Order.countDocuments({ status: "Cancelled" });

    const monthlyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      monthlyOrders,
    });
  } catch (err) {
    console.error("Error fetching dashboard summary:", err);
    res.status(500).json({ message: "Fetching dashboard summary failed" });
  }
});

router.post('/', async (req, res) => {
  console.log("Incoming Order Payload:", req.body);

  const { clientName, address, phone, items } = req.body;

  // Validate fields
  if (!clientName || !address || !phone || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Missing or invalid fields" });
  }

  try {
    const newOrder = new Order({
      clientName,
      address,
      phone,
      items,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
});

module.exports = router;


