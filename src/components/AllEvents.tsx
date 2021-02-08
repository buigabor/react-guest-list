/** @jsxImportSource @emotion/react */
import { IEvent } from '../models/interfaces';
import { eventFieldStyles } from '../styles/eventStyles';

type AllEventsProps = {
	allEvents: IEvent[] | [];
};

export default function AllEvents({ allEvents }: AllEventsProps) {
	return (
		<div>
			{(allEvents as any[]).map((event: IEvent) => {
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
