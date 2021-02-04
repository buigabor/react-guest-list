import { useEffect, useState } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import DeleteAllButton from './components/DeleteAllButton';
import Filter from './components/Filter';
import GuestList from './components/GuestList';
const baseUrl = 'http://localhost:5000';

function App() {
	const [allGuests, setAllGuests] = useState();
	const [filteredGuests, setFilteredGuests] = useState();
	const [deadline, setDeadline] = useState(new Date());
	const [addDeadline, setAddDeadLine] = useState(false);

	console.log(deadline);
	async function fetchData() {
		const response = await fetch(`${baseUrl}/`);
		const allGuests = await response.json();
		console.log(allGuests);
		setAllGuests(allGuests);
		setFilteredGuests(allGuests);
	}
	useEffect(() => {
		fetchData();
	}, []);

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
		await fetchData();
		return createdGuest;
	}

	async function deleteGuest(id) {
		const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
		const deletedGuest = await response.json();
		await fetchData();
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
		await fetchData();
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
		await fetchData();
		return updatedGuest;
	}

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const firstName = document.getElementById('first-name').value;
					const lastName = document.getElementById('last-name').value;
					createGuest(firstName, lastName);
				}}
			>
				<input type='text' id='first-name' />
				<input type='text' id='last-name' />
				<button>Create Guest</button>
			</form>
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
			<Calendar
				deadline={deadline}
				setDeadline={setDeadline}
				setAddDeadLine={setAddDeadLine}
			/>
		</div>
	);
}

export default App;
