
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import AdminRoute from "./utils/AdminRoute";

import Home from "./Home";
import Cart from "./Cart";
import Checkout from "./components/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import Register from './components/Register';
import Login from "./pages/Login";
import Dashboard from './pages/UserDashboard';
import AdminLayout from "./admin/AdminLayout";
import Users from "./admin/Users";
import Orders from "./admin/Orders";
import Products from "./admin/Products";
import AdminDashboard from "./admin/AdminDashboard";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <h1>E-Commerce</h1>
      <CartProvider>
        <Routes>
          {/* Клиентские страницы */}
          <Route path="/" element={<><Cart /><Home /></>} />
          <Route path="/checkout" element={<><Cart /><Checkout /></>} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Админка */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;



