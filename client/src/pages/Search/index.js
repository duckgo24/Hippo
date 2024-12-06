import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paragraph from "../../components/Paragraph";
import { Box, Divider } from "@mui/material";
import Input from "../../components/Input";

import { SearchIcon } from "../../components/SgvIcon";
import Loading from "../../components/Loading";
import CardUser from "../../components/CardUser";
import Button from "../../components/Button";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { accountService } from "../../services/AccountService";
import RenderWithCondition from "../../components/RenderWithCondition";
import { setFitlerAccounts } from "../../redux/slice/account.slice";


function Search() {
    const { filter_accounts } = useSelector(state => state.account);
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const debounceValue = useDebounce(searchValue, 700);


    const HandleOnChangeInputSearch = (e) => {
        setSearchValue(e.target.value);
    }
    const handleOnClickAccount = (account) => {
        navigate(`/profile/${account.nickname}`);
    }

    const { data: accountFindResult, isLoading: isFindAccountLoading, isSuccess: isFindAccountSuccess, isError: isFindAccountError } = useQuery({
        queryKey: ['find-account', debounceValue],
        queryFn: () => accountService.findAccountByP(debounceValue),
        enabled: !!debounceValue
    })

    const { data: accountSuggest, isSuccess: isFetchAccountSuggestSuccess } = useQuery({
        queryKey: ['suggest-account', !!!debounceValue],
        queryFn: accountService.getAccountSuggest,
        enabled: !!!debounceValue
    })


    useEffect(() => {
        if (isFindAccountSuccess) {
            dispatch(setFitlerAccounts(accountFindResult));
        }
        if (!debounceValue && isFetchAccountSuggestSuccess) {
            dispatch(setFitlerAccounts(accountSuggest));
        }

        if (isFindAccountError) {
            dispatch(setFitlerAccounts([]));
        }

        console.log(filter_accounts);

    }, [debounceValue, isFindAccountSuccess, isFetchAccountSuggestSuccess, isFindAccountError]);


    return (
        <div className="flex flex-col w-1/2 min-h-full mx-auto p-10 gap-5">
            <p className="text-center text-xl font-bold">Tìm kiếm</p>
            <Box
                sx={{
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    flex: 1,
                    height: "100%",
                    width: "100%",
                    border: "1px solid #dbdbdb",
                    borderRadius: "10px"
                }}
                display="flex"
                flexDirection="column"
                bgcolor="white"
            >
                <div className="flex flex-col flex-1 mt-7 mx-auto w-full px-10" >
                    <Input
                        onChange={HandleOnChangeInputSearch}
                        value={searchValue}
                        placeholder="Tìm kiếm "
                        leftIcon={<SearchIcon size={20} />}
                        styles={{
                            margin: "30px 0 15px 0"
                        }} />
                    <Paragraph bold="700" size="14px" color="rgba(0, 0, 0, 0.7)">
                        Gợi ý người dùng
                    </Paragraph>
                    <Box
                        flex={1}
                        mt={2}
                        display="flex"
                        flexDirection="column"
                        gap="10px"
                    >
                        <RenderWithCondition condition={isFindAccountLoading}>
                            <Loading />
                        </RenderWithCondition>
                        <RenderWithCondition condition={filter_accounts && filter_accounts.length > 0 && !isFindAccountLoading}>
                            {filter_accounts && filter_accounts.length > 0 && filter_accounts.map((account) => (
                                <div key={account?.acc_id} className="flex flex-col cursor-pointer">
                                    <div className="flex justify-between items-center w-full">
                                        <CardUser onClick={() => handleOnClickAccount(account)} nickname={account?.nickname} name={account?.full_name} avatar={account?.avatar} tick={account?.tick} />
                                        <Button primary small>
                                            Theo dõi
                                        </Button>
                                    </div>
                                    <Paragraph
                                        size="14px"
                                        color="#000"
                                        style={{
                                            marginLeft: "50px",
                                            padding: "5px 0 10px 0",
                                        }}
                                    >
                                        81,3K người theo dõi
                                    </Paragraph>
                                    <Divider />
                                </div>
                            ))}
                        </RenderWithCondition>

                        <RenderWithCondition condition={filter_accounts.length === 0 && !isFindAccountLoading}>
                            <Paragraph size="14px" color="rgba(0, 0, 0, 0.7)">Không tìm thấy tài khoản {searchValue}</Paragraph>
                        </RenderWithCondition>

                    </Box>

                </div>
            </Box>
        </div>
    );
}

export default Search;
