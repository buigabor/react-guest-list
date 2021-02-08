/** @jsxImportSource @emotion/react */

import TextField from '@material-ui/core/TextField';
import React from 'react';
import { IEvent } from '../models/interfaces';
import { createFormStyles } from '../styles/createFormStyles';

type EventProps = {
	createEvent: (eventName: string, eventLocation: string) => Promise<IEvent>;
};

export default function Event({ createEvent }: EventProps) {
	return (
		<div css={createFormStyles}>
			<div className='header-text'>New Event</div>
			<form
				className='create-event-form'
				onSubmit={(e) => {
					e.preventDefault();
					const eventName = (document.getElementById(
						'event-name',
					) as HTMLInputElement).value;
					const locationName = (document.getElementById(
						'location-name',
					) as HTMLInputElement).value;
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
