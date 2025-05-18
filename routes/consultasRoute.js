import { Router } from 'express';
import {
    listarTodasLasConsultasController,
    listarConsultaPorIdController,
    crearConsultaController,
    actualizarConsultaController,
    eliminarConsultaController
} from '../controllers/consultasController.js';

const consultasRouter = Router();

// Ruta para listar todas las consultas médicas
consultasRouter.get('/', listarTodasLasConsultasController);

// Ruta para obtener una consulta médica por ID
consultasRouter.get('/:id', listarConsultaPorIdController);

// Ruta para crear una nueva consulta médica
consultasRouter.post('/', crearConsultaController);

// Ruta para actualizar una consulta médica por ID
consultasRouter.put('/:id', actualizarConsultaController);

// Ruta para eliminar una consulta médica por ID
consultasRouter.delete('/:id', eliminarConsultaController);

export default consultasRouter;