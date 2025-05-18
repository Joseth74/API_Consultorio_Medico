import { Router } from 'express';
import {
    listarTodosLosMedicosController,
    listarMedicoPorIdController,
    crearMedicoController,
    actualizarMedicoController,
    eliminarMedicoController
} from '../controllers/medicosController.js';

const medicosRouter = Router();

// Ruta para listar todos los médicos
medicosRouter.get('/', listarTodosLosMedicosController);

// Ruta para obtener un médico por ID
medicosRouter.get('/:id', listarMedicoPorIdController);

// Ruta para crear un nuevo médico
medicosRouter.post('/', crearMedicoController);

// Ruta para actualizar un médico por ID
medicosRouter.put('/:id', actualizarMedicoController);

// Ruta para eliminar un médico por ID
medicosRouter.delete('/:id', eliminarMedicoController);

export default medicosRouter;