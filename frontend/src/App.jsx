import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// User pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Menswear from './pages/collections/Menswear';
import Womenswear from './pages/collections/Womenswear';
import Kidswear from './pages/collections/Kidswear';
import Nightwear from './pages/collections/Nightwear';
import Fabric from './pages/collections/Fabric';
import FabricDesign from './pages/collections/FabricDesign';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import FabricManager from './pages/admin/FabricManager';
import ManageOrders from "./pages/admin/ManageOrders";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Product Collections */}
        <Route path="/collections/menswear" element={<Menswear />} />
        <Route path="/collections/womenswear" element={<Womenswear />} />
        <Route path="/collections/kidswear" element={<Kidswear />} />
        <Route path="/collections/nightwear" element={<Nightwear />} />

        {/* Fabric Collections */}
        <Route path="/collections/fabric" element={<Fabric />} />
        <Route path="/fabric/:fabricName" element={<FabricDesign />} />

        {/* Cart & Order */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminDashboard />}>
          <Route path="fabrics" element={<FabricManager />} />
          <Route path="orders" element={<ManageOrders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
