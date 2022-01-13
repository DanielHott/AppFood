import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './tests/History';

const userFormat = { email: 'email@email.com' }

describe('Verifica tela de login', () => {
  it('Será validado se ao navegar para a rota /, os inputs e o botão especificados estão presentes',
   () => {
    const { history } = renderWithRouter(<App />)
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });

it('Será validado se o usuário pode digitar email',
  async () => {
    const { history } = renderWithRouter(<App />)

    const loginNameInput = screen.getByTestId('email-input');
    userEvent.type((loginNameInput), 'email');
    expect(loginNameInput.value).toBe('email');
  });

it('Será validado se o usuário pode digitar senha',
  async () => {
    const { history } = renderWithRouter(<App />)

    const loginPasswordInput = screen.getByTestId('password-input');
    userEvent.type((loginPasswordInput), 'password');
    expect(loginPasswordInput.value).toBe('password');
  });

it('Será validado se o botão está desativado',
  async () => {
    const { history } = renderWithRouter(<App />)

    const loginNameInput = screen.getByTestId('email-input');
    userEvent.type((loginNameInput), 'email');

    const loginPasswordInput = screen.getByTestId('password-input');
    userEvent.type((loginPasswordInput), 'password');

    const loginSubmitButton = screen.getByTestId('login-submit-btn');
    expect(loginSubmitButton).toBeDisabled();
  });


it('Será validado se o botão está ativado',
  async () => {
    const { history } = renderWithRouter(<App />)

    const loginNameInput = screen.getByTestId('email-input');
    userEvent.type((loginNameInput), 'email@email.com');

    const loginPasswordInput = screen.getByTestId('password-input');
    userEvent.type((loginPasswordInput), '12345678');

    const loginSubmitButton = screen.getByTestId('login-submit-btn');
    expect(loginSubmitButton).toBeEnabled();
  });

it('Será validado se o botão está ativado',
  async () => {
    const { history } = renderWithRouter(<App />)

    const loginNameInput = screen.getByTestId('email-input');
    userEvent.type((loginNameInput), 'email@email.com');

    const loginPasswordInput = screen.getByTestId('password-input');
    userEvent.type((loginPasswordInput), '12345');

    const loginSubmitButton = screen.getByTestId('login-submit-btn');
    expect(loginSubmitButton).toBeDisabled();
  });

it('Será validado se o usuário pode digitar senha',
  async () => {
    const { history } = renderWithRouter(<App />)

    const loginNameInput = screen.getByTestId('email-input');
    userEvent.type((loginNameInput), 'email@email.com');

    const loginPasswordInput = screen.getByTestId('password-input');
    userEvent.type((loginPasswordInput), '12345678');

    const loginSubmitButton = screen.getByTestId('login-submit-btn');
    userEvent.click((loginSubmitButton));

    const actLocalStorage = localStorage.getItem('user');
    const localStorageObj = JSON.parse(actLocalStorage);
    expect(localStorageObj).toStrictEqual(userFormat);
  });
})
