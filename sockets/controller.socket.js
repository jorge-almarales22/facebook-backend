export const socketController = (socket) => {
    
    socket.on('upload_post', (mensaje) => {
        console.log('EVENT UPLOAD_POST', mensaje);
        socket.broadcast.emit('uploaded_post', socket.id);
    });
    
    // console.log("a user connected", socket.id);
    // socket.on('disconnect', () => {
    //     console.log("user disconnected", socket.id);
    // })
}