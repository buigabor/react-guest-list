/** @jsxImportSource @emotion/react */

import TextField from '@material-ui/core/TextField';
import React from 'react';
import { createFormStyles } from '../styles/createFormStyles';
export default function Event({ createEvent, allEvents }) {
	return (
		<div css={createFormStyles}>
			<div className='header-text'>New Event</div>
			<form
				className='create-event-form'
				onSubmit={(e) => {
					e.preventDefault();
					const eventName = document.getElementById('event-name').value;
					const locationName = document.getElementById('location-name').value;
					createEvent(eventName, locationName);
				}}
			>
				<TextField id='event-name' label='Event Name' />
				<TextField id='location-name' label='Location Name' />
				{/* <label htmlFor='event-name'>Event Name</label>
				<input type='text' name='event-name' id='event-name' />
				<label htmlFor='location-name'>Location</label>
				<input type='text' name='location-name' id='location-name' /> */}
				<button>Create Event</button>
			</form>
		</div>
	);
}
