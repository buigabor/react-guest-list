import { css } from '@emotion/react';

export const eventFieldStyles = css`
  display: flex;
  align-items: center;
  .event {
    max-width: 300px;
    padding: 1.4rem 1.4rem;
    border-radius: 10px;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    box-shadow: 0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 26%);
    transition: all 0.2s ease-in-out;
    border: none;
    font-size: 16px;
    outline: none;
    &:hover {
      background: rgba(215, 217, 219, 0.308);
    }
    div:first-of-type {
      margin-bottom: 7px;
    }
  }
  .event-delete {
    box-shadow: none;
    background: none;
    border: none;
    cursor: pointer;
    color: #5c7080;
    font-size: 15px;
    margin-left: 10px;
    outline: none;
  }
`;
