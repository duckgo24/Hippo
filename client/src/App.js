
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import './fonts/index.css';
import { myRoutes } from './routes';
import DefaultLayout from './components/layout/DefaultLayout';


function App() {
  return (
    <Router>
      <Routes>
        {myRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = route.isShowNavigate ? DefaultLayout : Fragment
          return <Route key={index} path={route.path} element={<Layout> <Page /> </Layout>} />
        })}
      </Routes>
    </Router>

  );
}

export default App;