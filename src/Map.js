import React from 'react';

const MAPBOX_API = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static';

export function Map(props) {
	const token = encodeURIComponent(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);

	return (
		<div className="map">
  		<img
				alt={`Map at coordinates ${props.lat},${props.lng}`}
				{...props}
    		src={getSrc(token, props)}
    		width={props.width} height={props.height}
  		/>
		</div>
	);
}

function getSrc(token, { lng, lat, width, height, zoom }) {
	let coordinates = `${lng},${lat},${zoom}`;
	let dimensions  = `${width}x${height}`;
	let accessToken = `access_token=${token}`;

	return `${MAPBOX_API}/${coordinates}/${dimensions}@2x?${accessToken}`;
}