import React from 'react';
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems } = useCart(); // ✅ Use cartItems directly from context

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Your cart is empty.</h1>
        <p>It looks like you haven't added anything to your cart yet.</p>
      </div>
    );
  }

  return (
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
            />
            <div className="cart-item-details">
              <span className="cart-item-name" style={{ fontWeight: 'bold' }}>{item.name}</span>
              <br />
              <span className="cart-item-price">₹{item.price}</span>
            </div>
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
        <button
          onClick={() => alert('Proceeding to checkout')}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
