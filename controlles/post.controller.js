import { pool } from "../database/config.js"

export const postStore = async (req, res) => {
    try {
        const { content, user_id } = req.body

        let image = null

        if (req.file) {
            image = req.file.filename
        }

        const [resp] = await pool.query('SELECT * FROM users WHERE id = ?', [user_id])

        if (!resp[0]) {
            return res.status(400).json({
                msg: 'User not found',
                success: false
            })
        }

        const [resp2] = await pool.query('INSERT INTO posts (content, user_id, image) VALUES (?, ?, ?)', [content, user_id, image])

        if (resp2.affectedRows === 0) {
            return res.status(400).json({
                msg: 'Invalid data',
                success: false
            })
        }

        res.json({
            success: true,
            content,
            user_id,
            image
        })
        
    } catch (error) {

        console.log(error)
        
    }
}