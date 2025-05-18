import { config } from '../config.js';

/**
 * Carga la lista de citas
 */
const listarTodosCitasQuery = async () => {
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
const crearCitaQuery = async (libro) => {
    const { nombre, copias, estante } = libro;
    try {
        const result = await config.query(
            'INSERT INTO citas (nombre, copias, estante) VALUES ($1, $2, $3) RETURNING *',
            [nombre, copias, estante]
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
const actualizarCitaQuery = async (id, libro) => {
    const { nombre, copias, estante } = libro;
    try {
        const result = await config.query(
            'UPDATE citas SET nombre = $1, copias = $2, estante = $3 WHERE id = $4 RETURNING *',
            [nombre, copias, estante, id]
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
    listarTodosCitasQuery,
    listarCitaPorIdQuery,
    crearCitaQuery,
    actualizarCitaQuery,
    eliminarCitaQuery   
}