import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap'; // Importamos componentes de react-bootstrap

const PrestamoUser = () => {
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [nuevoPrestamo, setNuevoPrestamo] = useState({
    fechaPrestamo: '',
    fechaDevolucion: '',
  }); // Estado para el nuevo préstamo que se va a guardar

  // Función para manejar el cambio de los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoPrestamo({ ...nuevoPrestamo, [name]: value });
  };

  // Función para guardar el nuevo préstamo
  const handleSavePrestamo = async () => {
    try {
      // Guardamos el nuevo préstamo en la API
      await axios.post('http://localhost:8080/api/v1/prestamos', nuevoPrestamo);
      setShowModal(false); // Cerrar el modal después de guardar
      // Limpiamos los campos del formulario
      setNuevoPrestamo({
        fechaPrestamo: '',
        fechaDevolucion: '',
      });
      alert('Préstamo guardado con éxito');
    } catch (error) {
      console.error('Error al guardar el préstamo:', error);
      alert('Error al guardar el préstamo');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Nuevo Préstamo</h1>

      {/* Botón para abrir el modal */}
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Crear Nuevo Préstamo
      </Button>

      {/* Modal para guardar un nuevo préstamo */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Préstamo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFechaPrestamo">
              <Form.Label>Fecha de Préstamo</Form.Label>
              <Form.Control
                type="date"
                name="fechaPrestamo"
                value={nuevoPrestamo.fechaPrestamo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formFechaDevolucion">
              <Form.Label>Fecha de Devolución</Form.Label>
              <Form.Control
                type="date"
                name="fechaDevolucion"
                value={nuevoPrestamo.fechaDevolucion}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSavePrestamo}>
            Guardar Préstamo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PrestamoUser;
