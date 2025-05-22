import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

const CartPage = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/order", { state: { items: cartItems } });
    }
  };

  // Calculate total cart price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2 className="cart-heading">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="cart-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/placeholder.png";
                  }}
                />

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>Category: {item.category}</p>
                  {/* Show price multiplied by quantity */}
                  <p>
                    Price: ₹
                    {item.price * item.quantity}
                  </p>
                </div>

                <div className="cart-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item.name, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item.name, item.quantity + 1)
                      }
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.name)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Display total price */}
            <div className="cart-total">
              <h3>Total Price: ₹{totalPrice}</h3>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
        <Footer />
    </>
  );
};

export default CartPage;
