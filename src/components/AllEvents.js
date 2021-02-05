import React from 'react';

export default function AllEvents({ allEvents }) {
	if (allEvents) {
		return (
			<div>
				{allEvents.map((event) => {
					return (
						<div key={event.eventId}>
							<div>{event.eventName}</div>
							<div>{event.eventLocation}</div>
						</div>
					);
				})}
			</div>
		);
	}
	return <div></div>;
}
