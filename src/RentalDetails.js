import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from "react-router-dom";
import { Jumbo } from './Jumbo';
import { RentalImage } from './RentalImage';
import { Map } from './Map';
import ShareButton from './ShareButton';

const COMMUNITY_CATEGORIES = [
  'Condo',
  'Townhouse',
  'Apartment'
];

function RentalDetails() {
	const [rental, setRental] = useState(null);
	const { rental_id } = useParams();

	useEffect(() => {
		async function fetchData() {
			let response = await fetch(`/api/rentals/${rental_id}.json`);
			let { data } = await response.json();

			let { id, attributes } = data;
			let type;

			if (COMMUNITY_CATEGORIES.includes(attributes.category)) {
				type = 'Community';
			} else {
				type = 'Standalone';
			}

			setRental({ id, type, ...attributes });
		}

		fetchData();
	}, [rental_id]);

	if (!rental)
		return null;
	
	return (
		<>
			<Jumbo>
				<h2>{rental.title}</h2>
				<p>Nice find! This looks like a nice place to stay near {rental.city}.</p>
				<ShareButton
    			text={`Check out ${rental.title} on Super Rentals!`}
    			hashtags="vacation,travel,authentic,blessed,superrentals"
    			via="reactjs"
  			>
    			Share on Twitter
  			</ShareButton>
			</Jumbo>
			<article className="rental detailed">
				<RentalImage
					src={rental.image}
					alt={`A picture of ${rental.title}`}
				/>
				<div className="details">
					<h3>About {rental.title}</h3>
					<div className="detail owner">
						<span>Owner:</span> {rental.owner}
					</div>
					<div className="detail type">
						<span>Type:</span> {rental.type} – {rental.category}
					</div>
					<div className="detail location">
						<span>Location:</span> {rental.city}
					</div>
					<div className="detail bedrooms">
						<span>Number of bedrooms:</span> {rental.bedrooms}
					</div>
					<div className="detail description">
						<p>{rental.description}</p>
					</div>
				</div>
				<Map
					lat={rental.location.lat}
					lng={rental.location.lng}
					zoom="12"
					width="894"
					height="600"
					alt={`A map of ${rental.title}`}
					className="large"
				/>
			</article>
		</>
	);
}

export default withRouter(RentalDetails);