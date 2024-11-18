import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Registro from './components/Registro'
import Login from './components/Login';
import MenuAdmin from './pages/MenuAdmin';
import MenuUser from './pages/MenuUser';

import Libros from './Show/Libros';
import LibrosUser from './ShowUser/LibrosUser';

import Prestamos from './Show/Prestamos';
import PrestamosUser from './FUsers/PrestamosUser';
import PrestamosUserList from './ShowUser/PrestamosUserList'


import Reservas from './Show/Reservas';
import ReservasUser from './FUsers/ReservasUser';
import ReservasUserList from './ShowUser/ReservasUserList';


import Usuarios from './Show/Usuarios';


import Categorias from './Show/Categorias';
import CategoriasUser from './ShowUser/CategoriasUser';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Cargar Login al inicio */}
        <Route path="/login" element={<Login />} /> {/* Cambiar la ruta a '/login' */}

        {/* Rutas para MenuAdmin y MenuUser */}
        <Route path="/pages/MenuAdmin" element={<MenuAdmin />} />
        <Route path="/pages/MenuUser" element={<MenuUser />} />

        {/* Rutas para componentes Show */}
        <Route path="/Show/Libros" element={<Libros />} />
        <Route path="/Show/Prestamos" element={<Prestamos />} />
        <Route path="/Show/Usuarios" element={<Usuarios />} />
        <Route path="/Show/Categorias" element={<Categorias />} />
        <Route path="/Show/Reservas" element={<Reservas />} />

        {/* Rutas para componentes ShowUser */}
        <Route path="/ShowUser/LibrosUser" element={<LibrosUser />} />
        <Route path="/ShowUser/CategoriasUser" element={<CategoriasUser />} />
        <Route path="/ShowUser/PrestamosUserList" element={<PrestamosUserList />} />
        <Route path="/ShowUser/ReservasUserList" element={<ReservasUserList />} />

        <Route path="/components/Registro" element={<Registro />} />



        {/* Rutas para componentes FUsers */}
        <Route path="/FUsers/PrestamosUser" element={<PrestamosUser />} />
        <Route path="/FUsers/ReservasUser" element={<ReservasUser />} />


       
      </Routes>
    </Router>
  );
}

export default App;
