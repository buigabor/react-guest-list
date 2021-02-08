/** @jsxImportSource @emotion/react */
import Checkbox from '@material-ui/core/Checkbox';
import React, { useEffect, useState } from 'react';
import { Guest } from '../models/interfaces';
import { fieldStyles } from '../styles/fieldStyles';

type FieldProps = {
	deleteGuest: (id: number) => Promise<Guest>;
	updateGuest: (id: number, attending: boolean) => Promise<Guest>;
	updateGuestName: (
		firstName: string | undefined,
		lastName: string | undefined,
		id: number,
	) => Promise<Guest>;
	guest: Guest;
};

export default function Field({
	updateGuestName,
	guest,
	deleteGuest,
	updateGuest,
}: FieldProps) {
	const [activeFirstName, setActiveFirstName] = useState(false);
	const [activeLastName, setActiveLastName] = useState(false);
	const [firstName, setFirstName] = useState(guest.firstName);
	const [lastName, setLastName] = useState(guest.lastName);
	useEffect(() => {
		const blurInput = () => {
			setActiveLastName(false);
			setActiveFirstName(false);
		};
		document.body.addEventListener('click', blurInput);

		return () => {
			document.body.removeEventListener('click', blurInput);
		};
	}, [activeLastName, activeFirstName]);
	const handleKeyPress = (
		e: React.KeyboardEvent<HTMLInputElement>,
		mode: string,
	) => {
		if (e.key === 'Enter' && mode === 'first-name') {
			updateGuestName(
				(e.target as HTMLInputElement).value,
				undefined,
				guest.id,
			);
			return setActiveFirstName(false);
		} else if (e.key === 'Enter' && mode === 'last-name') {
			updateGuestName(
				undefined,
				(e.target as HTMLInputElement).value,
				guest.id,
			);
			return setActiveLastName(false);
		}
	};

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		mode: string,
	) => {
		if (mode === 'first-name') {
			setFirstName(e.target.value);
		} else {
			setLastName(e.target.value);
		}
	};

	return (
		<div css={fieldStyles}>
			<div className='names__wrapper' id={String(guest.id)}>
				{activeFirstName ? (
					<>
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
							onBlur={() => {
								setActiveFirstName(false);
							}}
						/>
						<div>{lastName}</div>
					</>
				) : activeLastName ? (
					<>
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
							onBlur={() => {
								setActiveLastName(false);
							}}
						/>
					</>
				) : (
					<>
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
					</>
				)}
				<Checkbox
					inputProps={{ 'aria-label': 'primary checkbox' }}
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
					<i className='fas fa-trash' />
				</button>
			</div>
		</div>
	);
}
