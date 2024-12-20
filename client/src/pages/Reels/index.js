import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Reel from '../../components/Reel';
import RenderWithCondition from '../../components/RenderWithCondition';
import { useInfiniteQuery } from '@tanstack/react-query';
import { videoService } from '../../services/VideoService';
import Loader from '../../components/Loader';

function Reels() {
      const { my_account } = useSelector((state) => state.account);
      const [currentReelRef, setCurrentReelRef] = useState(null);
      const [currentOpenReelId, setCurrentOpenReelId] = useState(null);
      const dispatch = useDispatch();

      const loadMoreRef = useRef();

      const {
            data: videosData,
            isFetchingNextPage: isFetchingVideos,
            fetchNextPage: fetchVideosNextPage,
            hasNextPage: hasNextVideos,
      } = useInfiniteQuery({
            queryKey: ['get-video-with-pagination'],
            queryFn: ({ pageParam = 1 }) => videoService.getVideoWithPagination(pageParam, 2),
            getNextPageParam: (lastPage, allPages) => {
                  const currentPage = allPages.length;
                  const totalPages = lastPage.totalPages;
                  return currentPage < totalPages ? currentPage + 1 : undefined;
            },
            enabled: !!my_account?.acc_id,
      });

      const handleReelInView = (reelRef) => {
            if (currentReelRef && currentReelRef.current !== reelRef.current) {
                  currentReelRef.current.pause();
            }
            setCurrentReelRef(reelRef);

            if (reelRef.current) {
                  reelRef.current.play();
            }
      };

      const onToggleComments = (reelId) => {
            setCurrentOpenReelId((prevReelId) => (prevReelId === reelId ? null : reelId));
      };

      useEffect(() => {
            const observer = new IntersectionObserver(
                  (entries) => {
                        if (entries[0].isIntersecting && hasNextVideos) {
                              fetchVideosNextPage();
                        }
                  },
                  { root: null, threshold: 1.0 },
            );

            if (loadMoreRef.current) {
                  observer.observe(loadMoreRef.current);
            }

            return () => {
                  if (loadMoreRef.current) {
                        observer.unobserve(loadMoreRef.current);
                  }
            };
      }, [hasNextVideos, fetchVideosNextPage]);

      return (
            <div className="flex flex-col items-center gap-8 mx-auto overflow-scroll h-screen">
                  <RenderWithCondition condition={videosData?.pages}>
                        {videosData?.pages?.map((page) =>
                              page.videos.map((video) => (
                                    <Reel
                                          key={video?.video_id}
                                          reel={video}
                                          onReelInView={handleReelInView}
                                          currentOpenReel={currentOpenReelId}
                                          onToggleComments={onToggleComments}
                                    />
                              )),
                        ) || <p>No videos to display</p>}
                  </RenderWithCondition>

                  <div ref={loadMoreRef} className="w-full h-10 flex items-center justify-center">
                        {isFetchingVideos ? <Loader size={30} /> : hasNextVideos ? <p>Scroll down to load more</p> : <p>No more videos</p>}
                  </div>
            </div>
      );
}

export default Reels;
