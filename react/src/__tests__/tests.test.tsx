import '@testing-library/jest-dom';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotFound from '../components/screens/404/404';
import AboutUs from '../components/screens/about-us/AboutUs';
import Home from '../components/screens/home/Home';
import React from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { capitalizeFirstLetter } from '../utils/utils';
import Header from '../structure/header/Header';
import FormPage from '../components/screens/form/Form';

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
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  });

  test('Inferring the element and checking the link', () => {
    const linkToHomePage: HTMLElement = screen.getByTestId('home');
    expect(linkToHomePage).toBeVisible();
    expect(linkToHomePage).toHaveAttribute('href', '/');
  });

  test('Should go to the Home page', () => {
    const linkToHomePage: HTMLElement = screen.getByTestId('home');
    act(() => {
      linkToHomePage.click();
    });
    expect(location.pathname).toEqual('/');
  });
});

describe('Testing form', () => {
  beforeEach(() => {
    render(<FormPage />);
  });

  test('Should render form', () => {
    const form: HTMLFormElement = screen.getByTestId('form');
    expect(form).toBeVisible();
  });

  test('Should show error', async () => {
    const name: HTMLInputElement = screen.getByTestId('name');
    const surname: HTMLInputElement = screen.getByTestId('surname');
    const date: HTMLInputElement = screen.getByTestId('date');
    const occupation: HTMLSelectElement = screen.getByTestId('occupation');
    const radio: HTMLInputElement = screen.getByTestId('female');
    const checkbox: HTMLInputElement = screen.getByTestId('checkbox');
    const submit: HTMLInputElement = screen.getByTestId('submit');

    name.value = 'Cassandra';
    surname.value = 'Maldonado';
    date.value = '1988-05-07';
    occupation.value = 'Corporate CEO';
    radio.value = 'Female';
    checkbox.value = 'on';

    await userEvent.click(submit);

    const error = screen.getByTestId('error-image');
    const errorText = within(error).getByText('The field is required!');

    expect(errorText).not.toBeNull();
  });

  test('Should render card', () => {
    const name: HTMLInputElement = screen.getByTestId('name');
    const surname: HTMLInputElement = screen.getByTestId('surname');
    const date: HTMLInputElement = screen.getByTestId('date');
    const image: HTMLInputElement = screen.getByTestId('image');
    const occupation: HTMLSelectElement = screen.getByTestId('occupation');
    const radio: HTMLInputElement = screen.getByTestId('female');
    const checkbox: HTMLInputElement = screen.getByTestId('checkbox');
    const submit: HTMLInputElement = screen.getByTestId('submit');

    const file: File = new File(['hello'], 'hello.png', { type: 'image/png' });
    name.value = 'Cassandra';
    surname.value = 'Maldonado';
    date.value = '1988-05-07';
    occupation.value = 'Corporate CEO';
    radio.value = 'Female';
    checkbox.value = 'on';
    userEvent.upload(image, file);

    submit.click();

    setTimeout(() => {
      const card: HTMLElement = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
    }, 0);
  });

  test('Should show popup', () => {
    const name: HTMLInputElement = screen.getByTestId('name');
    const surname: HTMLInputElement = screen.getByTestId('surname');
    const date: HTMLInputElement = screen.getByTestId('date');
    const image: HTMLInputElement = screen.getByTestId('image');
    const occupation: HTMLSelectElement = screen.getByTestId('occupation');
    const radio: HTMLInputElement = screen.getByTestId('female');
    const checkbox: HTMLInputElement = screen.getByTestId('checkbox');
    const submit: HTMLInputElement = screen.getByTestId('submit');

    const file: File = new File(['hello'], 'hello.png', { type: 'image/png' });
    name.value = 'Cassandra';
    surname.value = 'Maldonado';
    date.value = '1988-05-07';
    occupation.value = 'Corporate CEO';
    radio.value = 'Female';
    checkbox.value = 'on';
    userEvent.upload(image, file);

    submit.click();

    const successfull = screen.getByTestId('popup');
    const successfullText = within(successfull).getByText('Card successfully generated!');
    expect(successfullText).not.toBeNull();
  });
});
