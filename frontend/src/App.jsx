// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import PrivateRoute from "./utils/PrivateRoute";
// import Dashboard from "./pages/Dashboard";



// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Register from './components/Register'; // если используешь
// Импортируй страницу Login, если она есть
import Login from "./pages/Login";
import Checkout from "./components/Checkout";
import Home from "./Home";
import { CartProvider } from "./context/CartContext";
import Cart from "./Cart";


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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes>

      <p className="read-the-docs">
        Нажми на логотипы Vite и React, чтобы узнать больше
      </p>
    </BrowserRouter>
  );
}

export default App;


