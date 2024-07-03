import styled from 'styled-components';

interface Props {
  isActive: boolean;
  onClick: () => void;
  children: string;
}

const FilterItem = ({ isActive, onClick, children }: Props) => {
  return (
    <StyledFilterItem className={isActive ? 'active' : ''} onClick={onClick}>
      <div className="dot" />
      <div>{children}</div>
    </StyledFilterItem>
  );
};

export default FilterItem;

const StyledFilterItem = styled.li`
  display: flex;
  align-items: center;
  color: #8d8ba7;
  font-weight: 700;
  cursor: pointer;

  .dot {
    width: 10px;
    height: 10px;
    background-color: #8d8ba7;
    border-radius: 100%;
    margin-right: 5px;
    margin-bottom: 3px;
  }

  &.active {
    color: #353e5c; /* 활성화된 항목의 텍스트 색상 변경 */
  }

  &.active .dot {
    background-color: #353e5c; /* 활성화된 항목의 점 색상 변경 */
  }
`;
