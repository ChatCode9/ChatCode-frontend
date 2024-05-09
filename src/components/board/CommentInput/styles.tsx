import styled, { css } from 'styled-components';

export const Form = styled.form<{ $type: 'textarea' | 'editor' }>`
  /* display: flex; */
  /* flex-direction: ${(props) => (props.$type === 'textarea' ? 'row' : '')}; */
  align-items: center;

  textarea {
    resize: none;
    outline: none;
    margin-right: 15px;
  }

  .btn-submit {
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border: none;
    outline: none;
    background-color: #6d758f;
    color: #fff;
    border-radius: 5px;
    padding: 10px 15px;
  }

  .editor {
    width: 100%;
  }

  .btn-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  ${(props) =>
    props.$type === 'editor' &&
    css`
      .btn-submit {
        display: block;
        margin-top: 50px;
        justify-self: flex-end;
      }
    `}
`;
