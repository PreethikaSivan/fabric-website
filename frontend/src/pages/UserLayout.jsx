// UserLayout.jsx
import React from 'react';
import Navbar from '../components/Navbar'; // Adjust path if needed
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
