import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAuthMe } from "../../redux/slice/account.slice";

function Home() {
    const { status, data } = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            dispatch(fetchAuthMe(token));
        } else {
            navigate('/login');
        }
    }, [navigate, dispatch]);

    return (
        <div>
            {status === 'loading' ? (
                <h1>Loading...</h1>
            ) : (
                data && <div>
                    <h1>Xin chào {data.account.nickname}</h1>
                    <button>Logout</button>
                </div>
            )}
        </div>
    );
}

export default Home;
