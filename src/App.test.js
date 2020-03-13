import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { App } from './app'

describe('Acceptance | super rentals', () => {
	test('visiting /', () => {
		const history = createMemoryHistory({ initialEntries: ['/'] });
		const { container } = render(
			<Router history={history}>
				<App />
			</Router>
		);

		expect(location.pathname).toMatch('/');
		expect(container.querySelector('nav')).toBeInTheDocument();
    expect(container.querySelector('h1')).toHaveTextContent('SuperRentals');
		expect(container.querySelector('h2')).toHaveTextContent('Welcome to Super Rentals!');

		expect(container.querySelector('.jumbo a.button')).toHaveTextContent('About Us');
		fireEvent.click(container.querySelector('.jumbo a.button'));

		expect(location.pathname).toMatch('/about');
	});

	test('visiting /about', () => {
		const history = createMemoryHistory({ initialEntries: ['/about'] });
		const { container } = render(
			<Router history={history}>
				<App />
			</Router>
		);

		expect(location.pathname).toMatch('/');
		expect(container.querySelector('nav')).toBeInTheDocument();
    expect(container.querySelector('h1')).toHaveTextContent('SuperRentals');
		expect(container.querySelector('h2')).toHaveTextContent('About Super Rentals');

		expect(container.querySelector('.jumbo a.button')).toHaveTextContent('Contact Us');
		fireEvent.click(container.querySelector('.jumbo a.button'));

		expect(location.pathname).toMatch('/getting-in-touch');
	});

	test('visiting /getting-in-touch', () => {
		const history = createMemoryHistory({ initialEntries: ['/getting-in-touch'] });
		const { container } = render(
			<Router history={history}>
				<App />
			</Router>
		);

		expect(location.pathname).toMatch('/getting-in-touch');
		expect(container.querySelector('nav')).toBeInTheDocument();
    expect(container.querySelector('h1')).toHaveTextContent('SuperRentals');
		expect(container.querySelector('h2')).toHaveTextContent('Contact Us');

		expect(container.querySelector('.jumbo a.button')).toHaveTextContent('About');
		fireEvent.click(container.querySelector('.jumbo a.button'));

		expect(location.pathname).toMatch('/about');
	});

	test('navigating using the nav bar', () => {
		const history = createMemoryHistory({ initialEntries: ['/'] });
		const { container } = render(
			<Router history={history}>
				<App />
			</Router>
		);

		expect(container.querySelector('nav')).toBeInTheDocument();
    expect(container.querySelector('nav a.menu-index')).toHaveTextContent('SuperRentals');
		expect(container.querySelector('nav a.menu-about')).toHaveTextContent('About');
		expect(container.querySelector('nav a.menu-contact')).toHaveTextContent('Contact');

		fireEvent.click(container.querySelector('nav a.menu-about'));
		expect(location.pathname).toMatch('/about');

		fireEvent.click(container.querySelector('nav a.menu-contact'));
		expect(location.pathname).toMatch('/getting-in-touch');

		fireEvent.click(container.querySelector('nav a.menu-index'));
		expect(location.pathname).toMatch('/');
	});
});