import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

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
        'Content-Type': 'application/json'
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
        if (data.token) {
          localStorage.setItem('token', data.token); 
          alert('Inicio de sesión exitoso');
          navigate('/pages/MenuAdmin'); 
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error al iniciar sesión: ' + error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />

      <label htmlFor="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />

      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
