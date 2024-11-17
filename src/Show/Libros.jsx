import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Libros = () => {
  const [libros, setLibros] = useState([]);

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

  return (
    <div>
      <h1>Los libros se listarán aquí</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
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
          {libros.map((libro) => (
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
  );
};

export default Libros;
