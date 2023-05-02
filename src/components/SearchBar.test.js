import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('calls onSearch with correct value when enter is pressed', () => {
  const onSearch = jest.fn();
  render(<SearchBar onSearch={onSearch} />);

  const input = screen.getByPlaceholderText('Search chats');
  fireEvent.change(input, { target: { value: 'test' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  expect(onSearch).toHaveBeenCalledWith('test');
});

test('calls onSearch with correct value when search button is clicked', () => {
  const onSearch = jest.fn();
  render(<SearchBar onSearch={onSearch} />);

  const input = screen.getByPlaceholderText('Search chats');
  fireEvent.change(input, { target: { value: 'test' } });

  const button = screen.getByLabelText('search');
  fireEvent.click(button);

  expect(onSearch).toHaveBeenCalledWith('test');
});
