import React from 'react';
import { render } from '@testing-library/react';
import { Map } from './Map';

describe('Integration | Component | Map', () => {
	test('it renders a map image for the specified parameters', () => {
		const { container } = render(<Map lat="37.7797" lng="-122.4184" zoom="10" width="150" height="120" />);

		expect(container.querySelector('.map')).toBeInTheDocument();
		expect(container.querySelector('.map img')).toHaveAttribute('alt', 'Map at coordinates 37.7797,-122.4184');
		expect(container.querySelector('.map img')).toHaveAttribute('src', expect.stringMatching(/^https:\/\/api\.mapbox\.com/));
		expect(container.querySelector('.map img')).toHaveAttribute('width', '150');
		expect(container.querySelector('.map img')).toHaveAttribute('height', '120');

		let token = encodeURIComponent(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);

		expect(container.querySelector('.map img').src).toEqual(expect.stringContaining('-122.4184,37.7797,10'));
		expect(container.querySelector('.map img').src).toEqual(expect.stringContaining('150x120@2x'));
		expect(container.querySelector('.map img').src).toEqual(expect.stringContaining(`access_token=${token}`));
	});

	test('it updates the `src` attribute when the arguments change', () => {
    const { container, rerender } = render(<Map lat="37.7797" lng="-122.4184" zoom="10" width="150" height="120" />);

		expect(container.querySelector('.map img').src).toEqual(expect.stringContaining('-122.4184,37.7797,10'));
		expect(container.querySelector('.map img').src).toEqual(expect.stringContaining('150x120@2x'));

		rerender(<Map lat="37.7797" lng="-122.4184" zoom="12" width="300" height="200" />);

		expect(container.querySelector('.map img').src).toEqual(expect.stringContaining('-122.4184,37.7797,12'));
		expect(container.querySelector('.map img').src).toEqual(expect.stringContaining('300x200@2x'));

		rerender(<Map lat="47.6062" lng="-122.3321" zoom="12" width="300" height="200" />);

		expect(container.querySelector('.map img').src).toEqual(expect.stringContaining('-122.3321,47.6062'));
		expect(container.querySelector('.map img').src).toEqual(expect.stringContaining('300x200@2x'));
  });

	test('the default alt attribute can be overridden', () => {
		const { container } = render(<Map lat="37.7797" lng="-122.4184" zoom="10" width="150" height="120" alt="A map of San Francisco" />);

		expect(container.querySelector('.map img')).toHaveAttribute('alt', 'A map of San Francisco');
	});

	test('the src cannot be overridden', () => {
		const { container } = render(<Map lat="37.7797" lng="-122.4184" zoom="10" width="150" height="120" src="/teaching-tomster.png" />);

		expect(container.querySelector('.map img')).toHaveAttribute('src', expect.stringMatching(/^https:\/\/api\.mapbox\.com/));
	});
});