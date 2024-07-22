import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from '../components/header/NavBar.tsx';
import { NotificationToast } from '../components/modal/NotificationToast.tsx';
import { useToastControl } from '../hooks/useToastControl.ts';
import PostForm from '../components/write/PostForm/index.tsx';

function PostWritePage() {
  const { hideToast } = useToastControl();
  const { postId } = useParams();

  return (
    <Container>
      <Navbar />
      <PostForm postId={Number(postId)} />
      <NotificationToast onClose={hideToast} />
    </Container>
  );
}

export default PostWritePage;

const Container = styled.div`
  padding-bottom: 100px;
`;
