import { pool } from "../database/config.js";
import { userExists } from "../database/orm.js";

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

export const getFriendRequests = async(req, res) => {
    const {user_id} = req.query;

    const user = await userExists(res, user_id)

    if (!user) {
        return res.status(400).json({
            msg: 'User not found',
            success: false
        })
    }

    const query = `SELECT * FROM users WHERE id IN (SELECT user_id FROM requests WHERE friend_id = ${user_id});`

    const [resp] = await pool.query(query)

    res.status(200).json({
        success: true,
        users: resp
    })
}

export const getAllFriends = async(req, res) => {
    
    const {user_id} = req.query;

    const user = await userExists(res, user_id)

    if (!user) {
        return res.status(400).json({
            msg: 'User not found',
            success: false
        })
    }

    const query = `SELECT * FROM users WHERE id IN (SELECT friend_id FROM friends WHERE user_id = ${user_id})`

    const [resp] = await pool.query(query)

    res.status(200).json({
        success: true,
        users: resp
    })
}
