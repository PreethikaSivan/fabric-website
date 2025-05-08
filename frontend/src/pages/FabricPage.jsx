// src/pages/FabricPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './FabricPage.css';

const fabricDesigns = {
  trending: ['/images/trending1.jpg', '/images/trending2.jpg'],
  cotton: ['/images/cotton1.jpg', '/images/cotton2.jpg'],
  silk: ['/images/silk1.jpg', '/images/silk2.jpg'],
  linen: ['/images/linen1.jpg', '/images/linen2.jpg'],
  printed: ['/images/printed1.jpg', '/images/printed2.jpg'],
  rayon: ['/images/rayon1.jpg', '/images/rayon2.jpg'],
};

const FabricPage = () => {
  const { type } = useParams();
  const designs = fabricDesigns[type] || [];

  return (
    <div className="fabric-page">
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Designs</h2>
      <div className="design-grid">
        {designs.map((img, index) => (
          <img key={index} src={img} alt={`Design ${index + 1}`} />
        ))}
      </div>

      <nav className="fabric-nav">
        {Object.keys(fabricDesigns).map((fabric) => (
          <Link key={fabric} to={`/fabric/${fabric}`}>
            {fabric.charAt(0).toUpperCase() + fabric.slice(1)}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default FabricPage;
