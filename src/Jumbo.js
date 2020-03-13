import React from 'react';
import './Jumbo.css';

export function Jumbo(props) {
	return (
		<div className="jumbo">
  		<div className="right tomster"></div>
  		{props.children}
		</div>
	);
}