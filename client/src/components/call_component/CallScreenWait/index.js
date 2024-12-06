

import React, { forwardRef, useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import RenderWithCondition from '../../RenderWithCondition';
import { FaCheckCircle } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { IoVideocamOffOutline } from "react-icons/io5";

const CallScreenWait = forwardRef(({
    sender, receiver,
    onAcceptCall, onRefuseCall,
    onCancelCall
}, ref) => {
    const { my_account } = useSelector(state => state.account);
    const [time, setTime] = useState(0);



    useLayoutEffect(() => {
        let timer = setTimeout(() => {
            setTime(0)
        }, [time]);

        return () => clearTimeout(timer);

    }, [time])

    return (
        <div ref={ref} className="flex flex-col items-center justify-center h-screen">

            <div className='w-2/5  h-2/4 bg-white shadow-lg flex items-center justify-center  rounded-lg relative'>
                <div className='w-1/2 sm:w-full h-1/2 flex flex-col items-center'>
                    <RenderWithCondition condition={sender?.acc_id !== my_account?.acc_id}>
                        <div className='h-20 w-20 rounded-full overflow-hidden'>
                            <img
                                src={receiver?.avatar}
                                alt={receiver?.avatar}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </div>
                    </RenderWithCondition>
                    {
                        receiver?.acc_id === my_account?.acc_id
                            ?
                            <p className='py-4 font-bold text-xl flex relative'>
                                <span>{`${sender?.full_name} đang gọi bạn`}</span>
                                <span className="absolute top-[15px] -right-2 animate-ping inline-flex rounded-full h-3 w-3 bg-sky-500 z-50"></span>
                            </p>
                            :
                            <p>{`Đang gọi với ${receiver?.full_name}`}</p>
                    }

                    <div className='flex items-center gap-3 mt-3'>
                        {
                            receiver?.acc_id === my_account?.acc_id &&
                            <button className='hover:opacity-60' onClick={onAcceptCall}>
                                <FaCheckCircle size={40} color='green' />
                            </button>
                        }
                        <button className='hover:opacity-60'
                            onClick={sender?.acc_id === my_account?.acc_id ?
                                () => {
                                    onCancelCall();
                                    setTime(2000);
                                }
                                :
                                onRefuseCall
                            }
                        >
                            <MdCancel size={45} color='red' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CallScreenWait;
