import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const ReservasList = () => {
  const [reservas, setReservas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [reservasPorPagina, setReservasPorPagina] = useState(5); // Número de reservas por página

  useEffect(() => {
    // Obtener las reservas desde la API
    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/reservas');
        setReservas(response.data);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    };
    fetchReservas();
  }, []);

  // Función para manejar el cambio de página
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Obtener las reservas para la página actual
  const offset = currentPage * reservasPorPagina;
  const currentReservas = reservas.slice(offset, offset + reservasPorPagina);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Lista de Reservas</h1>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID Reserva</th>
              <th>Usuario</th>
              <th>Libro</th>
              <th>Fecha de Reserva</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {currentReservas.map((reserva) => (
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

      {/* Paginación */}
      <div className="d-flex justify-content-center">
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          breakLabel={'...'}
          pageCount={Math.ceil(reservas.length / reservasPorPagina)}
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

export default ReservasList;
