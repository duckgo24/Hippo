
import React from 'react';
import { GoogleOAuthProvider, googleLogout, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OAuthGoogle() {

    const login = useGoogleLogin({
        clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
        onSuccess: async (response) => {
            const { token } = response;
            const { email, name, picture } = jwtDecode(token);
            const res = await axios.post('http://localhost:3001/api/v1/auth/login', {
                email,
                name,
                picture
            });
        },
        onFail: (error) => {
            console.log(error);
        }
    });

    return (

        <button onClick={() => login()
        }> Login with Google</button >

    );




}

export default OAuthGoogle;