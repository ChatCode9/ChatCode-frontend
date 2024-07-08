import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SearchIcon from '@mui/icons-material/Search';
import LoginButton from './LoginButton';
import { isLoggedInState } from '../../atoms/authState';

function Navbar() {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  console.log(isLoggedIn);

  return (
    <Header>
      <Nav>
        <LeftTopicMenu>
          <Topic>
            <Linked to="/">
              <img src="/NavLogo.svg" alt="Chat Code Logo" width="65px" />
            </Linked>
          </Topic>
          <Topic>
            <Linked to="/board/free">Community</Linked>
          </Topic>
          <Topic>
            <Linked to="/board/question">Question</Linked>
          </Topic>
        </LeftTopicMenu>

        <FlexBox></FlexBox>
        <RightMenu>
          <StyledSearchInput>
            <SearchInput name="search" placeholder="Search for..." />
            <IconBox>
              <SearchIcon />
            </IconBox>
          </StyledSearchInput>

          {isLoggedIn ? '로그아웃' : <LoginButton />}
        </RightMenu>
      </Nav>
    </Header>
  );
}
export default Navbar;

const Header = styled.header`
  display: flex;
  width: 100%;
  height: 110px;
  position: relative;
  z-index: 20;
  border-bottom: 3px solid #f2f1fa;
  align-items: center;
  justify-content: center;
`;
const Nav = styled.nav`
  width: 100%;
  height: 100px;
  display: flex;
`;
const LeftTopicMenu = styled.div`
  display: flex;
  align-items: center;
`;
const Topic = styled.div`
  margin-left: 30px;
`;
const Linked = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #5d5a88;
  text-decoration: none;
  outline: none;
`;
const RightMenu = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
`;
const StyledSearchInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  width: 257px;
  height: 46px;
  border-radius: 50px;
  font-size: 15px;
  background-color: #f2f1fa;
  color: #767494;
`;
const SearchInput = styled.input`
  padding-left: 20px;
  width: 190px;
  height: 40px;
  font-size: 15px;
  border: none;
  outline: none;
  background-color: #f2f1fa;
  color: #767494;
`;
const IconBox = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 40px;
  color: #767494;
  background-color: transparent;
  border: none;
  margin-right: 5px;

  &:hover {
    color: #5d5a88;
  }
`;

const FlexBox = styled.div`
  flex-grow: 1;
`;
