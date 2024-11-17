import React from 'react';
import './MenuAdmin.css'; // Asegúrate de importar el archivo CSS

const MenuAdmin = () => {
    return (
        <div className="menu-container">
            <nav className="navbar">
                <ul>
                    <li><a href="/home">Inicio</a></li>
                    <li><a href="/users">Usuarios</a></li>
                    <li><a href="/settings">Configuraciones</a></li>
                    <li><a href="/logout">Cerrar sesión</a></li>
                </ul>
            </nav>
            <h1>Menú de Administración</h1>
            <p>Has iniciado sesión y ahora puedes acceder a las funciones administrativas.</p>
        </div>
    );
};

export default MenuAdmin;
