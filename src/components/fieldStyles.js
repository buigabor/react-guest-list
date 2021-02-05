import { css } from '@emotion/react';

const checkboxStyle = css``;

export const fieldStyles = css`
	max-width: 300px;
	padding: 1rem 1rem;
	border-radius: 10px;
	margin: 10px 0;
	display: flex;
	align-items: center;
	background: #fff;
	box-shadow: 0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 26%);

	.names {
		&__wrapper {
			display: flex;
			align-items: center;
		}

		&__first-name {
			margin-right: 10px;
		}
	}
	.non-attending {
		color: red;
	}

	.delete-button {
		box-shadow: none;
		background: none;
		border: none;
		cursor: pointer;
	}

	.fa-trash {
		color: #5c7080;
	}

	${checkboxStyle}
`;
