import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RentalImage } from './RentalImage';

describe('Integration | Component | RentalImage', () => {
	test('it renders the given image', () => {
		const { container } = render(<RentalImage src="/teaching-tomster.png" alt="Teaching Tomster" />);
		
    expect(container.querySelector('.image')).toBeInTheDocument();
		expect(container.querySelector('.image img')).toHaveAttribute('src', '/teaching-tomster.png');
		expect(container.querySelector('.image img')).toHaveAttribute('alt', 'Teaching Tomster');
	});

	test('clicking on the component toggles its size', () => {
		const { container } = render(<RentalImage src="/teaching-tomster.png" alt="Teaching Tomster" />);

		expect(container.querySelector('button.image')).toBeInTheDocument();

		expect(container.querySelector('.image')).not.toHaveClass('large');
		expect(container.querySelector('.image small')).toHaveTextContent('View Larger');

		fireEvent.click(container.querySelector('button.image'));

		expect(container.querySelector('.image')).toHaveClass('large');
		expect(container.querySelector('.image small')).toHaveTextContent('View Smaller');

		fireEvent.click(container.querySelector('button.image'));

		expect(container.querySelector('.image')).not.toHaveClass('large');
		expect(container.querySelector('.image small')).toHaveTextContent('View Larger');
	});
});