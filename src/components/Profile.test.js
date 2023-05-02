import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Profile from './Profile';
import { AuthProvider } from '../contexts/AuthContext';
import { auth } from '../firebase';

jest.mock('../firebase', () => ({
  auth: {
    signOut: jest.fn(),
  },
}));

jest.mock('../helpers/updateUser', () => ({
  updateUser: jest.fn(),
}));

const mockUser = {
  uid: 'ce057a44-d96a-4a92-a1a9-d382487e3ac8',
  displayName: 'Test User',
  email: 'ggjambo@gmail.com',
};

const setup = () => {
  return render(
    <MemoryRouter>
      <AuthProvider currentUser={mockUser}>
        <Profile />
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('Profile', () => {
  it('displays user info and logout button', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('testuser@example.com')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });
  });

  it('logs out the user when Logout button is clicked', async () => {
    setup();

    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => {
      expect(auth.signOut).toHaveBeenCalled();
    });
  });

  it('navigates to Update Password page when Change Password button is clicked', async () => {
    const history = createMemoryHistory();
    setup();

    fireEvent.click(screen.getByText('Change Password'));

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/update-password');
    });
  });

  it('updates user avatar when Update Avatar button is clicked and file is selected', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    setup();

    fireEvent.change(screen.getByLabelText('Update Avatar'), { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('Updating...')).toBeInTheDocument();
      expect(updateUser).toHaveBeenCalledWith('1234', file);
      expect(screen.getByText('Update Avatar')).toBeInTheDocument();
    });
  });
});
