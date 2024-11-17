import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const Prestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [prestamosPorPagina, setPrestamosPorPagina] = useState(5); // Número de préstamos por página

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

  // Función para manejar el cambio de página
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Obtener los préstamos para la página actual
  const offset = currentPage * prestamosPorPagina;
  const currentPrestamos = prestamos.slice(offset, offset + prestamosPorPagina);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Listado de Préstamos</h1>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID Préstamo</th>
              <th>Usuario</th>
              <th>Libro</th>
              <th>Fecha de Préstamo</th>
              <th>Fecha de Devolución</th>
            </tr>
          </thead>
          <tbody>
            {currentPrestamos.map((prestamo) => (
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

      {/* Paginación */}
      <div className="d-flex justify-content-center">
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          breakLabel={'...'}
          pageCount={Math.ceil(prestamos.length / prestamosPorPagina)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
        />
      </div>
    </div>
  );
};

export default Prestamos;
