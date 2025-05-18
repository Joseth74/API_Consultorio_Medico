import { config } from '../config.js';

/**
 * Carga la lista de todos los médicos
 */
const listarTodosLosMedicosQuery = async () => {
    try {
        const result = await config.query('SELECT * FROM medicos');
        return result.rows;
    } catch (err) {
        console.error('Error al listar todos los médicos:', err);
        throw err;
    }
};

/**
 * Busca un médico por su ID
 */
const listarMedicoPorIdQuery = async (id) => {
    try {
        const result = await config.query('SELECT * FROM medicos WHERE id = $1 LIMIT 1', [id]);
        return result.rows[0];
    } catch (err) {
        console.error(`Error al buscar médico con ID ${id}:`, err);
        throw err;
    }
};

/**
 * Guarda un nuevo médico
 */
const crearMedicoQuery = async (medico) => {
    const { nombre, apellido, especialidad, correo, telefono } = medico;
    try {
        const result = await config.query(
            'INSERT INTO medicos (nombre, apellido, especialidad, correo, telefono) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, apellido, especialidad, correo, telefono]
        );
        return result;
    } catch (err) {
        console.error('Error al crear un nuevo médico:', err);
        throw err;
    }
};

/**
 * Actualiza los datos de un médico por su ID
 */
const actualizarMedicoQuery = async (id, medico) => {
    const { nombre, apellido, especialidad, correo, telefono } = medico;
    try {
        const result = await config.query(
            'UPDATE medicos SET nombre = $1, apellido = $2, especialidad = $3, correo = $4, telefono = $5 WHERE id = $6 RETURNING *',
            [nombre, apellido, especialidad, correo, telefono, id]
        );
        return result;
    } catch (err) {
        console.error(`Error al actualizar el médico con ID ${id}:`, err);
        throw err;
    }
};

/**
 * Elimina un médico por su ID
 */
const eliminarMedicoQuery = async (id) => {
    try {
        const result = await config.query('DELETE FROM medicos WHERE id = $1 RETURNING *', [id]);
        return result;
    } catch (err) {
        console.error(`Error al eliminar el médico con ID ${id}:`, err);
        throw err;
    }
};

// Exportar todas las funciones de consulta para médicos
export {
    listarTodosLosMedicosQuery,
    listarMedicoPorIdQuery,
    crearMedicoQuery,
    actualizarMedicoQuery,
    eliminarMedicoQuery
};