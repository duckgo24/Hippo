

const systemUsers = [];

const addUserJoin = ({ socket_id, acc_id }) => {
    const existingUser = systemUsers.find((user) => user.socket_id === socket_id);
    if (existingUser) return { error: 'Username is taken '};
    const user = { socket_id, acc_id };
    systemUsers.push(user);
    return { user };
};

const getUserJoin = (socket_id) => systemUsers.find((user) => user.socket_id === socket_id);
const delUserJoin = (socket_id) => {
    const index = systemUsers.findIndex((user) => user.socket_id === socket_id);
    if (index !== -1) {
        return systemUsers.splice(index, 1)[0];
    }
    return null;
};

module.exports = { addUserJoin, getUserJoin, delUserJoin };

