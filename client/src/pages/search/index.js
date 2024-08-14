import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGetAllAccounts } from "../../redux/slice/account.slice";
import CardUser from "../../components/CardUser";
import Paragraph from "../../components/paragraph";
import { Box } from "@mui/material";
import Button from "../../components/Button";

function Search() {
    const { status, data, accounts } = useSelector((state) => state.account);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchGetAllAccounts());

    }, [dispatch]);

    return (
        <Box display='flex'
            flexDirection='column'
            height='100vh'
            width='35%'
            margin='auto'
            padding='20px'>
            {status === 'failed'
                &&
                <div>
                    Something went wrong!
                    <Link to='/login'>Please log in again</Link>.
                </div>
            }

            {data.account
                &&
                <>
                    <Paragraph text='Gợi ý của bạn' bold='700' style={{
                        padding: '20px 0',
                    }} />
                    
                    <Box
                        display='flex'
                        flexDirection='column'
                        gap='10px'
                    >
                        {accounts && accounts.length > 0 && accounts.map((acc, idx) => (
                            <Box
                                display='flex'
                                justifyContent='space-between'
                                key={idx}

                            >
                                <CardUser name={acc?.nickname} nickname={acc?.nickname} avatar={acc?.avatar} tick={acc?.tick} />
                                <Button primary small style={{
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>Theo dõi</Button>
                            </Box>
                        ))}
                    </Box>
                </>
            }
        </Box>
    )
}

export default Home;
