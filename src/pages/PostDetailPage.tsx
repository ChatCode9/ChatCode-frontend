import { useParams } from 'react-router-dom';

import Post from '../components/detail/Post';
import Comments from '../components/detail/Comments';

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
