// src/pages/OrderPage.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./OrderPage.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OrderPage = () => {
  const location = useLocation();
  const { item, items } = location.state || {};

  const isMultiple = Array.isArray(items) && items.length > 0;
  const orderItems = isMultiple ? items : item ? [item] : [];

  const [sharedInfo, setSharedInfo] = useState({
    clientName: "",
    address: "",
    phone: "",
  });

  const [customDetails, setCustomDetails] = useState(
    orderItems.map(() => ({
      quantity: 1,
      customizationNotes: "",
      referenceImageUrl: "",
    }))
  );

  if (orderItems.length === 0) {
    return <p className="order-error">No order details found.</p>;
  }

  const handleSharedChange = (e) => {
    const { name, value } = e.target;
    setSharedInfo({ ...sharedInfo, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...customDetails];
    updated[index][field] = value;
    setCustomDetails(updated);
  };

  const handleImageUpload = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      handleItemChange(index, "referenceImageUrl", reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullOrder = {
      ...sharedInfo,
      items: orderItems.map((order, index) => ({
        fabricType: order.fabricType,
        name: order.name,
        price: order.price,
        image: order.image,
        quantity: customDetails[index].quantity,
        customizationNotes: customDetails[index].customizationNotes,
        referenceImageUrl: customDetails[index].referenceImageUrl,
      })),
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullOrder),
      });

      if (res.ok) {
        toast.success("Order placed successfully!");

        // Optional: Clear form or redirect
      } else {
        alert("Order failed. Try again.");
      }
    } catch (err) {
        console.error("Error placing order:", error);
        toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="order-container">
        <h2>Place Your Order</h2>

        <form className="order-form" onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input
              type="text"
              name="clientName"
              value={sharedInfo.clientName}
              onChange={handleSharedChange}
              placeholder="Your Name"
              required
            />
          </label>
          <label>
            Address:
            <textarea
              name="address"
              value={sharedInfo.address}
              onChange={handleSharedChange}
              placeholder="Shipping Address"
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              name="phone"
              value={sharedInfo.phone}
              onChange={handleSharedChange}
              placeholder="Phone Number"
              required
            />
          </label>

          {orderItems.map((order, index) => (
            <div className="order-item-block" key={index}>
              <h3>Item {index + 1}</h3>
              <div className="order-content">
                <div className="order-image-card">
                  <img src={order.image} alt={order.name} className="order-image" />
                </div>
                <div className="order-details">
                  <p><strong>Fabric:</strong> {order.fabricType}</p>
                  <p><strong>Design:</strong> {order.name}</p>
                  <p><strong>Price:</strong> {order.price}</p>

                  <label>
                    Quantity (in meters):
                    <input
                      type="number"
                      min="1"
                      value={customDetails[index].quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Customization Notes:
                    <textarea
                      value={customDetails[index].customizationNotes}
                      onChange={(e) =>
                        handleItemChange(index, "customizationNotes", e.target.value)
                      }
                      placeholder="Describe what you want customized..."
                    />
                  </label>
                  <label>
                    Reference Image:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}

          <button type="submit" className="place-order-btn">Confirm Order</button>
        </form>
      </div>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />

    </>
  );
};

export default OrderPage;
