import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";

import Paragraph from "../../components/Paragraph";
import { Box, Divider } from "@mui/material";
import Input from "../../components/Input";

import styles from "./Search.module.scss";
import { SearchIcon } from "../../components/SgvIcon";
import { fetchSearchAccounts, fetchSuggestAccounts } from "../../redux/slice/account.slice";
import Loading from "../../components/Loading";
import CardUser from "../../components/CardUser";
import Button from "../../components/Button";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile";

const cx = classNames.bind(styles);

function Search() {
    const { filter_accounts, status_account } = useSelector(state => state.account);
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const debounceValue = useDebounce(searchValue, 500);


    const HandleOnChangeInputSearch = (e) => {
        setSearchValue(e.target.value);
    }
    const handleOnClickAccount = (account) => {
        navigate(`/profile/${account.nickname}`, {state: {
            account
        }});
    }


    useEffect(() => {
        if (debounceValue) {
            dispatch(fetchSearchAccounts(debounceValue));
        }
        if (!debounceValue) {
            dispatch(fetchSuggestAccounts());
        }
    }, [debounceValue, dispatch]);


    return (
        <Box
            display="flex"
            flexDirection="column"
            width="50%"
            minHeight="100%"
            margin="auto"
            padding="40px 0 0 0"
            gap="20px"
        >
            <Paragraph
                size="20px"
                bold="700"
                style={{
                    justifyContent: "center"
                }}>
                Tìm kiếm
            </Paragraph>
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
            >
                <Box
                    sx={{
                        width: "90%",
                        margin: "30px auto 0 auto",
                    }}
                    display="flex"
                    flexDirection="column"
                    flex={1}
                >
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
                        {status_account === "loading"
                            ?
                            <Loading />
                            :
                            filter_accounts.length > 0
                                ?
                                filter_accounts.map((account) => (
                                    <div
                                        key={account?.id}
                                        style={{
                                            display: "flex",
                                            cursor: "pointer",
                                            flexDirection: "column"
                                        }}
                                        

                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                width: "100%",
                                            }}
                                            
                                        >
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
                                ))
                                :
                                <Paragraph size="14px" color="rgba(0, 0, 0, 0.7)">Không tìm thấy tài khoản "{searchValue}"</Paragraph>

                        }
                    </Box>

                </Box>
            </Box>
        </Box>
    );
}

export default Search;
