import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { React, useRef, useState } from 'react';

export default function Filter({ allGuests, setFilteredGuests }) {
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
		<div>
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
				onClick={() => {
					handleResetFilter();
				}}
			>
				Reset Filter
			</button>
		</div>
	);
}
