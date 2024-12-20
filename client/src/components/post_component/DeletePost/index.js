import React, { forwardRef } from 'react';
import useHookMutation from '../../../hooks/useHookMutation';
import { postService } from '../../../services/PostService';
import { videoService } from '../../../services/VideoService';
import Loader from '../../Loader';

const DeletePost = forwardRef(({ post, onDeletePostSuccess }, ref) => {
      const deletePostMutation = useHookMutation((post) => {
            if (post?.post_id) {
                  return postService.deletePost(post?.post_id);
            }

            if (post?.video_id) {
                  return videoService.deleteVideo(post?.video_id);
            }
      });

      const { isPending: isFetchDeletePostLoading } = deletePostMutation;

      const handleDeletePost = () => {
            deletePostMutation.mutate(post, {
                  onSuccess: () => {
                        onDeletePostSuccess();
                  },
            });
      };

      return (
            <div className="h-screen w-full flex items-center justify-center">
                  <div className="w-[600px] h-auto bg-white p-5 rounded-lg">
                        <div className="flex items-center gap-2">
                              <p>Xác nhận xóa bài đăng với nội dung: </p>
                              <p className="font-semibold italic">{post?.title}</p>
                        </div>
                        <div className="flex justify-end gap-4">
                              <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-base px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                                    Hủy
                              </button>
                              <button
                                    disabled={isFetchDeletePostLoading}
                                    onClick={handleDeletePost}
                                    className={`relative text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-base px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 
                                        ${isFetchDeletePostLoading && 'opacity-45'}`}
                              >
                                    OK
                                    {isFetchDeletePostLoading && <Loader size={30} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                              </button>
                        </div>
                  </div>
            </div>
      );
});

export default DeletePost;
