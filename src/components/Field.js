/** @jsxImportSource @emotion/react */
import Checkbox from '@material-ui/core/Checkbox';
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
						className='first-name'
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
					/>
					<div>{lastName}</div>
					<Checkbox
						inputProps={{ 'aria-label': 'primary checkbox' }}
						id={guest.id + '-checkbox'}
						type='checkbox'
						name={guest.id + '-checkbox'}
						checked={guest.attending}
						onChange={(e) => {
							updateGuest(guest.id, !!e.target.checked);
						}}
					/>
					<button
						className='delete-button'
						onClick={() => {
							deleteGuest(guest.id);
						}}
					>
						<i className='fas fa-trash'></i>
					</button>
				</div>
			) : activeLastName ? (
				<div className='names__wrapper' id={guest.id}>
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
					/>
					<Checkbox
						inputProps={{ 'aria-label': 'primary checkbox' }}
						id={guest.id}
						type='checkbox'
						name={guest.id}
						checked={guest.attending}
						onChange={(e) => {
							updateGuest(guest.id, !!e.target.checked);
						}}
					/>
					<button
						className='delete-button'
						onClick={() => {
							deleteGuest(guest.id);
						}}
					>
						<i className='fas fa-trash'></i>
					</button>
				</div>
			) : (
				<div className='names__wrapper' id={guest.id}>
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
					<Checkbox
						inputProps={{ 'aria-label': 'primary checkbox' }}
						id={guest.id}
						type='checkbox'
						name={guest.id}
						checked={guest.attending}
						onChange={(e) => {
							updateGuest(guest.id, !!e.target.checked);
						}}
					/>
					<button
						className='delete-button'
						onClick={() => {
							deleteGuest(guest.id);
						}}
					>
						<i className='fas fa-trash'></i>
					</button>
				</div>
			)}
		</div>
	);
}
