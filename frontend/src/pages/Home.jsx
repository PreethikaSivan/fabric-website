import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Kesavan Exports</h1>
        <div className="auth-buttons">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </header>

      <section className="banner">
        <h2>Welcome to Kesavan Exports</h2>
        <p>Premium Textile Solutions for Every Occasion</p>
      </section>

      <section className="collections-section fabric-section">
        <h3 className="section-title">Fabric Collections</h3>
        <div className="card-grid">
          {[
            { name: 'Trending Fabric', image: '/images/trending.jpg', route: 'trending' },
            { name: 'Cotton', image: '/images/cotton.jpg', route: 'cotton' },
            { name: 'Silk', image: '/images/silk.jpg', route: 'silk' },
            { name: 'Linen', image: '/images/linen.jpg', route: 'linen' },
            { name: 'Printed', image: '/images/printed.jpg', route: 'printed' },
            { name: 'Rayon', image: '/images/rayon.jpg', route: 'rayon' }
          ].map((item, index) => (
            <Link to={`/fabric/${item.route}`} className="collection-card" key={index}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      <section className="collections-section product-section">
        <h3 className="section-title">Product Collections</h3>
        <div className="card-grid">
          {[
            { name: 'Menswear', image: '/images/menswear.jpg' },
            { name: 'Womenswear', image: '/images/womenswear.jpg' },
            { name: 'Kidswear', image: '/images/kidswear.jpg' },
            { name: 'Nightwear', image: '/images/nightwear.jpg' }
          ].map((item, index) => (
            <div className="collection-card" key={index}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Kesavan Exports. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
