import { Box, Popper } from '@mui/material';
import { AudioIcon, CloseIcon, HealIcon, LocationIcon, MessageIcon, MoreIcon, ShareIcon } from '../SgvIcon';

import CardUser from '../CardUser';
import Button from '../Button';
import Paragraph from '../Paragraph';
import { useEffect, useRef, useState } from 'react';
import CommentList from '../comment_component/CommentList';
import RenderWithCondition from '../RenderWithCondition';
import { useSelector } from 'react-redux';
import handleTime from '../../utils/handleTime';
import { FaLocationDot } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

function Reel({ reel, onReelInView, currentOpenReel, onToggleComments }) {
      const [anchorElComment, setAnchorElComment] = useState(null);
      const { comments } = useSelector((state) => state.comment);
      const reelRef = useRef();
      const isCommentOpen = currentOpenReel === reel?.video_id;
      const navigate = useNavigate();
      const handleToggleComments = (event) => {
            setAnchorElComment(event.currentTarget);
            onToggleComments(reel?.id);
      };

      //   useEffect(() => {
      //         const observer = new IntersectionObserver(
      //               ([entry]) => {
      //                     if (entry.isIntersecting) {
      //                           onReelInView(reelRef);
      //                           if (reelRef.current) {
      //                                 reelRef.current.play();
      //                           }
      //                     } else {
      //                           if (reelRef.current) {
      //                                 reelRef.current.pause();
      //                           }
      //                     }
      //               },
      //               {
      //                     root: null,
      //                     threshold: 0.5,
      //               },
      //         );

      //         if (reelRef.current) {
      //               observer.observe(reelRef.current);
      //         }

      //         return () => {
      //               if (reelRef.current) {
      //                     observer.unobserve(reelRef.current);
      //               }
      //         };
      //   }, [onReelInView]);

      return (
            <div onClick={() => navigate(`/video/${reel?.video_id}`)} className="flex items-center h-full">
            <div className="p-3 rounded-xl relative w-[1000px] h-full">
                  <video src={reel?.video} controls ref={reelRef} autoPlay muted className="h-full w-full object-cover rounded-xl" />
                  <div className="absolute bottom-40 left-6">
                        <RenderWithCondition condition={reel?.location}>
                              <p className="text-sm text-white bg-black-03 rounded-md flex items-center gap-1 p-1" style={{}}>
                                    <FaLocationDot color="rgba(147, 250, 165, 1)" />
                                    {reel?.location}
                              </p>
                        </RenderWithCondition>
                  </div>
                  <div className="absolute bottom-20 left-6">
                        <div className="flex flex-col gap-1">
                              <div className="flex gap-2">
                                    <p className="text-white text-base font-bold">{reel?.accounts?.nickname} </p>
                                    <p className="text-white text-base">• {handleTime(reel?.createdAt)} </p>
                              </div>
                              <p className="text-white text-base">{reel?.title}</p>
                        </div>
                        <p className="text-white flex items-center gap-3">
                              <AudioIcon size={14} /> {reel?.accounts?.nickname} • Âm thanh gốc
                        </p>
                  </div>
            </div>
      
            <div className="flex flex-col gap-3 items-end flex-1 ">
                  <div>
                        <CardUser avatar={reel?.accounts?.avatar} />
                  </div>
                  <div className="flex flex-col items-center">
                        <Button>
                              <HealIcon color="#000" />
                        </Button>
                        <p className="text-black text-base">{reel?.num_likes}</p>
                  </div>
                  <div className="flex flex-col items-center">
                        <Button onClick={handleToggleComments}>
                              <MessageIcon color="#000" />
                        </Button>
                        <p className="text-black text-base">{reel?.num_comments} </p>
      
                        <Popper id="open-comment" open={isCommentOpen} anchorEl={anchorElComment} placement="bottom-start">
                              <Box
                                    sx={{
                                          border: 1,
                                          p: 1,
                                          bgcolor: 'background.paper',
                                          borderRadius: 4,
                                          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                          width: 450,
                                          maxWidth: '100%',
                                          minHeight: '100px',
                                          marginLeft: 'auto',
                                    }}
                              >
                                    <Box position="relative" height={40} display="flex" alignItems="center" gap="10px" padding=" 0 10px">
                                          <button onClick={handleToggleComments}>
                                                <CloseIcon size={16} />
                                          </button>
                                          <p className="text-black font-semibold text-lg text-center flex-1">Bình luận</p>
                                    </Box>
      
                                    <CommentList video={reel} comment_list={comments} />
                              </Box>
                        </Popper>
                  </div>
                  <Button>
                        <ShareIcon />
                  </Button>
                  <Button>
                        <MoreIcon />
                  </Button>
            </div>
      </div>
      
      );
}

export default Reel;
