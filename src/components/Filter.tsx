/** @jsxImportSource @emotion/react */

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { SetStateAction, useRef, useState } from 'react';
import { Guest } from '../models/interfaces';
import { filterStyles } from '../styles/filterStyles';
import DeleteAllButton from './DeleteAllButton';

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
