import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CategoriasUser = () => {
  const [categorias, setCategorias] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [categoriasPorPagina, setCategoriasPorPagina] = useState(5); 
  const [libros, setLibros] = useState([]); // Estado para los libros filtrados por categoría

  useEffect(() => {
    // Obtener las categorías desde la API
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/categoria');
        const data = await response.json();
        setCategorias(data); // Establecer las categorías en el estado
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
  }, []); 

  const handlePageClick = (event) => {
    setCurrentPage(event.selected); 
  };

  // Función para mostrar los libros por categoría
  const mostrarLibrosPorCategoria = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/libros`);
      const data = await response.json();
      const librosFiltrados = data.filter(libro => libro.categoria.id_categoria === id);
      setLibros(librosFiltrados); // Establecer los libros filtrados en el estado
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  };

  // Obtener las categorías para la página actual
  const offset = currentPage * categoriasPorPagina;
  const currentCategorias = categorias.slice(offset, offset + categoriasPorPagina);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Listado de Categorías</h1>

      {/* Tarjetas de categorías */}
      <div className="row">
        {currentCategorias.length > 0 ? (
          currentCategorias.map((categoria) => (
            <div className="col-md-4 mb-4" key={categoria.id_categoria}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-center mb-3">
                    <FontAwesomeIcon icon={faBook} size="3x" />
                  </div>
                  <Card.Title>{categoria.nombre}</Card.Title>
                  <Card.Text>{categoria.descripcion}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="success" onClick={() => mostrarLibrosPorCategoria(categoria.id_categoria)}>Mostrar todos</Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No hay categorías disponibles</p>
          </div>
        )}
      </div>

      {/* Paginación */}
      <div className="d-flex justify-content-center mt-4">
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          breakLabel={'...'}
          pageCount={Math.ceil(categorias.length / categoriasPorPagina)} // Número total de páginas
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick} // Manejar el cambio de página
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

      {/* Mostrar libros filtrados por categoría */}
      <div className="row mt-5">
        {libros.length > 0 ? (
          libros.map((libro) => (
            <div className="col-md-4 mb-4" key={libro.id_libro}>
              <Card>
                <Card.Body>
                  <Card.Title>{libro.titulo}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{libro.autor}</Card.Subtitle>
                  <Card.Text><strong>Categoría:</strong> {libro.categoria.nombre}</Card.Text>
                  <Card.Text><strong>ISBN:</strong> {libro.isbn}</Card.Text>
                  <Card.Text><strong>Editorial:</strong> {libro.editorial}</Card.Text>
                  <Card.Text><strong>Fecha de Publicación:</strong> {new Date(libro.fecha_publicacion).toLocaleDateString()}</Card.Text>
                  <Card.Text><strong>Cantidad Total:</strong> {libro.cantidad_total}</Card.Text>
                  <Card.Text><strong>Cantidad Disponible:</strong> {libro.cantidad_disponible}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No hay libros disponibles en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriasUser;
