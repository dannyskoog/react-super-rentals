import React, { useState } from 'react';
import { RentalsFilter } from './RentalsFilter';

export function Rentals(props) {
	const [query, setQuery] = useState('');
	const handleOnChange = (event) => {
		setQuery(event.target.value);
	};

	return (
		<div className="rentals">
		<label>
			<span>Where would you like to stay?</span>
			<input autoFocus value={query} className="light" onChange={handleOnChange} />
		</label>
		<RentalsFilter rentals={props.rentals} query={query} />
		</div>
	);
}