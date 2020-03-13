import React, { useState } from 'react';

export function RentalImage(props) {
	const [isLarge, setIsLarge] = useState(false);

	const toggleSize = () => {
		setIsLarge(!isLarge);
	};

	return (
		<button type="button" className={`image ${isLarge && "large"}`} onClick={toggleSize}>
			<img alt="" {...props} />
			<small>{isLarge ? "View Smaller" : "View Larger"}</small>
		</button>
	);
}