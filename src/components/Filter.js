import React from 'react';

export default function Filter({
	setAllGuests,
	allGuests,
	filteredGuests,
	setFilteredGuests,
}) {
	function handleFilter(e, attending) {
		const checked = e.target.checked;
		if (checked) {
			const filteredGuests = allGuests.filter((guest) => {
				return guest.attending === attending;
			});
			console.log(filteredGuests);
			return setFilteredGuests(filteredGuests);
		}
		setFilteredGuests(allGuests);
	}

	function handleResetFilter() {
		const inputAttending = document.getElementById('attending');
		const inputNonAttending = document.getElementById('non-attending');
		inputAttending.checked = false;
		inputNonAttending.checked = false;
		setFilteredGuests(allGuests);
	}
	return (
		<div>
			<label htmlFor='attending'>Attending</label>
			<input
				type='radio'
				name='attendance'
				id='attending'
				onChange={(e) => {
					handleFilter(e, true);
				}}
			/>
			<label htmlFor='non-attending'>Non-Attending</label>
			<input
				type='radio'
				name='attendance'
				id='non-attending'
				onChange={(e) => {
					handleFilter(e, false);
				}}
			/>
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
