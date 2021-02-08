/** @jsxImportSource @emotion/react */

import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Guest } from '../models/interfaces';
import { createFormStyles } from '../styles/createFormStyles';

type CreateGuestProps = {
	createGuest: (firstName: string, lastName: string) => Promise<Guest>;
};

export default function CreateGuestForm({ createGuest }: CreateGuestProps) {
	return (
		<div css={createFormStyles}>
			<div className='header-text'>New Guest</div>
			<form
				className='create-guest-form'
				onSubmit={(e) => {
					e.preventDefault();
					const firstName = (document.getElementById(
						'first-name',
					) as HTMLInputElement).value;
					const lastName = (document.getElementById(
						'last-name',
					) as HTMLInputElement).value;
					createGuest(firstName, lastName);
				}}
			>
				<TextField id='first-name' label='First Name' />
				<TextField id='last-name' label='Last Name' />
				<button>Create Guest</button>
			</form>
		</div>
	);
}
