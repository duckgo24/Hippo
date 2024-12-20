import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import RenderWithCondition from '../../components/RenderWithCondition';
import { MdCancel } from 'react-icons/md';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { IoVideocamOffOutline } from 'react-icons/io5';

import { FaMicrophone } from 'react-icons/fa';
import { IoMicOff } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { accountService } from '../../services/AccountService';
import { useQuery } from '@tanstack/react-query';
import { useSocket } from '../../providers/socket.provider';
import calculateTime from '../../utils/calculateTime';

export default function CallScreenSender() {
      const { my_account } = useSelector((state) => state.account);
      const [time, setTime] = useState(0);
      const [timeWait, setTimeWait] = useState(0);
      const [isOnCam, setIsOnCam] = useState(false);
      const [isOnMic, setIsMic] = useState(false);
      const videoRef = useRef();
      const socket = useSocket();

      const [isAcceptCall, setIsAcceptCall] = useState(false);
      const [isCancelCall, setIsCancelCall] = useState(false);
      const [isRefuseCall, setIsRefuseCall] = useState(false);
      const [isEndCall, setIsEndCall] = useState(false);

      let audioStream;

      useLayoutEffect(() => {
            if (isAcceptCall) {
                  const timer = setInterval(() => {
                        setTime((prev) => prev + 1);
                  }, 1000);

                  return () => clearInterval(timer);
            }
      }, [isAcceptCall]);

      const hasEmitted = useRef(false);

      useEffect(() => {
            if (timeWait === 10 && !hasEmitted.current) {
                  socket.emit('close-call', { sender: userCall, receiver: my_account });
                  setIsCancelCall(true);
                  setIsAcceptCall(false);
                  hasEmitted.current = true;
                  setTimeout(() => {
                        window.close();
                  }, 2000);
            }
            let timer;

            if (!isAcceptCall) {
                  timer = setInterval(() => {
                        setTimeWait((prev) => prev + 1);
                  }, 1000);
            }

            return () => clearInterval(timer);
      }, [timeWait]);

      const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60)
                  .toString()
                  .padStart(2, '0');
            const secs = (seconds % 60).toString().padStart(2, '0');
            return `${mins}:${secs}`;
      };

      const handleTurnOnMic = async () => {
            try {
                  audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                  console.log('Microphone turned on');
                  setIsMic(true);
            } catch (error) {
                  console.error('Failed to access the microphone', error);
            }
      };

      const handleTurnOffMic = () => {
            if (audioStream) {
                  const tracks = audioStream.getTracks();
                  tracks.forEach((track) => track.stop());
                  console.log('Microphone turned off');
            }
            setIsMic(false);
      };

      const handleTurnOnCam = async () => {
            try {
                  setIsOnCam(true);
                  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                  if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play();
                  }
                  console.log('Camera turned on');
            } catch (error) {
                  console.error('Failed to access the camera', error);
            }
      };

      const handleTurnOffCam = () => {
            setIsOnCam(false);
            if (videoRef.current && videoRef.current.srcObject) {
                  const tracks = videoRef.current.srcObject.getTracks();
                  tracks.forEach((track) => track.stop());
                  videoRef.current.srcObject = null;
                  console.log('Camera turned off');
            }
      };

      const { nickname } = useParams();

      const {
            data: userCall,
            isLoading: isFetchAccountLoading,
            isSuccess: isFetchAccountSuccess,
      } = useQuery({
            queryKey: ['get-by-nickname', nickname],
            queryFn: () => accountService.getAccountByNickName(nickname),
            enabled: !!nickname,
      });

      const handleCancelCall = () => {
            socket.emit('cancel-call', { sender: my_account, receiver: userCall });
            setIsEndCall(true);
            setIsAcceptCall(false);
            let timer = setTimeout(() => {
                  window.close();
            }, 1000);
            return () => clearTimeout(timer);
      };

      const handleCloseCall = () => {
            socket.emit('close-call', { sender: userCall, receiver: my_account });
            setIsCancelCall(true);
            setIsAcceptCall(false);
            let timer = setTimeout(() => {
                  window.close();
            }, 2000);

            return () => clearTimeout(timer);
      };

      useEffect(() => {
            if (isFetchAccountSuccess && !isAcceptCall) {
                  socket.emit('call-user', { sender: my_account, receiver: userCall });
            }

            socket.on('receive-accept-call', (data) => {
                  setIsAcceptCall(true);
            });

            socket.on('receive-refuse-call', (data) => {
                  setIsRefuseCall(true);
                  setTimeout(() => {
                        window.close();
                  }, 2000);
            });

            socket.on('receive-close-call', (data) => {
                  setIsEndCall(true);
                  setIsAcceptCall(false);
                  setTimeout(() => {
                        window.close();
                  }, 2000);
            });

            return () => {
                  socket.off('receive-accept-call');
                  socket.off('receive-refuse-call');
                  socket.off('receive-close-call');
            };
      }, [isFetchAccountSuccess, socket]);

      return (
            <div className="flex flex-col items-center justify-center h-screen">
                  {isOnCam && <video ref={videoRef} className="w-[240px] h-[240px] absolute -top-[16px] left-10 rounded-3xl" autoPlay />}
                  <div className="w-1/2 h-1/2 flex flex-col items-center">
                        <RenderWithCondition condition={userCall?.acc_id !== my_account?.acc_id}>
                              <div className="h-20 w-20 rounded-full overflow-hidden">
                                    <img
                                          src={userCall?.avatar}
                                          alt={userCall?.avatar}
                                          style={{
                                                width: '100%',
                                                height: '100%',
                                          }}
                                    />
                              </div>
                        </RenderWithCondition>

                        {!isAcceptCall && !isCancelCall && !isRefuseCall && !isEndCall && (
                              <div>
                                    <p className="font-bold text-xl mt-5">Đang gọi tới {userCall?.full_name}</p>
                                    <audio src="../mp3/wait.mp3" autoPlay />
                              </div>
                        )}

                        {isAcceptCall && (
                              <>
                                    <p className="font-bold text-xl mt-5">Đang trực tuyến</p>
                                    <p className="text-gray-500 text-lg">{formatTime(time)}</p>
                              </>
                        )}

                        {isCancelCall && <p className="font-bold text-xl mt-5">Đã hủy cuộc gọi</p>}

                        {isRefuseCall && <p className="font-bold text-xl mt-5">Cuộc gọi bị từ chối</p>}

                        {isEndCall && <p className="font-bold text-xl mt-5">Kết thúc cuộc gọi với {calculateTime(time)}</p>}

                        <div className="flex items-center gap-3 mt-10">
                              {isOnMic ? (
                                    <button onClick={handleTurnOffMic}>
                                          <FaMicrophone size={35} />
                                    </button>
                              ) : (
                                    <button onClick={handleTurnOnMic}>
                                          <IoMicOff size={35} />
                                    </button>
                              )}

                              {isOnCam ? (
                                    <button onClick={handleTurnOffCam} className="hover:opacity-60">
                                          <AiOutlineVideoCameraAdd size={45} />
                                    </button>
                              ) : (
                                    <button onClick={handleTurnOnCam} className="hover:opacity-60">
                                          <IoVideocamOffOutline size={45} />
                                    </button>
                              )}

                              <button className="hover:opacity-60" onClick={!isAcceptCall ? handleCancelCall : handleCloseCall}>
                                    <MdCancel size={45} color="red" />
                              </button>
                        </div>
                  </div>
            </div>
      );
}
