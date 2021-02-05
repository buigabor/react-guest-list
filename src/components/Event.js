import React from 'react';
import AllEvents from './AllEvents';

export default function Event({ createEvent, allEvents }) {
	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const eventName = document.getElementById('event-name').value;
					const locationName = document.getElementById('location-name').value;
					createEvent(eventName, locationName);
				}}
			>
				<label htmlFor='event-name'>Event Name</label>
				<input type='text' name='event-name' id='event-name' />
				<label htmlFor='location-name'>Location</label>
				<input type='text' name='location-name' id='location-name' />
				<button>Create Event</button>
			</form>
			<AllEvents allEvents={allEvents} />
		</div>
	);
}
