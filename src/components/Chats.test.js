import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Chats from './Chats';

const mockUser = {
  email: 'ggjambo@gmail.com',
  uid: 'ce057a44-d96a-4a92-a1a9-d382487e3ac8',
};

jest.mock('../firebase', () => ({
  auth: {
    signOut: jest.fn(),
  },
}));

describe('Chats', () => {
  it('renders chats page', async () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user: mockUser }}>
          <Chats />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Wait for the loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });

    // Expect the navbar to be rendered
    expect(screen.getByText(/ShadeStack/i)).toBeInTheDocument();
    expect(screen.getByText(/Feed/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();

    // Expect the search input and button to be rendered
    expect(screen.getByLabelText(/search for user/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search for user/i })).toBeInTheDocument();

    // Expect the block user search input and button to be rendered
    expect(screen.getByLabelText(/search user to block/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search user to block/i })).toBeInTheDocument();
  });
});
