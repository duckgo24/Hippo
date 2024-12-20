
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';

import handleTime from '../../../utils/handleTime';

import RenderWithCondition from '../../RenderWithCondition';

function CardChat({ account, lastMessage, newMessage, room_id, selected, hasNewMessage, className, onClick }) {
      const { my_account } = useSelector((state) => state.account);
      return (
            <div
                  className={`${
                        selected && 'bg-black-03'
                  } flex flex-row items-center gap-2 px-2 py-1 rounded-xl cursor-pointer hover:bg-gray-300 h-16`}
                  onClick={onClick}
            >
                  <div className="relative">
                        <Avatar src={account?.avatar} alt={account?.avatar} />
                        {account?.isOnline && <div className="absolute bottom-0 right-1 h-3 w-3 bg-green-600 rounded-full"></div>}
                  </div>
                  <div className="flex-1">
                        <p className="font-bold">{account?.full_name}</p>
                        <div className="flex flex-row flex-nowrap gap-3">
                              <RenderWithCondition condition={lastMessage && !newMessage}>
                                    {lastMessage?.sender_id == my_account?.acc_id ? (
                                          <>
                                                <p>Bạn: {lastMessage?.content}</p>
                                                <p> • {handleTime(lastMessage?.createdAt)}</p>
                                          </>
                                    ) : (
                                          <>
                                                <p>{lastMessage?.content}</p>
                                                <p> • {handleTime(lastMessage?.createdAt)}</p>
                                          </>
                                    )}
                              </RenderWithCondition>
                              <RenderWithCondition condition={newMessage && newMessage.room_id === room_id}>
                                    {newMessage?.message_sender?.acc_id === my_account?.acc_id ? (
                                          <>
                                                <p>Bạn: {newMessage?.content}</p>
                                                <p> • {handleTime(newMessage?.createdAt)}</p>
                                          </>
                                    ) : (
                                          <>
                                                <p className={`${newMessage && 'font-bold'}`}>{newMessage?.content}</p>
                                                <p> • {handleTime(newMessage?.createdAt)}</p>
                                          </>
                                    )}
                              </RenderWithCondition>
                        </div>
                  </div>
            </div>
      );
}

export default CardChat;
