import { pool } from "../database/config.js";

export const searchFriends = async(req, res) => {
    const {username, user_id} = req.query;

    if(!username){
        return res.status(400).json({
            msg: 'The username is required',
            success: false
        })
    }

    const query = `SELECT * FROM users WHERE name LIKE "%${username}%" AND id != ${user_id}`

    const [resp] = await pool.query(query);

    res.json({
        success: true,
        users: resp
    })
}


