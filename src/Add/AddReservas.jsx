import React, { useState } from 'react';
import axios from 'axios';

const AddReserva = () => {
    const [idUsuario, setIdUsuario] = useState('');
    const [idLibro, setIdLibro] = useState('');
    const [fechaReserva, setFechaReserva] = useState('');
    const [idEstado, setIdEstado] = useState('');

    // Maneja el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Crea el objeto de la reserva
        const reserva = {
            usuario: { id_usuario: idUsuario },
            libro: { id_libro: idLibro },
            fecha_reserva: fechaReserva,
            estado: { id_estado: idEstado }
        };

        try {
            // Realiza la solicitud POST para agregar la reserva
            const response = await axios.post('http://tudominio.com/api/reservas', reserva);
            if (response.status === 201) {
                alert('Reserva creada exitosamente');
            }
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            alert('Hubo un error al crear la reserva');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Agregar Reserva</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="idUsuario">ID de Usuario:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="idUsuario"
                        value={idUsuario}
                        onChange={(e) => setIdUsuario(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="idLibro">ID de Libro:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="idLibro"
                        value={idLibro}
                        onChange={(e) => setIdLibro(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fechaReserva">Fecha de Reserva:</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="fechaReserva"
                        value={fechaReserva}
                        onChange={(e) => setFechaReserva(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="idEstado">ID de Estado:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="idEstado"
                        value={idEstado}
                        onChange={(e) => setIdEstado(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">Agregar Reserva</button>
            </form>
        </div>
    );
}

export default AddReserva;
