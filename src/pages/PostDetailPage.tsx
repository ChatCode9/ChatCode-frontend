import { useParams } from 'react-router-dom';

import Post from '../components/detail/Post';
import Comments from '../components/detail/Comments';
import Navbar from '../components/header/NavBar.tsx';
import { Container } from '@mui/material';

function PostDetailPage() {
  const { postId } = useParams();

  console.log('postId', postId);

  return (
    <>
      <Container>
        <Navbar />
        <Post postId={Number(postId)} />
        <Comments postId={Number(postId)} />
      </Container>
    </>
  );
}

export default PostDetailPage;
