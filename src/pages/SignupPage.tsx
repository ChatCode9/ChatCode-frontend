import styled from 'styled-components';
import Navbar from '../components/NavBar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import { useState } from 'react';

// interface ButtonProps {
//   active: boolean;
// }
function SignupPage() {
  // const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number): void => {
    // setActiveIndex(index);
    setClicked(!clicked);
    // if (clicked === true) {
    //   setTagList([tag, ...tagList]);
    // }
  };
  const [clicked, setClicked] = useState(false);
  // const [tagList, setTagList] = useState<string[]>([]);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const tagName: string[] = [
    'frontend',
    'backend',
    'embeded',
    'ui&ux',
    'design',
    'web',
    'ios',
    'mobile',
    'ai',
    'game',
    'devops',
    'deep learning',
    'data',
    'desktop',
    'algorithm',
    'native',
    'app',
    'protect',
    'study',
    'beginner',
    'job',
    'hire',
    'employment',
    'conference',
    'job fair',
    'competition',
    'hackathon',
  ];
  return (
    <Container>
      <Navbar></Navbar>
      <LoginBox>
        <SnsLogin>
          <LoginTitle>SNS로 간편하게 시작하기</LoginTitle>
          <SnsBtn>
            <GoogleBox>
              <Link href="">google</Link>
            </GoogleBox>

            <GithubBox>
              <Link href="">github</Link>
            </GithubBox>
          </SnsBtn>
          <SignupInfoBox>회원가입에 필요한 기본정보를 입력해주세요.</SignupInfoBox>
          <NinameInfo>
            <label htmlFor="nickname_id">닉네임</label>
            <div>
              <NicknameInput
                type="text"
                id="nickname_id"
                placeholder="별명을 알파벳, 한글, 숫자를 이용해 8자 이하로 입력해주세요"
              />
            </div>
          </NinameInfo>
          <SignupInfoBox>회원님의 관심사에 대해 알려주세요</SignupInfoBox>
          <p style={{ height: '15px', color: '#6D758F' }}>
            프로필 또는 질문게시판에 작성 시 표기되며, 프로필 편집에서 수정 가능합니다.
          </p>
          {/* TODO 여러개 선택 가능하도록 */}
          <TagContainer>
            <li>
              {tagName.map((tagname, index) => (
                <TagButton
                  key={index}
                  onClick={() => handleClick(index)}
                  style={{
                    backgroundColor: clicked ? '#5D5A88' : '#ffff',
                    color: clicked ? '#ffff ' : '#353E5C',
                  }}
                >
                  {tagname}
                </TagButton>
              ))}
            </li>
          </TagContainer>

          <SignupInfoBox>Chatcode 이용약관 동의</SignupInfoBox>
          <EmailConsent>
            <div>이메일 수신동의</div>

            <Switch {...label} />
          </EmailConsent>
          <p style={{ height: '15px', color: '#6D758F' }}>
            Chatcode에서 주최하는 다양한 이벤트, 정보성 뉴스레터 및 광고 수신여부를 설정할 수 있습니다.
          </p>
          {/* TODO전체 동의시 체크박스 다 선택되도록/ 중복 코드 제거 */}
          <ConsentContainer>
            <h2>약관 동의</h2>
            <div>
              <TotalConsent>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>전체동의</span>}
                  />
                </FormGroup>
                <span>아래의 모든 약관에 동의하게 됩니다.</span>
              </TotalConsent>
              <PartialConsent>
                <Checkbox {...label} />
                <p>
                  통합 서비스 이용약관
                  <span
                    style={{
                      color: '#0E43F3',
                      marginLeft: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLSpanElement).style.color = '#FF0000')}
                    onMouseLeave={(e) => ((e.target as HTMLSpanElement).style.color = '#0E43F3')}
                  >
                    보기
                  </span>
                </p>
              </PartialConsent>
              <PartialConsent>
                <Checkbox {...label} />
                <p>
                  개인정보 처리방침
                  <span
                    style={{
                      color: '#0E43F3',
                      marginLeft: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLSpanElement).style.color = '#FF0000')}
                    onMouseLeave={(e) => ((e.target as HTMLSpanElement).style.color = '#0E43F3')}
                  >
                    보기
                  </span>
                </p>
              </PartialConsent>
            </div>
          </ConsentContainer>
          <JoinBtn>
            <button>Join</button>
          </JoinBtn>
        </SnsLogin>
      </LoginBox>

      {/* <BottomNavBar></BottomNavBar> */}
    </Container>
  );
}
export default SignupPage;
const JoinBtn = styled.div`
  display: flex;
  justify-content: center;
  width: 520px;
  height: 38px;
  margin: 30px;
  button {
    width: 100%;
    height: 100%;
    background-color: #5d5a88;
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    border-radius: 6px;
    border: none;
    &:hover {
      background-color: #6d758f;
      color: #ffffff;
      border: 1px solid #6d758f;
    }
  }
`;

