import styled from 'styled-components';
import { BiDislike, BiLike } from 'react-icons/bi';

interface Props {
  voteCount?: number;
  isLiked?: boolean;
  onLike: () => void;
  onDislike: () => void;
}

const VotingComponent = ({ voteCount, isLiked, onLike, onDislike }: Props) => {
  return (
    <VotingContainer>
      <Button
        aria-pressed={isLiked === true}
        aria-label="Up vote"
        $isActive={isLiked === true}
        $isNull={isLiked === null}
        onClick={onLike}
      >
        <BiLike />
      </Button>
      <VoteCount data-value={voteCount}>{voteCount}</VoteCount>
      <Button
        aria-pressed={isLiked === false}
        aria-label="Down vote"
        $isActive={isLiked === false}
        $isNull={isLiked === null}
        onClick={onDislike}
      >
        <BiDislike />
      </Button>
    </VotingContainer>
  );
};

export default VotingComponent;

const VotingContainer = styled.div`
  width: 55px;
  margin-left: -65px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #000000;
`;

interface ButtonProps {
  $isActive: boolean;
  $isNull: boolean;
}

const Button = styled.button<ButtonProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $isActive, $isNull }) => ($isActive ? '#fff' : $isNull ? '#8d8ba7' : '#8d8ba7')};
  background: ${({ $isActive, $isNull }) => ($isActive ? '#8d8ba7' : $isNull ? 'none' : 'none')};
  border: 2px solid #8d8ba7;
  border-radius: 10px;
  padding: 4px 8px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }

  //&:active {
  //    background-color: #8d8ba7;
  //    border: 2px solid #8d8ba7;
  //    color: #fff;
  //}

  svg {
    width: 35px;
    height: 35px;
  }
`;

const VoteCount = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  padding: 4px 0;
  color: #000000;
  margin-top: 10px;
  margin-bottom: 10px;
`;
