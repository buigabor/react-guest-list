/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const buttonStyles = css`
	color: #fff;
	border-radius: 4px;
	background-color: #f5534f;
	font-weight: 400;
	margin-top: 13px;
	border: none;
	padding: 6px 20px;
	font-size: 14px;
	max-width: 150px;
	margin-left: 10px;
	cursor: pointer;
	&:hover {
		background-color: #fb706e;
	}
`;

const datePickerStyles = css`
	position: relative;
	left: 14px;
	margin-bottom: 30px;
`;

export default function Calendar({ setDeadline, deadline, setAddDeadLine }) {
	return (
		<div css={datePickerStyles}>
			<ReactDatePicker
				selected={deadline}
				onChange={(date) => {
					setDeadline(date);
				}}
				placeholderText='Select a deadline!'
			/>
			<button
				css={buttonStyles}
				onClick={() => {
					setAddDeadLine(true);
				}}
			>
				Set Deadline
			</button>
		</div>
	);
}
