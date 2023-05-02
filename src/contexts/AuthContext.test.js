import React from 'react';
import { render } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

describe('AuthContext', () => {
  test('AuthProvider should render children', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <div data-testid="test-child" />
      </AuthProvider>
    );
    expect(getByTestId('test-child')).toBeInTheDocument();
  });

  test('useAuth should return user object', () => {
    const TestComponent = () => {
      const { user } = useAuth();
      return <div data-testid="test-user">{user}</div>;
    };
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(getByTestId('test-user')).toBeInTheDocument();
  });
});
