import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Verify from './pages/Verify';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/dashboard" element={<h1 className="text-center mt-10">Welcome to Dashboard</h1>} />
      </Routes>
    </Router>
  );
}

export default App;