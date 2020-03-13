import React from 'react';
import { Link } from 'react-router-dom';

export function NavBar() {
	return (
		<nav className="menu">
			<Link to="/" className="menu-index">
				<h1>SuperRentals</h1>
			</Link>
			<div className="links">
				<Link to="/about" className="menu-about">
					About
				</Link>
				<Link to="/getting-in-touch" className="menu-contact">
					Contact
				</Link>
			</div>
		</nav>
	);
}