import { pool } from "../database/config.js";
import { userExists } from "../database/orm.js";

export const socketController = (socket) => {
    
    socket.on('upload_post', (user_id) => {
        // socket.broadcast.emit('uploaded_post', socket.id);
        updatedPostSocket(user_id, socket);
    });

    socket.on('update-key', (user_id)=>{
        updateKeySocket(user_id, socket);
    })

    socket.on('send-request', (data)=>{
        sendRequest(data, socket);
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
const sendRequest = async(data, socket) => {

    const {user_id, friend_id} = data;

    //usuario que envia
    const user = await userExists(null, user_id);

    //usuario que recibe
    const friend = await userExists(null, friend_id);

    const query = `INSERT INTO requests (user_id, friend_id) VALUES (${user_id}, ${friend_id})`

    const notification = `INSERT INTO notifications (user_id, message, readed) VALUES (${friend.id}, '${user.name} has sent you a friend request', ${false})`

    await pool.query(query);
    await pool.query(notification);

    socket.broadcast.to(friend.key_socket).emit('notify-request', user);


}
