import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './pagination.css';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]); // Inicializar como un array vacío
  const [currentPage, setCurrentPage] = useState(0);
  const [usuariosPorPagina, setUsuariosPorPagina] = useState(5); // Número de usuarios por página
  const [showModal, setShowModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Obtener usuarios desde la API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/usuario');
        
        // Asegurarse de que la respuesta sea un array
        if (Array.isArray(response.data)) {
          setUsuarios(response.data); // Establecer los usuarios obtenidos desde la API
        } else {
          setUsuarios([]); // Si la respuesta no es un array, establecer como array vacío
        }
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        setUsuarios([]); // En caso de error, establecer como array vacío
      }
    };

    fetchUsuarios();
  }, []);

  // Función para manejar el cambio de página
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Obtener el conjunto de usuarios para la página actual
  const offset = currentPage * usuariosPorPagina;
  const currentUsuarios = usuarios.slice(offset, offset + usuariosPorPagina);

  // Función para manejar el botón de actualizar
  const handleUpdate = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowModal(true);
  };

  // Función para manejar el botón de eliminar
  const handleDelete = async () => {
    if (usuarioAEliminar) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/usuario/${usuarioAEliminar.id_usuario}`);
        setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id_usuario !== usuarioAEliminar.id_usuario));
        setShowDeleteModal(false);
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
      }
    }
  };

  // Función para manejar el cierre del modal
  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMessage('');
  };

  // Función para manejar el cambio de los campos del usuario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuarioSeleccionado({
      ...usuarioSeleccionado,
      [name]: value,
    });
  };

  // Función para actualizar el usuario
  const handleSave = async () => {
    if (!usuarioSeleccionado.nombre || !usuarioSeleccionado.email || !usuarioSeleccionado.rol) {
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/v1/usuario/${usuarioSeleccionado.id_usuario}`, usuarioSeleccionado);
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) => (usuario.id_usuario === usuarioSeleccionado.id_usuario ? usuarioSeleccionado : usuario))
      );
      setShowModal(false);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Lista de Usuarios</h1>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID Usuario</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha de Registro</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentUsuarios.length > 0 ? (
              currentUsuarios.map((usuario) => (
                <tr key={usuario.id_usuario}>
                  <td>{usuario.id_usuario}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>{new Date(usuario.fechaRegistro).toLocaleString()}</td>
                  <td>{usuario.rol?.nombre || 'Sin rol asignado'}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdate(usuario)}
                    >
                      Actualizar
                    </button>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => { setUsuarioAEliminar(usuario); setShowDeleteModal(true); }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No hay usuarios disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="d-flex justify-content-center">
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          breakLabel={'...'}
          pageCount={Math.ceil(usuarios.length / usuariosPorPagina)}
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
      {usuarioSeleccionado && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Actualizar Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <Form>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={usuarioSeleccionado.nombre}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={usuarioSeleccionado.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="rol">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  as="select"
                  name="rol"
                  value={usuarioSeleccionado.rol?.id_rol || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar Rol</option>
                  <option value="1">Admin</option>
                  <option value="2">Usuario</option>
                </Form.Control>
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

      {/* Modal de confirmación de eliminación */}
      {usuarioAEliminar && (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación de Eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de que quieres eliminar a este usuario?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
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

export default Usuarios;
