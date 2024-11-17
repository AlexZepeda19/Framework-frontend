import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const ReservasList = () => {
  const [reservas, setReservas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [reservasPorPagina, setReservasPorPagina] = useState(5); // Número de reservas por página
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null); // Para almacenar la reserva seleccionada para actualizar

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

  // Función para manejar la eliminación de una reserva
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/reservas/${id}`);
      setReservas(reservas.filter((reserva) => reserva.id_reserva !== id));
      alert("Reserva eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
    }
  };

  // Función para manejar la actualización de una reserva
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/reservas/${reservaSeleccionada.id_reserva}`, reservaSeleccionada);
      setReservas(reservas.map((reserva) =>
        reserva.id_reserva === reservaSeleccionada.id_reserva ? reservaSeleccionada : reserva
      ));
      setShowModal(false);
      alert("Reserva actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
    }
  };

  // Función para manejar el cambio en el formulario del modal
  const handleChange = (event) => {
    const { name, value } = event.target;
    setReservaSeleccionada((prevReserva) => ({
      ...prevReserva,
      [name]: value
    }));
  };

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
              <th>Acciones</th>
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
                <td>
                  <button 
                    className="btn btn-warning btn-sm"
                    onClick={() => {
                      setReservaSeleccionada(reserva);
                      setShowModal(true);
                    }}
                  >
                    Actualizar
                  </button>
                  <button 
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleDelete(reserva.id_reserva)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de actualización */}
      {showModal && reservaSeleccionada && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Actualizar Reserva</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Estado</label>
                    <input 
                      type="text"
                      className="form-control"
                      name="estado"
                      value={reservaSeleccionada.estado.nombreEstado}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cerrar
                </button>
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
