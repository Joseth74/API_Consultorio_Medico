import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load env variables
dotenv.config()

app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API!');
});

const app = express()

// Importar las rutas de los citas
import productosRouter from './routes/citasRoute.js';
// Importar las rutas de los autores
import autorRouter from './routes/autoresRoute.js';

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


//Usar las rutas
app.use('/citas', productosRouter); // LIBROS
app.use('/autores', autorRouter); // AUTORES

const port =
    process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})