const EmailConsent = styled.div`
  width: 448px;
  display: flex;
  /* align-content: center; */
  align-items: center;
  color: #6d758f;
  font-size: 14px;
  font-weight: bold;
  justify-content: space-between;
  margin-bottom: 20px;
  div {
    display: flex;
    align-content: center;
  }
`;

const ConsentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 522px;
  height: 156px;
  padding: 10px;
  margin: 40px;
  h2 {
    color: #6d758f;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
const TotalConsent = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  color: #6d758f;
  border-bottom: 1px solid #5d5a88;
  span {
    color: #6d758f;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const PartialConsent = styled.div`
  width: 100%;
  height: 50px;
  display: flex;

  p {
    display: flex;
    align-items: center;
    color: #6d758f;
    /* margin-right: 10px; */
  }
  span:hover {
    color: #6d758f;
  }
`;
const TagContainer = styled.ul`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  margin-top: 30px;

  li {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    flex-wrap: wrap;

    width: 448px;
    height: 288px;
    margin: 0 5px 10px 0;
    padding: 0 10px;
  }
`;
const TagButton = styled.button`
  background-color: #ffff;
  color: black;
  font-size: 14px;
  border: 1px solid #5d5a88;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 0 5px 5px 0;
  white-space: nowrap; /* 텍스트가 길어도 줄 바꿈 방지 */
`;
const NinameInfo = styled.div`
  color: #6d758f;
  font-size: 14px;
  font-weight: Bold;
`;
const NicknameInput = styled.input`
  width: 524px;
  height: 46px;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #f1f3f7;
  outline: none;
  margin-top: 20px;
  &::placeholder {
    color: #6d758f;
  }
`;
const SignupInfoBox = styled.div`
  display: flex;
  width: 448px;
  height: 20px;
  align-items: center;
  color: #5d5a88;
  font-size: 12px;
  margin: 60px 0 50px 0;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    background: #5d5a88;
    height: 1px;
    font-size: 12px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`;
const LoginBox = styled.div`
  display: flex;
  min-height: 100%;
  position: relative;
  z-index: 10;
  /* margin-top: -110px 0 -260px 0; */
  margin-top: 70px;
  justify-content: center;
`;
const LoginTitle = styled.div`
  width: 328px;
  height: 30px;
  color: #6d758f;
  font-weight: bold;
`;
const SnsLogin = styled.div`
  display: flex;
  height: 100%;
  max-width: 40rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding-top: 150px; */
`;
const SnsBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 15px; */
  height: 70%;
`;
const GoogleBox = styled.button`
  display: flex;
  align-content: flex-start;
  border: 1px solid #f1f3f7;
  width: 328px;
  height: 46px;
  background-color: #ffffff;
  margin-bottom: 20px;
  border-radius: 6px;
`;
const GithubBox = styled.button`
  display: flex;
  align-content: flex-start;
  width: 328px;
  height: 46px;
  background-color: #353e5c;
  border-radius: 6px;
  a {
    color: #ffffff;
  }
`;

const Link = styled.a`
  font-size: 20px;
  color: #000000;
  text-decoration: none;
  outline: none;
  margin: 10px;
`;
