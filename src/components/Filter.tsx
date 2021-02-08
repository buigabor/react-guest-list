/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { SetStateAction, useRef, useState } from 'react';
import { Guest } from '../models/interfaces';
import DeleteAllButton from './DeleteAllButton';

const filterStyles = css`
	padding: 20px 0;
	.reset-filter-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 3px;
		cursor: pointer;
		padding: 5px 10px;
		font-size: 14px;
		min-width: 30px;
		min-height: 30px;
		background-color: #fff;
		border: 1px solid #b8b8b8;
		transition: all 0.3s;
		outline: none;
		&:hover {
			background: rgba(172, 179, 185, 0.835);
			text-decoration: none;
		}
	}
	.filter-wrapper {
		display: flex;
		align-items: center;
	}
`;

type Props = {
	allGuests: Guest[] | [];
	setFilteredGuests: React.Dispatch<SetStateAction<[] | Guest[]>>;
	deleteGuest: (id: number) => Promise<Guest>;
};

export default function Filter({
	allGuests,
	setFilteredGuests,
	deleteGuest,
}: Props) {
	const [attendingChecked, setAttendingChecked] = useState<boolean>(false);
	const [nonAttendingChecked, setNonAttendingChecked] = useState<boolean>(
		false,
	);
	const inputAttending = useRef();
	const inputNonAttending = useRef();

	function handleFilter(attendance: string) {
		if (attendance === 'attending') {
			const filteredGuests = allGuests.filter((guest) => {
				return guest.attending === true;
			});
			return setFilteredGuests(filteredGuests);
		}
		const filteredGuests = allGuests.filter((guest) => {
			return guest.attending === false;
		});
		setFilteredGuests(filteredGuests);
	}

	function handleResetFilter() {
		setAttendingChecked(false);
		setNonAttendingChecked(false);
		setFilteredGuests(allGuests);
	}
	return (
		<div css={filterStyles}>
			<div className='filter-wrapper'>
				<FormControl component='fieldset'>
					<RadioGroup
						row
						aria-label='gender'
						name='gender1'
						onChange={(e) => {
							handleFilter(e.target.value);
						}}
					>
						<FormControlLabel
							checked={attendingChecked}
							inputRef={inputAttending}
							value='attending'
							control={<Radio />}
							label='Attending'
							onChange={(e) => {
								setAttendingChecked((e.target as HTMLInputElement).checked);
								setNonAttendingChecked(!(e.target as HTMLInputElement).checked);
							}}
						/>
						<FormControlLabel
							checked={nonAttendingChecked}
							inputRef={inputNonAttending}
							value='non-attending'
							control={<Radio />}
							label='Non-Attending'
							onChange={(e) => {
								setAttendingChecked(!(e.target as HTMLInputElement).checked);
								setNonAttendingChecked((e.target as HTMLInputElement).checked);
							}}
						/>
					</RadioGroup>
				</FormControl>

				<button
					className='reset-filter-button'
					onClick={() => {
						handleResetFilter();
					}}
				>
					Reset Filter
				</button>
				<DeleteAllButton allGuests={allGuests} deleteGuest={deleteGuest} />
			</div>
		</div>
	);
}