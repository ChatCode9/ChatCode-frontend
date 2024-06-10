import { useParams } from 'react-router-dom';

import Post from '../components/detail/Post';
import Comments from '../components/detail/Comments';
import Navbar from '../components/NavBar.tsx';
import { Container } from '@mui/material';

function PostDetailPage() {
  const { postId } = useParams();

  console.log('postId', postId);

  return (
    <>
      <Container>
        <Navbar/>
        <Post />
        <Comments />
      </Container>
    </>
  );
}

export default PostDetailPage;
