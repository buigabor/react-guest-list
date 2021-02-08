/** @jsxImportSource @emotion/react */
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
import { Guest, IEvent } from './models/interfaces';
import {
	actionsStyles,
	appStyles,
	guessListWrapperStyles,
} from './styles/appStyles';

const baseUrl = 'http://localhost:5000';

function App() {
	const [allGuests, setAllGuests] = useState<Guest[] | []>([]);
	const [allEvents, setAllEvents] = useState<IEvent[] | []>([]);
	const [filteredGuests, setFilteredGuests] = useState<Guest[] | []>([]);
	const [deadline, setDeadline] = useState<Date | null>(new Date());
	const [addDeadline, setAddDeadLine] = useState<string>('');
	const [view, setView] = useState<string>('');
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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

	async function createEvent(eventName: string, eventLocation: string) {
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
		if (deadline && deadline.getTime() < new Date().getTime()) {
			const guestsNonAttending = allGuests.filter((guest: Guest) => {
				return guest.attending === false;
			});
			return guestsNonAttending;
		} else {
			return null;
		}
	}

	async function createGuest(firstName: string, lastName: string) {
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

	async function deleteGuest(id: number) {
		const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
		const deletedGuest = await response.json();
		await fetchAllGuests();
		return deletedGuest;
	}

	async function updateGuest(id: number, attending: boolean) {
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

	async function updateGuestName(
		firstName: string | undefined,
		lastName: string | undefined,
		id: number,
	) {
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

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	if (addDeadline === 'add') {
		const nonAttendingGuests = getNonAttGuestsIfDeadline();
		if (nonAttendingGuests) {
			let nonAttendingDiv;
			for (let i = 0; i < nonAttendingGuests.length; i++) {
				const guestId = nonAttendingGuests[i].id;
				nonAttendingDiv = document.getElementById(String(guestId));
				nonAttendingDiv!.classList.add('non-attending');
			}
		}
	} else if (addDeadline === 'clear') {
		for (let i = 0; i < filteredGuests.length; i++) {
			const guestId = filteredGuests[i].id;
			const filteredGuestsDivs = document.getElementById(String(guestId));
			filteredGuestsDivs!.classList.remove('non-attending');
		}
	}

	return (
		<div css={appStyles}>
			<div className='menu'>
				<Button
					aria-controls='simple-menu'
					aria-haspopup='true'
					onClick={handleClick}
				>
					Select List
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
								setFilteredGuests={setFilteredGuests}
								deleteGuest={deleteGuest}
							/>
							<GuestList
								filteredGuests={filteredGuests}
								updateGuest={updateGuest}
								deleteGuest={deleteGuest}
								updateGuestName={updateGuestName}
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
					<div className='preview'>Please select a list!</div>
				)}
			</div>
			<div css={actionsStyles}>
				<CreateGuestForm createGuest={createGuest} />
				<Event createEvent={createEvent} />
			</div>
		</div>
	);
}

export default App;