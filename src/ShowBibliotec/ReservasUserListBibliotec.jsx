import React, { useEffect, useState } from 'react';

const ReservasUserListBibliotec = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
          setReservas(data);
          setLoading(false);
        })
        .catch(err => {
          setError(`Error: ${err.message}`);
          setLoading(false);
        });
    } else {
      setError('Usuario no encontrado. Por favor inicie sesión.');
      setLoading(false);
    }
  }, [idUsuario]);

  if (loading) {
    return <p className="text-center mt-5">Cargando reservas...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger">{error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Listado de Reservas</h2>
      {reservas.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
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

      {/* Botón para regresar */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-primary"
          onClick={() => window.history.back()}
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default ReservasUserListBibliotec;
