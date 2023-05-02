import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Feed from './Feed';

describe('Feed component', () => {
  it('should render Feed component', () => {
    render(
      <MemoryRouter>
        <Feed />
      </MemoryRouter>
    );

    //Expect feed to be rendered
    expect(screen.getByText('ShadeStack')).toBeInTheDocument();
    expect(screen.getByText('Feed')).toBeInTheDocument();
    expect(screen.getByTestId('chat-engine-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('chat-socket')).toBeInTheDocument();
    expect(screen.getByTestId('chat-feed')).toBeInTheDocument();
  });
});
