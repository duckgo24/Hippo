import { Avatar } from '@mui/material';
import React, { useMemo } from 'react';

export default function CardChatGroup({ rooms_group, onClick }) {

      console.log(rooms_group.participants.filter(p => !p.is_exited));
      const numMember = useMemo(() => 
            rooms_group.participants.filter(p => !p.is_exited).length - 1
      ,[rooms_group.participants]);
      
      return (
            <div className="px-2 py-3 flex items-center gap-10 rounded-xl hover:bg-slate-200 hover:cursor-pointer" onClick={onClick}>
                  <div className="flex -space-x-4  relative items-center">
                        <Avatar
                              alt="Remy Sharp"
                              src={rooms_group.participants[0].avatar}
                              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                        />
                          <div className="absolute -bottom-2 right-1 h-3 w-3 border-whiteborder-2 border-solid bg-green-600 rounded-full z-50"></div>
                        <div className="absolute top-2 left-10 w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-sm font-medium text-gray-700 shadow-lg">
                              +{numMember}
                        </div>
                  </div>
                  <div>
                        <p className='font-bold'>{rooms_group.name}</p>
                        <p>Xin chao</p>
                  </div>
            </div>
      );
}
