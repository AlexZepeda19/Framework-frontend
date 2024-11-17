import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom'; // Usamos useNavigate en lugar de useHistory
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Libros = () => {
  const [libros, setLibros] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [librosPorPagina, setLibrosPorPagina] = useState(5); // Número de libros por página
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [libroSeleccionado, setLibroSeleccionado] = useState(null); // Estado para el libro seleccionado para actualizar

  useEffect(() => {
    // Obtener los libros desde la API
    const fetchLibros = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/libros');
        setLibros(response.data);
      } catch (error) {
        console.error('Error al obtener los libros:', error);
      }
    };

    fetchLibros();
  }, []);

  // Función para manejar el cambio de página
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Obtener los libros para la página actual
  const offset = currentPage * librosPorPagina;
  const currentLibros = libros.slice(offset, offset + librosPorPagina);

  // Función para manejar el botón de actualizar
  const handleUpdate = (libro) => {
    setLibroSeleccionado(libro); // Establecer el libro a editar
    setShowModal(true); // Mostrar el modal
  };

  // Función para manejar el botón de eliminar
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/libros/${id}`);
      setLibros(libros.filter(libro => libro.id_libro !== id));
    } catch (error) {
      console.error('Error al eliminar el libro:', error);
    }
  };

  // Función para manejar el cierre del modal
  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
  };

  // Función para manejar el cambio de los campos del libro
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLibroSeleccionado({
      ...libroSeleccionado,
      [name]: value,
    });
  };

  // Función para actualizar el libro
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/v1/libros/${libroSeleccionado.id_libro}`, libroSeleccionado);
      setLibros(libros.map(libro => libro.id_libro === libroSeleccionado.id_libro ? libroSeleccionado : libro));
      setShowModal(false); // Cerrar el modal después de actualizar
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Listado de Libros</h1>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoría</th>
              <th>ISBN</th>
              <th>Editorial</th>
              <th>Fecha de Publicación</th>
              <th>Cantidad Total</th>
              <th>Cantidad Disponible</th>
              <th>Acciones</th> {/* Nueva columna para botones */}
            </tr>
          </thead>
          <tbody>
            {currentLibros.map((libro) => (
              <tr key={libro.id_libro}>
                <td>{libro.id_libro}</td>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>{libro.categoria.nombre}</td>
                <td>{libro.isbn}</td>
                <td>{libro.editorial}</td>
                <td>{libro.fecha_publicacion}</td>
                <td>{libro.cantidad_total}</td>
                <td>{libro.cantidad_disponible}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleUpdate(libro)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => handleDelete(libro.id_libro)}
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
          pageCount={Math.ceil(libros.length / librosPorPagina)}
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

      {/* Modal de actualización */}
      {libroSeleccionado && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Actualizar Libro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="titulo">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  name="titulo"
                  value={libroSeleccionado.titulo}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="autor">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                  type="text"
                  name="autor"
                  value={libroSeleccionado.autor}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="categoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  name="categoria"
                  value={libroSeleccionado.categoria.nombre}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="isbn">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  name="isbn"
                  value={libroSeleccionado.isbn}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="editorial">
                <Form.Label>Editorial</Form.Label>
                <Form.Control
                  type="text"
                  name="editorial"
                  value={libroSeleccionado.editorial}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="fecha_publicacion">
                <Form.Label>Fecha de Publicación</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha_publicacion"
                  value={libroSeleccionado.fecha_publicacion}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="cantidad_total">
                <Form.Label>Cantidad Total</Form.Label>
                <Form.Control
                  type="number"
                  name="cantidad_total"
                  value={libroSeleccionado.cantidad_total}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="cantidad_disponible">
                <Form.Label>Cantidad Disponible</Form.Label>
                <Form.Control
                  type="number"
                  name="cantidad_disponible"
                  value={libroSeleccionado.cantidad_disponible}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Libros;
