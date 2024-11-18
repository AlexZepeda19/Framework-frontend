import React from 'react';
import axios from 'axios'; // Importamos axios para hacer la solicitud HTTP
import { useNavigate } from 'react-router-dom'; // Usamos useNavigate para redirigir después del logout

const MenuUser = () => {
    const navigate = useNavigate(); // Usamos useNavigate para la redirección

    // Función para manejar el cierre de sesión
    const handleLogout = async () => {
        const token = localStorage.getItem('token'); // Suponiendo que el token está en localStorage

        if (!token) {
            console.error("No hay token disponible");
            return;
        }

        try {
            // Enviar el token al servidor para hacer logout
            const response = await axios.post('http://localhost:8080/api/v1/auth/logout', {
                token: token
            });

            console.log('Respuesta del logout:', response.data);

            // Limpiar el almacenamiento local
            localStorage.removeItem('token'); // Eliminar el token del localStorage
            // Redirigir al usuario al inicio de sesión
            navigate('/login'); // Redirige a la página de login
        } catch (error) {
            console.error('Error en el cierre de sesión:', error);
            // Puedes mostrar un mensaje de error o manejarlo de otra manera
        }
    };

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
                            <a className="nav-link" href="/ShowUser/LibrosUser">Ver Biblioteca</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/ShowUser/CategoriasUser">Ver Categorias</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Ver más
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/ShowUser/PrestamosUserList">Revisar mis préstamos</a>
                                <a className="dropdown-item" href="/ShowUser/ReservasUserList">Revisar mis reservas</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
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
