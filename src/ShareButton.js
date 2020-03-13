import React from 'react';
import { useLocation, withRouter } from 'react-router-dom';

const TWEET_INTENT = 'https://twitter.com/intent/tweet';

function ShareButton(props) {
	const shareURL = getShareURL(props, useLocation().pathname);

	return (
		<a
			href={shareURL}
			target="_blank"
			rel="external nofollow noopener noreferrer"
			className={`share button ${props.class}`}
		>
			{props.children}
	</a>
	)
}

function getShareURL({ text, hashtags, via }, currentPath) {
	const currentUrl = new URL(currentPath, window.location.origin);
	let url = new URL(TWEET_INTENT);

	url.searchParams.set('url', currentUrl);

	if (text) {
		url.searchParams.set('text', text);
	}

	if (hashtags) {
		url.searchParams.set('hashtags', hashtags);
	}

	if (via) {
		url.searchParams.set('via', via);
	}

	return url;
};

export default withRouter(ShareButton);