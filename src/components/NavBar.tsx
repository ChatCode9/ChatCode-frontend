import styled from 'styled-components';

import LockOpenIcon from '@mui/icons-material/LockOpen';
import SearchIcon from '@mui/icons-material/Search';

function Navbar() {
  return (
    <Header>
      <Nav>
        <LeftTopicMenu>
          <Topic>
            <Link href="/">
              <img src="public/NavLogo.svg" alt="Chat Code Logo" width="65px" />
            </Link>
          </Topic>
          <Topic>
            <Link href="">Community</Link>
          </Topic>
          <Topic>
            <Link href="">Topic</Link>
          </Topic>
          <Topic>
            <Link href="">Question</Link>
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

          <LoginBtn>
            <LockOpenIcon fontSize="small" color="inherit" />
            Login
          </LoginBtn>
        </RightMenu>
      </Nav>
    </Header>
  );
}
export default Navbar;

const LoginBtn = styled.button`
  width: 138px;
  height: 46px;
  border: 1px solid black;
  border-radius: 50px;
  margin-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5d5a88;
  color: #ffffff;
  font-size: 18px;
  &:hover {
    background-color: #6d758f;
    color: #ffffff;
    border: 1px solid #6d758f;
  }
`;

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
`;
const Topic = styled.div`
  margin-left: 30px;
`;
const Link = styled.a`
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
  border: none;
  margin-right: 5px;

  &:hover {
    color: #5d5a88;
  }
`;

const FlexBox = styled.div`
  flex-grow: 1;
`;
