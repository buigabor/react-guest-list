/** @jsxImportSource @emotion/react */
import { React } from 'react';
import { guestListStyles } from '../styles/guestListStyles';
import Field from './Field';

export default function GuestList({
	deleteGuest,
	updateGuest,
	filteredGuests,
	firstNameInputActive,
	setFirstNameInputActive,
	updateGuestName,
	getNonAttGuestsIfDeadline,
	addDeadline,
}) {
	if (filteredGuests) {
		return (
			<div className='field-wrapper' css={guestListStyles}>
				{filteredGuests.map((guest) => {
					return (
						<Field
							key={guest.id}
							updateGuestName={updateGuestName}
							firstNameInputActive={firstNameInputActive}
							setFirstNameInputActive={setFirstNameInputActive}
							guest={guest}
							deleteGuest={deleteGuest}
							getNonAttGuestsIfDeadline={getNonAttGuestsIfDeadline}
							updateGuest={updateGuest}
							addDeadline={addDeadline}
						/>
					);
				})}
			</div>
		);
	} else {
		return <div />;
	}
}
