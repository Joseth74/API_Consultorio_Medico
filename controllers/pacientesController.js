import {
    listarTodosLosPacientesQuery,
    listarPacientePorIdQuery,
    crearPacienteQuery,
    actualizarPacienteQuery,
    eliminarPacienteQuery
} from '../db/pacientesQuery.js';

/**
 * Obtener todos los pacientes
 */
const listarTodosLosPacientesController = async (req, res) => {
    try {
        const pacientes = await listarTodosLosPacientesQuery();
        res.json(pacientes);
    } catch (error) {
        console.error('Error al listar todos los pacientes:', error);
        res.status(500).send(error);
    }
};

/**
 * Obtener un paciente por ID
 */
const listarPacientePorIdController = async (req, res) => {
    const id = req.params.id;
    try {
        const paciente = await listarPacientePorIdQuery(id);
        if (paciente) {
            res.json(paciente);
        } else {
            res.status(404).json({ mensaje: 'Paciente no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el paciente con ID ${id}:`, error);
        res.status(500).send(error);
    }
};

/**
 * Crear un nuevo paciente
 */
const crearPacienteController = async (req, res) => {
    const pacienteData = req.body;
    try {
        const resultado = await crearPacienteQuery(pacienteData);
        res.status(201).json({ mensaje: 'Paciente creado con éxito', id: resultado.rows[0].id });
    } catch (error) {
        console.error('Error al crear un nuevo paciente:', error);
        res.status(500).send(error);
    }
};

/**
 * Actualizar un paciente por ID
 */
const actualizarPacienteController = async (req, res) => {
    const id = req.params.id;
    const pacienteData = req.body;
    try {
        const resultado = await actualizarPacienteQuery(id, pacienteData);
        if (resultado.rowCount > 0) {
            res.json({ mensaje: 'Paciente actualizado con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'Paciente no encontrado' });
        }
    } catch (error) {
        console.error(`Error al actualizar el paciente con ID ${id}:`, error);
        res.status(500).send(error);
    }
};

/**
 * Eliminar un paciente por ID
 */
const eliminarPacienteController = async (req, res) => {
    const id = req.params.id;
    try {
        const resultado = await eliminarPacienteQuery(id);
        if (resultado.rowCount > 0) {
            res.json({ mensaje: 'Paciente eliminado con éxito' });
        } else {
            res.status(404).json({ mensaje: 'Paciente no encontrado' });
        }
    } catch (error) {
        console.error(`Error al eliminar el paciente con ID ${id}:`, error);
        res.status(500).send(error);
    }
};

// Exportar todas las funciones del controlador de pacientes
export {
    listarTodosLosPacientesController,
    listarPacientePorIdController,
    crearPacienteController,
    actualizarPacienteController,
    eliminarPacienteController
};