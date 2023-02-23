import pkg from 'pg';
const { Pool } = pkg;

const connectionData = {
    user: process.env.DBUSER || 'postgres',
    host: process.env.DBHOST || 'database-1-dev.cpdy6g8tndct.us-east-1.rds.amazonaws.com',
    database: process.env.DBNAME || 'iof',
    password: process.env.DBPASSWORD || 'soporteiof2022',
    port: process.env.DBPORT || 5432,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
}

const pool = new Pool(connectionData);

export async function connection(callback) {
    let client = null;
    try {
        client = await pool.connect();
        return callback(client);
    } catch (err) {
        throw err;
    } finally {
        if(client)
        client.release();
    }
}