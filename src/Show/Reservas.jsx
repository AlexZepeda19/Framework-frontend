import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservasList = () => {
  const [reservas, setReservas] = useState([]);

  // Función para obtener las reservas desde la API
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/reservas'); // Cambia esta URL por la de tu API
        setReservas(response.data);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    };
    fetchReservas();
  }, []);

  return (
    <div className="container">
      <h1>Lista de Reservas</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Reserva</th>
            <th>Usuario</th>
            <th>Libro</th>
            <th>Fecha de Reserva</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id_reserva}>
              <td>{reserva.id_reserva}</td>
              <td>{reserva.usuario.nombre}</td>
              <td>{reserva.libro.titulo}</td>
              <td>{new Date(reserva.fecha_reserva).toLocaleString()}</td>
              <td>{reserva.estado.nombreEstado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservasList;
