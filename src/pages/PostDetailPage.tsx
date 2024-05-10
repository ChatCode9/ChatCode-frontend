import { useParams } from 'react-router-dom';

import Comments from '../components/board/Comments';
import Post from '../components/detail/Post';

function PostDetailPage() {
  const { postId } = useParams();

  console.log('postId', postId);

  return (
    <>
      <Post />
      <Comments />
    </>
  );
}

export default PostDetailPage;
