import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Jumbo } from './Jumbo';
import { Rentals } from './Rentals';

const COMMUNITY_CATEGORIES = [
  'Condo',
  'Townhouse',
  'Apartment'
];

export function Home() {
	const [model, setModel] = useState(null);

	useEffect(() => {
		async function fetchData() {
			let response = await fetch('/api/rentals.json');
			let { data } = await response.json();

			const model = data.map(model => {
				let { id, attributes } = model;
				let type;
	
				if (COMMUNITY_CATEGORIES.includes(attributes.category)) {
					type = 'Community';
				} else {
					type = 'Standalone';
				}
	
				return { id, type, ...attributes };
			});

			setModel(model);
		}

		fetchData();
  }, []);

	return (
		<>
			<Jumbo>
				<h2>Welcome to Super Rentals!</h2>
				<p>We hope you find exactly what you're looking for in a place to stay.</p>
				<Link to="/about" className="button">About Us</Link>
			</Jumbo>
			<Rentals rentals={model} />
		</>
	);
}