import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FaBook } from 'react-icons/fa'; 
import { Form } from 'react-bootstrap';

const LibrosUserBibliotec = () => {
  const [libros, setLibros] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [librosPorPagina, setLibrosPorPagina] = useState(8); // Mostrar 8 libros por página
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLibros, setFilteredLibros] = useState([]);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/libros');
        setLibros(response.data);
        setFilteredLibros(response.data); // Inicialmente mostramos todos los libros
      } catch (error) {
        console.error('Error al obtener los libros:', error);
      }
    };

    fetchLibros();
  }, []);

  // Función para manejar el cambio de página
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * librosPorPagina;
  const currentLibros = filteredLibros.slice(offset, offset + librosPorPagina);

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filtrar libros en tiempo real a medida que se escribe
    const filtered = libros.filter(libro =>
      libro.titulo.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLibros(filtered);
    setCurrentPage(0); // Restablecer la página a la primera cuando se hace una búsqueda
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Listado de Libros</h1>

      {/* Campo de búsqueda */}
      <div className="mb-4 d-flex justify-content-center">
        <Form.Control
          type="text"
          placeholder="Buscar por título"
          value={searchQuery}
          onChange={handleSearchChange}
          className="me-2"
        />
      </div>

      {/* Cards de libros */}
      <Row xs={1} sm={2} md={4} lg={4} className="g-4">
        {currentLibros.map((libro) => (
          <Col key={libro.id_libro}>
            <Card className="h-100"> {/* h-100 asegura que las cards tengan el mismo tamaño */}
              <Card.Body>
                <div className="text-center mb-3">
                  <FaBook size={80} color="#007bff" />
                </div>
                <Card.Title>{libro.titulo}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{libro.autor}</Card.Subtitle>
                <Card.Text>
                  <strong>Categoría:</strong> {libro.categoria.nombre} <br />
                  <strong>Descripción de Categoría:</strong> {libro.categoria.descripcion} <br />
                  <strong>ISBN:</strong> {libro.isbn} <br />
                  <strong>Editorial:</strong> {libro.editorial} <br />
                  <strong>Fecha de Publicación:</strong> {new Date(libro.fecha_publicacion).toLocaleDateString()} <br />
                  <strong>Cantidad Total:</strong> {libro.cantidad_total} <br />
                  <strong>Cantidad Disponible:</strong> {libro.cantidad_disponible} <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Paginación */}
      <div className="d-flex justify-content-center mt-4">
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          breakLabel={'...'}
          pageCount={Math.ceil(filteredLibros.length / librosPorPagina)}
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

export default LibrosUserBibliotec;
