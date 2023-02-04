import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/client/testing';

import { LOGIN } from '../../gql/mutations/auth';
import { LoginForm } from './';

describe('LoginForm', () => {
	it('should render a disabled button until password and email inputs are filled with data', () => {
		const activateAuth = jest.fn();
		const mocks = [];

		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<LoginForm activateAuth={activateAuth}/>
			</MockedProvider>
		);
		const emailInput = screen.getByRole('textbox', { name: /Email/i });
		const passwordInput = screen.getByPlaceholderText(/password/);
		const submitButton = screen.getByRole('button', { name: 'Log in' });
		
		expect(emailInput.value).toBe('');
		expect(passwordInput.value).toBe('');
		expect(submitButton).toBeDisabled();

		fireEvent.change(emailInput, { target: { value: 'example@mail.com' } });
		expect(submitButton).toBeDisabled();

		fireEvent.change(passwordInput, { target: { value: 'ABCabc*1234*4321' } });
		expect(submitButton).not.toBeDisabled();

		fireEvent.change(emailInput, { target: { value: '' } });
		fireEvent.change(passwordInput, { target: { value: '' } });
		expect(submitButton).toBeDisabled();
	});

	it('should call to activateAuth method passing a token as argument if credentials are valid', async () => {
		const activateAuth = jest.fn();
		const mocks = [
			{
				request: {
					query: LOGIN,
					variables: {
						email: 'example@mail.com',
						password: 'ABCabc*1234*4321',
					},
				},
				result: {
					data: {
						authUser: {
							token: 'f3b2c1a0d2'
						}
					},
				},
			},
		];

		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<LoginForm activateAuth={activateAuth}/>
			</MockedProvider>
		);

		const emailInput = screen.getByRole('textbox', { name: /Email/i });
		const passwordInput = screen.getByPlaceholderText(/password/);
		const submitButton = screen.getByRole('button', { name: 'Log in' });

		fireEvent.change(emailInput, { target: { value: 'example@mail.com' } });
		fireEvent.change(passwordInput, { target: { value: 'ABCabc*1234*4321' } });
		fireEvent.click(submitButton);

		const submitButtonLoadingState = screen.getByRole('button', { name: 'Loading' });

		expect(submitButtonLoadingState).toBeInTheDocument();
		expect(submitButtonLoadingState).toBeDisabled();

		await waitFor(() => expect(activateAuth).toHaveBeenCalled());
		expect(activateAuth).toHaveBeenCalledWith('f3b2c1a0d2');
	});

	it('should render an error if credentials are not valid', async () => {
		const activateAuth = jest.fn();
		const mocks = [
			{
				request: {
					query: LOGIN,
					variables: {
						email: 'example@mail.com',
						password: 'ABCabc*1234*4321',
					},
				},
				result: {
					errors: [new Error('Invalid credentials')],
				},
			},
		];

		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<LoginForm activateAuth={activateAuth}/>
			</MockedProvider>
		);

		const emailInput = screen.getByRole('textbox', { name: /Email/i });
		const passwordInput = screen.getByPlaceholderText(/password/);
		const submitButton = screen.getByRole('button', { name: 'Log in' });

		fireEvent.change(emailInput, { target: { value: 'example@mail.com' } });
		fireEvent.change(passwordInput, { target: { value: 'ABCabc*1234*4321' } });
		fireEvent.click(submitButton);

		await waitFor(() => expect(activateAuth).not.toHaveBeenCalled());

		const submitButtonAfterCTA = await screen.findByRole('button', { name: 'Log in' });

 		expect(submitButtonAfterCTA).toBeInTheDocument();
 		expect(submitButtonAfterCTA).not.toBeDisabled();

		expect(screen.getByRole('alert')).toBeInTheDocument();
		expect(screen.getByText('Invalid credentials'));
	});
});