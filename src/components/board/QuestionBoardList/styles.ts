import styled, { css } from 'styled-components';


export const BoardListWrapper = styled.ul`
    padding-bottom: 50px;
`;

export const Board = styled.li`
    position: relative;
    display: flex;
    border: 1px solid #BCBACD;
    border-radius: 10px;
    margin-top: 5px;
    padding: 40px 40px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
`;

export const BoardItemWrapper = styled.li<{ $status: string }>`
    position: relative;
    display: flex;
    border: 1px solid #BCBACD;
    border-radius: 10px;
    margin-top: 5px;
    ${(props) =>
  props.$status === 'finish' &&
  css`
                background-color: #dfdee7;
            `}
`;

export const StatusWrapper = styled.div`
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const BoardStatus = styled.div<{ $status: string }>`
    width: 87px;
    height: 44px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2px;
    font-weight: 700;
    font-size: 14px;

    color: ${(props) => (props.$status === 'wait' ? '#5d5a88' : '#fff')};
    border: ${(props) => (props.$status === 'wait' ? '2px solid #8d8ba7' : 'none')};
    background-color: ${(props) => (props.$status === 'wait' ? 'transparnt' : '#5D5A88')};
`;

export const BoardWrapper = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
`;

export const BoardContent = styled.div`
    margin-top: 20px;

    .title {
        font-size: 20px;
        font-weight: 700;
    }

    .content {
        max-width: 700px;
        margin-top: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* 라인수 */
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        line-height: 1.2em;
        height: 3.6em;
    }
`;

export const BookMarkWrapper = styled.div`
    position: absolute;
    right: 10px;
    top: 5px;
    font-size: 30px;
    cursor: pointer;
`;

export const MoreWrapper = styled.div`
    position: absolute;
    right: -5px;
    top: 0px;
`;
