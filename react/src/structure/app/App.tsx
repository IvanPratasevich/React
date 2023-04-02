import NotFound from '../../components/screens/404/404';
import AboutUs from '../../components/screens/about-us/AboutUs';
import Header from '../header/Header';
import Home from '../../components/screens/home/Home';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import Form from '../../components/screens/form/Form';
import RedirectToPage from '../../components/helpers/helpers';

const App = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '*', element: <RedirectToPage path={'/404'} /> },
    { path: '/404', element: <NotFound /> },
    { path: '/about-us', element: <AboutUs /> },
    { path: '/form', element: <Form /> },
  ]);

  return (
    <>
      <Header />
      {routes}
    </>
  );
};

export default App;
