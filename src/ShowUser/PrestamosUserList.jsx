import React, { useEffect, useState } from 'react';

const PrestamosUserList = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const idUsuario = localStorage.getItem('idUser');

  useEffect(() => {
    if (idUsuario) {
      fetch(`http://localhost:8080/api/v1/prestamos?usuarioId=${idUsuario}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los préstamos');
          }
          return response.json();
        })
        .then(data => {
          setPrestamos(data);
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
    return <p className="text-center mt-5">Cargando préstamos...</p>;
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
      <h2 className="mb-4 text-center">Listado de Préstamos</h2>
      {prestamos.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID Préstamo</th>
              <th>Libro</th>
              <th>Autor</th>
              <th>Fecha Préstamo</th>
              <th>Fecha Devolución</th>
            </tr>
          </thead>
          <tbody>
            {prestamos.map(prestamo => (
              <tr key={prestamo.idPrestamo}>
                <td>{prestamo.idPrestamo}</td>
                <td>{prestamo.libro?.titulo || 'Sin título'}</td>
                <td>{prestamo.libro?.autor || 'Desconocido'}</td>
                <td>{prestamo.fechaPrestamo ? new Date(prestamo.fechaPrestamo).toLocaleDateString() : 'Fecha no disponible'}</td>
                <td>{prestamo.fechaDevolucion ? new Date(prestamo.fechaDevolucion).toLocaleDateString() : 'Fecha no disponible'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tienes préstamos registrados.</p>
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

export default PrestamosUserList;
