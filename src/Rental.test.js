import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Rental } from './Rental';

describe('Integration | Component | Rental', () => {
	test('it renders information about a rental property', () => {
		const model = {
				id: 'grand-old-mansion',
        title: 'Grand Old Mansion',
        owner: 'Veruca Salt',
        city: 'San Francisco',
        location: {
          lat: 37.7749,
          lng: -122.4194,
        },
        category: 'Estate',
        type: 'Standalone',
        bedrooms: 15,
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
        description: 'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.',
    };
		const { container } = render(
			<MemoryRouter>
				<Rental rental={model} />
			</MemoryRouter>
		);
		
    expect(container.querySelector('article')).toHaveClass('rental');
		expect(container.querySelector('article h3')).toHaveTextContent('Grand Old Mansion');
		expect(container.querySelector('article h3 a')).toHaveAttribute('href', '/rentals/grand-old-mansion');
    expect(container.querySelector('article .detail.owner')).toHaveTextContent('Veruca Salt');
    expect(container.querySelector('article .detail.type')).toHaveTextContent('Standalone');
    expect(container.querySelector('article .detail.location')).toHaveTextContent('San Francisco');
		expect(container.querySelector('article .detail.bedrooms')).toHaveTextContent('15');
		expect(container.querySelector('article .image')).toBeInTheDocument();
		expect(container.querySelector('article .map')).toBeInTheDocument();
	});
});