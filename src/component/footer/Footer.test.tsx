import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

test('renders Footer', () => {
  render(<App />);
  const homeLink = screen.getByText('Home');
  expect(homeLink).toBeInTheDocument();
  
  const aboutLink = screen.getByText('Sobre');
  expect(aboutLink).toBeInTheDocument();

  const statsLink = screen.getByText('Estatísticas');
  expect(statsLink).toBeInTheDocument();
});
