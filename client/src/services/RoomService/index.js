import axiosJWT from '../../utils/axiosJwtInstance';

async function createRoomGroup(data) {
      const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/rooms/create-group`, data);
      return res.data;
}

async function createRoom(data) {
      const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/rooms/create`, data);
      return res.data;
}

async function addUserToRoom(room_id, user) {
      const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/rooms/add-user`, {
            user,
            room_id,
      });
      return res.data;
}

async function deleteUserFromRoom(room_id, user_id) {
      const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/rooms/delete-user`, {
            user_id,
            room_id,
      });
      return res.data;
}

export const roomService = {
      createRoomGroup,
      createRoom,
      addUserToRoom,
      deleteUserFromRoom,
};
