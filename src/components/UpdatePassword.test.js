import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import UpdatePassword from './UpdatePassword';

describe('UpdatePassword', () => {
  const setup = () => {
    return render(
      <Router>
        <AuthProvider>
          <UpdatePassword />
        </AuthProvider>
      </Router>
    );
  };

  it('should render without errors', () => {
    const { getByText, getByLabelText } = setup();

    expect(getByText('Update Password')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(getByText('Update Password')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('should show error message if passwords do not match', async () => {
    const { getByLabelText, getByText } = setup();
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');
    const submitButton = getByText('Update Password');

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'notmatching' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('should show error message if update fails', async () => {
    const mockUpdatePassword = jest.fn(() => {
      return Promise.reject();
    });

    const { getByLabelText, getByText } = render(
      <Router>
        <AuthProvider value={{ currentUser: {}, updatePassword: mockUpdatePassword }}>
          <UpdatePassword />
        </AuthProvider>
      </Router>
    );

    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');
    const submitButton = getByText('Update Password');

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(getByText('Failed to update account')).toBeInTheDocument();
  });

  it('should update password successfully', async () => {
    const mockUpdatePassword = jest.fn(() => {
      return Promise.resolve();
    });

    const { getByLabelText, getByText, history } = render(
      <Router>
        <AuthProvider value={{ currentUser: {}, updatePassword: mockUpdatePassword }}>
          <UpdatePassword />
        </AuthProvider>
      </Router>
    );

    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');
    const submitButton = getByText('Update Password');

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockUpdatePassword).toHaveBeenCalled();
    expect(history.location.pathname).toBe('/');
  });
});
