import { config } from '../config.js';

/**
 * Carga la lista de todas las consultas
 */
const listarTodasLasConsultasQuery = async () => {
    try {
        const result = await config.query('SELECT * FROM consultas');
        return result.rows;
    } catch (err) {
        console.error('Error al listar todas las consultas:', err);
        throw err;
    }
};

/**
 * Busca una consulta por su ID
 */
const listarConsultaPorIdQuery = async (id) => {
    try {
        const result = await config.query('SELECT * FROM consultas WHERE id = $1 LIMIT 1', [id]);
        return result.rows[0];
    } catch (err) {
        console.error(`Error al buscar consulta con ID ${id}:`, err);
        throw err;
    }
};

/**
 * Guarda una nueva consulta médica
 */
const crearConsultaQuery = async (consulta) => {
    const { cita_id, sintomas, diagnostico, tratamiento, notas } = consulta;
    try {
        const result = await config.query(
            'INSERT INTO consultas (cita_id, sintomas, diagnostico, tratamiento, notas) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [cita_id, sintomas, diagnostico, tratamiento, notas]
        );
        return result;
    } catch (err) {
        console.error('Error al crear una nueva consulta médica:', err);
        throw err;
    }
};

/**
 * Actualiza los datos de una consulta médica por su ID
 */
const actualizarConsultaQuery = async (id, consulta) => {
    const { cita_id, sintomas, diagnostico, tratamiento, notas } = consulta;
    try {
        const result = await config.query(
            'UPDATE consultas SET cita_id = $1, sintomas = $2, diagnostico = $3, tratamiento = $4, notas = $5 WHERE id = $6 RETURNING *',
            [cita_id, sintomas, diagnostico, tratamiento, notas, id]
        );
        return result;
    } catch (err) {
        console.error(`Error al actualizar la consulta con ID ${id}:`, err);
        throw err;
    }
};

/**
 * Elimina una consulta médica por su ID
 */
const eliminarConsultaQuery = async (id) => {
    try {
        const result = await config.query('DELETE FROM consultas WHERE id = $1 RETURNING *', [id]);
        return result;
    } catch (err) {
        console.error(`Error al eliminar la consulta con ID ${id}:`, err);
        throw err;
    }
};

// Exportar todas las funciones de consulta para consultas médicas
export {
    listarTodasLasConsultasQuery,
    listarConsultaPorIdQuery,
    crearConsultaQuery,
    actualizarConsultaQuery,
    eliminarConsultaQuery
};