import { css } from '@emotion/react';

export const eventFieldStyles = css`
	max-width: 300px;
	padding: 1rem 1rem;
	border-radius: 10px;
	margin: 10px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #fff;
	box-shadow: 0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 26%);
	transition: all 0.2s ease-in-out;
	&:hover {
		background: rgba(215, 217, 219, 0.308);
	}
`;
