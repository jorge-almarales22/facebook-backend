export const socketController = (socket) => {
    console.log("a user connected", socket.id);

    socket.on('disconnect', () => {
        console.log("user disconnected", socket.id);
    })
    socket.on('mensaje_cliente', (mensaje) => {
        console.log('Mensaje del cliente:', mensaje);
    });
      
}