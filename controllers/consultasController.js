import {
    listarTodasLasConsultasQuery,
    listarConsultaPorIdQuery,
    crearConsultaQuery,
    actualizarConsultaQuery,
    eliminarConsultaQuery
} from '../db/consultasQuery.js';

/**
 * Obtener todas las consultas médicas
 */
const listarTodasLasConsultasController = async (req, res) => {
    try {
        const consultas = await listarTodasLasConsultasQuery();
        res.json(consultas);
    } catch (error) {
        console.error('Error al listar todas las consultas:', error);
        res.status(500).send(error);
    }
};

/**
 * Obtener una consulta médica por ID
 */
const listarConsultaPorIdController = async (req, res) => {
    const id = req.params.id;
    try {
        const consulta = await listarConsultaPorIdQuery(id);
        if (consulta) {
            res.json(consulta);
        } else {
            res.status(404).json({ mensaje: 'Consulta médica no encontrada' });
        }
    } catch (error) {
        console.error(`Error al obtener la consulta médica con ID ${id}:`, error);
        res.status(500).send(error);
    }
};

/**
 * Crear una nueva consulta médica
 */
const crearConsultaController = async (req, res) => {
    const consultaData = req.body;
    try {
        const resultado = await crearConsultaQuery(consultaData);
        res.status(201).json({ mensaje: 'Consulta médica creada con éxito', id: resultado.rows[0].id });
    } catch (error) {
        console.error('Error al crear una nueva consulta médica:', error);
        res.status(500).send(error);
    }
};

/**
 * Actualizar una consulta médica por ID
 */
const actualizarConsultaController = async (req, res) => {
    const id = req.params.id;
    const consultaData = req.body;
    try {
        const resultado = await actualizarConsultaQuery(id, consultaData);
        if (resultado.rowCount > 0) {
            res.json({ mensaje: 'Consulta médica actualizada con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'Consulta médica no encontrada' });
        }
    } catch (error) {
        console.error(`Error al actualizar la consulta médica con ID ${id}:`, error);
        res.status(500).send(error);
    }
};

/**
 * Eliminar una consulta médica por ID
 */
const eliminarConsultaController = async (req, res) => {
    const id = req.params.id;
    try {
        const resultado = await eliminarConsultaQuery(id);
        if (resultado.rowCount > 0) {
            res.json({ mensaje: 'Consulta médica eliminada con éxito' });
        } else {
            res.status(404).json({ mensaje: 'Consulta médica no encontrada' });
        }
    } catch (error) {
        console.error(`Error al eliminar la consulta médica con ID ${id}:`, error);
        res.status(500).send(error);
    }
};

// Exportar todas las funciones del controlador de consultas médicas
export {
    listarTodasLasConsultasController,
    listarConsultaPorIdController,
    crearConsultaController,
    actualizarConsultaController,
    eliminarConsultaController
};