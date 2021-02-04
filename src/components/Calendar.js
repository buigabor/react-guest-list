import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Calendar({ setDeadline, deadline, setAddDeadLine }) {
	return (
		<div>
			<ReactDatePicker
				selected={deadline}
				onChange={(date) => {
					setDeadline(date);
				}}
				isClearable
				placeholderText='I have been cleared!'
			/>
			<button
				onClick={() => {
					setAddDeadLine(true);
				}}
			>
				Set Deadline
			</button>
		</div>
	);
}
