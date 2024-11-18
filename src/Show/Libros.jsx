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
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal de actualización
  const [libroSeleccionado, setLibroSeleccionado] = useState(null); // Estado para el libro seleccionado para actualizar
  const [showAddModal, setShowAddModal] = useState(false); // Estado para el modal de agregar libro
  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: '',
    autor: '',
    categoria: '', // Solo el id_categoria
    isbn: '',
    editorial: '',
    fecha_publicacion: '',
    cantidad_total: 0,
    cantidad_disponible: 0
  }); // Estado para los valores del nuevo libro

  // UseEffect para cargar los libros y categorías al iniciar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [librosResponse, categoriasResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/v1/libros'),
          axios.get('http://localhost:8080/api/v1/categoria'),
        ]);
        setLibros(librosResponse.data);
        setCategorias(categoriasResponse.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    fetchData();
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
    setLibroSeleccionado(libro);
    setShowModal(true);
  };

  // Función para manejar el botón de eliminar
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/libros/${id}`);
        setLibros(libros.filter(libro => libro.id_libro !== id));
      } catch (error) {
        console.error('Error al eliminar el libro:', error);
      }
    }
  };

  // Función para cerrar los modales
  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal de actualización
    setShowAddModal(false); // Cerrar el modal de agregar
    setNuevoLibro({
      titulo: '',
      autor: '',
      categoria: '',
      isbn: '',
      editorial: '',
      fecha_publicacion: '',
      cantidad_total: 0,
      cantidad_disponible: 0
    }); // Limpiar el formulario de agregar
  };

  // Función para manejar los cambios en los campos del libro (para actualización)
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;

    setLibroSeleccionado({
      ...libroSeleccionado,
      [name]: name === 'categoria' ? { id_categoria: value } : value, // Si el campo es "categoria", actualizar como un objeto
    });
  };

  // Función para guardar el libro actualizado
  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/libros/${libroSeleccionado.id_libro}`, libroSeleccionado);
      setLibros(libros.map(libro => libro.id_libro === libroSeleccionado.id_libro ? response.data : libro));
      setShowModal(false);
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
    }
    window.location.reload();
  };

  // Función para manejar los cambios en el formulario de agregar libro
  const handleNewBookInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoLibro((prevLibro) => ({
      ...prevLibro,
      [name]: value,
    }));
  };

  // Función para agregar un nuevo libro
  const handleAddBook = async () => {
    try {
      // Asegurarse de que la categoría sea válida
      if (!nuevoLibro.categoria) {
        alert('Por favor, seleccione una categoría válida.');
        return;
      }

      // Crear el objeto para enviar al servidor
      const libroParaEnviar = {
        ...nuevoLibro,
        categoria: { id_categoria: nuevoLibro.categoria }, // Enviar el id de la categoría
      };

      // Enviar el nuevo libro a la API
      const response = await axios.post('http://localhost:8080/api/v1/libros', libroParaEnviar);
      setLibros([...libros, response.data]); // Añadir el nuevo libro a la lista
      handleCloseModal(); // Cerrar el modal
    } catch (error) {
      console.error('Error al agregar el libro:', error);
    }
    window.location.reload();
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
                  name="categoria"
                  value={nuevoLibro.categoria}
                  onChange={handleNewBookInputChange}
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id_categoria} value={categoria.id_categoria}>
                      {categoria.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              {/* Otros campos del libro */}
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
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal de actualización */}
      {showModal && libroSeleccionado && (
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
                  onChange={handleUpdateInputChange}
                />
              </Form.Group>
              <Form.Group controlId="autor">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                  type="text"
                  name="autor"
                  value={libroSeleccionado.autor}
                  onChange={handleUpdateInputChange}
                />
              </Form.Group>
              <Form.Group controlId="categoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  as="select"
                  name="categoria"
                  value={libroSeleccionado.categoria.id_categoria} // Asumimos que categoria es un objeto con id_categoria
                  onChange={handleUpdateInputChange}
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id_categoria} value={categoria.id_categoria}>
                      {categoria.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              {/* Otros campos del libro */}
              <Form.Group controlId="isbn">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  name="isbn"
                  value={libroSeleccionado.isbn}
                  onChange={handleUpdateInputChange}
                />
              </Form.Group>
              <Form.Group controlId="editorial">
                <Form.Label>Editorial</Form.Label>
                <Form.Control
                  type="text"
                  name="editorial"
                  value={libroSeleccionado.editorial}
                  onChange={handleUpdateInputChange}
                />
              </Form.Group>
              <Form.Group controlId="fecha_publicacion">
                <Form.Label>Fecha de Publicación</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha_publicacion"
                  value={libroSeleccionado.fecha_publicacion}
                  onChange={handleUpdateInputChange}
                />
              </Form.Group>
              <Form.Group controlId="cantidad_total">
                <Form.Label>Cantidad Total</Form.Label>
                <Form.Control
                  type="number"
                  name="cantidad_total"
                  value={libroSeleccionado.cantidad_total}
                  onChange={handleUpdateInputChange}
                />
              </Form.Group>
              <Form.Group controlId="cantidad_disponible">
                <Form.Label>Cantidad Disponible</Form.Label>
                <Form.Control
                  type="number"
                  name="cantidad_disponible"
                  value={libroSeleccionado.cantidad_disponible}
                  onChange={handleUpdateInputChange}
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
