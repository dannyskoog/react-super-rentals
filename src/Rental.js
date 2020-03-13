import React from 'react';
import { Link } from 'react-router-dom';
import './Rental.css';
import { RentalImage } from './RentalImage';
import { Map } from './Map';

export function Rental(props) {
	if (!props.rental)
		return null;

	const { id, image, title, owner, type, city, bedrooms, location: { lat, lng } } = props.rental;

	return (
		<article className="rental">
			<RentalImage src={image} alt={`A picture of ${title}`} />
			<div className="details">
				<h3>
				<Link to={`/rentals/${id}`}>
					{title}
				</Link>
				</h3>
				<div className="detail owner">
					<span>Owner:</span> {owner}
				</div>
				<div className="detail type">
					<span>Type:</span> {type}
				</div>
				<div className="detail location">
					<span>Location:</span> {city}
				</div>
				<div className="detail bedrooms">
					<span>Number of bedrooms:</span> {bedrooms}
				</div>
			</div>
			<Map lat={lat} lng={lng} zoom="9" width="150" height="150" alt={`A map of ${title}`} />
		</article>
	);
}