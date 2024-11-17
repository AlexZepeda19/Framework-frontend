import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FaBook } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const LibrosUser = () => {
  const [libros, setLibros] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [librosPorPagina, setLibrosPorPagina] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * librosPorPagina;
  const currentLibros = libros.slice(offset, offset + librosPorPagina);

  const handlePrestar = (id) => { 
    navigate('/FUsers/PrestamosUser', { state: { libroId: id } });
  };

  const handleReservar = (id) => { 
    navigate('/FUsers/ReservasUser', { state: { libroId: id } }); 
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Listado de Libros</h1>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {currentLibros.map((libro) => (
          <Col key={libro.id_libro}>
            <Card>
              <Card.Body>
                <div className="text-center mb-3">
                  <FaBook size={80} color="#007bff" />
                </div>
                <Card.Title>{libro.titulo}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{libro.autor}</Card.Subtitle>
                <Card.Text>
                  <strong>Categoría:</strong> {libro.categoria.nombre} <br />
                  <strong>ISBN:</strong> {libro.isbn} <br />
                  <strong>Editorial:</strong> {libro.editorial} <br />
                  <strong>Fecha de Publicación:</strong> {new Date(libro.fecha_publicacion).toLocaleDateString()} <br />
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="success" onClick={() => handlePrestar(libro.id_libro)}>
                    Prestar
                  </Button>
                  <Button variant="warning" onClick={() => handleReservar(libro.id_libro)}>
                    Reservar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center mt-4">
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
    </div>
  );
};

export default LibrosUser;
