/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { React, useRef, useState } from 'react';
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

export default function Filter({ allGuests, setFilteredGuests, deleteGuest }) {
	const [attendingChecked, setAttendingChecked] = useState();
	const [nonAttendingChecked, setNonAttendingChecked] = useState();
	const inputAttending = useRef();
	const inputNonAttending = useRef();

	function handleFilter(attendance) {
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
								setAttendingChecked(e.target.checked);
								setNonAttendingChecked(!e.target.checked);
							}}
						/>
						<FormControlLabel
							checked={nonAttendingChecked}
							inputRef={inputNonAttending}
							value='non-attending'
							control={<Radio />}
							label='Non-Attending'
							onChange={(e) => {
								setAttendingChecked(!e.target.checked);
								setNonAttendingChecked(e.target.checked);
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
