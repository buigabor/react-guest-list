/** @jsxImportSource @emotion/react */

import TextField from '@material-ui/core/TextField';
import React from 'react';
import { createFormStyles } from '../styles/createFormStyles';

export default function CreateGuestForm({ createGuest }) {
	return (
		<div css={createFormStyles}>
			<div className='header-text'>New Guest</div>
			<form
				className='create-guest-form'
				onSubmit={(e) => {
					e.preventDefault();
					const firstName = document.getElementById('first-name').value;
					const lastName = document.getElementById('last-name').value;
					createGuest(firstName, lastName);
				}}
			>
				<TextField id='first-name' label='First Name' />
				<TextField id='last-name' label='Last Name' />

				{/* <label htmlFor='first-name'>First Name:</label>
				<input type='text' name='first-name' id='first-name' /> */}
				{/* <label htmlFor='last-name'>Last Name:</label>
				<input type='text' name='last-name' id='last-name' /> */}
				<button>Create Guest</button>
			</form>
		</div>
	);
}
