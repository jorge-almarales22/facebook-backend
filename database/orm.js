import { pool } from "./config.js"

export const userExists = async(res, user_id) => {

    const [resp] = await pool.query('SELECT * FROM users WHERE id = ?', [user_id])

    return resp[0];
}