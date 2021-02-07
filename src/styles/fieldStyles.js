import { css } from '@emotion/react';

export const fieldStyles = css`
	max-width: 300px;
	padding: 1rem 1rem;
	border-radius: 10px;
	margin: 10px 0;
	display: flex;
	align-items: center;
	background: #fff;
	box-shadow: 0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 26%);
	transition: all 0.2s ease-in-out;
	&:hover {
		background: rgba(215, 217, 219, 0.308);
	}

	.names {
		&__wrapper {
			display: flex;
			align-items: center;
			input {
				width: 100%;
			}
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

	.filter-btn {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border: none;
		border-radius: 3px;
		cursor: pointer;
		padding: 5px 10px;
		vertical-align: middle;
		text-align: left;
		font-size: 14px;
		min-width: 30px;
		min-height: 30px;
	}
`;
