import React from 'react';

export default function DeleteAllButton({ allGuests, deleteGuest }) {
	function handleDeleteAll() {
		allGuests.forEach((guest) => {
			deleteGuest(guest.id);
		});
	}

	return (
		<div>
			<button onClick={handleDeleteAll}>Delete All</button>
		</div>
	);
}
