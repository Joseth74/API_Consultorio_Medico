import { config } from '../config.js';

/**
 * Carga la lista de citas
 */
const listarTodaslasCitasQuery = async () => {
    try {
        const result = await config.query('SELECT * FROM citas');
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

/**
 * Buscar un libro por su ID (llave primaria)
 */
const listarCitaPorIdQuery = async (id) => {
    try {
        const result = await config.query('SELECT * FROM citas WHERE id = $1 LIMIT 1', [id]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

/**
 * Guardar un nuevo libro
 */
const crearCitaQuery = async (cita) => {
    const { nombre, copias, estante } = cita;
    try {
        const result = await config.query(
            'INSERT INTO citas (paciente_id, medico_id, fecha_hora, estado) VALUES ($1, $2, $3, $4) RETURNING *',
            [paciente_id, medico_id, fecha_hora, estado]
        );
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

/**
 * Actualizar un libro por su ID
 */
const actualizarCitaQuery = async (id, cita) => {
    const { nombre, copias, estante } = cita;
    try {
        const result = await config.query(
            'UPDATE citas SET paciente_id = $1, medico_id = $2, fecha_hora = $3, estado = $4 WHERE id = $5 RETURNING *',
            [paciente_id, medico_id, fecha_hora, estado, id]
        );
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

/**
 * Eliminar un libro por su ID
 */
const eliminarCitaQuery = async (id) => {
    try {
        const result = await config.query(
            'DELETE FROM citas WHERE id = $1 RETURNING *',
            [id]
        );
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Exportar todas las funciones definidas en este archivo
export {
    listarTodaslasCitasQuery,
    listarCitaPorIdQuery,
    crearCitaQuery,
    actualizarCitaQuery,
    eliminarCitaQuery   
}