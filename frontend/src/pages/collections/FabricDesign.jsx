import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import BASE_URL from '../../utils/api';

import "./FabricPage.css";

const fabricNames = ["Trending", "Cotton", "Silk", "Linen", "Printed", "Rayon"];

const FabricDesign = () => {
  const { fabricName } = useParams();
  const formattedName = fabricName.charAt(0).toUpperCase() + fabricName.slice(1).toLowerCase();
  const [designs, setDesigns] = useState([]);

  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products/${fabricName.toLowerCase()}`);

        const data = await response.json();
        setDesigns(data);
      } catch (error) {
        console.error("Error fetching fabric designs:", error);
      }
    };

    fetchDesigns();
  }, [fabricName]);

  const handleAddToCart = (design) => {
    const designWithType = { ...design, fabricType: formattedName, quantity: 1 };
    addToCart(designWithType);
  };

  return (
    <>
      <Navbar showSearch={true} />

      <div className="fabric-page">
        <div className="fabric-section">
          <h2 className="section-title">{formattedName} Designs</h2>

          {/* Navigation */}
          <nav className="fabric-nav">
            {fabricNames.map((name) => (
              <Link
                key={name}
                to={`/fabric/${name.toLowerCase()}`}
                className={`nav-link ${name.toLowerCase() === fabricName.toLowerCase() ? "active" : ""}`}
              >
                {name}
              </Link>
            ))}
          </nav>

          {/* Designs Grid */}
          <div className="designs-grid">
            {designs.map((design, index) => {
              const isInCart = cartItems.some((item) => item.name === design.name);
              return (
                <div className="design-card" key={index}>
                  {/* ✅ Image line: confirmed to use design.imageURL */}
                  <img src={design.imageURL} alt={design.name} className="design-image" />
                  <div className="design-info">
                    <h3>{design.name}</h3>
                    <p className="price">₹{design.price}/m</p>
                    <div className="button-group">
                      <button
                        className={`action-btn ${isInCart ? "added" : ""}`}
                        onClick={() => handleAddToCart(design)}
                        disabled={isInCart}
                      >
                        {isInCart ? "Added to Cart" : "Add to Cart"}
                      </button>
                      <button
                        className="action-btn order"
                        onClick={() =>
                          navigate("/order", {
                            state: {
                              item: { ...design, fabricType: formattedName },
                            },
                          })
                        }
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FabricDesign;
