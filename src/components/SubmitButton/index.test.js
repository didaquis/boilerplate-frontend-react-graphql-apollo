import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { SubmitButton } from './';

describe('SubmitButton', () => {
	it('renders correctly', () => {
		const _onClick = () => {};
		const text = 'button-text';
		const { getByText } = render(<SubmitButton disabled={false} onClick={_onClick}>{text}</SubmitButton>);

		expect(getByText(text)).toBeInTheDocument();
	});

	it('renders a disabled button', () => {
		const _onClick = () => {};
		const text = 'button-text';
		const { getByText } = render(<SubmitButton disabled={true} onClick={_onClick}>{text}</SubmitButton>);

		expect(getByText(/button-text/i).closest('button')).toHaveAttribute('disabled');
	});

	it('captures clicks', () => {
		const handleClick = jest.fn();

		const { getByRole } = render(
			<SubmitButton onClick={handleClick}>Submit</SubmitButton>
		);

		const node = getByRole('button', { name: /^Submit$/i} );

		expect(handleClick).not.toHaveBeenCalled();
		fireEvent.click(node);
		expect(handleClick).toHaveBeenCalled();
	});
});