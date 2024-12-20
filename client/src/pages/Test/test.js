import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Avatar, Modal } from '@mui/material';
import { setAuthMe, setUpdateMyAccount } from '../../redux/slice/account.slice';
import { EmojiIcon, ImageIcon, MessageIcon } from '../../components/SgvIcon';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import { setPosts } from '../../redux/slice/post.slice';
import CreatePost from '../../components/post_component/CreatePost';
import Post from '../../components/post_component/Post';
import RenderWithCondition from '../../components/RenderWithCondition';
import { setVideos } from '../../redux/slice/video.slice';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { identityService } from '../../services/IdentityService';
import { postService } from '../../services/PostService';
import { videoService } from '../../services/VideoService';
import useHookMutation from '../../hooks/useHookMutation';
import { accountService } from '../../services/AccountService';
import { friendService } from '../../services/FriendService';
import { setListFriend } from '../../redux/slice/friend.slice';
import { fetchGetAllNotify } from '../../redux/slice/notify.slice';
import { useSocket } from '../../providers/socket.provider';

function Test() {
      const { my_account } = useSelector((state) => state.account);
      const { posts } = useSelector((state) => state.post);
      const { videos } = useSelector((state) => state.video);
      const [showCreatePost, setShowCreatePost] = useState(false);
      const [openPostId, setOpenPostId] = useState(null);
      const [message, setMessage] = useState();
      const socket = useSocket();

      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleShowCreatePost = () => {
            setShowCreatePost(!showCreatePost);
      };

      const handleToggleComments = (postId) => {
            if (openPostId === postId) {
                  setOpenPostId(null);
            } else {
                  setOpenPostId(postId);
            }
      };

      const {
            data: authData,
            isSuccess: isFetchAuthSuccess,
            isError: isAuthError,
      } = useQuery({
            queryKey: ['auth-me'],
            queryFn: identityService.authMe,
            enabled: !!Cookies.get('access_token'),
      });

      const {
            data: listPostData,
            isSuccess: isFetchGetPostsSuccess,
            isError: isFetchGetPostsError,
      } = useQuery({
            queryKey: ['get-all-post'],
            queryFn: postService.getAllPosts,
      });

      const {
            data: listVideoData,
            isSuccess: isFetchGetVideosSuccess,
            isError: isFetchGetVideosError,
      } = useQuery({
            queryKey: ['get-all-video'],
            queryFn: videoService.getAllVideos,
      });

      const { data: listFriendData, isSuccess: isFetchGetFriendsSuccess } = useQuery({
            queryKey: ['get-all-friend', my_account?.acc_id],
            queryFn: () => friendService.getFriendWithLimitByAccId(my_account?.acc_id, 1000),
            enabled: !!my_account?.acc_id,
      });

      const updateAccountMutation = useHookMutation(({ acc_id, data }) => {
            return accountService.UpdateAccount(acc_id, data);
      });

      const [content, setContent] = useState([]);

      const {
            data: postsData,
            isLoading: isLoadingPosts,
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
            isLoading: isLoadingVideos,
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

      useEffect(() => {
            if (postsData?.pages && videosData?.pages) {
                  const posts = postsData.pages.flatMap((page) => page.posts);
                  const videos = videosData.pages.flatMap((page) => page.videos);

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
            }
      }, [postsData, videosData]);

      const handleScroll = () => {
            console.log('scroll');
            
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
                  if (hasNextPosts && !isFetchingPosts) {
                        fetchPostsNextPage();
                  }
                  if (hasNextVideos && !isFetchingVideos) {
                        fetchVideosNextPage();
                  }
            }
      };

      useEffect(() => {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
      }, [hasNextPosts, isFetchingPosts, hasNextVideos, isFetchingVideos]);

      useEffect(() => {
            if (isAuthError) {
                  navigate('/login');
            }

            if (isFetchAuthSuccess) {
                  if (authData?.isBan) {
                        Cookies.remove('access_token');
                        Cookies.remove('refresh_token');
                        navigate('/login');
                        return;
                  }

                  socket.emit('join-room-userId', authData?.acc_id);

                  dispatch(setAuthMe(authData));
                  updateAccountMutation.mutate(
                        { acc_id: my_account?.acc_id, data: { isOnline: true } },
                        {
                              onSuccess: (data) => {
                                    dispatch(setUpdateMyAccount(data));
                              },
                        },
                  );
            }

            if (isFetchGetPostsSuccess) {
                  dispatch(setPosts(listPostData));
            }

            if (isFetchGetPostsError) {
                  dispatch(setPosts([]));
            }

            if (isFetchGetVideosSuccess) {
                  dispatch(setVideos(listVideoData));
            }

            if (isFetchGetVideosError) {
                  dispatch(setVideos([]));
            }

            if (isFetchGetFriendsSuccess) {
                  dispatch(setListFriend(listFriendData));
            }

            return () => {
                  socket.off('join-room-userId');
            };
      }, [isFetchAuthSuccess, isFetchGetPostsSuccess, isFetchGetVideosSuccess, isFetchGetFriendsSuccess, isAuthError]);

      useEffect(() => {
            dispatch(fetchGetAllNotify({ acc_id: my_account?.acc_id }));
      }, []);

      const videoAndPost = useMemo(() => {
            const arr = [];
            let postIndex = 0;
            let videoIndex = 0;

            if (!posts || !Array.isArray(posts) || posts.length === 0) return arr;

            while (postIndex < posts.length) {
                  arr.push(posts[postIndex]);
                  postIndex++;
                  if (postIndex < posts.length) {
                        arr.push(posts[postIndex]);
                        postIndex++;
                  }

                  if (videoIndex < videos?.length) {
                        arr.push(videos[videoIndex]);
                        videoIndex++;
                  }
            }

            return arr;
      }, [videos, posts]);

      return (
            <div className="flex flex-col items-center mx-auto py-10 h-full">
                  <div className="border border-solid border-gray-300 py-4 px-5 bg-white w-full rounded-lg md:w-[600px] lg:w-[800px]">
                        <div className="flex gap-2">
                              <Avatar src={my_account?.avatar}></Avatar>
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

                  {/* <div className="flex flex-col items-center justify-center mt-2">
                        <RenderWithCondition condition={videoAndPost && videoAndPost.length > 0}>
                              {videoAndPost.map((item, idx) => {
                                    if (item == null) {
                                          return null;
                                    }
                                    return <Post key={idx} post={item} onToggleComments={() => handleToggleComments(item?.post_id)} openComment={openPostId === item?.post_id} />;
                              })}
                              ;
                        </RenderWithCondition>
                  </div> */}

                  {
                        <div className="flex flex-col items-center justify-center mt-2">
                              {content.map((item, idx) => {
                                    if (item == null) {
                                          return null;
                                    }
                                    return <Post key={idx} post={item} onToggleComments={() => handleToggleComments(item?.post_id)} openComment={openPostId === item?.post_id} />;
                              })}
                              ;
                        </div>
                  }
                  <Modal open={showCreatePost} onClose={() => setShowCreatePost(false)}>
                        <CreatePost
                              tabIndex={0}
                              onCloseForm={() => setShowCreatePost(false)}
                              onCreateSuccess={() => {
                                    setMessage({ type: 'success', title: 'Thông báo', message: 'Đăng bài thành công' });
                                    setTimeout(() => {
                                          setMessage(null);
                                    }, 3000);
                                    setShowCreatePost(false);
                              }}
                        />
                  </Modal>
                  {message && <Alert type={message?.type} title={message?.title} message={message?.message} />}
            </div>
      );
}

export default Test;
