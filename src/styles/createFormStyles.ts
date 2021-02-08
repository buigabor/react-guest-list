import { css } from '@emotion/react';

export const createFormStyles = css`
  width: 300px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    div {
      width: 100%;
    }
    margin: 30px 0;
  }
  .header-text {
    position: relative;
    right: 130px;
    font-weight: 600;
    font-size: 24px;
    color: black;
    border: 1px solid #b8b8b8;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    max-width: 200px;
    padding: 12px 0;
  }

  button {
    color: #fff;
    border-radius: 4px;
    background-color: #f5534f;
    font-weight: 600;
    margin-top: 13px;
    border: none;
    padding: 10px 40px;
    font-size: 15px;
    max-width: 250px;
    cursor: pointer;
    &:hover {
      background-color: #fb706e;
    }
  }
`;
