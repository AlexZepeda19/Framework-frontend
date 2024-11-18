import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Importamos useNavigate
import axios from 'axios';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';

const PrestamosUser = () => {
  const location = useLocation(); // Usamos useLocation para acceder a la ubicación y el estado
  const navigate = useNavigate(); // Inicializamos el hook de navegación

  const [idUsuario, setIdUsuario] = useState('');  // Inicializamos con un valor vacío
  const [idLibro, setIdLibro] = useState(location.state?.libroId || '');  // Recuperamos el libroId del state (si existe)
  const [fechaPrestamo, setFechaPrestamo] = useState('');
  const [fechaDevolucion, setFechaDevolucion] = useState('');

  // Recuperar el idUsuario desde localStorage
  useEffect(() => {
    const storedIdUsuario = localStorage.getItem('idUser');
    if (storedIdUsuario) {
      setIdUsuario(storedIdUsuario);
    }

    // Asegurarse de que el libroId se recupere del state al cargar el formulario
    if (location.state?.libroId) {
      setIdLibro(location.state.libroId);  // Establecer el ID del libro si se pasó en el estado
    }

    // Establecer la fecha de préstamo a la fecha actual y la fecha de devolución a 8 días después
    const fechaActual = new Date();
    const fechaActualISO = fechaActual.toISOString().slice(0, 16);
    const fechaDevolucion = new Date(fechaActual);
    fechaDevolucion.setDate(fechaDevolucion.getDate() + 8);
    const fechaDevolucionISO = fechaDevolucion.toISOString().slice(0, 16);

    setFechaPrestamo(fechaActualISO);
    setFechaDevolucion(fechaDevolucionISO);
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prestamo = {
      usuario: { id_usuario: idUsuario },
      libro: { id_libro: idLibro },
      fechaPrestamo: fechaPrestamo,
      fechaDevolucion: fechaDevolucion,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/prestamos', prestamo);
      if (response.status === 201) {
        alert('Préstamo agregado exitosamente');
        navigate(-1); // Regresar a la página anterior (simula un "Volver atrás")
      } else {
        console.error('Error al agregar el préstamo:', response);
        alert('Hubo un error al agregar el préstamo');
      }
    } catch (error) {
      console.error('Error al agregar el préstamo:', error);
      alert('Hubo un error al agregar el préstamo');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">DETALLES DE SU PRESTAMO</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formIdUsuario">
                  <Form.Label>ID Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ID del Usuario"
                    value={idUsuario}
                    readOnly  // Hacemos el campo solo lectura para que no se pueda modificar
                  />
                </Form.Group>

                <Form.Group controlId="formIdLibro">
                  <Form.Label>ID Libro</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="ID del Libro"
                    value={idLibro}
                    disabled  // Desactivamos el campo ya que el ID del libro se pasa desde el estado
                  />
                </Form.Group>

                <Form.Group controlId="formFechaPrestamo">
                  <Form.Label>Fecha de Préstamo</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={fechaPrestamo}
                    readOnly  // Hacemos el campo solo lectura para que no se pueda modificar
                  />
                </Form.Group>

                <Form.Group controlId="formFechaDevolucion">
                  <Form.Label>Fecha de Devolución</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={fechaDevolucion}
                    readOnly  // Hacemos el campo solo lectura para que no se pueda modificar
                  />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit" className="mt-3">
                    Agregar Préstamo
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PrestamosUser;
