/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const deleteAllButtonStyle = css`
	border: 1px solid #f5534f;
	color: #f5534f;
	font-weight: 500;
	box-shadow: none;
	background: #fff;
	text-decoration: none;
	padding: 6px 10px;
	margin-left: 12px;
	border-radius: 2px;
	cursor: pointer;
	font-size: 14px;
	transition: all 0.3s;
	&:hover {
		background-color: #f5534f;
		color: #fff;
	}
`;

export default function DeleteAllButton({ allGuests, deleteGuest }) {
	function handleDeleteAll() {
		allGuests.forEach((guest) => {
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
