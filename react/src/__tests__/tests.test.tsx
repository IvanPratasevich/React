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
import Header from '../structure/header/Header';
import FormPage from '../components/screens/form/Form';
import { server } from '../mocks/server';
import { character } from '../mocks/characters';
import App from '../structure/app/App';
import Modal from '../components/ui/modal/Modal';
import { Provider } from 'react-redux';
import store from '../store';
import { setModal } from '../store/homeSlice';
import homeReducer from '../store/homeSlice';
import { configureStore } from '@reduxjs/toolkit';
import { cyberpunkApi } from '../store/cyberpunkApi';

describe('Testing App component', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('Should show header', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});

describe('Testing pages rendering', () => {
  test('Should render 404 page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </Provider>
    );
    const notFound: HTMLElement = screen.getByTestId('404');
    expect(notFound).toBeVisible();
  });

  test('Should render About Us page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AboutUs />
        </MemoryRouter>
      </Provider>
    );
    const aboutUs: HTMLElement = screen.getByTestId('about-us-header');
    expect(aboutUs).toBeVisible();
  });
});

describe('Testing navigation', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </BrowserRouter>
      </Provider>
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
  afterAll((done) => {
    server.close();
    done();
  });

  test('Should render form', () => {
    render(
      <Provider store={store}>
        <FormPage />{' '}
      </Provider>
    );
    const form: HTMLFormElement = screen.getByTestId('form');
    expect(form).toBeVisible();
  });

  test('Should show error', async () => {
    render(
      <Provider store={store}>
        <FormPage />{' '}
      </Provider>
    );
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

    await act(() => {
      submit.click();
    });

    setTimeout(() => {
      const error = screen.getByTestId('error-image');
      expect(error).toBeVisible();
    }, 0);
  });

  test(`Should render card and show popup with 'Card successfully generated!' text`, async () => {
    render(
      <Provider store={store}>
        <FormPage />{' '}
      </Provider>
    );
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

    await act(() => {
      userEvent.upload(image, file);
      submit.click();
    });

    setTimeout(() => {
      const card: HTMLElement = screen.getByTestId('card');
      const successfull = screen.getByTestId('popup');
      const successfullText = within(successfull).getByText('Card successfully generated!');
      expect(successfullText).not.toBeNull();
      expect(card).toBeInTheDocument();
    }, 0);
  });
});

describe('Testing Home', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('Should render card in Home', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    setTimeout(() => {
      const card: HTMLElement = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
    }, 0);
  });

  test('Should show character modal', async () => {
    const mockStore = configureStore({
      reducer: {
        home: homeReducer,
        [cyberpunkApi.reducerPath]: cyberpunkApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cyberpunkApi.middleware),
    });

    mockStore.dispatch(
      setModal({
        showModal: false,
        card: character,
        loading: false,
      })
    );

    render(
      <Provider store={mockStore}>
        <Modal />
      </Provider>
    );

    setTimeout(() => {
      const name: HTMLElement = screen.getByTestId('V');
      expect(name).toBeInTheDocument();
    }, 0);
  });
});
