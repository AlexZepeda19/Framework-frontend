import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';  
import axios from 'axios';

const ReservaUser = () => {
    const location = useLocation(); 
    const [idUsuario, setIdUsuario] = useState('');
    const [idLibro, setIdLibro] = useState(location.state?.libroId || ''); 
    const [fechaReserva, setFechaReserva] = useState('');
    const [idEstado, setIdEstado] = useState('');

    useEffect(() => {
        if (location.state?.libroId) {
            setIdLibro(location.state.libroId);  // Establece idLibro con el valor pasado en el state
        }

        // Establecer la fecha actual por defecto
        const fechaActual = new Date();
        const fechaActualISO = fechaActual.toISOString().slice(0, 16);
        setFechaReserva(fechaActualISO);
    }, [location.state]);

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
            const response = await axios.post('http://localhost:8080/api/v1/reservas', reserva); // Asegúrate de usar la URL correcta
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
                        value={idLibro} // Aquí es donde mostramos el idLibro que recibimos
                        onChange={(e) => setIdLibro(e.target.value)}
                        disabled  // Deshabilitamos el campo ya que el idLibro viene del estado
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
};

export default ReservaUser;
