const { Server } = require('socket.io');
const { addUser, getUser, delUser } = require('./user');
const db = require('../models');
const { addUserJoin, getUserJoin, delUserJoin } = require('./userGlobal');
const { where } = require('sequelize');

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: [
                process.env.CLIENT_URL,
                process.env.ADMIN_URL,
            ],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {

        socket.on('join-room-userId', (userId) => {

            addUserJoin({
                socket_id: socket.id,
                acc_id: userId
            })

            io.to('system').emit('user-online', {
                acc_id: userId,
                message: `User ${userId} is online`
            });

            socket.join(userId);
        });


        socket.on('disconnect', async () => {
            const _userJoin = getUserJoin(socket.id);
            if (_userJoin) {
                if (_userJoin.acc_id) {
                    try {
                        const checkAccount = await db.Account.findOne({
                            where: { acc_id: _userJoin.acc_id }
                        });

                        if (!checkAccount) {
                            console.error('Account not found for acc_id:', _userJoin.acc_id);
                        } else {
                            const a = await checkAccount.update({
                                isOnline: false,
                                lastOnline: new Date(),
                            });

                            if (a.dataValues) {
                                io.to('system').emit('user-offline', {
                                    acc_id: a.dataValues?.acc_id,
                                    message: `User ${a.dataValues?.acc_id} is offline`
                                });

                            }
                        }
                    } catch (error) {
                        console.error('Error updating account status:', error.message);
                    }
                }
                delUserJoin(socket.id);
                socket.leave(_userJoin.acc_id);
                console.log(`Socket ${socket.id} disconnected and removed from room ${_userJoin.acc_id}`);
            }
        });





        socket.on('join-room', (data) => {
            const { room_id, acc_id } = data;
            const { user, error } = addUser({
                socket_id: socket.id,
                room_id,
                acc_id
            });

            if (error) {
                return;
            }

            socket.join(user.room_id);
        });

        socket.on('send-message', (data) => {
            const user = getUser(socket.id);
            if (user) {
                io.to(user.room_id).emit('receive-message', data);
            }
        });

        socket.on('message-group', (data) => {
            const { room_id } = data;
            if (room_id) {
                io.to(room_id).emit('receive-group-message', data);
            }
        });

        socket.on('left-room', () => {
            const user = getUser(socket.id);
            const _user = delUser(socket.id);

            if (_user) {
                socket.leave(_user.room_id);

            }
        });


        socket.on('send-notify', ({ senderId, receiverId, data }) => {
            io.to(receiverId).emit('receive-notify', {
                senderId,
                data
            });
        });


        socket.on('call-user', ({ sender, receiver }) => {

            io.to(receiver?.acc_id).emit('receive-call', {
                sender,
                receiver,
                message: `${sender?.username} is calling you`
            });
        });

        socket.on('cancel-call', ({ sender, receiver }) => {
            io.to(receiver?.acc_id).emit('receive-cancel-call', {
                sender,
                message: `${sender?.username} has ended the call`
            });
        });

        socket.on('accept-call', ({ sender, receiver }) => {
            io.to(sender?.acc_id).emit('receive-accept-call', {
                receiver,
                message: `${receiver?.username} has accepted your call`
            });
        });

        socket.on('refuse-call', ({ sender, receiver }) => {
            io.to(sender?.acc_id).emit('receive-refuse-call', {
                receiver,
                message: `${receiver?.username} has refused your call`
            });
        });



        socket.on('close-call', ({ sender, receiver }) => {
            io.to(receiver?.acc_id).emit('receive-close-call', {
                sender,
                message: `${sender?.username} has closed the call`
            });
        })



    });
}

module.exports = initSocket;