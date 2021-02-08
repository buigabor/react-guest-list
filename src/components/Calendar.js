/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const clearDeadlineBtnStyles = css`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 3px;
	cursor: pointer;
	padding: 5px 10px;
	font-size: 14px;
	min-width: 30px;
	min-height: 30px;
	background-color: #fff;
	border: 1px solid #b8b8b8;
	transition: all 0.3s;
	margin-left: 10px;
	outline: none;
	&:hover {
		background: rgba(172, 179, 185, 0.835);
		text-decoration: none;
	}
`;

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
	outline: none;
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
