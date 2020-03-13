import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbo } from './Jumbo';

export function About() {
	return (
		<Jumbo>
			<h2>About Super Rentals</h2>
			<p>
				The Super Rentals website is a delightful project created to explore Ember.
				By building a property rental site, we can simultaneously imagine traveling
				AND building Ember applications.
			</p>
			<Link to="/getting-in-touch" className="button">Contact Us</Link>
		</Jumbo>
	);
}