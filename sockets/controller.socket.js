import { pool } from "../database/config.js";

export const socketController = (socket) => {
    
    socket.on('upload_post', (user_id) => {
        // socket.broadcast.emit('uploaded_post', socket.id);
        updatedPostSocket(user_id, socket);
    });

    socket.on('update-key', (user_id)=>{
        updateKeySocket(user_id, socket);
    })
    

}

const updatedPostSocket = async(user_id, socket) => {
    const query = `SELECT key_socket FROM users where id IN (SELECT friends.friend_id FROM friends WHERE user_id = ${user_id}) AND key_socket IS NOT NULL;`;
    const [resp] = await pool.query(query);

    resp.forEach((key) => {
        socket.broadcast.to(key.key_socket).emit('uploaded_post', `the user ${user_id} uploaded a post`);
    });

}

const updateKeySocket = async(user_id, socket) => {
    const query = `update users set key_socket = '${socket.id}' where id = ${user_id}`;
    const [resp] = await pool.query(query);
    
}