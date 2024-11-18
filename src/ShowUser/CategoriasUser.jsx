import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaBook } from 'react-icons/fa'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

const CategoriasUserBibliotec = () => {
  const [categorias, setCategorias] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [categoriasPorPagina, setCategoriasPorPagina] = useState(9); // Cambiar a 9 para mostrar 9 elementos por página (3 filas de 3)
  const [libros, setLibros] = useState([]); // Estado para los libros filtrados por categoría
  const [totalItems, setTotalItems] = useState(0); // Para total de elementos de libros
  const navigate = useNavigate();

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

  // Manejar el cambio de página
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
      setTotalItems(librosFiltrados.length); // Establecer el total de libros
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  };

  // Obtener las categorías para la página actual
  const offset = currentPage * categoriasPorPagina;
  const currentCategorias = categorias.slice(offset, offset + categoriasPorPagina);

  // Manejar préstamos y reservas desde esta vista
  const handlePrestar = (id) => { 
    navigate('/FUsers/PrestamosUser', { state: { libroId: id } });
  };

  const handleReservar = (id) => { 
    navigate('/FUsers/ReservasUser', { state: { libroId: id } }); 
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Listado de Categorías</h1>

      {/* Tarjetas de categorías */}
      <div className="row">
        {currentCategorias.length > 0 ? (
          currentCategorias.map((categoria) => (
            <div className="col-md-4 mb-4" key={categoria.id_categoria}> {/* Cambié a col-md-4 para 3 por fila */}
              <Card className="card-item">
                <Card.Body>
                  <div className="text-center mb-3">
                    <FaBook size={80} color="#007bff" />
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

      {/* Paginación para las categorías */}
      <div className="d-flex justify-content-center mt-4">
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          breakLabel={'...'}
          pageCount={Math.ceil(categorias.length / categoriasPorPagina)} // Número total de páginas para las categorías
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
            <div className="col-md-4 mb-4" key={libro.id_libro}> {/* Cambié a col-md-4 para 3 por fila */}
              <Card className="card-item">
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
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No hay libros disponibles en esta categoría</p>
          </div>
        )}
      </div>

      {/* Paginación para los libros */}
      <div className="d-flex justify-content-center mt-4">
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          breakLabel={'...'}
          pageCount={Math.ceil(totalItems / categoriasPorPagina)} // Número total de páginas para los libros filtrados
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

export default CategoriasUserBibliotec;
