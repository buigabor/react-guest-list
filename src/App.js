/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import DeleteAllButton from './components/DeleteAllButton';
import Event from './components/Event';
import Filter from './components/Filter';
import GuestList from './components/GuestList';
const baseUrl = 'http://localhost:5000';

const guessListWrapperStyles = css`
	grid-area: list;
	margin: 0 1rem;
	padding: 0 1rem;
	overflow-y: auto;
`;

const actionsStyles = css`
	grid-area: action;
`;

const appStyles = css`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr;
	grid-template-areas: 'list action';
	margin: 2rem;
	border-radius: 15px;
	background: #fff;
	min-width: 80vw;
	min-height: 80vh;
	box-shadow: 0 0 0 1px rgb(16 22 26 / 10%), 0 4px 8px rgb(16 22 26 / 20%),
		0 18px 46px 6px rgb(16 22 26 / 20%);
`;

function App() {
	const [allGuests, setAllGuests] = useState();
	const [allEvents, setAllEvents] = useState();
	const [filteredGuests, setFilteredGuests] = useState();
	const [deadline, setDeadline] = useState(new Date());
	const [addDeadline, setAddDeadLine] = useState(false);

	async function fetchAllEvents() {
		const response = await fetch(`${baseUrl}/event`);
		const allEventsFetched = await response.json();
		setAllEvents(allEventsFetched);
	}

	async function fetchAllGuests() {
		const response = await fetch(`${baseUrl}/`);
		const allGuestsFetched = await response.json();
		setAllGuests(allGuestsFetched);
		setFilteredGuests(allGuestsFetched);
	}

	useEffect(() => {
		fetchAllGuests();
		fetchAllEvents();
	}, []);

	async function createEvent(eventName, eventLocation) {
		const response = await fetch(`${baseUrl}/event`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ eventName, eventLocation }),
		});
		const createdEvent = await response.json();
		await fetchAllEvents();
		return createdEvent;
	}

	function getNonAttGuestsIfDeadline() {
		if (deadline.getTime() < new Date().getTime()) {
			const guestsNonAttending = allGuests.filter((guest) => {
				return guest.attending === false;
			});
			return guestsNonAttending;
		} else {
			return null;
		}
	}

	async function createGuest(firstName, lastName) {
		const response = await fetch(`${baseUrl}/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ firstName, lastName }),
		});
		const createdGuest = await response.json();
		await fetchAllGuests();
		return createdGuest;
	}

	async function deleteGuest(id) {
		const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
		const deletedGuest = await response.json();
		await fetchAllGuests();
		return deletedGuest;
	}

	async function updateGuest(id, attending) {
		const response = await fetch(`${baseUrl}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ attending }),
		});
		const updatedGuest = await response.json();
		await fetchAllGuests();
		return updatedGuest;
	}

	async function updateGuestName(firstName, lastName, id) {
		const response = await fetch(`${baseUrl}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ firstName, lastName }),
		});
		const updatedGuest = await response.json();
		await fetchAllGuests();
		return updatedGuest;
	}

	return (
		<div css={appStyles}>
			<div css={guessListWrapperStyles}>
				<Filter
					allGuests={allGuests}
					setAllGuests={setAllGuests}
					filteredGuests={filteredGuests}
					setFilteredGuests={setFilteredGuests}
				/>
				<GuestList
					filteredGuests={filteredGuests}
					allGuests={allGuests}
					updateGuest={updateGuest}
					deleteGuest={deleteGuest}
					updateGuestName={updateGuestName}
					getNonAttGuestsIfDeadline={getNonAttGuestsIfDeadline}
					addDeadline={addDeadline}
				/>

				<DeleteAllButton allGuests={allGuests} deleteGuest={deleteGuest} />
			</div>
			<div css={actionsStyles}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const firstName = document.getElementById('first-name').value;
						const lastName = document.getElementById('last-name').value;
						createGuest(firstName, lastName);
					}}
				>
					<label htmlFor='first-name'>First Name:</label>
					<input type='text' name='first-name' id='first-name' />
					<label htmlFor='last-name'>Last Name:</label>
					<input type='text' name='last-name' id='last-name' />
					<button>Create Guest</button>
				</form>
				<Event createEvent={createEvent} allEvents={allEvents} />
				<Calendar
					deadline={deadline}
					setDeadline={setDeadline}
					setAddDeadLine={setAddDeadLine}
				/>
			</div>
		</div>
	);
}

export default App;
