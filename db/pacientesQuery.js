import { config } from '../config.js';

/**
 * Carga la lista de todos los pacientes
 */
const listarTodosLosPacientesQuery = async () => {
    try {
        const result = await config.query('SELECT * FROM pacientes');
        return result.rows;
    } catch (err) {
        console.error('Error al listar todos los pacientes:', err);
        throw err;
    }
};

/**
 * Busca un paciente por su ID (llave primaria)
 */
const listarPacientePorIdQuery = async (id) => {
    try {
        const result = await config.query('SELECT * FROM pacientes WHERE id = $1 LIMIT 1', [id]);
        return result.rows[0]; // Devolvemos solo el primer resultado (si existe)
    } catch (err) {
        console.error(`Error al buscar paciente con ID ${id}:`, err);
        throw err;
    }
};

/**
 * Guarda un nuevo paciente
 */
const crearPacienteQuery = async (paciente) => {
    const { nombre, apellido, fecha_nacimiento, sexo, correo, telefono, direccion } = paciente;
    try {
        const result = await config.query(
            'INSERT INTO pacientes (nombre, apellido, fecha_nacimiento, sexo, correo, telefono, direccion) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nombre, apellido, fecha_nacimiento, sexo, correo, telefono, direccion]
        );
        return result;
    } catch (err) {
        console.error('Error al crear un nuevo paciente:', err);
        throw err;
    }
};

/**
 * Actualiza los datos de un paciente por su ID
 */
const actualizarPacienteQuery = async (id, paciente) => {
    const { nombre, apellido, fecha_nacimiento, sexo, correo, telefono, direccion } = paciente;
    try {
        const result = await config.query(
            'UPDATE pacientes SET nombre = $1, apellido = $2, fecha_nacimiento = $3, sexo = $4, correo = $5, telefono = $6, direccion = $7 WHERE id = $8 RETURNING *',
            [nombre, apellido, fecha_nacimiento, sexo, correo, telefono, direccion, id]
        );
        return result;
    } catch (err) {
        console.error(`Error al actualizar el paciente con ID ${id}:`, err);
        throw err;
    }
};

/**
 * Elimina un paciente por su ID
 */
const eliminarPacienteQuery = async (id) => {
    try {
        const result = await config.query('DELETE FROM pacientes WHERE id = $1 RETURNING *', [id]);
        return result;
    } catch (err) {
        console.error(`Error al eliminar el paciente con ID ${id}:`, err);
        throw err;
    }
};

// Exportar todas las funciones de consulta para pacientes
export {
    listarTodosLosPacientesQuery,
    listarPacientePorIdQuery,
    crearPacienteQuery,
    actualizarPacienteQuery,
    eliminarPacienteQuery
};