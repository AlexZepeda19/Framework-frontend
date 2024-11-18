import React, { useEffect, useState } from 'react';

const PrestamosUserList = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Obtener el id_usuario desde el localStorage
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
          setPrestamos(data);  // Establecer los préstamos en el estado
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
    return <p>Cargando préstamos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Listado de Préstamos</h2>
      {prestamos.length > 0 ? (
        <table className="table table-bordered">
          <thead>
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
    </div>
  );
};

export default PrestamosUserList;
