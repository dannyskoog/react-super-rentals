import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { NavBar } from './NavBar';
import { Home } from './Home';
import { About } from './About';
import { Contact } from './Contact';
import RentalDetails from './RentalDetails';

export function App() {
  return (
		<div className="container">
			<Router>
				<NavBar />
				<div className="body">
					<Switch>
						<Route path="/about">
							<About />
						</Route>
						<Route path="/getting-in-touch">
							<Contact />
						</Route>
						<Route path="/rentals/:rental_id">
							<RentalDetails />
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
  );
}