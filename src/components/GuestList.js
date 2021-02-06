/** @jsxImportSource @emotion/react */
import { React } from 'react';
import Field from './Field';
import { guestListStyles } from './guestListStyles';

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
			<div css={guestListStyles}>
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
