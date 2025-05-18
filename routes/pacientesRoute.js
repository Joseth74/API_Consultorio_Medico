import { Router } from 'express';
import {
    listarTodosLosPacientesController,
    listarPacientePorIdController,
    crearPacienteController,
    actualizarPacienteController,
    eliminarPacienteController
} from '../controllers/pacientesController.js';

const pacientesRouter = Router();

// Ruta para listar todos los pacientes
pacientesRouter.get('/', listarTodosLosPacientesController);

// Ruta para obtener un paciente por ID
pacientesRouter.get('/:id', listarPacientePorIdController);

// Ruta para crear un nuevo paciente
pacientesRouter.post('/', crearPacienteController);

// Ruta para actualizar un paciente por ID
pacientesRouter.put('/:id', actualizarPacienteController);

// Ruta para eliminar un paciente por ID
pacientesRouter.delete('/:id', eliminarPacienteController);

export default pacientesRouter;