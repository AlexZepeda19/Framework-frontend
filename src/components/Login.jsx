import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        localStorage.setItem('token', data.token); 
        alert('Inicio de sesión exitoso');

        // Verifica que roleId esté presente
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
    </div>
  );
};

export default Login;
