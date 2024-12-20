import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Modal, Popper, Tab, Tabs, Link } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import { TickIcon } from '../../components/SgvIcon';
import { setAddFriend, setGetFriend, setListFriend } from '../../redux/slice/friend.slice';
import { setGetRequestFriendReceiver, setGetRequestFriendSender } from '../../redux/slice/request-friend.slice';
import RenderWithCondition from '../../components/RenderWithCondition';
import CardUser from '../../components/CardUser';
import testImage from '../../images/test.jpg';
import Post from '../../components/post_component/Post';
import BoxInfoUser from '../../components/BoxInfoUser';
import { useSocket } from '../../providers/socket.provider';
import { accountService } from '../../services/AccountService';
import { postService } from '../../services/PostService';
import { requestFriendService } from '../../services/RequestFriend';
import { friendService } from '../../services/FriendService';
import { videoService } from '../../services/VideoService';
import useHookMutation from '../../hooks/useHookMutation';
import { notifyService } from '../../services/NotifyService';
import { setMyAccount } from '../../redux/slice/account.slice';
import { fetchCreateNotify, fetchDeleteNotify2 } from '../../redux/slice/notify.slice';
import { fetchCreateRoom } from '../../redux/slice/room.slice';
import DeletePost from '../../components/post_component/DeletePost';
import { roomService } from '../../services/RoomService';

function TabPanel({ value, index, children }) {
      return (
            <div role="tabpanel" hidden={value !== index}>
                  {value === index && <Box>{children}</Box>}
            </div>
      );
}

