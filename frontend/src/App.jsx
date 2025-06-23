
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './pages/UserDashboard';
import Register from './components/Register';
import Login from "./pages/Login";
import Checkout from "./components/Checkout";
import Home from "./Home";
import { CartProvider } from "./context/CartContext";
import Cart from "./Cart";
import OrderSuccess from "./pages/OrderSuccess";
import Payment from "./pages/Payment";
import AdminLayout from "./admin/AdminLayout";
import Users from "./admin/Users";
import Orders from "./admin/Orders";
import Products from "./admin/Products";
import AdminRoute from "./utils/AdminRoute";
import AdminDashboard from "./admin/AdminDashboard";


function App() {
  const [count, setCount] = useState(0);



  return (
    <BrowserRouter>
      <h1>E-Commerce</h1>
      <CartProvider>
        <Routes>
          <Route path="/" element={<><Cart /><Home /></>} />
          <Route path="/checkout" element={<><Cart /><Checkout /></>} />
          <Route path="/success" element={<OrderSuccess />} />
          ...
        </Routes>
      </CartProvider>


      {/* Вот тут — роутинг */}
      <Routes>
        {/* другие маршруты */}
        {/* <Route path="/" element={<Home />} /> */}

        <Route path="/payment" element={<Payment />} />
        {/* <Route path="/success" element={<OrderSuccess />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />


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

    </BrowserRouter >
  );
}

export default App;


