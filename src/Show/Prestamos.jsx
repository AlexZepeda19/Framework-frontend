import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Prestamos = () => {
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    // Obtener los préstamos desde la API
    const fetchPrestamos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/prestamos');
        setPrestamos(response.data);
      } catch (error) {
        console.error('Error al obtener los préstamos:', error);
      }
    };

    fetchPrestamos();
  }, []);

  return (
    <div>
      <h1>Los préstamos se listarán aquí</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID Préstamo</th>
            <th>Usuario</th>
            <th>Libro</th>
            <th>Fecha de Préstamo</th>
            <th>Fecha de Devolución</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map((prestamo) => (
            <tr key={prestamo.idPrestamo}>
              <td>{prestamo.idPrestamo}</td>
              <td>{prestamo.usuario.nombre} ({prestamo.usuario.email})</td>
              <td>{prestamo.libro.titulo} ({prestamo.libro.autor})</td>
              <td>{prestamo.fechaPrestamo}</td>
              <td>{prestamo.fechaDevolucion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Prestamos;
