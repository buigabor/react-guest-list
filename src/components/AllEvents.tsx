/** @jsxImportSource @emotion/react */
import React from 'react';
import { IEvent } from '../models/interfaces';
import { eventFieldStyles } from '../styles/eventStyles';

type AllEventsProps = {
  allEvents: IEvent[] | [];
  deleteEvent: (id: number) => Promise<IEvent>;
  setCurrentEventId: React.Dispatch<React.SetStateAction<string>>;
  setView: React.Dispatch<React.SetStateAction<string>>;
};

export default function AllEvents({
  allEvents,
  deleteEvent,
  setCurrentEventId,
  setView,
}: AllEventsProps) {
  return (
    <div>
      {(allEvents as any[]).map((event: IEvent) => {
        return (
          <div css={eventFieldStyles} key={event.eventId}>
            <button
              className="event"
              onClick={() => {
                setCurrentEventId(String(event.eventId));
                setTimeout(() => {
                  setView('guest-list');
                }, 50);
              }}
              onKeyDown={() => {
                setCurrentEventId(String(event.eventId));
              }}
            >
              <div>Event Name: {event.eventName}</div>
              <div>Event Location: {event.eventLocation}</div>
            </button>
            <button
              className="event-delete"
              onClick={() => {
                deleteEvent(event.eventId);
              }}
            >
              <i className="fas fa-trash" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
