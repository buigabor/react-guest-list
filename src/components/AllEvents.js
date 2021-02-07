/** @jsxImportSource @emotion/react */

import React from 'react';
import { eventFieldStyles } from '../styles/eventStyles';

export default function AllEvents({ allEvents }) {
	if (allEvents) {
		return (
			<div>
				{allEvents.map((event) => {
					return (
						<div css={eventFieldStyles} key={event.eventId}>
							<div>Event Name: {event.eventName}</div>
							<div>Event Location: {event.eventLocation}</div>
						</div>
					);
				})}
			</div>
		);
	}
	return <div />;
}
