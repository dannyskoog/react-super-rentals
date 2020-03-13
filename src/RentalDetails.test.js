import React from 'react';
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, waitForElement } from '@testing-library/react';
import RentalDetails from './RentalDetails';

describe('Integration | Component | RentalDetails', () => {
	let container;
	let mockRental = {
		type: "rentals",
		id: "grand-old-mansion",
		attributes: {
			title: "Grand Old Mansion",
			owner: "Veruca Salt",
			city: "San Francisco",
			location: {
				lat: 37.7749,
				lng: -122.4194
			},
			category: "Estate",
			bedrooms: 15,
			image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg",
			description: "This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests."
		}
	};

	beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ data: mockRental }),
		}));
		
		const history = createMemoryHistory({ initialEntries: ['/rentals/grand-old-mansion'] });
		({ container } = render(
			<Router history={history}>
				<Route path="/rentals/:rental_id">
					<RentalDetails />
				</Route>
			</Router>
		));

		await waitForElement(() => container.querySelector('.jumbo'));
	});

	afterEach(() => {
		global.fetch.mockRestore();
	})

	test('it renders the given image', () => {
    expect(container.querySelector('.jumbo')).toBeInTheDocument();
		expect(container.querySelector('.jumbo h2')).toHaveTextContent('Grand Old Mansion');
		expect(container.querySelector('.jumbo p')).toHaveTextContent('a nice place to stay near San Francisco');
		expect(container.querySelector('.jumbo a.button')).toHaveTextContent('Share on Twitter');
	});

	test('it renders detailed information about a rental property', () => {
    expect(container.querySelector('article')).toHaveClass('rental');
		expect(container.querySelector('article h3')).toHaveTextContent('About Grand Old Mansion');
		expect(container.querySelector('article .detail.owner')).toHaveTextContent('Veruca Salt');
		expect(container.querySelector('article .detail.type')).toHaveTextContent('Standalone – Estate');
		expect(container.querySelector('article .detail.location')).toHaveTextContent('San Francisco');
		expect(container.querySelector('article .detail.bedrooms')).toHaveTextContent('15');
		expect(container.querySelector('article .image')).toBeInTheDocument();
		expect(container.querySelector('article .map')).toBeInTheDocument();
	});
});