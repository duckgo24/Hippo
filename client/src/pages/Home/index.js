import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Avatar, Modal } from '@mui/material';
import { setAuthMe, setUpdateMyAccount } from '../../redux/slice/account.slice';
import { setPosts } from '../../redux/slice/post.slice';
import { setVideos } from '../../redux/slice/video.slice';
import { setListFriend } from '../../redux/slice/friend.slice';
import { fetchGetAllNotify } from '../../redux/slice/notify.slice';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useSocket } from '../../providers/socket.provider';
import useHookMutation from '../../hooks/useHookMutation';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import CreatePost from '../../components/post_component/CreatePost';
import Post from '../../components/post_component/Post';
import { EmojiIcon, ImageIcon, MessageIcon } from '../../components/SgvIcon';
import { friendService } from '../../services/FriendService';
import { identityService } from '../../services/IdentityService';
import { postService } from '../../services/PostService';
import { videoService } from '../../services/VideoService';
import { accountService } from '../../services/AccountService';
import Loader from '../../components/Loader';

function Home() {
      const { my_account } = useSelector((state) => state.account);
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const socket = useSocket();

      const [showCreatePost, setShowCreatePost] = useState(false);
      const [openPostId, setOpenPostId] = useState(null);
      const [message, setMessage] = useState(null);
      const [content, setContent] = useState([]);

      const handleShowCreatePost = () => setShowCreatePost((prev) => !prev);

      const handleToggleComments = (postId) => {
            setOpenPostId((prev) => (prev === postId ? null : postId));
      };

      const {
            data: authData,
            isSuccess: isAuthSuccess,
            isError: isAuthError,
      } = useQuery({
            queryKey: ['auth-me'],
            queryFn: identityService.authMe,
            enabled: !!Cookies.get('access_token'),
      });

      const { data: listFriendData, isSuccess: isFriendSuccess } = useQuery({
            queryKey: ['get-all-friend', my_account?.acc_id],
            queryFn: () => friendService.getFriendWithLimitByAccId(my_account?.acc_id, 1000),
            enabled: !!my_account?.acc_id,
      });

      const updateAccountMutation = useHookMutation(({ acc_id, data }) => accountService.UpdateAccount(acc_id, data));

      const {
            data: postsData,
            isFetchingNextPage: isFetchingPosts,
            fetchNextPage: fetchPostsNextPage,
            hasNextPage: hasNextPosts,
      } = useInfiniteQuery({
            queryKey: ['get-post-with-pagination'],
            queryFn: ({ pageParam = 1 }) => postService.getPostWithPagination(pageParam, 2),
            getNextPageParam: (lastPage, allPages) => {
                  const currentPage = allPages.length;
                  const totalPages = lastPage.totalPages;
                  return currentPage < totalPages ? currentPage + 1 : undefined;
            },
            enabled: !!my_account?.acc_id,
      });

      const {
            data: videosData,
            isFetchingNextPage: isFetchingVideos,
            fetchNextPage: fetchVideosNextPage,
            hasNextPage: hasNextVideos,
      } = useInfiniteQuery({
            queryKey: ['get-video-with-pagination'],
            queryFn: ({ pageParam = 1 }) => videoService.getVideoWithPagination(pageParam, 1),
            getNextPageParam: (lastPage, allPages) => {
                  const currentPage = allPages.length;
                  const totalPages = lastPage.totalPages;
                  return currentPage < totalPages ? currentPage + 1 : undefined;
            },
            enabled: !!my_account?.acc_id,
      });

      const mergeContent = () => {
            const posts = postsData?.pages.flatMap((page) => page.posts) || [];
            const videos = videosData?.pages.flatMap((page) => page.videos) || [];
            const combinedContent = [];

            let postIndex = 0;
            let videoIndex = 0;

            while (postIndex < posts.length || videoIndex < videos.length) {
                  if (postIndex < posts.length) {
                        combinedContent.push(posts[postIndex]);
                        postIndex++;
                  }
                  if (postIndex % 2 === 0 && videoIndex < videos.length) {
                        combinedContent.push(videos[videoIndex]);
                        videoIndex++;
                  }
            }

            setContent(combinedContent);
      };

      useEffect(() => {
            if (isAuthError) {
                  navigate('/login');
            } else if (isAuthSuccess) {
                  if (authData?.isBan) {
                        Cookies.remove('access_token');
                        Cookies.remove('refresh_token');
                        navigate('/login');
                  } else {
                        socket.emit('join-room-userId', authData?.acc_id);
                        dispatch(setAuthMe(authData));
                        updateAccountMutation.mutate(
                              { acc_id: authData?.acc_id, data: { isOnline: true } },
                              {
                                    onSuccess: (data) => dispatch(setUpdateMyAccount(data)),
                              },
                        );
                  }
            }
      }, [authData, isAuthError, isAuthSuccess]);

      useEffect(() => {
            if (isFriendSuccess) dispatch(setListFriend(listFriendData));
      }, [isFriendSuccess]);

      useEffect(() => {
            dispatch(fetchGetAllNotify({ acc_id: my_account?.acc_id }));
      }, []);

      useEffect(() => {
            if (postsData || videosData) mergeContent();
      }, [postsData, videosData]);

      const postsRef = useRef(postsData);
      const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = postsRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                  if (hasNextPosts && !isFetchingPosts) fetchPostsNextPage();
                  if (hasNextVideos && !isFetchingVideos) fetchVideosNextPage();
            }
      };

      useEffect(() => {
            const postContainer = postsRef.current;
            if (postContainer) {
                  postContainer.addEventListener('scroll', handleScroll);
            }
            return () => {
                  if (postContainer) {
                        postContainer.removeEventListener('scroll', handleScroll);
                  }
            };
      }, [hasNextPosts, isFetchingPosts, hasNextVideos, isFetchingVideos]);

      return (
            <div ref={postsRef} className="flex flex-col items-center mx-auto py-10 h-full overflow-auto">
                  <div className="border border-gray-300 py-4 px-5 bg-white w-full rounded-lg md:w-[600px] lg:w-[800px] mb-3">
                        <div className="flex gap-2">
                              <Avatar src={my_account?.avatar} />
                              <input
                                    onClick={handleShowCreatePost}
                                    placeholder={`${my_account?.full_name} ơi, Hãy chia sẻ khoảng khắc thú vị nào ?`}
                                    style={{
                                          flex: 1,
                                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                          borderRadius: '20px',
                                          fontSize: '14px',
                                          padding: '10px',
                                    }}
                              />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                              <Button leftIcon={<ImageIcon size={20} />}>Ảnh/Video</Button>
                              <Button onClick={handleShowCreatePost} leftIcon={<EmojiIcon size={16} />}>
                                    Cảm xúc/Hoạt động
                              </Button>
                              <Button to="/chat" leftIcon={<MessageIcon size={20} />}>
                                    Bạn bè
                              </Button>
                        </div>
                  </div>

                  {content.map((item, idx) => (
                        <Post key={idx} post={item} onToggleComments={() => handleToggleComments(item?.post_id)} openComment={openPostId === item?.post_id} />
                  ))}

                  <Modal open={showCreatePost} onClose={handleShowCreatePost}>
                        <CreatePost
                              onCloseForm={handleShowCreatePost}
                              onCreateSuccess={() => {
                                    setMessage({ type: 'success', title: 'Thông báo', message: 'Đăng bài thành công' });
                                    setTimeout(() => setMessage(null), 3000);
                                    handleShowCreatePost();
                              }}
                        />
                  </Modal>
                  {message && <Alert type={message.type} title={message.title} message={message.message} />}
                  {isFetchingPosts && <Loader size={30} />}
            </div>
      );
}

export default Home;
