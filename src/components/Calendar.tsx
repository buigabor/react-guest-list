/** @jsxImportSource @emotion/react */
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
	buttonStyles,
	clearDeadlineBtnStyles,
	datePickerStyles,
} from '../styles/calendarStyles';

type CalendarProps = {
	setDeadline: React.Dispatch<React.SetStateAction<Date | null>>;
	deadline: Date | null;
	setAddDeadLine: React.Dispatch<React.SetStateAction<string>>;
};

export default function Calendar({
	setDeadline,
	deadline,
	setAddDeadLine,
}: CalendarProps) {
	return (
		<div css={datePickerStyles}>
			<ReactDatePicker
				selected={deadline}
				onChange={(date: Date) => {
					setDeadline(date);
				}}
				placeholderText='Select a deadline!'
			/>
			<button
				css={buttonStyles}
				onClick={() => {
					setAddDeadLine('add');
				}}
			>
				Set Deadline
			</button>
			<button
				css={clearDeadlineBtnStyles}
				onClick={() => {
					setAddDeadLine('clear');
					setDeadline(null);
				}}
			>
				Clear Deadline
			</button>
		</div>
	);
}
