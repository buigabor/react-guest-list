/** @jsxImportSource @emotion/react */
import { Guest } from '../models/interfaces';
import { deleteAllButtonStyle } from '../styles/deleteAllButtonStyles';

type DeleteAllProps = {
	allGuests: Guest[] | [];
	deleteGuest: (id: number) => Promise<Guest>;
};

export default function DeleteAllButton({
	allGuests,
	deleteGuest,
}: DeleteAllProps) {
	function handleDeleteAll() {
		allGuests.forEach((guest: Guest) => {
			deleteGuest(guest.id);
		});
	}

	return (
		<div>
			<button css={deleteAllButtonStyle} onClick={handleDeleteAll}>
				Delete All
			</button>
		</div>
	);
}
