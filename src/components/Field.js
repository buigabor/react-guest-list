/** @jsxImportSource @emotion/react */
import { React, useState } from 'react';
import { fieldStyles } from './fieldStyles';

export default function Field({
	updateGuestName,
	guest,
	deleteGuest,
	getNonAttGuestsIfDeadline,
	updateGuest,
	addDeadline,
}) {
	const [activeFirstName, setActiveFirstName] = useState(false);
	const [activeLastName, setActiveLastName] = useState(false);
	const [firstName, setFirstName] = useState(guest.firstName);
	const [lastName, setLastName] = useState(guest.lastName);

	const handleKeyPress = (e, mode) => {
		if (e.key === 'Enter' && mode === 'first-name') {
			updateGuestName(e.target.value, undefined, guest.id);
			return setActiveFirstName(false);
		} else if (e.key === 'Enter' && mode === 'last-name') {
			updateGuestName(undefined, e.target.value, guest.id);
			return setActiveLastName(false);
		}
	};

	const handleOnChange = (e, mode) => {
		if (mode === 'first-name') {
			setFirstName(e.target.value);
		} else {
			setLastName(e.target.value);
		}
	};

	if (addDeadline) {
		const nonAttendingGuests = getNonAttGuestsIfDeadline();
		console.log(nonAttendingGuests);
		if (nonAttendingGuests) {
			let nonAttendingDiv;
			for (let i = 0; i < nonAttendingGuests.length; i++) {
				let guestId = nonAttendingGuests[i].id;
				nonAttendingDiv = document.getElementById(guestId);
				nonAttendingDiv.classList.add('non-attending');
			}
		}
	}

	return (
		<div css={fieldStyles}>
			{' '}
			{activeFirstName ? (
				<div className='names__wrapper' id={guest.id}>
					<input
						id={guest.id}
						type='checkbox'
						name={guest.id}
						checked={guest.attending}
						onChange={(e) => {
							updateGuest(guest.id, !!e.target.checked);
						}}
					/>
					<input
						value={firstName}
						type='text'
						onKeyDown={(e) => {
							handleKeyPress(e, 'first-name');
						}}
						onChange={(e) => {
							handleOnChange(e, 'first-name');
						}}
						id={guest.id}
						onBlur={() => {
							setActiveFirstName(false);
						}}
						autoFocus
					/>
					<div>{lastName}</div>
					<button
						onClick={() => {
							deleteGuest(guest.id);
						}}
					>
						x
					</button>
				</div>
			) : activeLastName ? (
				<div className='names__wrapper' id={guest.id}>
					<input
						id={guest.id}
						type='checkbox'
						name={guest.id}
						checked={guest.attending}
						onChange={(e) => {
							updateGuest(guest.id, !!e.target.checked);
						}}
					/>
					<div className='names__first-name'>{firstName}</div>
					<input
						value={lastName}
						type='text'
						onKeyDown={(e) => {
							handleKeyPress(e, 'last-name');
						}}
						onChange={(e) => {
							handleOnChange(e, 'last-name');
						}}
						id={guest.id}
						onBlur={() => {
							setActiveLastName(false);
						}}
						autoFocus
					/>
					<button
						onClick={() => {
							deleteGuest(guest.id);
						}}
					>
						x
					</button>
				</div>
			) : (
				<div className='names__wrapper' id={guest.id}>
					<input
						id={guest.id}
						type='checkbox'
						name={guest.id}
						checked={guest.attending}
						onChange={(e) => {
							updateGuest(guest.id, !!e.target.checked);
						}}
					/>
					<div
						onDoubleClick={() => {
							setActiveFirstName(true);
						}}
						className='names__first-name'
					>
						{firstName}
					</div>
					<div
						onDoubleClick={() => {
							setActiveLastName(true);
						}}
					>
						{lastName}
					</div>
					<button
						onClick={() => {
							deleteGuest(guest.id);
						}}
					>
						x
					</button>
				</div>
			)}
		</div>
	);
}
