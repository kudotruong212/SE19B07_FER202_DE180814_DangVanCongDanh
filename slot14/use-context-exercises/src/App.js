import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import các component cần thiết
import Home from './components/Home';
import Products from './components/Products';
import Contact from './components/Contact';
import ProductDetail from './components/ProductDetail';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './components/DashboardHome';
import Settings from './components/Settings';
import Reports from './components/Reports';
import NotFound from './components/NotFound';
import Navigation from './components/Navigation'; // Thanh điều hướng

function App() {
  return (
    <>
      <Navigation /> 
      <div className="container" style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/lien-he" element={<Contact />} />
          
          <Route path="/san-pham/:productId" element={<ProductDetail />} />
          
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Reports />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
