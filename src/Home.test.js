import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from './Home';

test('renders learn react link', () => {
  const { getByText } = render(
		<MemoryRouter>
			<Home />;
		</MemoryRouter>
	);
  const element = getByText(/Welcome to Super Rentals!/i);
  expect(element).toBeInTheDocument();
});