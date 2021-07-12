import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Footer } from './';

describe('Footer', () => {
	it('renders a link with correct attributes', () => {
		const { getByText } = render(<Footer />);

		expect(getByText('didaquis').href).toBe('https://didaquis.github.io/');
		expect(getByText('didaquis').closest('a')).toHaveAttribute('href', 'https://didaquis.github.io/');

		expect(getByText('didaquis').target).toBe('_blank');
		expect(getByText('didaquis').rel).toBe('noreferrer noopener');
	});

	it('contains an expected text', () => {
  		render(<Footer />);

  		const expectedText = 'Made by didaquis';

		screen.getByText((content, node) => {
			const hasText = (node) => node.textContent === expectedText;
			const nodeHasText = hasText(node);
			const childrenDontHaveText = Array.from(node.children).every(
			  (child) => !hasText(child)
			);

			return nodeHasText && childrenDontHaveText;
		});
	});
});