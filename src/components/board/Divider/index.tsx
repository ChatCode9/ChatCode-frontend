import styled from 'styled-components';

function Divider() {
  return <Bar />;
}

export default Divider;

const Bar = styled.div`
  height: 4px;
  background-color: #d9d9d9;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
