import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './components/Login';

import MenuAdmin from './pages/MenuAdmin';
import MenuUser from './pages/MenuUser';

import Libros from './Show/Libros';
import LibrosUser from './ShowUser/LibrosUser';

import Prestamos from './Show/Prestamos';
import PrestamosUser from './ShowUser/PrestamoUser'

import Reservas from './Show/Reservas';


import Usuarios from './Show/Usuarios';
import Categorias from './Show/Categorias';



import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Cargar Login al inicio */}
        <Route path="/login" element={<Login />} /> {/* Cambiar la ruta a '/login' */}

        {/* Rutas para MenuAdmin y otros componentes */}
        <Route path="/pages/MenuAdmin" element={<MenuAdmin />} />
        <Route path="/pages/MenuUser" element={<MenuUser />} />


        {/* Rutas para Libros, Prestamos, Usuarios y Categorias */}
        <Route path="/Show/Libros" element={<Libros />} />
        <Route path="/Show/Prestamos" element={<Prestamos />} />
        <Route path="/Show/Usuarios" element={<Usuarios />} />
        <Route path="/Show/Categorias" element={<Categorias />} />
        <Route path="/Show/Reservas" element={<Reservas />} />


        {/* Rutas para Libros, Prestamos, Usuarios y Categorias */}
        <Route path="/ShowUser/LibrosUser" element={<LibrosUser />} />
        <Route path="/ShowUser/PrestamosUser" element={<PrestamosUser />} />



        {/* Rutas para Libros, Prestamos, Usuarios y Categorias */}
        <Route path="/Add/Libros" element={<Libros />} />
        <Route path="/Add/Prestamos" element={<Prestamos />} />
        <Route path="/Add/Usuarios" element={<Usuarios />} />
        <Route path="/Add/Categorias" element={<Categorias />} />
        <Route path="/Add/Reservas" element={<Reservas />} />


      </Routes>
    </Router>
  );

}
export default App;
