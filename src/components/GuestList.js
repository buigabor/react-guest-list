/** @jsxImportSource @emotion/react */
import { React } from 'react';
import Field from './Field';
import { guestListStyles } from './guestListStyles';

export default function GuestList({
	allGuests,
	deleteGuest,
	updateGuest,
	filteredGuests,
	firstNameInputActive,
	setFirstNameInputActive,
	updateGuestName,
	getNonAttGuestsIfDeadline,
	addDeadline,
}) {
	// custom hook to get previous value

	if (filteredGuests) {
		return (
			<div css={guestListStyles}>
				{filteredGuests.map((guest) => {
					return (
						<Field
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
					// return (
					// 	<>
					// 		<div key={guest.id} className='wrapper'>
					// 			<input
					// 				id={guest.id}
					// 				type='checkbox'
					// 				name={guest.id}
					// 				checked={guest.attending}
					// 				onChange={(e) => {
					// 					updateGuest(guest.id, !!e.target.checked);
					// 				}}
					// 			/>
					// 			<label htmlFor={guest.id}>
					// 				{guest.firstName} {guest.lastName}
					// 			</label>
					// 			<button
					// 				onClick={() => {
					// 					deleteGuest(guest.id);
					// 				}}
					// 			>
					// 				x
					// 			</button>
					// 		</div>
					// 	</Field>
					// );
				})}
			</div>
		);
	} else {
		return <></>;
	}
}
