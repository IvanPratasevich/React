import NotFound from '../../components/screens/404/404';
import AboutUs from '../../components/screens/about-us/AboutUs';
import Header from '../header/Header';
import Home from '../../components/screens/home/Home';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Form from '../../components/screens/form/Form';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </>
  );
};

export default App;
