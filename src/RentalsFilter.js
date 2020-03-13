import React from 'react';
import { Rental } from './Rental';

export function RentalsFilter(props) {
	const rentals = props.rentals?.filter(rental => rental.title.toLowerCase().includes(props.query.toLowerCase()));

	return (
		<ul className="results">
			{rentals && rentals.map(rental => {
				return <li key={rental.id}><Rental rental={rental} /></li>
			})}
		</ul>
	);
}