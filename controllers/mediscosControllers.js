import {
    listarTodosLosMedicosQuery,
    listarMedicoPorIdQuery,
    crearMedicoQuery,
    actualizarMedicoQuery,
    eliminarMedicoQuery
} from '../db/medicosQuery.js';

/**
 * Obtener todos los médicos
 */
const listarTodosLosMedicosController = async (req, res) => {
    try {
        const medicos = await listarTodosLosMedicosQuery();
        res.json(medicos);
    } catch (error) {
        console.error('Error al listar todos los médicos:', error);
        res.status(500).send(error);
    }
};

/**
 * Obtener un médico por ID
 */
const listarMedicoPorIdController = async (req, res) => {
    const id = req.params.id;
    try {
        const medico = await listarMedicoPorIdQuery(id);
        if (medico) {
            res.json(medico);
        } else {
            res.status(404).json({ mensaje: 'Médico no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el médico con ID ${id}:`, error);
        res.status(500).send(error);
    }
};

/**
 * Crear un nuevo médico
 */
const crearMedicoController = async (req, res) => {
    const medicoData = req.body;
    try {
        const resultado = await crearMedicoQuery(medicoData);
        res.status(201).json({ mensaje: 'Médico creado con éxito', id: resultado.rows[0].id });
    } catch (error) {
        console.error('Error al crear un nuevo médico:', error);
        res.status(500).send(error);
    }
};

/**
 * Actualizar un médico por ID
 */
const actualizarMedicoController = async (req, res) => {
    const id = req.params.id;
    const medicoData = req.body;
    try {
        const resultado = await actualizarMedicoQuery(id, medicoData);
        if (resultado.rowCount > 0) {
            res.json({ mensaje: 'Médico actualizado con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'Médico no encontrado' });
        }
    } catch (error) {
        console.error(`Error al actualizar el médico con ID ${id}:`, error);
        res.status(500).send(error);
    }
};

/**
 * Eliminar un médico por ID
 */
const eliminarMedicoController = async (req, res) => {
    const id = req.params.id;
    try {
        const resultado = await eliminarMedicoQuery(id);
        if (resultado.rowCount > 0) {
            res.json({ mensaje: 'Médico eliminado con éxito' });
        } else {
            res.status(404).json({ mensaje: 'Médico no encontrado' });
        }
    } catch (error) {
        console.error(`Error al eliminar el médico con ID ${id}:`, error);
        res.status(500).send(error);
    }
};

// Exportar todas las funciones del controlador de médicos
export {
    listarTodosLosMedicosController,
    listarMedicoPorIdController,
    crearMedicoController,
    actualizarMedicoController,
    eliminarMedicoController
};