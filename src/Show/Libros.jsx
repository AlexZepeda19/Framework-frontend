import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const Libros = () => {
  const [libros, setLibros] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [librosPorPagina, setLibrosPorPagina] = useState(5); // Número de libros por página

  useEffect(() => {
    // Obtener los libros desde la API
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

  // Función para manejar el cambio de página
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Obtener los libros para la página actual
  const offset = currentPage * librosPorPagina;
  const currentLibros = libros.slice(offset, offset + librosPorPagina);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Listado de Libros</h1>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoría</th>
              <th>ISBN</th>
              <th>Editorial</th>
              <th>Fecha de Publicación</th>
              <th>Cantidad Total</th>
              <th>Cantidad Disponible</th>
            </tr>
          </thead>
          <tbody>
            {currentLibros.map((libro) => (
              <tr key={libro.id_libro}>
                <td>{libro.id_libro}</td>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>{libro.categoria.nombre}</td>
                <td>{libro.isbn}</td>
                <td>{libro.editorial}</td>
                <td>{libro.fecha_publicacion}</td>
                <td>{libro.cantidad_total}</td>
                <td>{libro.cantidad_disponible}</td>
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

export default Libros;
