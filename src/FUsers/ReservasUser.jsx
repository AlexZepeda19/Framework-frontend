import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';

const ReservaUser = () => {
  const location = useLocation();
  const [idUsuario, setIdUsuario] = useState('');
  const [idLibro, setIdLibro] = useState(location.state?.libroId || '');
  const [fechaReserva, setFechaReserva] = useState('');
  const [idEstado, setIdEstado] = useState('');

  useEffect(() => {
    if (location.state?.libroId) {
      setIdLibro(location.state.libroId);
    }

    // Establecer la fecha actual por defecto
    const fechaActual = new Date();
    const fechaActualISO = fechaActual.toISOString().slice(0, 16);
    setFechaReserva(fechaActualISO);
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reserva = {
      usuario: { id_usuario: idUsuario },
      libro: { id_libro: idLibro },
      fecha_reserva: fechaReserva,
      estado: { id_estado: idEstado }
    };

    console.log('Datos enviados:', reserva);

    try {
      const response = await axios.post('http://localhost:8080/api/reservas', reserva);
      if (response.status === 201) {
        alert('Reserva creada exitosamente');
      } else {
        console.error('Error en la respuesta:', response);
        alert('Hubo un error al crear la reserva');
      }
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      alert('Hubo un error al crear la reserva');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">DETALLES DE SU RESERVA</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formIdUsuario">
                  <Form.Label>ID de Usuario</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese ID del Usuario"
                    value={idUsuario}
                    onChange={(e) => setIdUsuario(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formIdLibro">
                  <Form.Label>ID de Libro</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="ID del Libro"
                    value={idLibro}
                    onChange={(e) => setIdLibro(e.target.value)}
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="formFechaReserva">
                  <Form.Label>Fecha de Reserva</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={fechaReserva}
                    onChange={(e) => setFechaReserva(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formIdEstado">
                  <Form.Label>ID de Estado</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="ID de Estado"
                    value={idEstado}
                    onChange={(e) => setIdEstado(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit" className="mt-3">
                    Agregar Reserva
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

export default ReservaUser;
