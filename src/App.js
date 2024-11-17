import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import MenuAdmin from './pages/MenuAdmin';

function App() {
  return (<Router>
    <Routes>
      <Route path="/" element={<Login />} /> {/* Cargar Login al inicio */}
      <Route path="/components/login" element={<Login />} />
      <Route path="/pages/MenuAdmin" element={<MenuAdmin />} />
    </Routes>
  </Router>
  );
}

export default App;



