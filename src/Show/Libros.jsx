import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Libros = () => {
  const [libros, setLibros] = useState([]);
  const [categorias, setCategorias] = useState([]); // Estado para las categorías
  const [currentPage, setCurrentPage] = useState(0);
  const [librosPorPagina, setLibrosPorPagina] = useState(5); // Número de libros por página
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [libroSeleccionado, setLibroSeleccionado] = useState(null); // Estado para el libro seleccionado para actualizar
  const [showAddModal, setShowAddModal] = useState(false); // Estado para el modal de agregar libro
  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: '',
    autor: '',
    categoria: { id_categoria: '' }, // Asegúrate de que `id_categoria` sea una cadena vacía inicialmente
    isbn: '',
    editorial: '',
    fecha_publicacion: '',
    cantidad_total: 0,
    cantidad_disponible: 0
  }); // Estado para los valores del nuevo libro

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

    // Obtener las categorías desde la API
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/categoria');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
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
    setShowModal(false); // Cerrar el modal de actualizar
    setShowAddModal(false); // Cerrar el modal de agregar
    setNuevoLibro({
      titulo: '',
      autor: '',
      categoria: { id_categoria: '' }, // Limpiar el campo de categoría al cerrar el modal
      isbn: '',
      editorial: '',
      fecha_publicacion: '',
      cantidad_total: 0,
      cantidad_disponible: 0
    }); // Limpiar el formulario de agregar
  };

  // Función para manejar el cambio de los campos del libro
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLibroSeleccionado({
      ...libroSeleccionado,
      [name]: value,
    });
  };

  // Función para manejar el cambio de los campos del nuevo libro
  const handleNewBookInputChange = (e) => {
    const { name, value } = e.target;

    // Si el campo es id_categoria, guardamos el id seleccionado
    if (name === 'categoria.id_categoria') {
      setNuevoLibro({
        ...nuevoLibro,
        categoria: { id_categoria: value }
      });
    } else {
      setNuevoLibro({
        ...nuevoLibro,
        [name]: value,
      });
    }
  };

  // Función para guardar el libro actualizado
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/v1/libros/${libroSeleccionado.id_libro}`, libroSeleccionado);
      setLibros(libros.map(libro => libro.id_libro === libroSeleccionado.id_libro ? libroSeleccionado : libro));
      setShowModal(false); // Cerrar el modal después de actualizar
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
    }
  };

  // Función para agregar un nuevo libro
  const handleAddBook = async () => {
    try {
      // Asegurarse de que la categoría sea válida
      if (!nuevoLibro.categoria.id_categoria) {
        alert('Por favor, seleccione una categoría válida.');
        return;
      }

      // Enviar el nuevo libro a la API con la estructura correcta
      const response = await axios.post('http://localhost:8080/api/v1/libros', nuevoLibro);
      setLibros([...libros, response.data]); // Añadir el nuevo libro a la lista
      handleCloseModal(); // Cerrar el modal
    } catch (error) {
      console.error('Error al agregar el libro:', error);
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
              <th>Acciones</th>
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

      {/* Botón para agregar libro */}
      <div className="text-center mt-4">
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          Agregar Libro
        </Button>
      </div>

      {/* Modal de agregar libro */}
      {showAddModal && (
        <Modal show={showAddModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Nuevo Libro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="titulo">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  name="titulo"
                  value={nuevoLibro.titulo}
                  onChange={handleNewBookInputChange}
                />
              </Form.Group>
              <Form.Group controlId="autor">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                  type="text"
                  name="autor"
                  value={nuevoLibro.autor}
                  onChange={handleNewBookInputChange}
                />
              </Form.Group>
              <Form.Group controlId="categoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  as="select"
                  name="categoria.id_categoria"
                  value={nuevoLibro.categoria.id_categoria}
                  onChange={handleNewBookInputChange}
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map(categoria => (
                    <option key={categoria.id_categoria} value={categoria.id_categoria}>
                      {categoria.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="isbn">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  name="isbn"
                  value={nuevoLibro.isbn}
                  onChange={handleNewBookInputChange}
                />
              </Form.Group>
              <Form.Group controlId="editorial">
                <Form.Label>Editorial</Form.Label>
                <Form.Control
                  type="text"
                  name="editorial"
                  value={nuevoLibro.editorial}
                  onChange={handleNewBookInputChange}
                />
              </Form.Group>
              <Form.Group controlId="fecha_publicacion">
                <Form.Label>Fecha de Publicación</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha_publicacion"
                  value={nuevoLibro.fecha_publicacion}
                  onChange={handleNewBookInputChange}
                />
              </Form.Group>
              <Form.Group controlId="cantidad_total">
                <Form.Label>Cantidad Total</Form.Label>
                <Form.Control
                  type="number"
                  name="cantidad_total"
                  value={nuevoLibro.cantidad_total}
                  onChange={handleNewBookInputChange}
                />
              </Form.Group>
              <Form.Group controlId="cantidad_disponible">
                <Form.Label>Cantidad Disponible</Form.Label>
                <Form.Control
                  type="number"
                  name="cantidad_disponible"
                  value={nuevoLibro.cantidad_disponible}
                  onChange={handleNewBookInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleAddBook}>
              Agregar Libro
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Libros;
