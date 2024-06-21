import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 70px;

    button {
        font-size: 16px;
        outline: none;
        border-radius: 8px;
        padding: 10px 15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    button + button {
        margin-left: 10px;
    }

    .btn-delete {
        background-color: #da5747;
        border: none;
        color: #fff;
    }

    .btn-save {
        background-color: #f8faff;
        color: #6d758f;
        border: 1px solid #e1e4ed;
    }

    .btn-post {
        background-color: #6d758f;
        border: none;
        color: #fff;
    }
`;
