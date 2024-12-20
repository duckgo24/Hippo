import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

function fetchRefreshToken(token) {
      return new Promise(async (resolve, reject) => {
            try {
                  const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
                        headers: {
                              refresh_cookie: token,
                        },
                        withCredentials: true,
                  });
                  resolve(res.data);
            } catch (error) {
                  console.error(error);
                  reject(error);
            }
      });
}

function createAxiosJwtInstance() {
      const axiosJWT = axios.create();
      axiosJWT.interceptors.request.use(
            async (config) => {
                  const accessToken = Cookies.get('access_token');
                  const refresh_token = Cookies.get('refresh_token');
                  
                  if (!accessToken) {
                        if (refresh_token) {
                              const res = await fetchRefreshToken(refresh_token);
                              if (res) {
                                    Cookies.set('access_token', res.access_token);
                                    config.headers.Authorization = `Bearer ${res.access_token}`;
                              }
                        }
                  }

                  const decodedToken = jwtDecode(accessToken);
                  if (decodedToken.exp < new Date().getTime() / 1000) {
                        const res = await fetchRefreshToken(refresh_token);
                        if (res) {
                              Cookies.set('access_token', res.access_token);
                              config.headers.Authorization = `Bearer ${res.access_token}`;
                        }
                  } else {
                        config.headers.Authorization = `Bearer ${accessToken}`;
                  }
                  return config;
            },
            (err) => {
                  console.error('Request failed due to a network error', err);
                  return Promise.reject(err);
            },
      );

      return axiosJWT;
}

const axiosJWT = createAxiosJwtInstance();

export default axiosJWT;
