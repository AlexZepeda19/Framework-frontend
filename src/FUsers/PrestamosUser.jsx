import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Importamos useLocation
import axios from 'axios';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap'; // Importamos los componentes de Bootstrap

const PrestamosUser = () => {
  const location = useLocation(); // Usamos useLocation para acceder a la ubicación y el state

  // Recuperamos el libroId del estado pasado
  const [idUsuario, setIdUsuario] = useState('');  // Inicializamos con un valor vacío
  const [idLibro, setIdLibro] = useState(location.state?.libroId || '');  // Recuperamos el libroId del state (si existe)
  const [fechaPrestamo, setFechaPrestamo] = useState('');
  const [fechaDevolucion, setFechaDevolucion] = useState('');

  // Asegurarse de que el libroId se recupere del state al cargar el formulario
  useEffect(() => {
    if (location.state?.libroId) {
      setIdLibro(location.state.libroId);  // Establecer el ID del libro si se pasó en el estado
    }
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
      console.log('Préstamo agregado:', response.data);
    } catch (error) {
      console.error('Error al agregar el préstamo:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Agregar Nuevo Préstamo</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formIdUsuario">
                  <Form.Label>ID Usuario</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese ID del Usuario"
                    value={idUsuario}
                    onChange={(e) => setIdUsuario(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formIdLibro">
                  <Form.Label>ID Libro</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="ID del Libro"
                    value={idLibro}
                    onChange={(e) => setIdLibro(e.target.value)}
                    disabled  // Desactivamos el campo ya que el ID del libro se pasa desde el estado
                  />
                </Form.Group>

                <Form.Group controlId="formFechaPrestamo">
                  <Form.Label>Fecha de Préstamo</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={fechaPrestamo}
                    onChange={(e) => setFechaPrestamo(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formFechaDevolucion">
                  <Form.Label>Fecha de Devolución</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={fechaDevolucion}
                    onChange={(e) => setFechaDevolucion(e.target.value)}
                    required
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
