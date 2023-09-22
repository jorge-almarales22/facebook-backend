import { pool } from "../database/config.js"
import { userExists } from "../database/orm.js"

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

export const getAllPosts = async (req, res) => {

    try {
        
        const { user_id } = req.params;

        const user = await userExists(res, user_id)

        if (!user) {

            return res.status(400).json({
                msg: 'User not found',
                success: false
            })
        }
    
        const query = `SELECT p.id as post_id, u.id as user_id, p.content as content, p.image as image, p.createAt as createAt, u.name as name FROM posts p INNER JOIN users u ON p.user_id = u.id WHERE p.user_id in (SELECT friend_id FROM friends WHERE user_id = ${user_id}) OR p.user_id = ${user_id} ORDER BY createAt DESC;`
    
        const [resp] = await pool.query(query)
    
        return res.status(200).json({
            posts: resp
        })

    } catch (error) {

        console.log(error)
        
    }

}