import React, { useState } from 'react';
import axios from 'axios';

const AddCategoria = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    // Maneja el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Crea el objeto de la nueva categoría
        const categoria = {
            nombre: nombre,
            descripcion: descripcion
        };

        try {
            // Realiza la solicitud POST para agregar la categoría
            const response = await axios.post('http://localhost:8080/api/v1/categoria', categoria);
            if (response.status === 201) {
                alert('Categoría creada exitosamente');
            }
        } catch (error) {
            console.error('Error al crear la categoría:', error);
            alert('Hubo un error al crear la categoría');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Agregar Categoría</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre de la Categoría:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descripcion">Descripción de la Categoría:</label>
                    <textarea
                        className="form-control"
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">Agregar Categoría</button>
            </form>
        </div>
    );
}

export default AddCategoria;
