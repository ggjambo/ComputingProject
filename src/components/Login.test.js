import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login component', () => {
  it('renders without errors', () => {
    render(<Login />);
    const loginPageElement = screen.getByTestId('login-page');
    expect(loginPageElement).toBeInTheDocument();
  });

  it('has a Google sign-in button', () => {
    render(<Login />);
    const googleButton = screen.getByRole('button', { name: /sign in \/ up with google/i });
    expect(googleButton).toBeInTheDocument();
  });

  it('can sign in with Google when the button is clicked', () => {
    const mockSignInWithRedirect = jest.fn();
    jest.spyOn(require('firebase/compat/app'), 'auth').mockReturnValue({
      signInWithRedirect: mockSignInWithRedirect,
    });

    render(<Login />);
    const googleButton = screen.getByRole('button', { name: /sign in \/ up with google/i });
    userEvent.click(googleButton);

    expect(mockSignInWithRedirect).toHaveBeenCalled();
  });
});
