import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAuthMe } from "../../redux/slice/account.slice";

function Home() {
    const { status, data } = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if(accessToken) {
            dispatch(fetchAuthMe());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate]);

    return (
        <div>
            {status === 'loading' && <div>Loading...</div>}
            {data.account && <h1>Welcome, {data?.account?.nickname}</h1>}
            {status === 'failed' && <div>Failed to fetch authMe</div>}
        </div>
    )



}

export default Home;
