import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';
import { Rentals } from './Rentals';

const rentals = [{
	id: 'grand-old-mansion',
	title: 'Grand Old Mansion',
	owner: 'Veruca Salt',
	city: 'San Francisco',
	location: {
		lat: 37.7749,
		lng: -122.4194
	},
	category: 'Estate',
	type: 'Standalone',
	bedrooms: 15,
	image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
	description: 'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.'
},
{
	id: 'urban-living',
	title: 'Urban Living',
	owner: 'Mike Teavee',
	city: 'Seattle',
	location: {
		lat: 47.6062,
		lng: -122.3321
	},
	category: 'Condo',
	type: 'Community',
	bedrooms: 1,
	image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
	description: 'A commuters dream. This rental is within walking distance of 2 bus stops and the Metro.'
},
{
	id: 'downtown-charm',
	title: 'Downtown Charm',
	owner: 'Violet Beauregarde',
	city: 'Portland',
	location: {
		lat: 45.5175,
		lng: -122.6801
	},
	category: 'Apartment',
	type: 'Community',
	bedrooms: 3,
	image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg',
	description: 'Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet.'
}]

describe('Integration | Component | Rentals', () => {
	test('it renders all given rental properties by default', () => {
		const history = createMemoryHistory();
		const { container } = render(
			<Router history={history}>
				<Rentals rentals={rentals} />
			</Router>
		);

		expect(container.querySelector('.rentals')).toBeInTheDocument();
		expect(container.querySelector('.rentals input')).toBeInTheDocument();

		expect(container.querySelector('.rentals .results')).toBeInTheDocument();
		expect(container.querySelectorAll('.rentals .results li').length).toEqual(3);

		expect(container.querySelector('.rentals .results li:nth-of-type(1)')).toHaveTextContent('Grand Old Mansion');
		expect(container.querySelector('.rentals .results li:nth-of-type(2)')).toHaveTextContent('Urban Living');
		expect(container.querySelector('.rentals .results li:nth-of-type(3)')).toHaveTextContent('Downtown Charm');
	});

	test('it updates the results according to the search query', () => {
		const history = createMemoryHistory();
		const { container } = render(
			<Router history={history}>
				<Rentals rentals={rentals} />
			</Router>
		);

		expect(container.querySelector('.rentals')).toBeInTheDocument();
		expect(container.querySelector('.rentals input')).toBeInTheDocument();

		fireEvent.change(container.querySelector('.rentals input'), { target: { value: 'Downtown' } });

		expect(container.querySelector('.rentals .results')).toBeInTheDocument();
		expect(container.querySelectorAll('.rentals .results li').length).toEqual(1);
		expect(container.querySelector('.rentals .results li')).toHaveTextContent('Downtown Charm');

		fireEvent.change(container.querySelector('.rentals input'), { target: { value: 'Mansion' } });

		expect(container.querySelector('.rentals .results')).toBeInTheDocument();
		expect(container.querySelectorAll('.rentals .results li').length).toEqual(1);
		expect(container.querySelector('.rentals .results li')).toHaveTextContent('Grand Old Mansion');
	});
});