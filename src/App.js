import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import MenuAdmin from './pages/MenuAdmin';
import MenuUser from './pages/MenuUser';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (<Router>
    <Routes>
      <Route path="/" element={<Login />} /> {/* Cargar Login al inicio */}
      <Route path="/components/login" element={<Login />} />
      <Route path="/pages/MenuAdmin" element={<MenuAdmin />} />
      <Route path="/pages/MenuUser" element={<MenuUser/>} />

    </Routes>
  </Router>
  );
}

export default App;



