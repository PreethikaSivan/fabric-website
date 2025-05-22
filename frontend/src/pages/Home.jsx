import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  // State to store client info
  const [client, setClient] = useState(null);

  // On mount, check localStorage for client data
  useEffect(() => {
    const storedClient = localStorage.getItem('client');
    if (storedClient) {
      setClient(JSON.parse(storedClient));
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('client');
    setClient(null);
    navigate('/'); // Redirect to home or login page
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Kesavan Exports</h1>

        <div className="auth-buttons">
          {client ? (
            <>
              <span>Welcome, {client.name}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
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

      <section className="contact-section">
        <h3 className="section-title">Contact Us</h3>
        <p>If you have any inquiries or want to get in touch, please use the details below:</p>
        <div className="contact-info">
          <p>Email: <a href="mailto:info@kesavanexports.com">info@kesavanexports.com</a></p>
          <p><strong>Phone:</strong> 9944122866</p>
          <p><strong>Address:</strong> 9/6, Bridgeway Colony, 3rd Street, Tirupur, 641607</p>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Kesavan Exports. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
