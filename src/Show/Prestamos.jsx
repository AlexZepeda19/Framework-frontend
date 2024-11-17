import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Modal, Button, Form } from 'react-bootstrap'; // Importamos componentes de react-bootstrap

const Prestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [prestamosPorPagina, setPrestamosPorPagina] = useState(5); // Número de préstamos por página
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [prestamoEditando, setPrestamoEditando] = useState(null); // Estado para el préstamo que se está editando

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

  // Función para manejar el botón de actualizar (abre el modal)
  const handleUpdate = (prestamo) => {
    setPrestamoEditando(prestamo);
    setShowModal(true); // Mostrar el modal
  };

  // Función para manejar el botón de eliminar
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/prestamos/${id}`);
      setPrestamos(prestamos.filter(prestamo => prestamo.idPrestamo !== id)); 
    } catch (error) {
      console.error('Error al eliminar el préstamo:', error);
    }
  };

  // Función para manejar la actualización del préstamo
  const handleSaveUpdate = async () => {
    try {
      // Actualizamos el préstamo en la API
      await axios.put(`http://localhost:8080/api/v1/prestamos/${prestamoEditando.idPrestamo}`, prestamoEditando);
      setPrestamos(prestamos.map(p => (p.idPrestamo === prestamoEditando.idPrestamo ? prestamoEditando : p)));
      setShowModal(false); // Cerrar el modal
    } catch (error) {
      console.error('Error al actualizar el préstamo:', error);
    }
  };

  // Función para manejar el cambio de los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrestamoEditando({ ...prestamoEditando, [name]: value });
  };

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
              <th>Acciones</th> {/* Nueva columna para botones */}
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
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleUpdate(prestamo)} // Abre el modal con la información del préstamo
                  >
                    Actualizar
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => handleDelete(prestamo.idPrestamo)}
                  >
                    Eliminar
                  </button>
                </td>
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

      {/* Modal para editar un préstamo */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Préstamo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFechaDevolucion">
              <Form.Label>Fecha de Devolución</Form.Label>
              <Form.Control
                type="date"
                name="fechaDevolucion"
                value={prestamoEditando ? prestamoEditando.fechaDevolucion : ''}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formFechaPrestamo">
              <Form.Label>Fecha de Préstamo</Form.Label>
              <Form.Control
                type="date"
                name="fechaPrestamo"
                value={prestamoEditando ? prestamoEditando.fechaPrestamo : ''}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveUpdate}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Prestamos;
