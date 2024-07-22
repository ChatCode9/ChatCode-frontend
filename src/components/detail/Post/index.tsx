// import { useEffect, useRef } from 'react';

import { Container } from './styles';
import PostHeader from '../PostHeader';
import WriterProfile from '../WriterProfile';
import { usePostQuery } from '../../../hooks/api/usePostQuery.ts';
import { spliceTag } from '../../../utils/spliceTag.ts';

interface Props {
  postId: number;
}

function Post({ postId }: Props) {
  const { postData } = usePostQuery({ postId });

  console.log(postData, postData?.data);

  return (
    <Container>
      <PostHeader postData={postData?.data} />
      <div className="tags">
        {postData?.data.tags && spliceTag(postData?.data.tags).map((tag: string) => <li key={tag}>#{tag}</li>)}
      </div>
      {postData?.data && (
        <div
          dangerouslySetInnerHTML={{
            __html: postData?.data.content,
          }}
        />
      )}
      <WriterProfile name={postData?.data.nickname} />
    </Container>
  );
}

export default Post;
