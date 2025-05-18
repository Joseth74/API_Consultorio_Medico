import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

const app = express();

// Importar las rutas de los citas
import productosRouter from './routes/citasRoute.js'; // Asegúrate de que este sea el nombre correcto del archivo
// Importar las rutas de los autores
import autorRouter from './routes/autoresRoute.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API!');
});

// Usar las rutas
app.use('/api/appointments', productosRouter); // CITAS - ¡Ruta base ajustada!
app.use('/autores', autorRouter); // AUTORES

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});