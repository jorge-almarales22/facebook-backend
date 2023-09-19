import {createPool} from 'mysql2/promise'
import 'dotenv/config'
export const pool = createPool({
    // host: 'mariadb',
    host: process.env.DB_HOST,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.MARIADB_PORT
});