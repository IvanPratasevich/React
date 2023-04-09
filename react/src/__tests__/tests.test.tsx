import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotFound from '../components/screens/404/404';
import AboutUs from '../components/screens/about-us/AboutUs';
import Home from '../components/screens/home/Home';
import React from 'react';
import { Routes, Route, MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Api, capitalizeFirstLetter } from '../utils/utils';
import Header from '../structure/header/Header';
import FormPage from '../components/screens/form/Form';
import { server } from '../mocks/server';
import { character, characters } from '../mocks/characters';
import { errorHandlers, handlers } from '../mocks/handlers';
import gif from '../mocks/gif';
import App from '../structure/app/App';

describe('Testing utils', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('Should capitalize first letter', () => {
    expect(capitalizeFirstLetter('test')).toBe('Test');
    expect(capitalizeFirstLetter('cat')).toBe('Cat');
    expect(capitalizeFirstLetter('dOG')).toBe('DOG');
  });

  test('Should capitalize first letter', () => {
    expect(capitalizeFirstLetter('test')).toBe('Test');
    expect(capitalizeFirstLetter('cat')).toBe('Cat');
    expect(capitalizeFirstLetter('dOG')).toBe('DOG');
  });

  test('Should return all characters', async () => {
    const api = new Api();

    const response = await api.getCharacters('');

    expect(response).toEqual(characters);
  });

  test('Should return character by id', async () => {
    const api = new Api();

    const response = await api.getCharacterById('2');

    expect(response).toEqual(character);
  });

  test('Should return server error (request by id)', async () => {
    try {
      server.use(...errorHandlers);
      const api = new Api();
      await api.getCharacterById('2');
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Internal Server Error');
      }
    }
  });

  test('Should return server error', async () => {
    try {
      server.use(...errorHandlers);
      const api = new Api();
      await api.getCharacters('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Internal Server Error');
      }
    }
  });

  test('Should return gif', async () => {
    const api = new Api();

    const response = await api.getGifs('cyberpunk2077');

    expect(response).toEqual(gif);
  });

  test('Should return server (giphy) error', async () => {
    try {
      server.use(...errorHandlers);
      const api = new Api();
      await api.getGifs('cyberpunk2077');
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Internal Server Error');
      }
    }
  });
});

describe('Testing App component', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('Should show header', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});

describe('Testing navigation', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

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
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('Should render form', () => {
    render(<FormPage />);
    const form: HTMLFormElement = screen.getByTestId('form');
    expect(form).toBeVisible();
  });

  test('Should show error', async () => {
    render(<FormPage />);
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

  test('Should render card', async () => {
    server.use(...handlers);
    render(<FormPage />);
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
    render(<FormPage />);
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

  describe('Testing Home', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('Should render card in Home', async () => {
      server.use(...handlers);
      render(
        <React.StrictMode>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </React.StrictMode>
      );

      setTimeout(() => {
        const card: HTMLElement = screen.getByTestId('card');
        expect(card).toBeInTheDocument();
      }, 0);
    });
  });
});
