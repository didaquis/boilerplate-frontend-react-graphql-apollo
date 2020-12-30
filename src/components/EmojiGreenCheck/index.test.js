import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { EmojiGreenCheck } from './index';

describe('EmojiGreenCheck', () => {
	it('should render an emoji with properly description', () => {
		render(<EmojiGreenCheck />);

		const element = screen.getByRole('img', { name: /Green check mark/i });
		
		expect(element).toBeInTheDocument();
		expect(element).toHaveTextContent(/^✅$/);
	});
});