import styled from 'styled-components';

interface Props {
  image: string;
}

const ProfileImage = ({ image }: Props) => {
  return <ProfileImg>{image && <img src={image} alt="Received Image" />}</ProfileImg>;
};

export default ProfileImage;

const ProfileImg = styled.div`
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 50px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
  div {
    width: 100%;
    height: 100%;
    background-color: #6c6b76;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
  }
`;
