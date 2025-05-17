import { Router } from 'express';

import {
    listarTodosCitas,
    listarCitaPorId,
    crearCita,
    actualizarCita,
    eliminarCita
} from '../controllers/citasController.js';

const libroRouter = Router();

libroRouter.get('/', listarTodosCitas);
libroRouter.get('/:id', listarCitaPorId);

libroRouter.post('/', crearCita);
libroRouter.put('/:id', actualizarCita);
libroRouter.delete('/:id', eliminarCita);

export default libroRouter;