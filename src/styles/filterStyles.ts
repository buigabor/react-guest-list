import { css } from '@emotion/react';

export const filterStyles = css`
  padding: 20px 0;
  .reset-filter-button {
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
    outline: none;
    &:hover {
      background: rgba(172, 179, 185, 0.835);
      text-decoration: none;
    }
  }
  .filter-wrapper {
    display: flex;
    align-items: center;
  }
`;
