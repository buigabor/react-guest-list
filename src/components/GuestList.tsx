/** @jsxImportSource @emotion/react */
import React from 'react';
import { Guest } from '../models/interfaces';
import { guestListStyles } from '../styles/guestListStyles';
import Field from './Field';

export type GuestListProps = {
	deleteGuest: (id: number) => Promise<Guest>;
	updateGuest: (id: number, attending: boolean) => Promise<Guest>;
	filteredGuests: Guest[];
	updateGuestName: (
		firstName: string | undefined,
		lastName: string | undefined,
		id: number,
	) => Promise<Guest>;
};

export default function GuestList({
	deleteGuest,
	updateGuest,
	filteredGuests,
	updateGuestName,
}: GuestListProps) {
	return (
		<div className='field-wrapper' css={guestListStyles}>
			{filteredGuests.map((guest: Guest) => {
				return (
					<Field
						key={guest.id}
						updateGuestName={updateGuestName}
						guest={guest}
						deleteGuest={deleteGuest}
						updateGuest={updateGuest}
					/>
				);
			})}
		</div>
	);
}
