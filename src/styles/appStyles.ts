import { css } from '@emotion/react';

export const guessListWrapperStyles = css`
  grid-area: list;
  margin: 0 1rem;
  padding: 2.5rem 1rem 0rem 1rem;
  overflow-y: auto;
  border-right: 1px solid #b8b8b8;
  .guestlist-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .field-wrapper {
    min-width: 270px;
  }
  .footer-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const actionsStyles = css`
  position: relative;
  grid-area: action;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
`;

export const appStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'list action';
  margin: 2rem 2rem;
  border-radius: 15px;
  background: #fff;

  height: 90vh;
  box-shadow: 0 0 0 1px rgb(16 22 26 / 10%), 0 4px 8px rgb(16 22 26 / 20%),
    0 18px 46px 6px rgb(16 22 26 / 20%);

  .menu {
    position: absolute;
    top: 50px;
    left: 60px;
  }

  .preview {
    font-size: 27px;
    font-weight: 600;
    position: relative;
    top: 120px;
    left: 150px;
  }
`;
