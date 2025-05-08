import React from 'react';
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // ✅ Imported Navbar component

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar /> {/* ✅ Navbar added */}
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>Your cart is empty.</h1>
          <p>It looks like you haven't added anything to your cart yet.</p>
        </div>
      </>
    );
  }

  const handleCheckout = (item) => {
    navigate("/order", { state: { item } });
  };

  const handleRemove = (item) => {
    removeFromCart(item.name); // ✅ Remove from the cart
  };

  return (
    <>
      <Navbar /> {/* ✅ Navbar added */}
      <div className="cart-page" style={{ padding: '2rem' }}>
        <h1>Your Cart</h1>
        <ul className="cart-items" style={{ listStyle: 'none', padding: 0 }}>
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <img
                src={item.imageURL}
                alt={item.name}
                className="cart-item-image"
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '1rem' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/placeholder.png';
                }}
              />
              <div className="cart-item-details" style={{ flex: 1 }}>
                <span className="cart-item-name" style={{ fontWeight: 'bold' }}>{item.name}</span>
                <br />
                <span className="cart-item-price">₹{item.price}</span>
              </div>
              <button
                onClick={() => handleCheckout(item)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                Checkout
              </button>
              <button
                onClick={() => handleRemove(item)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div className="cart-summary" style={{ marginTop: '2rem' }}>
          <h2>Cart Summary</h2>
          <p>Total items: {cartItems.length}</p>
          <p>
            Total Price: ₹
            {cartItems.reduce((total, item) => total + Number(item.price), 0).toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
};

export default CartPage;