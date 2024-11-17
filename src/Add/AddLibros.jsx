import React, { useState } from 'react';
import axios from 'axios';

const AddLibros = () => {
  // Estados para manejar los valores del formulario
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idCategoria, setIdCategoria] = useState(1);  // Valor predeterminado para id_categoria
  const [isbn, setIsbn] = useState('');
  const [editorial, setEditorial] = useState('');
  const [fechaPublicacion, setFechaPublicacion] = useState('');
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [cantidadDisponible, setCantidadDisponible] = useState(0);

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Crear el objeto JSON para enviar al backend
    const libro = {
      titulo: titulo,
      autor: autor,
      categoria: {
        id_categoria: idCategoria,
      },
      isbn: isbn,
      editorial: editorial,
      fecha_publicacion: fechaPublicacion,
      cantidad_total: cantidadTotal,
      cantidad_disponible: cantidadDisponible,
    };

    try {
      // Enviar el JSON al backend utilizando Axios
      const response = await axios.post('http://localhost:8080/api/v1/libros', libro);
      console.log('Libro agregado:', response.data);
    } catch (error) {
      console.error('Error al agregar el libro:', error);
    }
  };

  return (
    <div>
      <h1>Agregar Libro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Autor:</label>
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ID Categoría:</label>
          <input
            type="number"
            value={idCategoria}
            onChange={(e) => setIdCategoria(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ISBN:</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Editorial:</label>
          <input
            type="text"
            value={editorial}
            onChange={(e) => setEditorial(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de Publicación:</label>
          <input
            type="date"
            value={fechaPublicacion}
            onChange={(e) => setFechaPublicacion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad Total:</label>
          <input
            type="number"
            value={cantidadTotal}
            onChange={(e) => setCantidadTotal(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad Disponible:</label>
          <input
            type="number"
            value={cantidadDisponible}
            onChange={(e) => setCantidadDisponible(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Libro</button>
      </form>
    </div>
  );
};

export default AddLibros;
