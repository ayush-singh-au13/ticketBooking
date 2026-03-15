import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ApiForm from './pages/ApiForm';
import ApiResponse from './pages/ApiResponse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ApiForm />} />
        <Route path="/response" element={<ApiResponse />} />
      </Routes>
    </Router>
  );
}

export default App;
