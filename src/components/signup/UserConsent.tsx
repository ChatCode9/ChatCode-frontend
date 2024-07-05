import styled from 'styled-components';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import { usePutNickname } from '../../hooks/api/usePutNickname';
import { useState } from 'react';
import { nickNameState } from '../../atoms/userInfoState';
import { useRecoilState } from 'recoil';
import { tagState } from '../../atoms/userInfoState';
import { usePostTags } from '../../hooks/api/usePostTags';

interface ConsentStates {
  totalConsent: boolean;
  serviceTerms: boolean;
  privacyPolicy: boolean;
  [key: string]: boolean;
}
function UserConsent() {
  const [nickName] = useRecoilState<string>(nickNameState);
  const [selectedTags] = useRecoilState<number[]>(tagState);
  const { mutate: PutNickname } = usePutNickname();
  const { mutate: PostUserTags } = usePostTags();
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [consentStates, setConsentStates] = useState<ConsentStates>({
    totalConsent: false,
    serviceTerms: false,
    privacyPolicy: false,
  });

  const handleTotalConsentChange = () => {
    const newTotalConsentState = !consentStates.totalConsent;
    setConsentStates({
      totalConsent: newTotalConsentState,
      serviceTerms: newTotalConsentState,
      privacyPolicy: newTotalConsentState,
    });
  };
  const handleIndividualConsentChange = (key: string) => {
    setConsentStates((prevState) => {
      const newState = { ...prevState, [key]: !prevState[key] };
      newState.totalConsent = newState.serviceTerms && newState.privacyPolicy;
      return newState;
    });
  };
  const handleMouseEnter = (event: React.MouseEvent<HTMLSpanElement>) => {
    (event.target as HTMLSpanElement).style.color = '#FF0000';
  };
  const handleMouseLeave = (event: React.MouseEvent<HTMLSpanElement>) => {
    (event.target as HTMLSpanElement).style.color = '#0E43F3';
  };

  const handleSave = () => {
    const updatedName = { nickname: nickName };
    const tagsToSend = selectedTags.map((tagId) => ({ id: tagId }));
    console.log('tagsToSend', tagsToSend);
    PostUserTags(tagsToSend);
    PutNickname(updatedName);
    window.location.href = '/mypage';
  };
  return (
    <>
      <SignupInfoBox>Chatcode 이용약관 동의</SignupInfoBox>
      <EmailConsent>
        <div>이메일 수신동의</div>
        <Switch {...label} />
      </EmailConsent>
      <p style={{ height: '15px', color: '#6D758F' }}>
        Chatcode에서 주최하는 다양한 이벤트, 정보성 뉴스레터 및 광고 수신여부를 설정할 수 있습니다.
      </p>
      <ConsentContainer>
        <h2>약관 동의</h2>
        <div>
          <TotalConsent>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={consentStates.totalConsent} onChange={handleTotalConsentChange} />}
                label={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>전체동의</span>}
              />
            </FormGroup>
            <span>아래의 모든 약관에 동의하게 됩니다.</span>
          </TotalConsent>
          <PartialConsent>
            <Checkbox
              {...label}
              checked={consentStates.serviceTerms}
              onChange={() => handleIndividualConsentChange('serviceTerms')}
            />
            <p>
              통합 서비스 이용약관
              <Span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                보기
              </Span>
            </p>
          </PartialConsent>
          <PartialConsent>
            <Checkbox
              {...label}
              checked={consentStates.privacyPolicy}
              onChange={() => handleIndividualConsentChange('privacyPolicy')}
            />
            <p>
              개인정보 처리방침
              <Span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                보기
              </Span>
            </p>
          </PartialConsent>
        </div>
      </ConsentContainer>
      <JoinBtn>
        <button type="submit" onClick={handleSave}>
          Join
        </button>
      </JoinBtn>
    </>
  );
}
export default UserConsent;
const Span = styled.span`
  color: '#0E43F3';
  margin-left: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
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
const EmailConsent = styled.div`
  width: 448px;
  display: flex;
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
  }
  span:hover {
    color: #6d758f;
  }
`;
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
