import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/screens/home/Home';
import './styles/index.css';
import './styles/normalize.css';
import './styles/fonts.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/404/404';
import AboutUs from './components/about-us/AboutUs';
import Header from './components/header/Header';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
