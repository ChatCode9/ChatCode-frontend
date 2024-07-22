import { useEffect, useRef, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDeleteArticleMutation } from '../../../hooks/api/useDeleteArticleMutation';

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void;
  id: number;
  isUserPost?: boolean; // 필수값이 아닌 옵션값
}

// isUserPost 값을 true, false 따라 자기글인지 아니면 다른사람 글인지 판단
// guest 방문 고려하여 false 기본값 설정
export default function More({ onClick, id, isUserPost = false }: Props) {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { deleteMutate } = useDeleteArticleMutation();

  const toggleDropdown = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  const handleBlindClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick(event, id); // 추가된 부분: 외부 onClick 핸들러 호출
  };

  const handlePostUpdateBlindClick = () => {
    navigate(`/edit/${id}`);
  };

  const handlePostDeleteClick = () => {
    deleteMutate(id);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container $isMenuOpen={isMenuOpen} ref={dropdownRef}>
      <IconButton onClick={toggleDropdown}>
        <MoreVertIcon />
      </IconButton>
      {isMenuOpen && (
        <>
          {isUserPost && (
            <>
              <DropdownButton onClick={handlePostUpdateBlindClick}>글 수정</DropdownButton>
              <DropdownButton onClick={handlePostDeleteClick}>글 삭제</DropdownButton>
            </>
          )}
          {!isUserPost && <DropdownButton onClick={handleBlindClick}>선택 글 그만보기</DropdownButton>}
        </>
      )}
    </Container>
  );
}

// 스타일 정의
const Container = styled.div<{ $isMenuOpen: boolean }>`
  display: flex;
  flex-direction: column;
  margin-right: ${($isMenuOpen) => ($isMenuOpen ? '-144px' : '-2px')};
  margin-top: 10px;
`;

const IconButton = styled.div`
  border: white;
  background-color: white;

  margin-bottom: 5px;
`;

const DropdownButton = styled.button`
  background-color: white; /* 밝은 회색 배경 */
  color: #5d5a88; /* 어두운 회색 글자 */
  border: 1px solid #5d5a88; /* 밝은 회색 테두리 */
  border-radius: 20px; /* 둥근 모서리 (20px) */
  padding: 8px 16px; /* 내부 여백 */
  font-size: 14px; /* 폰트 크기 */
  font-weight: 800;
  cursor: pointer; /* 커서 모양 변경 (클릭 가능 표시) */
  transition: all 0.3s ease; /* 모든 속성 변화에 부드러운 효과 적용 (0.3초) */
  margin-top: 5px;

  &:hover {
    background-color: #a5a3a3; /* 호버 시 배경색 약간 어둡게 변경 */
  }
`;
