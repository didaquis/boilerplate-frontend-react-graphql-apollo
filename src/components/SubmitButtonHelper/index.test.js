import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { SubmitButtonHelper } from './';

describe('SubmitButtonHelper', () => {
	it('renders helper text if receive true by props', () => {
		const { getByText } = render(<SubmitButtonHelper mustShowHelper={true} />);

		expect(getByText('Submit is disabled until valid data is entered in the form')).toBeInTheDocument();
	});

	it('not renders helper text if receive false by props', () => {
		const { container } = render(<SubmitButtonHelper mustShowHelper={false} />);

		expect(container.firstChild).toBeNull();
	});
});