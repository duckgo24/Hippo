const { Server } = require('socket.io');

const initSocket = (server) => {

    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
        }
    });


    io.on('connection', (socket) => {
        console.log('User connected', socket.id);

        socket.on('join-room', (room_id) => {
            console.log(room_id);
            
            socket.join(room_id);
        });

        socket.on('send-private-message', (data) => {
            console.log(data);
            const { room_id } = data; 
            io.emit('receive-private-message', data);
        });


    });
}

module.exports = initSocket;