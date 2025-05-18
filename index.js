import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

const app = express();

// Importar las rutas
import citasRouter from './routes/citasRoute.js';     // Rutas de citas
import pacientesRouter from './routes/pacientesRoute.js'; // Rutas de pacientes
import medicosRouter from './routes/medicosRoute.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API!');
});

// Usar las rutas
app.use('/api/appointments', citasRouter);   // Rutas de citas
app.use('/api/patients', pacientesRouter);     // Rutas de pacientes
app.use('/api/doctors', medicosRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});