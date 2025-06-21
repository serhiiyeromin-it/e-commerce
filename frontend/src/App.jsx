
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <CartProvider>
        <div>
          <Cart />
          <Checkout />
          <Home />
        </div>
      </CartProvider>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>Редактируй <code>src/App.jsx</code> и сохраняй — работает HMR!</p>
      </div>

      {/* Вот тут — роутинг */}
      <Routes>
        {/* другие маршруты */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/admin/*" element={<AdminRoute><AdminLayout /></AdminRoute>} />  */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<OrderSuccess />} />
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



        {/* <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        > */}
        {/* <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
        </Route> */}
      </Routes>

      <p className="read-the-docs">
        Нажми на логотипы Vite и React, чтобы узнать больше
      </p>
    </BrowserRouter >
  );
}

export default App;