function Profile() {
      const { my_account } = useSelector((state) => state.account);
      const { get_friend, friends } = useSelector((state) => state.friend);
      const { get_request_friend_sender, get_request_friend_receiver } = useSelector((state) => state.requestFriend);
      const [currentTab, setCurrentTab] = useState(0);
      const [openModalEditProfile, setOpenModalEditProfile] = useState(false);
      const [message, setMessage] = useState();
      const [postDelete, setPostDelete] = useState(null);
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const socket = useSocket();

      const { nickname } = useParams();

      const {
            data: accountByNickName,
            isLoading: isAccountLoading,
            isSuccess,
      } = useQuery({
            queryKey: ['get-by-nickname', nickname],
            queryFn: () => accountService.getAccountByNickName(nickname),
            enabled: !!nickname,
      });

      const { data: postDataByAccId, refetch: reFetchPostData } = useQuery({
            queryKey: ['get-post-by-acc-id', accountByNickName?.acc_id],
            queryFn: () => postService.getPostByAccId(accountByNickName?.acc_id),
            enabled: !!accountByNickName?.acc_id && currentTab === 0,
      });

      const { data: videoDataByAccId, refetch: reFetchVideoData } = useQuery({
            queryKey: ['get-video-by-acc-id', accountByNickName?.acc_id],
            queryFn: () => videoService.getVideoByAccId(accountByNickName?.acc_id),
            enabled: !!accountByNickName?.acc_id && currentTab === 1,
      });

      const { data: friendData, isSuccess: isFetchSomeFriends } = useQuery({
            queryKey: ['get-some-friends', accountByNickName?.acc_id],
            queryFn: () => friendService.getFriendWithLimitByAccId(accountByNickName?.acc_id, 3),
            enabled: !!accountByNickName?.acc_id && !isAccountLoading,
      });

      const {
            data: checkFriendData,
            isSuccess: isFetchSuccessCheckFriend,
            refetch: refetchCheckFriend,
      } = useQuery({
            queryKey: ['check-friend', accountByNickName?.acc_id],
            queryFn: () => friendService.checkIsFriend(my_account?.acc_id, accountByNickName?.acc_id),
            enabled: !!accountByNickName?.acc_id && !isAccountLoading,
      });

      const { data: checkRequestFriendDataByRoleSender, isSuccess: isSuccess1 } = useQuery({
            queryKey: ['check-request-friend-by-role-sender', my_account?.acc_id, accountByNickName?.acc_id],
            queryFn: () => requestFriendService.checkRequestFriendByRoleSender(my_account?.acc_id, accountByNickName?.acc_id),
            enabled: !!accountByNickName?.acc_id && !isAccountLoading,
      });

      const { data: checkRequestFriendDataByRoleReceiver, isSuccess: isSuccess2 } = useQuery({
            queryKey: ['check-request-friend-by-role-receiver', my_account?.acc_id, accountByNickName?.acc_id],
            queryFn: () => requestFriendService.checkRequestFriendByRoleReceiver(accountByNickName?.acc_id, my_account?.acc_id),
            enabled: !!accountByNickName?.acc_id && !isAccountLoading,
      });

      useEffect(() => {
            if (isFetchSomeFriends) {
                  dispatch(setListFriend(friendData));
            }

            if (isFetchSuccessCheckFriend) {
                  dispatch(setGetFriend(checkFriendData));
            }
            if (isSuccess1) {
                  dispatch(setGetRequestFriendSender(checkRequestFriendDataByRoleSender));
            }
            if (isSuccess2) {
                  dispatch(setGetRequestFriendReceiver(checkRequestFriendDataByRoleReceiver));
            }
      }, [isFetchSomeFriends, isFetchSuccessCheckFriend, isSuccess1, isSuccess2]);

      const sendRequestFriendMutaion = useHookMutation((data) => {
            const { sender_id, receiver_id } = data;
            return requestFriendService.createRequestAddFriend(sender_id, receiver_id);
      });

      const handleSendRequestFriend = () => {
            sendRequestFriendMutaion.mutate(
                  { sender_id: my_account?.acc_id, receiver_id: accountByNickName?.acc_id },
                  {
                        onSuccess: (data) => {
                              socket.emit('send-notify', {
                                    senderId: my_account?.acc_id,
                                    receiverId: accountByNickName?.acc_id,
                                    data: {
                                          message: `${my_account?.full_name} vừa gửi lời mời kết bạn`,
                                    },
                              });
                              dispatch(
                                    fetchCreateNotify({
                                          sender_id: my_account?.acc_id,
                                          receiver_id: accountByNickName?.acc_id,
                                          type: 'request_friend',
                                          isRead: false,
                                          link: `/profile/${my_account?.nickname}`,
                                          title: 'Thông báo kết bạn',
                                          content: `${my_account?.full_name} vừa gửi lời mời kết bạn`,
                                    }),
                              );
                              // notifyService.createNotify({

                              // });
                              dispatch(setGetRequestFriendSender(data));
                        },
                  },
            );
      };

      const deleteRequestFriendMutation = useHookMutation((data) => {
            const { sender_id, receiver_id } = data;
            return requestFriendService.deleteRequestFriend(sender_id, receiver_id);
      });

      const handleDeleteRequestFriend = () => {
            deleteRequestFriendMutation.mutate(
                  { sender_id: my_account?.acc_id, receiver_id: accountByNickName?.acc_id },
                  {
                        onSuccess: async (data) => {
                              await notifyService.deleteNotify2({
                                    sender_id: my_account?.acc_id,
                                    receiver_id: accountByNickName?.acc_id,
                                    title: 'Thông báo kết bạn',
                                    content: `${my_account?.full_name} vừa gửi lời mời kết bạn`,
                              });
                              dispatch(
                                    setGetRequestFriendSender({
                                          success: false,
                                          message: 'Delete request friend success',
                                    }),
                              );
                        },
                  },
            );
      };

      const handleRefuseRequestFriend = () => {
            deleteRequestFriendMutation.mutate(
                  { sender_id: accountByNickName?.acc_id, receiver_id: my_account?.acc_id },
                  {
                        onSuccess: () => {
                              setGetRequestFriendSender({
                                    success: false,
                                    message: 'Delete request friend success',
                              });
                              notifyService.deleteNotify2({
                                    sender_id: accountByNickName?.acc_id,
                                    receiver_id: my_account?.acc_id,
                                    title: 'Thông báo kết bạn',
                                    content: `${accountByNickName?.full_name} vừa gửi lời mời kết bạn`,
                              });
                              dispatch(
                                    setGetRequestFriendReceiver({
                                          success: false,
                                          message: 'Delete request friend success',
                                    }),
                              );
                        },
                  },
            );
      };

      const deleteFriendMutation = useHookMutation((data) => {
            const { acc_id, friend_id } = data;
            return friendService.deleteFriend(acc_id, friend_id);
      });
      const createFriendMutation = useHookMutation(({ acc_id, friend_id }) => {
            return friendService.createFriend(acc_id, friend_id);
      });

      const handleConfirmAddFriend = () => {
            createFriendMutation.mutate(
                  { acc_id: my_account?.acc_id, friend_id: accountByNickName?.acc_id },
                  {
                        onSuccess: (data) => {
                              handleRefuseRequestFriend();
                              socket.emit('send-notify', {
                                    senderId: my_account?.acc_id,
                                    receiverId: accountByNickName?.acc_id,
                                    data: {
                                          message: `${accountByNickName?.full_name} và ${my_account?.full_name} đã trở thành bạn bè của nhau`,
                                          type: 'accept-request-friend',
                                          data: data,
                                    },
                              });
                              dispatch(
                                    fetchCreateNotify({
                                          sender_id: 'system',
                                          receiver_id: accountByNickName?.acc_id,
                                          type: 'friend',
                                          isRead: false,
                                          link: `/profile/${my_account?.nickname}`,
                                          title: 'Thông báo hệ thống',
                                          content: `${accountByNickName?.full_name} và ${my_account?.full_name} đã trở thành bạn bè của nhau`,
                                    }),
                              );

                              dispatch(
                                    fetchCreateNotify({
                                          sender_id: 'system',
                                          receiver_id: my_account?.acc_id,
                                          type: 'friend',
                                          isRead: false,
                                          link: `/profile/${accountByNickName?.nickname}`,
                                          title: 'Thông báo hệ thống',
                                          content: `${my_account?.full_name} và ${accountByNickName?.full_name}  đã trở thành bạn bè của nhau`,
                                    }),
                              );
                              // notifyService.createNotify({

                              // });
                              dispatch(
                                    fetchCreateRoom({
                                          acc_id: my_account?.acc_id,
                                          friend_id: accountByNickName?.acc_id,
                                    }),
                              );

                              dispatch(setGetFriend(data));
                              dispatch(setAddFriend(data));
                        },
                  },
            );
      };

      const handleDeleteFriend = () => {
            deleteFriendMutation.mutate(
                  { acc_id: my_account?.acc_id, friend_id: accountByNickName?.acc_id },
                  {
                        onSuccess: async (data) => {
                              dispatch(
                                    fetchDeleteNotify2({
                                          sender_id: 'system',
                                          receiver_id: accountByNickName?.acc_id,
                                          title: 'Thông báo hệ thống',
                                          content: `${accountByNickName?.full_name} và ${my_account?.full_name} đã trở thành bạn bè của nhau`,
                                    }),
                              );
                              dispatch(setGetFriend(null));
                              setOpenOptionFriend(false);
                        },
                  },
            );
      };

      const handleSendBlockUser = () => {
            navigate('/chat', {
                  state: {
                        account: accountByNickName,
                  },
            });
      };

      const handleOnChatFriend = () => {
            navigate('/chat', {
                  state: {
                        account: accountByNickName,
                  },
            });
      };

      const handleClickFriendCard = (friend) => {
            navigate(`/profile/${friend?.nickname}`);
      };

      const [anchorElOptionFriend, setAnchorElOptionFriend] = useState(null);
      const [openOptionFriend, setOpenOptionFriend] = useState(false);
      const toggleOptionFriend = (e) => {
            setOpenOptionFriend((prev) => !prev);
            setAnchorElOptionFriend(e.currentTarget);
      };

      const handleChangeTab = (e, tab) => {
            setCurrentTab(tab);
      };

      const handleToggleModalExitProfile = () => {
            setOpenModalEditProfile(!openModalEditProfile);
      };

      const handleChangeInfoSuccess = (data) => {
            console.log(data);

            setMessage({
                  type: 'success',
                  title: 'Thông báo',
                  message: 'Cập nhật thông tin thành công',
            });

            setTimeout(() => {
                  navigate('/');
            }, 2000);

            dispatch(setMyAccount(data));
            setOpenModalEditProfile(false);
      };

      const handleDeletePost = (post) => {
            setPostDelete(post);
      };

      const handleDeletePostSuccess = () => {
            setMessage({
                  type: 'success',
                  title: 'Thông báo',
                  message: 'Xóa bài viết thành công',
            });

            if (postDelete?.post_id) {
                  reFetchPostData();
            }

            if (postDelete?.video_id) {
                  reFetchVideoData();
            }

            setPostDelete(null);
      };

      useEffect(() => {
            setTimeout(() => {
                  setMessage(null);
            }, 3000);
      }, [message]);

      return (
            <div className="flex flex-col gap-5 mx-auto pt-10 w-3/6 relative">
                  <p className="text-center text-xl font-bold opacity-70">Trang cá nhân</p>
                  <Box
                        sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                              flex: 1,
                              height: '100%',
                              width: '100%',
                              border: '1px solid #dbdbdb',
                              borderRadius: '10px',
                              padding: '25px',
                        }}
                        className="bg-white"
                  >
                        <div>
                              <div className="flex justify-between items-center p-2">
                                    <div className="flex-1">
                                          <Paragraph size="26px" bold="700" color="#000">
                                                {accountByNickName?.full_name}
                                          </Paragraph>
                                          <Paragraph color="rgba(0, 0, 0, 0.8)">
                                                {accountByNickName?.nickname}
                                                {accountByNickName?.tick && <TickIcon />}
                                          </Paragraph>
                                          <Paragraph
                                                color="rgba(0, 0, 0, 0.8)"
                                                style={{
                                                      padding: '15px 0',
                                                }}
                                          >
                                                {accountByNickName?.bio}
                                          </Paragraph>
                                          <Paragraph size="14px" color="rgba(0, 0, 0, 0.8)">
                                                81.4K người theo dõi
                                          </Paragraph>
                                    </div>
                                    <Avatar
                                          src={accountByNickName?.avatar}
                                          alt={accountByNickName?.nickname}
                                          sx={{
                                                width: '100px',
                                                height: '100px',
                                                objectFit: 'cover',
                                          }}
                                    />
                              </div>
                              {accountByNickName?.acc_id === my_account?.acc_id && (
                                    <>
                                          <Box display="flex" gap="20px">
                                                <Button
                                                      large
                                                      style={{
                                                            border: '1px solid #dbdbdb',
                                                            padding: '10px 20px',
                                                            borderRadius: '10px',
                                                            fontSize: '16px',
                                                            fontWeight: '500',
                                                      }}
                                                      onClick={handleToggleModalExitProfile}
                                                >
                                                      Chỉnh sửa trang cá nhân
                                                </Button>
                                                <Button
                                                      large
                                                      style={{
                                                            border: '1px solid #dbdbdb',
                                                            padding: '10px 20px',
                                                            borderRadius: '10px',
                                                            fontSize: '16px',
                                                            fontWeight: '500',
                                                      }}
                                                      onClick={handleToggleModalExitProfile}
                                                >
                                                      Cài đặt
                                                </Button>
                                          </Box>
                                          <Modal open={openModalEditProfile} onClose={() => setOpenModalEditProfile(false)} className="flex items-center justify-between">
                                                <BoxInfoUser onChangeSuccess={handleChangeInfoSuccess} />
                                          </Modal>
                                    </>
                              )}
                              {accountByNickName?.acc_id !== my_account?.acc_id && (
                                    <Box display="flex" justifyContent="space-between" gap="20px">
                                          <RenderWithCondition condition={!get_request_friend_sender?.success && !get_request_friend_receiver?.success && !get_friend}>
                                                <Button
                                                      large
                                                      style={{
                                                            color: 'white',
                                                            border: '1px solid #dbdbdb',
                                                            padding: '10px 20px',
                                                            borderRadius: '10px',
                                                            fontSize: '16px',
                                                            fontWeight: '500',
                                                            backgroundColor: '#000000',
                                                      }}
                                                      onClick={handleSendRequestFriend}
                                                >
                                                      Kết bạn
                                                </Button>
                                          </RenderWithCondition>

                                          <RenderWithCondition
                                                condition={
                                                      get_request_friend_receiver?.sender_id === accountByNickName?.acc_id && get_request_friend_receiver?.status === 'pending'
                                                }
                                          >
                                                <Button
                                                      large
                                                      style={{
                                                            color: 'white',
                                                            border: '1px solid #dbdbdb',
                                                            padding: '10px 20px',
                                                            borderRadius: '10px',
                                                            fontSize: '16px',
                                                            fontWeight: '500',
                                                            backgroundColor: '#000000',
                                                      }}
                                                      onClick={handleConfirmAddFriend}
                                                >
                                                      Đồng ý
                                                </Button>
                                          </RenderWithCondition>
                                          <RenderWithCondition
                                                condition={
                                                      get_request_friend_receiver?.sender_id === accountByNickName?.acc_id && get_request_friend_receiver?.status === 'pending'
                                                }
                                          >
                                                <Button
                                                      large
                                                      style={{
                                                            color: 'white',
                                                            border: '1px solid #dbdbdb',
                                                            padding: '10px 20px',
                                                            borderRadius: '10px',
                                                            fontSize: '16px',
                                                            fontWeight: '500',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                      }}
                                                      onClick={handleRefuseRequestFriend}
                                                >
                                                      Không chấp nhận
                                                </Button>
                                          </RenderWithCondition>

                                          <RenderWithCondition
                                                condition={get_request_friend_sender?.sender_id === my_account?.acc_id && get_request_friend_sender?.status === 'pending'}
                                          >
                                                <Button
                                                      large
                                                      style={{
                                                            color: 'white',
                                                            border: '1px solid #dbdbdb',
                                                            padding: '10px 20px',
                                                            borderRadius: '10px',
                                                            fontSize: '16px',
                                                            fontWeight: '500',
                                                            backgroundColor: '#000000',
                                                      }}
                                                      onClick={handleDeleteRequestFriend}
                                                >
                                                      Hủy lời mời
                                                </Button>
                                          </RenderWithCondition>

                                          <RenderWithCondition condition={get_friend && get_friend?.status === 'friend'}>
                                                <Button
                                                      large
                                                      style={{
                                                            color: 'white',
                                                            border: '1px solid #dbdbdb',
                                                            padding: '10px 20px',
                                                            borderRadius: '10px',
                                                            fontSize: '16px',
                                                            fontWeight: '500',
                                                            backgroundColor: '#000000',
                                                      }}
                                                      onClick={toggleOptionFriend}
                                                >
                                                      Bạn bè
                                                </Button>
                                                <Popper open={openOptionFriend} anchorEl={anchorElOptionFriend}>
                                                      <div className="absolute top-0 left-0 bg-black p-2 rounded-md opacity-85 flex flex-col z-50 min-w-[200px] shadow-lg">
                                                            <button className="text-base px-7 py-2 text-white rounded-md hover:opacity-50" onClick={handleOnChatFriend}>
                                                                  Nhắn tin
                                                            </button>
                                                            <button className="text-base px-7 py-2 text-white rounded-md hover:opacity-50" onClick={handleDeleteFriend}>
                                                                  Huỷ kết bạn
                                                            </button>
                                                            <button className="text-base px-7 py-2 text-white rounded-md hover:opacity-50" onClick={handleDeleteFriend}>
                                                                  Theo dõi
                                                            </button>
                                                      </div>
                                                </Popper>
                                          </RenderWithCondition>

                                          <Button
                                                onClick={handleSendBlockUser}
                                                large
                                                style={{
                                                      border: '1px solid #dbdbdb',
                                                      padding: '10px 20px',
                                                      borderRadius: '10px',
                                                      fontSize: '16px',
                                                      fontWeight: '500',
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                      gap: '10px',
                                                }}
                                          >
                                                Chặn người dùng
                                          </Button>
                                    </Box>
                              )}
                        </div>
                        <div className="py-3 mt-3">
                              <p className="font-bold">Bạn bè</p>
                              <div className="grid grid-cols-3 mt-2 gap-3">
                                    {friends &&
                                          friends.map((friend) => (
                                                <CardUser
                                                      onClick={() => handleClickFriendCard(friend.friend)}
                                                      key={friend?.id}
                                                      nickname={friend?.friend?.nickname}
                                                      name={friend?.friend?.full_name}
                                                      tick={friend?.friend?.tick}
                                                      avatar={friend?.friend?.avatar}
                                                />
                                          ))}
                                    {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                                          <CardUser
                                                onClick={handleClickFriendCard}
                                                key={index}
                                                nickname={'Test21'}
                                                name={'Nguoi dung 21'}
                                                tick={item % 2 || null}
                                                avatar={testImage}
                                          />
                                    ))}
                              </div>
                              <Link
                                    className="text-sm no-underline px-1 block w-full text-center mt-3 hover:underline hover:cursor-pointer"
                                    href={`/${accountByNickName?.nickname}/friends`}
                              >
                                    Xem tất cả
                              </Link>
                        </div>

                        <Tabs
                              value={currentTab}
                              onChange={handleChangeTab}
                              TabIndicatorProps={{
                                    style: {
                                          backgroundColor: '#000',
                                          color: '#000',
                                    },
                              }}
                              sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mt: 2,
                                    mb: 2,
                                    '.MuiTab-root': {
                                          color: 'rgba(0, 0, 0, 0.5)',
                                          flex: 1,
                                    },
                                    '.Mui-selected': {
                                          color: '#000000 !important',
                                    },
                              }}
                        >
                              <Tab label="Bài viết" />
                              <Tab label="Video" />
                              <Tab label="Đã thích" />
                        </Tabs>

                        <TabPanel
                              sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '20px',
                                    
                              }}
                              value={currentTab}
                              index={0}
                        >
                              {!postDataByAccId || postDataByAccId.length === 0 ? (
                                    <p>Chưa có bài viết nào</p>
                              ) : (
                                    postDataByAccId.map((post) => <Post post={post} key={post.post_id} onDeletePost={handleDeletePost} />)
                              )}
                        </TabPanel>
                        <TabPanel value={currentTab} index={1}>
                              {!videoDataByAccId || videoDataByAccId.length === 0 ? (
                                    <p>Chưa có video nào</p>
                              ) : (
                                    videoDataByAccId.map((video) => <Post post={video} key={video.video_id} onDeletePost={handleDeletePost} />)
                              )}
                        </TabPanel>
                        <TabPanel value={currentTab} index={2}>
                              Đã thích
                        </TabPanel>
                  </Box>

                  <Modal open={postDelete}>
                        <DeletePost post={postDelete} onDeletePostSuccess={handleDeletePostSuccess} />
                  </Modal>

                  {message && <Alert type={message.type} title={message.title} message={message.message} />}
            </div>
      );
}

export default Profile;
