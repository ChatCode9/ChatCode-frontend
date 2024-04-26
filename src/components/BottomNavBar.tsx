import styled from 'styled-components';
import Button from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';
function BottomNavBar() {
  return (
    <Footer>
      <TopFooter>
        <LeftFooterBox>
          <FooterLogo>
            <img src="public/FooterLogo.svg" alt="Chat Code logo" width="261px" height="35px" />
          </FooterLogo>
        </LeftFooterBox>
        <MidPolicy>
          <AboutTitle>About us</AboutTitle>
          <GitLinkBox>
            <SubTitle>Frontend</SubTitle>
            <Link href="https://github.com/sanbondeveloper">sanbondeveloper</Link>
            <Link href="https://github.com/haemalgeumi">haemalgeumi</Link>
            <Link href="https://github.com/ch0i-ji">ch0i-ji</Link>
          </GitLinkBox>
          <GitLinkBox>
            <SubTitle>Backend</SubTitle>
            <Link href="https://github.com/NaMooJoon/">NaMooJoon</Link>
            <Link href="https://github.com/minje0204">minje0204</Link>
            <Link href="https://github.com/eunzz6">eunzz6</Link>
          </GitLinkBox>
        </MidPolicy>
        <RightFooterBox>
          <RightBottonTitle>Do you need any help?</RightBottonTitle>

          <Button
            variant="contained"
            endIcon={<EastIcon />}
            sx={{
              backgroundColor: '#5D5A88',
              borderRadius: '30px',

              ':hover': { backgroundColor: '#6D758F' },
              '.MuiButton-icon': { marginLeft: '10px' },
            }}
          >
            HELP
          </Button>
        </RightFooterBox>
      </TopFooter>
      <BottomFooter>
        Copyright © 2024 Team_chatcode9 | All Rights Reserved |<PrivacyPolicy> Privacy Policy </PrivacyPolicy>|
      </BottomFooter>
    </Footer>
  );
}
export default BottomNavBar;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 20;
  overflow: hidden;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 3px solid #f2f1fa;
  height: 260px;
`;
const TopFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LeftFooterBox = styled.div`
  width: 280px;
  margin-left: 20px;
`;

const FooterLogo = styled.div`
  display: flex;
  margin: 10px;
`;

const MidPolicy = styled.div`
  display: flex;
  padding: 30px;
`;
const RightBottonTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #5d5a88;
  margin-right: 25px;
`;
const AboutTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #5d5a88;
  margin-right: 25px;
`;
const GitLinkBox = styled.div`
  margin: 7px 0 0 10px;
  width: 200px;
  height: 40px;
`;
const SubTitle = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #5d5a88;
`;

const PrivacyPolicy = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #adabc3;
  margin: 0 5px 0 5px;
`;
const Link = styled.a`
  display: flex;
  flex-direction: column;
  font-size: 19px;
  color: #5d5a88;
  text-decoration: none;
  outline: none;
`;

const RightFooterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 40px;
  margin: 100px 30px 0 0;
`;

const BottomFooter = styled.div`
  border-top: 1px solid #d4d2e3;
  width: 100%;
  height: 55px;
  color: #767494;
  display: flex;
  align-items: center;
  justify-content: center;
`;
