import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [categoriasPorPagina, setCategoriasPorPagina] = useState(5); // Número de categorías por página
  const [categoriaEditada, setCategoriaEditada] = useState(null); // Estado para la categoría que se va a editar
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');

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
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Función para manejar el cambio de página
  const handlePageClick = (event) => {
    setCurrentPage(event.selected); // Actualiza la página actual
  };

  // Función para eliminar una categoría por su ID
  const eliminarCategoria = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/categoria/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCategorias(categorias.filter(categoria => categoria.id_categoria !== id));
      } else {
        console.error('Error al eliminar la categoría');
      }
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
    }
  };

  // Función para manejar la edición de una categoría
  const editarCategoria = (categoria) => {
    setCategoriaEditada(categoria); // Establece la categoría seleccionada para editar
    setNuevoNombre(categoria.nombre); // Establece el nombre actual para editarlo
    setNuevaDescripcion(categoria.descripcion); // Establece la descripción actual para editarla
  };

  // Función para guardar los cambios de la categoría editada
  const guardarCategoriaEditada = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/categoria/${categoriaEditada.id_categoria}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nuevoNombre,
          descripcion: nuevaDescripcion,
        }),
      });

      if (response.ok) {
        // Si la actualización es exitosa, actualiza la lista de categorías
        setCategorias(categorias.map((categoria) => 
          categoria.id_categoria === categoriaEditada.id_categoria 
            ? { ...categoria, nombre: nuevoNombre, descripcion: nuevaDescripcion }
            : categoria
        ));
        setCategoriaEditada(null); // Cierra el modal de edición
      } else {
        console.error('Error al actualizar la categoría');
      }
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
    }
  };

  // Obtener las categorías para la página actual
  const offset = currentPage * categoriasPorPagina;
  const currentCategorias = categorias.slice(offset, offset + categoriasPorPagina);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Listado de Categorías</h1>

      {/* Tabla de categorías */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th> {/* Columna para los botones de acción */}
            </tr>
          </thead>
          <tbody>
            {currentCategorias.length > 0 ? (
              currentCategorias.map((categoria) => (
                <tr key={categoria.id_categoria}>
                  <td>{categoria.id_categoria}</td>
                  <td>{categoria.nombre}</td>
                  <td>{categoria.descripcion}</td>
                  <td>
                    {/* Botón de eliminar */}
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarCategoria(categoria.id_categoria)}
                    >
                      Eliminar
                    </button>
                    {/* Botón de actualizar */}
                    <button
                      className="btn btn-warning ml-2"
                      onClick={() => editarCategoria(categoria)}
                    >
                      Actualizar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No hay categorías disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="d-flex justify-content-center">
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

      {/* Modal para editar la categoría */}
      {categoriaEditada && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Actualizar Categoría</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setCategoriaEditada(null)} // Cerrar el modal
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => { e.preventDefault(); guardarCategoriaEditada(); }}>
                  <div className="form-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nuevoNombre}
                      onChange={(e) => setNuevoNombre(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Descripción</label>
                    <textarea
                      className="form-control"
                      value={nuevaDescripcion}
                      onChange={(e) => setNuevaDescripcion(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success mt-3">Guardar Cambios</button>
                  <button
                    type="button"
                    className="btn btn-secondary mt-3 ml-2"
                    onClick={() => setCategoriaEditada(null)} // Cerrar el modal
                  >
                    Cancelar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default Categorias;
