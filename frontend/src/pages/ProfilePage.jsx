import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';  // Import your existing Navbar component
import './ProfilePage.css'; // Ensure your profile page has its own CSS for styling

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Dummy data for the profile
    const dummyProfile = {
      name: 'User',
      email: 'user@example.com',
      phone: '9565648962',
      address: '12/34 Main St, Salem',
      orders: [
        {
          orderId: '681cec04c937bc91faeb0137',
          date: '5/8/2025',
          items: [
            { name: 'Cotton Soft', quantity: 1, price: 400 },
          ],
        },
        {
          orderId: '681cecf7c937bc91faeb0167',
          date: '5/8/2025',
          items: [
            { name: 'Hand Block Print', quantity: 1, price: 300 },
          ],
        },
      ],
    };

    setProfile(dummyProfile); // Set profile with dummy data
  }, []);

  if (!profile) {
    return (
      <div className="profile-loading">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />  {/* Include Navbar component */}

      <div className="profile-card">
        <h2>User Profile</h2>
        <div className="profile-info">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Orders Placed:</strong> {profile.orders.length}</p>
        </div>
      </div>

      <div className="orders-section">
        <h3>Your Orders</h3>
        {profile.orders.length > 0 ? (
          profile.orders.map((order, index) => (
            <div key={index} className="order-card">
              <h4>Order ID: {order.orderId}</h4>
              <p>Date: {order.date}</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.quantity} x {item.name} - Rs.{item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p><strong>Total: </strong>Rs.{order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
            </div>
          ))
        ) : (
          <p>No orders placed yet.</p>
        )}
      </div>

      {/* Footer directly included */}
      <div className="site-footer">
        <div className="footer-content">
        <p>© 2025 Kesavan Exports. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
