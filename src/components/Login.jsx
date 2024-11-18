import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginData = {
      email: email,
      password: password
    };

    fetch('http://localhost:8080/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    })
    .then(response => {
      if (!response.ok) { 
        throw new Error('Credenciales inválidas'); 
      }
      return response.json();
    })
    .then(data => { 
      console.log('Success:', data);

      // Verifica si hay un token en la respuesta
      if (data.token) {
        // Guarda tanto el token como el idUser en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('idUser', data.idUser); 
        alert('Inicio de sesión exitoso');

        // Verifica el roleId y navega según el rol
        if (data.roleId === 1) { 
          navigate('/pages/MenuAdmin');
        } 
        else if (data.roleId === 2) { 
          navigate('/pages/MenuUser');
        } else { 
          console.warn('Rol no reconocido');
        }
      }
    })
    .catch((error) => { 
      console.error('Error:', error); 
      alert('Error al iniciar sesión: ' + error.message);
    });
  };

  // Función para navegar a la página de registro
  const handleRegisterRedirect = () => {
    navigate('/components/Registro');
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="form-control" 
            placeholder="Ingrese su correo electrónico"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="form-control" 
            placeholder="Ingrese su contraseña"
          />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
      </form>

      {/* Enlace para redirigir a la página de registro */}
      <div className="mt-3 text-center">
        <p>
          Si no tienes una cuenta, <a href="#" onClick={handleRegisterRedirect}>créala aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
