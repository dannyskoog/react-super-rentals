import React from 'react';
import { render } from '@testing-library/react';
import { Jumbo } from './Jumbo';

describe('Integration | Component | Jumbo', () => {
	test('it renders', () => {
		const { container } = render(<Jumbo>Hello World</Jumbo>);
		
		expect(container.querySelector('.jumbo')).toBeInTheDocument();
    expect(container.querySelector('.jumbo')).toHaveTextContent('Hello World');
    expect(container.querySelector('.jumbo .tomster')).toBeInTheDocument();
	});
});