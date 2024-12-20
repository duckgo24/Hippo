import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import './fonts/index.css';
import { myRoutes } from './routes';
import DefaultLayout from './components/layout/DefaultLayout';
import NotificationListener from './components/NotificationListenter';
import { useSelector } from 'react-redux';

function App() {
    const { my_account } = useSelector((state) => state.account);

    return (
        <Router>
            <NotificationListener userId={my_account?.acc_id} />
            <Routes>
                {myRoutes.map((route, index) => {
                    const Page = route.component;
                    const Layout = route.isShowNavigate ? DefaultLayout : Fragment;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
