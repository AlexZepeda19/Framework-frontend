import React, { useEffect, useState } from 'react';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Simulamos una llamada a la API (ajustar con la URL de tu API)
    const fetchCategorias = async () => {
      const response = await fetch('http://localhost:8080/api/v1/categoria'); // Reemplaza con la URL correcta de la API
      const data = await response.json();
      setCategorias(data);
    };

    fetchCategorias();
  }, []);

  return (
    <div>
      <h1>Listado de Categorías</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id_categoria}>
              <td>{categoria.id_categoria}</td>
              <td>{categoria.nombre}</td>
              <td>{categoria.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categorias;
