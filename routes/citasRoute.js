import { Router } from 'express';

import {
    listarTodaslasCitasController, // Usamos el nombre exportado en citasController
    listarCitaPorId,
    crearCita,
    actualizarCita,
    eliminarCita
} from '../controllers/citasController.js';

const citasRouter = Router(); // Cambiamos el nombre a citasRouter para ser más descriptivos

citasRouter.get('/', listarTodaslasCitasController); // La ruta base para listar todas las citas es '/'
citasRouter.get('/:id', listarCitaPorId); // Para obtener una cita por ID

citasRouter.post('/', crearCita); // Para crear una nueva cita
citasRouter.put('/:id', actualizarCita); // Para actualizar una cita por ID
citasRouter.delete('/:id', eliminarCita); // Para eliminar una cita por ID

export default citasRouter; // Exportamos citasRouter