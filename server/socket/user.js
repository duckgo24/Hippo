const users = [];
const usersOnline = [];

const addUser = ({ socket_id, acc_id, room_id }) => {
    const existingUser = users.find((user) => user.room_id === room_id && user.acc_id === acc_id);
    if (existingUser) {
        console.log('Username is taken.');

        return { error: 'Username is taken.' };
    }
    const user = { socket_id, acc_id, room_id };
    users.push(user);

    console.log(users);

    return { user };
};

const getUser = (socket_id) => users.find((user) => user.socket_id === socket_id);
const getUserByAccId = (acc_id) => users.find((user) => user.acc_id === acc_id);

const delUser = (acc_id) => {
    console.log(acc_id);

    const index = users.findIndex((user) => user.acc_id === acc_id);
    console.log('index', index);

    if (index !== -1) {
        console.log('User has left.');
        return users.splice(index, 1)[0];
    }
    return null;
};

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {
    addUser,
    getUser,
    getUserByAccId,
    delUser,
    getUsersInRoom,
};
