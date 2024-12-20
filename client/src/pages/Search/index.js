import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paragraph from '../../components/Paragraph';
import { Box, Divider } from '@mui/material';
import Input from '../../components/Input';

import { SearchIcon } from '../../components/SgvIcon';
import Loading from '../../components/Loading';
import CardUser from '../../components/CardUser';
import Button from '../../components/Button';
import useDebounce from '../../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { accountService } from '../../services/AccountService';
import RenderWithCondition from '../../components/RenderWithCondition';

function Search() {
      const [searchValue, setSearchValue] = useState('');
      const navigate = useNavigate();
      const scrollContainerRef = useRef(null);

      const debounceValue = useDebounce(searchValue, 700);

      const HandleOnChangeInputSearch = (e) => {
            setSearchValue(e.target.value);
      };
      const handleOnClickAccount = (account) => {
            navigate(`/profile/${account.nickname}`);
      };

      const {
            data: accountData,
            isFetchingNextPage: isFetchingAccounts,
            fetchNextPage: fetchAccountsNextPage,
            hasNextPage: hasNextAccounts,
            refetch: refetchAccounts,
      } = useInfiniteQuery({
            queryKey: ['search-account'],
            queryFn: ({ pageParam = 1 }) => accountService.findAccountByP(debounceValue, pageParam, 20),
            getNextPageParam: (lastPage, allPages) => {
                  const currentPage = allPages.length;
                  const totalPages = lastPage.totalPages;
                  return currentPage < totalPages ? currentPage + 1 : undefined;
            },
      });

      const handleScroll = useCallback(() => {
            if (!scrollContainerRef.current || isFetchingAccounts || !hasNextAccounts) return;

            console.log("scrolling");
            
            const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
            if (scrollHeight - scrollTop <= clientHeight + 50) {
                  fetchAccountsNextPage();
            }
      }, [isFetchingAccounts, hasNextAccounts, fetchAccountsNextPage]);

      useEffect(() => {
            const scrollContainer = scrollContainerRef.current;
            if (scrollContainer) {
                  scrollContainer.addEventListener('scroll', handleScroll);
            }
            return () => {
                  if (scrollContainer) {
                        scrollContainer.removeEventListener('scroll', handleScroll);
                  }
            };
      }, [handleScroll]);

      useEffect(() => {
            if (debounceValue) {
                  refetchAccounts();
            }
            if(debounceValue === ''){
                  refetchAccounts();
            }
      }, [debounceValue, accountData]);

      return (
            <div className="flex flex-col w-1/2 min-h-full mx-auto p-10 gap-5 h-screen overflow-y-auto">
                  <p className="text-center text-xl font-bold">Tìm kiếm</p>
                  <div ref={scrollContainerRef} className="h-full w-full flex flex-col bg-white border border-solid border-gray-300 rounded-lg overflow-y-auto shadow-xl">
                        <div className="flex flex-col flex-1 mt-7 mx-auto w-full px-10">
                              <Input
                                    onChange={HandleOnChangeInputSearch}
                                    value={searchValue}
                                    placeholder="Tìm kiếm "
                                    leftIcon={<SearchIcon size={20} />}
                                    styles={{
                                          margin: '30px 0 15px 0',
                                    }}
                              />
                              <p className="font-bold text-sm opacity-85 py-3">Gợi ý người dùng</p>
                              <div className="flex-1 mt-2 flex flex-col gap-2">
                                    <RenderWithCondition condition={isFetchingAccounts}>
                                          <Loading />
                                    </RenderWithCondition>
                                    <RenderWithCondition condition={accountData?.pages}>
                                          {accountData?.pages?.map((page) =>
                                                page.data.map((account) => (
                                                      <div key={account?.acc_id} className="flex flex-col cursor-pointer">
                                                            <div className="flex justify-between items-center w-full">
                                                                  <CardUser
                                                                        onClick={() => handleOnClickAccount(account)}
                                                                        nickname={account?.nickname}
                                                                        name={account?.full_name}
                                                                        avatar={account?.avatar}
                                                                        tick={account?.tick}
                                                                  />
                                                                  <Button primary small>
                                                                        Theo dõi
                                                                  </Button>
                                                            </div>
                                                            <Divider />
                                                      </div>
                                                )),
                                          ) || <p>No acccounts to display</p>}
                                    </RenderWithCondition>
                                    <RenderWithCondition condition={accountData?.pages[0]?.total_record === 0 && !isFetchingAccounts}>
                                          <p className="text-base opacity-85">Không tìm thấy tài khoản {searchValue}</p>
                                    </RenderWithCondition>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default Search;
