import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

// Create a connection pool for PostgreSQL
const config = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    max: 10, // Reduce max connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000, // Increase connection timeout
    ssl: {  // Add SSL configuration for Render.com
        rejectUnauthorized: false
    }
});

// Test the connection
config.connect((err, client, release) => {
    if (err) {
        console.error('ERROR: ', err);
        if (err.code === 'ECONNREFUSED') {
            console.error('La conexión a la base de datos fue rechazada.');
        }
        if (err.code === 'ETIMEDOUT') {
            console.error('Tiempo de conexión a la base de datos agotado.');
        }
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexión a la base de datos fue cerrada.');
        }
    }
    if (client) {
        release();
        console.log('PostgreSQL connected successfully');
    }
});

export { config };