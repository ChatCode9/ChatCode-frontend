import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import Post from '../components/detail/Post';
// import Comments from '../components/detail/Comments';
import Navbar from '../components/header/NavBar.tsx';
import { Container } from '@mui/material';

function PostDetailPage() {
  const { postId } = useParams();

  console.log('postId', postId);

  return (
    <>
      <Container>
        <Navbar />
        <Suspense fallback={<div>로딩하는 중....</div>}>
          <Post postId={Number(postId)} />
        </Suspense>
        {/* <Comments postId={Number(postId)} /> */}
      </Container>
    </>
  );
}

export default PostDetailPage;
