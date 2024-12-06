const users = [];
const usersOnline = [];

const addUser = ({ socket_id, acc_id, room_id }) => {
    const existingUser = users.find((user) => user.room_id === room_id && user.acc_id === acc_id);
    if (existingUser) return { error: 'Username is taken.' };
    const user = { socket_id, acc_id, room_id };
    users.push(user);
    return { user };
}


const getUser = (socket_id) => users.find((user) => user.socket_id === socket_id);


const delUser = (socket_id) => {
    const index = users.findIndex((user) => user.socket_id === socket_id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
    return null;
};


const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { 
    addUser, getUser, delUser, getUsersInRoom,

};