import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Usamos useLocation y useNavigate
import axios from 'axios';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';

const ReservasUser = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Inicializamos el hook de navegación

  const [idUsuario, setIdUsuario] = useState(''); // Inicializamos el estado del idUsuario
  const [idLibro, setIdLibro] = useState(location.state?.libroId || ''); // Recuperamos el libroId del state si existe
  const [fechaReserva, setFechaReserva] = useState('');
  const [idEstado, setIdEstado] = useState(2); // Establecemos el estado por defecto a 2

  useEffect(() => {
    // Recuperamos el idUsuario desde localStorage al cargar el componente
    const storedIdUsuario = localStorage.getItem('idUser');
    if (storedIdUsuario) {
      setIdUsuario(storedIdUsuario); // Establecemos el idUsuario
    }

    // Establecer la fecha actual por defecto
    const fechaActual = new Date();
    const fechaActualISO = fechaActual.toISOString().slice(0, 16); // Formateamos la fecha al formato ISO
    setFechaReserva(fechaActualISO); // Establecemos la fecha de reserva
  }, [location.state]); // Dependencia de location.state para que se recargue cuando cambie el libroId

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reserva = {
      usuario: { id_usuario: idUsuario },
      libro: { id_libro: idLibro },
      fecha_reserva: fechaReserva,
      estado: { id_estado: idEstado },
    };

    console.log('Datos enviados:', reserva);

    try {
      const response = await axios.post('http://localhost:8080/api/reservas', reserva);
      if (response.status === 201) {
        alert('Reserva creada exitosamente');
        navigate(-1); // Regresar a la página anterior (simula un "Volver atrás")
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
                    type="text"
                    value={idUsuario}
                    readOnly  // Campo solo lectura
                  />
                </Form.Group>

                <Form.Group controlId="formIdLibro">
                  <Form.Label>ID de Libro</Form.Label>
                  <Form.Control
                    type="number"
                    value={idLibro}
                    readOnly  // Campo solo lectura, ya que el idLibro se pasa desde location.state
                  />
                </Form.Group>

                <Form.Group controlId="formFechaReserva">
                  <Form.Label>Fecha de Reserva</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={fechaReserva}
                    onChange={(e) => setFechaReserva(e.target.value)}
                    required
                    disabled  // Deshabilitar para que no pueda modificarse
                  />
                </Form.Group>

                <Form.Group controlId="formIdEstado">
                  <Form.Label>ID de Estado</Form.Label>
                  <Form.Control
                    type="number"
                    value={idEstado}
                    readOnly  // Campo solo lectura para que no pueda modificarse
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

export default ReservasUser;
