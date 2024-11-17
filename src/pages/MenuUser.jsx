import React from 'react';

const MenuUser = () => {
    return (
        <div className="container mt-5">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <a className="navbar-brand" href="/">Administración</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/Home">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/ShowUser/LibrosUser">Administrar Libros</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Logout">Cerrar Sesión</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Jumbotron */}
            <div className="jumbotron">
                <h1 className="display-4">Menú de Administración</h1>
                <p className="lead">Has iniciado sesión y ahora puedes acceder a las funciones administrativas.</p>
            </div>
        </div>
    );
}

export default MenuUser;
