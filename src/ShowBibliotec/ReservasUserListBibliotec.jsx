import React, { useEffect, useState } from 'react';

const ReservasUserListBibliotec = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Obtener el id_usuario desde el localStorage
  const idUsuario = localStorage.getItem('idUser');

  useEffect(() => {
    if (idUsuario) {
      fetch(`http://localhost:8080/api/v1/reservas?usuarioId=${idUsuario}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener las reservas');
          }
          return response.json();
        })
        .then(data => {
          setReservas(data);  // Establecer las reservas en el estado
          setLoading(false);  // Dejar de mostrar el mensaje de carga
        })
        .catch(err => {
          setError(`Error: ${err.message}`); // Manejar el error si ocurre
          setLoading(false);
        });
    } else {
      setError('Usuario no encontrado. Por favor inicie sesión.');
      setLoading(false);
    }
  }, [idUsuario]);

  if (loading) {
    return <p>Cargando reservas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Listado de Reservas</h2>
      {reservas.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID Reserva</th>
              <th>Libro</th>
              <th>Autor</th>
              <th>Fecha Reserva</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map(reserva => (
              <tr key={reserva.id_reserva}>
                <td>{reserva.id_reserva}</td>
                {/* Comprobación adicional de existencia de 'libro' */}
                <td>{reserva.libro?.titulo || 'Sin título'}</td>
                <td>{reserva.libro?.autor || 'Desconocido'}</td>
                <td>{new Date(reserva.fecha_reserva).toLocaleDateString() || 'Fecha no disponible'}</td>
                <td>{reserva.estado?.nombreEstado || 'Estado no disponible'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tienes reservas registradas.</p>
      )}
    </div>
  );
};

export default ReservasUserListBibliotec;
