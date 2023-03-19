import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/404/404';
import AboutUs from '../components/about-us/AboutUs';
import Home from '../components/screens/home/Home';
import React from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import capitalizeFirstLetter from '../utils/utils';

describe('Testing utils', () => {
  test('Should capitalize first letter', () => {
    expect(capitalizeFirstLetter('test')).toBe('Test');
    expect(capitalizeFirstLetter('cat')).toBe('Cat');
    expect(capitalizeFirstLetter('dOG')).toBe('DOG');
  });
});

describe('Testing navigation', () => {
  beforeEach(() => {
    render(
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  });

  beforeEach(() => {
    window.location = { ...window.location, href: '' };
  });

  test('Inferring the element and checking the link', () => {
    const linkToHomePage = screen.getByTestId('home');
    expect(linkToHomePage).toBeVisible();
    expect(linkToHomePage).toHaveAttribute('href', '/');
  });

  test('Inferring the element and checking the link', () => {
    const linkToHomePage = screen.getByTestId('home');
    expect(linkToHomePage).toBeVisible();
    expect(linkToHomePage).toHaveAttribute('href', '/');
  });

  test('Should go to the Home page', () => {
    const linkToHomePage = screen.getByTestId('home');
    linkToHomePage.click();
    expect(location.pathname).toEqual('/');
  });
});
