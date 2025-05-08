import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import AdminNavbar from '../../components/AdminNavbar';
import AdminFooter from '../../components/AdminFooter';
import '../admin/AdminDashboard.css';

const COLORS = ['#4CAF50', '#FF9800', '#F44336']; // Green, Orange, Red

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    monthlyOrders: [],
  });

  const location = useLocation();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders/dashboard-summary');
        setSummary(res.data);
      } catch (error) {
        console.error('Error fetching dashboard summary:', error);
      }
    };

    fetchSummary();
  }, []);

  const pieData = [
    { name: 'Completed', value: summary.completedOrders },
    { name: 'Pending', value: summary.pendingOrders },
    { name: 'Cancelled', value: summary.cancelledOrders },
  ];

  const formattedBarData = summary.monthlyOrders.map((item) => ({
    month: getMonthName(item._id),
    orders: item.total,
  }));

  function getMonthName(monthNumber) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthNumber - 1];
  }

  const handleLogout = () => {
    window.location.href = 'http://localhost:5173';
  };

  return (
    <div className="admin-dashboard">

      <AdminNavbar />
      <main className="admin-dashboard-content">
        {location.pathname === '/admin' && (
          <>
            <div className="orders-summary">
              <h3>Orders Summary</h3>
              <div className="dashboard-cards">
                <div className="card">Total Orders: <span>{summary.totalOrders}</span></div>
                <div className="card">Pending Orders: <span>{summary.pendingOrders}</span></div>
                <div className="card">Completed Orders: <span>{summary.completedOrders}</span></div>
              </div>
            </div>

            <div className="charts-section">
              <div className="chart-box">
                <h3>Order Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" outerRadius={80} label>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-box">
                <h3>Monthly Orders</h3>
                <ResponsiveContainer width="80%" height={250}>
                  <BarChart data={formattedBarData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#027DFF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        <Outlet />
      </main>
      <AdminFooter />
    </div>
  );
};

export default AdminDashboard;
