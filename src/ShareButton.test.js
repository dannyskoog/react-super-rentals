import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import ShareButton from './ShareButton';
import { Router } from 'react-router-dom';

const tweetParam = (container, param) => {
	let link = container.querySelector('a');
	let url = new URL(link.href);
	return url.searchParams.get(param);
};

describe('Integration | Component | ShareButton', () => {
	test('basic usage', () => {
		const history = createMemoryHistory({ initialEntries: ['/foo/bar'] });
		const { container } = render(
			<Router history={history}>
				<ShareButton>Tweet this!</ShareButton>
			</Router>
		);

		expect(container.querySelector('a')).toBeInTheDocument();
		expect(container.querySelector('a')).toHaveAttribute('target', '_blank');
		expect(container.querySelector('a')).toHaveAttribute('rel', 'external nofollow noopener noreferrer');
		expect(container.querySelector('a')).toHaveAttribute('href', expect.stringMatching(/^https:\/\/twitter\.com\/intent\/tweet/));
		expect(container.querySelector('a')).toHaveClass('share');
		expect(container.querySelector('a')).toHaveClass('button');
		expect(container.querySelector('a')).toHaveTextContent('Tweet this!');

		expect(tweetParam(container, 'url')).toEqual(new URL('/foo/bar', window.location.origin).toString());
	});
	
	test('it supports passing text', () => {
		const history = createMemoryHistory({ initialEntries: ['/foo/bar'] });
		const { container } = render(
			<Router history={history}>
				<ShareButton text="Hello Twitter!">Tweet this!</ShareButton>
			</Router>
		);
    expect(tweetParam(container, 'text')).toEqual('Hello Twitter!');
	});
	
	test('it supports passing hashtags', () => {
		const history = createMemoryHistory({ initialEntries: ['/foo/bar'] });
		const { container } = render(
			<Router history={history}>
				<ShareButton hashtags="foo,bar,baz">Tweet this!</ShareButton>
			</Router>
		);
    expect(tweetParam(container, 'hashtags')).toEqual('foo,bar,baz');
	});
	
	test('it supports passing via', () => {
		const history = createMemoryHistory({ initialEntries: ['/foo/bar'] });
		const { container } = render(
			<Router history={history}>
				<ShareButton via="reactjs">Tweet this!</ShareButton>
			</Router>
		);
    expect(tweetParam(container, 'via')).toEqual('reactjs');
	});
	
	test('it supports adding extra classes', () => {
		const history = createMemoryHistory({ initialEntries: ['/foo/bar'] });
		const { container } = render(
			<Router history={history}>
				<ShareButton class="extra things">Tweet this!</ShareButton>
			</Router>
		);
		expect(container.querySelector('a')).toHaveClass('share');
		expect(container.querySelector('a')).toHaveClass('button');
		expect(container.querySelector('a')).toHaveClass('extra');
		expect(container.querySelector('a')).toHaveClass('things');
	});
	
	test('the target, rel and href attributes cannot be overridden', () => {
		const history = createMemoryHistory({ initialEntries: ['/foo/bar'] });
		const { container } = render(
			<Router history={history}>
				<ShareButton target="_self" rel="" href="/">Tweet this!</ShareButton>
			</Router>
		);
		expect(container.querySelector('a')).toHaveAttribute('target', '_blank');
		expect(container.querySelector('a')).toHaveAttribute('rel', 'external nofollow noopener noreferrer');
		expect(container.querySelector('a')).toHaveAttribute('href', expect.stringMatching(/^https:\/\/twitter\.com\/intent\/tweet/));
  });
});