import styled from 'styled-components';

export const Form = styled.form`
  margin-top: 10px;
  position: relative;

  textarea {
    outline: none;
    resize: none;
  }

  .top {
    position: absolute;
    top: -35px;
    right: 0;
  }

  .btn-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  .btn-submit {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #6d758f;
    color: #fff;
    border: none;
    outline: none;
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 14px;
  }

  .parent-scroll {
    border: 1px solid red;
    overflow-y: auto;
  }

  #scrolling-container {
    border: 1px solid black;
  }

  .ql-clipboard {
    position: fixed !important;
  }

  .ql-container {
    height: auto !important;
  }

  .ql-editor {
    height: auto !important;
  }
`;
