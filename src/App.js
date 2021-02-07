/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useEffect, useState } from 'react';
import './App.css';
import AllEvents from './components/AllEvents';
import Calendar from './components/Calendar';
import CreateGuestForm from './components/CreateGuestForm';
import Event from './components/Event';
import Filter from './components/Filter';
import GuestList from './components/GuestList';

const baseUrl = 'http://localhost:5000';

const guessListWrapperStyles = css`
	grid-area: list;
	margin: 0 1rem;
	padding: 0 1rem;
	overflow-y: auto;
	border-right: 1px solid #b8b8b8;
	.guestlist-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.field-wrapper {
		min-width: 270px;
	}
	.footer-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

const actionsStyles = css`
	position: relative;
	grid-area: action;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 30px;
`;

const appStyles = css`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr;
	grid-template-areas: 'list action';
	margin: 8rem 2rem;
	border-radius: 15px;
	background: #fff;

	height: 90vh;
	box-shadow: 0 0 0 1px rgb(16 22 26 / 10%), 0 4px 8px rgb(16 22 26 / 20%),
		0 18px 46px 6px rgb(16 22 26 / 20%);
`;

function App() {
	const [allGuests, setAllGuests] = useState();
	const [allEvents, setAllEvents] = useState();
	const [filteredGuests, setFilteredGuests] = useState();
	const [deadline, setDeadline] = useState(new Date());
	const [addDeadline, setAddDeadLine] = useState(false);
	const [view, setView] = useState('');
	console.log(view);
	const [anchorEl, setAnchorEl] = useState(null);

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

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		console.log(event.currentTarget);
	};

	return (
		<div css={appStyles}>
			<div>
				<Button
					aria-controls='simple-menu'
					aria-haspopup='true'
					onClick={handleClick}
				>
					Open Menu
				</Button>
				<Menu
					id='simple-menu'
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={() => {
						setAnchorEl(null);
					}}
				>
					<MenuItem
						onClick={() => {
							setView('guest-list');
							setAnchorEl(null);
						}}
					>
						Guess List
					</MenuItem>
					<MenuItem
						onClick={() => {
							setView('event-list');
							setAnchorEl(null);
						}}
					>
						Event List
					</MenuItem>
				</Menu>
			</div>
			<div css={guessListWrapperStyles}>
				{view === 'guest-list' ? (
					<>
						<div className='guestlist-wrapper'>
							<Filter
								allGuests={allGuests}
								setAllGuests={setAllGuests}
								filteredGuests={filteredGuests}
								setFilteredGuests={setFilteredGuests}
								deleteGuest={deleteGuest}
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
						</div>
						<div className='footer-wrapper'>
							<Calendar
								deadline={deadline}
								setDeadline={setDeadline}
								setAddDeadLine={setAddDeadLine}
							/>
						</div>
					</>
				) : view === 'event-list' ? (
					<div className='guestlist-wrapper'>
						<AllEvents allEvents={allEvents} />
					</div>
				) : (
					<div>Please select a view!</div>
				)}
			</div>
			<div css={actionsStyles}>
				<CreateGuestForm createGuest={createGuest} />
				<Event createEvent={createEvent} allEvents={allEvents} />
			</div>
		</div>
	);
}

export default App;
