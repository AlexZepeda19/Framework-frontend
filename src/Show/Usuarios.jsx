import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './pagination.css';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [usuariosPorPagina, setUsuariosPorPagina] = useState(5); // Número de usuarios por página
  const [showModal, setShowModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    // Obtener los usuarios desde la API
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/usuario');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  // Función para manejar el cambio de página
  const handlePageClick = (event) => {
    console.log("Página seleccionada: ", event.selected);
    setCurrentPage(event.selected);
  };

  // Obtener el conjunto de usuarios para la página actual
  const offset = currentPage * usuariosPorPagina;
  const currentUsuarios = usuarios.slice(offset, offset + usuariosPorPagina);

  // Función para manejar el botón de actualizar
  const handleUpdate = (usuario) => {
    console.log("Actualizando usuario: ", usuario);
    setUsuarioSeleccionado(usuario);
    setShowModal(true);
  };

  // Función para manejar el botón de eliminar
  const handleDelete = async (id) => {
    console.log("Eliminando usuario con ID: ", id);
    try {
      await axios.delete(`http://localhost:8080/api/v1/usuario/${id}`);
      setUsuarios(usuarios.filter(usuario => usuario.id_usuario !== id));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  // Función para manejar el cierre del modal
  const handleCloseModal = () => {
    console.log("Modal cerrado");
    setShowModal(false);
  };

  // Función para manejar el cambio de los campos del usuario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Cambiando campo:", name, "Valor:", value);
    setUsuarioSeleccionado({
      ...usuarioSeleccionado,
      [name]: value,
    });
  };

  // Función para actualizar el usuario
  const handleSave = async () => {
    console.log("Guardando usuario: ", usuarioSeleccionado);
    try {
      await axios.put(`http://localhost:8080/api/v1/usuario/${usuarioSeleccionado.id_usuario}`, usuarioSeleccionado);
      setUsuarios(usuarios.map(usuario => usuario.id_usuario === usuarioSeleccionado.id_usuario ? usuarioSeleccionado : usuario));
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
              <th>Acciones</th> {/* Nueva columna para botones */}
            </tr>
          </thead>
          <tbody>
            {currentUsuarios.map((usuario) => (
              <tr key={usuario.id_usuario}>
                <td>{usuario.id_usuario}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{new Date(usuario.fechaRegistro).toLocaleString()}</td>
                <td>{usuario.rol?.nombre}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleUpdate(usuario)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => handleDelete(usuario.id_usuario)}
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
                  type="text"
                  name="rol"
                  value={usuarioSeleccionado.rol?.nombre}
                  onChange={(e) => handleInputChange({ target: { name: 'rol', value: { ...usuarioSeleccionado.rol, nombre: e.target.value } } })}
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

export default Usuarios;
