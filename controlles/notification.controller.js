import { pool } from "../database/config.js";

export const getNotifications = async (req, res) => {
    try {
        
        const { user_id } = req.query;
        // console.log(user_id)
    
        const [resp] = await pool.query('SELECT * FROM notifications WHERE user_id = ?', [user_id]);
        // console.log(resp)
    
        return res.status(200).json(resp)

    } catch (error) {
        console.log(error)
    }
}